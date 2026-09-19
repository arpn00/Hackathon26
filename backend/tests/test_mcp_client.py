"""Offline contract test for the dormant live MCP client (grounded in the wiki).

Uses respx to intercept the HTTP call and a fake credential so no network or Entra token
is required. Verifies the JSON-RPC request shape and SSE result parsing.
"""

from __future__ import annotations

import json
from types import SimpleNamespace

import httpx
import pytest
import respx

from app.config import Settings
from app.zebraai.mcp_client import McpZebraAIClient

MCP_URL = "https://example.test/mcp"


class _FakeCredential:
    def get_token(self, *_args, **_kwargs):
        return SimpleNamespace(token="fake-token")


def _client() -> McpZebraAIClient:
    settings = Settings(
        _env_file=None,
        zebraai_mode="live",
        zebraai_mcp_url=MCP_URL,
        zebraai_experiment_case_km_id="km-guid",
        zebraai_experiment_case_icm_id="icm-guid",
    )
    client = McpZebraAIClient(settings)
    client._credential = _FakeCredential()  # bypass Entra
    return client


def _sse(result_payload: dict) -> str:
    envelope = {
        "jsonrpc": "2.0",
        "id": "1",
        "result": {"content": [{"type": "text", "text": json.dumps(result_payload)}]},
    }
    return f"event: message\ndata: {json.dumps(envelope)}\n\n"


@respx.mock
def test_run_experiment_builds_request_and_parses_sse() -> None:
    payload = {"case": {"caseNumber": "123"}, "knowledgeArticles": [{"kmId": "417802"}]}
    route = respx.post(MCP_URL).mock(
        return_value=httpx.Response(
            200, text=_sse(payload), headers={"content-type": "text/event-stream"}
        )
    )

    result = _client().run_experiment("case_km", "123")

    assert result == payload
    sent = json.loads(route.calls.last.request.content)
    assert sent["method"] == "tools/call"
    args = sent["params"]["arguments"]
    assert sent["params"]["name"] == "run_experiment"
    assert args["experiment_id"] == "km-guid"
    assert args["search"] == "123"
    assert args["sensitive_do_not_log"] is True
    assert route.calls.last.request.headers["authorization"] == "Bearer fake-token"


def test_vector_case_review_not_live_callable() -> None:
    with pytest.raises(NotImplementedError):
        _client().run_experiment("vector_case_review", "123")


def test_extract_result_unwraps_structured_content() -> None:
    envelope = {"jsonrpc": "2.0", "result": {"structuredContent": {"a": 1}}}
    sse = f"data: {json.dumps(envelope)}\n"
    assert McpZebraAIClient._extract_result(sse) == {"a": 1}


def test_extract_result_raises_on_error() -> None:
    envelope = {"jsonrpc": "2.0", "error": {"code": -32000, "message": "boom"}}
    sse = f"data: {json.dumps(envelope)}\n"
    with pytest.raises(RuntimeError):
        McpZebraAIClient._extract_result(sse)
