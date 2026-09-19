"""The state object threaded through every node in the Precedent AI agent graph.

Parallel fan-out nodes (recall / kb / icm) each write distinct keys, so no custom
reducers are required — LangGraph merges partial updates by key.
"""

from __future__ import annotations

from typing import Any, Literal, TypedDict

Route = Literal["resolve", "deflect", "escalate"]
Confidence = Literal["high", "medium", "low"]
ReviewDecision = Literal["approve", "edit", "reject"]


class PrecedentState(TypedDict, total=False):
    # Input
    case_number: str

    # Retrieval (fan-out tool nodes)
    seed_case: dict[str, Any] | None
    precedents: list[dict[str, Any]]
    kb_articles: list[dict[str, Any]]
    incident: dict[str, Any] | None

    # Reasoning
    route: Route | None
    draft: dict[str, Any] | None          # { plan, reply, citations[] }
    confidence: Confidence | None
    outage_deflection: str | None
    self_check: dict[str, Any] | None     # { verdict, gaps }
    retry_count: int

    # Human-in-the-loop + feedback
    review: dict[str, Any] | None         # { decision, edited_text }
    final_reply: str | None
    feedback: dict[str, Any] | None

    # Diagnostics
    error: str | None


def initial_state(case_number: str) -> PrecedentState:
    return PrecedentState(
        case_number=case_number,
        precedents=[],
        kb_articles=[],
        incident=None,
        retry_count=0,
    )
