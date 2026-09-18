---
name: zebraai-experiments
description: 'Design, create, and validate ZebraAI experiments and prompts. Use when planning or building an experiment: choosing synthetic test data, writing and iterating on prompts, running the experiment, and evaluating outputs before any API or real-data integration.'
---

# ZebraAI Experiments

Guidance for creating and validating experiments on ZebraAI (aka.ms/zebraai) for the hackathon.

## Prerequisites

- Ensure Contributor access to ZebraAI (request it if you are not already a user).
- Refer to the wiki guides: "Set up and Access", "Create An Experiment", "Run An Experiment".

## Use Synthetic Data First

- Build every experiment against **synthetic** data that mirrors the shape of real CSS tickets/cases.
- Do not use real CSS data until the experiment is validated and CSS data access is granted.
- Keep synthetic fixtures in the repo so the experiment is reproducible.

## Designing The Experiment

- State the support pain point the experiment addresses and the measurable outcome.
- Define inputs (the case/ticket fields) and the expected output shape (summary, classification, suggested reply, etc.).
- Keep the scope to the smallest slice that demonstrates value.

## Prompt Engineering

- Start with a clear system/instruction prompt describing role, task, constraints, and output format.
- Prefer explicit, structured output (e.g., JSON with named fields) so downstream integration is deterministic.
- Iterate: change one variable at a time and record what improved or regressed.
- Avoid leaking secrets or PII into prompts; use only approved knowledge sources.

## Running And Evaluating

- Run the experiment on a representative set of synthetic cases, including edge cases and failure cases.
- Evaluate for accuracy, appropriateness, consistency, and hallucination.
- Capture example inputs/outputs to reuse in the demo video.

## Exit Criteria

- Outputs are correct and appropriate across the synthetic set.
- Prompt and expected output shape are stable.
- Only then proceed to API integration (`zebraai-api-integration`) and, if needed, request real CSS data.
