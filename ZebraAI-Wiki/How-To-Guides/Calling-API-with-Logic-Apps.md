#Integrating Zebra AI with Logic Apps

##Prerequisites

Before integrating Zebra AI with Logic App, ensure that the following prerequisites are met:

###1. Logic Apps Environment Setup:

- Ensure that you have an active Azure subscription with sufficient credits or a valid payment method to deploy and manage resources.

###2. Zebra AI API Access:

- Verify that your Zebra AI experiment is correctly configured and that your account has the necessary permissions to call the API.

![Config Exp](/wiki/imgs/Logic-App-My-Exp.png)

##Integration Steps

###1. Create Logic Apps

Navigate to Logic Apps in Azure with the right subscription.

Select "Add".

Choose “Multi-tenant” while creating the Logic App.

![Config Exp](/wiki/imgs/Logic-App-1.png)

Complete the creation wizard.

###2. Edit the Logic App

Edit the created Logic App.

Add the action "Invoke an HTTP request" using the "HTTP with Microsoft Entra ID (preauthorized)" connector.

Configure the connection with the following settings:

Base Resource URL: https://zebra-ai-api-prd.ait.microsoft.com

Microsoft Entra ID Resource URI: api://9021b3a5-1f0d-4fb7-ad3f-d6989f0432d8


![Config Exp](/wiki/imgs/Logic-App-2.png)


Configure the request parameters based on the [API Docs](https://zebra-ai-api-uat.ait.microsoft.com/api-docs/index.html).

Upon successful configuration, the logic app will be able to interact with your Zebra AI experiment seamlessly.


![Config Exp](/wiki/imgs/Logic-App-3.png)

For more information contact **Kevin Yan, Yang Xu,** or **Pin Lv**.