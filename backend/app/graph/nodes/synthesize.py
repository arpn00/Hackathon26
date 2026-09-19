"""Synthesize node — draft a resolution plan, a customer-facing reply, and citations.

Grounded strictly in the retrieved evidence: every claim should trace to a precedent case
number, a knowledge article id, or the related incident id.
"""

from __future__ import annotations

from app.graph.nodes._llm import invoke_json
from app.graph.state import PrecedentState

SYSTEM_PROMPT = (
    "You are a senior Microsoft support engineer drafting a resolution. "
    "Use ONLY the provided evidence; do not invent facts. Cite the exact case numbers, "
    "knowledge article ids, and incident id you relied on.\n"
    "If the route is 'deflect', the reply should acknowledge the active outage and set "
    "expectations rather than propose a manual fix.\n"
    "If the route is 'escalate', the plan should describe what to gather and who to route to.\n"
    "Respond ONLY with JSON: "
    '{"plan": ["step", ...], "reply": "customer-facing text", '
    '"citations": ["caseNumber/kmId/incidentId", ...]}'
)


def synthesize_node(llm):
    def _node(state: PrecedentState) -> dict:
        payload = {
            "route": state.get("route"),
            "seedCase": state.get("seed_case"),
            "precedents": state.get("precedents", []),
            "knowledgeArticles": state.get("kb_articles", []),
            "incident": state.get("incident"),
            "priorGaps": (state.get("self_check") or {}).get("gaps", []),
        }
        result = invoke_json(llm, SYSTEM_PROMPT, payload)
        return {
            "draft": {
                "plan": result.get("plan", []),
                "reply": result.get("reply", ""),
                "citations": result.get("citations", []),
            }
        }

    return _node
