---
name: zebraai-api-integration
description: 'Integrate ZebraAI into an app, bot, flow, or agent securely. Use when wiring a validated experiment to the ZebraAI API: requesting API access, loading keys/endpoints from environment variables, handling errors and retries, and keeping secrets and PII out of logs.'
---

# ZebraAI API Integration

Guidance for integrating a validated ZebraAI experiment into an application, bot, flow, or agent.

## Prerequisites

- The experiment works as expected on synthetic data (see `zebraai-experiments`).
- Request API access first — refer to the wiki guides "Add Experiment API" and "API Documentation".

## Secure Configuration

- Load the ZebraAI endpoint and key from **environment variables** (or an approved secret store).
- Validate that required configuration is present at startup and fail fast with a clear message if missing.
- Never hardcode, commit, or log keys, endpoints, or tokens.

```
ZEBRAAI_ENDPOINT   # base URL for the experiment API
ZEBRAAI_API_KEY    # secret; from env/secret store only
```

## Calling The API

- Send the same prompt/input contract validated during experimentation.
- Set sensible timeouts and use retries with backoff for transient failures.
- Classify failures: input/validation errors vs. transient errors vs. non-retryable errors.
- Parse the structured output defensively; handle missing or malformed fields gracefully.

## Integration Patterns

- **App/bot:** call the API from a thin service layer; keep prompt/config in one place.
- **Flow/Logic Apps / Power Platform:** use the documented ZebraAI connector; store credentials in the platform's secret configuration (see the wiki connector guides).
- **Agent (OAP):** follow the onboarding guide for agents with ZebraAI.

## Observability And Safety

- Log correlation ids, operation names, and outcomes — never secrets or customer PII.
- Validate model outputs before surfacing them to end users.
- Keep the integration minimal and demoable for the video.
