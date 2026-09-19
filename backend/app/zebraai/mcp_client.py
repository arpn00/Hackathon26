"""Live ZebraAI MCP client (dormant path — only built when ZEBRAAI_MODE=live).

Grounded in ZebraAI-Wiki/How-To-Guides/Using-ZebraAI-MCP-Server.md:
  - Streamable HTTP JSON-RPC at the /mcp endpoint.
  - Entra ID auth; token audience = the ZebraAI API resource; scope <resource>/.default.
  - tools/call -> run_experiment { experiment_id (GUID), search, max_rows,
    sensitive_do_not_log: true }. Friendly experiment names are NOT supported.
  - Responses are text/event-stream; the JSON-RPC result is on the `data:` line.

Honest limits: only case_km and case_icm are API/MCP-callable. Vector Case Review is not
exposed via the API/MCP, so it always stays in mock mode.
"""

from __future__ import annotations

import json
from typing import Any

from app.config import Settings
from app.zebraai.client import LIVE_CALLABLE

_MCP_PROTOCOL_VERSION = "2024-11-05"


class McpZebraAIClient:
    def __init__(self, settings: Settings) -> None:
        self._url = settings.zebraai_mcp_url
        self._tenant_id = settings.zebraai_tenant_id
        self._scope = f"api://{settings.zebraai_resource_id}/.default"
        self._experiment_ids: dict[str, str | None] = {
            "case_km": settings.zebraai_experiment_case_km_id,
            "case_icm": settings.zebraai_experiment_case_icm_id,
        }
        self._credential: Any | None = None

    # -- auth ---------------------------------------------------------------
    def _token(self) -> str:
        if self._credential is None:
            from azure.identity import DefaultAzureCredential

            self._credential = DefaultAzureCredential(
                interactive_browser_tenant_id=self._tenant_id
            )
        return self._credential.get_token(self._scope).token

    def _headers(self) -> dict[str, str]:
        return {
            "Authorization": f"Bearer {self._token()}",
            "Accept": "application/json, text/event-stream",
            "MCP-Protocol-Version": _MCP_PROTOCOL_VERSION,
            "Content-Type": "application/json",
        }

    # -- experiment mapping -------------------------------------------------
    def _experiment_guid(self, experiment: str) -> str:
        if experiment not in LIVE_CALLABLE:
            raise NotImplementedError(
                f"Experiment '{experiment}' is not API/MCP-callable; keep it in mock mode"
            )
        guid = self._experiment_ids.get(experiment)
        if not guid:
            raise RuntimeError(f"No experiment GUID configured for '{experiment}'")
        return guid

    # -- MCP plumbing -------------------------------------------------------
    def _call_tool(self, name: str, arguments: dict[str, Any], *, request_id: str) -> dict:
        import httpx

        body = {
            "jsonrpc": "2.0",
            "id": request_id,
            "method": "tools/call",
            "params": {"name": name, "arguments": arguments},
        }
        response = httpx.post(self._url, headers=self._headers(), json=body, timeout=60.0)
        response.raise_for_status()
        return self._extract_result(response.text)

    @staticmethod
    def _extract_result(sse_text: str) -> dict:
        for line in sse_text.splitlines():
            line = line.strip()
            if not line.startswith("data:"):
                continue
            raw = line[len("data:") :].strip()
            try:
                message = json.loads(raw)
            except json.JSONDecodeError:
                continue
            if "error" in message:
                raise RuntimeError(f"MCP error: {message['error']}")
            result = message.get("result", message)
            if isinstance(result, dict):
                content = result.get("content")
                if isinstance(content, list) and content:
                    text = content[0].get("text")
                    if text is not None:
                        try:
                            return json.loads(text)
                        except json.JSONDecodeError:
                            return {"text": text}
                if "structuredContent" in result:
                    return result["structuredContent"]
            return result if isinstance(result, dict) else {"result": result}
        raise RuntimeError("No data line found in MCP SSE response")

    # -- ZebraAIClient protocol --------------------------------------------
    def run_experiment(self, experiment: str, case_number: str, **kwargs: Any) -> dict:
        guid = self._experiment_guid(experiment)
        arguments = {
            "experiment_id": guid,
            "search": kwargs.get("search", case_number),
            "max_rows": kwargs.get("max_rows", 25),
            "sensitive_do_not_log": True,
        }
        return self._call_tool("run_experiment", arguments, request_id=f"run-{case_number}")

    def submit_feedback(
        self, experiment: str, run_id: str, rating: int, note: str | None = None
    ) -> dict:
        guid = self._experiment_guid(experiment)
        # NOTE: the MCP submit_feedback argument schema is not documented in the wiki;
        # these argument names are a best effort and may need adjustment once confirmed.
        arguments: dict[str, Any] = {
            "experiment_id": guid,
            "run_id": run_id,
            "rating": rating,
        }
        if note:
            arguments["note"] = note
        return self._call_tool("submit_feedback", arguments, request_id=f"fb-{run_id}")
