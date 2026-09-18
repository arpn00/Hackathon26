---
Tags:
 - cw.author.gaouteiro
---

[**Tags**](/Tags):  [author.gaouteiro](/Tags/author.gaouteiro)   


## Overview

In order to establish a connection to ZebraAI in Logic Apps, it is possible to use the **'Http with Entra ID (Preauthorized)'** connector. This guide will walk you through the necessary steps and parameters.

## Steps to Configure the Connection

### Required Parameters

To create the connection to **ZebraAI**, you will need the following details:

- **Base Resource URL**: `https://zebra-ai-api-prd.ait.microsoft.com` (NOTE IMAGE BELOW HAS OLD URL)
- **Microsoft Entra ID Resource URI (Application ID URI)**: `api://9021b3a5-1f0d-4fb7-ad3f-d6989f0432d8`


![image.png](/.attachments/image-8575f580-91fb-4bef-8d7b-6789c97465f2.png)

<br>


These parameters are required when setting up the Http connection in Logic Apps.

### Setting Up the 'Http with Entra ID (Preauthorized)' Connector

1. Open **Logic Apps** on your Azure Subscription and navigate to the logic app where you want to integrate ZebraAI.
2. Add a new step, then search for and select **'Http with Entra ID (Preauthorized)'**.
3. Enter the **Base Resource URL** and **Microsoft Entra ID Resource URI** provided above. (NOTE: Use new URL - IMAGE BELOW HAS OLD ONE)
4. Test the connection to verify everything is set up correctly.


<br>

![image.png](/.attachments/image-d7f44c27-7f16-4215-81e4-65f0d2a20fb8.png)
