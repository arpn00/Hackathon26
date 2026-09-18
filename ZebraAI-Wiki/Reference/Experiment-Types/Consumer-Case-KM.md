# Consumer Case and Related KM content Search 
**Consumer Case + KM Content Search** experiments function like [**Consumer Case Search**](Consumer-Case-Search.md) experiments but allow the user to select both Consumer Cases as well as the Knowledge Management articles (KMs) related to those selected cases and use all the selected data in their experiments.  In this way **Consumer Case + KM Content Search** experiments function like [**Comemrcial Case + KM Content Search**](Commercial-Case-KM.md) experiments.  

 ![Comm+KM](/wiki/imgs/Consumer-KM.png)  

# Using this Experience
To effectively use the **Consumer Case + KM Content Search** experiment type, complete the following:  
- **Step 1: Select Consumer Cases** You must first search and select the cases to be included in your experiment.  This functions in a limited way as compared to the [Consumer Case Search](Consumer-Case-Search.md).  Many of the filters available in Consumer Case Search are not available here. You can however use the available text search to find cases of interest. Once your cases are selected you can then move to Step 2.
- **Step 2: Select Related KMs** A list of KMs is automatically presented once case search results are displayed. This list of KMs is sorted by search score.  You can then select the KMs to be included in your experiment and proceed to run your experiment.  


# Available Data references
Consumer Case data can be referenced through the following data table reference in youur prompts:  

@{CaseResults}
  
The following KM data reference can be used in your Prompt:  
  
@{ContentResults} 
    
# API Availability

This experiment type can be configured for use through an API call. For more information on requesting API access to your experiments see [Manage MY Experiments](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/165/Manage-MY-Experiment-API). For more information on optimizing your experiments for use through an API, see [Prompt Guidelines for API Use](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/271/Prompt-Guidelines-for-API-Use).

# More Information

For more information about the data available to your experiments see the [ZebraAI Data Dictionaries](https://microsoftapc.sharepoint.com/teams/ZebraAI/Shared%20Documents/Forms/AllItems.aspx?id=%2Fteams%2FZebraAI%2FShared%20Documents%2FGeneral%2FData&p=true&ga=1)  
  
For more information about creating experiments or the individual controls displayed in the screen shot above see [Create An Experiment](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/258/Create-An-Experiment)  
