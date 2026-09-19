"""Recall node — Vector Case Review: seed case + similar prior cases with resolutions."""

from __future__ import annotations

from app.graph.state import PrecedentState
from app.models import VectorCaseReviewResult
from app.zebraai.client import ZebraAIClient


def recall_node(client: ZebraAIClient):
    def _node(state: PrecedentState) -> dict:
        data = client.run_experiment("vector_case_review", state["case_number"])
        result = VectorCaseReviewResult.model_validate(data)
        return {
            "seed_case": result.seedCase.model_dump(),
            "precedents": [c.model_dump() for c in result.relatedCases],
        }

    return _node
