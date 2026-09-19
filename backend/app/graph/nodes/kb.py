"""KB node — Case + KM: knowledge articles relevant to the case (enrichment)."""

from __future__ import annotations

from app.graph.state import PrecedentState
from app.models import CaseKMResult
from app.zebraai.client import FixtureNotFoundError, ZebraAIClient


def kb_node(client: ZebraAIClient):
    def _node(state: PrecedentState) -> dict:
        try:
            data = client.run_experiment("case_km", state["case_number"])
        except FixtureNotFoundError:
            return {"kb_articles": []}
        result = CaseKMResult.model_validate(data)
        return {"kb_articles": [a.model_dump() for a in result.knowledgeArticles]}

    return _node
