"""Mock ZebraAI client — serves experiment responses from fixture JSON files."""

from __future__ import annotations

import json
import logging
from pathlib import Path

from app.models import FIXTURE_PREFIX
from app.zebraai.client import FixtureNotFoundError, UnknownExperimentError

logger = logging.getLogger(__name__)


class MockZebraAIClient:
    """Reads `fixtures/zebraai/{prefix}_{caseNumber}.json`."""

    def __init__(self, fixtures_dir: Path) -> None:
        self._dir = Path(fixtures_dir)

    def run_experiment(self, experiment: str, case_number: str, **kwargs) -> dict:
        prefix = FIXTURE_PREFIX.get(experiment)
        if prefix is None:
            raise UnknownExperimentError(experiment)
        path = self._dir / f"{prefix}_{case_number}.json"
        if not path.exists():
            raise FixtureNotFoundError(path, case_number=case_number)
        return json.loads(path.read_text(encoding="utf-8"))

    def submit_feedback(
        self, experiment: str, run_id: str, rating: str, note: str | None = None
    ) -> dict:
        # No external call in mock mode — just record intent locally.
        logger.info(
            "mock submit_feedback experiment=%s run_id=%s rating=%s", experiment, run_id, rating
        )
        return {"status": "accepted", "mode": "mock", "runId": run_id, "rating": rating}
