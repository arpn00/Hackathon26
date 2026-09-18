**_THIS PAGE IS A WORK-IN-PROGRESS AND SUBJECT TO CHANGE_**

---
Tags:
 - cw.author.gaouteiro


# ZebraAI Connector for Power Platform

Configuring user OBO flow with AAD auth in custom connectors allows your connector to access backend APIs on behalf of the user. In other words, the backend API is aware that the ClientID mentioned in connector definition is accessing the data on behalf of the user and it returns the data as if the user himself/herself was making the API call. The federated identity credential (FIC) feature in custom connector allows you to configure user OBO flow without requiring you to generate a client secret for the AAD app used in the connector. This works perfectly when the use case is to call ZebraAI API.

<br>

# Steps to set up and deploy a custom connector for ZebraAI

## 1. Create an application registration

*   Register a single tenant app (you need an azure subscription)

*   Under API permissions, add **Delegated** type permission to whichever API or resource that your connector will be accessing. Below image shows Graph permissions being added to client app since this particular connector will be calling `graph.microsoft.com` for fetching data. You need to pick the backend API (or corresponding app id) which will be queried by your connector.

    ![image.png](/.attachments/image-6a7a3926-b02d-43ef-9cba-44118b8ebd8d.png)

<br>

*   Request Admin consent for these delegated permissions through the [feedback form](https://aka.ms/zebraaifeedback) (**Select "Access or API Issue" from the list**). If you miss this step, the connection creation for your custom connector fail with error "Need admin approval". Note that this requirement is for MSIT tenant (id=72f988bf-86f1-41af-91ab-2d7cd011db47) only. External customers can use process mentioned [here](https://msazure.visualstudio.com/One/_wiki/wikis/PowerAutomate%20EcoSystems%20and%20Experience?wikiVersion=GBmaster&pagePath=/TSGs/Custom%20Connectors/Custom%20connector%20AAD%20User%20OBO%20Auth%20in%20MSIT%20Tenant%20needs%20Admin%20Approval) to check if they too need the admin consent. More information on contacting the Power Platform Connectors Team, including their office hours, is available [here](https://aka.ms/conn/wiki/contact-us).

    ![image.png](/.attachments/image-a08eb21f-cb80-41fc-a23e-79ac1ec9425b.png)

<br>


## 2. Create the custom connector
Create a custom connector from Power Automate maker portal. Leverage the API definition and the documentation to build the connector: [API Docs](https://zebra-ai-api-uat.ait.microsoft.com/api-docs/index.html), [How to create a custom connector from scratch | Microsoft Learn](https://learn.microsoft.com/en-us/connectors/custom-connectors/define-blank)

In Power Automate, go to +New ➡️ Automation ➡️ Custom Connector. 
- Connector Name: [must be less than 30 characters]
### General Information Tab Settings
   - Description: [must be at least 30 characters]
   - Scheme: HTTPS
   - Host: zebra-ai-api-prd.ait.microsoft.com
   - Base URL: TBD
### Security Tab Settings
   - Authentication type: OAuth 2.0
   - Identity Provider: Azure Active Directory
   - Client ID: [application (client) ID of the AAD app registered in Step 1 above] (Note that the Tenant Id needs to be a real Guid. Using common in auth config will not work.)
   - Select:  Use managed identity
   - Authorization URL: https://login.microsoftonline.com
   - Tenant ID: [Directory (tenant) ID from the app registered in Step 1 above]
   - Resource URL: [from your delegated resource set up in Step 1; should start with api://]
   - Enable on behalf of login: true   
   - Scope: [not needed]
   - Redirect URL: [Populates automatically on save; you will need to copy and save this for later]
   - Managed Identity: [Populates automatically on save; you will need to copy and save this for later]

     ![image.png](/.attachments/image-04d48c15-bff2-49e5-a3aa-426429de7faa.png)

## 3. Configure the Redirect URL in the AAD App

- Go to the Authentication section of your app and add the Redirect URL (copied from the Security tab in Step 2 above), then save. 

   ![image.png](/.attachments/image-d8b89e3c-d0d9-43aa-b50b-cb677b227553.png)

## 4. Configure the FIC in the AAD App
- Under Manage, go to "Certificates and secrets"
- In the Federated credentials section, Add credential
     ![image.png](/.attachments/image-7ed85711-d25b-4aef-b466-b7686e40bcc7.png)
<br>   
- Federated credential scenario: Other issuer
   ![image.png](/.attachments/image-62de1c66-4aff-47e8-85fd-fcc3f42cbad9.png)
- Add the Managed Identity information (copied from the Security tab in Step 2 above) to the relevant fields for Issuer, Subject/Value, and Audience. 

   - Type: Explicit subject identifier
   - Name: [your choice]
   - Description: [your choice]
<br>


   ![image.png](/.attachments/image-473b006a-0ad9-4027-8df5-2eb168f38d8d.png)

## 5. Add swagger code
To make it simpler to configure the actions in the connector, you can copy the following swagger code and paste it in your connector. 

- From your connector details in Power Automate, toggle the Swagger editor on and paste in the code below. After pasting the code, you can update the connector, and it will be ready to use!

![image.png](/.attachments/image-c1b33993-898c-4810-bc0b-c5eeaa1aace9.png)

```
swagger: '2.0'
info:
  title: ZebraAI
  description: ''
  version: '1.0'
host: zebra-ai-api-prd.azurewebsites.net
basePath: /
schemes:
  - https
consumes: []
produces: []
paths:
  /Experiment/{ExpID}:
    post:
      responses:
        default:
          description: default
          schema:
            type: object
      summary: Lookup
      description: Lookup
      operationId: Lookup
      parameters:
        - name: ExpID
          in: path
          required: true
          type: string
        - name: body
          in: body
          required: false
          schema:
            type: object
            properties:
              dataSearchOptions:
                type: object
                properties:
                  search:
                    type: string
                    description: search
                description: dataSearchOptions
  /Experiment/v2/{ExpID}:
    post:
      responses:
        default:
          description: default
          schema: {}
      summary: SearchV2
      description: SearchV2
      operationId: SearchV2
      parameters:
        - name: ExpID
          in: path
          required: true
          type: string
        - name: content-type
          in: header
          required: true
          type: string
          default: application/json
        - name: body
          in: body
          required: false
          schema:
            type: string
  /DataKeys/Query:
    post:
      responses:
        default:
          description: default
          schema: {}
      summary: Data Keys
      description: Data Keys
      operationId: Data_Keys
      parameters:
        - name: content-type
          in: header
          required: true
          type: string
          default: application/json
        - name: body
          in: body
          required: false
          schema:
            type: string
  /DataKeys/Indexes:
    get:
      responses:
        default:
          description: default
          schema: {}
      summary: Data Keys Get Indexes
      description: Data Keys Get Indexes
      operationId: Data_Keys_Get_Indexes
      parameters: []
definitions: {}
parameters: {}
responses: {}
securityDefinitions:
  oauth2-auth:
    type: oauth2
    flow: accessCode
    tokenUrl: https://login.windows.net/common/oauth2/authorize
    scopes: {}
    authorizationUrl: https://login.microsoftonline.com/common/oauth2/authorize
security:
  - oauth2-auth: []
tags: []


