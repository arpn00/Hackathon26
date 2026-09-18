# KM Data Dictionary
The KM dictionary organizes ZebraAI’s knowledge content, including articles, summaries, and contextual metadata. It supports enhanced search, summarization, and agent training use cases.

If your case results are missing data **that should otherwise be present**, please fill out a bug [submission](https://aka.ms/zebraaifeedback). 

Link to Excel file: [KM Data Dictionary.xlsx](https://microsoftapc.sharepoint.com/:x:/t/ZebraAI/ET18sy24MClCq4ECA4vUx6IBLJkU8NkISWfWAiWmoaMRzA?e=KqP0cv)

| Path Name | Zebra AI Column Name | Original Column Name | Data Source File Name | File Name Alias | Data Type | Description | Source DB | Source System |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| CXA | Content | ContentText | DimCSSWikiArticleContentText | WMD | UTF8 | Raw content text of the source page. | UDP | CSS Wiki; Knowledge.com; Support.com |
| CXA | ContentRaw | ContentText | DimCSSWikiArticleContentText | WCT | UTF8 | Raw content text of the source page. | UDP | CSS Wiki; Knowledge.com; Support.com |
| CXA | Domain | CSSWiki' | DimCSSWikiArticleContentMetadata | WMD | UTF8 | Domain name for the source. | UDP | CSS Wiki; Knowledge.com; Support.com |
| CXA | Source | CAST | DimCSSWikiArticleContentMetadata | WMD | UTF8 | Source repository name (null for this dataset). | UDP | CSS Wiki; Knowledge.com; Support.com |
| CXA | SourceId | PageId | DimCSSWikiArticleContentMetadata | WMD | INT32 | Identifier for the source page. | UDP | CSS Wiki; Knowledge.com; Support.com |
| CXA | Title | LiveUrl | DimCSSWikiArticleContentMetadata | WMD | UTF8 | URL of the source page. | UDP | CSS Wiki; Knowledge.com; Support.com |
| CXA | Url | LiveUrl | DimCSSWikiArticleContentMetadata | WMD | UTF8 | URL of the source page. | UDP | CSS Wiki; Knowledge.com; Support.com |