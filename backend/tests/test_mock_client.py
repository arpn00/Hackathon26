"""MockZebraAIClient + factory behavior."""

from __future__ import annotations

import pytest

from app.config import Settings, get_settings
from app.zebraai.client import (
    FixtureNotFoundError,
    UnknownExperimentError,
    ZebraAIClient,
)
from app.zebraai.factory import build_client
from app.zebraai.mock_client import MockZebraAIClient

FIXTURES_DIR = get_settings().fixtures_dir
FLAGSHIP = "8809074412559830"


@pytest.fixture
def client() -> MockZebraAIClient:
    return MockZebraAIClient(FIXTURES_DIR)


def test_run_experiment_returns_fixture(client: MockZebraAIClient) -> None:
    data = client.run_experiment("vector_case_review", FLAGSHIP)
    assert data["seedCase"]["caseNumber"] == FLAGSHIP


def test_all_three_experiments_load(client: MockZebraAIClient) -> None:
    assert client.run_experiment("case_km", FLAGSHIP)["knowledgeArticles"]
    assert client.run_experiment("case_icm", FLAGSHIP)["relatedIncidents"]


def test_unknown_experiment_raises(client: MockZebraAIClient) -> None:
    with pytest.raises(UnknownExperimentError):
        client.run_experiment("not_a_real_experiment", FLAGSHIP)


def test_missing_fixture_raises(client: MockZebraAIClient) -> None:
    with pytest.raises(FixtureNotFoundError):
        client.run_experiment("vector_case_review", "0000000000000000")


def test_submit_feedback_mock(client: MockZebraAIClient) -> None:
    result = client.submit_feedback("case_km", "run-123", "up")
    assert result["status"] == "accepted"
    assert result["mode"] == "mock"


def test_factory_returns_mock_in_mock_mode() -> None:
    c = build_client(Settings(zebraai_mode="mock"))
    assert isinstance(c, MockZebraAIClient)
    assert isinstance(c, ZebraAIClient)
