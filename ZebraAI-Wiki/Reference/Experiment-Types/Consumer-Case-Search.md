# Consumer Case Search
Consumer Case Search experiments embody all the capabilities of [**Consumer Case Lookup**](Consumer-Case-Lookup.md) experiments but include the capability of searching for and selecting multiple cases that will be evaluated by your experiment. Consumer Case Search experiments function exactly as [**Commercial Case Search**](Commercial-Case-Search.md) experiments. The only difference being the type of case data included, Commercial vs Consumer.  
  
![Case Search](/wiki/imgs/Consumer-Search.png)  
  
# Search Capabilities
The ZebraAI Case search allows you to enter a search term then refine it through a number of controls:
- **Start Date** and **End Date** limits the search results to those cases where the case creation date falls between the Start and End date.
- **Case State(s)** limit the search results by the selected states.
## Additional Options
Additional Options include additional controls to further refine your search  
  
![Additional Search](/wiki/imgs/Consumer-Additional-Search.png)  
  
These controls include:
- **Survey Quality of Service:** Select among the available values for the Quality of Service survey score for the case.
- **Survey Customer Effort Score:** Select among the available values for the Customer Effort survey score for the case.
- **IsIRMet:** Select among the available values stored for whether the Initial Response (IR) was met or not.
- **Included Data:** Select if **Case Notes**, or **Survey Results** are available for the case.  

## Advanced Editor

On the Additional Search options page, as seen above there are two controls that open the [**Advanced Editor**](Search-using-Advanced-Editor.md) page. The **Load into Advanced Editor** control lets you load your current search filters into the Advacned Search Editor while the **Advacned Editor** control simply opens the Advacned Search Editor without pre-populating any search filtering.  

# Available Data Fields
The following data field references are available to be used in your prompts:  

@{CaseAgeDays}, @{CaseNotes}, @{CaseNotesAvailable}, @{CaseNumber}, @{CaseState}, @{CaseTitle}, @{CaseTitleAvailable}, @{ClosedDateTime}, @{CreatedDateTime}, @{DataSource}, @{InternalTitle}, @{InternalTitleAvailable}, @{IsIRMet}, @{IssueCodeLevelFour}, @{IssueCodeLevelOne}, @{IssueCodeLevelThree}, @{IssueCodeLevelTwo}, @{IssueDescription}, @{IssueDescriptionAvailable}, @{PlanningCategory}, @{PlanningCategoryBusiness}, @{PlanningCategoryGroup}, @{Resolution}, @{ResolutionSteps}, @{ResolutionStepsAvailable}, @{RootCause}, @{SapPath}, @{SAPProductCategory}, @{SAPProductFamily}, @{SAPProductName}, @{SAPProductSubCategory}, @{SAPProductVersion}, @{ServiceName}, @{SupportCountry}, @{SurveyCustomerEffortScore}, @{SurveyDateTime}, @{SurveyQualityOfServiceScore}, @{SurveyVerbatim}, @{SurveyVerbatimAvailable}, @{Symptom}, @{UserDescription}, @{UserDescriptionAvailable}  

# API Availability

This experiment type can be configured for use through an API call. For more information on requesting API access to your experiments see [Manage MY Experiments](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/165/Manage-MY-Experiment-API). For more information on optimizing your experiments for use through an API, see [Prompt Guidelines for API Use](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/271/Prompt-Guidelines-for-API-Use).

# More Information
  
For more information about the data available to your experiments see the [ZebraAI Data Dictionaries](https://microsoftapc.sharepoint.com/teams/ZebraAI/Shared%20Documents/Forms/AllItems.aspx?id=%2Fteams%2FZebraAI%2FShared%20Documents%2FGeneral%2FData&p=true&ga=1) 

For more information about creating experiments or the individual controls displayed in the screen shot above see [Create An Experiment](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/258/Create-An-Experiment) 
  
