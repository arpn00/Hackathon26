"""Recall node — Vector Case Review: seed case + similar prior cases with resolutions."""

from __future__ import annotations

from app.graph.state import PrecedentState
from app.services.steps import recall_precedents
from app.zebraai.client import ZebraAIClient


def recall_node(client: ZebraAIClient):
    def _node(state: PrecedentState) -> dict:
        return recall_precedents(client, state["case_number"])

    return _node
