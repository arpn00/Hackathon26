# ZebraAI Ambassadors API Team
The ZebraAI API team is a group of Ambassadors who are willing to help manage ZebraAI API + three core ZebraAI members: Mike, Martin, and Travis. 

## Team Remit
- Help manage our growing portfolio of experiments being accessed via the API (>1000 of them​ as of September 2025)
- Handle daily provisioning requests within a 24-hour SLA. These requests are initiated by users via the site, then tracked and managed on the site by the API team
- Help ensure that proper justification and usage acknowledgment accompany requests​
- Help users with the API and the sample client​
- Help users with access and debugging their clients​
- Maintain API docs and samples

## API Overview ​
Quick glance at the ZebraAI system and API service drill down

- Web APP: https://zebra-ai-web-prd.ait.microsoft.com
- Web API: https://zebra-ai-api-prd.ait.microsoft.com
- Swagger: [API Docs](https://zebra-ai-api-uat.ait.microsoft.com/api-docs/index.html)

General Info:​
- Data is ingested from its respective sources a few times a day​
- Ingested data is staged in Az AI Search Indices​
- Experiments (prompts and settings) are stored in an OLTP system DB​
- Both the Web APP and the Web API share the same DB​
- All APP/API usage is recorded in the DB (note: prompts recorded PRE-RAG)​
- For an experiment to be available in the API it must have been provisioned​
- “Provisioned” means a simple DB entry is made using a site Admin feature

![System Topology](/wiki/imgs/system-topology-diagram.jpg)  

## Provisioning Experiments – Handling API Requests​
- Review requests from ZebraAI ➡️Admin➡️Approve APIs, "Pending requests" section at the top​
- Click the shield icon under Review​
- Review, then either approve or reject the request. If rejected, please provide feedback to the user. ​
- Help maintain access control list for an experiment's API​
- What to look for:​ Abuse of the system (user selected "max" settings across the board). Flag and escalate to Martin and/or Thad if >1000 calls per day.

## Security / ACLs / EntraID​
### How to configure security: 
- By default, only experiment owners can call their experiments via the API.​
- Owners and experiment contributors / co-authors can manage their APIs’ ACL​
- ACL is a JSON string array of UPNs or EntraId ClientIds 
- Never use vanity emails – always use alias@microsoft.com
- ClientIds are used for access_as_app scenarios​
- UPNs are used for access_as_user scenarios​
- ClientIds must live in the MS Corp Tenant (MSIT PROD)
- We currently don’t support AD Groups – must be named users

### Users can call their API by using either:​
1. The pre-configured ZebraAI API Test Client which is setup as a public client. ​
     - Supports only access_as_user and users will need to use interactive logins on their dev machines. ​
     - They will not be able to deploy their code as-is.​
    
2.  Their own EntraId App Registration / Client (as either public or confidential client). ​
     - Confidential clients support both access_as_app and access_as_user modalities.​
     - Confidential clients can be deployed​
     - EntraId App Registrations require a Service Tree link… (never use ours!)​
     - EntraId App Registrations must be SFI complaint (i.e. use a secretless setup – see guidance)!​
    

Guidance: [https://eng.ms/docs/products/onecert-certificates-key-vault-and-dsms/key-vault-](https://eng.ms/docs/products/onecert-certificates-key-vault-and-dsms/key-vault-dsms/certandsecretmngmt/tsg/aadappapasswordcert)[dsms/certandsecretmngmt/tsg/aadappapasswordcert](https://eng.ms/docs/products/onecert-certificates-key-vault-and-dsms/key-vault-dsms/certandsecretmngmt/tsg/aadappapasswordcert)​

MSI-FIC: [https://eng.ms/docs/microsoft-security/identity/entra-developer-application-platform/app-vertical/aad-first-party-apps/identity-](https://eng.ms/docs/microsoft-security/identity/entra-developer-application-platform/app-vertical/aad-first-party-apps/identity-platform-and-access-management/microsoft-identity-platform/federated-identity-credentials#first-party-apps)[platform-and-access-management/microsoft-identity-platform/federated-identity-credentials#first-party-apps](https://eng.ms/docs/microsoft-security/identity/entra-developer-application-platform/app-vertical/aad-first-party-apps/identity-platform-and-access-management/microsoft-identity-platform/federated-identity-credentials#first-party-apps)

### Steps to set up an EntraID Client: 
1. Navigate to the Azure portal [https://portal.azure.com](https://portal.azure.com/)​
2. Type entra in the search bar, select Microsoft Entra Id​

![EntraID](/wiki/imgs/EntraID.png)  

3. Navigate to App registrations (left nav)​
4. Select + New registration​

![AppRegistrations](/wiki/imgs/AppRegistrations.png)  

5. Setup as required​
6. Configure Permissions (access as app or user)​

![APIpermissions](/wiki/imgs/APIpermissions.png)  

- If you are helping others, you will need to have either one of the ZebraAI Devs authorize a user’s client on the API. ​
- We receive their ClientID in their access request, and their App Reg permissions must be setup already.

## API Sample Client​
Working with sample code: 
- Access via [site help section​](https://zebra-ai-web-prd.ait.microsoft.com/help)
- Code Samples in ZebraAI API Users Teams channel​
- Only two samples available today (.net console in c# and python)​
- API documentation / swagger uses ReDoc​
- API support more than just Experiments… (Feedback) 

## SOPs / Documentation / Comms / Samples
- Try to check Approve APIs once a day​
- If a requested experiment type is not supported, get the user to [submit a feedback entry](https://aka.ms/zebraaifeedback)​
- Use Teams and the [ZebraAI API Team](https://teams.microsoft.com/l/channel/19%3Axl1BUGI-j7teOpTY_2rYqT-b4KAJK4ji7rNnkSjqHtY1%40thread.tacv2/ZebraAI%20API%20Team?groupId=af998ff3-0fad-4654-b368-5249e20ada9e&ngc=true) channel chat to communicate with others on the team. Good place to ask questions or raise concerns​
- Use the team’s [files section](https://microsoftapc.sharepoint.com/teams/ZebraAI-ZebraAIAPITeam/Shared%20Documents/Forms/AllItems.aspx) to store / get documents (where this doc lives)​
- If you want to share API client samples, upload them as a Zip file in the Team files [Sample Clients](https://microsoftapc.sharepoint.com/:f:/t/ZebraAI-ZebraAIAPITeam/EgaFUePutKNCiD10ZttJtusBZeUvnnki7k2m2xtyAdWLwA?e=ZkidWT) folder. ​
- Avoid binaries - clear out bin/obj folders​
- Make sure to give your samples a good name which includes client language (c#, python, etc.)​
- Sample Clients will be reviewed periodically (by this team) and copied to the broader API Users area