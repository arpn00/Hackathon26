"""Request/response schemas for the React-facing API (camelCase, stable envelope)."""

from __future__ import annotations

from typing import Any, Literal

from pydantic import BaseModel, ConfigDict, Field


class _ApiBase(BaseModel):
    model_config = ConfigDict(populate_by_name=True)


class ResolveRequest(_ApiBase):
    case_number: str = Field(alias="caseNumber", min_length=1)


class StepRequest(_ApiBase):
    case_number: str = Field(alias="caseNumber", min_length=1)


class PrecedentsStepResponse(_ApiBase):
    seed_case: dict[str, Any] | None = Field(default=None, serialization_alias="seedCase")
    precedents: list[dict[str, Any]] = []


class KbStepResponse(_ApiBase):
    kb_articles: list[dict[str, Any]] = Field(
        default_factory=list, serialization_alias="kbArticles"
    )


class IncidentStepResponse(_ApiBase):
    incident: dict[str, Any] | None = None


class ChatMessage(_ApiBase):
    role: Literal["user", "assistant"]
    content: str


class ChatContext(_ApiBase):
    seed_case: dict[str, Any] | None = Field(default=None, alias="seedCase")
    precedents: list[dict[str, Any]] = []
    kb_articles: list[dict[str, Any]] = Field(default_factory=list, alias="kbArticles")
    incident: dict[str, Any] | None = None
    draft: dict[str, Any] | None = None


class ChatRequest(_ApiBase):
    case_number: str = Field(alias="caseNumber", min_length=1)
    question: str = Field(min_length=1)
    history: list[ChatMessage] = []
    context: ChatContext = Field(default_factory=ChatContext)


class ChatResponse(_ApiBase):
    reply: str



class ReviewRequest(_ApiBase):
    decision: Literal["approve", "edit", "reject"]
    edited_text: str | None = Field(default=None, alias="editedText")
    reason: str | None = None


class FeedbackRequest(_ApiBase):
    experiment: str
    run_id: str = Field(alias="runId")
    rating: int = Field(ge=1, le=5)
    note: str | None = None


class Draft(_ApiBase):
    plan: list[str] = []
    reply: str = ""
    citations: list[str] = []


class ResolveResponse(_ApiBase):
    thread_id: str = Field(serialization_alias="threadId")
    run_id: str = Field(serialization_alias="runId")
    status: Literal["awaiting_review", "completed"]
    route: str | None = None
    confidence: str | None = None
    outage_deflection: str | None = Field(default=None, serialization_alias="outageDeflection")
    draft: Draft | None = None
    final_reply: str | None = Field(default=None, serialization_alias="finalReply")
    seed_case: dict[str, Any] | None = Field(default=None, serialization_alias="seedCase")
    precedents: list[dict[str, Any]] = []
    kb_articles: list[dict[str, Any]] = Field(default_factory=list, serialization_alias="kbArticles")
    incident: dict[str, Any] | None = None
    interactions: list[dict[str, Any]] = []


class ResolutionSummary(_ApiBase):
    thread_id: str = Field(serialization_alias="threadId")
    case_number: str | None = Field(default=None, serialization_alias="caseNumber")
    status: str
    route: str | None = None
    confidence: str | None = None
    updated_at: str | None = Field(default=None, serialization_alias="updatedAt")


class ResolutionListResponse(_ApiBase):
    items: list[ResolutionSummary] = []


class FeedbackResponse(_ApiBase):
    status: str
    detail: dict[str, Any] | None = None


class HealthResponse(_ApiBase):
    status: str
    mode: str


class ErrorBody(_ApiBase):
    code: str
    message: str


class ErrorResponse(_ApiBase):
    error: ErrorBody
