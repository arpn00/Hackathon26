# DfM Copilot Integration
### Creating or Maintaining the ZebraAI Plugin YAML file(s) for DfM Copilot

This Wiki is a guide for those responsible for creating, maintaining, or extending the YAML file that enables **ZebraAI experiments** to be invoked from within **Agent (DfM) Copilot**. It explains the YAML structure, DfM limitations, integration mechanics, and deployment process.

***WARNING:*** *The YAML file is very specific with respect to spacing. Great care must be given to the format of the file or it will not function as intended. Examples are included in this wiki for illustrative purposes only. These are not intended to be used as actual functioning code.* 

## YAML File structure

### 1. Initial Wrapper

```yaml
x-generator: NSwag v14.2.0.0 (NJsonSchema v11.1.0.0 (Newtonsoft.Json v13.0.0.0))
openapi: 3.0.0
info:
  title: ZebraAIExpAPI
  description: CoPilot Plugin to run Expermients in ZebraAI
  termsOfService: https://aka.ms/ZebraAI
  contact:
    url: https://aka.ms/zebraAI
  version: 1.2.2.9
```

This section provides human-readable metadata. This section is to be common among all YAML files used to integrate ZebraAI and DfM Copilot. 

**`termsofservice`** and Contact **`URL`** refer to the the path to ZebraAI  
**`Version`** refers to the current production build version of the YAML file  

### 2. Server Configuration

```yaml
servers:
  - url: https://zebra-ai-api-prd.ait.microsoft.com
x-csac-precheck-enabled: true
```

- **`url`**: The path for the production ZebraAI API.  
  
    **NOTE:** Use `UAT` or `PPE` for testing.  Do not use `prd` for testing.  

- **`x-case-precheck-enabled`**: Enforces permission checks. Ensures the user has access to the case before invoking the plugin. Enabling case prechecks is a non-technical requirement for the integration of ZebraAI experiments into DfM Copilot. The SXG team requires that case prechecks be performed.  This must be included in all YAML files.

**'x-case-precheck-enabled`** must be set to **true**.    

### 3. Paths (Experiments)

Each experiment is defined under a unique path. Example:

```yaml
  /Experiment/DfMCopilotPlugIn/{experiment-id}:
    post:
      operationId: ZebraAI_odinsReview
      x-ms-displayName: Run ZebraAI Odins Review Experiment
      summary: Ask to query ZebraAI to perform an Odins Review for the case... 
```
#### Key Fields:
- **`operationId`**: Unique identifier for the experiment. This identifier must be unique for every experiment integrated with DfM Copilot.
- **`x-ms-displayName`**: Display name in UI.
- **`summary`**: Used by DfM Copilot to match user prompts to the plugin. Includes **trigger phrases** and **keywords** (e.g., “ZebraAI PostMortem”). **This is the most critical field** in the path as DfM Copilot uses this field as the guide when determining if it will call the experiment. Below is the complete `summary` for the example experiment above.

```yaml
      summary: Ask to query ZebraAI to perform an Odins Review for the case. The user MUST use one of the following phrases. If these phrases are used EXACTLY or have only a small deviation then this experiment should be ran. The term 'Odins Review' should be recognized. The phrases are 'Use ZebraAI to perform Odins Review', 'Generate Odins Review using ZebraAI', 'Perform Odins Review using ZebraAI', 'ZebraAI Odins Review'.
```

**Tip:** Use long, unique keywords (e.g., “VisualKB”, “PostMortem”) instead of acronyms like “TSG”. This will increase the probability that DfM Copilot with call the experiment.  

### 4. Parameters

```yaml
      parameters:
        - name: CaseId
          in: query
          required: true
          schema:
            type: string
          description: The Case ID for the support case. This must always be a numerical value.
          x-ms-displayName: Case ID
```

- **`in: query`**: Appends `CaseId` to the URL, effectively including it in the call to ZebraAI.  
- **`CaseId`**: Must match DfM context variable to enable automatic case context injection.  

**NOTES:**  
1. If the user is not in a case context, they can still provide a case ID manually, in their request to call the experiment.
2. DfM Copilot does not support nested objects.  **This limits the number of cases that can be included in a call to 1.**  

### 5. Request Body

```yaml
      requestBody:
        description: 'Nothing is required in the request body, present for validation purposes only.'
        content:
          application/json:
            schema:
              type: object
              properties:
                DataSearchKey:
                  type: string
                  description: This does not require any user input. Only use the default value.
                  x-ms-displayName: inquery
                  default: inquery
        required: true
```

- The ZebraAI API requires a non-empty body.
- Use a placeholder like `DataSearchKey: inquery` to satisfy this requirement. 
- The **`requestBody`** included in the YAML file and example above should be the same for all experiments.

### 6. Responses

```yaml
      responses:
        "200":
          description: Successful response
          content:
            application/json:
              schema:
                type: object
                properties:
                  answer:
                    type: string
                    description: The plaintext string describing the results of the ZebraAI Query
        "400":
          description: Bad Request
        "401":
          description: Unauthorized
        "404":
          description: The tenant health could not be found.
        "500":
          description: Server-side error occurred.
```

Defines how Copilot should interpret the response. The `200` response must include an `answer` field. Like the **`requestBody`** this should be the same for all experiments.  

### 7. Security

```yaml
components:
  securitySchemes:
    obo_auth:
      type: oauth2
      flows:
        authorizationCode:
          tokenUrl: https://login.microsoftonline.com/common/oauth2/token
          authorizationUrl: https://login.microsoftonline.com/common/oauth2/authorize
          scopes:
            default: api://{zebraai-appid}/.default
security:
  - obo_auth:
    - api://{zebraai-appid}/.default
```

- Use `.default` scope — This will work should DfM Copilot use access as app or access as a user when calling a ZebraAI Experiment.
- DfM Copilot invokes ZebraAI as an app, but the user must still have access to the **experiment** as defined in ZebraAI and the **case** as specified in DfM Copilot.
- This section should be included **as is** in any YAML files created for the integration of ZebraAI Experiments into DfM Copilot.

## DfM Plugin Limitations

- **No nested objects** in request bodies (e.g., lists of cases).
- Only **flat query parameters** and **simple JSON bodies** are supported.
- DfM Copilot has a 30-second timeout on plugin execution.
- DfM Copilot uses **probabilistic matching** — summaries must be **precise and keyword-rich** in order to be effective.
- a YAML file can have only one audience.  If a set of experiments are to be limited to certain groups, another YAML file must be created for this purpose.  

## Adding New Experiments

To add a new experiment:

1. Duplicate an existing path block.
2. Update:
   - `operationId`
   - `x-ms-displayName`
   - `summary`
   - `experiment_id` in the path
3. Keep the rest of the structure unchanged.

**NOTE:** All identifiers must be unique within the file.

## Deployment Process

1. **Create a branch** in the DfM ADO repository under **/ AnswerAssist / plugin / spec_data / plugin** as shown below.

![DfM ADO](/wiki/imgs/DfM-YAML-Code-Path.png)

2. **Edit YAML** under the branch created above.
  
3. **Submit a pull request** to `develop` with a linked work item.

4. **Coordinate with SXG team** for approval and deployment.

## Testing Tips

- Use the **UAT or PPE environment** with only synthetic case data.
- Confirm Copilot context is active (top of side pane).
- Use developer tools (`Ctrl+Shift+I`) → Network → `stream` to inspect plugin invocation.
- Use **Kusto logs** with `ms-correlation-id` for backend tracing.

## Sanitized Sample File

The following is a sanitized sample which may be used as a guide for coding.  The above examples are included in their proper context and in the correct format. 

**NOTE:** This code is intended only as a guide, and not intended to be employed as code. Please refer to the existing production YAML file for samples of functioning code.

```yaml
x-generator: NSwag v14.2.0.0 (NJsonSchema v11.1.0.0 (Newtonsoft.Json v13.0.0.0))
openapi: 3.0.0
info:
  title: ZebraAIExpAPI
  description: CoPilot Plugin to run Expermients in ZebraAI
  termsOfService: https://aka.ms/ZebraAI
  contact:
    url: https://aka.ms/zebraAI
  version: 1.2.2.9
servers:
  - url: https://zebra-ai-api-prd.ait.microsoft.com
x-csac-precheck-enabled: true
paths:
  #Odins Review :
  /Experiment/DfMCopilotPlugIn/{experiment-id}:
    post:
      operationId: ZebraAI_odinsReview
      x-ms-displayName: Run ZebraAI Odins Review Experiment
      summary: Ask to query ZebraAI to perform an Odins Review for the case. The user MUST use one of the following phrases. If these phrases are used EXACTLY or have only a small deviation then this experiment should be ran. The term 'Odins Review' should be recognized. The phrases are 'Use ZebraAI to perform Odins Review', 'Generate Odins Review using ZebraAI', 'Perform Odins Review using ZebraAI', 'ZebraAI Odins Review'.
      parameters:
        - name: CaseId
          in: query
          required: true
          schema:
            type: string
          description: The Case ID for the support case. This must always be a numerical value.
          x-ms-displayName: Case ID
      tags:
        - Experiment
        - ZebraAI
        - CustomerService
      requestBody:
        description: 'Nothing is required in the request body, present for validation purposes only.'
        content:
          application/json:
            schema:
              type: object
              properties:
                DataSearchKey:
                  type: string
                  description: This does not require any user input. Only use the default value.
                  x-ms-displayName: inquery
                  default: inquery
        required: true
      responses:
        "200":
          description: Successful response
          content:
            application/json:
              schema:
                type: object
                properties:
                  answer:
                    type: string
                    description: The plaintext string describing the results of the ZebraAI Query
        "400":
          description: Bad Request
        "401":
          description: Unauthorized
        "404":
          description: The tenant health could not be found.
        "500":
          description: Server-side error occurred.
  #Lokis Analysis
  /Experiment/DfMCopilotPlugIn/{experiment-id}:
    post:
      operationId: ZebraAI_lokisAnalysis
      x-ms-displayName: Run ZebraAI Lokis Analysis Experiment
      summary: Ask to query ZebraAI to perform a Lokis Analysis. The user MUST use one of the following phrases. If these phrases are used EXACTLY or have only a small deviation then this experiment should be ran. The term 'Lokis Analysis' should be recognized. The phrases are 'Use ZebraAI to perform Lokis Analysis', 'Generate Lokis Analysis using ZebraAI', 'Perform Lokis Analysis using ZebraAI','ZebraAI Lokis','ZebraAI Lokis Analysis'.
      parameters:
        - name: CaseId
          in: query
          required: true
          schema:
            type: string
          description: The Case ID for the support case. This must always be a numerical value.
          x-ms-displayName: Case ID
      tags:
        - Experiment
        - ZebraAI
        - CustomerService
      requestBody:
        description: 'Nothing is required in the request body, present for validation purposes only.'
        content:
          application/json:
            schema:
              type: object
              properties:
                DataSearchKey:
                  type: string
                  description: This does not require any user input. Only use the default value.
                  x-ms-displayName: inquery
                  default: inquery
        required: true
      responses:
        "200":
          description: Successful response
          content:
            application/json:
              schema:
                type: object
                properties:
                  answer:
                    type: string
                    description: The plaintext string describing the results of the ZebraAI Query
        "400":
          description: Bad Request
        "401":
          description: Unauthorized
        "404":
          description: The tenant health could not be found.
        "500":
          description: Server-side error occurred.
components:
  securitySchemes:
    obo_auth:
      type: oauth2
      flows:
        authorizationCode:
          tokenUrl: https://login.microsoftonline.com/common/oauth2/token
          authorizationUrl: https://login.microsoftonline.com/common/oauth2/authorize
          scopes:
            default: api://{zebraai-appid}/.default
security:
  - obo_auth:
    - api://{zebraai-appid}/.default
```