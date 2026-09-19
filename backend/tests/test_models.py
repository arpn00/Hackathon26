"""Every fixture must deserialize into its experiment model."""

from __future__ import annotations

import json

import pytest

from app.config import get_settings
from app.models import (
    CaseICMResult,
    CaseKMResult,
    VectorCaseReviewResult,
)

FIXTURES_DIR = get_settings().fixtures_dir
CASES = ["8809074412559830", "8809081904518713", "8809082348468911"]


def _load(prefix: str, case: str) -> dict:
    path = FIXTURES_DIR / f"{prefix}_{case}.json"
    return json.loads(path.read_text(encoding="utf-8"))


@pytest.mark.parametrize("case", CASES)
def test_vector_case_review_parses(case: str) -> None:
    result = VectorCaseReviewResult.model_validate(_load("vectorreview", case))
    assert result.seedCase.caseNumber == case


@pytest.mark.parametrize("case", CASES)
def test_case_km_parses(case: str) -> None:
    result = CaseKMResult.model_validate(_load("casekm", case))
    assert result.case.caseNumber == case


@pytest.mark.parametrize("case", CASES)
def test_case_icm_parses(case: str) -> None:
    result = CaseICMResult.model_validate(_load("caseicm", case))
    assert result.case.caseNumber == case


def test_flagship_outage_detected() -> None:
    icm = CaseICMResult.model_validate(_load("caseicm", "8809074412559830"))
    assert icm.relatedIncidents[0].isOutage is True
    assert icm.relatedIncidents[0].status == "Resolved"


def test_sparse_has_no_precedents() -> None:
    recall = VectorCaseReviewResult.model_validate(_load("vectorreview", "8809082348468911"))
    assert recall.relatedCases == []
