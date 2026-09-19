"""Azure OpenAI chat model factory (the agent's GPT reasoning brain).

Settings are validated lazily here, so importing the app and running offline tests
never requires cloud credentials — only building the model does.
"""

from __future__ import annotations

from langchain_openai import AzureChatOpenAI

from app.config import Settings, get_settings


def build_chat_model(
    settings: Settings | None = None, *, temperature: float = 0.1
) -> AzureChatOpenAI:
    settings = settings or get_settings()
    settings.require_azure_openai()
    return AzureChatOpenAI(
        azure_endpoint=settings.azure_openai_endpoint,
        api_key=settings.azure_openai_api_key,
        azure_deployment=settings.azure_openai_deployment,
        api_version=settings.azure_openai_api_version,
        temperature=temperature,
    )
