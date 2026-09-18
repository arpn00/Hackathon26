# AI Using ZebraAI — Hackathon Constitution

This constitution is authoritative for planning, implementation, and review of the
"AI Using ZebraAI" MS Global Hackathon solution. Plans MUST include an explicit
compliance check against these principles, and reviews MUST treat violations as
high-severity findings.

## Core Principles

### I. Synthetic Data First

All experimentation, prompt validation, and integration testing MUST use synthetic
data until the solution demonstrably works as intended. Real customer support (CSS)
data MUST NOT be used before an experiment is validated and CSS data access has been
explicitly requested and granted.

Rationale: ZebraAI is a secure, compliant platform; using synthetic data first
protects customer data and keeps early iteration fast and low-risk.

### II. Secrets Stay Out Of Source

ZebraAI keys, endpoints, tokens, and credentials MUST be loaded from environment
variables (or an approved secret store) and validated at startup. They MUST NOT be
hardcoded, committed, or written into logs, traces, or the demo video.

Rationale: leaked credentials compromise the platform's security and compliance
guarantees and are trivially avoidable.

### III. Follow The ZebraAI Onboarding Path

Work MUST progress through the documented path: Contributor access → create a test
Experiment with synthetic data → validate prompts/outputs by running the Experiment
→ request API access for app/bot/flow/agent integration → request CSS data access
only after validation. Steps MUST NOT be skipped to shortcut access to real data.

Rationale: the path exists to lower risk, ensure correctness, and keep the solution
compliant and reproducible.

### IV. Smallest Demoable Slice

Every change MUST target the smallest correct increment that produces something
demoable. Scope creep and speculative abstractions are violations unless a concrete,
immediate need is justified.

Rationale: the hackathon timeline is short and a working, presentable demo is the
primary deliverable.

### V. Responsible AI And Privacy

Prompts, outputs, and integrations MUST avoid exposing secrets or customer PII, and
MUST use only approved knowledge sources. Model outputs SHOULD be validated for
accuracy and appropriateness before being surfaced to users.

Rationale: support scenarios are sensitive; responsible handling protects users and
the organization.

### VI. Judging-Aligned Delivery

Work SHOULD be evaluated against the judging criteria — Innovation, Impact,
Feasibility, and Collaboration — and plans SHOULD state how the change advances at
least one of them.

Rationale: the criteria define success for this challenge.

## Delivery Constraints

- Prefer focused changes over broad refactors.
- Keep the solution reproducible: document setup, required env vars, and how to run.
- Capture a clear demo video that outlines the tool or solution.
- Timeline: hackathon week of Sept 14; judging Sept 22–25; winners Sept 28.

## Governance

This constitution is authoritative for planning, implementation, and review in this
repository. Plans MUST include an explicit compliance check. Reviews MUST treat
violations as high-severity findings. Amendments require team agreement, a clear
rationale, and an assessment of downstream impact.

**Version**: 1.0.0 | **Ratified**: 2026-09-18
