"""Build the ZebraAI client based on ZEBRAAI_MODE."""

from __future__ import annotations

from app.config import Settings, get_settings
from app.zebraai.client import ZebraAIClient
from app.zebraai.mock_client import MockZebraAIClient


def build_client(settings: Settings | None = None) -> ZebraAIClient:
    settings = settings or get_settings()
    if settings.zebraai_mode == "mock":
        return MockZebraAIClient(settings.fixtures_dir)

    # live
    settings.require_live_mcp()
    from app.zebraai.mcp_client import McpZebraAIClient  # deferred until the MCP task

    return McpZebraAIClient(settings)
