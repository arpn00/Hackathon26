# Commercial Data Dictionary
The Commercial Data Dictionary outlines key fields used in ZebraAI’s commercial support scenarios, including service request metadata, notes availability, and case lifecycle attributes. These definitions support prompt engineering, filtering logic, and compliance-driven summarization.

If your case results are missing data **that should otherwise be present**, please fill out a bug [submission](https://aka.ms/zebraaifeedback). 

Link to Excel file: [Commercial Data Dictionary.xlsx](https://microsoftapc.sharepoint.com/:x:/t/ZebraAI/Eb3I4yRx-GFPnWDEgezRyW0B6W7cDJg6Yy6izhgGVqK3Fg?e=j58osQ)



| Path Name | Zebra AI Column Name | Description | Original Column Name | Data Source File Name | File Name Alias | Data Type | Source DB | Source System |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Commercial | AgreementId | Agreement ID  (in ZAI can be used as a filter but can't be retrieved) |  |  |  |  |  |  |
| Commercial | AzureSubscriptionId | Unique identifier associated with your Azure account (in ZAI can be used as a filter but can't be retrieved) |  |  |  |  | Cornerstone |  |
| Commercial | CaseAgeDays | The age of the service request in days. | ServiceRequestAgeDays | FactSupportServiceRequest | FSSR | int | Cornerstone | DFM |
| Commercial | CaseEvents |  The case events for  service request (searchable, retrievable but not filter) |  |  |  |  | Cornerstone |  |
| Commercial | CaseNotes | The notes associated with the service request. | NoteText | vwCaseNotes | CN | UTF8 | Cornerstone | DFM |
| Commercial | CaseNotesAvailable | Checks if CaseNotes is available | NoteText | vwCaseNotes | CN | UTF8 | Cornerstone | DFM |
| Commercial | CaseNumber | The unique identifier for each service request. | ServiceRequestNumber | FactSupportServiceRequest | FSSR | nvarchar | Cornerstone | DFM |
| Commercial | CaseNumber | The unique identifier for each service request. | ServiceRequestState | DimSupportServiceRequest | DSSR | varchar | Cornerstone | DFM |
| Commercial | CaseStatus | The status of the service request. | ServiceRequestStatus | DimSupportServiceRequest | DSSR | varchar | Cornerstone | DFM |
| Commercial | CaseState | Current Case State |  |  |  | String | Cornerstone | DFM |
| Commercial | CaseTitle | The title of the service request. | ServiceRequestTitle | DimSupportServiceRequest | DSSR | UTF8 | Cornerstone | DFM |
| Commercial | CaseTitleAvailable | Flag for if the CaseTitle is available. |  |  |  | String | Cornerstone | DFM |
| Commercial | CauseText | The cause text of the service request. | Causetxt | DimSupportServiceRequest | DSSR | UTF8 | Cornerstone | DFM |
| Commercial | CauseTextAvailable | Checks if CauseText is available | CauseTxt | DimSupportServiceRequest | DSSR | UTF8 | Cornerstone | DFM |
| Commercial | ClosedDateTime | The date and time when the service request was closed. | ClosedDateTime | DimSupportServiceRequest | DSSR | datetime | Cornerstone | DFM |
| Commercial | CloudProductFilter | The cloud product filter of the service request. | CloudProductFilter | DimProductMaster | DPM | varchar | Cornerstone | DFM |
| Commercial | CollaborationCount | Number of collaboartions per service request  (in ZAI can be used as a filter but can't be retrieved) |  |  |  |  | Cornerstone |  |
| Commercial | CreatedDateTime | The date and time when the service request was created. | CreatedTime | DimSupportServiceRequest | DSSR | datetime | Cornerstone | DFM |
| Commercial | CurrentQueue | The current queue where the service request is assigned. | QueueName | DimQueue | DQ | nvarchar | Cornerstone | DFM |
| Commercial | CurrentSeverity | The current severity of the service request. | ServiceRequestCurrentSeverity | DimSupportServiceRequest | DSSR | varchar | Cornerstone | DFM |
| Commercial | DataSource | The data source of the service request. | DataSourceName | DimDataSource | DS | varchar | Cornerstone | DFM |
| Commercial | DaysToClose |  |  | vwUDPCase |  | Double | UDP | DFM |
| Commercial | DaysToSolution |  |  |  |  | Double | UDP | DFM |
| Commercial | EmailTranscripts | The email transcripts associated with the service request. | Summary | vwCaseEmails | CE | UTF8 | Cornerstone | DFM |
| Commercial | EmailTranscriptsAvailable | Checks if EmailTranscripts is available | Summary | vwCaseEmails | CE | UTF8 | Cornerstone | DFM |
| Commercial | HasCollaborationTasks | Collaboration tasks availibility in Service request  (in ZAI can be used as a filter but can't be retrieved) |  |  |  |  | Cornerstone |  |
| Commercial | HasOwnerAssigned |  |  |  |  | Boolean | Cornerstone | DFM |
| Commercial | ICMId | The Incident and Change Management (ICM) ID of the service request. | NativeItemid | vwICMCases | ICM | INT64 | Cornerstone | DFM |
| Commercial | ICMUrl | The URL of the ICM case. | URL | vwICMCases | ICM | varchar | Cornerstone | DFM |
| Commercial | InitialSapFullPath | The initial full path of the product in the SAP. |  |  |  | String | Cornerstone | DFM |
| Commercial | InitialSAPProductCategory | The initial product category of the service request. |  |  |  | String | Cornerstone | DFM |
| Commercial | InitialSAPProductFamily | The initial product family of the service request. |  |  |  | String | Cornerstone | DFM |
| Commercial | InitialSAPProductName | The initial product name of the service request. |  |  |  | String | Cornerstone | DFM |
| Commercial | InitialSAPProductSubCategory | The initial product subcategory of the service request. |  |  |  | String | Cornerstone | DFM |
| Commercial | InitialSAPProductVersion | The initial product version of the service request. |  |  |  | String | Cornerstone | DFM |
| Commercial | InitialSeverity | The initial severity of the service request. | ServiceRequestInitialSeverity | DimSupportServiceRequest | DSSR | varchar | Cornerstone | DFM |
| Commercial | InternalTitle | The internal title of the service request. | InternalTitle | DimSupportServiceRequest | DSSR | nvarchar | Cornerstone | DFM |
| Commercial | InternalTitleAvailable | Flag for if the CaseTitle is available. |  |  |  | Boolean | Cornerstone | DFM |
| Commercial | Is24X7OptedIn |  |  | vwUDPCase |  | String | UDP | DFM |
| Commercial | IsCollaborationTask |  |  |  |  | Boolean |  | ZebraAI |
| Commercial | IsCritSit |  |  | vwUDPCase |  | Boolean | UDP | DFM |
| Commercial | IsEUSchrems |  |  |  |  | Boolean | Cornerstone | DFM |
| Commercial | IsCEnS | Indicates whether the service request is part of the CEnS program. | IsCSS | DimSupportServiceRequest | DSSR | varchar | Cornerstone | DFM |
| Commercial | IsCubeFlag | Indicates whether the service request is a cube flag. | IsCubeFlag | FactSupportServiceRequest | FSSR | int | Cornerstone | DFM |
| Commercial | IsIRMet | Indicates whether the Initial Response (IR) was met. | IsIRMet | DimSupportServiceRequest | DSSR | varchar | Cornerstone | DFM |
| Commercial | IsS500Program | Indicates whether the service request is part of the S500 program. | IsS500Program | DimSupportServiceRequest | DSSR | BOOLEAN | Cornerstone | DFM |
| Commercial | IsStrategicCohortGroup | Indicates whether the service request is part of the Strategic Cohort Group. | IsStrategicCohortGroup | DimSupportServiceRequest | DSSR | BOOLEAN | Cornerstone | DFM |
| Commercial | IssueDescription | The issue description of the service request. | IssueDescription | DimSupportServiceRequest | DSSR | UTF8 | Cornerstone | DFM |
| Commercial | IssueDescriptionAvailable | Flag for if the IssueDescription is available. |  |  |  | Boolean | Cornerstone | DFM |
| Commercial | LastModifiedDateTime |  |  |  |  |  |  |  |
| Commercial | MaxSeverity | The maximum severity of the service request. | ServiceRequestMaxSeverity | DimSupportServiceRequest | DSSR | varchar | Cornerstone | DFM |
| Commercial | MinutesToInitialResponse |  |  |  |  | Int64 | UDP | DFM |
| Commercial | OwnershipCount | The number of times the service request has changed ownership. | OwnershipCount | FactSupportServiceRequest | FSSR | int | Cornerstone | DFM |
| Commercial | PackageId | Package ID under Agreements  (in ZAI can be used as a filter but can't be retrieved) |  |  |  |  |  |  |
| Commercial | ParentCaseNumber |  |  |  |  | String |  | ZebraAI |
| Commercial | PartnerCenterAchieveMore |  |  |  |  | Int64 | Cornerstone | DFM |
| Commercial | PartnerCenterAzureCSP |  |  |  |  | Boolean | Cornerstone | DFM |
| Commercial | PartnerCenterCloudEnvironment |  |  |  |  | String | Cornerstone | DFM |
| Commercial | PartnerCenterHighValuePartner |  |  |  |  | Boolean | Cornerstone | DFM |
| Commercial | PartnerCenterInternalEscalation |  |  |  |  | Int64 | Cornerstone | DFM |
| Commercial | PartnerCenterMPNId |  |  |  |  | String | Cornerstone | DFM |
| Commercial | PartnerCenterOfferType |  |  |  |  | String | Cornerstone | DFM |
| Commercial | PartnerCenterTenantID |  |  |  |  | String | Cornerstone | DFM |
| Commercial | PlanningCategory | The planning category of the service request. | PlanningCategory | DimPlanningCategory | DPC | nvarchar | Cornerstone | DFM |
| Commercial | PlanningCategoryBusiness | The business planning category of the service request. | PlanningCategoryBusiness | DimPlanningCategory | DPC | nvarchar | Cornerstone | DFM |
| Commercial | PlanningCategoryGroup | The planning category group of the service request. | PlanningCategoryGroup | DimPlanningCategory | DPC | nvarchar | Cornerstone | DFM |
| Commercial | ResolutionDateTime | The date and time when the service request was resolved. | ResolutionTime | DimSupportServiceRequest | DSSR | int | Cornerstone | DFM |
| Commercial | ResolutionText | The resolution text of the service request. | Resolutiontxt | DimSupportServiceRequest | DSSR | UTF8 | Cornerstone | DFM |
| Commercial | ResolutionTextAvailable | Checks if ResolutionText is available | ResolutionTxt | DimSupportServiceRequest | DSSR | UTF8 | Cornerstone | DFM |
| Commercial | RootCauseFull | The full path of the root cause in the support topic. | SupportTopicFullPath | DimSupportTopic | DSTRC | nvarchar | Cornerstone | DFM |
| Commercial | RootCauseLevelFive | The fifth level of the root cause in the support topic. | SupportTopicLevel5Name | DimSupportTopic | DSTRC | nvarchar | Cornerstone | DFM |
| Commercial | RootCauseLevelFour | The fourth level of the root cause in the support topic. | SupportTopicLevel4Name | DimSupportTopic | DSTRC | nvarchar | Cornerstone | DFM |
| Commercial | RootCauseLevelOne | The first level of the root cause in the support topic. | SupportTopicLevel1Name | DimSupportTopic | DSTRC | nvarchar | Cornerstone | DFM |
| Commercial | RootCauseLevelSeven | The seventh level of the root cause in the support topic. | SupportTopicLevel6Name | DimSupportTopic | DSTRC | nvarchar | Cornerstone | DFM |
| Commercial | RootCauseLevelSix | The sixth level of the root cause in the support topic. | SupportTopicLevel7Name | DimSupportTopic | DSTRC | nvarchar | Cornerstone | DFM |
| Commercial | RootCauseLevelThree | The third level of the root cause in the support topic. | SupportTopicLevel3Name | DimSupportTopic | DSTRC | nvarchar | Cornerstone | DFM |
| Commercial | RootCauseLevelTwo | The second level of the root cause in the support topic. | SupportTopicLevel2Name | DimSupportTopic | DSTRC | nvarchar | Cornerstone | DFM |
| Commercial | SAPFullPath | The full path of the product in the SAP. | SAPPath | DimSupportAreaPath | DSAP | nvarchar | Cornerstone | DFM |
| Commercial | SapFullPath | The full path of the product in the SAP. | SapPath | DimSupportAreaPath | DSAP | nvarchar | Cornerstone | DFM |
| Commercial | SAPProductCategory | The product category of the service request. | Category1 | DimSupportAreaPath | DSAP | varchar | Cornerstone | DFM |
| Commercial | SAPProductFamily | The product family of the service request. | ProductFamily | DimSupportAreaPath | DSAP | nvarchar | Cornerstone | DFM |
| Commercial | SAPProductName | The product name of the service request. | ProductName | DimSupportAreaPath | DSAP | nvarchar | Cornerstone | DFM |
| Commercial | SAPProductSubCategory | The product subcategory of the service request. | Category2 | DimSupportAreaPath | DSAP | varchar | Cornerstone | DFM |
| Commercial | SAPProductVersion | The product version of the service request. | ProductVersion | DimSupportAreaPath | DSAP | varchar | Cornerstone | DFM |
| Commercial | ServiceName | The name of the service. | ServiceName | DimServiceOfferingMaster | DSOM | varchar | Cornerstone | DFM |
| Commercial | ServiceOfferingLevelOne | The first level of the service offering. | ServiceOfferingLevel1 | DimServiceOfferingMaster | DSOM | nvarchar | Cornerstone | DFM |
| Commercial | ServiceOfferingLevelThree | The third level of the service offering. | ServiceOfferingLevel3 | DimServiceOfferingMaster | DSOM | nvarchar | Cornerstone | DFM |
| Commercial | ServiceOfferingLevelTwo | The second level of the service offering. | ServiceOfferingLevel2 | DimServiceOfferingMaster | DSOM | nvarchar | Cornerstone | DFM |
| Commercial | SLAEventDateTime | The date and time of the SLA event. | SLAEventTime | DimSupportServiceRequest | DSSR | datetime2 | Cornerstone | DFM |
| Commercial | SLAExpirationDateTime | The date and time when the SLA expires. | SLAExpiresTime | DimSupportServiceRequest | DSSR | datetime2 | Cornerstone | DFM |
| Commercial | SLAState | The state of the Service Level Agreement (SLA) for the service request. | ServiceRequestSLAState | DimSupportServiceRequest | DSSR | varchar | Cornerstone | DFM |
| Commercial | SubPlanningCategory | The sub-planning category of the service request. | SubPlanningCategory | DimPlanningCategory | DPC | nvarchar | Cornerstone | DFM |
| Commercial | SupportCountry | The country of the support team handling the service request. | SupportCountry | DimSupportServiceRequest | DSSR | nvarchar | Cornerstone | DFM |
| Commercial | SupportLanguage | The language of the support team handling the service request. | LanguageLevel2 | DimSupportLanguage | DSL | nvarchar | Cornerstone | DFM |
| Commercial | SupportTimeZone | The time zone of the support team handling the service request. | SupportTimeZone | DimSupportServiceRequest | DSSR | varchar | Cornerstone | DFM |
| Commercial | SurveyCESScore | The Customer Effort Score (CES) of the survey. | CESScore | vwLastSurvey | LS | float | Cornerstone | DFM |
| Commercial | SurveyCSATScore | The Customer Satisfaction (CSAT) score of the survey. | CSATScore | vwLastSurvey | LS | float | Cornerstone | DFM |
| Commercial | SurveyDateTime | The date and time of the survey. | CustomerFeedbackDateTime | vwLastSurvey | LS | datetime2 | Cornerstone | DFM |
| Commercial | SurveyFCRScore | The First Contact Resolution (FCR) score of the survey. | FCRScore | vwLastSurvey | LS | int | Cornerstone | DFM |
| Commercial | SurveyRating | The rating of the survey associated with the service request. | SurveyRating | vwLastSurvey | LS | UTF8 | Cornerstone | DFM |
| Commercial | SurveyType | The type of survey associated with the service request. | SurveyType | vwLastSurvey | LS | varchar | Cornerstone | DFM |
| Commercial | SurveyVerbatim | The verbatim feedback from the survey. | SurveyVerbatim | vwLastSurvey | LS | varchar | Cornerstone | DFM |
| Commercial | SurveyVerbatimAvailable | Checks if SurveyVerbatim is available | SurveyVerbatim | vwLastSurvey | LS | varchar | Cornerstone | DFM |
| Commercial | SymptomText | The symptom text of the service request. | Symptomstxt | DimSupportServiceRequest | DSSR | UTF8 | Cornerstone | DFM |
| Commercial | SymptomTextAvailable | Checks if SymptomText is available | SymptomsTxt | DimSupportServiceRequest | DSSR | UTF8 | Cornerstone | DFM |
| Commercial | TotalLaborMinutes |  |  |  |  | Int64 | Cornerstone | DFM |
| Commercial | TPID | Top Parent ID (in ZAI can be used as a filter but not searchable. You can use TPID using the advanced filter settings: "filter":"TPID eq '123456'") |  |  |  |  | Cornerstone |  |
| Commercial | TransferCount | The number of times the service request has been transferred. | TransferCount | FactSupportServiceRequest | FSSR | int | Cornerstone | DFM |
| Commercial | ZebraAIUpdatedDateTime |  |  |  |  | String | Cornerstone | ZebraAI |

<br>

# Data Captured in CaseEvents
Below is the current list of data being captured inside the “caseevents” field.<br>
**Note:** In Commercial Next day the output is an array of json objects that match the above. However, if it's a very long running case it may be truncated. For NRT they will get a full list of all the events. 

StructField(**"EventId"**, StringType(), True),*<br>
StructField(**"CaseNumber"**, StringType(), True),<br>
StructField(**"TimeStamp"**, StringType(), True),<br>
StructField(**"EventType"**, StringType(), True),<br>
StructField(**"UpdatedAttributes"**, StringType(), True),<br>
StructField(**"ZebraAIUpdatedDateTime"**, StringType(), True)<br>

*EventId isn't useful for the users but is used internally. 



