# ZebraAI Extensibility Overview


## What is extensibility?

Extensibility in ZebraAI allows teams to add capabilities, integrations, and automation that integrates with their ZebraAI experiments.
  
It enables:
*   New user experiences
*   Integration with external systems
*   Faster experimentation

## Why does it matter?

*   Flexibility: adapt ZebraAI to team and business workflows
*   Scalability: add features incrementally
*   Interoperability: connect data and actions across systems securely

## What options are available and which one should I use? 



| Option | Best for | Example | Typical Trigger | Strengths | Watch-outs |
| --- | --- | --- | --- | --- | --- |
| Web App | Custom-coded applications with direct API integration |  | Need full control over UX, execution flow, and integration logic | Maximum flexibility, custom auth patterns, tailored orchestration and UI | Requires engineering investment, ownership of hosting/security/scaling, and explicit API permission management|
| Microsoft Copilot Studio | Conversational workflows, guided actions, grounded responses | Agentic solution where you would want to run multiple experiments on multiple cases using natural language | Need copilots for business users with low-code orchestration | Fast bot/copilot development, connectors, governance-ready | Complex backend logic may still require APIs/services |
| Power Platform (Power Apps/Power Automate) | Form/workflow apps and process automation | Flows here are typically to run bulk fully automatic case processing using ZebraAI. However currently this is tied to a specific account. | Need lightweight app UI + approvals + business process flows | Rapid delivery, strong M365 integration | Can become hard to manage without solution architecture standards |
| Logic Apps | Enterprise/system-to-system integration | Flows here are typically to run bulk fully automatic case processing using zebraai. However here the app can run using a managed account that is pre-approved for ZebraAI. | Event-driven or scheduled orchestration across services | Reliable connectors, retry/error handling, enterprise integration patterns | Cost and complexity increase with high-volume or deeply nested flows |
| MCP Server | Tool-calling interface for agentic scenarios | Plug into VSCode or Agency today (may come to Scout) - now build skills that can leverage this mcp server and call ZebraAI as needed. | Need agents to safely call internal tools/data/actions | Standardized tool contracts, composable with agents | Requires careful tool auth, permission boundaries, and telemetry |
| OAP | Standardized API-driven extension surface | Something that you need to get to production and applies to a large group in CSS. | Need reusable, governed extension contracts across teams | Consistent API lifecycle, better reuse, versioning clarity | Requires ownership model and strong contract governance |



Recommended Selection Heuristics
--------------------------------

Use this quick rule:
*   Start with Copilot Studio when the primary experience is conversational.
*   Use Power Platform when business teams need low-code UI + automation.
*   Use Logic Apps for robust cross-system orchestration and enterprise reliability.
*   Use MCP Server when ZebraAI agents need governed tool/action calling.
*   Use OAP when you need consistent API contracts and reusable extension patterns across teams. 
*   Use Web App when you need complete customization and/or want to code the solution yourself. 



Additional Resources
--------------------
- [Add Experiment API - Overview](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/282/Add-Experiment-API)
- [API Documentation - Overview](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/269/API-Documentation)
- [How to use the ZebraAI Connector in Power Platform or Microsoft Copilot Studio - Overview](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/241/How-to-use-the-ZebraAI-Connector-in-Power-Platform-or-Microsoft-Copilot-Studio)
- [How to build and deploy ZebraAI Power Apps connector in your own environment - Overview](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/284/How-to-build-and-deploy-ZebraAI-Power-Apps-connector-in-your-own-environment)
- [Calling API with Logic Apps - Overview](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/270/Calling-API-with-Logic-Apps)
- [Using ZebraAI MCP Server - Overview](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/356/Using-ZebraAI-MCP-Server)
- [How to Onboard an Agent with ZebraAI to OAP - Overview](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/358/How-to-Onboard-an-Agent-with-ZebraAI-to-OAP)
- [ZebraAI Path to Production - Overview](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/287/ZebraAI-Path-to-Production)