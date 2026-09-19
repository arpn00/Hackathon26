"""Seed node — normalize and validate the incoming case number (no ZebraAI call)."""

from __future__ import annotations

from app.graph.state import PrecedentState


def seed_node(state: PrecedentState) -> dict:
    case_number = (state.get("case_number") or "").strip()
    if not case_number:
        raise ValueError("case_number is required")
    return {"case_number": case_number}
