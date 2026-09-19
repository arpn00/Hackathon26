"""Assemble the Precedent AI agent graph.

Flow:
    seed -> (recall | kb | icm)  [parallel fan-out]
         -> route -> synthesize -> selfcheck
         -> (loop back to synthesize while 'revise' and under the retry cap)
         -> human_gate  [interrupt() — pauses for reviewer approval/edit]
         -> finalize -> END

The graph is client- and model-injected so tests can wire a mock ZebraAI client and a
fake chat model, while production wires the live/mock client and real Azure OpenAI.
"""

from __future__ import annotations

from typing import Any

from langgraph.checkpoint.memory import MemorySaver
from langgraph.graph import END, START, StateGraph
from langgraph.types import interrupt

from app.graph.nodes.icm import icm_node
from app.graph.nodes.kb import kb_node
from app.graph.nodes.recall import recall_node
from app.graph.nodes.route import route_node
from app.graph.nodes.seed import seed_node
from app.graph.nodes.selfcheck import selfcheck_node
from app.graph.nodes.synthesize import synthesize_node
from app.graph.state import PrecedentState
from app.zebraai.client import ZebraAIClient


def _human_gate_node(state: PrecedentState) -> dict:
    # Pauses execution; the value is surfaced to the caller. Resume with the review decision.
    decision = interrupt(
        {
            "draft": state.get("draft"),
            "route": state.get("route"),
            "confidence": state.get("confidence"),
            "outageDeflection": state.get("outage_deflection"),
        }
    )
    review = decision if isinstance(decision, dict) else {"decision": "approve"}
    return {"review": review}


def _finalize_node(state: PrecedentState) -> dict:
    review = state.get("review") or {"decision": "approve"}
    draft = state.get("draft") or {}
    if review.get("decision") == "edit" and review.get("edited_text"):
        final_reply = review["edited_text"]
    else:
        final_reply = draft.get("reply", "")
    return {"final_reply": final_reply}


def build_graph(
    client: ZebraAIClient,
    llm: Any,
    *,
    checkpointer: Any | None = None,
    max_retries: int = 1,
):
    builder = StateGraph(PrecedentState)

    builder.add_node("seed", seed_node)
    builder.add_node("recall", recall_node(client))
    builder.add_node("kb", kb_node(client))
    builder.add_node("icm", icm_node(client))
    builder.add_node("route", route_node(llm))
    builder.add_node("synthesize", synthesize_node(llm))
    builder.add_node("selfcheck", selfcheck_node(llm))
    builder.add_node("human_gate", _human_gate_node)
    builder.add_node("finalize", _finalize_node)

    builder.add_edge(START, "seed")
    # fan-out
    builder.add_edge("seed", "recall")
    builder.add_edge("seed", "kb")
    builder.add_edge("seed", "icm")
    # fan-in (route runs once after all three retrieval nodes finish)
    builder.add_edge("recall", "route")
    builder.add_edge("kb", "route")
    builder.add_edge("icm", "route")

    builder.add_edge("route", "synthesize")
    builder.add_edge("synthesize", "selfcheck")

    def _after_selfcheck(state: PrecedentState) -> str:
        sc = state.get("self_check") or {}
        if sc.get("verdict") == "revise" and state.get("retry_count", 0) < max_retries:
            return "synthesize"
        return "human_gate"

    builder.add_conditional_edges(
        "selfcheck",
        _after_selfcheck,
        {"synthesize": "synthesize", "human_gate": "human_gate"},
    )

    builder.add_edge("human_gate", "finalize")
    builder.add_edge("finalize", END)

    return builder.compile(checkpointer=checkpointer or MemorySaver())
