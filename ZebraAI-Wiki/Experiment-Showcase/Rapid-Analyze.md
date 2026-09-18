# Rapid Analyze

[**Rapid Analyze**](https://microsoft.sharepoint.com/teams/BizAppsServiceability/SitePages/Rapid-Analyze.aspx) is a SharePoint Page which makes several useful ZebraAI Experiments available to you in a friendly way.  Along with these experiments, the Rapid Analyze site shares helpful information about accessing and using ZebraAI.  

![Rapid Analyze](/wiki/imgs/Rapid-Analyze.png)

Note that the section **OData Query** provides a wealth of useful information on how to use the Advanced (search) Editor.

## Experiments  

Each experiment section provides a quick demo along with descriptions of the business scenarios for which the experiment may be used, and a link to the experiment in ZebraAI, as shown below.

![Rapid Analyze Exp](/wiki/imgs/Rapid-Analyze-2.png)

In the example above, Case Trend Analysis, the experiment can be used to determine case trends for a given SAP or any other Commercial Case data field that may be used as an aggregator. The following is a table of the experiments available with **Rapid Analyze**  

## Experiment Summary Table
<table style="border: 1px solid black; border-collapse: collapse;">
  <tr style="background-color: lightgrey; border: 1px solid black;">
    <th style="border: 1px solid black;">Experimemnt</th>
    <th style="border: 1px solid black;">Opportunity</th>
    <th style="border: 1px solid black;">Experiment Description</th>
  </tr>
  <tr style="background-color: white; border: 1px solid black;">
    <td style="border: 1px solid black;"><a href="https://aka.ms/casesummary">https://aka.ms/casesummary</a></td>
    <td style="border: 1px solid black;">Reviewing cases one by one in DFM is quite time-consuming. With hundreds of cases to analyze for a skill or SAP, getting quick summaries would be much more efficient.</td>
    <td style="border: 1px solid black;">This experiment can be leveraged to independently analyze a set of cases to get detailed analysis on the issue, cause, symptom and resolution ( if a case is in closed state). In addition to detailed analysis, you can get summary table for analysis of each of the case.</td>
  </tr>
  <tr style="background-color: whitesmoke; border: 1px solid black;">
    <td style="border: 1px solid black;"><a href="https://aka.ms/casetrendanalysis">https://aka.ms/casetrendanalysis</a></td>
    <td style="border: 1px solid black;">It’s incredibly challenging to identify a theme by manually reviewing and recalling the details of each case. This experiment accelerates the process by grouping similar cases based on their issues, making it easier to analyze them collectively.</td>
    <td style="border: 1px solid black;">This experiment helps in clustering similar cases together.<br><br>Scenarios:<BR>- Cluster cases to look at weekly trends for a given SAP or a Skill (using CaseNumber in the filter) to identify area within the product that needs to be prioritized for product and documentation improvement.  (SPMs/Beta Engineers)<br>- Cluster cases to discover any anomalies/regressions by doing weekly analysis of cases. (SPMs)<br>- Cluster cases to assist engineering with identifying case volume that doesn't belong to the team so they can identify engineering team that needs to take that volume to deflect those using Alchemy rules. (SPMs)<br>- Cluster cases to look at trends and prioritize creation of learning content for those areas (Beta Engineer)</td>
  </tr>
  <tr style="background-color: white; border: 1px solid black;">
    <td style="border: 1px solid black;"><a href="https://aka.ms/generatecopilotprompts">https://aka.ms/generatecopilotprompts</a></td>
    <td style="border: 1px solid black;">Currently, Beta engineers manually provide feedback by evaluating prompts of support engineer that gave thumbs down for agent copilot. In areas where Betas may lack full awareness, this experiment can assist by generating useful prompts. These can then be suggested to engineers as part of the Copilot feedback project.</td>
    <td style="border: 1px solid black;">This experiment helps in generating prompts that a support agent might use to ask the DfM Copilot for help in troubleshooting a case or a beta engineer can use to provide feedback to CSS when they use bad prompts as part of Copilot Feedback project.</td>
  </tr>
  <tr style="background-color: whitesmoke; border: 1px solid black;">
    <td style="border: 1px solid black;"><a href="https://aka.ms/dtcanalysis">https://aka.ms/dtcanalysis</a></td>
    <td style="border: 1px solid black;">Manually reviewing each case in DFM to determine why it took longer to resolve by going through case notes and email transcripts is very time-consuming for SPMs. This experiment accelerates the process by identifying reasons for delays in case closures, making it much more efficient.</td>
    <td style="border: 1px solid black;">This experiment helps in Analyzing long running case for a given skill to identify key reasons for delayed closure of the case.<br><br>Outcome:<br>- Support Training on complex topic<br>- Raising issues to PG if delay reason is due to wait time on PG<br>- Raising bug cases to engineering to prioritize them if Cx doesn't want to close case until bug is fixed<br>- Creating internal TSG on cases where delay is due to complexity<br>- Refine ML models to get case to the right team ( IAPP efforts)</td>
  </tr>
  <tr style="background-color: white; border: 1px solid black;">
    <td style="border: 1px solid black;"><a href="https://aka.ms/casetransferanalysis">https://aka.ms/casetransferanalysis</a></td>
    <td style="border: 1px solid black;">Multiple transfers between teams can increase the Days to Close (DTC). This experiment helps by providing summaries that explain why cases were transferred between multiple teams, streamlining the analysis process.</td>
    <td style="border: 1px solid black;">This experiment helps in analyzing why a case was transferred between different teams. Is it because of engineer availability, because of region needs, complexity of issue, misroute etc.
Knowing reasons behind case transfers helps in identifying gaps to reduce DTC (days to close) and customer pain time.</td>
  </tr>
  <tr style="background-color: whitesmoke; border: 1px solid black;">
    <td style="border: 1px solid black;"><a href="https://aka.ms/insightfulimprovements">https://aka.ms/insightfulimprovements</a></td>
    <td style="border: 1px solid black;">As part of the Redzone effort, supportability collaborates closely with engineering to identify internal TSG/Public documentation and product feature improvement needs. Making sense of the vast amount of data to generate work items is challenging. Previously, we hired vendor SPMs to assist with this task, but it wasn’t beneficial. This experiment accelerates the process and reduces the budget by eliminating the need for additional resources, allowing us to scale efforts and prioritize skills that need attention more effectively.</td>
    <td style="border: 1px solid black;">This experiment helps you identify process/Document/Product improvement opportunities and provides you metric on impact.</td>
  </tr>
  <tr style="background-color: white; border: 1px solid black;">
    <td style="border: 1px solid black;"><a href="https://aka.ms/supportrequesttype">https://aka.ms/supportrequesttype</a></td>
    <td style="border: 1px solid black;">There is a need to differentiate advisory case from break fix case to find Public doc opportunities.</td>
    <td style="border: 1px solid black;">This experiment determines if the case is advisory case or a breakfix case.</td>
  </tr>
  <tr style="background-color: whitesmoke; border: 1px solid black;">
    <td style="border: 1px solid black;"><a href="https://aka.ms/icmtrendanalysis">https://aka.ms/icmtrendanalysis</a></td>
    <td style="border: 1px solid black;">To identify need of internal tsg or Unify improvements , it’s important to analyze and cluster ICMs so we know where engineer needs help.</td>
    <td style="border: 1px solid black;">ICM trend analysis experiment clusters similar ICMs together .</td>
  </tr>
  <tr style="background-color: white; border: 1px solid black;">
    <td style="border: 1px solid black;"><a href="https://aka.ms/backloganalysis">https://aka.ms/backloganalysis</a></td>
    <td style="border: 1px solid black;">It’s important to hold Delivery and Engineering accountable to move the long running cases along to improve DTC metric.</td>
    <td style="border: 1px solid black;">This experiment summarizes support cases in a table format giving high overview of all the cases and provides detailed case analysis along with if action is pending on engineering, support engineer or customer. This helps in faster analysis, saving tremendous time in having to log into DFM for individual case analysis.</td>
  </tr>
  <tr style="background-color: whitesmoke; border: 1px solid black;">
    <td style="border: 1px solid black;"><a href="https://aka.ms/WikiCategorization">https://aka.ms/WikiCategorization</a></td>
    <td style="border: 1px solid black;">This experiment assists in categorizing wiki and tells if it is customer ready or not. We are currently exploring this experiment to assist with knowledge harvesting project for Engineering to see if we can quickly classify the internal wikis and tag them as suitable for External documentation. This will assist in increasing SHS.</td>
    <td style="border: 1px solid black;"></td>
  </tr>
  <tr style="background-color: white; border: 1px solid black;">
    <td style="border: 1px solid black;"><a href="https://zebra-ai-web-prd.ait.microsoft.com/CommercialSearchCaseExp/4ddd28f2-a0bb-46b5-8f5a-bd5169d88ec6">ZebraAI - Insightful Improvements - Alchemy Solution Suggestions (Rapid Analyze using ZebraAI)</a></td>
    <td style="border: 1px solid black;">There is a need to write good alchemy solution to defelct customer queries using case solution.</td>
    <td style="border: 1px solid black;">This experiment analyzes support cases to identify the root causes of customer issues and detect recurring problem patterns and suggests self help content.</td>
  </tr>
</table> 

For more information contact [Aditi Mohpal](mailto:admohpal@microsoft.com)  , [Sonu Sharma](mailto:sosharma@microsoft.com)
