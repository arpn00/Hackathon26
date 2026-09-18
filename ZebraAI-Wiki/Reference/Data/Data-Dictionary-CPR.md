# CPR Data Dictionary
The CPR dictionary defines fields that describe customer profiles, relationships, and engagement history. These elements are essential for behavior analysis, personalization, and summarization tasks within ZebraAI.

If your case results are missing data **that should otherwise be present**, please fill out a bug [submission](https://aka.ms/zebraaifeedback). 

Link to Excel file: [CPR Data Dictionary.xlsx](https://microsoftapc.sharepoint.com/:x:/t/ZebraAI/EUPhPZ-GTy5AkBhAt1J1siUBVtZ9242m8fM4b5vnPkL_5Q?e=p2t3pg)

| Path Name | Zebra AI Column Name | Original Column Name | Data Source File Name | File Name Alias | Data Type | Description | Source DB | Source System |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Caps_CPR | CampaignName | CampaignName | FactDashboardLeads | vwLeads  | nvarchar | Campaign name for the lead | SQLOnPrem | CPR Legacy |
| Caps_CPR | ConversationId | ConversationId | LivePersonMessagingTranscript | lpmt | varchar | Conversation ID for Live person messaging | SQLOnPrem | CPR Legacy |
| Caps_CPR | ConversationTranscripts | MessageDataMsgText | LivePersonMessagingTranscript | lpmt | varchar | The message text content. | SQLOnPrem | CPR Legacy |
| Caps_CPR | LeadCreatedOn |  |  |  | varchar | Lead created date time YYMMDD | SQLOnPrem | CPR Legacy |
| Caps_CPR | LeadNumber | LeadNumber | FactDashboardLeads | vwLeads  | nvarchar | The shows lead number. | SQLOnPrem | CPR Legacy |
| Caps_CPR | LOBName | LOBName | FactDashboardLeads | vwLeads  | nvarchar | This shows line of business name. | SQLOnPrem | CPR Legacy |
| Caps_CPR | PreferredLanguage | PreferredLanguage | FactDashboardLeads | vwLeads  | nvarchar | The lead information  from the FactDashboardLeads table about preferred delivery language. | SQLOnPrem | CPR Legacy |
| Caps_CPR | SolutionArea | SolutionArea | FactDashboardLeads | vwLeads  | nvarchar | This shows the solution area of the campaign. | SQLOnPrem | CPR Legacy |