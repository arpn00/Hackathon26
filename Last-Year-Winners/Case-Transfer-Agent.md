# Case Transfer Agent — Winner (Last Year)

> Reference writeup of a prior-year winning ZebraAI hackathon project, captured for
> idea-pool context. Sourced from the user-provided project description and the demo
> video transcript. Used to understand what wins and to find non-duplicate white space.

---

## One-liner

**"Seamless case handoff, smarter support flow."** Case Transfer Agent automates the
creation of **case transfer / handover notes** when a Service Request (SR) is handed off,
ensuring cases move with **full context** — minimizing delays and confusion.

- Keywords: AI (agentic workflow)
- Persona: support engineers (SE) transferring cases; downstream engineers receiving them
- Note: overlaps with CaseBuddy's "Case Transfer Agent" capability area (production).

---

## The problem

- Engineers must **manually create case transfer notes** every time an SR is handed off.
- The process is **time-consuming and inconsistent**, especially when judging case
  complexity, customer sentiment, and risk level.

---

## What it does (overview)

Automates the entire handoff workflow. It collects relevant info from **multiple sources —
ZebraAI, Outlook, and Teams** — then uses AI to generate **structured transfer notes**.
During generation it also **assesses risk level** (e.g., whether it's an A-case) and
**evaluates customer sentiment** for smoother, more informed handoffs. Saves **~15 minutes
per case**.

---

## Workflow

1. **SR submission → agent** — an SE submits an SR, triggering the Case Transfer Agent.
2. **Multi-source data collection:**
   - a. **ZebraAI** — query by SR ID to fetch historical **case notes**.
   - b. **Outlook** (Fenghu mailbox) — scan for emails related to the SR, extract key content.
   - c. **Teams** — read related chat history and summarize.
3. **AI-generated case notes** — merge a+b+c, produce a well-formatted note with structure:
   case info, case priority, case scope, case impact, completed actions, next action;
   also evaluate **case risk** and **customer sentiment**.
4. **Human validation** — notes sent via **Teams workflow** for manual review/edits.
5. **Email dispatch** — once confirmed, sent via **Flow** to the **DFM** email address to
   add the case transfer note records (auto-added if no edits needed).

---

## Impact

- **Efficiency:** automates repetitive work (~15 min/case saved).
- **Accuracy:** combines multiple data sources for comprehensive notes.
- **Risk awareness:** evaluates severity + sentiment for better transfer decisions.
- **Collaboration:** Teams workflow for quick validation/feedback.
- Goals stated in demo: improve efficiency, boost productivity, enhance customer
  satisfaction, optimize resource allocation. Future: promote to **DFM**.

---

## Why it won (patterns to learn from)

1. **Automates a concrete, universal chore** — everyone hates writing handoff notes; the
   time saved (~15 min/case) is easy to quantify.
2. **Multi-source fusion** — ZebraAI + Outlook + Teams into one note is a real
   integration story (Collaboration + Feasibility signal).
3. **Human-in-the-loop** — Teams review step keeps it safe and trustworthy.
4. **Closes the loop into a system of record** — writes back to DFM, not just a chat reply.
5. **Agentic, conversational UX** — a chat agent that asks for the SR, validates, confirms,
   then acts.

> Contrast with the others: Case Transfer Agent = **workflow automation** of a specific
> handoff task (write-back to DFM). Case CPU = manager triage dashboard. Hedwig =
> code-change intelligence for patch engineers. Three different white spaces.

---

## Demo video transcript (verbatim excerpts)

- 00:00 — "Are you stuck with case transfer in your daily work?"
- 00:04 — "Writing case handover notes may be time consuming and inconsistent structure can
  further contribute to increased workload."
- 00:14 — "This is our AI solution Case transfer agent."
- 00:19 — "It first validates the transfer, prioritizes the case, and streamlines real time
  handover note creation, automatically updating DFM." / 00:28 — "This saves approximately
  15 minutes per case."
- 00:35 — "After the user submits the SR number, the agent calls Zebra AI to retrieve the
  handover notes." / 00:41 — "It then combines this data with the latest e-mail and teams
  messages to generate real time handover notes using AI."
- 00:48 — "If no changes need to made by user, the handover record is automatically added to
  the DFM."
- 00:56 — "Our agent workflow will use the Zebra AI handover notes experiment and use the SR
  number to get the handover notes with well structure like case info, case priority, case
  scope, case impact, completed actions and next action."
- 01:12 — "The user starts by sending a hello message to the agent." / 01:16 — "The agent
  asks for the SR number and checks if the ticket is valid for transfer."
- 01:20 — "If valid, the agent asks the user to confirm whether to proceed." / 01:24 — "If
  confirmed, the agent generates real time handover notes by combining data from Zebra AI
  emails and Teams messages."
- 01:33 — "The notes are sent to Teams for review." / 01:35 — "If no changes are needed, the
  handover record is submitted to the DFM."
- 01:42 — "It helps improve efficiency, boost productivity, enhance customer satisfaction,
  and optimize resource allocation." / 01:49 — "Hopefully it can be promoted to DFM in the
  future."
- 01:53 — "Welcome to try our AI powered solution Case Transfer Agent."
