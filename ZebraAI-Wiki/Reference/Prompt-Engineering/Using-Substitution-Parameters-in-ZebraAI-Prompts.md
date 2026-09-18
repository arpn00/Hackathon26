# Using Substitution Parameters to Access Support Data in ZebraAI
ZebraAI uses substitution parameters to pull support case data into experiments. For each substitution parameter used, the relevant information is dropped into the experiment in place of the substitution parameter. 

This means that a prompt written like this:
``` text
Using {{CaseAgeDays}}, {{CaseStatus}}, and {{CurrentSeverity}}, evaluate {[CaseNumber}}.
```
would actually resolve like this: 
``` text
Using 47.954, pending customer response, and B, evaluate 9901082107540766.
```

Here are some guidelines to make ZebraAI prompts more effective both in terms of token usage and accurate results. 
 
## How to efficiently use substitution parameters in ZebraAI prompts

### Rule \#1: Resolve placeholders once, at the top
Create a `Resolved_Data` block at the beginning of the prompt that contains each placeholder you’ll need **exactly once**.
``` text
Resolved_Data:

- CaseNumber: {{CaseNumber}}
- CaseNotes: {{CaseNotes}}
- SAPPATH: {{InitialSAPFullPath}}
- EmailTranscripts: {{EmailTranscripts}}
```
Add a hard instruction right after it:

``` text
Instruction:

Use the values in Resolved_Data as the source of truth.

Do not request or re-fetch placeholders again in the prompt.

Refer to them by their labels (CaseNumber, CaseNotes, etc.).
```

### Rule \#2: Use aliases consistently (avoid reusing the placeholder token)

#### Don’t do this

``` text
Draft an email about {{CaseNumber}} and then summarize {{CaseNotes}} and add relevant themes from {{CaseNotes}} and add the {{CaseNumber}} to a table..... .
```

#### Do this
  
``` text

Resolved_Data:

- CaseNumber: {{CaseNumber}}
- CaseNotes: {{CaseNotes}}

Task:

1) Draft an email about CaseNumber.
2) Summarize CaseNotes in one line.
``` 

### Rule \#3: Only resolve what you actually use

If a prompt only needs `CaseNumber` and `CaseNotes`, don’t pull ALL the fields “just in case.” More resolved fields = more tokens and cognitive noise.

#### Don’t do this

``` text
Resolved_Data:
{{CaseAgeDays}}, {{CaseEvents}}, {{CaseNotes}}, {{CaseNotesAvailable}}, {{CaseNumber}}, {{CaseState}}, {{CaseStatus}}, {{CaseTitle}}, {{CauseText}}, {{CauseTextAvailable}}, {{ClosedDateTime}}, {{CloudProductFilter}}, {{CollaborationCount}}, {{CreatedDateTime}}, {{CurrentQueue}}, {{CurrentSeverity}}, {{DataSource}}, {{EmailTranscripts}}, {{EmailTranscriptsAvailable}}, {{HasCollaborationTasks}}, {{ICMId}}, {{ICMUrl}}, {{InitialQueue}}, {{InitialSAPFullPath}}, {{InitialSAPProductCategory}}, {{InitialSAPProductFamily}}, {{InitialSAPProductName}}, {{InitialSAPProductSubCategory}}, {{InitialSAPProductVersion}}, {{InitialSeverity}}, {{InternalTitle}}, {{IsCEnS}}, {{IsEUSchrems}}, {{IsIRMet}}, {{IsS500Program}}, {{IsStrategicCohortGroup}}, {{IssueDescription}}, {{LastModifiedDateTime}}, {{MaxSeverity}}, {{OwnershipCount}}, {{PlanningCategory}}, {{PlanningCategoryBusiness}}, {{PlanningCategoryGroup}}, {{ResolutionDateTime}}, {{ResolutionText}}, {{ResolutionTextAvailable}}, {{RootCauseFull}}, {{RootCauseLevelFive}}, {{RootCauseLevelFour}}, {{RootCauseLevelOne}}, {{RootCauseLevelSeven}}, {{RootCauseLevelSix}}, {{RootCauseLevelThree}}, {{RootCauseLevelTwo}}, {{SAPFullPath}}, {{SAPProductCategory}}, {{SAPProductFamily}}, {{SAPProductName}}, {{SAPProductSubCategory}}, {{SAPProductVersion}}, {{ServiceName}}, {{ServiceOfferingLevelOne}}, {{ServiceOfferingLevelThree}}, {{ServiceOfferingLevelTwo}}, {{SLAEventDateTime}}, {{SLAExpirationDateTime}}, {{SLAState}}, {{SubPlanningCategory}}, {{SupportCountry}}, {{SupportLanguage}}, {{SupportTimeZone}}, {{SurveyCESScore}}, {{SurveyCSATScore}}, {{SurveyDateTime}}, {{SurveyFCRScore}}, {{SurveyRating}}, {{SurveyType}}, {{SurveyVerbatim}}, {{SurveyVerbatimAvailable}}, {{SymptomText}}, {{SymptomTextAvailable}}, {{TransferCount}}, {{ZebraAIUpdatedDateTime}}
```

#### Do this  

``` text
Resolved_Data:

- CaseNumber: {{CaseNumber}}
- CaseNotes: {{CaseNotes}}
```

  

### Rule \#4: Treat Resolved_Data as immutable
 
Add a line that prevents accidental mutation/hallucination.

``` text
Do not rewrite or “correct” Resolved_Data. Use it as-is.
If a value is missing or blank, explicitly say “missing” and proceed.
```

### Rule \#5: Prefer structured blocks over prose

Structured blocks reduce model confusion and make it easier to validate.
 
#### Best
 
``` text
Resolved_Data:

- CaseNumber: {{CaseNumber}}
- InitialSeverity: {{InitialSeverity}}
- CaseNotes: {{CaseNotes}}
```

#### Less good
 

``` text
The case number is {{CaseNumber}} and the Initial Severity is {{InitialSeverity}} and the Case Notes are {{CaseNotes}}

```

### Rule \#6: If you need derived values, derive once
  

If you need things like a “short case label” or “customer-safe title,” do the derivation **after resolving**, and compute each derived value once.


``` text
Resolved_Data:
- EmailTranscripts: {{EmailTranscripts}}
- CaseNotes: {{CaseNotes}}

Derived:
- CaseInfo: "[EmailTranscripts] + [CaseNotes]"
- Case Themes: Create a short list of Themes from CaseNotes
```

Recommended instruction:
 
```text
Compute each Derived value once, then reuse it.
```


Make sure that you:

  

1. Identify placeholders

2. Fetch each field once

3. Inject a resolved block at the top

4. Replace placeholders in the user prompt with alias references (optional)

  
#### Example transformation
 
Input prompt:

Instead of doing this: 

``` text
Do X with {{CaseNumber}} and Y with {{CaseNumber}}.
```

Do this: 
  
Detected placeholders:

``` text
{CaseNumber}
```
 
Prompt sent to the model:
 
``` text
Resolved_Data:

- CaseNumber: {{CaseNumber}}

User_Prompt:

Do X with CaseNumber and Y with CaseNumber.
```

Result: only one backend lookup, regardless of how many times the user typed the placeholder.
 

## Quick checklist for prompt authors

* [ ] Do I have a `Resolved_Data` block at the top?
* [ ] Did I include each placeholder only once?
* [ ] Am I referencing labels instead of repeating `{{...}}`?
* [ ] Did I only resolve fields I actually use?
* [ ] Did I tell the model not to re-fetch placeholders?
  

```