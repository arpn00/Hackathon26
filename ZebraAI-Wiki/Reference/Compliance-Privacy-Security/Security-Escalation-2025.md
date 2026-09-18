#ZebraAI Security Escalation

##Executive Summary

A recent escalation identified risk areas where ZebraAI (ZAI) needs additional guardrails. Primary concerns: (a) linkable/relatable metadata enabling re‑association to customers, (b) authorization scope vs. downstream tool behavior (JIT/JEA), (c) rate limiting/throttling, and (d) upstream data filtering and PII scrubbing. The workstreams below lay out mitigations, owners, and tracking items. We are costing these changes and will update estimated timelines and related ADO items as they are finalized.


> Data classification context: ZebraAI content is Business Data (anonymized, augmented DfM) but includes linkable metadata (e.g., CaseNumber, TPID). On its own, ZAI may be low risk; combined with other tools/processes, metadata can be used to re‑associate content to specific customers, increasing risk exposure.

##Scope & Goals
###Scope
*   In scope: ZAI experiments accessing production case data; ingestion from Cornerstone; experiment UI/UX behaviors; logging/telemetry; anomaly detection; user‑initiated reporting of sensitive content; pen‑test evidence; keyword/PII query interception; TPID‑based filtering controls; JIT/JEA integration boundaries.
*   Out of scope (for this doc): Broader enterprise data governance policy changes; non‑ZAI product roadmaps (except interfaces cited here).

###Goals

1.  Reduce ability to re‑link anonymized ZAI outputs back to customers.
2.  Enforce least‑privilege access aligned to business use while preserving performance and value.
3.  Improve detection, response, and reporting for misuse or data exposure.
4.  Ensure upstream providers (Cornerstone) meet scrubbing/segregation requirements before ingestion.

##Current Controls
*   AuthN: CORP; access over Azn VPN.
*   Experiment approvals: Required for any run against production case data; prompt changes require new approval.
*   AuthZ: Each experiment has user‑level authorization.
*   Logging: User interactions are logged; logs do not include raw sensitive data. Revised note: logs do include the data key (e.g., CaseNumber) for items processed by AI.


##Risks & Abuse Scenarios
- Re‑association via process chaining: 
   - RAR (Rapid Analyse & Recommendation): IMs can gather case numbers/TPIDs from Customer Analytics BI and batch summarize in ZAI, producing anonymized summaries that, when combined with original inputs, can be re‑linked to customers. A compromised/bad‑actor IM account could summarize cases beyond their normal DfM JIT/JEA scope.
   - "Similar cases" lookups (VKB‑style): Searching “SharePoint 2016 vulnerability” may return case lists with summaries; copying case numbers into DfM/CaseBuddy can reveal associated customers without JIT gating, enabling threat intel on affected customers.
- Authorization boundary gaps: ZAI outputs may effectively extend a user’s observational scope beyond what DfM JIT/JEA would allow, if metadata is exposed or exploitable across tools.
- Incomplete upstream scrubbing/segmentation: Cornerstone PII scrubbing limited to English or incomplete across languages; Restricted Access (RA) segregation not guaranteed; potential commingling with Commercial/Consumer paths.
- Insufficient detection/response
   - Missing anomaly detection for abuse patterns (e.g., high‑volume queries, focused TPID probing).
   - No one‑click user control to report PII/RA issues.
   - Limited visibility into scrubbing effectiveness metrics.

##Mitigation Plan

###Auditing & Logging + Anomaly Detection

Intent: Capture granular, privacy‑preserving audit logs across all components; detect abnormal usage (e.g., extreme volumes, focused TPID access); tune alerts/runbooks.

Key actions: 
1) Define events and exclusions (no raw PII/sensitive content in logs).

2) Enable Azure‑native logging (Monitor, Log Analytics, App Insights).

3) Deploy anomaly detection; simulate misuse; tune thresholds.

4) Document response runbooks.

###Cornerstone Data Requirements
Intent: Enforce PII scrubbing across all languages before ingestion; enforce strict RA case segregation (EU‑like pathing); update contracts; monitor and escalate violations.

###PII Scrub Reporting
Intent: Instrument pipeline to compute and report scrub success rate per dataset/sample (target >95%); build dashboards/alerts (e.g., Power BI).

###Provide Pen‑Testing Results

Intent: Publish access to the pen‑test report (AI pen test by Darrius Robinson; Ryan Wilson & Bryan Leon).

###User Feedback Control – Report Sensitive Data

Intent: One‑click “Report Sensitive Data” on experiment pages; capture full session context; auto‑create P1 bug in ADO; secure transmission/storage; alert engineering.

###Keyword/PII Search Term Detection

Intent: Intercept queries containing PII (emails, phone numbers) or sensitive terms (e.g., security, fraud, zero‑day); warn users; on continue, log full session and auto‑create P1 ADO bug; enable audit/review.

###Throttling / Rate Limits

Intent: Define and enforce rate limits at user/experiment/TPID scopes to reduce scraping or mass‑exfiltration risk without harming legitimate workloads.


##Design Principles & Guardrails
1.  Prevent re‑association: Minimize exposure of linkable identifiers (CaseNumber, TPID); consider obfuscation or delayed reveal until authorization is verified.
2.  JIT on processing, not on search: Maintain business value and performance; gate only when support data is actually injected.
3.  Least privilege: Enforce per‑case access where feasible; exceptions via Core Identity group with formal approval.
4.  Privacy‑preserving telemetry: Log who/what/when/where without raw PII; keep data keys only as needed for investigations.
5.  Defense‑in‑depth: Combine preventive controls (TPID restrictions, throttling) with detective (anomalies) and responsive (one‑click P1 reporting).


##References & Tracking
*   ADO: 4434–4439, 4440–4446, 4475–4479.
*   For live status of all mitigation workstreams, visit the [Security Escalation 2025 Dashboard](https://dev.azure.com/cnfe/ZebraAI/_dashboards/dashboard/d28cc049-735e-4353-a5ae-742ef70bbdf0)
*   Pen test: Led by Darrius Robinson with Ryan Wilson & Bryan Leon.
*   Stakeholders: ZAI Engineering, SxG, Security/Compliance, IM leadership; Core Identity group approvers.

##Glossary

*   CaseNumber: Unique case identifier in DfM.
*   TPID: Tenant/Partner/Customer identifier used across tooling.
*   JIT/JEA: Just‑In‑Time/Just‑Enough‑Access.
*   RA: Restricted Access (e.g., security‑sensitive).
*   EUII: End‑user identifiable information (PII).
*   RAR: Rapid Analyse & Recommendation experiment.
*   VKB‑style: “Similar cases” lookup returning case lists & summaries.
*   SxG: Upstream/ingestion partner team.
*   Azn: Corporate VPN.
*   ZAI: ZebraAI.
