"""The state object threaded through every node in the Precedent AI agent graph.

Most parallel fan-out nodes (recall / kb / icm) write distinct keys, so those merge by
key. The `interactions` audit trail uses an additive reducer so concurrent and repeated
turns append instead of overwriting.
"""

from __future__ import annotations

import operator
from datetime import datetime, timezone
from typing import Annotated, Any, Literal, TypedDict

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
    review: dict[str, Any] | None         # { decision, edited_text, reason }
    human_revisions: int
    final_reply: str | None
    feedback: dict[str, Any] | None

    # Ordered audit trail of agent milestones and human turns (additive)
    interactions: Annotated[list[dict[str, Any]], operator.add]

    # Diagnostics
    error: str | None


def make_interaction(
    actor: Literal["agent", "human"], kind: str, detail: str, revision: int = 0
) -> dict[str, Any]:
    return {
        "actor": actor,
        "kind": kind,
        "detail": detail,
        "revision": revision,
        "ts": datetime.now(timezone.utc).isoformat(),
    }


def initial_state(case_number: str) -> PrecedentState:
    return PrecedentState(
        case_number=case_number,
        precedents=[],
        kb_articles=[],
        incident=None,
        retry_count=0,
        human_revisions=0,
        interactions=[],
    )
