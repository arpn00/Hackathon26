# ZebraAI / Citizen Devevlopment OAP — Agent Onboarding (How-To Guide)

  

Standardized, repeatable onboarding for CitDev and ZebraAI agents into the One Agentic Platform (OAP).

Additional resources:
- Info about management of ZebraAI's OAP environments: [OAP Governance & Operations - Overview](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/360/OAP-Governance-Operations)
  

---

  

## Environment Model

  

You will work across three environments:

  

**INT** — Development (primary build environment)

- Build your ideas and share with a limited number of collaborators 
- If you do not intent do share your agent, you can keep it in INT and not pursue the INT ➡️ PPE ➡️ PROD path

**PPE** — Pre-production validation 

- Run a mini pilot 
- Test ROI hypothesis


**PROD** — Production

- Share finished agents with unlimited users  

> ⚠ _There is no "DEV" environment. INT is the initial building and testing environment._

<br>

  

---

  

## End-to-End Flow of building an agent in ZebraAI's OAP environments

  

1. Request access to OAPI-INT-ZAI environment

2. Build, test, and revise in the INT environment until the agent is stabilized

3. Graduate to PPE and complete further validation 

4. Submit ICP intake (expected ROI + impact) 

5. Start RAI and TRiP

6. Present to SBU stakeholders 

7. Production path planning

8. Promote to production 

<br>
  

---
<br>  

  

## Step 1: Request access to OAPI-INT-ZAI
- Request access [here](https://myaccess.microsoft.com/@microsoft.onmicrosoft.com#/access-packages/e24e43f7-b430-4443-8581-eac30108f6ec)
- SLA for access to be granted: 1 business day
  


<br>
  

---

<br> 

## Step 2: Build in INT, then validate
- Start testing and building in the INT environment. For more information about using the connector, see [How to use the ZebraAI Connector in Power Platform or Microsoft Copilot Studio - Overview](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/241/How-to-use-the-ZebraAI-Connector-in-Power-Platform-or-Microsoft-Copilot-Studio)
- Before graduating to PPE, your agent must meet minimum criteria for stability
- If you are using a Connector that is not already included in the package, you will also need to apply for DLP Exception Approval

### Step 2A: Start building!
Now that you have access to OAPI-ZAI-INT, start building your agent. 

### Step 2B: DLP Exception Approval (if needed)
DLP Exception Approval is required if you are using a Connector that is not already available.

- Create Threat Model using info at [Microsoft Threat Modeling Tool overview - Azure | Microsoft Learn](https://learn.microsoft.com/en-us/azure/security/develop/threat-modeling-tool)
- Submit form with Threat Model and Business Justification: [ZebraAI OAP Requests – Fill out form](https://forms.office.com/r/q3CuABtF4t)
- The XPO team will manage your request from there
- SLA: 2-5 business days

  
> **📌 Note** Your threat model is required and reused for SDL compliance later.

### Step 2C: Validation

You must reach a stable state before applying for PPE. The following info can be found under your agent's Analytics. 

![copilot-analytics](/_site/wiki/imgs/copilot-analytics.png)  

####Minimum criteria:  

- ≥ 95% success rate (50+ runs) 

- No Sev1/Sev2 errors for 5 days 

  

####Required telemetry:
  

- Run count 

- Percentage of successful runs

- User feedback 



<br>  


---
<br> 

  

## Step 3: Graduate to Pre-Production Environment and further validate your agent (INT → PPE)

### Step 3A: Get ready to move to PPE

Prerequisites to move to PPE:

- Version your agent (Example: v1.0-PPE-2026-05-19)
- Export solution 
- Keep rollback version 
- SLA for copying your agent to the new environment: 2 business days

### Step 3B: Submit request to graduate to PPE
- Submit form at [ZebraAI OAP Requests – Fill out form](https://forms.office.com/r/q3CuABtF4t)

### Step 3C: While in PPE, you should:

- Complete feature development 
- Validate with real scenarios 
- Complete ICP intake and prioritization (Step 4)
- Start RAI and TRiP (Step 5)

<br>

---


## Step 4: Submit ICP Intake (ROI + Impact)
- You must provide: expected ROI (hours saved, $ value), target users, adoption goals  
- Link TBD

<br>

---

<br>

## Step 5: Start RAI and TRiP compliance reviews
###RAI
- Submit here: [OneRAI](https://onerai.microsoft.com/)

###TRiP
- Submit here: [OneTrIP Platform](https://onetrip.powerappsportals.com/)
- Guide for Agent Owners: [Digital Asset Owner (DAO) guide](https://microsoft.sharepoint.com/teams/TrIP/SitePages/Digital-asset-owner-guide.aspx)
- TRiP Help and Office Hours: [Get Help Faster with MCAPSHelp](https://microsoft.sharepoint.com/teams/TrIP/SitePages/TrIPs%20new%20support%20process%20via%20MCAPSHelp.aspx)
- TRiP Compliance Coach Agent: [Compliance Coach](https://microsoft.sharepoint.com/teams/TrIP/SitePages/Compliance-Coach.aspx)

<br>

---

<br>

## Step 6: Business Value Validation
Present your agent to SBU stakeholders with the following: 
- Compare expected ROI from step 4 with actual PPE results
- Provide value assessment
- Show realized vs expected delta
- Show adoption + value  
- Confirm production readiness  

<br>

---

<br>

## Step 7: Production Path Planning
- Program Lead and SBUs will decide the best production environment for your agent. 
- SLA: 2-4 business days

<br>

---

<br>

## Step 8: Promote from PPE to Production environment

- This will be completed by XPO/ZAI Ops based on the decision from step 7


### Production Promotion Checklist

Before PROD, confirm:

- INT stabilization complete  
- PPE validation complete  
- SDL review complete  
- Privacy review complete  
- RAI review complete  
- DLP exceptions approved  
- SBU sign-off received  

<br>

---

<br>

## Failure & Rework Paths

| Issue | Action |
|------|--------|
| INT instability | Return to build/test |
| PPE defects | Stay in PPE and iterate |
| Weak business value | Improve or descope |
| SBU rejection | Revise value case |
| Compliance failure | Fix and resubmit |

