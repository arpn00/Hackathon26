#TRELLIS AI Central Guide

[**Trellis**](https://mwctrellis.azurewebsites.net) is a robust platform designed to elevate productivity and efficiency of teams across CSS. By harnessing the advanced AI capabilities of ZebraAI, Trellis accelerates issue resolution and enhances customer satisfaction. The USP of Trellis is that it is tailored to meet the unique demands of CSS. It serves as a centralized AI hub, built on Azure Web App, unifying the AI experience for technical and management personas alike. This integration streamlines workflows and eliminates redundant UI development, allowing teams to focus on what truly matters.

![Home Screen](/wiki/imgs/Trellis-Home.png)

## What’s in it for you?

**Engineers:** Quickly find similar cases, resolutions, and troubleshooting steps using the Nostalgic VKB scenario.

**TAs/PTAs:** Streamline processes by uploading list of cases for actionable insights, filter results & get instant AI reviews. Additionally chat with AI for deeper insights.

**Escalation:** Analyse aged or EG-engaged cases with Backlog Analysis or TIE for AI summaries and deeper investigation.

**Managers:** Use Case Recovery for AI-driven insights to prepare for customer recovery calls.

**Leadership:** Leverage Tenant Recovery for a wholistic view of the tenants CSS experience before executive customer calls.

## What’s new & hot in Trellis?

- Chat with AI on the Case Review pop-up window. Ask in-depth questions on AI reviewed cases. *Demo coming soon.*

- AI Review & DfM direct access buttons in Grid view. *Demo coming soon.*

- Simple column filtering enabled in Grid view. *Demo coming soon.*

- Improved Grid view & enabled pagination support. *Demo coming soon.*

- Support for 2500 cases in an Excel file. 

- Support for parallel processing across scenarios & caching across page changes. *Demo coming soon.*

## Usage Tips:

- For bulk processing by uploading an Excel file, we use CaseBuddy's 'Export Approved fields in Grid to Excel' format. The first column must contain the DfM case numbers with an optional title.

- The Excel file sensitivity must be set to Public or General, else the app won't be able to open the file.

- Excel file upload can process up to 2500 cases while text input can process up to 499 cases.

- Table format AI Responses can be exported to an Excel file.

- Latest AI Responses per scenario are cached and available across scenarios.

- The cache is retained till 30 mins of inactivity and then cleared.

- For the AI Review button to work, ensure you have enabled pop-ups for this website in the browser.

- Users should ensure they feed only relevant cases, else expect incorrect results. For example, for the DSAT scenario, feed only DSAT cases.

## Known Limitations/Issues:

- The amazing ZebraAI is our backend & we rely on it to provide us with the latest AI-processed data. So any limitations/issues in ZebraAI will impact Trellis.

- The recommendation is to use cases that are over the age of 5 days so that ZebraAI has indexed them and probably also has scoping information for AI to make an analysis.

- Live/Case data is currently limited to the last six months.

- EUDfM or EUDB data is not available. [Coming soon]

- ZebraAI indexing of case data is typically 48 hrs old and sometimes even longer. [Coming soon: NRT]

- Sometimes ZAI fails with a Bad Request error due to throttling.

- If ZAI fails with a Not Found error, it is probably a EUDB case or a new case not in the ZAI system.

## Experiments

We have successfully onboarded 15 unique experiments, carefully crafted by team members from various global locations, ensuring we address varied critical CSS business needs. Trellis is not just another tool; but a new way to leverage the capabilities of ZebraAI. Trellis will serve as a conduit for innovation, providing valuable insights that will serve as inputs to various CSS AI tools.

Details various scenarios that are already onboarded to Trellis. 

**Classified in 4 Groups:**

- Can be used on all cases

- Health Check 

- Engineering/Escalations

- Delivery Partners

- Custom Experiments

![Trellis Flow](/wiki/imgs/Trellis-Flow.png)

### Experiment Summary

<table style="border: 1px solid black; border-collapse: collapse;">
    <thead style="background-color: lightgray;">
        <tr>
            <th style="border: 1px solid black; padding: 8px;">Name</th>
            <th style="border: 1px solid black; padding: 8px;">Purpose</th>
        </tr>
    </thead>
    <tbody>
        <tr style="background-color: white;">
            <td style="border: 1px solid black; padding: 8px;">Case Documentation</td>
            <td style="border: 1px solid black; padding: 8px;">This prompt is designed to check basic case documentation requirements, which will help reviewers to know if case is on track and has the attention that it requires.</td>
        </tr>
        <tr style="background-color: whitesmoke;">
            <td style="border: 1px solid black; padding: 8px;">Nostalgic VKB</td>
            <td style="border: 1px solid black; padding: 8px;">This prompt is designed to help engineers search for a particular error which will return cases where same or similar error had occurred in past, along with the Resolution, Troubleshooting Steps, Scoping questions. This might help engineers to resolve the issues faster.</td>
        </tr>
        <tr style="background-color: white;">
            <td style="border: 1px solid black; padding: 8px;">Detail Case Review</td>
            <td style="border: 1px solid black; padding: 8px;">This prompt is designed to provide detail Case Review summary with case details, sentiment analysis, case hygiene details, IcM attached to the case, important timelines etc. in formatted output.</td>
        </tr>
        <tr style="background-color: whitesmoke;">
            <td style="border: 1px solid black; padding: 8px;">DfM Case Status</td>
            <td style="border: 1px solid black; padding: 8px;">This prompt is designed to check the case status based on the recent case documentation by engineer or reviewer.</td>
        </tr>
        <tr style="background-color: white;">
            <td style="border: 1px solid black; padding: 8px;">Backlog Analysis</td>
            <td style="border: 1px solid black; padding: 8px;">This prompt is designed to check Aged Case (30+) and provide information on cause of Aging, Potential Solutions & Next Steps that engineers/Reviewers can suggest to get case to resolution asap.</td>
        </tr>
        <tr style="background-color: whitesmoke;">
            <td style="border: 1px solid black; padding: 8px;">Missed SLAs</td>
            <td style="border: 1px solid black; padding: 8px;">This prompt is designed to check on which cases Service Level Agreement was not Met and what factors contributed to an SLA miss of a case.</td>
        </tr>
        <tr style="background-color: white;">
            <td style="border: 1px solid black; padding: 8px;">DP Case Status</td>
            <td style="border: 1px solid black; padding: 8px;">This prompt is designed to check if Delivery Partners cases are Ready to escalate and will also provide reason to escalate.</td>
        </tr>
        <tr style="background-color: whitesmoke;">
            <td style="border: 1px solid black; padding: 8px;">Potential DP Escalation</td>
            <td style="border: 1px solid black; padding: 8px;">This prompt is designed to check which are potential cases of Delivery Partners that are possible escalations to FTEs.</td>
        </tr>
        <tr style="background-color: white;">
            <td style="border: 1px solid black; padding: 8px;">TTE – Time to Engineering</td>
            <td style="border: 1px solid black; padding: 8px;">This prompt is designed to check Product Group was engaged on the case and provides reason with other details on why Engineering was engaged.</td>
        </tr>
        <tr style="background-color: whitesmoke;">
            <td style="border: 1px solid black; padding: 8px;">DSAT Reviews</td>
            <td style="border: 1px solid black; padding: 8px;">This prompt is designed to analyse DSAT cases and provides reason on why DSAT was received on a particular case along with Justification, Preventative Measures and Improvement areas that can be shared with the engineers to avoid DSATs in future.</td>
        </tr>
        <tr style="background-color: white;">
            <td style="border: 1px solid black; padding: 8px;">Potential HomeGrown Critsits</td>
            <td style="border: 1px solid black; padding: 8px;">This prompt is designed to analyse cases which are going to be potential critsit (SevA) from non-crit (SevB/C) by checking sentiment of the case based on recent email interactions and if any Management Intervention is required.</td>
        </tr>
        <tr style="background-color: whitesmoke;">
            <td style="border: 1px solid black; padding: 8px;">Case Recovery</td>
            <td style="border: 1px solid black; padding: 8px;">This prompt is designed to provide case insights to Managers/TA before they jump on a customer recovery or confidence call.</td>
        </tr>
        <tr style="background-color: white;">
            <td style="border: 1px solid black; padding: 8px;">Tenant Recovery</td>
            <td style="border: 1px solid black; padding: 8px;">This scenario is designed to analyse all the cases opened by a specific tenant (opened or closed) and then give a summary & category of where these issues fall. Also shares the customer sentiment for each type of issue.</td>
        </tr>
    </tbody>
</table>
  
For more information please contact **Manas Dani** or **Arijet Kanungo**