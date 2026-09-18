# Bring Your Own SQL Data Experiments
Bring Your Own SQL Data experiments are much like [Bring Your Own ADO Data]( BYO-ADO-Data.md). While BYO ADO Data experiments are limited to one source, ADO BYO SQL Data Experiments are limited only to the SQL based data sources ZebraAI can access, with the connection string you provide.  
  
  ![BYO SQL](/wiki/imgs/BYO-SQL-Data.png)
# Required Information
To access your SQL-based data source ZebraAI requires 2 pieces of information:
1)	SQL Connection String – this is the information that ZebraAI will use to connect to your data source. A connection string contains all information required in order to connect and complete user authentication.
2)	The query you create with the ZebraAI query editor.  This defines the dataset for the experiment.  
  
**Temporarily Disabled due to SFI:** For sources that are on Azure and registered on Azure Entra ID, ZebraAI provides a data service that can be connected to your source.  Follow the displayed instructions above to create a ZebraAI user in your source to be used by the data service.  
     
# API Availability

This experiment type is **not available** through an API call.  

For more information about creating experiments or the individual controls displayed in the screen shot above see [Create An Experiment](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/258/Create-An-Experiment)  


