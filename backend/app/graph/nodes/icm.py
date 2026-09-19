"""ICM node — Case + ICM: the most relevant related incident, if any (enrichment)."""

from __future__ import annotations

from app.graph.state import PrecedentState
from app.models import CaseICMResult
from app.zebraai.client import FixtureNotFoundError, ZebraAIClient


def icm_node(client: ZebraAIClient):
    def _node(state: PrecedentState) -> dict:
        try:
            data = client.run_experiment("case_icm", state["case_number"])
        except FixtureNotFoundError:
            return {"incident": None}
        result = CaseICMResult.model_validate(data)
        incident = result.relatedIncidents[0].model_dump() if result.relatedIncidents else None
        return {"incident": incident}

    return _node
