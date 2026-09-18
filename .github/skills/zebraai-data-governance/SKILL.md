---
name: zebraai-data-governance
description: 'Apply ZebraAI data governance: synthetic-data-first experimentation, the rules for requesting and using real CSS data, and keeping secrets and customer PII out of code, logs, and the demo. Use whenever a task touches data sources, credentials, or compliance.'
---

# ZebraAI Data Governance

Rules for handling data securely and compliantly in the hackathon solution.

## Synthetic-First

- Default to synthetic data for all experimentation, prompt tuning, and integration testing.
- Real CSS data is used **only after** the experiment works as expected and access is granted.
- Keep synthetic fixtures representative but free of any real customer information.

## Requesting Real CSS Data

- Request CSS data access only once the experiment is validated (wiki: "Request CSS Data Usage").
- Use the minimum data necessary for the demonstrated scenario.
- Know how to revoke access when it is no longer needed (wiki: "Revoke CSS Data Usage").

## Secrets And Credentials

- Load keys, endpoints, and tokens from environment variables or an approved secret store.
- Validate presence at startup; never hardcode or commit them.
- Never print secrets to logs, console, or the demo video.

## PII And Output Safety

- Do not log or persist customer PII; redact where necessary.
- Use only approved knowledge sources for grounding.
- Validate model outputs for accuracy and appropriateness before surfacing them.

## Compliance Checklist (per change)

- [ ] Uses synthetic data unless real CSS data access is explicitly granted.
- [ ] No secrets or endpoints hardcoded or committed.
- [ ] No PII or secrets in logs, traces, or demo material.
- [ ] Only approved knowledge sources used.
