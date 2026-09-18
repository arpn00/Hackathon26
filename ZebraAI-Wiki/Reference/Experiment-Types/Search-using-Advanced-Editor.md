[[_TOC_]]

#Advanced Query Interface
Simple search provides you with an oppurtunity to search "**Case Number**" or "**Case Numbers**" or "**Key Words**".
But there is a need for you to research using Advanced searches.  Advanced search can be used for "**Pattern analysis**, **Narrow down searches** and also save time for your analysis.

**Some of the examples of Advanced Searches:**
- Search cases for a specific Product type or Name like search for cases with Product Windows Server 2022 or Entra ID 
- Search cases between a certain date range 
- Search cases closed between a case range like Day7 to Day14
- Search cases for a specific Support Area Path (SAP)

There are many filters you can use and also use expressions like AND, NOT etc.  Below is just a list of examples using the Advanced search capabilities to search for cases.  

**What Advanced Searches cannot be used:** <br>
ZebraAI does not store any **PII information** hence you would not be able to search with:
- Engineer, Manager alias
- Team name
- Queue name
- Customer name 
- Minutes per incidence (MPI)


![image.png](/.attachments/image-6cef6dd2-19b6-4132-a72a-e34b8ad44380.png)

![image.png](/.attachments/image-9bc341f4-951d-424f-8dce-0c5573576d96.png)

ZebraAI leverages Azure Cognitive Search which allows for a rich OData driven query experience 

**Note: When selecting "all" for a field: Utilizing: "*" or leaving the field blank will return all values.**

**Search:** The text to search for. All searchable fields are searched by default unless searchFields is specified.  

**Search Fields:** The list of comma-separated field names to search for the specified text.  

**Available fields (Commercial Cases):**
CaseEvents, CaseNotes, CaseTitle, CauseText, EmailTranscripts, EmailTranscriptsAvailable, InternalTitle, IssueDescription, ResolutionText, SurveyVerbatim, SymptomText

**Search Mode:** Specifies whether any or all of the search terms must be matched in order to count the document as a match.  
Available fields: "any" or "all" Defaults to "any".  

**Filter:** A structured search expression in standard OData syntax.  
Available fields (Commercial Cases):
CaseAgeDays, CaseNotesAvailable, CaseNumber, CaseState, CaseStatus, CauseTextAvailable, ClosedDateTime, CloudProductFilter, CreatedDateTime, CurrentQueue, CurrentSeverity, DataSource, EmailTranscriptsAvailable, ICMId, ICMUrl, InitialSeverity, IsCEnS, IsCubeFlag, IsEUSchrems, IsIRMet, IsS500Program, IsStrategicCohortGroup, MaxSeverity, OwnershipCount, PlanningCategory, PlanningCategoryBusiness, PlanningCategoryGroup, ResolutionDateTime, ResolutionTextAvailable, RootCauseFull, RootCauseLevelFive, RootCauseLevelFour, RootCauseLevelOne, RootCauseLevelSix, RootCauseLevelThree, RootCauseLevelTwo, SAPFullPath, SAPProductCategory, SAPProductFamily, SAPProductName, SAPProductSubCategory, SAPProductVersion, ServiceName, ServiceOfferingLevelOne, ServiceOfferingLevelThree, ServiceOfferingLevelTwo, SLAEventDateTime, SLAExpirationDateTime, SLAState, SubPlanningCategory, SupportCountry, SupportLanguage, SupportTimeZone, SurveyCESScore, SurveyCSATScore, SurveyDateTime, SurveyFCRScore, SurveyRating, SurveyType, SurveyVerbatimAvailable, SymptomTextAvailable, TransferCount, ZebraAIUpdatedDateTime

**Orderby:** A list of comma-separated expressions to sort the results by.  
Available fields (Commercial Cases):
CaseAgeDays, CaseNumber, CaseState, CaseStatus, ClosedDateTime, CreatedDateTime, CurrentQueue, CurrentSeverity, ICMId, InitialSeverity, MaxSeverity, OwnershipCount, ResolutionDateTime, SLAEventDateTime, SLAExpirationDateTime, SLAState, SupportCountry, SupportLanguage, SupportTimeZone, SurveyCESScore, SurveyCSATScore, SurveyDateTime, SurveyFCRScore, SurveyRating, TransferCount, ZebraAIUpdatedDateTime

**Top:** The number of search results to retrieve. This defaults to a 100. Max is 500.  

**Tip:** You can copy and save the JSON object from the editor and save it for later.


## <span style="color:CornflowerBlue">Query1: Search cases between a case range
**Scenario:** You have a need to search cases between a certain date range. <br>
In the below example we are using the CreatedDateTime filter and the ClosedDateTime filter to search between a date range **1st Dec 2024 to 25th Jan 2025**.  This would list cases that was created and closed between the time range.

**Optional**: You can also just use the CreatedDateTime filter independently to retrieve cases beyond certain date or also use the ClosedDateTime to filter only closed case by a certain date.  

```
{ "Search": "*", 
"SearchFields": "", 
"SearchMode": "any", 
"Filter": "(CreatedDateTime ge 2024-12-01T00:00:00Z and ClosedDateTime le 2025-01-25T00:00:00Z)", 
"Orderby": "", 
"QueryType": "simple", 
"Top": 100}
```

___

## <span style="color:CornflowerBlue">Query2: Search cases between a case range with for a Support topic. 
**Scenario:** You have a need to search cases between a time range and also for a specific support topic and you can keep expanding this search. <br>
In the below example we are using the CreatedDateTime, ClosedDateTime alongside using the AND operator with the SAP which is represented as SAPProductSubCategory and in this example it is Kerberos authentication.  

```
{ "Search": "*", 
"SearchFields": "", 
"SearchMode": "any", 
"Filter": "(CreatedDateTime ge 2024-12-01T00:00:00Z and ClosedDateTime le 2025-01-25T00:00:00Z) and (SAPProductSubCategory eq 'Kerberos authentication')", 
"Orderby": "", 
"QueryType": "simple", 
"Top": 100}
```

**Expanding the above search you can now filter for the below reasons: <br>**

**Closed Cases:** You want to only review closed cases add the CaseState filed as Closed

```
{ "Search": "*", 
"SearchFields": "", 
"SearchMode": "any", 
"Filter": "(CreatedDateTime ge 2024-12-01T00:00:00Z and ClosedDateTime le 2025-01-25T00:00:00Z) and (SAPProductSubCategory eq 'Kerberos authentication') and (CaseState eq 'Closed')", 
"Orderby": "", 
"QueryType": "simple", 
"Top": 100}
```

**Severity:** Add a serverity filter to the below query using the InitialSeverity filter. 
In the below filter we are adding an Initial filter to review cases only which are SevA

```
{ "Search": "*", 
"SearchFields": "", 
"SearchMode": "any", 
"Filter": "(CreatedDateTime ge 2024-12-01T00:00:00Z and ClosedDateTime le 2025-01-25T00:00:00Z) and (SAPProductSubCategory eq 'Kerberos authentication') and (CaseState eq 'Closed') and (InitialSeverity eq 'A')", 
"Orderby": "", 
"QueryType": "simple", 
"Top": 100}
```

**Survey:** Using the Survey Rating field you can now search for cases where you can use the Survey Rating lesser than 5 as an example to search for cases.  

```
{ "Search": "*", 
"SearchFields": "", 
"SearchMode": "any", 
"Filter": "(CreatedDateTime ge 2024-12-01T00:00:00Z and ClosedDateTime le 2025-01-25T00:00:00Z) and (SAPProductSubCategory eq 'Kerberos authentication') and (CaseState eq 'Closed') and (InitialSeverity eq 'A') and (SurveyRating le 5)", 
"Orderby": "", 
"QueryType": "simple", 
"Top": 100}
```

___

## <span style="color:CornflowerBlue">Query3: Search cases for a Product. 
**Scenario:** In the below example we are using a case state which is either completed or closed with SAP which is failure to install Windows update and the Product version is Windows Server 2022.

```
    { 
    "Search": "*", 
    "SearchFields": "", 
    "SearchMode": "any", 
    "Filter": "(CaseState eq 'Completed' or CaseState eq 'Closed' ) and (SAPProductSubCategory eq 'Failure to install Windows Updates') and (SAPProductVersion eq 'Windows Server 2022')", "Orderby": "", 
    "QueryType": "simple", 
    "Top": 100
     }
```



## <span style="color:CornflowerBlue">Query4: Search cases with Key Words with other complex query 
**Scenario:** You might have a need to build some advanced queries where you want to search for some key words only on specific cases.  In this below example we have searched for a Key word "Start -Scenario ADS_Auth" on cases which was created between a specific date range where the case is either completed or closed with a SAP Product family of Windows Servers for only Enterprise Support.  


```
{ 
"Search": "Start -Scenario ADS_Auth", 
"SearchFields": "CaseNotes", 
"SearchMode": "any", 
"Filter": "(CreatedDateTime ge 2024-12-01T00:00:00Z and ClosedDateTime le 2025-01-25T00:00:00Z) and (CaseState eq 'Completed' or CaseState eq 'Closed') and (SAPProductFamily eq 'Windows Servers' or SAPProductFamily eq 'Windows') and (ServiceOfferingLevelOne eq 'Enterprise Support')", 
"Orderby": "", 
"QueryType": "simple", 
"Top": 100
 }
```

**Scenario:** You might have cases where you want to search cases with a specific key word but also want to filter where there is another key word you dont need.  

In this example we are searching cases with "**Time Jump**" but should not include the key word "**UtilizeSSLTimeData**"
```
{
  "Search": "'Time Jump'  -'UtilizeSSLTimeData'",
  "SearchFields": "",
  "SearchMode": "all",
  "Filter": "(SAPProductSubCategory eq 'Windows Time Service configuration, accuracy, and synchronization')",
  "Orderby": "",
  "QueryType": "simple",
  "Top": 400
}
```

## <span style="color:CornflowerBlue">Query5: Search cases with Case age
**Scenario:** Search cases using Case Age filter CaseAgeDays filter.  You can combine this with other filters like SAP or Product to create complex filter. 

```
{ 
"Search": "*", 
"SearchFields": "", 
"SearchMode": "any", 
"Filter": "(CaseState eq 'Completed' or CaseState eq 'Closed') and (ServiceOfferingLevelOne eq 'Enterprise Support') and (CaseAgeDays ge 30)", 
"Orderby": "", 
"QueryType": "simple", 
"Top": 100
 }
```

**Scenario**: Below is another scenario of using the Case age where you want to review cases between a certain case age range.  In the below query you can review cases between case range of 7-14 days. 
```
 { 
    "Search": "*", 
    "SearchFields": "", 
    "SearchMode": "any", 
    "Filter": "(CreatedDateTime ge 2024-09-21T00:00:00Z and ClosedDateTime le 2024-10-15T00:00:00Z) and (CaseState eq 'Completed' or CaseState eq 'Closed') and (SAPProductFamily eq 'Windows Servers' or SAPProductFamily eq 'Windows') and
    (ServiceOfferingLevelOne eq 'Enterprise Support') and (CaseAgeDays ge 7) and (CaseAgeDays le 14)", 
    "Orderby": "CaseAgeDays", 
    "QueryType": "simple", 
    "Top": 100
     }
```

## <span style="color:CornflowerBlue">Query6: Search cases handled by Delivery Partner teams or Strategic Cohert
**Scenario:**  You want to review cases which are handled by Delivery parnters.  

```
 { 
    "Search": "*", 
    "SearchFields": "", 
    "SearchMode": "any", 
    "Filter": "(ServiceOfferingLevelOne eq 'Enterprise Support') and (IsStrategicCohortGroup ne true)", 
    "Orderby": "CaseAgeDays", 
    "QueryType": "simple", 
    "Top": 100
     }
```

**Scenario:** You want to retrieve cases for only Strategic Customers (S500) or Strategic Cohert

```
 { 
    "Search": "*", 
    "SearchFields": "", 
    "SearchMode": "any", 
    "Filter": "(ServiceOfferingLevelOne eq 'Enterprise Support') and (IsStrategicCohortGroup eq true)", 
    "Orderby": "CaseAgeDays", 
    "QueryType": "simple", 
    "Top": 100
     }
```

## <span style="color:CornflowerBlue">Query7: Search using TPI ID
**Scenario:** You might have scenarios where you might want to query all cases of a customer or another scenario where customer has multiple contracts and you want to search for a specific contract type.  There is a Unique TPID against every contract and you can search cases for a specific contract type or TPID.

```
 { 
    "Search": "*", 
    "SearchFields": "", 
    "SearchMode": "any", 
    "Filter": "(TPID eq '3648203')", 
    "Orderby": "CaseAgeDays", 
    "QueryType": "simple", 
    "Top": 100
     }
```

## <span style="color:CornflowerBlue">Query8: Search Multiple cases
**Scenario:** You have a bunch of cases like 200 or 300 cases and you wish to review all these specific cases.

```
{ 
"Search": "*", 
"SearchFields": "", 
"SearchMode": "any", 
"Filter": "(CaseNumber eq '2403210030001031') or (CaseNumber eq '2401050050001340') or (CaseNumber eq '2401040050002387') or (CaseNumber eq '2401030040013000') or (CaseNumber eq '2401130050000170') or (CaseNumber eq '2401230040000598') or (CaseNumber eq '2401180030004150') or (CaseNumber eq '2402190050005426') or (CaseNumber eq '2402120030004239') or (CaseNumber eq '2401310030002856')",
"Orderby": "", 
"QueryType": "simple", 
"Top": 100
}
```

