# Troubleshoot Issues with ZebraAI Contributor-Level Access
## Overview
This wiki documents how to troubleshoot issues if a user has contributor-level access to ZebraAI but still cannot share an experiment or perform other contributor-level actions. Additional information on ZebraAI roles and requesting access can be found at [Get Started with ZebraAI - Overview](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/93/Get-Started-with-ZebraAI). 

##Steps to Troubleshoot Issues with ZebraAI Contributor-Level Access
### 1. Verify the user's access in CoreIdentity
Instructions: [How to Check ZebraAI Access in CoreIdentity](/How-To-Guides/Platform-Basics/How-to-Check-ZebraAI-Access-in-CoreIdentity)
### 2. Ensure at least 24 hours has passed since the contributor-level access was requested or renewed. 
### 3. Log out of, then back into, ZebraAI. 
### 4. Still having issues? 
If all of the steps above have been completed and the user does have a contributor role in CoreIdentity but does not have the ability to share an experiment, you can check their ZebraAI access by doing the following: 

<br> 

## Additional Steps to Troubleshoot Issues with ZebraAI Contributor-Level Access

### 1. Open Edge and start a har trace. 

- In Edge, navigate to https://aka.ms/zebraai. Right click on the page and select "Inspect" from the menu. This will open the Developer Tools. 
- Go to the Network tab and ensure Preserve log is checked.

| ![Developer tools.png](/.attachments/Developer%20tools-d6c439a5-e9df-45a2-8954-439f2dd05695.png) |
|--|
- With the Network tab open, reload the ZebraAI page by pressing Enter in the address bar. This begins capturing the network traffic.
- Look for the first request that includes "signin-oidc" and click it to open the details. 

|![signin oidc.jpg](/.attachments/signin%20oidc-c40c29e8-ccba-4018-9282-9ac8d9df5785.jpg)|
|--|
- Click over to the "Payload" tab

|![payload.png](/.attachments/payload-ffbba707-3d5a-4d70-b938-0dc103bbb5d5.png)|
|--|

- Copy all of the information in the id_token field

|![id token.jpg](/.attachments/id%20token-4275f9ee-e511-4831-8f3a-a0937ce9f504.jpg)|
|--|


### 2. Decode the token by using a website such as [JSON Web Tokens - jwt.io](https://www.jwt.io/). 
- Paste the token info you copied into the decoder. 

| ![decode.jpg](/.attachments/decode-be2b9581-b77d-4834-818f-9cc178b99450.jpg) |
|--|

- On the right-hand side, in the "Decoded Payload" section, you will see "Roles:" followed by the roles this user has. 

|![roles.jpg](/.attachments/roles-d93e9d1f-b4f2-4da4-b22a-f0a0a5105b31.jpg)|
|--|


- If you don't see "Contributor" as a value there, you'll need to request contributor role for ZebraAI through Core Identity. (Steps here: [Get Started with ZebraAI - Overview](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/93/Get-Started-with-ZebraAI)).
