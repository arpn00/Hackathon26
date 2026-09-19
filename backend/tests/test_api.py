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
    graph = build_graph(zebra, RoutingFakeLLM(), checkpointer=MemorySaver(), max_retries=1)
    app = create_app(runtime=Runtime(graph=graph, client=zebra))
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
    assert len(body["precedents"]) == 3
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
