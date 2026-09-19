"""Lightweight SQLite persistence for the resolutions index and reviewer feedback.

The LangGraph checkpointer already persists full run state; this store keeps a small,
queryable index so the frontend can list recent resolutions and so reviewer feedback
survives restarts (the ZebraAI feedback flywheel).

Kept deliberately simple (stdlib sqlite3) so the demo has no extra infrastructure.
"""

from __future__ import annotations

import sqlite3
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


def _now() -> str:
    return datetime.now(timezone.utc).isoformat()


class ResolutionStore:
    def __init__(self, conn: sqlite3.Connection) -> None:
        self._conn = conn
        self._conn.row_factory = sqlite3.Row
        self._init_schema()

    @classmethod
    def open(cls, path: str | Path) -> "ResolutionStore":
        conn = sqlite3.connect(str(path), check_same_thread=False)
        return cls(conn)

    def _init_schema(self) -> None:
        with self._conn:
            self._conn.execute(
                """
                CREATE TABLE IF NOT EXISTS resolutions (
                    thread_id   TEXT PRIMARY KEY,
                    case_number TEXT,
                    status      TEXT,
                    route       TEXT,
                    confidence  TEXT,
                    updated_at  TEXT
                )
                """
            )
            self._conn.execute(
                """
                CREATE TABLE IF NOT EXISTS feedback (
                    id         INTEGER PRIMARY KEY AUTOINCREMENT,
                    experiment TEXT,
                    run_id     TEXT,
                    rating     INTEGER,
                    note       TEXT,
                    created_at TEXT
                )
                """
            )

    def upsert_resolution(
        self,
        thread_id: str,
        *,
        case_number: str | None,
        status: str,
        route: str | None,
        confidence: str | None,
    ) -> None:
        with self._conn:
            self._conn.execute(
                """
                INSERT INTO resolutions (thread_id, case_number, status, route, confidence, updated_at)
                VALUES (?, ?, ?, ?, ?, ?)
                ON CONFLICT(thread_id) DO UPDATE SET
                    case_number = excluded.case_number,
                    status      = excluded.status,
                    route       = excluded.route,
                    confidence  = excluded.confidence,
                    updated_at  = excluded.updated_at
                """,
                (thread_id, case_number, status, route, confidence, _now()),
            )

    def list_resolutions(self, limit: int = 50) -> list[dict[str, Any]]:
        rows = self._conn.execute(
            """
            SELECT thread_id, case_number, status, route, confidence, updated_at
            FROM resolutions
            ORDER BY updated_at DESC
            LIMIT ?
            """,
            (limit,),
        ).fetchall()
        return [dict(row) for row in rows]

    def add_feedback(
        self, experiment: str, run_id: str, rating: int, note: str | None
    ) -> int:
        with self._conn:
            cur = self._conn.execute(
                """
                INSERT INTO feedback (experiment, run_id, rating, note, created_at)
                VALUES (?, ?, ?, ?, ?)
                """,
                (experiment, run_id, rating, note, _now()),
            )
        return int(cur.lastrowid)
