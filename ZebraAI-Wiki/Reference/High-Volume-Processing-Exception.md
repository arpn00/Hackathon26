# ZebraAI High Volume Processing Exception – Process Overview
<br>

To review the current platform limitations, visit: [Platform Limitations - Overview](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/305/Platform-Limitations) 

**Purpose** <br>
This document defines the ZebraAI High Volume Processing Exception process for customers and internal teams, clarifying limits, exception tiers, request paths, approvals, and responsibilities. The goal is to ensure platform stability while enabling justified high-volume use cases. 

**Scope** <br>
Applies to ZebraAI users, apps, and production integrations processing cases via ZebraAI. Covers default limits, high-volume exceptions, and enterprise-level volume processing. Excludes long-term platform capacity planning and non-ZebraAI services. 

## **Definitions**
- Case: A single unit of work processed by ZebraAI. 
- Daily Processing Window: Rolling 24-hour period. 
- HTTP 429 – Too Many Requests: Signal that the daily quota has been exceeded. 
- Exception: Approved increase to default processing limits. 

## **Processing Tiers** 
<br>

**Tier 1: Default Processing (Baseline)**
- Limit: 1,000 cases per 24 hours (users and apps). 
- Behavior: Requests beyond the limit return HTTP 429. 
- Who these fits: Standard usage, pilots, low-to-moderate volume scenarios.

- SLA: 24 hours

**Tier 2: High Volume Processing (Exception)** <br>

Limit: Up to 30,000 cases per 24 hours. 

- Eligibility: Valid business justification. 

- Use cases: Backfills, migrations, operational spikes. 

- Request paths: Users via [CoreIdentity](https://coreidentity.microsoft.com/manage/Entitlement/entitlement/zebraai-lmrc); Apps via High Volume Exception Request [Form](https://forms.office.com/r/cGiQSTUKs7). 

- SLA: 48 hours

**Tier 3: Enterprise Volume Processing (Restricted)**<br>

Limit: From 30k to 180k cases per 24 hours. 

**Audience:** Production tools, critical endpoints, high-impact custom apps with proven ROI. 

**Required:** (Must have) security exception approval, ZAI budget impact and overall capacity constraints assessment; customer provided $ROI/ expansion plans SBU commitment , **and formal approvals by Thad Schwebke.** 

SLA: 5 working days 

**End-To-End Process Flow**

1.  Detection: HTTP 429 error after exceeding 1,000 cases/day. 
2.  Triage & Classification: Determine required processing tier. 
3.  Business Justification: Define use case, volume, duration, and impact. 
4.  Request Submission: CoreIdentity (users) or Exception Request Form (apps) or via email to Thad for enterprise tier with required inputs. 
5.  Review & Approval: Validation, security, and budget and capacity assessment as required. 
6.  Enablement: Quota increase applied and communicated. 
7.  Monitoring & Governance: Ongoing monitoring; exceptions may be time-bound. 

**Roles & Responsibilities**

- Customer / Requesting Team: Monitor usage, submit justification, comply with approved limits. 

- ZebraAI Platform / Internal Team: Enforce quotas, review approvals, monitor platform health.

**RACI Matrix**
| <br><br>Activity <br><br><br><br><br> | <br><br>Customer / Requesting Team <br><br><br><br><br> | <br><br>ZebraAI Platform <br><br><br><br><br> | <br><br>Security <br><br><br><br><br> | <br><br>Finance / Budget <br><br><br><br><br> |
| --- | --- | --- | --- | --- |
| <br><br>Detect 429 / Usage Spike <br><br><br><br><br> | <br><br>R <br><br><br><br><br> | <br><br>C <br><br><br><br><br> | <br><br> | <br><br> |
| <br><br>Prepare Business Justification <br><br>ROI etc. (Tier 3) <br><br><br><br><br> | <br><br>R <br><br><br><br><br> | <br><br>C <br><br><br><br><br> | <br><br> | <br><br> |
| <br><br>Submit Exception Request <br><br><br><br><br> | <br><br>R <br><br><br><br><br> | <br><br>C <br><br><br><br><br> | <br><br> | <br><br> |
| <br><br>Review Tier 2 Request <br><br><br><br><br> | <br><br>C <br><br><br><br><br> | <br><br>A/R <br><br><br><br><br> | <br><br> | <br><br> |
| <br><br>Review Tier 3 Request <br><br><br><br><br> | <br><br>C <br><br><br><br><br> | <br><br>R <br><br><br><br><br> | <br><br>A/R <br><br><br><br><br> | <br><br>C <br><br><br><br><br> |
| <br><br>Approve Quota Increase <br><br><br><br><br> | <br><br> | <br><br>A <br><br><br><br><br> | <br><br>C <br><br><br><br><br> | <br><br>C <br><br><br><br><br> |
| <br><br>Apply Quota & Enable <br><br><br><br><br> | <br><br> | <br><br>R <br><br><br><br><br> | <br><br> | <br><br> |
| <br><br>Ongoing Monitoring <br><br><br><br><br> | <br><br>C <br><br><br><br><br> | <br><br>A/R <br><br><br><br><br> | <br><br> | <br><br> |

<br>
<br>

**Approval Checklist**

*   Clear description of use case and scenario provided 
*   Requested daily volume and duration defined 
*   Business impact documented if exception is not approved 
*   Tier classification confirmed (Tier 2 vs Tier 3) 
*   Tool, app usage and other stats, $ROI/ expansion plans, CSS SBU commitments (Tier 3) 
*   Security review completed (Tier 3 only) 
*   ZAI budget and capacity constrain impact assessed and approved (Tier 3 only) 
*   Exception duration and expiration date defined 
*   Monitoring and rollback plan acknowledged

<br>

**Customer Provided Request Details (to be emailed to Thad Schwebke when requesting Tier 3 exception)**

1.  What is the application (describe)? How is it being used today? What CSS roles are using it and how (list use cases)?  What part of case lifecycle?
2.  App stats: how many users per day? What case volume is being processed, etc.? 
3.  What CSS business units ( SBU) and Line of businesses (LOB) and geography are using it?  
4.  What is the ROI ($ saved per year and Volume reduced per year) that this Application/tool delivers?  Please be specific. 
5.  What is the ask and why (reasons)? (please be specific) 
6.  What is the impact if not approved?  
7.  Who is the Executive sponsorship?