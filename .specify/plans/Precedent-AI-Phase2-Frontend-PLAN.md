# Precedent AI — Phase 2 Frontend (+ backend deltas) PLAN

Status: Approved for implementation (task-by-task, reviewed cadence).
Depends on: `Precedent-AI-Phase1-Backend-PLAN.md` (implemented, 45 tests green).

## 1. Scope Summary

Build an **enterprise-grade React + Fluent UI** demo web app that consumes the Phase 1
backend and showcases the full agentic flow — evidence retrieval → GPT reasoning → routing
→ drafted resolution → **human-in-the-loop** review → feedback. Optimized so **judges can
pick a demo case in one click and watch the entire agent flow**, with a polished Microsoft
look-and-feel. The app may be handed to judges to play with.

Approved design decisions:
- **Reject → revise loop**: human-in-the-loop exposes **Approve / Edit / Reject-with-reason**;
  Reject re-runs the agent using the reviewer's reason (reuses the existing gap-feed).
- **Human-interaction audit trail**: every agent milestone and every human turn is recorded as
  an ordered `interactions[]` list, persisted, and rendered as an **InteractionTimeline** so the
  demo visibly shows the human and the AI taking turns (agent drafts → human rejects → agent
  revises → human approves → feedback).
- **Local SQLite persistence** (not Cosmos) for durable threads + feedback; `runId` added to
  the resolve envelope; a "Recent resolutions" panel. Cosmos is the documented production
  scale-out path (talk track), optional if time allows.
- Branding: generic Fluent theming (no official MS logos). Theme: **Light** default.

Out of scope (flagged): auth/SSO, real step streaming (SSE), mobile-first design, cloud
deployment/hosting, live ZebraAI mode toggle in UI, Cosmos DB.

## 2. Affected Areas

- **New** top-level `frontend/` (Vite + React + TS + Fluent UI v9), sibling to `backend/`.
- **Backend deltas (additive, in scope):**
  - `app/graph/graph.py` — conditional edge after `human_gate`: `reject` → `synthesize`
    (inject reviewer reason as a gap), `approve`/`edit` → `finalize`; cap human revisions.
  - `app/graph/nodes/synthesize.py` — accept a reviewer reason as an additional gap source.
  - **Interaction audit trail**: add `interactions: Annotated[list, add]` to `PrecedentState`
    (additive reducer so parallel fan-out and repeated turns append rather than overwrite).
    Agent nodes (recall/route/synthesize/selfcheck) append a milestone entry; `human_gate`
    appends the human turn on resume. Each entry:
    `{ seq, actor: "agent"|"human", type, detail, revision, timestamp }`.
  - Checkpointer: swap `MemorySaver` → SQLite checkpointer (`langgraph-checkpoint-sqlite`).
  - Feedback: persist to a small SQLite table (also appended to `interactions[]`).
  - `app/api_models.py` / `app/main.py` — add `runId` and `interactions[]` to `ResolveResponse`;
    support `decision: "reject"` + `reason` on the review route; add `GET /resolve` list endpoint.
  - `pyproject.toml` — add `langgraph-checkpoint-sqlite`.
- `.gitignore` — add `frontend/node_modules`, `frontend/dist`, Vite caches, and the local
  SQLite `.db` file.
- No changes to `fixtures/` or the Phase 0/1 plans.

## 3. Proposed Changes

### 3.1 Stack
- **Vite + React 18 + TypeScript** (matches developer preference).
- **Fluent UI v9** (`@fluentui/react-components`, `@fluentui/react-icons`) via `FluentProvider`
  + `webLightTheme` for the Microsoft enterprise feel.
- **Vitest + React Testing Library**; `tsc --noEmit` + ESLint for static checks.
- React hooks + a thin typed `fetch` client (no extra state library).

### 3.2 Frontend folder tree
```
frontend/
  package.json  vite.config.ts  tsconfig.json  .env.example  index.html
  src/
    main.tsx                # FluentProvider + theme
    App.tsx                 # app shell + gallery/workspace navigation
    api/
      client.ts             # typed fetch wrapper (base URL from VITE_API_BASE_URL)
      types.ts              # TS mirror of api_models.py
    data/demoCases.ts       # curated 3 fixture cases (title, product, severity, expected flow)
    components/
      AppHeader.tsx         # MS-style top bar + backend health indicator
      CaseGallery.tsx       # clickable demo case cards + free-text case input
      RecentResolutions.tsx # list from GET /resolve
      InteractionTimeline.tsx # ordered agent + human turns (audit trail): seed → recall/kb/icm
                              #   → route → synthesize → self-check → human review → (revise…)
      SeedCasePanel.tsx     # seed case summary (severity/product/ICM link)
      EvidencePanels.tsx    # precedents / KB articles / incident columns
      RouteBadge.tsx        # resolve/deflect/escalate + confidence chip
      DraftPanel.tsx        # plan (steps), reply, citations
      ReviewBar.tsx         # Approve / Edit / Reject-with-reason
      FeedbackBar.tsx       # rating (1–5) + note
      ErrorState.tsx / Loading.tsx / EmptyState.tsx
    hooks/useResolveRun.ts  # resolve → review → (reject→revise) lifecycle + status
    theme.ts
    __tests__/              # vitest specs
```

### 3.3 API integration (camelCase envelope)
- `POST /resolve` `{ caseNumber }` → `ResolveResponse`
  (`threadId, runId, status, route, confidence, outageDeflection,
  draft{plan,reply,citations}, seedCase, precedents, kbArticles, incident, interactions[]`).
- `GET /resolve/{threadId}` → same envelope (includes the full `interactions[]` history).
- `GET /resolve` → list of recent runs (id, caseNumber, status, route, timestamp).
- `POST /resolve/{threadId}/review` `{ decision: "approve"|"edit"|"reject", editedText?, reason? }`
  → `finalReply` + `status`. `reject` resumes into a fresh draft (awaiting_review again).
- `POST /feedback` `{ experiment, runId, rating, note? }` → persisted.
- `GET /healthz` → header connection indicator.
- Errors mapped from `{ error: { code, message } }` and FastAPI 422 `{ detail: [...] }`.

### 3.4 Demo-case gallery
| Card | Case | Expected flow |
|---|---|---|
| Azure App Service 503s (East US) — Sev A | `8809074412559830` | **Resolve** — precedents + KB + resolved outage incident |
| Xbox refund not received — Sev C | `8809081904518713` | **Resolve** — precedents + refund KB, no incident |
| Advertising SMB consultation — Sev C | `8809082348468911` | **Escalate** — no precedent (honest no-match) |
Plus a free-text field for any case number (drives the 404 path gracefully).

### 3.5 Agent flow visualization
`InteractionTimeline` renders the ordered `interactions[]` from the envelope — a single vertical
thread interleaving **agent** milestones and **human** turns (retrieved evidence, routed,
drafted v1, human rejected + reason, revised v2, human approved, feedback). While the blocking
`/resolve` call runs, upcoming agent stages animate as pending, then reconcile to the returned
history. Backend does not stream, so pre-response animation is cosmetic; the persisted
`interactions[]` is the real record. Real SSE streaming noted as an enhancement.

### 3.6 Reject → revise (backend + UI)
- UI: Reject opens a reason box; on submit posts `{ decision: "reject", reason }`.
- Backend: `human_gate` resume value routes `reject` back to `synthesize` with the reason as a
  gap; run returns to `awaiting_review` with a new draft. Every turn (agent + human) is appended
  to `interactions[]`. Revision count capped (e.g. 2); once exhausted, the run finalizes with the
  latest draft. Review controls disable at `completed`.

### 3.7 Enterprise polish
Fluent `Card`, `Badge`, `Spinner`/`Skeleton`, `Toaster`, typography ramp, severity color
coding, ICM deep-link buttons. Header + two-pane workspace (evidence left, draft/review right),
responsive to laptop widths.

## 4. Constitution Compliance Check
- Source of truth: UI renders only backend responses derived from the wiki-grounded
  experiments; no new ZebraAI claims. ✅
- No secrets client-side: frontend holds no ZebraAI/Azure keys; all AI/data via the backend;
  only non-secret `VITE_API_BASE_URL` configured. ✅
- Synthetic-first: gallery uses only synthetic fixtures; no real CSS data. ✅
- No PII/secrets in logs (frontend or new SQLite stores). ✅
- Smallest demoable slice; enterprise feel serves Impact/Innovation. ✅
- Persistence is local SQLite (no new cloud data surface); Cosmos deferred. ✅

## 5. Test / Validation Strategy
- **Frontend (Vitest + RTL)**: API client mapping + error handling (mock `fetch`);
  `CaseGallery` selection; `ReviewBar` approve/edit/reject; `DraftPanel`/`EvidencePanels`
  rendering from a canned `ResolveResponse`; `InteractionTimeline` renders interleaved
  agent/human entries in order; `useResolveRun` lifecycle incl. reject→revise.
- **Backend (pytest)**: reject→revise routing + revision cap; `interactions[]` records the full
  ordered trail across approve/edit/reject (additive reducer, no overwrite on fan-out); SQLite
  checkpointer round-trip; feedback persistence; `runId` + `interactions[]` in envelope;
  `GET /resolve` list. Existing 45 tests stay green.
- **Static**: `tsc --noEmit` + ESLint clean; backend `get_errors`/pytest clean.
- **Manual smoke** (documented): backend + `uvicorn` running, `npm run dev` → each of the 3
  cases → resolve, approve/edit/reject, feedback, unknown-case 404 toast, recent list, and the
  interaction timeline shows every human turn.

## 6. Risks And Open Questions
1. **Node.js dependency** — needs Node 18+ locally; verify before scaffolding.
2. **Reject loop bounds** — revision cap required to avoid infinite loops; default 2.
3. **No streaming** — timeline is a client-side animation, not live telemetry.
4. **Review after completion** — UI disables review controls once `status === "completed"`.
5. **SQLite file location / concurrency** — single-file store fine for demo; concurrent writers
   minimal. Document the `.db` path and gitignore it.
6. **Cosmos** — documented as production scale-out; only built if spare time remains.
7. **Branding** — generic Fluent theming only; no official MS marks.
8. **Interactions reducer/ordering** — `interactions[]` needs an additive reducer
   (`Annotated[list, operator.add]`) so parallel fan-out nodes append instead of clobbering;
   entries carry a `seq`/`timestamp` so the UI can render a stable order.

## 6a. Build Order (task-by-task, reviewed cadence)
Backend deltas first (so the frontend consumes a stable contract), then the app:
1. Reject→revise conditional + revision cap (+ tests).
2. `interactions[]` audit trail with additive reducer; agent + human turns recorded (+ tests).
3. SQLite checkpointer + feedback persistence (+ tests).
4. `runId` + `interactions[]` in envelope; `GET /resolve` list endpoint (+ tests).
5. Frontend scaffold (Vite + React + TS + Fluent) + typed API client + types.
6. Case gallery + workspace shell.
7. Resolve run + evidence/draft rendering + InteractionTimeline.
8. ReviewBar (approve/edit/reject) + FeedbackBar + RecentResolutions.
9. Full validation + demo smoke pass.

## 7. Approval Request
Approved. Proceed task-by-task (slow, reviewed cadence), backend deltas first (so the frontend
consumes a stable contract), then the React + Fluent UI app. Each task validated with tests
before moving on.
