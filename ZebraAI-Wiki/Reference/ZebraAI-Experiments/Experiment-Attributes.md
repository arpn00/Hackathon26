# Experiment Attributes

The table below includes the attributes used by ZebraAI to describe the nature of experiments.

<table>
    <tr style="font-weight: bold; text-align: left; background-color: lightgrey;">
      <td style="border: 1px solid black; padding: 8px;">Used In</td>
      <td style="border: 1px solid black; padding: 8px;">ZebraAI Attribute</td>
      <td style="border: 1px solid black; padding: 8px;">Description</td>
      <td style="border: 1px solid black; padding: 8px;">Control</td>
      <td style="border: 1px solid black; padding: 8px;">Valid Values</td>
      <td style="border: 1px solid black; padding: 8px;">Notes</td>
    </tr>
        <tr>
      <td style="border: 1px solid black; padding: 8px;">Create Experiment</td>
      <td style="border: 1px solid black; padding: 8px;">*Owner/Creator</td>
      <td style="border: 1px solid black; padding: 8px;">The person who owns and maintains the experiment. Inferred from ZebraAI site.</td>
      <td style="border: 1px solid black; padding: 8px;"></td>
      <td style="border: 1px solid black; padding: 8px;">*Inferred from experiment owner</td>
      <td style="border: 1px solid black; padding: 8px;"></td>
    </tr>
<tr style="background-color: whitesmoke;">
      <td style="border: 1px solid black; padding: 8px;">Create Experiment</td>
      <td style="border: 1px solid black; padding: 8px;">*Data Classification</td>
      <td style="border: 1px solid black; padding: 8px;">The specific classification of data used for the experiment. Infered from ZebraAI site based on UX type and substitution parameters used.</td>
      <td style="border: 1px solid black; padding: 8px;"></td>
      <td style="border: 1px solid black; padding: 8px;">*Inferred based on experiment UX and parameters used in experiment</td>
      <td style="border: 1px solid black; padding: 8px;"></td>
    </tr>
<tr>
      <td style="border: 1px solid black; padding: 8px;">Create Experiment</td>
      <td style="border: 1px solid black; padding: 8px;">Experiment Name</td>
      <td style="border: 1px solid black; padding: 8px;">Unique title that describes the experiment.</td>
      <td style="border: 1px solid black; padding: 8px;">Free-text</td>
      <td style="border: 1px solid black; padding: 8px;"></td>
      <td style="border: 1px solid black; padding: 8px;"></td>
    </tr>
      <tr style="background-color: whitesmoke;">
      <td style="border: 1px solid black; padding: 8px;">Create Experiment</td>
      <td style="border: 1px solid black; padding: 8px;">Description</td>
      <td style="border: 1px solid black; padding: 8px;">Written explanation of the experiment and what it does.</td>
      <td style="border: 1px solid black; padding: 8px;">Free-text</td>
      <td style="border: 1px solid black; padding: 8px;"></td>
      <td style="border: 1px solid black; padding: 8px;"></td>
    </tr>
    <tr>
      <td style="border: 1px solid black; padding: 8px;">Create Experiment</td>
      <td style="border: 1px solid black; padding: 8px;">Share Level</td>
      <td style="border: 1px solid black; padding: 8px;">The level at which an experiment is shared. </td>
      <td style="border: 1px solid black; padding: 8px;">Drop-down</td>
      <td style="border: 1px solid black; padding: 8px;">Challenge<br> Hackathon<br> Private<br> Sample<br> Shared<br> Showcase</td>
      <td style="border: 1px solid black; padding: 8px;">Shared means the experiment is visible to everyone in the community, and Private only allows the owner to view the experiment. Challenge, Hackathon, Sample, and Showcase experiments show up in the relevant experiment sections.</td>
    </tr>
    <tr style="background-color: whitesmoke;">
      <td style="border: 1px solid black; padding: 8px;">Create Experiment</td>
      <td style="border: 1px solid black; padding: 8px;">User Experience</td>
      <td style="border: 1px solid black; padding: 8px;">The user interface used to interact with a data source.</td>
      <td style="border: 1px solid black; padding: 8px;">Drop-down</td>
      <td style="border: 1px solid black; padding: 8px;white-space: nowrap">
Bring Your Own ADO Data UX<br> 
Bring Your Own ADO Wiki UX<br> 
Bring Your Own File Data UX<br> 
Bring Your Own SQL Data UX<br> 
Commercial + VBD Vector Search UX<br>
Commercial Case + ICM Case Search<br>
Commercial Case + KM Content Search <br>
Commercial Case Embeddings Search<br>
Commercial Case Lookup<br> 
Commercial Case NRT Lookup (BETA2)<br>
Commercial Case Search<br> 
Commercial Vector Case Review UX<br> 
Consumer Case + KM Content Search<br> 
Consumer Case Lookup<br> 
Consumer Case Search<br> 
CPR Search<br> 
Function/Tool User<br> 
ICM Search<br> 
KM Content Search<br> 
Simple Prompt UX<br> 
Smart Commentary <br>
Translator UX</td>
      <td style="border: 1px solid black; padding: 8px;"></td>
    </tr>
    <tr>
      <td style="border: 1px solid black; padding: 8px;">Create Experiment</td>
      <td style="border: 1px solid black; padding: 8px;">Model</td>
      <td style="border: 1px solid black; padding: 8px;">The OpenAI model used by the experiment.</td>
      <td style="border: 1px solid black; padding: 8px;">Drop-down</td>
      <td style="border: 1px solid black; padding: 8px;white-space: nowrap">GPT-5<BR>GPT-5-mini<br>GPT-5-nano<br>GPT-4o-mini<br> GPT-4o<BR>GPT-o1<BR> GPT-o1-mini<br> GPT-o3-mini<br> GPT-o4-mini<br> GPT-4.1<br> GPT-4.1-mini<br> GPT-4.1-nano<br> Phi-4<br> Grok-3</td>
      <td style="border: 1px solid black; padding: 8px;"></td>
    </tr>
    <tr style="background-color: whitesmoke;">
      <td style="border: 1px solid black; padding: 8px;">CSS Data Use Request</td>
      <td style="border: 1px solid black; padding: 8px;">Hypothesis</td>
      <td style="border: 1px solid black; padding: 8px;">The idea to be evaluated through an experiment. What is being tested and how is the experiment being evaluated?</td>
      <td style="border: 1px solid black; padding: 8px;">Free-text</td>
      <td style="border: 1px solid black; padding: 8px;">Sample text for free-text field:<br> We have observed <user input>. We want to change or prove <user input>. This should result in <user input> which will be measured by <user input>.</td>
      <td style="border: 1px solid black; padding: 8px;">A good hypothesis has three main components:<br><strong>Comprehension</strong> – Identifying something that can be improved upon<br><strong>Response</strong> – Change that can cause improvement<br><strong>Outcome</strong> – Measurable result of change that determines success</td>
    </tr>
    <tr>
      <td style="border: 1px solid black; padding: 8px;">CSS Data Use Request</td>
      <td style="border: 1px solid black; padding: 8px;">Lifecycle Stage</td>
      <td style="border: 1px solid black; padding: 8px;">The lifecycle stage of an experiment starting from ideation to production.</td>
      <td style="border: 1px solid black; padding: 8px;">Drop-down</td>
      <td style="border: 1px solid black; padding: 8px;white-space: nowrap">Ideation<br> Experimentation<br> Testing/Proof of Concept (POC)<br> Completed<br> Extended<br> On Hold</td>
      <td style="border: 1px solid black; padding: 8px;"><strong>Ideation:</strong> Generate a creative idea to test and formulate a hypothesis.<br><strong>Experimentation:</strong> Build an experiment that enables the ability to test hypothesis.<br><strong>Testing/Proof of Concept (POC):</strong> Test the experiment with users to validate hypothesis.<br><strong>Completed:</strong> Experiment is actively used by users.<br><strong>Extended:</strong> Experiment has been extended outside of ZebraAI.<br><strong>On Hold:</strong> Experiment on hold.</td>
    </tr>
    <tr style="background-color: whitesmoke;">
           <td style="border: 1px solid black; padding: 8px;">CSS Data Use Request</td>
      <td style="border: 1px solid black; padding: 8px;">Target Audiences</td>
      <td style="border: 1px solid black; padding: 8px;">Key audience that benefits from the experiment.</td>
      <td style="border: 1px solid black; padding: 8px;">Multi-Select</td>
      <td style="border: 1px solid black; padding: 8px;white-space: nowrap">Account Management<br>Business and Data Analytics<br>Data & Applied Sciences<br>Delivery Partners<br>Engineering<br>Product & Program Management<br>Support Delivery<br>Support Management<br>Support Planning<br>Technical Advisors<br>Other</td>
      <td style="border: 1px solid black; padding: 8px;">Other allows for free text</td> 
    </tr>
    <tr>
 <td style="border: 1px solid black; padding: 8px;">CSS Data Use Request</td>
      <td style="border: 1px solid black; padding: 8px;">Target Business Unit/LOB</td>
      <td style="border: 1px solid black; padding: 8px;">Microsoft business unit (SBU) & Line of business (LOB) that benefits from the experiment.</td>
      <td style="border: 1px solid black; padding: 8px;">Multi-Select</td>
      <td style="border: 1px solid black; padding: 8px;white-space: nowrap">Apps and Infrastructure (A&I)<br>A&I/Azure Core<br>A&I/DAS<br>A&I/DTP<br>A&I/Windows Commercial<br>Advocacy and ​Customer Trust​ (ACT)<br>Delivery ​Operations<br>Modern Solutions and Support (MSS)<br>MSS/CAPS<br>MSS/MLGCS<br>MSS/MW<br>Other<br>Security, Compliance, Identity and Management​ (SCIM)<br>SCIM/Identity and Access<br>SCIM/Management Solutions<br>SCIM/Security and Compliance<br>Strategy, Planning and Employee Engagement<br>Technology Strategy ​& Innovation​(TS&I)<br>TS&I​/AIT<br>TS&I/ASP<br>TS&I/Communities<br>​TS&I/PICK</td>
      <td style="border: 1px solid black; padding: 8px;">Other allows for free text</td>
    </tr>
    <tr style="background-color: whitesmoke;">
     <td style="border: 1px solid black; padding: 8px;">CSS Data Use Request</td>
      <td style="border: 1px solid black; padding: 8px;">Impact Metrics</td>
      <td style="border: 1px solid black; padding: 8px;">Qualitative or quantitative measures the experiment is impacting.</td>
      <td style="border: 1px solid black; padding: 8px;">Free-text</td>
      <td style="border: 1px solid black; padding: 8px;"></td>
      <td style="border: 1px solid black; padding: 8px;">Qualitative experiments measure non-numerical data such as feelings, opinions, or experiences. Quantitative experiments measure numerical data that can be quantified and analyzed statistically.</td>
    </tr>
    <tr>
      <td style="border: 1px solid black; padding: 8px;">CSS Data Use Request</td>
      <td style="border: 1px solid black; padding: 8px;">Initiative/Driver</td>
      <td style="border: 1px solid black; padding: 8px;">Projects and existing initiatives the experiment connects to for dependencies or a time or event driven experiment (i.e., CrowdStrike)</td>
      <td style="border: 1px solid black; padding: 8px;">Free-text</td>
      <td style="border: 1px solid black; padding: 8px;"></td>
      <td style="border: 1px solid black; padding: 8px;"></td>
    </tr>
</table>

