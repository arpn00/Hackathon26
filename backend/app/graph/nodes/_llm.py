"""Shared helper: invoke a chat model with a system + JSON payload and parse JSON back.

Kept deliberately small so reasoning nodes stay uniform and are trivial to mock in tests
(any object exposing ``.invoke(messages) -> obj.content`` works).
"""

from __future__ import annotations

import json
from typing import Any

from langchain_core.messages import HumanMessage, SystemMessage


def _strip_fences(text: str) -> str:
    text = text.strip()
    if text.startswith("```"):
        # drop the opening fence line (``` or ```json) and the trailing fence
        lines = text.splitlines()
        lines = lines[1:]
        if lines and lines[-1].strip().startswith("```"):
            lines = lines[:-1]
        text = "\n".join(lines).strip()
    return text


def invoke_json(llm: Any, system_prompt: str, payload: dict[str, Any]) -> dict[str, Any]:
    messages = [
        SystemMessage(content=system_prompt),
        HumanMessage(content=json.dumps(payload, ensure_ascii=False)),
    ]
    response = llm.invoke(messages)
    content = getattr(response, "content", response)
    parsed = json.loads(_strip_fences(str(content)))
    if not isinstance(parsed, dict):
        raise ValueError("Expected a JSON object from the model")
    return parsed
