# ICM Search
Incident or ICM Search experiments are very much like [Commercial Case Search](Commercial-Case-Search.md) experiments but as the name suggests, uses ICMs rather than Commercial Cases.  
  
![ICM Search](/wiki/imgs/ICM-Search.png)  
  
# Search Capabilities
The ZebraAI ICM search allows you to enter a search term then refine it through a number of controls:
- **[CreateDate] Start** and **End** limits the search results to those ICMs where the **CreateDate** falls between the Start and End dates included.
- **[ResolveDate] Start** and **End** limits the search results to those ICMs where the **ResovleDate** falls between the Start and End dates included.
- **ICM State(s)** limit the search results by the selected states.
## Additional Options
Additional Options include additional controls to further refine your search  
  
![Additional Search](/wiki/imgs/ICM-Additional-Search.png)  
  
These controls include:
- **Initial Severity:** Select among the available values for severity initially assigned to the case.

## Advanced Editor

On the Additional Search options page, as seen above there are two controls that open the [**Advanced Editor**](Search-using-Advanced-Editor.md) page. The **Load into Advanced Editor** control lets you load your current search filters into the Advacned Search Editor while the **Advacned Editor** control simply opens the Advacned Search Editor without pre-populating any search filtering.  

# Available Data Fields
The following data field references are available to be used in your prompts:  

@{CaseNumber}, @{CreateDate}, @{HowFixed}, @{HowFixedAvailable}, @{ImpactedRegions}, @{IMpactStartDate}, @{IncidentId}, @{IncidentType}, @{IsICMAssociatedToSR}, @{IsOutage}, @{MitigateDate}, @{Mitigation}, @{MitigationAvailable}, @{ModifiedDate}, @{OwningTeamName}, @{ResolvedDate}, @{ResponsibleTeamName}, @{RootCauseCategory}, @{RootCauseDescription}, @{RootCauseId}, @{RootCauseTitle}, @{Severity}, @{Status}, @{Summary}, @{SummaryAvailable}, @{Title}, @{TitleAvailable}
    
# API Availability

This experiment type can be configured for use through an API call. For more information on requesting API access to your experiments see [Manage MY Experiments](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/165/Manage-MY-Experiment-API). For more information on optimizing your experiments for use through an API, see [Prompt Guidelines for API Use](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/271/Prompt-Guidelines-for-API-Use).

# More Information

For more information about the data available to your experiments see the [ZebraAI Data Dictionaries](https://microsoftapc.sharepoint.com/teams/ZebraAI/Shared%20Documents/Forms/AllItems.aspx?id=%2Fteams%2FZebraAI%2FShared%20Documents%2FGeneral%2FData&p=true&ga=1)  
  
For more information about creating experiments or the individual controls displayed in the screen shot above see [Create An Experiment](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/258/Create-An-Experiment)  
  
