"""Route node — fuse the retrieved evidence and choose resolve / deflect / escalate.

Deflection is reserved for an *active* related outage (an incident that is an outage and
not yet resolved). A resolved incident is treated as root-cause evidence for a normal
resolution. Cases with no precedents / KB / incident are escalated.
"""

from __future__ import annotations

from app.graph.nodes._llm import invoke_json
from app.graph.state import PrecedentState

SYSTEM_PROMPT = (
    "You are a triage reasoner for Microsoft customer support. "
    "Given a seed case and retrieved evidence (similar prior cases, knowledge articles, "
    "and the most relevant related incident), decide how to handle the case.\n"
    "Rules:\n"
    "- Choose 'deflect' ONLY when the related incident is an active outage "
    "(isOutage is true AND status is not 'Resolved') that plausibly explains the case.\n"
    "- Choose 'escalate' when there is little or no useful evidence "
    "(no precedents, no knowledge articles, no incident).\n"
    "- Otherwise choose 'resolve'.\n"
    "Respond ONLY with JSON: "
    '{"route": "resolve|deflect|escalate", "confidence": "high|medium|low", '
    '"rationale": "one sentence", "outageDeflection": "customer-facing note or empty"}'
)


def route_node(llm):
    def _node(state: PrecedentState) -> dict:
        payload = {
            "seedCase": state.get("seed_case"),
            "precedents": state.get("precedents", []),
            "knowledgeArticles": state.get("kb_articles", []),
            "incident": state.get("incident"),
        }
        result = invoke_json(llm, SYSTEM_PROMPT, payload)
        route = result.get("route", "resolve")
        deflection = result.get("outageDeflection") or None
        return {
            "route": route,
            "confidence": result.get("confidence"),
            "outage_deflection": deflection if route == "deflect" else None,
        }

    return _node
