# ZebraAI FAQ  
We are answering some of our most common new user questions here. If you are looking for more guidance, be sure to visit [Get Started With ZebraAI](/Get-Started-With-ZebraAI) or [How To Guides](/How-To-Guides). 

## 1. What is the use case for ZebraAI?  

Use cases are based on what a user can imagine and wants to try with AI to test their hypothesis. ZebraAI’s core use cases are around solving business problems by using various types of support data. However, ZebraAI has flexibility to go beyond support data by also allowing different Bring Your own Data (BYOD) capabilities. Learn more about [Common Use Cases](/Get-Started-With-ZebraAI/Common-Use-Cases). 

## 2. How to create experiments including how to choose the correct user experience for their scenarios?  

There are multiple videos on this subject on the videos page: [ZebraAI Media](https://zebra-ai-web-prd.ait.microsoft.com/media). We also recommend the [Get Started With ZebraAI](/Get-Started-With-ZebraAI) wiki section. 

## 3. How do I explore and use experiments others have created? 
Start with the Showcase area. If you don’t find something in Showcase, then try Sample or Shared. For more details, see [Explore ZebraAI Experiments](/Get-Started-With-ZebraAI/Explore-ZebraAI-Experiments).

## 4. Can we use others language instead of English in Zebra AI? Many teams are doing support in their local language.  

Yes, Azure OpenAI supports other languages. [Language support for language features - Azure AI services | Microsoft Learn](https://learn.microsoft.com/en-us/azure/ai-services/language-service/concepts/language-support) also each model has its own details page which includes language details. 

## 5. Can we query multiple cases in one time? How to do it?  

This depends on the experiment UX. If you choose any of the keyword **search** UX’s then multiple cases can be queried for. There is also the **oData** query option under Advanced Filter that allows for more comprehensive queries. If you want to process a prompt on multiple cases at one time, you'll need a follow-up prompt or a separate experiment.  

## 6. How often is data refreshed?
This is a simple question with a potentially complicated answer, as there are a LOT of factors involved in getting the data to ZebraAI. As you are running the experiments, data should be up to date within 15 minutes for NRT and within 24 hours for everything else. 
-  **Near Real-Time (NRT) Updates:** Data is refreshed within 15 minutes for NRT scenarios, ensuring that experiments run with the most current information available.
-  **Standard Data Refresh:** For all other cases, data is updated within 24 hours, providing daily synchronization for broader datasets.
-  **Data Ingestion Latency:** For Cornerstone and IcM sources specifically, there is a typical delay of 24–48 hours from source to destination, depending on downstream systems and processing pipelines.

## 7. How to request CSS data? How long will the CSS data approval process take?
- You can [Request CSS Data Usage](/How-To-Guides/Request-CSS-Data-Usage) on the ZebraAI platform. 
- The [Approval Process](/Reference/ZebraAI-Platform/Approval-Process) is usually completed within 1 business day, but holidays and emergencies can impact that timeframe.<br>

The following refresh table can be accessed by going into your experiment and selecting the "Refresh Info" button.
![image.png](/.attachments/image-ad14f607-be74-4fe7-a202-19b019c35dcf.png)

![image.png](/.attachments/image-ffaea10c-166e-4ad7-ae65-26010bad5ad5.png)
![image.png](/.attachments/image-758dc46e-24b1-4f2b-89ef-e330eae0344e.png)
![image.png](/.attachments/image-8cf3e7e8-1d58-4249-8c45-1eafb24c7abc.png)
![image.png](/.attachments/image-02379e3f-65ff-4281-b04e-57f4df7d61ab.png)
![image.png](/.attachments/image-dbb8cb5d-79c7-45dd-9b23-71fe0437433d.png)

## 8. What kinds of support data that Zebra AI can offer?

For a high-level overview, check out our [Dataflow](/Reference/Data/Dataflow). For more details, there are additional resources in the [Data](/Reference/Data) section of our wiki. 

## 9.  How to handle the JIT when we use the ZebraAI? Can ZebraAI access the crisit cases?

JIT is not required in ZebraAI. There are few limitations regarding which cases an experiment may access once it is approved for CSS access, and those depend on restrictions. For more information on excluded cases, see [Restricted Access Case Exclusion](/Reference/Data/Restricted-Access-Case-Exclusion). 

## 10. What is the future plan for Zebra AI? 

The best way to stay up to date with our roadmap is to join our Teams channels ([General | ZebraAI | Microsoft Teams](https://teams.microsoft.com/l/team/19%3A1Pvl3cRXmwYrC0nv1jFV7NZj6qQLGbgv0EeGvg6swqc1%40thread.tacv2/conversations?groupId=af998ff3-0fad-4654-b368-5249e20ada9e&tenantId=72f988bf-86f1-41af-91ab-2d7cd011db47)) or attend our [ZebraAI Open Office Hours](/Community-and-Support/ZebraAI-Open-Office-Hours). 

## 11. The current token is limited, can we let Zebra AI product team to increase the token?

Token limits are based on the model selected for your experiment and are not specific to ZebraAI.


## 12. How is data access restricted to ensure compliance? 

Users do not have direct access to fields requiring 3.0+ access. Actions such as summarization or evaluation are required, changing the data classification from support data to MS Business data before exposure to the end-user. Additional restrictions include prohibiting searches based on Customer Name, Employee Alias, etc.

## 13. How do you handle freeform text fields?

- PII scrubbing is conducted by Cornerstone and our team, which may result in some non-PII data being scrubbed.

- Data fields are normalized by removing extraneous data like excessive delimiters.

- Due to model token limitations, all fields are capped at 400,000 characters.


## 14. What are the current limitations of the system?

- **Data Availability:** We rely on source teams for data, often focused only on the current state of a case. This can lead to inconsistencies due to outdated or incorrect calculations.

- **Data Accessibility:** Azure AI Search is used for data retrieval, which, while fast, lacks the ability to relate or join data, requiring manual normalization of relationships like CaseNotes and Emails.


## 15. Is there a learning course for ZebraAI?

Yes, you can take the [Zebra AI Learning Path](https://aka.ms/ZebraAITraining), which currently exists within Microsoft Learning.
This Learning Path will help learners use Zebra AI to browse, create and manage experiments, as well as understand the basics of Prompt Engineering and API usage within Zebra AI.

Course topics include:

- ZebraAI Fundamentals
- ZebraAI Prompt Engineering
- ZebraAI - API Use

## 16. How do I query for not null data within the Advanced Query Interface?
- Be sure you are filtering on a value that can be filtered
- When using the advanced query: Use "ne null" in your filter <br>

**Note:** Be mindful when using lower/upper case <br>
- **Example:** "Filter": "ICMId ne null and ICMId ne 'Unknown'", <br>
- **Example:** "Filter": "ICMId ne null",

## 17. My experiment is locked. How do I edit real CSS data that has already been approved?
 Once an experiment is approved in ZebraAI (especially for real CSS data), direct editing of certain fields—most notably the prompt—is restricted.<br>

Most likely you will have to revoke access to CSS data (current experiment or a copy), modify prompt with synthetic data, test. If happy with the output, request CSS data, get approved and API request/approval. <br>More info can be found here: [Revoke CSS Data Usage - Overview](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/114/Revoke-CSS-Data-Usage "https://cnfe.visualstudio.com/zebraai/_wiki/wikis/zebraai/114/revoke-css-data-usage")

## 18. Why are there cases missing from my filtered search results?

Below can be some common scenarios when cases are missing from the search results section of an experiment: <br>

- Certain cases may be excluded due to compliance, privacy, or restricted access rules.
- For Next Day cases, if the cases are over 9 months old, then the data retention policy may be in effect. For NRT, a 6 month data retention policy will be in effect.
- ZebraAI relies on upstream data sources, and there can be a delay (up to 24–72 hours) before new or updated cases appear.
- During platform updates or data migrations, some cases may temporarily not appear in search results.
<br>

**If you believe a case is missing in error, you are encouraged to submit a bug report.**

## 19. Why does my ZebraAI page authentication expire (even when the browser is open)? Or why am I experiencing a Blazor timeout?
Authentication expiration times are set by Microsoft Security and it’s rolled in to EntraID. It's enforced as part of SFI. The recommended setting is around <1 hour for a token but the library should be handling automatic re-auths for 24 hours.

Additionally, if you leave the site open for too long of a long duration it will need to be refreshed. That likely causes an auth loop. That is due to how the framework we use works and is inherit with the system.

## 20. When I run my experiment, why do the results state that a different number of cases were analyzed? Why is there an extra case showing up in my search results?
Example: The results may state that a different number of cases were analyzed (e.g., 26) than the number you actually selected (e.g., 25).

Reason: This can happen when one case is referenced within another. For example, if a case **not** included in your input list mentions the case number of a case that **is** on your list (e.g., within the case notes or text), the case that was **not** originally part of your input may still be returned as “analyzed.”

![image.png](/.attachments/image-d1c38b2d-1007-460a-a0bd-7ba5a8ff01c3.png)


![image.png](/.attachments/image-4f77ba00-da6c-48f7-993d-c5eeec0940b2.png)

## 21. What specific (substitution) parameters can I use within my experiment prompt?
 The list of available "built-in" parameters will depend upon the experiment being used. To review the complete list, review the following:

1. Go to ZebraAI site and select "Create Experiment." 

![image.png](/.attachments/image-a3c0c4da-fe58-4835-a386-4a4e986520c3.png)

<br>
2. Select "User Experience" tab then select the experiment from the drop-down. <br>
<br>

![image.png](/.attachments/image-78dee8c1-d4dd-4ba4-aae6-c9cade58a756.png)
<br>

3. Click on the "Prompt" tab then scroll down and click on the "Available Substitution Parameters" drop-down to reveal the list of available parameters built into the user experience.
<br>

![image.png](/.attachments/image-4001a475-dde7-4bd8-a9bf-cdd977c2e087.png)

## 21. Why am I getting a "Forbidden 403" error when trying to access the ZebraAI site and/or some of the ZebraAI applications through MVD (Microsoft Virtual Desktop)?
A recent change in Microsoft policy now requires vendors to connect to the network via MVD (Microsoft Virtual Desktop). Depending on which connection being used, you may see the 403 connection error when accessing ZebraAI resources. <br>
**Workaround:** Connect your machine to one of the "Microsoft Virtual Desktop **Legacy** Regions".

**Tip:** If you need both Cloud and Legacy for specific applications - You can run separate instances of the Windows App within each monitor, if you have multiple monitors.


![image.png](/.attachments/image-57714b52-58cf-4de3-b2af-c0a1263500f8.png)

## 22. Why is Case Age Days {{CaseAgeDays}} not showing the correct case age and/or correct data?
CaseAgeDays isn't always reliable, depending on the circumstance of the case behind it.
If there aren't any updates to a case it will become stale, as we only process a case if there is a change made within the last 3 days.
To verify the actual CaseAgeDays calculation, **you will need to manually calculate {{CurrentDateTime}} minus created date.**

##12. Where can I find information about open bugs or recent bug history?
Current [issues](https://msit.powerbi.com/groups/fb5b92e7-8d59-46e7-b2ed-2d75ca1b1e97/reports/5bd878d1-b6b8-4691-8e1b-1095e041a7b6/345420779657d04d499f?experience=power-bi) are reported and being addressed.