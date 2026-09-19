# Precedent AI — Phase 0 Plan: ZebraAI Experiments (Create & Validate)

> **Product:** Precedent AI (visual wordmark: *Pre-cedent AI*).
> **Phase:** 0 of 4 — **ZebraAI only.** Backend (Phase 1), Frontend (Phase 2), Azure (Phase 3)
> are planned separately.
> **Goal of this phase:** Create and validate **every ZebraAI experiment** Precedent AI depends on,
> on **synthetic data**, and **capture each experiment's real JSON output as a fixture** so the
> backend can be built without waiting on API enablement.
> **Source idea:** [Ideas/Precedent.md](../../Ideas/Precedent.md) (esp. §7, §16, §17).
> **Grounded in:** `ZebraAI-Wiki/` (cited throughout). Follows the mandated order:
> *create → validate → request API → integrate*.

---

## 1. Scope Summary

Do everything **inside the ZebraAI portal** that Precedent AI needs, and nothing else:

1. Confirm access + prerequisites.
2. Identify the ZebraAI experiment **types** Precedent AI depends on — **Vector Case Review**
   (precedents) + **Case+KM** (KB) = core; **Case+ICM** (outage deflection) = flashy;
   Case Search = optional.
3. **Define the strict-JSON response contract** for each, **grounded in the wiki field references**
   (the shapes the backend will consume).
4. **Author the demo fixtures** from those documented shapes (synthetic, clearly marked) — the key
   deliverable → drives the backend mocks.
5. Keep prompts on file so a live run can be captured later, and **validate** any live run against a
   small synthetic golden set (best-effort, not blocking).
6. **Request API enablement** for the API-callable types (Case+KM, Case+ICM) in parallel — best-effort,
   explicitly **off the critical path**.

**Out of scope for Phase 0:** any backend/frontend code, Azure deployment, real CSS data.

> **Decision (2026-09-19):** We are **not standing up live experiments** in this phase — **Know Me is
> role-gated** and **Vector Case Review lookup won't resolve synthetic case numbers**, and none are
> guaranteed API-integrable in our window. Phase 0 therefore delivers the **wiki-grounded expected-JSON
> contracts + authored demo fixtures** (see §4B), which fully unblock Phase 1. See §4.1 for the pivot
> rationale.

---

## 2. Affected Areas

- **ZebraAI portal** — new experiments (E1–E4) + Add-Experiment-API requests. No repo code.
- **Repo artifact produced by this phase:** a set of **fixture JSON files** (captured experiment
  outputs) + a short **response-contract note**. Suggested location (create in Phase 0 execution,
not now): `fixtures/zebraai/` (e.g. `vectorreview_<case>.json`, `casekm_<case>.json`,
  `caseicm_<case>.json`). These feed the Phase 1 `MockClient`.

---

## 3. Prerequisites (do first)

- [ ] **Contributor access** to ZebraAI confirmed/requested.
      [Set-up-and-Access.md](../../ZebraAI-Wiki/Get-Started-With-ZebraAI/Set-up-and-Access.md)
- [ ] Ability to create an **Entra ID app registration** confirmed (needed for the API Client ID
      later). If you cannot self-register, line up who can.
      [Add-Experiment-API.md](../../ZebraAI-Wiki/How-To-Guides/Add-Experiment-API.md)
- [x] **Synthetic golden set — HARVESTED (2026-09-19)** from a scratch Commercial Case Search.
      Note: environment returns `8809…` case numbers (wiki's `99` prefix is stale — trust the
      environment). RICH/SPARSE are candidates until confirmed by running Know Me (Part B).

      | Label | Case Number | Product path / why |
      |-------|-------------|--------------------|
      | **RICH-1** | `8809081904518713` | Xbox › Xbox Console › Billing › Request a refund — dense cluster, precedents likely. |
      | **RICH-2** | `8809121704084153` | Same refund cluster — may surface RICH-1 as a related case (great demo). |
      | **SPARSE-1** | `8809082348468911` | Advertising Solutions › Top SMB › Consultation (Open) — one-of-a-kind, tests "no precedent" path. |
      | **ICM-cand** | `8809081904391464` | MARS account-recovery — placeholder; confirm the real ICM-linked case in E3. |

      Backup refund cases (if a rich one comes back thin): `8809081543384086`, `8809082348423393`,
      `8809081908518572`, `8809081505383936`, `8809081506312342`.
      [About-ZebraAI-Experiments.md](../../ZebraAI-Wiki/Get-Started-With-ZebraAI/About-ZebraAI-Experiments.md),
      [Synthetic-Data-Creation-Process.md](../../ZebraAI-Wiki/Reference/Data/Synthetic-Data-Creation-Process.md)

**Common creation settings for every experiment** (Experiment tab):
Share Level = **Hackathon**; EU Data = **off**; System Prompt Handling = **off** (synthetic data);
Model = GPT-5 mini (data-shaping tasks; tune later). Source:
[Create-An-Experiment.md](../../ZebraAI-Wiki/Get-Started-With-ZebraAI/Create-An-Experiment.md).

> ⚠️ **CRITICAL — User Experience is NOT "Simple" for these experiments.** Each experiment must use
> its **own matching User Experience type**, chosen on the *User Experience* tab, and this choice
> **cannot be changed after creation**. Picking **Simple** gives a plain prompt box with **no case
> input** and the `@{...}` case fields never resolve. Correct UX per experiment:
> **E1 → Commercial Vector Case Review**, **E2 → Commercial Case + KM**,
> **E3 → Commercial Case + ICM**, **E4 → Commercial Case Search / Advanced Editor**.
> Sources: [Commercial-Vector-Case-Review.md](../../ZebraAI-Wiki/Reference/Experiment-Types/Commercial-Vector-Case-Review.md),
> [Experiment-Types.md](../../ZebraAI-Wiki/Reference/Experiment-Types/Experiment-Types.md).

---

## 4. Proposed Changes — Experiments to build

| # | Experiment name (suggested) | ZebraAI type | Priority | Input | Consumed outputs |
|---|---|---|---|---|---|
| **E1** | `Precedent - Vector Case Review` | Commercial Vector Case Review | 🟢 Core | case number + # related cases | seed case fields, `@{RelatedCasesTable}` (resolutionText/causeText/rootCause/CSAT), `@{ICMId}`/`@{ICMUrl}` |
| **E2** | `Precedent - Case+KM` | Commercial Case + KM | 🟢 Core | case/text search → related KMs | `@{CaseResults}`, `@{ContentResults}` |
| **E3** | `Precedent - Case+ICM` | Commercial Case + ICM | 🟡 Flashy | case search → related ICMs | `@{RelatedICMsTable}` |
| **E4** | `Precedent - Case Search` | Commercial Case Search / Advanced Editor | ⚪ Optional | OData filter | precise filtered case set |

Sources: [Commercial-Vector-Case-Review.md](../../ZebraAI-Wiki/Reference/Experiment-Types/Commercial-Vector-Case-Review.md),
[Commercial-Case-KM.md](../../ZebraAI-Wiki/Reference/Experiment-Types/Commercial-Case-KM.md),
[Commercial-Case-ICM.md](../../ZebraAI-Wiki/Reference/Experiment-Types/Commercial-Case-ICM.md),
[Commercial-Case-Search.md](../../ZebraAI-Wiki/Reference/Experiment-Types/Commercial-Case-Search.md),
[Search-using-Advanced-Editor.md](../../ZebraAI-Wiki/Reference/Experiment-Types/Search-using-Advanced-Editor.md).

---

### 4.1 E1 — `Precedent - Vector Case Review` (🟢 core workhorse)

> **PIVOT (2026-09-19):** Original E1 was **Know Me**, but Know Me is **role-gated** (Admin/CaseBuddy
> only — creating it errors "restricted to integration efforts with DfM and CaseBuddy"). Replaced with
> **Commercial Vector Case Review**, which does the same vector precedent search (case lookup → similar
> cases with resolutions + root cause). We lose only Know Me's customer-360 aggregate profile (a flashy
> extra, not the core). Caveat: Vector Case Review is **not API-callable** — fine under mock-first.
> Sources: [Commercial-Vector-Case-Review.md](../../ZebraAI-Wiki/Reference/Experiment-Types/Commercial-Vector-Case-Review.md),
> repo memory `/memories/repo/zebraai-gotchas.md`.

**Purpose:** from a seed case, return the most similar prior cases with **how they were fixed**
(`resolutionText`, `causeText`, `rootCause`) — the precedent core of Precedent AI.

**⚠️ Known blocker — synthetic case lookup:** case numbers harvested from **Commercial Case Search**
(search *index*) do **not** resolve in the Vector Case Review **lookup** (separate "Next-Day ~24h"
pipeline — [Collaboration-Tasks.md](../../ZebraAI-Wiki/Reference/Data/Collaboration-Tasks.md)). The
wiki publishes **no** valid sample synthetic case number (only illustrative `SR12345`). So a live
run may return "No case found" until a lookup-valid synthetic case is obtained (via ZebraAI Office
Hours, or captured from a search-and-select experiment). **This does not block the build** — see
fixture strategy below.

**Fixture strategy (unblocks everything):** the backend only needs the **response *shape***, which is
fully documented in the field references. **Author** `fixtures/zebraai/vectorreview_<label>.json` from
those documented fields (clearly marked synthetic mock), build the backend against it now, and swap in
a **real captured body** later once a valid case is available. Same schema → zero backend changes.

**Build steps**
1. Create Experiment → name `Precedent - Vector Case Review`, description, Share = Hackathon.
2. User Experience = **Commercial Vector Case Review** (⚠️ permanent — gives case lookup + #-related-cases).
3. Model = GPT-5 mini; Temperature 0.1–0.2 (Parameter tab) for clean JSON.
4. Prompt: emit **strict JSON** using the Vector Case Review field references.

**Prompt template (Prompt tab, JSON mode):**
```json
{
  "Messages": [
    {
      "Role": "system",
      "Content": "You are Precedent AI. Using ONLY the provided ZebraAI data, output STRICT JSON matching the schema. Do not invent cases or resolutions. If no strong precedent exists, return an empty relatedCases array. Seed case @{CaseNumber} | Title: @{CaseTitle} | Issue: @{IssueDescription} | Symptom: @{SymptomText} | Cause: @{CauseText} | RootCause: @{RootCauseFull} | Severity: @{CurrentSeverity} | Product: @{SAPProductName} | CSAT: @{SurveyRating}. Comparable cases from vector search: @{RelatedCasesTable}.",
      "Image": null
    },
    {
      "Role": "user",
      "Content": "Return JSON with keys: seedCase, relatedCases[]. seedCase = { caseNumber, title, issueDescription, symptomText, causeText, rootCause, currentSeverity, product }. Each relatedCase = { caseNumber, title, similarity, resolutionText, causeText, rootCause, csat, currentSeverity }. Only include a relatedCase if it has a non-empty resolutionText.",
      "Image": null
    }
  ]
}
```

**Target output JSON (the contract the backend expects):**
```json
{
  "seedCase": {
    "caseNumber": "8809081904518713",
    "title": "...",
    "issueDescription": "...",
    "symptomText": "...",
    "causeText": "...",
    "rootCause": "...",
    "currentSeverity": "B",
    "product": { "name": "...", "family": "...", "subCategory": "..." }
  },
  "relatedCases": [
    {
      "caseNumber": "...",
      "title": "...",
      "similarity": "high",
      "resolutionText": "...",
      "causeText": "...",
      "rootCause": "...",
      "csat": 4,
      "currentSeverity": "B"
    }
  ]
}
```

**Validate (if/when a live run is possible):** confirm ≥1 related case with `resolutionText` for
"rich" cases and an **empty** `relatedCases` for the sparse case. Because live lookup may not resolve
synthetic cases, the authoritative Phase 0 deliverable is the **authored fixture** below
(`fixtures/zebraai/vectorreview_<case>.json`).

**Authored demo fixture (synthetic mock — use until a real capture is available):** since Know Me is
role-gated and the Vector Case Review lookup won't resolve our synthetic cases, we **author** this
fixture from the documented fields and build the demo on it. Save as
`fixtures/zebraai/vectorreview_8809081904518713.json`:
```json
{
  "seedCase": {
    "caseNumber": "8809081904518713",
    "title": "Xbox Console — refund not received after cancellation",
    "issueDescription": "Customer cancelled an Xbox subscription and requested a refund; refund not reflected after 5 business days.",
    "symptomText": "Refund not visible on original payment method; Order History shows 'Refunded'.",
    "causeText": "Payment provider settlement delay compounded by a stale order-status cache.",
    "rootCause": "Billing > Refunds > Settlement latency",
    "currentSeverity": "C",
    "product": { "name": "Xbox Console", "family": "Xbox", "subCategory": "Request a refund" }
  },
  "relatedCases": [
    {
      "caseNumber": "8809081543384086",
      "title": "Xbox refund delayed beyond 5 days",
      "similarity": "high",
      "resolutionText": "Confirmed order status 'Refunded' in Order History, then re-triggered the refund from the billing admin tool; funds settled within 24h. Advised customer of the 3–5 day provider window.",
      "causeText": "Provider settlement window; no product defect.",
      "rootCause": "Billing > Refunds > Settlement latency",
      "csat": 5,
      "currentSeverity": "C"
    },
    {
      "caseNumber": "8809082348423393",
      "title": "Refund not received — Xbox subscription cancellation",
      "similarity": "high",
      "resolutionText": "Verified payment method matched the original order; forced a refund status refresh; customer confirmed receipt next day.",
      "causeText": "Stale order-status cache.",
      "rootCause": "Billing > Refunds > Order status sync",
      "csat": 4,
      "currentSeverity": "C"
    },
    {
      "caseNumber": "8809081908518572",
      "title": "Xbox billing — refund inquiry",
      "similarity": "medium",
      "resolutionText": "Explained settlement timeline; no action needed — refund settled on day 4.",
      "causeText": "Normal settlement window.",
      "rootCause": "Billing > Refunds > Settlement latency",
      "csat": 4,
      "currentSeverity": "C"
    }
  ]
}
```
> ⚠️ **This is a synthetic, hand-authored mock** matching the documented Vector Case Review schema —
> not a captured live output. Swap in a real captured body once a lookup-valid synthetic case is
> obtained (ZebraAI Office Hours) or a working search-and-select run is captured. Schema is identical
> → no backend change on swap.

---

### 4.2 E2 — `Precedent - Case+KM` (🟢 core — KB grounding)

**Purpose:** return official **KB articles** related to the case, so the agent can verify precedent
against documented guidance.

⚠️ **Note:** Case+KM is a **search-and-select** experiment (select cases, then select related KMs),
**not** a single-case-number lookup like Vector Case Review. See Open Question in §8 for API input shape.

**Prompt template (JSON mode):**
```json
{
  "Messages": [
    {
      "Role": "system",
      "Content": "You are Precedent AI. Using ONLY the provided cases and KM articles, output STRICT JSON. Do not invent KB articles or URLs. Cases: @{CaseResults}. KM articles: @{ContentResults}.",
      "Image": null
    },
    {
      "Role": "user",
      "Content": "Return JSON with keys: cases[] (caseNumber, title, issueDescription) and kbArticles[] (title, url, source, snippet, relevance).",
      "Image": null
    }
  ]
}
```

**Target output JSON:**
```json
{
  "cases": [
    { "caseNumber": "SYN-1001", "title": "...", "issueDescription": "..." }
  ],
  "kbArticles": [
    { "title": "...", "url": "https://...", "source": "KM", "snippet": "...", "relevance": "high" }
  ]
}
```

**Validate:** confirm `kbArticles` are populated with real titles/URLs from `@{ContentResults}`
(no hallucinated links). **Capture** to `fixtures/zebraai/casekm_<case>.json`.

---

### 4.3 E3 — `Precedent - Case+ICM` (🟡 flashy — outage deflection)

**Purpose:** detect whether the case is tied to a **known incident/outage** so the agent can
**deflect** instead of troubleshooting.

⚠️ **Note:** outage details (status / impacted regions / start time / how-fixed) live **inside**
`@{RelatedICMsTable}` — confirm exact columns via the ICM data dictionary (Open Question §6.3).

**Prompt template (JSON mode):**
```json
{
  "Messages": [
    {
      "Role": "system",
      "Content": "You are Precedent AI. Using ONLY the provided case and related ICMs, output STRICT JSON. If no active/known incident applies, return an empty relatedIncidents array. Case: @{CaseNumber} | @{IssueDescription} | ICMId=@{ICMId} | ICMUrl=@{ICMUrl}. Related ICMs: @{RelatedICMsTable}.",
      "Image": null
    },
    {
      "Role": "user",
      "Content": "Return JSON with keys: case (caseNumber, icmId, icmUrl) and relatedIncidents[] (icmId, title, status, impactedRegions[], impactStartDate, howFixed, url).",
      "Image": null
    }
  ]
}
```

**Target output JSON:**
```json
{
  "case": { "caseNumber": "SYN-1001", "icmId": "ICM-48213", "icmUrl": "https://..." },
  "relatedIncidents": [
    {
      "icmId": "ICM-48213",
      "title": "...",
      "status": "active",
      "impactedRegions": ["West Europe"],
      "impactStartDate": "2026-09-18T10:00:00Z",
      "howFixed": "...",
      "url": "https://..."
    }
  ]
}
```

**Validate:** use a synthetic case with a linked ICM → non-empty `relatedIncidents`; use one without
→ empty array. **Capture** to `fixtures/zebraai/caseicm_<case>.json`.

---

### 4.4 E4 — `Precedent - Case Search` (⚪ optional — precision filter / fallback)

**Purpose:** OData/keyword precise filtering (by product / severity / date / CSAT) to sharpen or
constrain the candidate set. Not required for the core demo; build only if time allows.
Sources: [Commercial-Case-Search.md](../../ZebraAI-Wiki/Reference/Experiment-Types/Commercial-Case-Search.md),
[Search-using-Advanced-Editor.md](../../ZebraAI-Wiki/Reference/Experiment-Types/Search-using-Advanced-Editor.md).

**Validate & capture** only if built → `fixtures/zebraai/casesearch_<query>.json`.

---

## 4B. Flagship Demo Scenario & Expected JSON Contract (wiki-grounded mocks)

> **Decision (2026-09-19):** We will **not set up live experiments** for now (Know Me is role-gated;
> Vector Case Review lookup won't resolve synthetic cases; none are API-integrable in our window).
> Instead we **rely on the expected JSON documented in the wiki** and author these bodies as the
> canonical demo fixtures. All shapes below are grounded in the wiki field references and use
> **synthetic** data. Swap to a real captured body later with **zero schema change**.

### Why this scenario (not the Xbox refund)
The demo needs a case that **looks scary and complex but was already solved** — so the "one click →
full resolution" moment lands. We use an **Azure App Service outage-style incident**: a Sev-A
production 503/latency issue that *appears* novel but maps to a **known, already-mitigated platform
incident**, with clear precedents and KB. This exercises **all three experiments** (E1 precedents +
E2 KB + E3 ICM outage deflection) and the human-in-the-loop gate.

**Seed ticket the engineer enters:** `8809074412559830`
> *"Production web app on Azure App Service returning intermittent HTTP 503 and elevated latency in
> East US since 15 Sep; customer escalating, revenue impact. Sev A."*

---

### E1 — Vector Case Review body → `fixtures/zebraai/vectorreview_8809074412559830.json`
Fields grounded in [Commercial-Vector-Case-Review.md](../../ZebraAI-Wiki/Reference/Experiment-Types/Commercial-Vector-Case-Review.md)
(seed fields + `@{RelatedCasesTable}`; note this type also exposes `@{ICMId}`/`@{ICMUrl}`).
```json
{
  "seedCase": {
    "caseNumber": "8809074412559830",
    "title": "Azure App Service — intermittent HTTP 503 and latency spikes (East US)",
    "issueDescription": "Production web app intermittently returns HTTP 503 with elevated latency in East US since 2025-09-15; customer escalating, revenue impact.",
    "symptomText": "Intermittent 503 Service Unavailable; p95 latency up 4x; no recent customer deployment.",
    "causeText": "Transient platform networking degradation on the App Service scale unit; not customer code.",
    "rootCause": "Cloud > App Service > Platform networking > Regional transient degradation",
    "currentSeverity": "A",
    "product": { "name": "Azure App Service", "family": "Azure", "subCategory": "Availability / 503" },
    "icmId": "599372041",
    "icmUrl": "https://portal.microsofticm.com/imp/v3/incidents/details/599372041"
  },
  "relatedCases": [
    {
      "caseNumber": "8809074410023115",
      "title": "App Service 503s in East US after platform event",
      "similarity": "high",
      "resolutionText": "Correlated to platform networking incident on the scale unit. Enabled retry-with-backoff on the app's outbound calls and failed over to the paired region (West US) via Traffic Manager until the incident was mitigated; errors cleared. Confirmed no customer code change needed.",
      "causeText": "Platform networking degradation; known incident.",
      "rootCause": "Cloud > App Service > Platform networking > Regional transient degradation",
      "csat": 5,
      "currentSeverity": "A"
    },
    {
      "caseNumber": "8809074398871200",
      "title": "Intermittent 503 / high latency — Azure Web App",
      "similarity": "high",
      "resolutionText": "Verified health-check endpoint, ruled out app deployment. Matched to active platform ICM; advised customer to enable geo-failover and app-level retries. Fully resolved once PG mitigated the incident.",
      "causeText": "Regional platform networking incident.",
      "rootCause": "Cloud > App Service > Platform networking > Regional transient degradation",
      "csat": 4,
      "currentSeverity": "A"
    },
    {
      "caseNumber": "8809074355012487",
      "title": "Web app 503 spikes correlated to platform incident",
      "similarity": "medium",
      "resolutionText": "Scaled out instances and enabled retries as an interim mitigation; monitored until incident resolved. No code defect found.",
      "causeText": "Platform-side transient errors.",
      "rootCause": "Cloud > App Service > Platform networking > Regional transient degradation",
      "csat": 4,
      "currentSeverity": "B"
    }
  ]
}
```

### E2 — Case + KM body → `fixtures/zebraai/casekm_8809074412559830.json`
Fields grounded in [Commercial-Case-KM.md](../../ZebraAI-Wiki/Reference/Experiment-Types/Commercial-Case-KM.md)
(`@{CaseResults}`, `@{ContentResults}`) + [KM dictionary](../../ZebraAI-Wiki/Reference/Data/Data-Dictionary-KM.md)
(`Title`, `Content`, `Url`, `SourceId`, `Domain`, `Source`).
```json
{
  "case": {
    "caseNumber": "8809074412559830",
    "title": "Azure App Service — intermittent HTTP 503 and latency spikes (East US)"
  },
  "knowledgeArticles": [
    {
      "kmId": "417802",
      "title": "Troubleshoot HTTP 503 errors in Azure App Service",
      "url": "https://learn.microsoft.com/azure/app-service/troubleshoot-http-503",
      "domain": "learn.microsoft.com",
      "source": "CSS Wiki",
      "relevance": "high",
      "snippet": "HTTP 503 during platform events is often transient. Confirm health checks, enable automatic retries with exponential backoff, and consider scaling out or failing over to a paired region while the platform issue is mitigated..."
    },
    {
      "kmId": "402515",
      "title": "Configure geo-redundant failover for Azure App Service with Traffic Manager",
      "url": "https://learn.microsoft.com/azure/app-service/manage-disaster-recovery",
      "domain": "learn.microsoft.com",
      "source": "Knowledge.com",
      "relevance": "medium",
      "snippet": "Use Azure Traffic Manager to route traffic to a healthy paired region during a regional impact. Combine with app-level retry patterns for resilient recovery..."
    }
  ]
}
```

### E3 — Case + ICM body → `fixtures/zebraai/caseicm_8809074412559830.json`
Fields grounded in [Commercial-Case-ICM.md](../../ZebraAI-Wiki/Reference/Experiment-Types/Commercial-Case-ICM.md)
(`@{RelatedICMsTable}`) + [ICM dictionary](../../ZebraAI-Wiki/Reference/Data/Data-Dictionary-ICM.md)
(`IncidentId`, `Title`, `Summary`, `IncidentType`, `IsOutage`, `Severity`, `Status`,
`ImpactedRegions`, `ImpactStartDate`, `MitigateDate`, `ResolveDate`, `Mitigation`, `HowFixed`,
`OwningTeamName`).
```json
{
  "case": {
    "caseNumber": "8809074412559830",
    "title": "Azure App Service — intermittent HTTP 503 and latency spikes (East US)"
  },
  "relatedIncidents": [
    {
      "incidentId": "599372041",
      "title": "App Service — elevated 503/latency in East US (scale-unit networking)",
      "summary": "A subset of App Service scale units in East US experienced transient networking degradation causing intermittent 503s and elevated latency.",
      "incidentType": "PlatformOutage",
      "isOutage": true,
      "severity": "2",
      "status": "Resolved",
      "impactedRegions": "East US",
      "impactStartDate": "2025-09-15T13:42:00Z",
      "mitigateDate": "2025-09-15T16:05:00Z",
      "resolveDate": "2025-09-15T18:20:00Z",
      "owningTeamName": "Azure App Service / Networking",
      "mitigation": "Rerouted affected scale-unit traffic and recycled degraded network nodes.",
      "howFixed": "Root-caused to a faulty network node rotation; corrected the rotation and added a guard to prevent recurrence.",
      "icmUrl": "https://portal.microsofticm.com/imp/v3/incidents/details/599372041"
    }
  ]
}
```

### Final agent output (what the engineer sees behind the human-review gate)
Produced by **our LangGraph agent** from E1+E2+E3 (not a ZebraAI call):
```json
{
  "recommendedResolution": "This is not a customer code defect. The intermittent 503s and latency match a known, already-resolved platform incident (IcM 599372041, East US, mitigated 2025-09-15 16:05 UTC). Action: (1) confirm no customer deployment coincides with onset; (2) enable app-level retry-with-backoff on outbound calls; (3) fail over to the paired region (West US) via Traffic Manager if impact recurs. Post-incident, errors should clear with no code change — consistent with 2 high-similarity prior cases.",
  "confidence": "high",
  "basedOn": [
    { "caseNumber": "8809074410023115", "similarity": "high", "csat": 5 },
    { "caseNumber": "8809074398871200", "similarity": "high", "csat": 4 }
  ],
  "citations": [
    { "kmId": "417802", "title": "Troubleshoot HTTP 503 errors in Azure App Service", "url": "https://learn.microsoft.com/azure/app-service/troubleshoot-http-503" },
    { "incidentId": "599372041", "title": "App Service — elevated 503/latency in East US", "url": "https://portal.microsofticm.com/imp/v3/incidents/details/599372041" }
  ],
  "outageDeflection": "Matched to known incident IcM 599372041 (Resolved) — deflect from deep investigation.",
  "selfCheck": "passed — recommendation is grounded in 2 high-similarity precedents, aligns with KB 417802, and is corroborated by a Resolved outage incident.",
  "requiresHumanApproval": true
}
```

> **All bodies above are synthetic, wiki-grounded mocks** — the canonical demo fixtures. The Xbox
> refund fixture in §4.1 remains a simpler secondary example / regression case.

---

## 5. API enablement (parallel, best-effort, non-blocking)

> Only **Case+KM (E2)** and **Case+ICM (E3)** are API-callable. **Vector Case Review (E1)** is **not**
> API-callable — it is consumed via authored/captured fixtures only.

For **E2 first**, then **E3**:
1. My Experiments → the experiment → connector icon (Actions) → **Add Experiment API** form.
2. Provide ROI + anticipated volume (educated guess is fine), attach the **Entra Client ID**,
   select platform **Web API / Console App**, accept the usage guidelines, **Submit**.
3. Track approval; when provisioned, record endpoint + auth details **in env vars / Key Vault**
   (never in the repo).

Source: [Add-Experiment-API.md](../../ZebraAI-Wiki/How-To-Guides/Add-Experiment-API.md).

> **Because Phase 1 builds on captured fixtures, API approval is NOT on the critical path.**
> If it lands, Phase 1 flips one env var (`ZEBRAAI_MODE=mock|live`) to go live. If it does not
> land in time, the demo runs on captured real outputs — fully legitimate.

---

## 6. Constitution & Governance Compliance Check

- ✅ **Synthetic-data-first**; System Prompt Handling off (only required/auto for real CSS data).
- ✅ **No PII** — ZebraAI stores none; prompts reference no personal identifiers.
- ✅ **No secrets in repo** — API endpoint/keys (once issued) go to env vars / Key Vault.
- ✅ **Grounded in the wiki** — no invented fields/endpoints; open items flagged, not guessed.
- ✅ **Mandated order** — create → validate → request API → (later) integrate.

---

## 7. Test / Validation Strategy

> Under the mock-first decision, the **primary** validation is that each **authored fixture** parses
> and matches the documented schema; the live-run checks below are **best-effort** for when a run
> becomes possible.

**Golden set:** 2–3 "rich" synthetic cases + 1 "sparse" case (+ 1 with a linked ICM for E3).

**Per-experiment pass criteria (live runs, best-effort):**
- Returns **well-formed JSON** matching the target schema across **repeated runs**.
- **E1:** ≥1 related closed case *with* `resolutionText` for rich cases; **empty** array for sparse.
- **E2:** `kbArticles` populated from `@{ContentResults}` with real titles/URLs (no hallucination).
- **E3:** non-empty `relatedIncidents` for the linked-ICM case; empty otherwise.

**Deliverable (Definition of Done for Phase 0):**
- [ ] Expected-JSON **response contract** documented for E1/E2/E3 (this plan §4.1–§4.3 + §4B).
- [ ] **Flagship demo fixtures authored** (E1/E2/E3 + final agent output) under `fixtures/zebraai/`
      — wiki-grounded, synthetic, clearly marked as mocks.
- [ ] Xbox refund **secondary fixture** authored (regression example).
- [ ] *(Best-effort, off critical path)* API enablement **requested** for Case+KM / Case+ICM.
- [ ] *(Opportunistic)* capture a real live body if a lookup-valid synthetic case becomes available.

---

## 8. Risks & Open Questions

1. **API-enablement + Entra app lead time** — *mitigated to LOW*: Phase 1 builds on captured
   fixtures; live API is a one-env-var swap, never blocking.
2. **E2/E3 API input shape (open)** — Case+KM and Case+ICM are *search-and-select*, not
   single-case lookups like Vector Case Review. ❓ Confirm how they accept a dynamic case at API call time
   (case number vs search term; is KM/ICM selection auto-derived from the case?).
3. **ICM detail columns (open)** — confirm the exact columns inside `@{RelatedICMsTable}`
   (status / impactedRegions / impactStartDate / howFixed) via the ICM data dictionary.
4. **Root-cause taxonomy** — Vector Case Review exposes `@{CauseText}` and root-cause levels
   (`RootCauseLevelOne…Six`) plus `@{ICMId}`/`@{ICMUrl}`. Core demo relies on `resolutionText` +
   `causeText` + `rootCause`.
5. **UX is permanent** — Simple UX chosen at creation; cannot change later.
6. **MCP alternative (open)** — does MCP `run_experiment` require the same per-experiment API
   enablement, or is it a separate path? Worth checking as a fallback call route.
   [Using-ZebraAI-MCP-Server.md](../../ZebraAI-Wiki/How-To-Guides/Using-ZebraAI-MCP-Server.md)
7. **JSON reliability** — models can drift from strict JSON; mitigate with clear schema
   instructions and (optionally) a Follow-Up Prompt to reformat.

---

## 9. Approval Request

This Phase 0 plan covers **creating and validating every ZebraAI experiment** Precedent AI needs,
plus **capturing their real outputs as fixtures** so the backend is never blocked on API approval.

**Next after Phase 0 approval:** draft **Phase 1 (backend on mocks) + Phase 2 (frontend) +
Phase 3 (Azure)**.

**Implementation should wait for developer confirmation.** Please confirm this Phase 0 plan (or
request changes) before any execution begins.
