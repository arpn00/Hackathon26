"""Application configuration loaded from environment / .env.

Secrets are never hardcoded — they come from the environment and are validated
lazily so importing the app (and running offline tests) never requires cloud keys.
"""

from __future__ import annotations

from functools import lru_cache
from pathlib import Path
from typing import Literal

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict

# <repo>/fixtures/zebraai  (this file is <repo>/backend/app/config.py)
_REPO_ROOT = Path(__file__).resolve().parents[2]
_DEFAULT_FIXTURES_DIR = _REPO_ROOT / "fixtures" / "zebraai"


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env", env_file_encoding="utf-8", extra="ignore"
    )

    # Data source
    zebraai_mode: Literal["mock", "live"] = "mock"
    fixtures_dir: Path = _DEFAULT_FIXTURES_DIR

    # Azure OpenAI (agent reasoning brain)
    azure_openai_endpoint: str | None = None
    azure_openai_api_key: str | None = None
    azure_openai_deployment: str | None = None
    azure_openai_api_version: str = "2024-10-21"

    # ZebraAI MCP server (live mode only)
    zebraai_mcp_url: str = "https://zebra-ai-api-prd.ait.microsoft.com/mcp"
    zebraai_tenant_id: str = "72f988bf-86f1-41af-91ab-2d7cd011db47"
    zebraai_resource_id: str = "9021b3a5-1f0d-4fb7-ad3f-d6989f0432d8"
    zebraai_experiment_case_km_id: str | None = None
    zebraai_experiment_case_icm_id: str | None = None

    # API / agent behavior
    cors_allowed_origins: str = "http://localhost:5173"
    self_check_max_retries: int = Field(default=1, ge=0)

    # Persistence (checkpoints + resolutions/feedback index)
    sqlite_path: Path = _REPO_ROOT / "backend" / "precedent.db"

    @property
    def cors_origins(self) -> list[str]:
        return [o.strip() for o in self.cors_allowed_origins.split(",") if o.strip()]

    def require_azure_openai(self) -> None:
        """Raise if the Azure OpenAI settings needed to build the LLM are missing."""
        missing = [
            name
            for name, value in (
                ("AZURE_OPENAI_ENDPOINT", self.azure_openai_endpoint),
                ("AZURE_OPENAI_API_KEY", self.azure_openai_api_key),
                ("AZURE_OPENAI_DEPLOYMENT", self.azure_openai_deployment),
            )
            if not value
        ]
        if missing:
            raise RuntimeError(
                "Missing Azure OpenAI settings: " + ", ".join(missing)
            )

    def require_live_mcp(self) -> None:
        """Raise if live mode is selected without the MCP experiment GUIDs."""
        missing = [
            name
            for name, value in (
                ("ZEBRAAI_EXPERIMENT_CASE_KM_ID", self.zebraai_experiment_case_km_id),
                ("ZEBRAAI_EXPERIMENT_CASE_ICM_ID", self.zebraai_experiment_case_icm_id),
            )
            if not value
        ]
        if missing:
            raise RuntimeError(
                "ZEBRAAI_MODE=live requires: " + ", ".join(missing)
            )


@lru_cache
def get_settings() -> Settings:
    return Settings()
