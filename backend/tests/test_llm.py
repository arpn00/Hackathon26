"""LLM factory behavior (offline — no network calls)."""

from __future__ import annotations

import pytest
from langchain_openai import AzureChatOpenAI

from app.config import Settings
from app.llm import build_chat_model


def test_missing_azure_settings_raises() -> None:
    # _env_file=None isolates from a local .env so the "missing" case is truly empty.
    settings = Settings(
        _env_file=None,
        zebraai_mode="mock",
        azure_openai_endpoint=None,
        azure_openai_api_key=None,
        azure_openai_deployment=None,
    )
    with pytest.raises(RuntimeError, match="Azure OpenAI"):
        build_chat_model(settings)


def test_builds_model_with_settings() -> None:
    settings = Settings(
        azure_openai_endpoint="https://example.openai.azure.com/",
        azure_openai_api_key="dummy-key",
        azure_openai_deployment="gpt-test",
    )
    model = build_chat_model(settings, temperature=0.2)
    assert isinstance(model, AzureChatOpenAI)
    assert model.temperature == 0.2
