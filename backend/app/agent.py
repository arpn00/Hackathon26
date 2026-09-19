"""Runtime wiring: build the compiled agent graph and ZebraAI client once, lazily.

Kept separate from the FastAPI app so tests can inject a mock graph + client and avoid
requiring Azure OpenAI credentials at import time.
"""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any

from langgraph.checkpoint.memory import MemorySaver

from app.config import Settings, get_settings
from app.graph.graph import build_graph
from app.llm import build_chat_model
from app.zebraai.client import ZebraAIClient
from app.zebraai.factory import build_client


@dataclass
class Runtime:
    graph: Any
    client: ZebraAIClient


_runtime: Runtime | None = None


def build_runtime(settings: Settings | None = None) -> Runtime:
    settings = settings or get_settings()
    client = build_client(settings)
    llm = build_chat_model(settings)  # requires Azure OpenAI settings at this point
    graph = build_graph(
        client,
        llm,
        checkpointer=MemorySaver(),
        max_retries=settings.self_check_max_retries,
    )
    return Runtime(graph=graph, client=client)


def get_runtime() -> Runtime:
    global _runtime
    if _runtime is None:
        _runtime = build_runtime()
    return _runtime
