"""FastAPI application exposing the Precedent AI agent to the React frontend.

Routes:
    POST   /resolve                    start a run; pauses for human review
    GET    /resolve/{threadId}         current state of a run
    POST   /resolve/{threadId}/review  resume with approve / edit / reject
    POST   /feedback                   send reviewer feedback to ZebraAI (flywheel)
    GET    /healthz                    liveness + mode
"""

from __future__ import annotations

from typing import Any

from fastapi import Depends, FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from langgraph.types import Command

from app.agent import Runtime, get_runtime
from app.api_models import (
    Draft,
    FeedbackRequest,
    FeedbackResponse,
    HealthResponse,
    ResolveRequest,
    ResolveResponse,
    ReviewRequest,
)
from app.config import get_settings
from app.graph.state import initial_state
from app.zebraai.client import FixtureNotFoundError, UnknownExperimentError


class ThreadNotFoundError(Exception):
    def __init__(self, thread_id: str) -> None:
        super().__init__(thread_id)
        self.thread_id = thread_id


def _get_runtime(request: Request) -> Runtime:
    runtime = getattr(request.app.state, "runtime", None)
    return runtime if runtime is not None else get_runtime()


def _config(thread_id: str) -> dict:
    return {"configurable": {"thread_id": thread_id}}


def _build_response(runtime: Runtime, thread_id: str) -> ResolveResponse:
    snapshot = runtime.graph.get_state(_config(thread_id))
    values: dict[str, Any] = snapshot.values or {}
    if not values:
        raise ThreadNotFoundError(thread_id)
    status = "awaiting_review" if snapshot.next else "completed"
    draft = values.get("draft")
    return ResolveResponse(
        thread_id=thread_id,
        status=status,
        route=values.get("route"),
        confidence=values.get("confidence"),
        outage_deflection=values.get("outage_deflection"),
        draft=Draft(**draft) if draft else None,
        final_reply=values.get("final_reply"),
        seed_case=values.get("seed_case"),
        precedents=values.get("precedents", []),
        kb_articles=values.get("kb_articles", []),
        incident=values.get("incident"),
    )


def create_app(runtime: Runtime | None = None) -> FastAPI:
    app = FastAPI(title="Precedent AI", version="0.1.0")
    app.state.runtime = runtime

    settings = get_settings()
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins,
        allow_methods=["*"],
        allow_headers=["*"],
        allow_credentials=True,
    )

    @app.exception_handler(FixtureNotFoundError)
    async def _fixture_missing(_request: Request, exc: FixtureNotFoundError):
        message = (
            f"No data found for case {exc.case_number}"
            if exc.case_number
            else "No data found for the requested case"
        )
        return JSONResponse(
            status_code=404,
            content={"error": {"code": "case_not_found", "message": message}},
        )

    @app.exception_handler(UnknownExperimentError)
    async def _unknown_experiment(_request: Request, exc: UnknownExperimentError):
        return JSONResponse(
            status_code=400,
            content={"error": {"code": "unknown_experiment", "message": str(exc)}},
        )

    @app.exception_handler(ThreadNotFoundError)
    async def _thread_missing(_request: Request, exc: ThreadNotFoundError):
        return JSONResponse(
            status_code=404,
            content={"error": {"code": "thread_not_found", "message": exc.thread_id}},
        )

    @app.get("/healthz", response_model=HealthResponse)
    async def healthz() -> HealthResponse:
        return HealthResponse(status="ok", mode=get_settings().zebraai_mode)

    @app.post("/resolve", response_model=ResolveResponse)
    async def resolve(
        body: ResolveRequest, runtime: Runtime = Depends(_get_runtime)
    ) -> ResolveResponse:
        import uuid

        thread_id = uuid.uuid4().hex
        runtime.graph.invoke(initial_state(body.case_number), _config(thread_id))
        return _build_response(runtime, thread_id)

    @app.get("/resolve/{thread_id}", response_model=ResolveResponse)
    async def get_resolve(
        thread_id: str, runtime: Runtime = Depends(_get_runtime)
    ) -> ResolveResponse:
        return _build_response(runtime, thread_id)

    @app.post("/resolve/{thread_id}/review", response_model=ResolveResponse)
    async def review(
        thread_id: str,
        body: ReviewRequest,
        runtime: Runtime = Depends(_get_runtime),
    ) -> ResolveResponse:
        resume = {"decision": body.decision, "edited_text": body.edited_text}
        runtime.graph.invoke(Command(resume=resume), _config(thread_id))
        return _build_response(runtime, thread_id)

    @app.post("/feedback", response_model=FeedbackResponse)
    async def feedback(
        body: FeedbackRequest, runtime: Runtime = Depends(_get_runtime)
    ) -> FeedbackResponse:
        result = runtime.client.submit_feedback(
            body.experiment, body.run_id, body.rating, body.note
        )
        return FeedbackResponse(status=result.get("status", "accepted"), detail=result)

    return app


app = create_app()
