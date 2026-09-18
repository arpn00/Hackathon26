# Consumer Data Dictionary
This dictionary captures the structure of ZebraAI’s consumer data, enabling replication of commercial prompts and alignment of case parameters. It highlights shared and missing fields across datasets to support cross-domain experimentation.

If your case results are missing data **that should otherwise be present**, please fill out a bug [submission](https://aka.ms/zebraaifeedback). 

Link to Excel file: [Consumer Data Dictionary.xlsx](https://microsoftapc.sharepoint.com/:x:/t/ZebraAI/EZ0M2iMptAhMtHYQjivJBtoB5aTYFQu8bfSQ2IKo7nAsDg)

| Path Name | Zebra AI Column Name | Original Column Name | Data Source File Name | File Name Alias | Data Type | Description | Source DB | Source System |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| MC/Consumer | CaseAgeDays | AgeInMinutes | FactServiceRequest | FSR | float | Age of the case in days. | Cornerstone | DFC |
| MC/Consumer | CaseNotes | Notes | vwCaseNotes | vwCN | UTF8 | Notes related to the case. | Cornerstone | DFC |
| MC/Consumer | CaseNotesAvailable | Notes | Derived | Derived | UTF8 | Indicator if case notes are available | Cornerstone | DFC |
| MC/Consumer | CaseNumber | ServiceRequestId | FactServiceRequest | FSR | varchar | Unique identifier for the service request. | Cornerstone | DFC |
| MC/Consumer | CaseState | ServiceRequestStatus | DimServiceRequestStatus | DS | varchar | Current status of the service request. | Cornerstone | DFC |
| MC/Consumer | CaseTitle | Title | DimServiceRequestEntity | DSRE | nvarchar | Title of the service request. | Cornerstone | DFC |
| MC/Consumer | ClosedDateTime | LastClosedDateTime | FactServiceRequest | FSR | datetime | Date and time when the service request was last closed. | Cornerstone | DFC |
| MC/Consumer | CreatedDateTime | CreatedDateTime | DimServiceRequestNotes | DSRN | datetime | Date and time when the service request note was created. | Cornerstone | DFC |
| MC/Consumer | DataSource | DataSourceName | DimDataSource | DDS | varchar | Name of the data source. | Cornerstone | DFC |
| MC/Consumer | InternalTitle | InternalTitle | DimServiceRequestEntity | DSRE | nvarchar | Internal title of the service request. | Source DB | Source System |
| MC/Consumer | IsIRMet | ISIRSLAMet | FactServiceRequest | FSR | bit | Indicates if the IR SLA is met. | Source DB | Source System |
| MC/Consumer | IssueCodeLevelFour | IssueCode4 | DimIssueCode | DIC | varchar | Fourth level of issue code. | Source DB | Source System |
| MC/Consumer | IssueCodeLevelOne | IssueCode1 | DimIssueCode | DIC | varchar | First level of issue code. | Source DB | Source System |
| MC/Consumer | IssueCodeLevelThree | IssueCode3 | DimIssueCode | DIC | varchar | Third level of issue code. | Cornerstone | DFC |
| MC/Consumer | IssueCodeLevelTwo | IssueCode2 | DimIssueCode | DIC | varchar | Second level of issue code. | Cornerstone | DFC |
| MC/Consumer | IssueDescription | CustomerStatement | DimServiceRequestEntity | DSRE | UTF8 | Customer's statement describing the issue. | Cornerstone | DFC |
| MC/Consumer | IssueDescriptionAvailable |  |  |  | Bool | Available Issue Description | Zebra AI | Zebra AI |
| MC/Consumer | PlanningCategory | PlanningCategory | DimPlanningCategory | DPC | nvarchar | Planning category. | Cornerstone | DFC |
| MC/Consumer | PlanningCategoryBusiness | PlanningSBU | DimPlanningCategory | DPC | varchar | Business category for planning. | Cornerstone | DFC |
| MC/Consumer | PlanningCategoryGroup | PlanningLOB | DimPlanningCategory | DPC | varchar | Group category for planning. | Cornerstone | DFC |
| MC/Consumer | ResolutionSteps | ResolutionSteps | DimSupportRequestTicket | DSRT | UTF8 | Steps taken to resolve the issue. | Cornerstone | DFC |
| MC/Consumer | ResolutionStepsAvailable |  |  |  | Bool | Available Resolution Steps | Zebra AI | Zebra AI |
| MC/Consumer | SapFullPath | SapPath | DimSupportAreaPath | DSAP | nvarchar | SAP Path in the SAP hierarchy. | Zebra AI | Zebra AI |
| MC/Consumer | SAPProductCategory | LevelName4 | DimSupportAreaPath | DSAP | nvarchar | Product category in the SAP hierarchy. | Cornerstone | DFC |
| MC/Consumer | SAPProductFamily | LevelName1 | DimSupportAreaPath | DSAP | nvarchar | Product family name in the SAP hierarchy. | Cornerstone | DFC |
| MC/Consumer | SAPProductName | LevelName2 | DimSupportAreaPath | DSAP | nvarchar | Product name in the SAP hierarchy. | Cornerstone | DFC |
| MC/Consumer | SAPProductSubCategory | LevelName5 | DimSupportAreaPath | DSAP | nvarchar | Product subcategory in the SAP hierarchy. | Cornerstone | DFC |
| MC/Consumer | SAPProductVersion | LevelName3 | DimSupportAreaPath | DSAP | nvarchar | Product version in the SAP hierarchy. | Cornerstone | DFC |
| MC/Consumer | ServiceName | Offerings | DimOffering | DO | varchar | Name of the service offering. | Cornerstone | DFC |
| MC/Consumer | SurveyCustomerEffortScore | CustomerEffortScore | FactSurvey | FS | int | Score representing the customer's effort in the survey. | Cornerstone | DFC |
| MC/Consumer | SurveyDateTime | SurveyCreatedDate | FactSurvey | FS | datetime2 | Date and time when the survey was created. | Cornerstone | DFC |
| MC/Consumer | SurveyQualityOfServiceScore | QualityOfServiceScore | FactSurvey | FS | nvarchar | Score representing the quality of service in the survey. | Cornerstone | DFC |
| MC/Consumer | SurveyVerbatim | Verbatim | FactSurveyVerbatim | FSV | nvarchar | Verbatim text from the survey. | Cornerstone | DFC |
| MC/Consumer | SurveyVerbatimAvailable | Verbatim | Derived | Derived | nvarchar | Indicator if survey verbatim is available | Cornerstone | DFC |
| MC/Consumer | UserDescription | Description | DimSupportRequestTicket | DSRT | varchar | User's description of the issue. | Cornerstone | DFC |
| MC/Consumer | UserDescriptionAvailable |  |  |  | Bool | Available User Description | Zebra AI | Zebra AI |
| MC/Consumer | SupportTimeZone |  |  |  |  | Time zone of support | Cornerstone | DFC |
| MC/Consumer | SupportCountry |  |  |  |  | Country of support | Cornerstone | DFC |
| MC/Consumer | RootCause |  |  |  |  | Root Cause identified for service request | Cornerstone | DFC |
| MC/Consumer | Symptom |  |  |  |  | Symptoms of the issues for service request | Cornerstone | DFC |
| MC/Consumer | Resolution |  |  |  |  | Resolution description for a service request | Cornerstone | DFC |