"""Runtime wiring: build the compiled agent graph and ZebraAI client once, lazily.

Kept separate from the FastAPI app so tests can inject a mock graph + client and avoid
requiring Azure OpenAI credentials at import time.
"""

from __future__ import annotations

import sqlite3
from dataclasses import dataclass
from typing import Any

from langgraph.checkpoint.sqlite import SqliteSaver

from app.config import Settings, get_settings
from app.graph.graph import build_graph
from app.llm import build_chat_model
from app.store import ResolutionStore
from app.zebraai.client import ZebraAIClient
from app.zebraai.factory import build_client


@dataclass
class Runtime:
    graph: Any
    client: ZebraAIClient
    store: ResolutionStore | None = None
    llm: Any | None = None


_runtime: Runtime | None = None


def build_runtime(settings: Settings | None = None) -> Runtime:
    settings = settings or get_settings()
    client = build_client(settings)
    llm = build_chat_model(settings)  # requires Azure OpenAI settings at this point

    settings.sqlite_path.parent.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(str(settings.sqlite_path), check_same_thread=False)
    checkpointer = SqliteSaver(conn)
    store = ResolutionStore(conn)

    graph = build_graph(
        client,
        llm,
        checkpointer=checkpointer,
        max_retries=settings.self_check_max_retries,
    )
    return Runtime(graph=graph, client=client, store=store, llm=llm)


def get_runtime() -> Runtime:
    global _runtime
    if _runtime is None:
        _runtime = build_runtime()
    return _runtime
