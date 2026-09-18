#ZebraAI API Documentation

##API Resources
- API Reference: [API Docs](https://zebra-ai-api-uat.ait.microsoft.com/api-docs/index.html).
- API Sample .net Client: [Link to sample](https://microsoftapc.sharepoint.com/:u:/t/ZebraAI/EVQRMB0AN5pPlZstLnqiJCkBsn0kckR4AcZ8CBgqYyPOpQ?e=7Xyapq).
- API Sample python script: [Link to sample](https://microsoftapc.sharepoint.com/:u:/t/ZebraAI/EaT7trzg1xBLjP_cGOgWh58BGZNDi6egfPoo4Yd36skuFQ?e=h866j5).

##Getting Started
1. **Open one of the sample projects** in your IDE
- [API Sample .net Client](https://microsoftapc.sharepoint.com/:u:/t/ZebraAI/EVQRMB0AN5pPlZstLnqiJCkBsn0kckR4AcZ8CBgqYyPOpQ?e=7Xyapq).
- [API Sample python script](https://microsoftapc.sharepoint.com/:u:/t/ZebraAI/EaT7trzg1xBLjP_cGOgWh58BGZNDi6egfPoo4Yd36skuFQ?e=h866j5).
2. In the sample code, **paste your ZebraAI experiment ID** where indicated. 
3. **Set up authentication as needed.** Users can call their API with a pre-configured test client (recommended for initial set up and testing) or their own EntraId app registration (required for deployment). 
    - The pre-configured ZebraAI API Test Client, which is set up as a public client. ​
       - Supports only access_as_user, and users will need to use interactive logins on their dev machines. ​
        - This will run locally, but users will not be able to deploy their code as-is.​
    - Their own EntraId App Registration / Client (as either public or confidential client). ​
        - Confidential clients support both access_as_app and access_as_user modalities.​
        - EntraId App Registrations must be SFI complaint​.
    - _Additional information below under [Security/EntraID](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/207/API-Documentation?_a=edit&anchor=security/entraid)_
4. **Execute the sample code.** It will: 
    - Prompt you to log in interactively.
    - Obtain a bearer token.
    - Make a POST request to the API.
    - Print results to the console.
5. **Review results.** The console will display search criteria, experiment results, and chat history. Results include a message array showing the conversation (user questions, system responses, assistant answers).

##Deploying Your API
Once you are satisfied with your test results, you are ready to request API access through the ZebraAI platform. For detailed how-to instructions, see [Add Experiment API](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/164/Add-Experiment-API). 

## ZebraAI in Logic Apps
It is possible to establish a connection to ZebraAI in Logic Apps by using the **'Http with Entra ID (Preauthorized)'** connector. For more details, see [How to connect to ZebraAI through Logic Apps](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/178/How-to-connect-to-ZebraAI-through-Logic-Apps). 

## ZebraAI and REST API
Capability is available; how-to guidance coming soon. 

##Security/EntraID
- By default, only experiment owners can call their experiments via the API.
- Owners and experiment contributors / co-authors can manage their APIs’ ACL​
    - ACL is a JSON string array of UPNs or EntraId ClientIds
- Never use vanity emails – always use [alias@microsoft.com](mailto:alias@microsoft.com)
- ClientIds are used for access_as_app scenarios​
- UPNs are used for access_as_user scenarios​
- ClientIds must live in the MS Corp Tenant (MSIT PROD)
- We currently don’t support AD Groups – must be named users


