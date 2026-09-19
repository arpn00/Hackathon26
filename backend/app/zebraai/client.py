"""The ZebraAI client seam.

The agent only ever depends on this interface, so mock (fixtures) and live (MCP)
implementations are interchangeable behind `ZEBRAAI_MODE`.
"""

from __future__ import annotations

from pathlib import Path
from typing import Protocol, runtime_checkable

# Experiments callable over the live API/MCP. Vector Case Review is intentionally
# excluded — it is not API/MCP-callable and is always served from fixtures.
LIVE_CALLABLE: set[str] = {"case_km", "case_icm"}


class UnknownExperimentError(KeyError):
    """Raised when an experiment logical name is not recognized."""


class FixtureNotFoundError(FileNotFoundError):
    """Raised when a mock fixture file does not exist for a case."""

    def __init__(self, path: Path, case_number: str | None = None) -> None:
        # `path` is kept for server-side logging only; never surface it to API callers.
        super().__init__(f"No fixture at {path}")
        self.path = path
        self.case_number = case_number


@runtime_checkable
class ZebraAIClient(Protocol):
    def run_experiment(self, experiment: str, case_number: str, **kwargs) -> dict: ...

    def submit_feedback(
        self, experiment: str, run_id: str, rating: str, note: str | None = None
    ) -> dict: ...
