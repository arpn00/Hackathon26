# Hedwig — Winner (Last Year)

> Reference writeup of a prior-year winning ZebraAI hackathon project, captured for
> idea-pool context. Sourced from the user-provided project description and the demo
> video transcript. Used to understand what wins and to find non-duplicate white space.

---

## One-liner

**Hedwig** is an innovative tool that helps engineers navigate the complexities of **code
changes after Windows updates / patches** — simplifying the process of understanding and
connecting code modifications to **real-world issues**.

- Keywords: ZebraAI, MCP, Semantic Kernel, C#, AI
- Primary audience: **engineers who support Windows products** (frontline / patch support)

---

## The problem

- Engineers are often **not fully informed** about what changed in an upcoming update.
- When a user reports a problem after an update, engineers must **sift through extensive
  work-item databases** to find relevant changes, understand the fixes, and decide whether
  those modifications are linked to the issue.
- Every month a new update ships (or another product team asks whether a phenomenon is
  caused by a specific patch), and frontline engineers **struggle to quickly determine**
  if it's a known issue or if recent code changes are responsible.

---

## What Hedwig does

- Provides a **detailed list of changes** included in the latest update, so engineers have
  a clear understanding of what was modified.
- When a problem is reported, **summarizes the most relevant modifications** and helps
  **assess whether they are linked** to the issue — **all in a few clicks**.
- Lets engineers focus on **solving problems**, not searching for information or spinning
  around known issues.

---

## How ZebraAI / tech is used

- **Chat completion AI + Semantic Kernel** to analyze **code changes, pull-request (PR)
  work items, and internal articles**, surfacing actionable insights that were previously
  **buried in complex databases**.
- Built with **ZebraAI, MCP, Semantic Kernel, C#** — a more **developer/agentic** build
  than a no-code experiment.
- Also maintains a **SharePoint** to collect user feedback and to **track and forecast**
  issues in the latest released update.

---

## Origin

- The idea was **born from the team's own experiences** with Windows Updates and
  engineering workflows — deep domain experience with the real pain frontline engineers
  face after every update.

---

## Impact

- Feedback from users indicates Hedwig **dramatically reduces the time** needed to identify
  relevant changes → **faster solutions** and **improved customer satisfaction**.

---

## Why it won (patterns to learn from)

1. **Sharp, specific persona + pain** — Windows patch-support engineers, "is this bug from
   the latest update?" — not a generic support problem.
2. **Connects two worlds** — links **code/PR changes** to **customer-reported symptoms**,
   which no existing tool did well.
3. **Agentic/technical depth** — MCP + Semantic Kernel + C#, not just a prompt; shows
   engineering ambition (Innovation + Feasibility signal to judges).
4. **Grounded in lived experience** — the team lived the pain, which makes the story
   credible and the impact believable.
5. **Feedback loop built in** — SharePoint tracking/forecasting shows a path beyond the
   demo.

> Contrast with Case CPU Pilot: Hedwig is **engineer-facing + code-centric** (change
> intelligence), whereas Case CPU was **manager-facing + case-centric** (triage/workload).
> Different white space, both won.

---

## Demo video transcript (verbatim excerpts)

- 00:00 — "Imagine a world where engineers no longer need to wait for complicated traces
  analysis to understand what changed after a Windows Update."
- 00:08 — "Hedwig is an innovative tool designed to assist engineers in navigating the
  complexities of code changes after patches."
- 00:15 — "It simplifies the process of understanding and connecting code modifications to
  real world issues."
- 00:21 — "Hedwig leverages chat completion, AI, and semantic kernel to analyze code
  changes, PR items, and internal articles, providing actionable insights that were
  previously buried in complex databases."
- 00:33 — "This breakthrough enables engineers to focus on solving problems, not searching
  for information or spinning around known issues."
- 00:41 — "Our team brings deep experience with Windows Updates and engineering workflows."
- 00:46 — "This unique blend enables us to tackle the real pain points engineers face after
  every Windows Update."
- 00:55 — "The idea for Hedwig was born from our own experiences."
- 00:59 — "Every month when a new update is released, or when other product teams ask if a
  phenomenon is caused by a specific patch, frontline engineers often struggle to quickly
  determine if it's a known issue or if recent code changes are responsible."
- 01:16 — "With Hedwig, engineers can instantly see a detailed list of changes included in
  the latest update."
- 01:25 — "When a problem is reported, Hedwig summarizes the most relevant modifications and
  helps assess whether they are linked to the issue." / 01:33 — "All in a few clicks."
- 01:37 — "Hedwig's primary audience is engineers who support Windows products."
- 01:41 — "We are also maintaining SharePoint to collect user feedback, tracking and
  forecasting issue in latest released update."
- 01:49 — "Feedback from our users shows that Hedwig dramatically reduces the time needed to
  identify relevant changes, leading to faster solutions and happier customers experience."
