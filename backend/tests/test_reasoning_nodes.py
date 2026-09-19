"""GPT reasoning nodes (route / synthesize / selfcheck) with a mocked chat model."""

from __future__ import annotations

import json
from types import SimpleNamespace

from app.graph.nodes.route import route_node
from app.graph.nodes.selfcheck import selfcheck_node
from app.graph.nodes.synthesize import synthesize_node


class FakeLLM:
    """Returns a canned JSON string as the message content, ignoring the prompt."""

    def __init__(self, payload: dict) -> None:
        self._content = json.dumps(payload)

    def invoke(self, _messages):
        return SimpleNamespace(content=self._content)


def test_route_deflect_on_active_outage() -> None:
    llm = FakeLLM(
        {
            "route": "deflect",
            "confidence": "high",
            "rationale": "active outage",
            "outageDeflection": "We are tracking an active outage.",
        }
    )
    out = route_node(llm)({"incident": {"isOutage": True, "status": "Active"}})
    assert out["route"] == "deflect"
    assert out["confidence"] == "high"
    assert out["outage_deflection"] == "We are tracking an active outage."


def test_route_resolve_clears_deflection() -> None:
    llm = FakeLLM(
        {"route": "resolve", "confidence": "medium", "outageDeflection": "ignored"}
    )
    out = route_node(llm)({})
    assert out["route"] == "resolve"
    assert out["outage_deflection"] is None


def test_synthesize_builds_draft() -> None:
    llm = FakeLLM(
        {
            "plan": ["step 1", "step 2"],
            "reply": "Here is your fix.",
            "citations": ["8809074410023115", "417802"],
        }
    )
    out = synthesize_node(llm)({"route": "resolve"})
    assert out["draft"]["plan"] == ["step 1", "step 2"]
    assert out["draft"]["reply"] == "Here is your fix."
    assert out["draft"]["citations"] == ["8809074410023115", "417802"]


def test_selfcheck_pass_keeps_retry() -> None:
    llm = FakeLLM({"verdict": "pass", "gaps": []})
    out = selfcheck_node(llm)({"retry_count": 0})
    assert out["self_check"]["verdict"] == "pass"
    assert out["retry_count"] == 0


def test_selfcheck_revise_increments_retry() -> None:
    llm = FakeLLM({"verdict": "revise", "gaps": ["missing citation"]})
    out = selfcheck_node(llm)({"retry_count": 0})
    assert out["self_check"]["verdict"] == "revise"
    assert out["self_check"]["gaps"] == ["missing citation"]
    assert out["retry_count"] == 1
