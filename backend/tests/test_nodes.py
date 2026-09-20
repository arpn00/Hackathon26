"""Tool nodes (seed / recall / kb / icm) against the mock ZebraAI client."""

from __future__ import annotations

import pytest

from app.config import get_settings
from app.graph.nodes.icm import icm_node
from app.graph.nodes.kb import kb_node
from app.graph.nodes.recall import recall_node
from app.graph.nodes.seed import seed_node
from app.zebraai.mock_client import MockZebraAIClient

FLAGSHIP = "8809074412559830"
SPARSE = "8809082348468911"


@pytest.fixture()
def client() -> MockZebraAIClient:
    return MockZebraAIClient(get_settings().fixtures_dir)


def test_seed_normalizes() -> None:
    assert seed_node({"case_number": "  8809074412559830 "}) == {
        "case_number": FLAGSHIP
    }


def test_seed_rejects_empty() -> None:
    with pytest.raises(ValueError):
        seed_node({"case_number": "  "})


def test_recall_flagship(client: MockZebraAIClient) -> None:
    out = recall_node(client)({"case_number": FLAGSHIP})
    assert out["seed_case"]["caseNumber"] == FLAGSHIP
    assert len(out["precedents"]) == 4


def test_kb_flagship(client: MockZebraAIClient) -> None:
    out = kb_node(client)({"case_number": FLAGSHIP})
    assert len(out["kb_articles"]) == 4


def test_icm_flagship_is_outage(client: MockZebraAIClient) -> None:
    out = icm_node(client)({"case_number": FLAGSHIP})
    assert out["incident"] is not None
    assert out["incident"]["isOutage"] is True


def test_sparse_case_degrades(client: MockZebraAIClient) -> None:
    assert recall_node(client)({"case_number": SPARSE})["precedents"] == []
    assert kb_node(client)({"case_number": SPARSE})["kb_articles"] == []
    assert icm_node(client)({"case_number": SPARSE})["incident"] is None
