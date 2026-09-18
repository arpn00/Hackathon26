
# Experiment Types

ZebraAI offers a variety of experiment types and user experiences designed to leverage different data sources and functionality. These experiments enable users to perform complex searches, analyze cases, translate content, and integrate external data into their workflows. Each experiment type is tailored to specific needs, whether it's searching for cases, utilizing functions, or accessing SQL databases.

![UXs](/wiki/imgs/UX-tab.png)  

**⚠️ Important**: The Action field in the database determines which experiment implementation is used. Ensure the Action field matches exactly with the implemented experiment types below.

# Implemented Experiment Types

This section lists the **actually implemented** experiment types as found in the ZebraAI codebase. Each type corresponds to a specific Action value and implementation class.

## Basic User Experience

### 1. Simple User Experience (SimpleExp)
- **Action Field**: `"SimpleExperiment"`
- **Implementation**: `SimpleExp.cs`
- **API Capable**: ✅ Yes
- **Description**: Basic user experience without referencing external data
- **Purpose**: Develop skills in creating, running, and editing ZebraAI experiments
- **Data Fields**: Custom fields with `{{fieldName}}` substitution support

### 2. Translator Experiments (TranslatorExp)
- **Action Field**: `"TranslatorExperiment"`
- **Implementation**: `TranslatorExp.cs`
- **API Capable**: ✅ Yes
- **Description**: Translate input into a target language using prompts for guidance
- **Data Fields**: Content, Language

### 3. Know Me Experiments (KnowMeExp)
- **Action Field**: `"KnowMeExp"`
- **Implementation**: `KnowMeExp.cs`
- **API Capable**: ✅ Yes
- **Description**: Personalized knowledge discovery experiments
- **Data Fields**: User context, search parameters
## Case Data Experiments

### 4. Consumer Case Lookup (ConsumerCaseExp)
- **Action Field**: `"ConsumerCaseExp"`
- **Implementation**: `ConsumerCaseExp.cs`
- **API Capable**: ✅ Yes
- **Description**: Experiment with specific consumer cases identified by CaseNumber
- **Data Fields**: Case details, survey data, user descriptions
- **Uses**: SearchBroker for case data retrieval

### 5. Consumer Case Search (ConsumerSearchCaseExp)
- **Action Field**: `"ConsumerSearchCaseExp"`
- **Implementation**: `ConsumerSearchCaseExp.cs`
- **API Capable**: ✅ Yes
- **Description**: Search for and select multiple consumer cases for evaluation
- **Search Capabilities**: Date limits, case states, survey scores, data availability

### 6. Commercial Case Lookup (CommercialCaseExp)
- **Action Field**: `"CommercialCaseExp"`
- **Implementation**: `CommercialCaseExp.cs`
- **API Capable**: ✅ Yes
- **Description**: Experiment with specific commercial cases identified by CaseNumber
- **Data Fields**: Case details, survey data, user descriptions
- **Uses**: SearchBroker and configuration services

### 7. Commercial Case Search (CommercialSearchCaseExp)
- **Action Field**: `"CommercialSearchCaseExp"`
- **Implementation**: `CommercialSearchCaseExp.cs`
- **API Capable**: ✅ Yes
- **Description**: Search for and select multiple commercial cases for evaluation
- **Search Capabilities**: Date limits, case states, severity, survey ratings

## Case Data Combination Experiments

### 8. Commercial Case and Related ICMs Search (ICMComCaseSearchExp)
- **Action Field**: `"ICMComCaseSearchExp"`
- **Implementation**: `ICMComCaseSearchExp.cs`
- **API Capable**: ✅ Yes
- **Description**: Select both commercial cases and related ICMs for experiments
- **Data Fields**: Case details, related ICMs table

### 9. Commercial Case and Related KM Content Search (KMComCaseSearchExp)
- **Action Field**: `"KMComCaseSearchExp"`
- **Implementation**: `KMComCaseSearchExp.cs`
- **API Capable**: ✅ Yes
- **Description**: Select both commercial cases and related KM articles for experiments
- **Data Fields**: Case results, KM content results

### 10. Consumer Case and Related KM Content Search (KMConCaseSearchExp)
- **Action Field**: `"KMConCaseSearchExp"`
- **Implementation**: `KMConCaseSearchExp.cs`
- **API Capable**: ✅ Yes
- **Description**: Select both consumer cases and related KM articles for experiments
- **Data Fields**: Case results, KM content results

## Incident Case Management (ICM) Data

### 11. ICM Search Experiments (ICMSearchExp)
- **Action Field**: `"ICMSearchExp"`
- **Implementation**: `ICMSearchExp.cs`
- **API Capable**: ✅ Yes
- **Description**: Search for Incident Case Management (ICM) cases
- **Search Capabilities**: Date limits, ICM states, initial severity

## Content and Search Experiments

### 12. Content Search Experiments (ContentSearchExp)
- **Action Field**: `"ContentSearchExp"`
- **Implementation**: `ContentSearchExp.cs`
- **API Capable**: ✅ Yes
- **Description**: General content search across various data sources
- **Data Fields**: Search terms, content types, filters

### 13. CPR Search Experiments (CPRSearchExp)
- **Action Field**: `"CPRSearchExp"`
- **Implementation**: `CPRSearchExp.cs`
- **API Capable**: ✅ Yes
- **Description**: Search for Commercial Presales Retention (CPR) transcripts
- **Search Capabilities**: Date limits, solution area

## Function/Tool Data

### 14. Function/Tool Experiment (FunctionExperiment)
- **Action Field**: `"FunctionExperiment"`
- **Implementation**: `FunctionExperiment.cs`
- **API Capable**: ✅ Yes (V2 endpoint only)
- **Description**: Use functions to call other pieces of code within experiments
- **Special Note**: Must use `/v2/{experimentId}` endpoint
- **Creating Experiments**: Define functions using JSON, specify function calls, provide mock responses

---

## Removed/Not Implemented Experiment Types

The following experiment types were documented but are **NOT implemented** in the current codebase:

- ❌ Commercial Vector Case Review Experiments
- ❌ Commercial Case Embedding Search Experiments  
- ❌ Commercial Case and Related VBD Vector Search Experiments
- ❌ Bring Your Own ADO Data Experiments
- ❌ Bring Your Own ADO Wiki Experiments
- ❌ Bring Your Own Data File Experiments

## Action Field Mapping Reference

When creating experiments in the database, use these exact Action field values:

| Experiment Type | Database Action Field |
|----------------|----------------------|
| Simple User Experience | `"SimpleExperiment"` |
| Translator Experiments | `"TranslatorExperiment"` |
| Know Me Experiments | `"KnowMeExp"` |
| Consumer Case Lookup | `"ConsumerCaseExp"` |
| Consumer Case Search | `"ConsumerSearchCaseExp"` |
| Commercial Case Lookup | `"CommercialCaseExp"` |
| Commercial Case Search | `"CommercialSearchCaseExp"` |
| Commercial + ICM Search | `"ICMComCaseSearchExp"` |
| Commercial + KM Search | `"KMComCaseSearchExp"` |
| Consumer + KM Search | `"KMConCaseSearchExp"` |
| ICM Search | `"ICMSearchExp"` |
| Content Search | `"ContentSearchExp"` |
| CPR Search | `"CPRSearchExp"` |
| Function Experiments | `"FunctionExperiment"` |

## API Endpoint Information

- **Standard Experiments**: Use `POST /Experiment/{experimentId}`
- **Function Experiments**: Use `POST /Experiment/v2/{experimentId}`
- **Authentication**: All endpoints require bearer token authentication
- **Authorization**: Experiments must be properly configured with managed user access

19. **[Bring Your Own SQL Data Experiments:](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/156/BYO-SQL-Data)**
    - Access any SQL-based data source using a connection string.
    - Required Information: SQL Connection String, query.

For more information about creating experiments or the individual controls displayed in the screen shot above see [Create An Experiment](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/258/Create-An-Experiment))  
  
