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
