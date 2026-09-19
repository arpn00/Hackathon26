"""End-to-end agent graph: fan-out retrieval, reasoning, interrupt gate, resume."""

from __future__ import annotations

import json
from types import SimpleNamespace

from langgraph.types import Command

from app.config import get_settings
from app.graph.graph import build_graph
from app.graph.state import initial_state
from app.zebraai.mock_client import MockZebraAIClient

FLAGSHIP = "8809074412559830"


class RoutingFakeLLM:
    """Returns a different canned JSON depending on which node's system prompt it sees."""

    def invoke(self, messages):
        system = str(messages[0].content)
        if "triage reasoner" in system:
            payload = {"route": "resolve", "confidence": "high", "outageDeflection": ""}
        elif "drafting a resolution" in system:
            payload = {
                "plan": ["Apply the known fix from precedent."],
                "reply": "Based on similar resolved cases, here is your fix.",
                "citations": ["8809074410023115"],
            }
        else:  # strict reviewer
            payload = {"verdict": "pass", "gaps": []}
        return SimpleNamespace(content=json.dumps(payload))


def _build():
    client = MockZebraAIClient(get_settings().fixtures_dir)
    return build_graph(client, RoutingFakeLLM(), max_retries=1)


def test_graph_pauses_at_human_gate_then_resumes() -> None:
    graph = _build()
    config = {"configurable": {"thread_id": "t-1"}}

    paused = graph.invoke(initial_state(FLAGSHIP), config)
    assert "__interrupt__" in paused
    surfaced = paused["__interrupt__"][0].value
    assert surfaced["route"] == "resolve"
    assert surfaced["draft"]["reply"].startswith("Based on similar")

    final = graph.invoke(Command(resume={"decision": "approve"}), config)
    assert final["final_reply"] == "Based on similar resolved cases, here is your fix."
    assert final["seed_case"]["caseNumber"] == FLAGSHIP
    assert len(final["precedents"]) == 3


def test_graph_applies_reviewer_edit() -> None:
    graph = _build()
    config = {"configurable": {"thread_id": "t-2"}}

    graph.invoke(initial_state(FLAGSHIP), config)
    final = graph.invoke(
        Command(resume={"decision": "edit", "edited_text": "Custom reply."}),
        config,
    )
    assert final["final_reply"] == "Custom reply."


def test_graph_reject_loops_back_to_synthesize_with_reason() -> None:
    graph = _build()
    config = {"configurable": {"thread_id": "t-3"}}

    graph.invoke(initial_state(FLAGSHIP), config)
    # Reject once with a reason — should re-draft and pause again.
    paused = graph.invoke(
        Command(resume={"decision": "reject", "reason": "Add rollback steps."}),
        config,
    )
    assert "__interrupt__" in paused

    state = graph.get_state(config)
    assert state.values["human_revisions"] == 1
    # The reviewer's reason was recorded on the human turn.
    reject_turns = [i for i in state.values["interactions"] if i["kind"] == "reject"]
    assert reject_turns and "Add rollback steps." in reject_turns[0]["detail"]
    # Two drafts recorded (v1 + revision).
    draft_turns = [i for i in state.values["interactions"] if i["kind"] == "draft"]
    assert len(draft_turns) == 2

    final = graph.invoke(Command(resume={"decision": "approve"}), config)
    assert final["final_reply"].startswith("Based on similar")


def test_graph_records_ordered_interactions() -> None:
    graph = _build()
    config = {"configurable": {"thread_id": "t-4"}}

    graph.invoke(initial_state(FLAGSHIP), config)
    final = graph.invoke(Command(resume={"decision": "approve"}), config)

    interactions = final["interactions"]
    kinds = [i["kind"] for i in interactions]
    # Agent milestones then the human turn.
    assert "retrieve" in kinds
    assert "route" in kinds
    assert "draft" in kinds
    assert "selfcheck" in kinds
    assert interactions[-1]["actor"] == "human"
    assert interactions[-1]["kind"] == "approve"
    # Every entry carries a timestamp for ordering on the client.
    assert all("ts" in i for i in interactions)
