# Synthetic Data Creation Process
===============================

 

Overview
--------

Synthetic data is artificially generated data that preserves the **structure, relationships, and behavioral patterns** of real support data while removing all sensitive or identifiable information.
It enables:
*   Safe experimentation (ZebraAI)
*   AI training and prompt validation
*   Reporting and analytics development
*   Scenario simulation across support workflows
Synthetic data is generated using **sampled post-processed data**, ensuring alignment with real-world distributions while maintaining privacy compliance.

* * *

Supported Data Sources
----------------------

This process applies to all ZebraAI support data sources:
*   Commercial (enterprise support cases)
*   Consumer (customer support cases)
*   IcM (incident case management)
*   LivePerson (chat transcripts)
*   VIKI (knowledge and enrichment data)

* * *

End-to-End Pipeline
-------------------

### Pipeline Flow

Source Systems → Ingestion → Filtering & Compliance → Synthetic Transformation → Relationship Mapping → Staging → Serving

* * *

1. Data Ingestion
-----------------

Data is ingested from upstream systems into centralized staging environments.

**Sources include:**
*   Commercial / Consumer case systems
*   IcM (incident management)
*   LivePerson chat transcripts
*   VIKI knowledge sources

**Characteristics:**
*   Batch ingestion (multiple runs per day)
*   Centralized into Fabric / Synapse staging layers [[Service Le...or ZebraAI | ADO Wiki (CNFE)]](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/274)

* * *

2. Filtering & Compliance
-------------------------

Before transformation begins, all ingested data is screened:
*   Restricted or sensitive datasets are excluded
*   Initial PII scrubbing is performed

**Outcome:** Only compliant datasets proceed to synthetic generation [[Service Le...or ZebraAI | ADO Wiki (CNFE)]](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/274)

* * *

3. Synthetic Transformation
---------------------------

Synthetic datasets are generated using **sampled post-processed data** as the baseline. This ensures realistic distributions while maintaining privacy compliance.

### Source Input Strategy

*   Data is sampled from post-processed datasets (not raw ingestion)
*   Sampling preserves realistic distributions across:
    *   Case volumes
    *   Categories
    *   Support scenarios

* * *

### Transformation Rules

| Field Type | Behavior |
| --- | --- |
| Identifiers | Generated using defined synthetic prefixes + randomized suffix logic |
| Metadata | Randomized within predefined constraints to maintain realism |
| Categorical fields | Retained from source data to preserve distribution fidelity |
| Unstructured text | Generated via LLM-based semantic transformation |
| Relationships | Maintained via consistent synthetic ID mapping |

* * *

### Identifier Generation

Synthetic identifiers are generated using deterministic construction logic:
*   Prefix-based system aligned to source (e.g., Commercial uses a “99” prefix)
*   Remaining identifier generated using:
    *   Encoded timestamp based on sample generation time
    *   Randomized suffix component

**Outcome:**
*   Ensures uniqueness
*   Prevents reverse mapping to original identifiers

* * *

### Metadata Generation

Structured metadata fields are **not directly copied**. Instead, they are generated using controlled randomization:
*   Datetime fields:
    *   Generated using randomized offsets that align with realistic case duration
*   Other metadata:
    *   Generated using predefined logic to maintain valid distributions

* * *

### Categorical Data Preservation

Categorical fields are retained directly from sampled data to preserve statistical accuracy.

**Examples include:**
*   SAP
*   Queue
*   Severity
This ensures:
*   Realistic workload distribution
*   Accurate reporting and testing conditions

* * *

### Support Data Generation (LLM Processing)

Unstructured support data (e.g., transcripts, case notes) is generated using a sampling and transformation pipeline:
1.  A random transcript is selected from the sampled dataset
2.  The transcript is processed through an LLM
3.  A new, unique transcript is generated

**Key characteristics:**
*   Preserves intent, structure, and conversation flow
*   Removes all PII and sensitive data
*   Produces non-reversible synthetic content

* * *

### Prompt Safeguards

Additional controls are enforced during LLM generation:
*   PII filtering and suppression
*   Data uniqueness validation (prevent duplicates or near-matches)
*   Prompt-level constraints to enforce compliance
These safeguards ensure outputs meet privacy and Responsible AI requirements.

* * *

4. Relationship Mapping
-----------------------

Relationships between datasets are preserved using consistent synthetic ID mapping.

**Maintained relationships include:**
*   Case ↔ IcM incidents
*   Case ↔ transcripts (LivePerson, email)
*   Case ↔ knowledge/enrichment (VIKI)
This ensures end-to-end workflows remain testable and realistic. [[Service Le...or ZebraAI | ADO Wiki (CNFE)]](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/274)

* * *

5. Staging
----------

Synthetic data is stored in structured formats for downstream use:
*   Lakehouse tables (Fabric / ADLS Gen2)
*   JSON intermediate formats (for transcript pipelines)

**Organization:**
*   By data source
*   By transformation stage
*   Synthetic vs raw datasets
[[Service Le...or ZebraAI | ADO Wiki (CNFE)]](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/274)

* * *

6. Serving / Consumption
------------------------

Synthetic datasets are exposed to downstream platforms:
*   Azure AI Search indexes
*   ZebraAI experimentation environments
*   Reporting and analytics layers

**Primary use cases:**
*   Prompt testing and validation
*   Agent development (Zee / AI workflows)
*   Scenario simulation
[[Service Le...or ZebraAI | ADO Wiki (CNFE)]](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/274)

* * *

Tooling and Architecture
------------------------

### Core Technology Stack

| Layer | Tooling |
| --- | --- |
| Ingestion / Processing | Azure Synapse, Microsoft Fabric |
| Storage | ADLS Gen2 |
| Transformation | Spark notebooks |
| Indexing | Azure AI Search |
| AI Processing | Azure OpenAI |
| Experimentation | ZebraAI platform |

[[Service Le...or ZebraAI | ADO Wiki (CNFE)]](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/274)

* * *

### Architectural Patterns

*   Layered data design (Bronze → Silver → Gold)
*   Parameterized pipeline execution
*   Reusable transformation utilities (JSON / text processing)
*   Multi-source orchestration

* * *

Data Validation Framework
-------------------------

### Fidelity Validation

Ensures structural accuracy:
*   Schema consistency checks
*   Referential integrity validation (e.g., Case ↔ IcM)
*   Data distribution comparisons

* * *

### Utility Validation

Ensures usability for downstream scenarios:
*   AI prompt/output validation
*   Coverage of core support workflows
*   Scenario completeness
[[Service Le...or ZebraAI | ADO Wiki (CNFE)]](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/274)

* * *

### Known Limitations

*   Synthetic data reflects patterns from source snapshots
*   Some IcM fields or relationships may be incomplete
*   Reduced realism in certain edge cases
[[Service Le...or ZebraAI | ADO Wiki (CNFE)]](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/274)

* * *

Security and Privacy Model
--------------------------

### Core Principles

*   No real PII is exposed in synthetic datasets
*   Synthetic data is the default for experimentation
*   Real data access requires approval and compliance validation

* * *

### Controls

*   Non-reversible ID anonymization
*   Semantic anonymization of unstructured text
*   Pre-ingestion filtering for sensitive data
*   Environment isolation (DEV / PPE / PROD separation)
[[Service Le...or ZebraAI | ADO Wiki (CNFE)]](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/274)

* * *



## Challenges and Considerations

While the process of creating synthetic data is relatively straightforward, it becomes complex when integrating with ICM data. Additionally the scope required for synthetic data must include all use cases required for adequate testing of Zebra AI Experiments alling with Zebra AI itself.  The process is currently limited to to use cases that only exist in the sourced (real) data at the time the copy is taken. 