# ICM Data Dictionary
ICM data fields support ZebraAI’s incident tracking and resolution workflows. This dictionary includes onboarding guidance for new fields and compliance considerations for sensitive case data.

If your case results are missing data **that should otherwise be present**, please fill out a bug [submission](https://aka.ms/zebraaifeedback). 

Link to Excel file: [ICM Data Dictionary.xlsx](https://microsoftapc.sharepoint.com/:x:/t/ZebraAI/EbeZyHAG2Z1Mh2tPGGtcv6EBC79esErq6CGcY0C-1ssM5Q?e=LD65nW)

| Path Name | Zebra AI Column Name | Original Column Name | Data Source File Name | File Name Alias | Data Type | Description | Source DB | Source System |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Commerical | CaseNumber | SupportTicketId | IncidentSnapshot | INCIDSS | UTF8 | Unique identifier for the support ticket | ICM Kusto | ICM |
| Commerical | CreateDate | CreateDate | IncidentSnapshot | INCIDSS | datetime | Date and time when the incident was created | ICM Kusto | ICM |
| Commerical | HowFixed | HowFixed | IncidentSnapshot | INCIDSS | UTF8 | Description of how the incident was fixed | ICM Kusto | ICM |
| Commerical | HowFixedAvailable | HowFixed | IncidentSnapshot | INCIDSS | UTF8 | Indicator if the description of how the incident was fixed is available | ICM Kusto | ICM |
| Commerical | ImpactedRegions | ImpactedRegions | IncidentSnapshot | INCIDSS | nvarchar | Regions impacted by the incident | ICM Kusto | ICM |
| Commerical | ImpactStartDate | ImpactStartDate | IncidentSnapshot | INCIDSS | datetime | Date and time when the impact started | ICM Kusto | ICM |
| Commerical | IncidentId | IncidentId | IncidentSnapshot | INCIDSS | nvarchar | Unique identifier for the incident | ICM Kusto | ICM |
| Commerical | IncidentType | IncidentType | IncidentSnapshot | INCIDSS | nvarchar | Type of the incident | ICM Kusto | ICM |
| Commerical | IsICMAssociatedToSR | IsICMAssociatedToSR | IncidentSnapshot | INCIDSS | varchar | Indicator if the incident is associated with a service request | ICM Kusto | ICM |
| Commerical | IsOutage | IsOutage | IncidentSnapshot | INCIDSS | Bool | Indicator if the incident caused an outage | ICM Kusto | ICM |
| Commerical | MitigateDate | MitigateDate | IncidentSnapshot | INCIDSS | datetime | Date and time when the mitigation was applied | ICM Kusto | ICM |
| Commerical | Mitigation | Mitigation | IncidentSnapshot | INCIDSS | UTF8 | Mitigation steps taken for the incident | ICM Kusto | ICM |
| Commerical | MitigationAvailable | Mitigation | IncidentSnapshot | INCIDSS | UTF8 | Indicator if the mitigation steps are available | ICM Kusto | ICM |
| Commerical | ModifiedDate | ModifiedDate | IncidentSnapshot | INCIDSS | datetime | Date and time when the incident was last modified | ICM Kusto | ICM |
| Commerical | OwningTeamName | OwningTeamName | IncidentSnapshot | INCIDSS | UTF8 | Name of the team owning the incident | ICM Kusto | ICM |
| Commerical | ResolveDate | ResolveDate | IncidentSnapshot | INCIDSS | datetime | Date and time when the incident was resolved | ICM Kusto | ICM |
| Commerical | RootCauseId | RootCauseId | IncidentSnapshot | INCIDSS | Int | Unique identifier for the root cause | ICM Kusto | ICM |
| Commerical | Severity | Severity | IncidentSnapshot | INCIDSS | nvarchar | Severity level of the incident | ICM Kusto | ICM |
| Commerical | Status | Status | IncidentSnapshot | INCIDSS | varchar | Current status of the incident | ICM Kusto | ICM |
| Commerical | Summary | Summary | IncidentSnapshot | INCIDSS | UTF8 | Summary of the incident | ICM Kusto | ICM |
| Commerical | SummaryAvailable | Summary | IncidentSnapshot | INCIDSS | UTF8 | Indicator if the summary is available | ICM Kusto | ICM |
| Commerical | Title | Title | IncidentSnapshot | INCIDSS | nvarchar | Title of the incident | ICM Kusto | ICM |
| Commerical | TitleAvailable | Title | IncidentSnapshot | INCIDSS | nvarchar | Indicator if the title is available | ICM Kusto | ICM |