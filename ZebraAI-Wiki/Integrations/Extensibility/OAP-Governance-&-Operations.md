# ZAI / CitDev OAP — Governance, Compliance & Operations


  

---

  

## Roles & Responsibilities

  

### Program Lead

- Owns onboarding process 

- Accountable for business value 

- Leads SBU alignment 

  

---

  

### Agent Owner

- Builds and maintains agent 

- Owns production behavior 

- Responsible for compliance: SDL, Privacy, RAI, EGRC 

  

---

  

### XPO Team

- MCP + connectors 

- DLP ownership 

- Production promotion 

  

---

  

### ZAI Engineering

- MCP server ownership 

- Connector support 

  

---

  

### OAP Platform

- DLP approvals 

- Governance enforcement 

  

---

  

### ZAI Ops

- Access approval 

- Production gatekeeper 

  

---

  

### Security & Compliance

- SDL / Privacy / RAI / EGRC approvals 

  

---

  

## RACI Model
R = Responsible (does the work),
A = Accountable (owns the outcome),
C = Consulted (provides input),
I = Informed (kept in the loop)

|Process Step| Program Lead | Agent Owner | XPO Team | ZAI Engineering | OAP Platform | ZAI Ops | Security & Compliance | SBUs |
|--|--|--|--|--|--|--|--|--|
| Step 1: Request Access to OAP INT | I | R | C |  | C | A | C |  |
| Step 2: Document Agent Dependencies | I | R/A | C | C | C |  | C |  |
| Step 3: MCP & ZAI Connectors | I | I | R | A | I |  | C |  |
| Step 4 DLP Exception Request & Approval | I | I | R | C | A |  | C |  |
| Step 5: INT Validation & Stabilization | I | R/A | C | C |  | C | I |  |
| Step 6: Agent Build, Test, & Evaluation | I | R/A | C | C | I | I | C |  |
| Step 7: Inform Program Lead of Intended Agent Graduation to PPE | A | R | I | I | I |  |  | C |
| Step 8: Business Value Assessment | A | R | I | I |  |  |  | C |
| Step 9: SBU Alignment & Readout | R/A | C | I | I | I |  |  | I |
| Step 10: Selective Approval for Production | R | I | I | I | C | A | C | I |
| Step 11: Promote via Path-to-Production | I | C | R | C | I | A | C | I |
| Post-Production Monitoring & Rollback | I | A | C | C | C | R | C | I |
| Compliance Reviews | I | R | I | I | C | I | A | I |
| Connector Deployment & Packaging  | I | I | R/A | C | C | C | C |  |
| Connector Governance & DLP Reuse | I | I | R | C | A |  | C |  |
| Agent Ownership Transfer / Sunset | A | R | C |  | C |  | C | I |
| Documentation & Process Publication | R/A | I | C | C | C | I | I | I |

 
---

  

## DLP Governance

  

- XPO owns end-to-end DLP 

- Approved connectors are reusable 

- Security team provides pre-approved solutions 

  

> **✅ SLA**

> 2–5 business days after threat model submission.

  

---

  

## Compliance Requirements

  

### Required for Production

  

- **SDL**

  - Threat model required 

  - https://aka.ms/sdlca 

  

- **Privacy Review**

  - http://aka.ms/privacymanager 

  

- **RAI Review**

  - Required for all AI agents 

  

---

  

### Required for INT (One-Time)

  

- **EGRC Exception**

  - https://egrc.microsoft.com 

  

---

  

## Connector Strategy

  

### Deployment Model

  

- Packaged as Power Platform solution 

- Shared across environments 

- Centrally managed 

  

---

  

### Authentication Models

  

- App-to-app 

- On-Behalf-Of (OBO) 

  

---

  

## Support Model

|Issue| First Responder | Escalation |
|--|--|--|
| Agent behavior (wrong answer, prompt issue, regression) | Agent Owner | Agent Owner's management chain |
| Platform/MCP/connector incident | Michael Yuen (XPO) | Thad Schwebke / ZAI Ops |
| Environment Outage | OAP Platform Team | OAP on-call |
| Compliance violation discovered post-prod | Program Lead + Agent Owner | OAP Platform + Compliance owners |


  

---

  

### Severity SLAs

  

- **Sev1:** Ack within 1 business day 

- **Sev2:** Ack within 1 business day 

- **Sev3:** Triage within 10 business days 

  

---

  

## Ownership & Decommissioning

  

- Agent Owner fully responsible in PROD 

- Platform team supports infra only 

  

### Ownership Loss

  

- Escalates to management chain 

- If no owner → decommission 

  

**Default notice period:**

  

- 30 days 

  

---

  

## References

  

- [OAP Path-to-Production](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/358/OAP-Agent-Onboarding)

- OAP Hub: https://aka.ms/oap/hub 

- [ZebraAI MCP endpoints](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/356/Using-ZebraAI-MCP-Server) 

  

---

  

## Glossary
- OAP : One Agentic Platform
- ZAI: ZebraAI
- INT: Developmental environment
- PPE: Pre-production environment
- Prod: Production environment
- MCP: Model Context Protocol

