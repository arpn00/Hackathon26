# Bring Your Own ADO Data Experiments
Bring Your Own ADO Data Experiemnts allow you to include data from any ADO based data source into your experiments. To access ADO data you must first create a query in ADO for the data you want to use in your experiment. When you run your experiment, ZebraAI will execute this query and inject the result into your experiment. Only the columns included in the query will be available for your prompt.  
  
  ![BYO ADO Data](/wiki/imgs/BYO-ADO-Data.png)  

# Required Information

To access your ADO data ZebraAI requires 4 pieces of information:
1)	**An ADO Personal Access Token** - To get this token follow the instructions available on [Microsoft Learn](https://learn.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate?view=azure-devops&tabs=Windows). This is necessary for the authentication process when the query identified below is run.
2)	**Organization** - This is your organization as it appears in ADO. Together with the project name and query ID, organization identifies the query to ZebraAI
3)	**Project** - The project name as it appears in ADO
4)	**Query ID** - The ID of the ADO query you created for the experiment  

In your prompt, reference your data using the construct, **Summarize {{InsertADOTable}}**. Once done you can reference columns by name.  

# Max number of rows

Along with the information above, ZebraAI allows you to choose a maximum number of rows to be returned when your experiment is run.  As ZebraAI is constrained by the number of tokens consumed by a prompt, the data processed by the prompt must similarly be limited.  

# API Availability

This experiment type is **not available** through an API call.

For more information about creating experiments or the individual controls displayed in the screen shot above see [Create an Experiment](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/258/Create-An-Experiment)  
