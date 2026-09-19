"""PrecedentState initial-state helper."""

from __future__ import annotations

from app.graph.state import initial_state


def test_initial_state_defaults() -> None:
    state = initial_state("8809074412559830")
    assert state["case_number"] == "8809074412559830"
    assert state["precedents"] == []
    assert state["kb_articles"] == []
    assert state["incident"] is None
    assert state["retry_count"] == 0
