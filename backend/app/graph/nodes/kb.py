"""KB node — Case + KM: knowledge articles relevant to the case (enrichment)."""

from __future__ import annotations

from app.graph.state import PrecedentState
from app.services.steps import find_kb
from app.zebraai.client import ZebraAIClient


def kb_node(client: ZebraAIClient):
    def _node(state: PrecedentState) -> dict:
        return find_kb(client, state["case_number"])

    return _node
