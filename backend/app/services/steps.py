"""Single source of truth for each retrieval capability.

Both the LangGraph nodes (recall / kb / icm) and the guided step endpoints call these,
so the evidence shown when a step is triggered individually is identical to the evidence
the full graph reasons over.
"""

from __future__ import annotations

from typing import Any

from app.models import CaseICMResult, CaseKMResult, VectorCaseReviewResult
from app.zebraai.client import FixtureNotFoundError, ZebraAIClient


def recall_precedents(client: ZebraAIClient, case_number: str) -> dict[str, Any]:
    """Vector Case Review: the seed case plus similar prior cases with resolutions."""
    data = client.run_experiment("vector_case_review", case_number)
    result = VectorCaseReviewResult.model_validate(data)
    return {
        "seed_case": result.seedCase.model_dump(),
        "precedents": [c.model_dump() for c in result.relatedCases],
    }


def find_kb(client: ZebraAIClient, case_number: str) -> dict[str, Any]:
    """Case + KM: knowledge articles relevant to the case (enrichment; may be empty)."""
    try:
        data = client.run_experiment("case_km", case_number)
    except FixtureNotFoundError:
        return {"kb_articles": []}
    result = CaseKMResult.model_validate(data)
    return {"kb_articles": [a.model_dump() for a in result.knowledgeArticles]}


def check_incidents(client: ZebraAIClient, case_number: str) -> dict[str, Any]:
    """Case + ICM: the most relevant related incident, if any (enrichment)."""
    try:
        data = client.run_experiment("case_icm", case_number)
    except FixtureNotFoundError:
        return {"incident": None}
    result = CaseICMResult.model_validate(data)
    incident = result.relatedIncidents[0].model_dump() if result.relatedIncidents else None
    return {"incident": incident}
