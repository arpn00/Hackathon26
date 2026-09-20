"""FastAPI routes against an injected mock runtime (mock ZebraAI client + fake model)."""

from __future__ import annotations

import json
from types import SimpleNamespace

from fastapi.testclient import TestClient
from langgraph.checkpoint.memory import MemorySaver

from app.agent import Runtime
from app.config import get_settings
from app.graph.graph import build_graph
from app.main import create_app
from app.zebraai.mock_client import MockZebraAIClient

FLAGSHIP = "8809074412559830"
SPARSE = "8809082348468911"


class RoutingFakeLLM:
    def invoke(self, messages):
        system = str(messages[0].content)
        if "case assistant" in system:
            # Chat endpoint: plain-text answer grounded on the evidence block.
            question = str(messages[-1].content)
            return SimpleNamespace(content=f"Based on the gathered evidence: {question}")
        payload_in = json.loads(str(messages[1].content))
        if "triage reasoner" in system:
            has_evidence = (
                payload_in.get("precedents")
                or payload_in.get("knowledgeArticles")
                or payload_in.get("incident")
            )
            if not has_evidence:
                payload = {"route": "escalate", "confidence": "low", "outageDeflection": ""}
            else:
                payload = {"route": "resolve", "confidence": "high", "outageDeflection": ""}
        elif "drafting a resolution" in system:
            payload = {
                "plan": ["Apply the known fix."],
                "reply": "Based on similar resolved cases, here is your fix.",
                "citations": ["8809074410023115"],
            }
        else:
            payload = {"verdict": "pass", "gaps": []}
        return SimpleNamespace(content=json.dumps(payload))


def _client() -> TestClient:
    zebra = MockZebraAIClient(get_settings().fixtures_dir)
    llm = RoutingFakeLLM()
    graph = build_graph(zebra, llm, checkpointer=MemorySaver(), max_retries=1)
    app = create_app(runtime=Runtime(graph=graph, client=zebra, llm=llm))
    return TestClient(app)


def _client_with_store(tmp_path) -> TestClient:
    from app.store import ResolutionStore

    zebra = MockZebraAIClient(get_settings().fixtures_dir)
    llm = RoutingFakeLLM()
    graph = build_graph(zebra, llm, checkpointer=MemorySaver(), max_retries=1)
    store = ResolutionStore.open(tmp_path / "test.db")
    app = create_app(runtime=Runtime(graph=graph, client=zebra, store=store, llm=llm))
    return TestClient(app)


def test_healthz() -> None:
    resp = _client().get("/healthz")
    assert resp.status_code == 200
    assert resp.json() == {"status": "ok", "mode": "mock"}


def test_resolve_pauses_for_review() -> None:
    resp = _client().post("/resolve", json={"caseNumber": FLAGSHIP})
    assert resp.status_code == 200
    body = resp.json()
    assert body["status"] == "awaiting_review"
    assert body["route"] == "resolve"
    assert body["draft"]["reply"].startswith("Based on similar")
    assert len(body["precedents"]) == 4
    assert body["seedCase"]["caseNumber"] == FLAGSHIP
    assert body["threadId"]


def test_resolve_review_completes() -> None:
    client = _client()
    thread_id = client.post("/resolve", json={"caseNumber": FLAGSHIP}).json()["threadId"]

    review = client.post(
        f"/resolve/{thread_id}/review", json={"decision": "approve"}
    )
    assert review.status_code == 200
    body = review.json()
    assert body["status"] == "completed"
    assert body["finalReply"] == "Based on similar resolved cases, here is your fix."

    fetched = client.get(f"/resolve/{thread_id}")
    assert fetched.json()["status"] == "completed"


def test_resolve_review_edit() -> None:
    client = _client()
    thread_id = client.post("/resolve", json={"caseNumber": FLAGSHIP}).json()["threadId"]
    body = client.post(
        f"/resolve/{thread_id}/review",
        json={"decision": "edit", "editedText": "Edited reply."},
    ).json()
    assert body["finalReply"] == "Edited reply."


def test_unknown_case_returns_404() -> None:
    resp = _client().post("/resolve", json={"caseNumber": "0000000000000000"})
    assert resp.status_code == 404
    assert resp.json()["error"]["code"] == "case_not_found"


def test_missing_thread_returns_404() -> None:
    resp = _client().get("/resolve/does-not-exist")
    assert resp.status_code == 404
    assert resp.json()["error"]["code"] == "thread_not_found"


def test_feedback_accepted() -> None:
    resp = _client().post(
        "/feedback",
        json={"experiment": "case_km", "runId": "run-1", "rating": 5, "note": "great"},
    )
    assert resp.status_code == 200
    body = resp.json()
    assert body["status"] == "accepted"
    assert body["detail"]["runId"] == "run-1"


def test_sparse_case_escalates() -> None:
    client = _client()
    body = client.post("/resolve", json={"caseNumber": SPARSE}).json()
    assert body["status"] == "awaiting_review"
    assert body["route"] == "escalate"
    assert body["precedents"] == []
    assert body["kbArticles"] == []
    assert body["incident"] is None


def test_resolve_returns_runid_and_interactions() -> None:
    body = _client().post("/resolve", json={"caseNumber": FLAGSHIP}).json()
    assert body["runId"] == body["threadId"]
    kinds = [i["kind"] for i in body["interactions"]]
    assert "route" in kinds
    assert "draft" in kinds


def test_review_reject_reroutes_with_reason() -> None:
    client = _client()
    thread_id = client.post("/resolve", json={"caseNumber": FLAGSHIP}).json()["threadId"]
    body = client.post(
        f"/resolve/{thread_id}/review",
        json={"decision": "reject", "reason": "Add rollback steps."},
    ).json()
    assert body["status"] == "awaiting_review"
    draft_turns = [i for i in body["interactions"] if i["kind"] == "draft"]
    assert len(draft_turns) == 2
    reject_turns = [i for i in body["interactions"] if i["kind"] == "reject"]
    assert reject_turns and "Add rollback steps." in reject_turns[0]["detail"]


def test_list_resolutions_indexes_runs(tmp_path) -> None:
    client = _client_with_store(tmp_path)
    thread_id = client.post("/resolve", json={"caseNumber": FLAGSHIP}).json()["threadId"]

    listing = client.get("/resolve").json()
    ids = [item["threadId"] for item in listing["items"]]
    assert thread_id in ids
    item = next(i for i in listing["items"] if i["threadId"] == thread_id)
    assert item["caseNumber"] == FLAGSHIP
    assert item["status"] == "awaiting_review"
    assert item["route"] == "resolve"


def test_feedback_persists_to_store(tmp_path) -> None:
    client = _client_with_store(tmp_path)
    resp = client.post(
        "/feedback",
        json={"experiment": "case_km", "runId": "run-9", "rating": 4, "note": "ok"},
    )
    assert resp.status_code == 200
    assert resp.json()["status"] == "accepted"


def test_step_precedents_returns_seed_and_precedents() -> None:
    resp = _client().post("/steps/precedents", json={"caseNumber": FLAGSHIP})
    assert resp.status_code == 200
    body = resp.json()
    assert body["seedCase"]["caseNumber"] == FLAGSHIP
    assert len(body["precedents"]) == 4


def test_step_precedents_unknown_case_returns_404() -> None:
    resp = _client().post("/steps/precedents", json={"caseNumber": "0000000000000000"})
    assert resp.status_code == 404
    assert resp.json()["error"]["code"] == "case_not_found"


def test_step_kb_returns_articles() -> None:
    resp = _client().post("/steps/kb", json={"caseNumber": FLAGSHIP})
    assert resp.status_code == 200
    assert isinstance(resp.json()["kbArticles"], list)


def test_step_incidents_returns_incident_field() -> None:
    resp = _client().post("/steps/incidents", json={"caseNumber": FLAGSHIP})
    assert resp.status_code == 200
    assert "incident" in resp.json()


def test_step_kb_sparse_case_is_empty() -> None:
    resp = _client().post("/steps/kb", json={"caseNumber": SPARSE})
    assert resp.status_code == 200
    assert resp.json()["kbArticles"] == []


def test_chat_answers_from_evidence() -> None:
    resp = _client().post(
        "/chat",
        json={
            "caseNumber": FLAGSHIP,
            "question": "What is the likely fix?",
            "context": {"precedents": [{"caseNumber": "123", "title": "prior"}]},
        },
    )
    assert resp.status_code == 200
    assert "What is the likely fix?" in resp.json()["reply"]


def test_chat_requires_question() -> None:
    resp = _client().post("/chat", json={"caseNumber": FLAGSHIP, "question": ""})
    assert resp.status_code == 422

