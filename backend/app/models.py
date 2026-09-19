"""Pydantic schemas mirroring the ZebraAI experiment JSON contracts.

Field names are camelCase to match the fixture / live-response payloads directly.
`extra="ignore"` keeps parsing resilient to additional fields a live response may add.
"""

from __future__ import annotations

from pydantic import BaseModel, ConfigDict


class _Base(BaseModel):
    model_config = ConfigDict(extra="ignore")


# --- Vector Case Review (recall / precedents) ---

class Product(_Base):
    name: str
    family: str | None = None
    subCategory: str | None = None


class SeedCase(_Base):
    caseNumber: str
    title: str
    issueDescription: str | None = None
    symptomText: str | None = None
    causeText: str | None = None
    rootCause: str | None = None
    currentSeverity: str | None = None
    product: Product | None = None
    icmId: str | None = None
    icmUrl: str | None = None


class RelatedCase(_Base):
    caseNumber: str
    title: str
    similarity: str | None = None
    resolutionText: str | None = None
    causeText: str | None = None
    rootCause: str | None = None
    csat: int | None = None
    currentSeverity: str | None = None


class VectorCaseReviewResult(_Base):
    seedCase: SeedCase
    relatedCases: list[RelatedCase] = []


# --- Case + KM (knowledge grounding) ---

class CaseRef(_Base):
    caseNumber: str
    title: str | None = None


class KnowledgeArticle(_Base):
    kmId: str | None = None
    title: str
    url: str | None = None
    domain: str | None = None
    source: str | None = None
    relevance: str | None = None
    snippet: str | None = None


class CaseKMResult(_Base):
    case: CaseRef
    knowledgeArticles: list[KnowledgeArticle] = []


# --- Case + ICM (outage detection) ---

class RelatedIncident(_Base):
    incidentId: str
    title: str | None = None
    summary: str | None = None
    incidentType: str | None = None
    isOutage: bool | None = None
    severity: str | None = None
    status: str | None = None
    impactedRegions: str | None = None
    impactStartDate: str | None = None
    mitigateDate: str | None = None
    resolveDate: str | None = None
    owningTeamName: str | None = None
    mitigation: str | None = None
    howFixed: str | None = None
    icmUrl: str | None = None


class CaseICMResult(_Base):
    case: CaseRef
    relatedIncidents: list[RelatedIncident] = []


# --- Experiment registry (logical name -> model / fixture prefix) ---

EXPERIMENT_MODELS: dict[str, type[_Base]] = {
    "vector_case_review": VectorCaseReviewResult,
    "case_km": CaseKMResult,
    "case_icm": CaseICMResult,
}

FIXTURE_PREFIX: dict[str, str] = {
    "vector_case_review": "vectorreview",
    "case_km": "casekm",
    "case_icm": "caseicm",
}
