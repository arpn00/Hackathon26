"""ICM node — Case + ICM: the most relevant related incident, if any (enrichment)."""

from __future__ import annotations

from app.graph.state import PrecedentState
from app.services.steps import check_incidents
from app.zebraai.client import ZebraAIClient


def icm_node(client: ZebraAIClient):
    def _node(state: PrecedentState) -> dict:
        return check_incidents(client, state["case_number"])

    return _node
