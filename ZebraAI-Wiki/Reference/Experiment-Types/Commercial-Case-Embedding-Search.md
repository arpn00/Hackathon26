# Commercial Case Embedding Search 
**Commercial Case Embedding Search** experiments function quite differently from [Commercial Case Search](Commercial-Case-Search.md) experiments. While Comemrcial Case Embedding Search uses Commercial Case data, This Experiment Type is based upon a vector search rather than a query-based search.  
  
![Embedding](/wiki/imgs/Embedding.png)  
  
# Using this Experience
To effectively use the **Commercial Case Embedding Search** experiment type, you must provide search terms that **ZebraAI** will use to build a list of relevant cases based on a vector search using the data field **IssueDescription**.  Then, select the number of cases you wish **ZebraAI** to include in your experiment. When running your experiment **ZebraAI** will find the most relevent cases based upon your search terms, limited by the the number of cases you choose, and run your experiment on those cases.

# Available Data Fields
The following Commercial Case data field references are available to be used in your prompts:  

@{CaseAgeDays}, @{CaseNotes}, @{CaseNotesAvailable}, @{CaseNumber}, @{CaseState}, @{CaseStatus}, @{CaseTitle}, @{CauseText}, @{CauseTextAvailable}, @{ClosedDateTime}, @{CloudProductFilter}, @{CreatedDateTime}, @{CurrentQueue}, @{CurrentSeverity}, @{DataSource}, @{EmailTranscripts}, @{EmailTranscriptsAvailable}, @{ICMId}, @{ICMUrl}, @{InitialSeverity}, @{InternalTitle}, @{IsCEnS}, @{IsCubeFlag}, @{IsEUSchrems}, @{IsIRMet}, @{IsS500Program}, @{IsStrategicCohortGroup}, @{IssueDescription}, @{MaxSeverity}, @{OwnershipCount}, @{PlanningCategory}, @{PlanningCategoryBusiness}, @{PlanningCategoryGroup}, @{ResolutionDateTime}, @{ResolutionText}, @{ResolutionTextAvailable}, @{RootCauseFull}, @{RootCauseLevelFive}, @{RootCauseLevelFour}, @{RootCauseLevelOne}, @{RootCauseLevelSix}, @{RootCauseLevelThree}, @{RootCauseLevelTwo}, @{SAPFullPath}, @{SapPath}, @{SAPProductCategory}, @{SAPProductFamily}, @{SAPProductName}, @{SAPProductSubCategory}, @{SAPProductVersion}, @{ServiceName}, @{ServiceOfferingLevelOne}, @{ServiceOfferingLevelThree}, @{ServiceOfferingLevelTwo}, @{SLAEventDateTime}, @{SLAExpirationDateTime}, @{SLAState}, @{SubPlanningCategory}, @{SupportCountry}, @{SupportLanguage}, @{SupportTimeZone}, @{SurveyCESScore}, @{SurveyCSATScore}, @{SurveyDateTime}, @{SurveyFCRScore}, @{SurveyRating}, @{SurveyType}, @{SurveyVerbatim}, @{SurveyVerbatimAvailable}, @{SymptomText}, @{SymptomTextAvailable}, @{TransferCount}  
     
# API Availability

This experiment type is **not available** through an API call.  

# More Information

For more information about the data available to your experiments see the [ZebraAI Data Dictionaries](https://microsoftapc.sharepoint.com/teams/ZebraAI/Shared%20Documents/Forms/AllItems.aspx?id=%2Fteams%2FZebraAI%2FShared%20Documents%2FGeneral%2FData&p=true&ga=1)  
  
For more information about creating experiments or the individual controls displayed in the screen shot above see [Create An Experiment](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/258/Create-An-Experiment)  
  