"""Self-check node — verify the draft against the evidence and drive the retry loop.

Returns a verdict (pass|revise) plus concrete gaps. When the model asks to revise, the
retry counter is incremented; the graph decides whether another synthesize pass is allowed.
"""

from __future__ import annotations

from app.graph.nodes._llm import invoke_json
from app.graph.state import PrecedentState

SYSTEM_PROMPT = (
    "You are a strict reviewer. Check the draft reply and plan against the evidence.\n"
    "Fail (verdict 'revise') if the draft cites something not in the evidence, makes an "
    "unsupported claim, ignores an active outage, or misses an obviously relevant precedent.\n"
    "Otherwise pass.\n"
    'Respond ONLY with JSON: {"verdict": "pass|revise", "gaps": ["short gap", ...]}'
)


def selfcheck_node(llm):
    def _node(state: PrecedentState) -> dict:
        payload = {
            "route": state.get("route"),
            "draft": state.get("draft"),
            "seedCase": state.get("seed_case"),
            "precedents": state.get("precedents", []),
            "knowledgeArticles": state.get("kb_articles", []),
            "incident": state.get("incident"),
        }
        result = invoke_json(llm, SYSTEM_PROMPT, payload)
        verdict = result.get("verdict", "pass")
        gaps = result.get("gaps", [])
        retry_count = state.get("retry_count", 0)
        if verdict == "revise":
            retry_count += 1
        return {
            "self_check": {"verdict": verdict, "gaps": gaps},
            "retry_count": retry_count,
        }

    return _node
