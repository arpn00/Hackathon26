# Consumer Case Lookup Experiments
Consumer Case Lookup Experiments allow you to experiment with a specific Consumer Case which you identify by CaseNumber, as shown below.  Consumer Case Lookup experiments function exactly as [**Commercial Case Lookup**](Commercial-Case-Lookup.md) experiments.  The only difference being the type of case data included, Commercial vs Consumer.  
  
![Consumer Case](/wiki/imgs/Consumer-Lookup.png)   
  
# Available Data Fields
The following data field references are available to be used in your prompts:  

@{CaseAgeDays}, @{CaseNotes}, @{CaseNotesAvailable}, @{CaseNumber}, @{CaseState}, @{CaseTitle}, @{CaseTitleAvailable}, @{ClosedDateTime}, @{CreatedDateTime}, @{DataSource}, @{InternalTitle}, @{InternalTitleAvailable}, @{IsIRMet}, @{IssueCodeLevelFour}, @{IssueCodeLevelOne}, @{IssueCodeLevelThree}, @{IssueCodeLevelTwo}, @{IssueDescription}, @{IssueDescriptionAvailable}, @{PlanningCategory}, @{PlanningCategoryBusiness}, @{PlanningCategoryGroup}, @{Resolution}, @{ResolutionSteps}, @{ResolutionStepsAvailable}, @{RootCause}, @{SapPath}, @{SAPProductCategory}, @{SAPProductFamily}, @{SAPProductName}, @{SAPProductSubCategory}, @{SAPProductVersion}, @{ServiceName}, @{SupportCountry}, @{SurveyCustomerEffortScore}, @{SurveyDateTime}, @{SurveyQualityOfServiceScore}, @{SurveyVerbatim}, @{SurveyVerbatimAvailable}, @{Symptom}, @{UserDescription}, @{UserDescriptionAvailable}

  
To reference data within your prompt simply include the reference. For example:
```
{
  "Messages": [
    {
      "Role": "system",
      "Content": "@{IssueDescription}",
      "Image": null
    },
    {
      "Role": "user",
      "Content": " Summarize in 50 words or less.",
      "Image": null
    }
  ]
}  
```

# API Availability

This experiment type can be configured for use through an API call. For more information on requesting API access to your experiments see [Manage MY Experiments](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/165/Manage-MY-Experiment-API). For more information on optimizing your experiments for use through an API, see [Prompt Guidelines for API Use](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/271/Prompt-Guidelines-for-API-Use).

# More Information

For more information about the data available to your experiments see the [ZebraAI Data Dictionaries](https://microsoftapc.sharepoint.com/teams/ZebraAI/Shared%20Documents/Forms/AllItems.aspx?id=%2Fteams%2FZebraAI%2FShared%20Documents%2FGeneral%2FData&p=true&ga=1) 

For more information about creating effective prompts see [Prompt Engineering for ZebraAI](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/141/Prompt-Engineering-with-ZebraAI)

For more information about creating experiments or the individual controls displayed in the screen shot above see [Create An Experiment](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/258/Create-An-Experiment)  



