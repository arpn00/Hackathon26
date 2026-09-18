# Know Me 
**Know Me** experiments are much like [Commercial Vector Case Review](Commercial-Vector-Case-Review.md) experiments. Like Comemrcial Case Vector Review experiments, **Know Me** uses a Commercial Case lookup as the basis of a vector search but augments this experience with customer profile data.  
  
![Vector](/wiki/imgs/Know-Me.png)  
  
# Using this Experience
To effectively use the **Know Me** experiment type, you start by completing a case lookup on the commercial case of your choosing, identified by Case Number.  Then choose the number of related cases to be returned by the vector search.  When running your experiment both the initial case and the related cases are available for use in your prompts.

# Available Data Fields (available for the initial Case)
The following Commercial Case data field references are available to be used in your prompts:  

@{AzuerSubscriptionId}, @{CaseAgeDays}, @{CaseNumber}, @{CaseState}, @{CaseStatus}, @{CaseTitle}, @{CauseText}, @{ClosedDateTime}, @{CreatedDateTime}, @{CurrentSeverity}, @{DaysToClose}, @{DaysToSolution}, @{GeneratedissueSummary}, @{ICMCaseCount}, @{InitialSeverity}, @{Is24X7OptedIn}, @{IsCritsit}, @{IsIRMet}, @{IsS500Program}, @{IsStrategicCohortGroup}, @{IsStrategicProgram}, @{IssueDescription}, @{MaxSeverity}, @{MinutesToInitialResponse},  @{OwnershipCount}, @{PlanningCategory}, @{PlanningCategoryBusiness}, @{PlanningCategoryGroup}, @{ResolutionDateTime}, @{ResolutionText}, @{SapPath}, @{SAPProductCategory}, @{SAPProductFamily}, @{SAPProductName}, @{SAPProductSubCategory}, @{SAPProductVersion}, @{SubPlanningCategory}, @{SurveyCESScore}, @{SurveyCSATScore}, @{SurveyDateTime}, @{SurveyFCRScore}, @{SurveyRating}, @{SurveyType}, @{SurveyVerbatim}, @{SurveyVerbatimAvailable}, @{SymptomText}, @{TotalLaborMinutes}, @{TPID}, @{TransferCount}  
  
The follow **Know Me** customer profile data references are available to be used in your prompts:  

@{AvgDaysToClose}, @{AvgDaysToSolution}, @{AvgMinutesToInitialResponse}, @{AvgOwnershipCount}, @{AvgSurveyRating}, @{AvgTotalLaborMinutes}, @{AvgTransferCount}, @{AzuerSubscriptionId}, @{CompanyDescription}, @{CompanyName}, @{CritsitCount}, @{CritsitRatio}, @{CSAMNoteSummary}, @{IRMetCount}, @{IRMetRatio}, @{Is24X7Count}, @{Is24X7Ratio}, @{MaxSeverity1Count}, @{MaxSeverity1Ratio}, @{MaxSeverityACount}, @{MaxSeverityARatio}, @{MaxSeverityBCount}, @{MaxSeverityBRatio}, 
@{MaxSeverityCCount}, @{MaxSeverityCRatio}, @{SurveyCount}, @{SurveyDSATCsaeNumber}, @{SurveyNegativeThemes}, @{SurveyPositiveThemes}, @{SurveySuggestions}, @{TotalCaseOpenCount}, @{TotalICMCount}, @{TPID}

The follow **Know Me** table references are available to be used in your prompts: 

@{KnowMeCaseData}, @{KnowMeCustomerProfileData}, @{KnowMeRelatedClosedCases}, @{KnowMeRelatedOpenCases}, @{KnowMeCustomerRelatedClosedCases}, @{KnowMeCustomerRelatedOpenCases}, @{KnowMeCustomerRecentClosedCases}, @{KnowMeCustomerRecentOpenCases}
  
# API Availability

This experiment type can be configured for use through an API call. For more information on requesting API access to your experiments see [Manage MY Experiments](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/165/Manage-MY-Experiment-API). For more information on optimizing your experiments for use through an API, see [Prompt Guidelines for API Use](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/271/Prompt-Guidelines-for-API-Use).

# More Information

For more information about the data available to your experiments see the [ZebraAI Data Dictionaries](https://microsoftapc.sharepoint.com/teams/ZebraAI/Shared%20Documents/Forms/AllItems.aspx?id=%2Fteams%2FZebraAI%2FShared%20Documents%2FGeneral%2FData&p=true&ga=1)  
  
For more information about creating experiments or the individual controls displayed in the screen shot above see [Create An Experiment](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/258/Create-An-Experiment)  
  