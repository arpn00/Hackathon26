# Precedent AI — Backend

Agentic backend for **Precedent AI**: a LangGraph state-graph that chains ZebraAI
experiments as tools, reasons with Azure OpenAI, deflects known outages, and pauses
at a human-in-the-loop review gate. Runs on synthetic mock fixtures by default, with a
live path via the ZebraAI MCP server behind one env var.

See the plan: [`.specify/plans/Precedent-AI-Phase1-Backend-PLAN.md`](../.specify/plans/Precedent-AI-Phase1-Backend-PLAN.md).

## Prerequisites

- Python 3.12+

## Setup

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -e ".[dev]"
Copy-Item .env.example .env   # then fill in Azure OpenAI values
```

## Configuration

All settings load from the environment / `.env` (see `.env.example`). Nothing secret is
committed. Key switch:

- `ZEBRAAI_MODE=mock` (default) — serves ZebraAI responses from `fixtures/zebraai/*.json`.
- `ZEBRAAI_MODE=live` — calls the ZebraAI MCP server (requires approved experiments + auth).

## Run

```powershell
uvicorn app.main:app --reload   # (added in a later task)
```

## Test

```powershell
pytest
```
