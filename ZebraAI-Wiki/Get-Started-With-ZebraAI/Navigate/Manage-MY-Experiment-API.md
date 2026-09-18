# Manage *MY* Experiment API
The Manage *MY* Experiment API page allows you to toggle the availability of your experiment through its API Endpoint as well as manage access to the API Endpoint.  
  
![Manage  API](/wiki/imgs/Manage-MY-API.png)   
The Manage *MY* Experiment API page includes details about your experiment including:
- **Exp ID**: the experiment ID
- **Model**: the GPT model used by the experiment
- **Owner**: the owner of the experiment as defined by email alias
- **Active Status**: the status of the API Endpoint
- **API Requested on**: the date when the API request was first filed
- **Description**: The description of the experiment
  
The **Entra ID + Caller** field is a JSON formatted list of all people or processes that can access you experiment through the API Endpoint. This field must have the following format:  
```
["email1@microsoft.com ", "client ID", “email2@microsoft.com]
```
The list may include any number of email addresses or Client IDs. **Note** vanity email addresses will not work in the authentication process. **DO NOT** include vanity email addresses in this list.  
  
The **API Enabled** check box lets you disable the API Endpoint for your experiment.  There are any number of reasons for disabling the API temporarily.  If you wish to modify your experiment, you may wish to make it unavailable to any calling applications while you are making changes.
  
Pressing the **Submit** button will save your changes.  
Pressing the **Cancel** button will close the page returning you to the [My Experiments](/Get-Started-With-ZebraAI/Navigate/My-Experiments).  
  
More about the data stored for ZebraAI can be found in [Experiment Attributes](/Reference/ZebraAI-Experiments/Experiment-Attributes). 



