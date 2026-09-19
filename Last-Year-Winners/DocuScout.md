# DocuScout — Winner (Last Year)

> Reference writeup of a prior-year winning ZebraAI hackathon project, captured for
> idea-pool context. Sourced from the user-provided project description and the demo
> video transcript. Used to understand what wins and to find non-duplicate white space.

---

## One-liner

**"DocuScout: Turning Case Summaries into Documentation Action."** An intelligent agent
that automatically **detects documentation gaps** by analyzing case summaries and
cross-referencing them against **Microsoft Learn** content, then creates **Azure DevOps
work items** to close those gaps — proactively improving supportability.

- Keywords: Knowledge Base, Knowledge gap, Case trends, IPD, IPD reduction, SHS
- Personas (multi-role): Content Writers, Beta Engineers, Support Engineers, Engineering
  teams, Supportability PMs, and Customers.

---

## The problem

- Support teams hit recurring issues due to **missing or outdated documentation** on
  Microsoft Learn.
- Gaps → higher case volumes, slower resolution, lower CSAT.
- Today, finding and fixing gaps is **manual, reactive, and inconsistent**.

---

## What it does

DocuScout **analyzes case summaries**, compares them to existing Microsoft Learn content
(via an **MCP server** that scans Learn articles), **identifies gaps**, and **auto-creates
Azure DevOps work items** to fix them — turning documentation from reactive into proactive.
Recurring issues get deflected through self-help, freeing engineers for higher-value work.

---

## Workflow (4 steps)

1. **Case Summary Collection** — a Power Automate flow retrieves the case summary from
   **ZebraAI** and stores it in **Dataverse** tables.
2. **Prompt Generation** — another Power Automate flow pulls the stored summary from
   Dataverse and transforms it into a prompt tailored for the DocuScout Agent.
3. **Gap Analysis Execution** — the DocuScout Agent receives the prompt, **queries the MCP
   server** to check existing documentation, and identifies gaps.
4. **Work Item Creation** — once gaps are found, a second agent is triggered to create a
   corresponding **Azure DevOps work item** to address the missing documentation.

**Demo example:** customers hit a "No download response" error downloading chat transcripts
from the chat widget in Dynamics 365 Contact Center. That error isn't documented in current
Learn articles. DocuScout flags the gap and suggests updates — troubleshooting guidance for
download failures + clarification on blob/SAS URL behavior.

---

## Technologies involved

- **Copilot Studio** — builds the conversational agent(s) over support data + docs.
- **ZebraAI** — analyzes support case summaries to detect patterns and doc gaps.
- **Power Automate** — orchestrates workflows (case pull, DevOps item creation, notifs).
- **Dataverse** — centralized store for structured case insights/feedback.
- **Azure DevOps** — tracks the documentation-improvement work items.
- **MCP Server** — scans Microsoft Learn articles to compare against real case scenarios.

---

## Impact by role (highlights)

- **Content Writers** — proactive gap ID + prioritized work items + real-world accuracy.
- **Beta Engineers** — early gap detection during preview (fix before GA); DFM Copilot
  feedback auto-evaluates how well a case scenario is covered publicly.
- **Support Engineers** — reduced case volume, faster resolution, focus on complex cases.
- **Engineering Teams** — actionable patterns (product/UX issues), better adoption.
- **Supportability PMs** — data-driven decisions, streamlined support↔content loop, KPIs.
- **Customers** — better self-help, faster resolution, higher satisfaction.

---

## Measuring impact (notably rigorous — a differentiator)

1. **IPD reduction via improved SHS** — using the BAPSHS report (aka.ms/bapshs): filter by
   citation source (e.g., LMC), locale, title/query; review Volume, **SHS** (Self-Help
   Success rate), **Deflections**, **Avoidance (USD)**, **Opportunity (USD)**.
2. **Direct content usage & case deflection** — impressions, engagement rate, HRR/PRR,
   escalation rate, gating rate, **CPI** (~$279/case). Example: 1,000 impressions → 1
   deflected case → $279 saved.
3. **Gen-AI visibility** — how often Learn content feeds Google AI Overviews / featured
   snippets; credits by visual rank; scaled to estimate deflected cases + savings.

---

## Why it won (patterns to learn from)

1. **Different altitude** — targets the **root cause** (missing docs) rather than speeding
   up case handling; prevents cases instead of processing them.
2. **Closes a full loop to action** — not just insight; it **creates ADO work items** so
   something actually gets fixed.
3. **Serious impact math** — real deflection/$ savings model (CPI, SHS, IPD) makes the
   business case undeniable (strong Impact score).
4. **Broad, multi-role value** — writers, engineers, PMs, customers all benefit
   (Collaboration + Impact).
5. **Rich integration story** — Copilot Studio + ZebraAI + Power Automate + Dataverse +
   ADO + MCP scanning Microsoft Learn (Innovation + Feasibility ambition).

> Contrast with the others: DocuScout = **prevent cases via documentation** (upstream,
> knowledge-gap). Case CPU = manager triage. Hedwig = code-change intelligence. Case
> Transfer Agent = handoff automation. Four distinct white spaces.

---

## Demo video summary (verbatim-ish)

Introduces the DocuScout Agent: identifies documentation gaps in Microsoft Learn from
support cases and creates work items to address them. Four steps: (1) Case Summary
Collection (Power Automate → ZebraAI → Dataverse), (2) Prompt Generation (Power Automate
pulls summary → prompt), (3) Gap Analysis (agent queries MCP server vs existing docs),
(4) Work Item Creation (second agent → Azure DevOps item). Demo case: "No download
response" error downloading chat transcripts from the chat widget in Dynamics 365 Contact
Center — undocumented in current Learn articles. DocuScout identifies the gap and suggests
updates (download-failure troubleshooting + blob/SAS URL clarification). Goal: boost
customer self-service, deflect costly cases, accelerate doc-issue resolution — turning
documentation into a strategic business asset.
