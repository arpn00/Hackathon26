# Copilot Instructions

## Repository Context

- This repository supports a submission to the **"AI Using ZebraAI"** MS Global Hackathon (aka.ms/zebraai).
- ZebraAI is a secure, compliant platform for experimenting with Large Language Models (LLMs) against customer support (CSS) data.
- The goal is an impactful, scalable AI-driven support/automation solution built on ZebraAI, with a video presentation required for submission.

## Authority And Scope

- Treat `.specify/memory/constitution.md` as the authoritative source for project principles and non-negotiable policy.
- Use this file for repository-specific working guidance when applying the constitution in practice.
- If guidance in this file and the constitution appear to conflict, follow the constitution and surface the conflict explicitly.

## Source Of Truth (ground every answer here)

- **`ZebraAI-Wiki/` is the authoritative source of truth** for how ZebraAI works — its capabilities, features, APIs, connectors, experiments, workflows, data-governance rules, and limits. Every agent (`brainstorm`, `plan`, `implement`, `Explore`) must ground answers in it.
- **Before** answering a ZebraAI question, proposing an idea, planning, or writing integration code, **consult the wiki first** (search/grep, then read the relevant `.md` files under `ZebraAI-Wiki/`). Do not rely on memory or assumptions about ZebraAI.
- **Cite the specific wiki file(s)** you relied on (e.g. `ZebraAI-Wiki/How-To-Guides/Add-Experiment-API.md`) so claims are traceable.
- If the wiki does **not** cover something, say so explicitly and treat it as an open question — do not invent ZebraAI behavior, endpoints, or parameters.
- If you believe the wiki is outdated or contradicts the constitution, **follow the constitution for policy** and surface the conflict; otherwise the wiki wins for ZebraAI product/technical facts.
- Useful entry points: `ZebraAI-Wiki/README.md`, `ZebraAI-Wiki/Get-Started-With-ZebraAI/`, `ZebraAI-Wiki/How-To-Guides/`, `ZebraAI-Wiki/Integrations/`, `ZebraAI-Wiki/Reference/`, `ZebraAI-Wiki/Experiment-Showcase/`.

## ZebraAI Workflow (follow in order)

1. Request Contributor access if not already a ZebraAI user.
2. Create a test Experiment using **synthetic data**.
3. Validate prompts and outputs by running the Experiment.
4. Request API access when integrating into an app, bot, flow, or agent.
5. Request real CSS data access **only after** the experiment works as expected.
6. Build the hackathon solution and capture the demo video.

## Judging Criteria (optimize for these)

- **Innovation** — how unique and creative the solution is.
- **Impact** — how effectively it addresses real support pain points.
- **Feasibility** — whether it can be realistically implemented in the hackathon timeframe.
- **Collaboration** — leveraging resources and knowledge across teams.

## Implementation Expectations

- Read the relevant files before changing anything; fix root causes, not symptoms.
- Favor the smallest correct, demoable slice over broad scope.
- Never hardcode ZebraAI keys/endpoints — load from environment variables and validate at startup.
- Default to synthetic data unless the approved plan explicitly calls for real CSS data.
- Never log secrets, tokens, credentials, or customer PII.

## Skills

Consult the skills in `.github/skills/` when relevant:

- `zebraai-experiments` — designing, creating, and validating ZebraAI experiments and prompts.
- `zebraai-api-integration` — integrating ZebraAI into an app/bot/flow/agent securely.
- `zebraai-data-governance` — synthetic-first data use, CSS data access rules, and compliance.
- `hackathon-delivery` — aligning scope and the demo to the judging criteria.

## Timeline

- Hackathon week of Sept 14; judging Sept 22–25; winners announced Sept 28. Keep scope achievable within this window.
