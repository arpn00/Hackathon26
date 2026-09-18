# Commercial Case and Related ICMs Search 
**Commercial Case + IcM** experiments function like [Commercial Case Search](Commercial-Case-Search.md) experiments but allow the user to select both Commercial Cases as well as the ICMs related to those selected cases and use all the selected data in their experiments.  
  
![Comm+ICM](/wiki/imgs/Commercial-ICM.png)  
  
# Using this Experience
To effectively use the **Commercial Case + IcM** experiment type, complete the following:  
- **Step 1: Select Commercial Cases** You must first search and select the cases to be included in your experiment.  This functions exactly as in the [Commercial Case Search](Commercial-Case-Search.md).  Once your cases are selected you can then move to Step 2.
- **Step 2: Select Related ICMs** Search for related ICMs by pressing the **Search** button in box labelled **Step 2 – Search for associated ICMs**.  This will yield a list of ICMs, sorted by search score.  You can then select the ICMs to be included in your experiment and proceed to run your experiment.  
# Available Data Fields
The following Commercial Case data field references are available to be used in your prompts:  

@{CaseAgeDays}, @{CaseNotes}, @{CaseNotesAvailable}, @{CaseNumber}, @{CaseState}, @{CaseStatus}, @{CaseTitle}, @{CauseText}, @{CauseTextAvailable}, @{ClosedDateTime}, @{CloudProductFilter}, @{CreatedDateTime}, @{CurrentQueue}, @{CurrentSeverity}, @{DataSource}, @{EmailTranscripts}, @{EmailTranscriptsAvailable}, @{ICMId}, @{ICMUrl}, @{InitialSeverity}, @{InternalTitle}, @{IsCEnS}, @{IsCubeFlag}, @{IsEUSchrems}, @{IsIRMet}, @{IsS500Program}, @{IsStrategicCohortGroup}, @{IssueDescription}, @{MaxSeverity}, @{OwnershipCount}, @{PlanningCategory}, @{PlanningCategoryBusiness}, @{PlanningCategoryGroup}, @{ResolutionDateTime}, @{ResolutionText}, @{ResolutionTextAvailable}, @{RootCauseFull}, @{RootCauseLevelFive}, @{RootCauseLevelFour}, @{RootCauseLevelOne}, @{RootCauseLevelSix}, @{RootCauseLevelThree}, @{RootCauseLevelTwo}, @{SAPFullPath}, @{SapPath}, @{SAPProductCategory}, @{SAPProductFamily}, @{SAPProductName}, @{SAPProductSubCategory}, @{SAPProductVersion}, @{ServiceName}, @{ServiceOfferingLevelOne}, @{ServiceOfferingLevelThree}, @{ServiceOfferingLevelTwo}, @{SLAEventDateTime}, @{SLAExpirationDateTime}, @{SLAState}, @{SubPlanningCategory}, @{SupportCountry}, @{SupportLanguage}, @{SupportTimeZone}, @{SurveyCESScore}, @{SurveyCSATScore}, @{SurveyDateTime}, @{SurveyFCRScore}, @{SurveyRating}, @{SurveyType}, @{SurveyVerbatim}, @{SurveyVerbatimAvailable}, @{SymptomText}, @{SymptomTextAvailable}, @{TransferCount}  
  
The following ICM data reference can be used in your Prompt:  
  
@{RelatedICMsTable}  
    
# API Availability

This experiment type can be configured for use through an API call.  For more information on requesting API access to your experiments see [Manage MY Experiments](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/165/Manage-MY-Experiment-API). For more information on optimizing your experiments for use through an API, see [Prompt Guidelines for API Use](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/271/Prompt-Guidelines-for-API-Use).

# More Information

For more information about the data available to your experiments see the [ZebraAI Data Dictionaries](https://microsoftapc.sharepoint.com/teams/ZebraAI/Shared%20Documents/Forms/AllItems.aspx?id=%2Fteams%2FZebraAI%2FShared%20Documents%2FGeneral%2FData&p=true&ga=1)  
  
For more information about creating experiments or the individual controls displayed in the screen shot above see [Create An Experiment](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/258/Create-An-Experiment)  
  