# Precedent AI — Hackathon Video Plan

> **Goal:** a ≤ 2:00 submission video that (1) welcomes the audience, (2) names the CSS pain,
> (3) explains what ZebraAI is, (4) *shows* the live app doing real work, (5) explains how we
> consume ZebraAI experiments + LangGraph while keeping the **engineer the decider**, and (6)
> closes strong.
> **Deadline:** Mon **Sep 21, 11:59 PM PT**. **Data:** 100% synthetic. **Secrets:** never on screen.

---

## 1. Production model (hybrid — your preference kept)

We split the video into two kinds of footage and **stitch everything in Clipchamp**:

| Footage kind | Source | Why |
|---|---|---|
| **App demo scenes** (Act 3) | **Playwright** drives the *real* deployed app and records deterministic 1080p clips | No fumbling, frame-accurate, re-runnable when the app changes |
| **Intro / concept / architecture / outro** (Acts 0–2, 4–5) | Slides + screen captures assembled in **Clipchamp** | Fast to iterate, full creative control |

**Pipeline:**
1. **Playwright** records each app scene → `video/clips/*.webm` (or `.mp4`) at 1920×1080.
2. (Optional) **FFmpeg/FFprobe** trims each clip to its scripted length and verifies duration/fps.
3. **Clipchamp**: drop clips + intro/outro slides on the timeline, add narration (Clipchamp TTS
   **or** Edge-TTS `en-US-AvaMultilingualNeural`), captions, soft background music, transitions.
4. Export **1080p MP4**, confirm ≤ 2:00, host on OneDrive/SharePoint for the submission link.

**Tool stack (approved-first):**

| Tool | Role |
|---|---|
| Playwright + Microsoft Edge | Deterministic 1080p app recording |
| FFmpeg 9 / FFprobe *(optional)* | Trim clips, verify codec/fps/runtime |
| Clipchamp | Timeline assembly, TTS narration, captions, music, export |
| Edge-TTS *(optional)* | Narration voice `en-US-AvaMultilingualNeural` |
| VS Code + Copilot | Already built the app being recorded |
| OneDrive / SharePoint | Host final video + share link |

> ⚠️ The video-tips session stressed **Microsoft-approved tools**. Playwright/FFmpeg/Edge-TTS are
> OSS/Microsoft-voice; confirm against the deck's allowed-tools links before final export.

---

## 2. Scene grouping (the 2:00 budget)

Six acts. On-screen text holds ≥ 3s. Narration ≈ 145 wpm → ~290 words fits 2:00.

| Act | Scene | ~Time | Source | Wow beat |
|---|---|---|---|---|
| **0. Welcome** | Title / hook | 0:00–0:12 | Clipchamp slide | Data hook |
| **1. The pain** | Scattered knowledge | 0:12–0:30 | Slide + broll | — |
| **2. What is ZebraAI** | Platform + our angle | 0:30–0:44 | Slide | — |
| **3. Live app** | Pick case → investigate → self-correct → cited answer → human gate → honest escalate | 0:44–1:32 | **Playwright** | #1 self-correct, #2 evidence/incident, #3 honest escalate |
| **4. Under the hood** | ZebraAI experiments + LangGraph, engineer decides | 1:32–1:52 | Architecture slide | Human-in-the-loop |
| **5. Close** | Tagline + CTA | 1:52–2:00 | Slide | — |

---

## 3. Detailed script (narration + on-screen + source)

> Narration is the draft VO. `[SCREEN]` = what the viewer sees. `[PW]` = a Playwright-scripted
> app action. `[CAP]` = on-screen caption text.

### Act 0 — Welcome (0:00–0:12)
- **VO:** "In customer support, we all trust the data. But the *answer* to today's hard case is
  usually buried in a case we already solved — and no one can find it."
- **[SCREEN]** Title card: **Pre-cedent AI** wordmark + sub-line *"Every hard case has already been
  solved."*
- **[CAP]** `Pre-cedent AI` · *Because it's been solved before.*

### Act 1 — The pain (0:12–0:30)
- **VO:** "A support engineer picks up a Sev A. The fix exists — in a prior case, a KB article, a
  known incident — but it's scattered across threads, notes, and people's heads. So we re-solve
  solved problems: slow, inconsistent, and dependent on who's on shift."
- **[SCREEN]** Simple motion graphic: a case ticket, with knowledge fragments (prior cases / KB /
  ICM / customer history) flying apart.
- **[CAP]** *Known problems, re-solved from scratch.*
- *(Grounded in [Precedent.md §1](../Ideas/Precedent.md), [Common-Use-Cases.md](../ZebraAI-Wiki/Get-Started-With-ZebraAI/Common-Use-Cases.md).)*

### Act 2 — What is ZebraAI (0:30–0:44)
- **VO:** "ZebraAI is Microsoft's secure platform for experimenting with LLMs over real CSS support
  data — compliant, prompt-driven, and shareable. It already retrieves similar cases, KB, and
  incidents. We asked: what if an *agent* used all of it to actually resolve a case?"
- **[SCREEN]** One clean slide: "ZebraAI = secure LLM + CSS data experiments" with 3 chips
  (Know Me · Case+KM · Case+ICM).
- **[CAP]** *ZebraAI: secure LLM experiments on CSS data.*
- *(Grounded in [Overview.md](../ZebraAI-Wiki/Get-Started-With-ZebraAI/Overview.md).)*

### Act 3 — The live app (0:44–1:32)  ⟵ **Playwright-recorded**
Flagship case **8809074412559830** (Azure App Service 503/502 checkout API, Sev A).

**3a — Pick up the case (0:44–0:52)**
- **VO:** "Meet Precedent AI. An engineer opens a revenue-critical Sev A: a checkout API throwing
  intermittent 503s."
- **[PW]** Load app (pre-warmed) → home queue visible → click the Azure case card → `GuidedWorkspace`.
- **[CAP]** *One click: give the agent a case number.*

**3b — The agent investigates (0:52–1:04)**
- **VO:** "Precedent fans out in parallel — pulling similar resolved cases, KB guidance, and any
  linked platform incident — then judges what's actually relevant."
- **[PW]** Click **Resolve** → `LoadingState` → evidence panels populate: `PrecedentsPanel`,
  `KbPanel`, `IncidentPanel`.
- **[CAP]** *Parallel search → fuse → judge relevance.* (highlight the 3 evidence panels)

**3c — It self-corrects (1:04–1:16)  ⟵ WOW #1**
- **VO:** "Watch it *think*: the first draft is low-confidence, so it critiques itself, widens the
  search, and comes back grounded."
- **[PW]** Show the self-check / confidence transition (low → strong) on `ConfidenceBadge` /
  `RouteBadge`; pause 3s on the confidence lift.
- **[CAP]** *Self-check loop: it grades its own answer.*

**3d — Cited answer + the human decides (1:16–1:26)  ⟵ WOW #2 (trust)**
- **VO:** "It hands back a resolution and a customer reply — every claim cited to a case, KB, or
  incident. But it never sends anything itself. The engineer approves, edits, or rejects."
- **[PW]** Scroll `DraftPanel` (citations visible) → hover a citation → focus `ReviewBar`
  (Approve / Edit / Reject).
- **[CAP]** *Cited. Confidence-scored. Engineer approves.*

**3e — Honest "no precedent" (1:26–1:32)  ⟵ WOW #3**
- **VO:** "And when there's no precedent — a bespoke request — it doesn't hallucinate. It says so,
  and routes to a human specialist."
- **[PW]** Go home → pick the Advertising case **8809082348468911** → Resolve → route resolves to
  **escalate** with an honest low-confidence message.
- **[CAP]** *No precedent? It says so — and escalates.*

### Act 4 — Under the hood (1:32–1:52)
- **VO:** "Under the hood, a LangGraph agent orchestrates ZebraAI experiments as tools — Case
  Lookup, Know Me semantic search, Case-plus-KB, Case-plus-ICM — with parallel fan-out, conditional
  routing, and a self-check loop. It's fully automated reasoning, with the engineer as the final
  decision-maker and a feedback signal that feeds ZebraAI's flywheel."
- **[SCREEN]** Architecture slide (reuse the §17.4 graph): `Seed → fan-out(KnowMe/KM/ICM) → fuse/judge → synthesize → self-check → 👤 human gate → deliver → feedback`.
- **[CAP]** *LangGraph brain · ZebraAI experiments as tools · human-in-the-loop.*
- *(Grounded in [Precedent.md §17.3–17.6](../Ideas/Precedent.md), [Know-Me.md](../ZebraAI-Wiki/Reference/Experiment-Types/Know-Me.md), [Commercial-Case-KM.md](../ZebraAI-Wiki/Reference/Experiment-Types/Commercial-Case-KM.md), [Commercial-Case-ICM.md](../ZebraAI-Wiki/Reference/Experiment-Types/Commercial-Case-ICM.md).)*

### Act 5 — Close (1:52–2:00)
- **VO:** "Precedent AI: every hard case has already been solved. We just help your best engineer
  find it — and resolve like one."
- **[SCREEN]** Wordmark + tagline; small "Built on ZebraAI · synthetic data" footer.
- **[CAP]** *Pre-cedent AI — solved before.*

---

## 4. Playwright recording spec (Act 3 only)

One script drives the **real app**; each beat is a labeled clip so Clipchamp assembly is trivial.

**Target:** local (`http://localhost:8000` built SPA) **or** the Azure Web App URL — pick one,
pre-warm it (cold start), keep `ZEBRAAI_MODE=mock` so runs are deterministic and synthetic.

**Setup:** viewport 1920×1080, device-scale 1, deterministic wait-for-selector between beats
(no fixed sleeps), hide the cursor except where we intentionally click, slow-mo on clicks so the
motion reads on a projector.

**Clips to capture (filenames = timeline order):**
1. `01-queue.webm` — home queue.
2. `02-open-case.webm` — click Azure card → `GuidedWorkspace`.
3. `03-resolve-loading.webm` — click Resolve → loading.
4. `04-evidence.webm` — Precedents + KB + Incident panels populate.
5. `05-selfcheck.webm` — confidence low → strong.
6. `06-draft-citations.webm` — DraftPanel + citation hover.
7. `07-review-gate.webm` — ReviewBar (Approve/Edit/Reject).
8. `08-escalate.webm` — Advertising case → honest escalate.

**Selectors:** prefer stable roles/text already in the UI (case title text, "Resolve" button,
panel headings). If any beat lacks a stable hook, we add a `data-testid` (tiny, non-visual change).

---

## 5. Guardrails (non-negotiable)
- **Synthetic only** — the three seeded cases; no real CSS data, no PII.
- **No secrets on screen** — never show the Azure OpenAI key blade, `.env`, or app-settings values.
- **Env-var config** — nothing hardcoded; recording uses the mock ZebraAI client.
- **Honest claims** — Act 4 says "consumes ZebraAI experiments"; keep parity with what's wired
  (Know Me + Case+KM + Case+ICM via the mock client today).

---

## 6. Task checklist to the deadline
- [ ] Approve this scene grouping + script (this file).
- [ ] Finalize VO wording (tighten to ~290 words; confirm ≤ 2:00).
- [ ] Choose narration: Clipchamp TTS vs Edge-TTS `AvaMultilingualNeural`.
- [ ] Build the Playwright recorder (`video/record.*`) + capture the 8 clips.
- [ ] (Optional) FFprobe-verify clip durations.
- [ ] Build intro/concept/architecture/outro slides.
- [ ] Assemble in Clipchamp; add captions + soft music; hold text ≥ 3s.
- [ ] Export 1080p MP4; confirm runtime ≤ 2:00; upload to OneDrive/SharePoint.

---

## 7. Open decisions for you
1. **Record against local build or the Azure URL?** (Local = fastest/most stable.)
2. **Narration:** your own voice, Clipchamp TTS, or Edge-TTS?
3. **Include Act 3e (honest escalate)** as a full beat, or a 2s cut to save time?
4. Want me to also generate `video/record.ts` (Playwright) + a `video/clips/` scaffold next?
