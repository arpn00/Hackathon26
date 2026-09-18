# How to use the ZebraAI Connector in Power Platform or Microsoft Copilot Studio
[[_TOC_]]


## Overview

The ZebraAI connector for Power Automate simplifies the interaction with the ZebraAI API, enabling no code and low code options for ZebraAI users. It abstracts the API complexities, allowing you to start building flows without worrying about setup or authentication.

With this connector, you can quickly integrate ZebraAI capabilities into your automation processes.

## ZebraAI Connector in Power Automate or Copilot Studio Environments

ZebraAI users can use their own environments, or they can request to use ZebraAI's environment for experimentation. 

### Using the ZebraAI Connector in your own environment
Please see instructions at [How to build and deploy ZebraAI Power Apps connector in your own environment](/How-To-Guides/How-to-use-the-ZebraAI-Connector-in-Power-Platform-or-Microsoft-Copilot-Studio/How-to-build-and-deploy-ZebraAI-Power-Apps-connector-in-your-own-environment).

### Using the ZebraAI Connector in the ZebraAI OAP environment
Please request access [here](https://myaccess.microsoft.com/@microsoft.onmicrosoft.com#/access-packages/e24e43f7-b430-4443-8581-eac30108f6ec). You will be following the steps outlined at [How to Onboard an Agent with ZebraAI to OAP - Overview](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/358/How-to-Onboard-an-Agent-with-ZebraAI-to-OAP). 

### How to Access the Connector

<br>

*   **In Power Automate:**  
    Search for **'ZebraAI'** when adding an action.
![image.png](/.attachments/image-27c5fbd1-c7ee-40c1-8d43-08b88966b3e2.png)
    
*   **In Copilot Studio:**  
    Create an agent, then go to **Tools → Add a tool → Search for 'ZebraAI'**:


![image.png](/.attachments/image-6d66ab0d-2ec7-4c48-aba3-2df5d7f5b3ca.png)

## ZebraAI Connector Actions

The ZebraAI connector includes multiple underlying actions that map to the ZebraAI API. These actions support experiment execution, data retrieval, scheduling, and diagnostics.

Most Copilot Studio and Power Automate scenarios rely on a small subset of these actions.

---

  

### Run Experiment

  

Executes a ZebraAI experiment and returns results.

  

**When to use:**

- Generating AI responses

- Running prompt-based scenarios

- Processing grounded data from ZebraAI

  

**Notes:**

- Multiple versions of this action may appear (for example: standard, V2, V3)

- Use the most recent version available (typically **V3**) unless otherwise instructed
<br>
---

### Lookup


The **Search** action retrieves data from ZebraAI based on a single search term.


  

**When to use:**

- Looking up a specific case, incident, or identifier

- Quick validation of a known value



**Parameters:**

| Parameter | Required | Description |
|-----------|----------|-------------|
| ExpID     | Yes      | The experiment ID. |
| search    | Yes      | The search term. Can be a case number or any identifier to retrieve information from the ZebraAI API. |


---

### Advanced Search
Performs more complex searches with filtering and query options.

  

**When to use:**

- Searching across multiple fields

- Filtering results using OData expressions

- Retrieving structured datasets


The **Advanced Search** action allows you to send a more complex search request to the ZebraAI API, including multiple parameters defined in the API reference [API Docs](https://zebra-ai-api-uat.ait.microsoft.com/api-docs/index.html).

**Parameters:**

| Parameter | Required | Description |
|-----------|----------|-------------|
| ExpID     | Yes      | The experiment ID. |
| Body      | Yes      | A JSON object containing search options and additional filters. |

**Example Body:**

```json
{
  "dataSearchOptions": {
    "search": "CASE_NUMBER",
    "filter": "FILTER_CONDITION"
  },
  "maxNumberOfRows": 2
}
```

---
### Data Keys
 

Provides direct access to ZebraAI search indexes.

**When to use:**
*   Querying specific indexes
*   Working with structured datasets
*   Advanced or custom scenarios

**Parameters:**

| Parameter | Required | Description |
|-----------|----------|-------------|
| Body      | Yes      | A JSON object containing search options and additional filters. |

**Body structure:**

```json
{
  "dataSearchKey": "string",
  "dataSearchOptions": {
    "searchMode": "string",
    "search": "string",
    "searchFields": "string",
    "filter": "string",
    "orderBy": "string"
  },
  "indexName": "string",
  "maxNumberOfRows": 0,
  "skipNumberOfRows": 0,
  "useRealData": true
}
```

---


### Data Keys Indexes

Returns available index names for use in Data Keys queries.
Use this action to find valid `indexName` values.

---

 

### Scheduled and Background Runs 

Some actions support running experiments asynchronously.

**When to use:**
*   Long-running scenarios
*   Batch processing
*   Background jobs
These actions allow you to:
*   Schedule runs
*   Check job status
*   Retrieve results


---

 

### Feedback 

Allows submission and retrieval of feedback for experiment results.
**When to use:**
*   Capturing user feedback
*   Supporting evaluation and improvement scenarios

* * *

### Diagnostics and Utility Actions

Additional actions are available for:
*   Connectivity testing
*   Identity validation (WhoAmI)
*   Role and claim inspection
These are primarily used for troubleshooting and configuration.

* * *

## Recommended Usage

For most Copilot Studio scenarios:
1.  Use **Lookup** or **Advanced Search** to retrieve data
2.  Use **Run Experiment** to generate results
3.  (Optional) Use feedback or scheduling features as needed

* * *
## Notes


*   The connector exposes multiple actions based on the ZebraAI API
*   Not all actions are required for typical use cases
*   Authentication is handled automatically through your connection
*   No direct API interaction is required when using the connector
