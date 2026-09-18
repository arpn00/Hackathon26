# Commercial Vector Case Review 
**Commercial Vector Case Review** experiments function quite differently from [Commercial Case Lookup](Commercial-Case-Lookup.md) experiments. While Comemrcial Case Vector Review uses a Commercial Case lookup as part of it's function, this action forms the basis of a vector search for comperable cases.  
  
![Vector](/wiki/imgs/Vector-Case-Review.png)  
  
# Using this Experience
To effectively use the **Commercial Vector Case Review** experiment type, you start by completing a case lookup on the commercial case of your choosing, identified by Case Number.  Then choose the number of related cases to be returned by the vector search.  When running your experiment both the initial case and the related cases are available for use in your prompts.

# Available Data Fields (available for the initial Case)
The following Commercial Case data field references are available to be used in your prompts:  

@{CaseAgeDays}, @{CaseNotes}, @{CaseNotesAvailable}, @{CaseNumber}, @{CaseState}, @{CaseStatus}, @{CaseTitle}, @{CauseText}, @{CauseTextAvailable}, @{ClosedDateTime}, @{CloudProductFilter}, @{CreatedDateTime}, @{CurrentQueue}, @{CurrentSeverity}, @{DataSource}, @{EmailTranscripts}, @{EmailTranscriptsAvailable}, @{ICMId}, @{ICMUrl}, @{InitialSeverity}, @{InternalTitle}, @{IsCEnS}, @{IsCubeFlag}, @{IsEUSchrems}, @{IsIRMet}, @{IsS500Program}, @{IsStrategicCohortGroup}, @{IssueDescription}, @{MaxSeverity}, @{OwnershipCount}, @{PlanningCategory}, @{PlanningCategoryBusiness}, @{PlanningCategoryGroup}, @{ResolutionDateTime}, @{ResolutionText}, @{ResolutionTextAvailable}, @{RootCauseFull}, @{RootCauseLevelFive}, @{RootCauseLevelFour}, @{RootCauseLevelOne}, @{RootCauseLevelSix}, @{RootCauseLevelThree}, @{RootCauseLevelTwo}, @{SAPFullPath}, @{SapPath}, @{SAPProductCategory}, @{SAPProductFamily}, @{SAPProductName}, @{SAPProductSubCategory}, @{SAPProductVersion}, @{ServiceName}, @{ServiceOfferingLevelOne}, @{ServiceOfferingLevelThree}, @{ServiceOfferingLevelTwo}, @{SLAEventDateTime}, @{SLAExpirationDateTime}, @{SLAState}, @{SubPlanningCategory}, @{SupportCountry}, @{SupportLanguage}, @{SupportTimeZone}, @{SurveyCESScore}, @{SurveyCSATScore}, @{SurveyDateTime}, @{SurveyFCRScore}, @{SurveyRating}, @{SurveyType}, @{SurveyVerbatim}, @{SurveyVerbatimAvailable}, @{SymptomText}, @{SymptomTextAvailable}, @{TransferCount}  
  
The follow table references can be used for the initial case as well as the related cases, found in the vector search:

@{CaseDataTable}, @{RelatedCasesTable}

# API Availability

This experiment type is **not available** through an API call.  

# More Information

For more information about the data available to your experiments see the [ZebraAI Data Dictionaries](https://microsoftapc.sharepoint.com/teams/ZebraAI/Shared%20Documents/Forms/AllItems.aspx?id=%2Fteams%2FZebraAI%2FShared%20Documents%2FGeneral%2FData&p=true&ga=1)  
  
For more information about creating experiments or the individual controls displayed in the screen shot above see [Create An Experiment](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/258/Create-An-Experiment)  
