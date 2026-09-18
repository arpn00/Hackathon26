#ZebraAI Path-to-Production Checklist 

This article covers the steps of the path to production for DFM Agent Copilot and Casebuddy.

##1. Experiment Validation/Triage for ICP  

*   Confirm experiment meets **business objectives** and aligns with ICP priorities. 
    

*   **Confirm experiment is scalable** to most CSS Commercial or Consumer SBUs 
    

*   Confirm/define qualitative and quantitative **ROI (Hours, $, volume, KPIs impact) based on DS analysis**. 
    

*   Validate **user scenarios** (single case for DFM/CB; multi-case for CaseBuddy only). 
    

*   Ensure **prompt patterns** and UX flows are finalized. 
    

##2. SxG Engineering prioritization (Case Buddy/ DFM) 

*   **Create ADO WI for Prioritized by ICP** experiments in CB and DFM Agent Copilot 
    

*   **Align with CSS A&I top priorities for CaseBuddy.**  
    

*   **Prioritization and scheduling with SxG Engineering.** 
    

*   (New!) **SBU buy in/ CSS impact modelling by** Mutlu Kurtloglu's team /David Komito’s teams. 
    

##3. Security & Compliance for client side (Case Buddy/ DFM/Z.AI) 

*   Complete **Threat Model Review (PR‑1)** for each surface. 
    

*   Execute **S2S Security Review (SF‑9)** for API calls and plugin integrations. 

* (New!) Execute **Privacy/Accessibility** reviews for new capabilities.
    

*   Validate **data handling** (PII, GDPR, retention policies). 
    

*   Document **RAI compliance** (Responsible AI checklist). 
    

##4. YAML development for DFM Copilot 

*   **Create production copy of experiment**, get CSS data and API approval (with production naming convention). 
    

*   Create YAML files, test in INT/UAP and PPE. 
    

*   Test with SxG ENG, **get production approval release**. 
    

*   Run **load tests** for expected concurrency. 
    

##5. SxG/A&I Engineering

*   In Z.AI **Create production copy of experiment**, get CSS data and API approval (with production naming convention). 
    

*   Complete build in CB and connect to Z.AI experiment via API. 
    

*   Test with **SxG ENG, get production approval release**. 
    

*   Run **load tests** for expected concurrency 
    

##6. Telemetry & Observability 

*   Implement **usage flagging** for Z.AI calls: 
    

    *   Fields: CaseID, User ID, Experiment ID, Timestamp, Platform. 
    

*   Ensure **Cornerstone → UDP pipeline** for DFM; onboard CaseBuddy to Cornerstone or UDP. 
    

*   Confirm **SPN access** for BI dashboards. 
    

##7. Limited testing/Pilots

*   **Prepare and conduct** limited testing with help of COE team. 
    

*   Pilots can run from 2 weeks to 1 month's testing. 
    

*   **Select testers**, submit access requests for prod/CB insider. 
    

*   **Prepare testing instructions**, scenarios, acceptance criteria and relevant comms/demo videos. 
    

*   **Determine pilot exit** acceptance criteria. 
    

*   **Conduct pilots**, collect user feedback and bugs. 
    

*   Bug fixes/ UX/UI changes prioritized and documented on Z.AI/DFM/CB sides. 
    

##8. Documentation & Communication

*   Update **path-to-prod one-pager** with: 
    

    *   Owners 
    

    *   Status (Pass/Gap) 
    

    *   Target dates 
    

*   Updates on features readiness to weekly cost savings trackers, MBRs and QBRs. 
    

*   Share with **v-team** (Ericka Washington, Thad Schwebke, ICP team.) for visibility. 
    

##9. Post-Production Monitoring 

*   Set up **health dashboards** for Z.AI usage and error rates. 
    

*   Define **incident response** for failures or security alerts. 
    

*   Schedule **periodic reviews** for model drift and UX feedback. 
    

##10. CSS release and change management plans 

*   **Conduct demos to AAI panes of glass team** and to various **CSS SBUs.** 
    

*   **Handover the production experiences** in DFM/CB for **CSS release/change management**. 
    

*   Align on release dates and comms. 
    

##Related Resources:

1. [Citizen Dev ADO](https://dev.azure.com/TSICitizenDevelopment/Citizen%20Development/_queries/query/76158300-2f37-4167-b941-e964271f5b99/); [Project Progress - ICP Report v2 - Power BI](https://msit.powerbi.com/groups/390fc5ea-7d3f-4a6c-a367-286a17fcf274/reports/235e3a7c-18d2-49ed-8204-b43add9c32ee/e0bb5769b204cc491949?experience=power-bi) 
    

2.  [SxG ADO](https://dev.azure.com/dynamicscrm/OneCRM/_workitems/edit/5140975) 
   
3. SFI:   
    - Approval: [User Story 1124256 Support Security Policy for CaseBuddy-ZebraAI-Feature of CaseBuddyApp](https://o365trustcompliance.visualstudio.com/Trust/_workitems/edit/1124256)  
    - Criteria: [20251031 Draft CPS Agent Security Review Criteria.docx](https://microsoft-my.sharepoint.com/:w:/p/msargent/IQAWypNti4z8RJEyw43BfLVkARQlS3qcNXulV7RsME9N28I?isSPOFile=1&xsdata=MDV8MDJ8fGMyYjY2OTY2N2IzOTRhNDQzNWU0MDhkZTIzOTlmMzE1fDcyZjk4OGJmODZmMTQxYWY5MWFiMmQ3Y2QwMTFkYjQ3fDB8MHw2Mzg5ODczNDEyNDg0MTExMDh8VW5rbm93bnxWR1ZoYlhOVFpXTjFjbWwwZVZObGNuWnBZMlY4ZXlKRFFTSTZJbFJsWVcxelgwRlVVRk5sY25acFkyVmZVMUJQVEU5R0lpd2lWaUk2SWpBdU1DNHdNREF3SWl3aVVDSTZJbGRwYmpNeUlpd2lRVTRpT2lKUGRHaGxjaUlzSWxkVUlqb3hNWDA9fDF8TDJOb1lYUnpMekU1T20xbFpYUnBibWRmVFcxT2FrNUVTVE5PUjFGMFdsZEZlRmxUTURCT1ZHczFURlJuTTFsWFJYUk9WR1JxVFZSb2JFMTZSbXhQUjAwelFIUm9jbVZoWkM1Mk1pOXRaWE56WVdkbGN5OHhOell6TVRNM016SXpPREF4fGE0MDg5NjYwYmYyYjQ1MTliYWQ1MDhkZTIzOTlmMzE0fGM5MDBmMTc3MTRjNDRkMDZhYmM2OWJmMmJmMDAzNzJk&sdata=Wmtud3RJTUNxeGlSejNwVkFSc0ZUTk9WcVhYaG9yYkN3RnRCaXQreUFZTT0%3D&ovuser=72f988bf-86f1-41af-91ab-2d7cd011db47%2Cnacarte%40microsoft.com)  
    - MCAPS Sec requirements: [https://eng.ms/docs/microsoft-security/ciso-organization/m365-security-engineering/security-service…](https://eng.ms/docs/microsoft-security/ciso-organization/m365-security-engineering/security-service%E2%80%A6)  
    - Assessment compliance: [Assessments - Compliance](https://o365trustcompliance.visualstudio.com/Trust/_compliance/product/3249e539-d45f-57ef-baa2-d19530d65547/assessments/b96d1b4c-db06-3075-d21c-bf14c2446423) 
    - Privacy engagement: [OneTrIP Platform](https://onetrip.powerappsportals.com/#/edit-engagement/?id=df43c668-41ca-f011-8544-00224806d507)

4.  YAML file reference: [ZebraAI YAML file for DfM - Overview](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/279/ZebraAI-YAML-file-for-DfM) 
    - Video: [Demystifying ZebraAI API and DFM Plugin Integration-20250428_120044-Meeting Recording.mp4](https://microsoft-my.sharepoint.com/personal/micarter_microsoft_com1/_layouts/15/stream.aspx?id=%2Fpersonal%2Fmicarter%5Fmicrosoft%5Fcom1%2FDocuments%2FRecordings%2FDemystifying%20ZebraAI%20API%20and%20DFM%20Plugin%20Integration%2D20250428%5F120044%2DMeeting%20Recording%2Emp4&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2E168e7ef6%2D0edb%2D4a06%2D8580%2D9a248fc377b1&isDarkMode=true&isSPOFile=1&xsdata=MDV8MDJ8fGVmNTQyMmFjZTVjMDQ3NjhhN2Y1MDhkZTFiZmM1ZmFmfDcyZjk4OGJmODZmMTQxYWY5MWFiMmQ3Y2QwMTFkYjQ3fDB8MHw2Mzg5Nzg5Njc4ODQyNDgzMzB8VW5rbm93bnxWR1ZoYlhOVFpXTjFjbWwwZVZObGNuWnBZMlY4ZXlKRFFTSTZJbFJsWVcxelgwRlVVRk5sY25acFkyVmZVMUJQVEU5R0lpd2lWaUk2SWpBdU1DNHdNREF3SWl3aVVDSTZJbGRwYmpNeUlpd2lRVTRpT2lKUGRHaGxjaUlzSWxkVUlqb3hNWDA9fDF8TDNSbFlXMXpMekU1T2pGUWRtd3pZMUpZYlhkWmNrTXdibll4YWtaV04wNWFhalp4VVV4SFltZDJNRVZsUjNabk5uTjNjV014UUhSb2NtVmhaQzUwWVdOMk1pOWphR0Z1Ym1Wc2N5OHhPVG81T1RoaVpqVmtaV0pqTldVMFpqWTFZamRsTTJJeE5UaGtNekkzTkRCaVlrQjBhSEpsWVdRdWRHRmpkakl2YldWemMyRm5aWE12TVRjMk1qSTVPVFV3T1Rjek53PT18OWJhZGVjNTk2YTFlNDI3MTIyOTUwOGRlMWJmYzVmYWZ8NzE5YWI4NzJkNzZhNGQ3YTliN2Y5MmIwYWU4YWJmYmY%3D&sdata=UERrd09HVlgxM2wrNmt0a1luMWJXTy9aRXVmY0FCbnZJRWFmcGZVUWlOVT0%3D&ovuser=72f988bf-86f1-41af-91ab-2d7cd011db47%2Cnacarte%40microsoft.com).
    
5. NA
6. NA
7.  Pilot artifacts: [ZAI DFM agent Copilot plugin early adopters prod testing document.docx](https://microsoft-my.sharepoint.com/:w:/p/nacarte/IQCNle4jzjZxQLMlAelM-LYhAUvifu7qnLwutTJb7azzJzA?e=fAfZij); [ZAI Plugins early access testing instructions.docx](https://microsoftapc.sharepoint.com/:w:/t/ZebraAI-AgentCopilotPlug-inTesting/EQQ9tNSUfcBNgd7apl6Q-wQB0eXsVsfXjinkVSFgcRyr9w?e=sz0xvd); [Pilot Exit Meeting - LT for CaseBuddy.pptx](https://microsoft.sharepoint.com/:p:/t/CSSCopilotDfMDfC-StakeholderSite/IQD_klcPWTN7T7GKvos9hYSgAWGZWl4us133ZYeYlEhwbx0?e=Uu6QjB); [Pilot Exit Meeting - ZAI DfM Agent Copilot Plugins.pptx](https://microsoft.sharepoint.com/:p:/t/CSSCopilotDfMDfC-StakeholderSite/IQDlcul95oqLRZS50QPHNf0aAaTyk_zWUUvraIlHgsEjmqI?e=hsIugl) 
    
8. [Citizen Development ZAI exp One pager](https://microsoftapc.sharepoint.com/:p:/t/ZebraAI/EadowdBf3d5ChgF7zbWZiTAB7oAJR2ZBDYiz422rJeojVA) 
9. Postproduction reporting: examples TBD
10. Release/change management plans: examples TBD
