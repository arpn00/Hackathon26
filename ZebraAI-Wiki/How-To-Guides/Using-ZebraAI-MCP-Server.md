# ZebraAI MCP Server User Guide

[[_TOC_]]

_Note: This experience is currently in testing. If you encounter issues or have feedback, please reach out to v-esjennings@microsoft.com._

## ZebraAI MCP Server Overview

The ZebraAI MCP Server enables approved clients—including custom applications, VS Code, and Power Platform connectors—to securely run ZebraAI experiments and interact with supported tools via a standardized MCP (Model Context Protocol) interface. 

It leverages the same Microsoft Entra ID authentication model and experiment-level access controls as the ZebraAI API, ensuring that only authorized users and applications can execute experiments or access data. 

This guide provides instructions for configuring authentication, requesting access, and connecting different client types to the MCP endpoint so you can begin running experiments and retrieving results efficiently.

## Audience

This guide is for users who need to connect an MCP client, custom application, VS Code, Microsoft Scout, or Power Platform custom connector to the ZebraAI MCP server.

## Summary

The ZebraAI MCP server is hosted by `ZebraAI.Api` at the `/mcp` path. It uses the same Microsoft Entra ID authentication and experiment access controls as the ZebraAI API.

Production endpoint:

```text
https://zebra-ai-api-prd.ait.microsoft.com/mcp
```

UAT endpoint:

```text
https://zebra-ai-api-uat.ait.microsoft.com/mcp
```

Use Production unless the ZebraAI team explicitly asks you to test in UAT.

## Authentication Values

Use these values when acquiring tokens or configuring OAuth clients.

| Value | Setting |
|---|---|
| Tenant ID | `72f988bf-86f1-41af-91ab-2d7cd011db47` |
| ZebraAI API app/resource ID | `9021b3a5-1f0d-4fb7-ad3f-d6989f0432d8` |
| Delegated scope | `api://9021b3a5-1f0d-4fb7-ad3f-d6989f0432d8/access_as_user` |
| Static permission scope | `api://9021b3a5-1f0d-4fb7-ad3f-d6989f0432d8/.default` |

Use `access_as_user` when a tool or portal asks for the exact delegated OAuth scope. Use `.default` when using Azure CLI, MSAL, or Azure Identity after the client app already has the ZebraAI API permission configured.

The access token sent to `/mcp` must have an audience of either:

```text
api://9021b3a5-1f0d-4fb7-ad3f-d6989f0432d8
```

or:

```text
9021b3a5-1f0d-4fb7-ad3f-d6989f0432d8
```

Do not use another client application's app ID as the resource, audience, or scope.

## Access Requirements

Before you can run experiments through MCP, you need both authentication and ZebraAI experiment access.

1. Your experiment must be approved for API access.
2. The experiment must be active.
3. The model used by the experiment must be active.
4. Your caller identity must be allowed for that experiment.
5. If you use your own Entra application, provide the ZebraAI team with the app registration client ID so it can be authorized for ZebraAI API use.

When requesting access, send the ZebraAI team:

- Target environment: Production or UAT.
- Experiment ID GUIDs that need MCP/API access.
- Caller type: user, custom Entra application, managed identity, or Power Platform connector.
- Caller identifier: user UPN, app registration client ID, managed identity client ID, or connector client app ID.
- Business reason and expected tools/actions.

Do not send client secrets, certificates, bearer tokens, or other credentials.

## Available Tools

The current Production MCP tool list was validated on 2026-05-06.

| Tool | Purpose |
|---|---|
| `get_version` | Confirm which ZebraAI API deployment you reached. |
| `list_indexes` | List available Azure AI Search indexes. |
| `search_data_keys` | Search data keys in an approved search index. |
| `get_query_reference` | Return OData/filter syntax guidance. |
| `run_experiment` | Run an approved ZebraAI experiment by experiment ID. |
| `submit_feedback` | Submit feedback for an experiment run. |
| `list_feedback` | List feedback for an experiment. |
| `get_feedback` | Retrieve a feedback entry. |
| `delete_feedback_entry` | Delete one feedback entry. |
| `delete_experiment_feedback` | Delete all feedback entries for an experiment. |

## Custom Application Setup

Use this path when you are building your own app, service, script, workflow, or agent and can attach an HTTP bearer token to MCP requests.

**1. Register or identify your Entra application**

Create or use an existing Entra app registration for your client application. Record its client ID.  This must be one you or your team owns and maintains.

No client secret is required for public interactive clients. If your app uses managed identity, federated identity, or certificate-based auth, follow your service's approved identity pattern and do not place secrets in code.

**2. Configure ZebraAI API permissions**

In the client app registration, add permission to the ZebraAI API app:

```text
9021b3a5-1f0d-4fb7-ad3f-d6989f0432d8
```

Use the delegated permission:

```text
access_as_user
```

Grant tenant/admin consent if your app or tenant requires it.

**3. Request ZebraAI API/MCP access**

Send the client ID and experiment ID GUIDs to the ZebraAI team. The team must approve the experiment for API access and authorize the caller identity for that experiment.

**4. Acquire a token**

Interactive/custom app clients should request either:

```text
api://9021b3a5-1f0d-4fb7-ad3f-d6989f0432d8/access_as_user
```

or, after the app permission is configured:

```text
api://9021b3a5-1f0d-4fb7-ad3f-d6989f0432d8/.default
```

**5. Send MCP requests**

MCP uses Streamable HTTP. Send POST requests to `/mcp` with these headers:

```text
Authorization: Bearer <access-token>
Accept: application/json, text/event-stream
MCP-Protocol-Version: 2024-11-05
Content-Type: application/json
```

Example `tools/list` request body:

```json
{
  "jsonrpc": "2.0",
  "id": "tools-list",
  "method": "tools/list",
  "params": {}
}
```

Example `get_version` request body:

```json
{
  "jsonrpc": "2.0",
  "id": "1",
  "method": "tools/call",
  "params": {
    "name": "get_version",
    "arguments": {}
  }
}
```

Example `run_experiment` request body:

```json
{
  "jsonrpc": "2.0",
  "id": "2",
  "method": "tools/call",
  "params": {
    "name": "run_experiment",
    "arguments": {
      "experiment_id": "00000000-0000-0000-0000-000000000000",
      "search": "*",
      "max_rows": 2,
      "sensitive_do_not_log": true
    }
  }
}
```

Replace `experiment_id` with an approved ZebraAI experiment GUID. Friendly experiment names are not supported by the MCP tool.

MCP responses are returned as `text/event-stream`. The JSON-RPC result is on the `data:` line.

## VS Code Setup

Use this path when you want GitHub Copilot Chat in VS Code to call ZebraAI MCP tools.

**1. Sign in with Azure CLI**

Run this in PowerShell:

```powershell
az config set core.enable_broker_on_windows=true
az login --tenant 72f988bf-86f1-41af-91ab-2d7cd011db47
```

**2. Get a ZebraAI API token**

Run:

```powershell
az account get-access-token `
  --tenant 72f988bf-86f1-41af-91ab-2d7cd011db47 `
  --scope api://9021b3a5-1f0d-4fb7-ad3f-d6989f0432d8/.default `
  --query accessToken `
  -o tsv
```

Copy the token value. Treat it as sensitive. It expires and must be refreshed when VS Code starts returning auth failures.

**3. Add the MCP server to VS Code**

Note: We are working on a VS Code Extension that will handle authentication to the MCP server for you using an az cli token.  You must have an azure account in the Microsoft tenant.

In VS Code, run `MCP: Open User Configuration` from the Command Palette and add this server:

```json
{
  "servers": {
    "zebraAiProd": {
      "type": "http",
      "url": "https://zebra-ai-api-prd.ait.microsoft.com/mcp",
      "headers": {
        "Authorization": "Bearer ${input:zebraai-token}",
        "Accept": "application/json, text/event-stream",
        "MCP-Protocol-Version": "2024-11-05"
      }
    }
  },
  "inputs": [
    {
      "id": "zebraai-token",
      "type": "promptString",
      "description": "Paste a current ZebraAI API access token from Azure CLI",
      "password": true
    }
  ]
}
```

Use User Configuration instead of workspace configuration when possible so bearer-token inputs are not mixed with shared repo files.

**4. Start and trust the MCP server**

Run `MCP: List Servers`, select `zebraAiProd`, and start it. VS Code will prompt for the token and ask you to trust the server configuration.

After startup, VS Code discovers the available ZebraAI MCP tools. In Copilot Chat, ask for actions that naturally map to the tools, for example:

```text
Use ZebraAI to get the current API version.
```

```text
Use ZebraAI to run experiment <experiment-guid> with max_rows 2 and sensitive_do_not_log true.
```

If tools do not appear after a server-side tool change, run `MCP: Reset Cached Tools` and restart the MCP server.

If calls start failing with `401` or `403`, refresh the Azure CLI token and update the stored input value. If VS Code does not prompt again, remove and re-add the server entry or change the input ID, then restart the server.

## Microsoft Scout Setup

Use these steps to connect Microsoft Scout to the ZebraAI MCP server.

### Add the ZebraAI MCP server

1. In Scout, select the **...** menu in the lower-left corner.

  ![Open the Scout menu](/.attachments/scout-open-extensions-menu.png)

2. Select **Extensions**.
3. Open the **MCP Servers** tab.
4. Select **Add Server**.
5. Enter **ZebraAI MCP** as the server name.
6. Keep **Remote / Local URL** selected.
7. Enter the following remote URL:

   ```text
   https://zebra-ai-api-prd.ait.microsoft.com/mcp
   ```

8. Leave **Bearer token** and **Tool-call timeout** empty unless the ZebraAI team directs you otherwise.
9. Select **Add**.

  ![Configure the ZebraAI MCP server in Scout](/.attachments/scout-add-mcp-server.png)

Scout stores a configuration similar to the following, using your Microsoft account as the OAuth alias:

```json
"zebraai_mcp": {
  "builtin": false,
  "config": {
    "name": "ZebraAI MCP",
    "url": "https://zebra-ai-api-prd.ait.microsoft.com/mcp",
    "oauthAlias": "yourusername@microsoft.com"
  }
}
```

### Use ZebraAI tools in a chat

Start a new Scout chat after adding the server. On first use, Scout may need explicit guidance to choose ZebraAI tools, especially when many tools are available.

For example:

```text
Create a skill or memory that uses the ZebraAI MCP server and its tools whenever
I ask about case data or ZebraAI experiments.
```

### Scout Troubleshooting: Entra prompt shows "Visual Studio Code"

**Symptom:** 
<br>
When Scout authenticates to ZebraAI, the Entra consent/sign-in prompt identifies the requesting app as **Visual Studio Code**, not Scout.

**Cause:** 
<br>
Scout's bundled Azure Identity runtime includes `VisualStudioCodeCredential`. When the ZebraAI MCP config doesn't specify its own OAuth client ID, auth falls back to that default client — VS Code's app ID (`aebc6443-996d-45c2-90f0-388ff96faa56`). This is expected fallback behavior, not a sign that VS Code is involved in the request.

**Fix:**

Pre-authorize/grant the `access_as_user` scope (see [Authentication Values](#authentication-values)) for the VS Code client app ID (`aebc6443-996d-45c2-90f0-388ff96faa56`) so the existing flow succeeds.

> ⚠️ **Unverified — needs confirmation before publishing:** it's not yet confirmed whether Scout's MCP config schema supports a custom `oauthClientId`/`oauthPublicClient` field (the current documented config only shows `oauthAlias`). If it does, the preferred long-term fix is registering a dedicated public client app for Scout/ZebraAI instead of relying on the VS Code client ID. Confirm with the Scout config owner and update this section accordingly.

## Power Platform And Dataverse Connector Setup

Use this path when Power Apps or Power Automate needs a custom connector for the MCP server.

Power Platform imports OpenAPI/Swagger, so the YAML file is the connector template. The YAML is not needed for VS Code or normal custom applications.

Production connector template:

```text
docs/McpServer/zebraai-mcp-prod.swagger.yaml
```

UAT connector template:

```text
docs/McpServer/zebraai-mcp-uat.swagger.yaml
```

Import the YAML in Power Apps or Power Automate under `Data` > `Custom connectors` > `New custom connector` > `Import an OpenAPI file`.

On the connector security page, confirm:

```text
Authorization URL: https://login.microsoftonline.com/organizations/oauth2/v2.0/authorize
Token URL: https://login.microsoftonline.com/organizations/oauth2/v2.0/token
Scope: api://9021b3a5-1f0d-4fb7-ad3f-d6989f0432d8/access_as_user
```

If the UI shows `Resource URL`, use:

```text
api://9021b3a5-1f0d-4fb7-ad3f-d6989f0432d8
```

After changing connector security settings, delete and recreate the Power Platform connection. Existing connections can keep stale OAuth metadata.

## Troubleshooting

### `AADSTS650057: Invalid resource`

The OAuth request is asking for a resource that is not configured on the client app registration.

Check that the connector or client requests the ZebraAI API resource:

```text
api://9021b3a5-1f0d-4fb7-ad3f-d6989f0432d8/access_as_user
```

Do not put another client application's app ID in the resource, audience, or scope field.

### `401 Unauthorized`

The bearer token is missing, expired, malformed, or has the wrong audience. Acquire a fresh token and confirm the token audience is the ZebraAI API resource ID.

### `403 Forbidden` or experiment access denied

Authentication succeeded, but ZebraAI access checks failed. Confirm the experiment is approved for API/MCP access and the caller identity is allowed for that experiment.

### Tool not found

The MCP client has stale tool metadata or is calling a retired tool. Scheduling tools are no longer exposed. Reset cached tools and call `tools/list` again.

## Validation Commands

Use this command to validate basic production connectivity with Azure CLI auth:

```powershell
$tenantId = '72f988bf-86f1-41af-91ab-2d7cd011db47'
$scope = 'api://9021b3a5-1f0d-4fb7-ad3f-d6989f0432d8/.default'
$mcpUrl = 'https://zebra-ai-api-prd.ait.microsoft.com/mcp'
$token = az account get-access-token --tenant $tenantId --scope $scope --query accessToken -o tsv
$body = @{ jsonrpc = '2.0'; id = 'tools-list'; method = 'tools/list'; params = @{} } | ConvertTo-Json -Depth 20
Invoke-WebRequest `
  -Uri $mcpUrl `
  -Method Post `
  -Headers @{ Authorization = "Bearer $token"; Accept = 'application/json, text/event-stream'; 'MCP-Protocol-Version' = '2024-11-05' } `
  -ContentType 'application/json' `
  -Body $body
```

Expected result: HTTP 200 with a `text/event-stream` body containing a JSON-RPC `tools` list on the `data:` line.

