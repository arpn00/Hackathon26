"""ResolutionStore: index upsert/list and feedback persistence (temp SQLite)."""

from __future__ import annotations

from app.store import ResolutionStore


def test_upsert_and_list(tmp_path) -> None:
    store = ResolutionStore.open(tmp_path / "s.db")
    store.upsert_resolution(
        "t-1", case_number="123", status="awaiting_review", route="resolve", confidence="high"
    )
    rows = store.list_resolutions()
    assert len(rows) == 1
    assert rows[0]["thread_id"] == "t-1"
    assert rows[0]["status"] == "awaiting_review"


def test_upsert_updates_existing_row(tmp_path) -> None:
    store = ResolutionStore.open(tmp_path / "s.db")
    store.upsert_resolution(
        "t-1", case_number="123", status="awaiting_review", route="resolve", confidence="high"
    )
    store.upsert_resolution(
        "t-1", case_number="123", status="completed", route="resolve", confidence="high"
    )
    rows = store.list_resolutions()
    assert len(rows) == 1
    assert rows[0]["status"] == "completed"


def test_add_feedback_returns_id(tmp_path) -> None:
    store = ResolutionStore.open(tmp_path / "s.db")
    fid = store.add_feedback("case_km", "run-1", 5, "great")
    assert fid >= 1
