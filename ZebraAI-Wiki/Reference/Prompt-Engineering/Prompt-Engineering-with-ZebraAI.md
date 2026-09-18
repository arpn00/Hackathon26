# Prompt Engineering with ZebraAI v2

### A guide to best practices for creating effective prompts using ZebraAI

[[_TOC_]]


## Introduction

ZebraAI is an AI for Support experimentation platform that allows users to quickly test hypotheses or ideas through prompt engineering that interacts with different types of customer support data and Large Language Models (LLMs) in a secure, compliant way. ZebraAI enables users to quickly explore and assess many different scenarios and use cases, such as summarization, recommendation, prediction, content creation, and more.

This document provides an overview of prompt engineering in ZebraAI, designed to be accessible for beginners. It includes simple techniques and examples to help users quickly get started with prompt engineering in ZebraAI. All prompts described in this document can be used in ZebraAI. Many of the sample prompts are available as ZebraAI experiments.

## ZebraAI Experiments

Before getting started it’s important to understand what a ZebraAI experiment consists of. There are 5 core components:

1. **LLM**: The latest production LLMs. i.e., GPT 3.5 Turbo, GPT 4, and GPT4o.
2. **Experiment UX**: Enables the ability to fetch data from different data sources for use in an experiment.
3. **Data**: There are many diverse types of support data available, plus there are options to Bring Your Own Data (BYOD).
4. **Prompt**: Detailed description of desired output expected from the model.
5. **Model Parameters**: Used to control the behavior of LLM models. i.e., Temperature, Top-P, Frequency Penalty, and Presence Penalty.

For additional information about ZebraAI check out the [Guide to ZebraAI wiki](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/93/Overview).  

## Prompt Engineering

A prompt, in its simplest form, is an instruction or input provided to an AI model to produce a specific output. It serves as a guiding structure for AI systems, providing them with a starting point to generate coherent and contextually pertinent responses. Formulating a prompt for an AI is like giving detailed instructions to a young child, specifying the steps to be taken and the desired outcome.

Effective prompt engineering is essential for guiding AI models like Azure OpenAI. Creating clear, specific prompts helps bridge the communication gap between humans and machines, leading to accurate and personalized results. Techniques such as providing explicit instructions and specifying the desired format can optimize prompts. By refining prompts iteratively, users can achieve more precise and relevant responses from the language model.

All prompts shared in this document can be used in ZebraAI.

## Elements of an Effective Prompt

### Write Clear and Specific Instructions

To get accurate and relevant responses, provide clear and specific instructions, avoid ambiguity, and use longer prompts for more clarity and context. The four main tactics to achieve this are using delimiters, requesting structured output formats, instructing the model to check conditions, and using “few-shot” prompting with examples.

- **Be specific**: Provide detailed information to help the language model understand your request.
- **Use natural language**: Utilize common vocabulary and grammar as if you were asking a human.
- **Use Delimiters**: Delimiters help distinguish distinct parts of the input. Use delimiters like [ ], < >, or # #.
- **Structured output**: Clearly specify the format of the desired output. Helps the model organize and present the response accordingly.
- **Use examples (few-shot prompting)**: Give sample inputs/outputs to illustrate what you expect. Promotes consistency and style adherence.
- **Provide definitions**: Define any domain-specific terminology or acronyms to avoid misinterpretation.
- **Maintain simplicity**: Keep instructions concise and straightforward, avoiding complex jargon or terminology.

### Give the Model Time to Think

To enhance response accuracy, allow sufficient processing time for complex tasks. Specify the steps gradually to provide clear guidance. Avoid rushing to conclusions and encourage the model to work out its own solution before evaluation. These tactics lead to better outcomes and effective interactions with the model.

- **Check for Specific Conditions**: Tailor the response based on the identified conditions. Useful for reformatting instructions or detecting patterns.
- **Audience**: Provides the context of who will be using the prompt, or output enables the LLM to target them.
- **Why**: Gives the LLM the reason for the prompt.
- **Expectations**: Instructs the LLM with the intent of the prompt.
- **Specify the Steps**: Clearly outline the steps for the model to follow. If you want the LLM to follow certain logic or interrupt inputs in a deterministic way.
- **Instruct the Model to Work Out Its Own Solution**: Encourages critical thinking and reduces biases in output. Yields more thoughtful and unbiased responses.

## Prompt Components

### Model Parameters

Model parameters determine how a large language model (LLM) functions. Adjusting certain parameters can produce different outcomes for prompts. Modifying these settings is crucial to enhance the consistency and suitability of responses, and it may require some experimentation to identify the appropriate configurations for specific use cases.

- **Temperature**: Controls randomness in the model’s output. A higher temperature makes the responses more creative, while a lower temperature makes the output more focused and deterministic. Lower temperature value for tasks that require more factual and concise responses. For creative tasks, it might be beneficial to increase the temperature value.
- **Top P**: Instead of choosing from all possible word predictions, top p sampling limits the model’s choices to the most probable outcomes, which helps create more coherent and relevant responses. For exact and factual answers keep top p low. For more diverse responses, increase to a higher value.
- **Frequency Penalty**: Applies on the next token proportional to how many times that token already appeared in the response and prompt. The higher the frequency penalty, the less likely a word will appear again. This setting reduces the repetition of words in the model's response by giving tokens that appear more a higher penalty.
- **Presence Penalty**: Applies a penalty on repeated tokens but, unlike the frequency penalty, the penalty is the same for all repeated tokens. A token that appears twice and a token that appears 10 times are penalized the same. This setting prevents the model from repeating phrases too often in its response. If you want the model to generate diverse or creative text, you might want to use a higher presence penalty. Or, if you need the model to stay focused, try using a lower presence penalty.

The general recommendation is to alter temperature or Top P but not both. Similarly, it is recommended to alter the frequency or presence penalty but not both.

## Roles

Utilizing roles ensures that conversations remain clear and structured. Roles facilitate the management of interactions between users and AI, whether in executing instructions, generating responses, or establishing context. While these interactions do not directly train the model, they guide it to respond appropriately within the context provided. Roles enable the AI to maintain distinct separations between different types of context, such as rules versus instructions.

### System

The system role provides setup information or context that guides the AI's behavior. This can include instructions or guidelines on how the conversation should proceed. The system role sets the stage for the final instructions given by the user role. For example, if the AI needs to adopt a specific persona or follow rules such as avoiding certain topics.

### User

The user role represents a human interacting with the AI. When sending a message with the user role, we’re essentially simulating a user’s input in the conversation. The AI will interpret this message as coming from the user and generate a response accordingly.

### Assistant

The assistant role represents the AI itself. This message contains AI-generated content that serves as the response to the user’s input.

## Instructions

Instructions are fundamental to prompt engineering. They guide the model's actions. Though straightforward in theory, instructions can be intricate in execution. The examples provided below illustrate both straightforward and complex instructions, presented in two distinct formats.

### [Simple Instructions](https://zebra-ai-web-prd.ait.microsoft.com/SimpleExperiment/edd81c2b-04c1-4328-a1dc-4b8b97d836d4)

```
Prompt:  
{
  "Messages": [
    {
      "Role": "user",
      "Content": "Provide me with information about Microsoft Customer Support."
    }
  ]
}


Result:
Certainly! Microsoft Customer Support provides assistance for a wide range of Microsoft products and services, including Windows, Office, Xbox, Surface, and more. Here are some key details about Microsoft Customer Support:

Channels of Support:

Online Help and Support Articles: Microsoft offers extensive online resources, including FAQs, troubleshooting guides, and how-to articles available on their official support website.
Community Forums: Microsoft Community is a platform where users can ask questions and share solutions with other users and Microsoft experts.
Live Chat and Virtual Agent: For certain issues, users can engage in live chat with a support agent or use a virtual agent available on the Microsoft support website.
Phone Support: Users can contact Microsoft support by phone for more personalized assistance. Phone numbers vary by region and product.
Email Support: For some products and services, email support may be available.
Social Media: Microsoft also provides support through social media platforms like Twitter (@MicrosoftHelps).

Specialized Support:

Windows Support: Assistance for Windows operating systems, updates, installations, and troubleshooting.
Office Support: Help with Office applications such as Word, Excel, PowerPoint, and Outlook.
Xbox Support: Support for Xbox consoles, games, subscriptions, and account management.
Surface Support: Assistance for Surface devices, including hardware and software issues.
Azure Support: Technical support for Azure cloud services, available through various support plans.
Dynamics 365 Support: Help for Dynamics 365 applications, including setup, troubleshooting, and optimization.

...  

For the most accurate and up-to-date information, always refer to the official Microsoft Support website or contact Microsoft directly through their recommended channels.
```
  
### [Complex Instructions](https://zebra-ai-web-prd.ait.microsoft.com/SimpleExperiment/4ef87354-a51a-429f-b40a-93c2ea14b506)  

```
Prompt:  
{
  "Messages": [
    {
      "Role": "user",
      "Content": "Provide me with information about all the products in M365 and provide the versions that are currently being supported."
    }
  ]
}


Result:
Microsoft 365 (M365) is a comprehensive suite of cloud-based productivity and collaboration tools that includes a variety of applications and services. As of the latest information available up to October 2023, here are the primary products within the M365 suite along with their current versions and support status:

Office Applications:
Microsoft Word
Current Version: Microsoft Word for Microsoft 365 (Office 2021 for non-subscription versions)
Support: Regular updates for M365 subscribers
Microsoft Excel
Current Version: Microsoft Excel for Microsoft 365 (Office 2021 for non-subscription versions)
Support: Regular updates for M365 subscribers
Microsoft PowerPoint
Current Version: Microsoft PowerPoint for Microsoft 365 (Office 2021 for non-subscription versions)
Support: Regular updates for M365 subscribers
Microsoft Outlook
Current Version: Microsoft Outlook for Microsoft 365 (Office 2021 for non-subscription versions)
Support: Regular updates for M365 subscribers
Microsoft OneNote
Current Version: OneNote for Microsoft 365
Support: Regular updates for M365 subscribers
Microsoft Access
Current Version: Microsoft Access for Microsoft 365 (Office 2021 for non-subscription versions)
Support: Regular updates for M365 subscribers
Microsoft Publisher
Current Version: Microsoft Publisher for Microsoft 365 (Office 2021 for non-subscription versions)
Support: Regular updates for M365 subscribers  
  
...  

It's important to note that Microsoft 365 is a subscription-based service, and Microsoft continuously updates and improves the applications and services as part of the subscription. The versions mentioned above reflect the latest updates and features available to subscribers as of October 2023. For the most current information, subscribers should refer to the official Microsoft 365 documentation and release notes.
```

## Primary Content  

Primary content is text or data that is being processed or transformed by the model. Primary content is used in conjunction with instructions. A simple example would be language translation. In the example below, the English text is the Title of a support article and would be considered the primary content while “Translate into Spanish:” is an instruction.  

### [Prompt With Content](https://zebra-ai-web-prd.ait.microsoft.com/ContentSearchExp/0a0ed94f-f1c2-4914-8481-0d3d5f64e8f7)

This example uses the Content Search UX - AI Experiment. This experiment type allows users to content search and then inject data from the content into the prompt. To run this sample, perform a search using a keyword like “security”, then select content to run the prompt against from the data table. See screenshot below.

![Prompt content](/wiki/imgs/Prompt-with-content.png)

In this example, the role of "system" is introduced. The system role is typically utilized for providing data, guardrails, definitions, or any context-setting elements. Conversely, the user role is designated to provide the instructions that the LLM needs to follow. Additionally, a data substitution parameter, @{Title}, is introduced in this instance. This substitution parameter injects data from the column(s) for the item(s) selected in the data table. The prompt will be executed for each item selected in the data table. Therefore, if four items are selected, the prompt will run four times, once for each selected item. The screenshot below highlights the substitution parameters for the Content Search UX – AI Experiment. Each experiment type has its own set of substitution parameters.

![Prompt content 2](/wiki/imgs/Prompt-with-content-2.png)
```
Prompt:
{
  "Messages": [
    {
      "Role": "system",
      "Content": "@{Title}",
      "Image": null
    },
    {
      "Role": "user",
      "Content": "Translate into Spanish.",
      "Image": null
    }
  ]
}


Result:
"Modernizar rápidamente la postura de seguridad."

```
### Prompt With Data

A more intricate example involves utilizing data, such as chat support data, and applying instructions to interpret the information contained within the data. The following example employs a comma-separated (CSV) file that comprises chat support data. Additionally, JSON and Markdown are recommended file formats for this purpose. The table below contains the data from the [Chat Tabular Data Sample.csv](https://microsoftapc.sharepoint.com/:x:/t/ZebraAI/EbqWnFE-bHtGi8jvk41s7r8BOMjZhs9yWgdaplzKSZBveg?e=OkcIuS) sample file used by this sample.

| FiscalMonthShortName | Case Volume - Initial | Chat Volume | Chat Volume % | Customer Engaged Volume | Customer Engaged Rate | Engineer Accepted Volume | Engineer Accepted Rate | Abandon Volume |
|----------------------|-----------------------|-------------|---------------|-------------------------|-----------------------|--------------------------|------------------------|----------------|
| Nov FY24             | 511,906               | 10,386      | 2.00%         | 8,783                   | 84.60%                | 7,496                    | 72.70%                 | 2,113          |
| Dec FY24             | 416,464               | 7,354       | 1.80%         | 5,371                   | 73.00%                | 4,766                    | 65.50%                 | 1,278          |
| Jan FY24             | 536,884               | 9,510       | 1.80%         | 8,010                   | 84.20%                | 7,111                    | 75.50%                 | 2,113          |
| Feb FY24             | 526,614               | 9,426       | 1.80%         | 7,795                   | 82.70%                | 6,980                    | 74.60%                 | 1,278          |
| Mar FY24             | 520,437               | 10,703      | 2.10%         | 9,765                   | 91.20%                | 8,136                    | 75.70%                 | 2,113          |
| Apr FY24             | 38,564                | 710         | 1.80%         | 638                     | 89.90%                | 552                      | 76.70%                 | 1,278          |

In this context, a data substitution parameter, @{InsertDocuments}, is utilized to insert data from the CSV file into the prompt. This illustrates how the CSV file data is incorporated into the prompt. When employing synthetic data or conducting a BYOD experiment, the Input toggle can be enabled to observe the information transmitted to OpenAI. If the experiment is approved for CSS Data, then the Input toggle option is not available for debugging purposes.  


![Prompt content](/wiki/imgs/Prompt-with-data.png)  

The prompt includes references to specific column and row headers. The prompt can directly refer to those headers to indicate which data the AI should use in its response.

```
Prompt:
{
  "Messages": [
    {
      "Role": "system",
      "Content": "@{InsertDocuments}",
      "Image": null
    },
    {
      "Role": "user",
      "Content": "What is the Chat Volume for Dec FY24?\nWhat is the average Chat CSAT from Nov FY24 to Apr FY24?",
      "Image": null
    }
  ]
}
```

Please note the use of '\n'. This instructs the prompt to insert a newline, thereby enabling the provision of multiple lines of text.  

```
Result:
The Chat Volume for Dec FY24 is 7,354.
To calculate the average Chat CSAT from Nov FY24 to Apr FY24:
Sum the Chat CSAT values from Nov FY24 to Apr FY24: 4.59 + 4.61 + 4.65 + 4.66 + 4.60 + 4.87 = 27.98
Divide the sum by the number of months (6): 27.98 / 6 = 4.6633 (rounded to four decimal places)
Therefore, the average Chat CSAT from Nov FY24 to Apr FY24 is approximately 4.6633.

```

## Supporting Content

Supporting content consists of information that the model can employ to inform and refine its output. Unlike primary content, supporting content is not the main focus of the instruction but serves as additional context. For instance, in the example below, supporting content aids in categorizing support cases by using a predefined classification tree provided in a system prompt. Without this supporting content, the model would infer classifications based solely on the provided data. The inclusion of supporting content ensures accuracy and consistency. After the prompt has been run for every case selected, a follow-up prompt is used to aggregate the results from the initial prompt in a table.

There are a couple of new items to introduce in this prompt. The first is the use of delimiters, `# DATA #`, to define sections of your prompt. Think of delimiters sort of like defining a global variable in code. And then there is the introduction of a follow-up prompt.

Delimiters are a prompt engineering concept introduced by Sheila Teo, who won Singapore's first GPT-4 Prompt Engineering competition. You can explore the [full deep dive into the strategies](https://medium.com/towards-data-science/how-i-won-singapores-gpt-4-prompt-engineering-competition-34c195a93d41#8f6a) Sheila uses when working with LLMs. Delimiters are useful for referring to parts of your prompt and improving its readability. There is no predefined terminology required for delimiters. The example uses `#` signs on either side of the delimiter name, but these could be any other symbols. It is recommended to evaluate different delimiters to ensure they work as intended.

Follow-up prompts are utilized to process the output generated from initial prompts. One effective application of follow-up prompts, as demonstrated in this example, is aggregation. Another valuable use of follow-up prompts is bulk summarization. Consider having 20 support cases that pertain to a specific error code. An initial prompt can summarize the troubleshooting steps and solutions for each case. Subsequently, the follow-up prompt can consolidate this information to provide a comprehensive set of troubleshooting steps and solutions for future cases with the same error code.

This example pertains specifically to the Microsoft Teams product. Therefore, please utilize the oData query provided in the experiment description to retrieve cases suitable for use in this experiment.

One crucial point to consider when designing prompts is to be as specific and clear as possible, ensuring that the model understands the task and context. Incorporating delimiters helps in structuring the prompt, making it easier to parse and execute. Additionally, follow-up prompts can be designed to aggregate or summarize the results from initial prompts, providing a streamlined and efficient workflow. This method can be particularly beneficial in handling large volumes of data or complex cases, as it allows for a more organized and systematic approach to problem-solving.

### [Classify Cases using Classification Tree Example](https://zebra-ai-web-prd.ait.microsoft.com/CommercialSearchCaseExp/05430f2f-8581-4b1f-b342-5c00552f5225)
```
Prompt:
{
  "Messages": [
    {
      "Role": "system",
      "Content": "# DATA #\n@{CaseNotes}\n@{CaseTitle}\n@{EmailTranscripts}\n@{IssueDescription}\n@{CauseText}\n@{SymptomText}\n@{ResolutionText}\n@{RootCauseFull}",
    },
    {
      "Role": "system",
      "Content": "# SAP #\n@{SAPFullPath}",
    },
    {
      "Role": "system",
      "Content": "# Classification Tree #\nProduct Family: Teams\n-Product: Teams\n--Area: Integration\n---Sub Area: Custom Apps\n---Sub Area: Office 365 Integration\n---Sub Area: Third-Party Apps\n--Area: Communication\n---Sub Area: PSTN Integration\n---Sub Area: Calls\n---Sub Area: Meetings\n---Sub Area: Chat\n---Sub Area: Login Issues\n--Area: Reporting\n---Sub Area: PSTN Minute Reports\n--Area: Collaboration\n---Sub Area: Channels\n---Sub Area: Files\n---Sub Area: Apps\n--Area: Security\n---Sub Area: Data Encryption\n---Sub Area: Compliance\n---Sub Area: Threat Protection\n--Area: Devices\n---Sub Area: Audio Issues\n--Area: Application Behavior\n---Sub Area: Auto-Start Issue"
    },
    {
      "Role": "system",
      "Content": "# Output Format #\nProduct Family: Teams\n-Product: Teams\n--Area: \n---Sub Area: \nCurrent SAP: "
    },
    {
      "Role": "system",
      "Content": "# Guardrails #\nA classification tree has been provided in # Classification Tree # and # Output Format # should be used when producing the output."
    },
    {
      "Role": "user",
      "Content": "Merge all the text in # DATA # together, but do not provide in the output. Ensure the classification accurately reflects the structure and themes of the merged text. Output a hierarchical classification tree from the merged text using the # Classification Tree #. After each level of the tree insert a new line. There can only be one value for each level of the # Classification Tree #. The Current SAP will be equal to SAPFullPath."
    }
  ]
}

Follow-up Prompt:
{
  "Messages": [
    {      "Role": "system",
      "Content": "@{InsertData}"
    },
    {
      "Role": "user",
      "Content": "Output a summary table that includes the classification tree levels and the number instances of each."
    }
  ]
}


Result:
Product Family: Teams
-Product: Teams
--Area: Devices
---Sub Area: Audio Issues
Current SAP: Teams/Teams/Devices/Audio Issues
Product Family: Teams
-Product: Teams
--Area: Communication
---Sub Area: Chat
Current SAP: Teams/Teams/Communication/Chat

...

Sure, here is a summary table of the classification tree levels and the number of instances of each:

| Product Family | Product       | Area                | Sub Area        | Number of Instances |
|----------------|---------------|---------------------|-----------------|---------------------|
| Teams          | Teams         | Devices             | Audio Issues    | 2                   |
| Teams          | Teams         | Communication       | Chat            | 1                   |
| Teams          | Teams         | Application Behavior| Auto-Start Issue| 1                   |
| Teams          | Teams         | Collaboration       | Channels        | 1                   |

Product level has 1 instance: Teams
Area level has 4 instances: Devices, Communication, Application Behavior, Collaboration
Sub Area level has 5 instances: Audio Issues, Chat, Auto-Start Issue, Channels
Let me know if you need any other information!
```
### Formatting

You can format both the input and output of a prompt. Here are some input/output formatting basics.

- **Newline**: To insert a newline, use a “\n” to insert a newline.
- **Bold**: To make your text bold, simply surround the text with an asterisk (*) on either side. For example, *Hello, World!* will produce **Hello, World!**
- **Italics**: To make your text italic, surround the text with an underscore (_) on either side. For example, _Hello, World!_ will produce *Hello, World!*
- **Strikethrough**: To cross out your text, surround it with a tilde (~) on either side. For example, ~Hello, World!~
- **Underline**: To underline your text, surround it with a plus sign (+) on either side. For example, +Hello, World!+
- **Code**: Use triple backticks (\```) to surround the code. For example, \```code\```
- **Bulleted List**: Create a bullet list by adding an asterisk (*) before each item. For example, * Item 1
- **Numbered List**: Create a numbered list by adding a hash symbol (#) before each item. For example, # Item 1
- **Quotes**: Create a quote, add a greater-than symbol (>) before your text. For example, > Quoted text
- **Headlines**: Create headlines by adding one or more hash symbols (#) before your text. For example, H1 # Headline, H2 ## Headline
- **Tables**: Create a table, use the pipe (|) to separate columns and hyphens (-) to separate rows. For example,

  | Column 1 | Column 2 |
  |----------|----------|
  | Row 1, Column 1 | Row 1, Column 2 |
  | Row 2, Column 1 | Row 2, Column 2 |

Here are some basics for formatting output.

#### [Data Exploration Example (Python Code Output)](https://zebra-ai-web-prd.ait.microsoft.com/BYODExperiment/ddb94c88-a0f7-4f1b-a60a-8bd3cd874eef)

When data scientists initiate a new project and obtain a data set, they commence with an (EDA) [A Data Scientist's Essential Guide to Exploratory Data Analysis | Towards Data Science](https://towardsdatascience.com/a-data-scientists-essential-guide-to-exploratory-data-analysis-25637eee0cf6/). An EDA provides critical insights into the data set, enabling them to make informed decisions on how to utilize the data. Typically, data scientists employ Python code to conduct an EDA. In this example, the prompt begins by defining a persona: “You're a data scientist.” It then specifies the task at hand: “conducting exploratory data analysis of customer support chat data,” and identifies the audience for the findings: “report out your initial findings with customer support leaders.” These elements assist the AI in framing its response appropriately. Conversely, if the prompt were to state, “You’re a retail worker” and the audience was “first grade students,” the resultant response would differ significantly.

Next, data is injected into the prompt from a CSV file, utilizing a [Chat Tabular Data sample](https://microsoftapc.sharepoint.com/:x:/t/ZebraAI/EbqWnFE-bHtGi8jvk41s7r8BOMjZhs9yWgdaplzKSZBveg?e=4buEj3). After the data is injected, a user prompt instructs the AI to perform the Exploratory Data Analysis (EDA) using Python. If the data scientist prefers R, the prompt can be adjusted to specifically request that R be used for the EDA.


```
Prompt:
{
  "Messages": [
    {
      "Role": "system",
      "Content": "You're a data scientist conducting exploratory data analysis of customer support chat data. You will need to report out your initial findings with customer support leaders."
    },
    {
      "Role": "system",
      "Content": "@{InsertDocuments}"
    },
    {
      "Role": "user",
      "Content": "Perform a comprehensive EDA using Python."
    }
  ]
}


Result:
Certainly! Below is an example of how you could perform a comprehensive exploratory data analysis (EDA) on the customer support chat data provided in the CSV file.

Step 1: Import Libraries

First, we need to import the necessary libraries for our analysis.

import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Set style for the plots
sns.set(style="whitegrid")


Step 2: Load the Data

Next, we will load the data from the CSV file into a pandas DataFrame.

# Load the data
data = pd.read_csv('ZebraAI Demo - Chat Tabular Data Sample.csv')

# Display the first few rows of the data
data.head()  

...

Step 7: Conclusion

Summarize the findings from the EDA, highlighting key observations and any potential areas for improvement.

Findings:  

- Chat Volume: Observed fluctuations in chat volume over the months with peaks in certain months.
- Customer Engagement: The customer engagement rate shows an increasing trend, which is a positive sign.
- Abandon Rate: A decreasing trend in abandon rate could indicate improvements in customer support responsiveness.
- CSAT Scores: Both Chat and Case CSAT scores are relatively high, but there are slight fluctuations indicating areas for potential enhancement.
- Correlations: The correlation heatmap can provide insights into which metrics are related and how they impact each other.

Next Steps:  

Based on the findings, we could recommend strategies for further improving customer engagement and reducing abandon rates.

This EDA provides a solid foundation for discussing these insights with customer support leaders.
```

#### [Output SQL Example](https://zebra-ai-web-prd.ait.microsoft.com/BYODExperiment/754f9b31-ff70-4e64-b714-43df35cf841e)

This example uses tabular data from a CSV file, [Chat Tabular Data sample](https://microsoftapc.sharepoint.com/:x:/t/ZebraAI/EbqWnFE-bHtGi8jvk41s7r8BOMjZhs9yWgdaplzKSZBveg?e=4buEj3), to create a SQL statement for selecting Chat Volume by month, then sorting by the volume in descending order.
```
Prompt:
{
  "Messages": [
    {
      "Role": "system",
      "Content": "@{InsertDocuments}"
    },
    {
      "Role": "user",
      "Content": "Write a SQL query to select Chat Volume by Month and sort the months in descending order based on the volume."
    }
  ]
}

Result:
To select the Chat Volume by Month and sort the months in descending order based on the volume, you can use the following SQL query:

SELECT 
    FiscalMonthShortName, 
    Chat_Volume 
FROM 
    your_table_name
ORDER BY 
    Chat_Volume DESC;
Copy
Make sure to replace your_table_name with the actual name of your table that contains the data. If your table structure is different, you might need to adjust the column names accordingly.

In the context of the provided data, the column names should match those in the CSV file. Assuming you have a proper table set up, the Chat_Volume would correspond to the values under the "Chat Volume" row in your CSV.
```
#### [Convert CSV to Markdown Sample](https://zebra-ai-web-prd.ait.microsoft.com/BYODExperiment/fe39e7ce-412e-49ea-b3f8-1adae703f635)
[
This example uses tabular data from a CSV file, [Chat Tabular Data sample](https://microsoftapc.sharepoint.com/:x:/t/ZebraAI/EbqWnFE-bHtGi8jvk41s7r8BOMjZhs9yWgdaplzKSZBveg?e=4buEj3), and converts it into Markdown.  

```
Prompt:
{
  "Messages": [
    {
      "Role": "system",
      "Content": "@{InsertDocuments}"
    },
    {
      "Role": "user",
      "Content": "Transform to markdown."
    }
  ]
}

Result:
| FiscalMonthShortName | Nov FY24  | Dec FY24  | Jan FY24  | Feb FY24  | Mar FY24  | Apr FY24 |
|----------------------|-----------|-----------|-----------|-----------|-----------|----------|
| Case Volume - Initial| 511,906   | 416,464   | 536,884   | 526,614   | 520,437   | 38,564   |
| Chat Volume          | 10,386    | 7,354     | 9,510     | 9,426     | 10,703    | 710      |
| Chat Volume %        | 2.0%      | 1.8%      | 1.8%      | 1.8%      | 2.1%      | 1.8%     |
| Customer Engaged Volume| 8,783   | 5,371     | 8,010     | 7,795     | 9,765     | 638      |
| Customer Engaged Rate| 84.6%     | 73.0%     | 84.2%     | 82.7%     | 91.2%     | 89.9%    |
| Engineer Accepted Volume| 7,496  | 4,766     | 7,111     | 6,980     | 8,136     | 552      |
| Engineer Accepted Rate| 72.7%    | 65.5%     | 75.5%     | 74.6%     | 75.7%     | 76.7%    |
| Abandon Volume       | 2,113     | 1,278     | 1,855     | 1,439     | 1,841     | 105      |
| Abandon Rate         | 20.3%     | 17.4%     | 19.5%     | 15.3%     | 17.2%     | 14.8%    |
| Chat CSAT            | 4.59      | 4.61      | 4.65      | 4.66      | 4.60      | 4.87     |
| Chat Survey Count    | 1,620     | 1,367     | 2,039     | 1,286     | 1,104     | 15       |
| Case CSAT            | 4.69      | 4.56      | 4.67      | 4.67      | 4.72      | 5.00     |
| Case Survey Count    | 1,195     | 885       | 1,094     | 1,144     | 1,240     | 2        |
| Chat Avg DTC         | 12.8      | 19.4      | 16.1      | 15.0      | 14.2      | 15.0     |
```

#### [JSON Output Example](https://zebra-ai-web-prd.ait.microsoft.com/BYODExperiment/c889ee90-dc4a-46eb-b609-3d027860e882)

This example uses tabular data from a CSV file, [Chat Tabular Data sample](https://microsoftapc.sharepoint.com/:x:/t/ZebraAI/EbqWnFE-bHtGi8jvk41s7r8BOMjZhs9yWgdaplzKSZBveg?e=4buEj3), and converts it into JSON.  

```
Prompt:
{
  "Messages": [
    {
      "Role": "system",
      "Content": "@{InsertDocuments}"
    },
    {
      "Role": "user",
      "Content": " Format as JSON.”
    }
  ]
}

Result:
{
  "FiscalMonthShortName": [
    "Nov FY24",
    "Dec FY24",
    "Jan FY24",
    "Feb FY24",
    "Mar FY24",
    "Apr FY24"
  ],
  "CaseVolumeInitial": [
    "511,906",
    "416,464",
    "536,884",
    "526,614",
    "520,437",
    "38,564"
  ],
  "ChatVolume": [
    "10,386",
    "7,354",
    "9,510",
    "9,426",
    "10,703",
    "710"
  ],
...
"ChatAvgDTC": [
    12.8,
    19.4,
    16.1,
    15.0,
    14.2,
    15.0
  ]
}

```

#### [Output a State Diagram using Email Transcripts](https://zebra-ai-web-prd.ait.microsoft.com/CommercialSearchCaseExp/f7f5e8ea-70d9-4929-affd-d180ec806490)  

ZebraAI can generate Mermaid diagrams based on prompt outputs. In this instance, an email transcript case is selected, and the prompt directs the AI to create a [state diagram](https://en.wikipedia.org/wiki/State_diagram) in Mermaid format derived from these transcripts. Mermaid supports a wide variety of charts and diagram types. For more information, please visit the [Mermaid website](https://mermaid.js.org/intro/).

```
Prompt:
{
  "Messages": [
    {
      "Role": "system",
      "Content": "@{EmailTranscripts}"
    },
    {
      "Role": "user",
      "Content": "Output as a state diagram in mermaid format."
    }
  ]
}

Result:
stateDiagram
    state "Initial State" as IS
    state "Permissions Issue Reported" as PIR
    state "Support Session Scheduled" as SSS
    state "Permissions Updated" as PU
    state "Verification by User" as VBU
    state "Feedback Requested" as FR

    IS --> PIR: User Reports Issue
    PIR --> SSS: Support Session Scheduled
    SSS --> PU: Permissions Updated by Support
    PU --> VBU: User Verifies Access
    VBU --> FR: Support Requests Feedback

    note right of IS
        Initial state where user has no issue
    end note

    note right of PIR
        User reports a problem with accessing the Azure portal
    end note

    note right of SSS
        A support session is scheduled to address the issue
    end note

    note right of PU
        Support team updates user permissions
    end note

    note right of VBU
        User verifies if the permissions update resolves the issue
    end note

    note right of FR
        Support team requests feedback from the user
    end note

Rendered Result:
```
![Supporting content](/wiki/imgs/Supporting-content-mermaid.png)

##Prompt Engineering Frameworks

Prompt frameworks are structured approaches to creating prompts for large language models (LLMs). They offer a systematic method to design prompts that can result in more accurate, relevant, and context-aware responses. These frameworks are useful for tasks that need detailed instructions and context. By using prompt frameworks, you can ensure that your prompts are clear, specific, and tailored to your requirements, leading to more effective interactions with LLMs.
Innovative prompt frameworks are continually being developed as the field of prompt engineering progresses. Below are several common frameworks worth considering. Additionally, you may find it beneficial to develop a new framework tailored to your specific requirements.  

###COSTAR Framework  

The CO-STAR framework is a handy template for structuring prompts. It considers all the key aspects that influence the effectiveness and relevance of an LLM’s response, leading to more optimal responses.  
- **(C) Context:** Provides background information on the task. This helps the AI understand the specific scenario being discussed, ensuring its response is relevant.  
- **(O) Objective:** Defines what the task is that you want the AI to perform. Being clear about your objective helps the AI focus its response on meeting that specific goal.  
- **(S) Style:** Specify the writing style you want the AI to use. This could be a particular famous person’s style of writing, or a particular expert in a profession, like a business analyst expert or CEO. This guides the AI to respond with the manner and choice of words aligned with your needs.  
- **(T) Tone:** Set the attitude of the response. This ensures the AI’s response resonates with the intended sentiment or emotional context required. Examples are formal, humorous, empathetic, among others.  
- **(A) Audience:** Identify who the response is intended for. Tailoring the AI’s response to an audience, such as experts in a field, beginners, children, and so on, ensures that it is appropriate and understandable in your required context.  
- **(R) Response:** Provide the response format. This ensures that the AI outputs in the exact format that you need for downstream tasks. Examples include a list, a JSON, a professional report, and so on. For most LLM applications which work on the AI responses programmatically for downstream manipulations, a JSON output format would be ideal.  

###CRISPE Framework  

The CRISPE Framework (Capacity and Role, Insight, Statement, Personality, Experiment) assists in creating prompts for AI models. It defines roles, provides background, specifies actions, sets style, and requests multiple answers. It's perfect for prompt templates and generating varied, contextually appropriate responses. By blending clarity with iterative refinement, CRISPE ensures that every interaction with large language models (LLMs) delivers impactful and actionable outputs.  
- **(C) Clarity:** Clearly define the task or goal to minimize ambiguity. *i.e., Create a training program to enhance customer support skills*.  
- **(R) Relevance** Focus on aligning the prompt with the context or audience for accurate results. *i.e., Focus on handling high-stress situations and complaints*.  
- **(I) Interaction:** Incorporate iterative improvements by refining responses based on feedback. *i.e., Include role-playing scenarios to test different approaches*.  
- **(S) Specificity:** Add precise details or constraints to narrow the AI's focus. *i.e., Tailor the content for frontline Azure support engineers*.  
- **(P) Practicality:** Ensure that the output is actionable and feasible for implementation. *i.e., The training program should only take 1 hour to complete*. 
- **(E) Examples:** Provide sample inputs or outputs to guide the AI towards the desired outcome. *i.e., Reference proven methods used by leading cloud services companies*.  

###SAID Framework  

The SAID Framework (Situation, Action, Impact, Detail) offers a structured method for creating prompts. It defines the problem, describes the action, highlights the impact, and requests specific details or actions. This ensures clear prompts for focused AI responses.  
- **(S) Situation:** Provides the persona used by the AI and what sort of capacity they act in. *i.e., You are a project manager overseeing a software development project*.  
- **(A) Action:** Sets up the action the AI will take. i.e., Due to unexpected delays, the project timeline needs to be adjusted.  
- **(I) Impact:** Specify the impact of the action being taken. i.e., The delayed timeline will impact the release date and stakeholder expectations.  
- **(D) Detail:** The detailed instructions the AI is instructed to complete. *i.e., What are the specific actions you will take to address the timeline delay and manage stakeholder expectations*.  

###PROSE Framework  

PROSE (Purpose, Role, Owner, Scope, Expectations) is a framework for defining the purpose and scope of an AI’s behavior. The PROSE Framework adopts a conversational and interactive style in prompts. It uses natural language, incorporating prompts that resemble human conversation rather than rigid instructions. This method can result in more engaging and human-like responses, making it applicable for situations where a conversational tone is required.  
- **(P) Purpose:** Defines the purpose for the prompt. i.e., Provide a step-by-step guide for prompt engineering. 
- **(R) Role:** Provides the persona used by the AI and what sort of capacity they act in. *i.e., Assume the position of a technical professional*.  
- **(O) Owner:** Specify who the owner is. *i.e., You are the owner of a new prompt to perform support case reviews*.  
- **(S) Scope:** Sets the scope for the prompt to use. *i.e., Focus on using basic prompt engineering methodologies*.   
- **(E) Expectations:** Clear instructions that set the response expectations. *i.e., Present the instructions in a clear and concise manner, avoiding technical jargon*.  

## STAR Framework  

The STAR Framework, which stands for Situation, Task, Action, and Result, assists in structuring prompts that necessitate the AI to deliver detailed responses about a particular situation, the tasks undertaken, the actions implemented, and the results achieved. It facilitates the generation of well-organized and comprehensive answers.  

- **(S) Situation:** Sets the context for the scenario. It involves describing the environment, circumstances, or challenges faced at the beginning. The situation should be specific and detailed enough to give a clear understanding of the background. *i.e., Imagine you are a program manager designing a new feature for a prompt engineering IDE*.    
- **(T) Task:** Defines what is needed to be accomplished or solved. *i.e., Recommend core features in a prompt engineering IDE*.
- **(A) Action:** Details the specific actions you or your team took to address the task. *i.e., Consider factors like stakeholder needs, ease of use, and the user interface*.
- **(R) Result:** Share the outcomes or results of the actions taken. *i.e., Provide a list of top prompt engineering IDE features with brief descriptions and reasons for their suitability*. 

## Prompt Engineering Methodologies

In the evolving landscape of AI, prompt engineering methodologies have emerged as critical techniques for optimizing model performance and accuracy. These methodologies involve crafting specific prompts that guide the AI in generating the most relevant and accurate responses, thereby enhancing user interactions and decision-making processes. Effective prompt engineering is essential for a broad range of applications, from customer support and content generation to data analysis and beyond. Each of the methodologies can be combined with the prompt engineering frameworks to further optimize your output.

### Cues

Cues figure out how the output should be processed. In the following example, EmailTranscripts are inserted into a system prompt, and the user prompt is to summarize the EmailTranscripts. The cue guides the extraction of "Key Points" in a list. Multiple methods could achieve the same result. For instance, the user prompt could simply state “Summarize
the EmailTranscripts and extract the Key Points into a bulleted list”. This would accomplish the same objective as the example provided.

[Extract Key Points from Email Using a Cue](https://zebra-ai-web-prd.ait.microsoft.com/CommercialSearchCaseExp/dd257426-9c0e-4747-b1ec-0f9d7f4e40b5)
  
```
Prompt:
{
  "Messages": [
    {
      "Role": "system",
      "Content": "@{EmailTranscripts}"
    },
    {
      "Role": "user",
      "Content": "Summarize the EmailTranscripts.\nKey Points:"
    }
  ]
}

Result:
Sure, here are the key points from the email transcript:

  - Issue: The user experienced a sudden change in permissions, resulting in loss of access to the Azure portal.  
  - Resolution: The issue was related to an update in user roles. The necessary permissions have been reassigned. 
  - Action Required: The user is asked to verify if they now have full access to the Azure portal.
  - Feedback Request: A survey will be sent to the user's email for feedback on the support received.
  - Support Details: Contact information and support hours for the Microsoft Azure Support Team are provided.
```
## Input/Output Prompting  

Input/Output prompting involves giving clear examples of input and desired output within the prompt, helping the model understand the task requirements and expected answer format. It is widely used for tasks such as classification, summarization, translation, and question answering.  

### [Input/Output Prompting Sample](https://zebra-ai-web-prd.ait.microsoft.com/ConsumerSearchCaseExp/be689e60-844f-4e5d-bef3-ae01470cba33)  

This example uses the Consumer Case Search UX – AI Experiment. This experiment type allows users to search for consumer support cases using keywords or a case number.  

```
Prompt:
{
  "Messages": [
    {
      "Role": "system",
      "Content": "You are a customer support agent, and you excel at providing exceptional customer support. You will be provided with data following the format below:\nCase ID: 8110107243439\nProduct: Microsoft 365\nIssue: How to investigate a billing charge from Microsoft\nCreate Date: 1/15/2024 4:56:59 PM\nCase Status: Open\nPrevious Interactions: 2024-01-15 17:19:12: 1: Customer wants to ask about a charge \n2: Customer is being charged for a subscription they does not use \n3: probing questions to verify two accounts. Customer is being charged from a third party for a subscription, but she does not want it. Educate customer to contact third party to turn off the recurring billing. Customer said they are being charged for a subscription he never used. Customer was requesting a refund, but the time was out of policy. Customer disconnected the call."
    },
    {
      "Role": "system",
      "Content": "[Data]\nCase ID: @{CaseNumber}\nProduct: @{SAPProductName}\nIssue: @{IssueDescription}\nCreate Date: @{CreatedDateTime}\nCase Status: @{CaseState}\nPrevious Interactions: @{CaseNotes}"
    },
    {
      "Role": "user",
      "Content": "Use [Data] to generate a professional response to the customer."
    }
  ]
}

Result:
Subject: Follow-Up on Your Microsoft Advertising Case

Dear [Customer's Name],

Thank you for reaching out to us regarding your Microsoft Advertising account. I wanted to follow up on your case, which we have been actively working on.  

As of our last interaction on May 2, 2024, we have made several attempts to contact you regarding your account and campaign performance. I understand that you might have questions or require further assistance, and I am here to help.

To ensure we address your needs effectively, could you please provide more specific details about the issues you are experiencing? This will enable us to assist you more efficiently and provide you with the best possible support.

If you prefer, we can also schedule a call at a time that works for you. Please let me know your availability, and I will be happy to accommodate.

Thank you for your patience and understanding. I look forward to your response so we can resolve any outstanding issues promptly.

Best regards,

[Your Name]
[Your Position]
Microsoft Advertising Support Team
[Your Contact Information]

```
### Zero-Shot Prompting  

Another strategy for prompt engineering is to use zero-shot prompting, which means providing no input/output examples in the prompt and only describing the task. This can be useful when the user does not have any relevant examples at hand or wants to test the model’s generalization ability. Zero-shot prompting can also be used for open-ended tasks, such as generating text or creative content. However, zero-shot prompting may require more explicit instructions and parameters to guide the model’s output and avoid ambiguity or errors.  

#### [Improve Content Quality using Zero-Shot Prompt Example](https://zebra-ai-web-prd.ait.microsoft.com/ContentSearchExp/85e73d65-fdba-4a9f-a388-8a7a2ced0b47)  

This example employs  the Content Search UX to search for content. The experiment starts by specifying a persona for the AI to use, tells the AI to expect KB content in an HTML format, and to only use the information in the <body> tag in the content. The next system prompt defines the [Article] section and adds the Title and Raw Content substitution parameters. The user prompt then tells the AI to provide feedback about the articles and provide examples with the feedback.  

```
Prompt:
{
  "Messages": [
    {
      "Role": "system",
      "Content": "You are a professional technical writer at Microsoft. You will be provided a knowledge base article in HTML format that needs to be improved. Only use the content that is in between the <body> tag."
    },
    {
      "Role": "system",
      "Content": "[Article]\n@{Title}\n@{ContentRaw}"
    },
    {
      "Role": "user",
      "Content": "Provide feedback, with examples, that will improve the accuracy and quality of [Article]."
    }
  ]
}

Result:
The article titled "Customize networking configurations for a failover VM - Azure Site Recovery" provides important information on how to customize networking settings during the failover of Azure VMs. Here are several suggestions to improve the accuracy and quality of the content:

1.  Clarify Technical Terminology
    •  Issue: The article uses terms like "NIC," "Public IP SKU," and "availability zone" without sufficient explanation.
    •  Improvement: Include definitions or links to explanations for these terms. For example:
       o  NIC: Network Interface Card, a hardware component that connects a computer to a network.
       o  Public IP SKU: Refers to the pricing tiers for public IP addresses in Azure, which can affect availability and features.

2. Enhance Step-by-Step Instructions
   •  Issue: The step-by-step instructions for customizing failover networking configurations are somewhat vague.
   •  Improvement: Provide more detailed guidance. For instance:
      o  In step 3, specify what users should look for when selecting the "Network" option. For example, "Select the desired Azure VM, then navigate to the 'Network' tab in the settings pane. Click on 'Edit' to modify the NIC configuration."
…
7. Review Grammar and Formatting
   •  Issue: There are minor grammatical errors and inconsistent formatting throughout the document.
   •  Improvement: Perform a thorough review to correct these issues. For example:
      o  Ensure consistent capitalization (e.g., "Azure Site Recovery" should always be capitalized).
      o  Use consistent bullet points or numbering formats in lists.

Conclusion
By implementing these suggestions, the article can provide clearer, more detailed, and actionable guidance for users looking to customize networking configurations for failover VMs in Azure. These improvements will enhance the overall user experience and ensure that readers can effectively follow the instructions provided.
```
### One-Shot Prompting  

One-shot prompting is a method used  to instruct LLM models to perform various tasks. The approach involves providing a single example input and output pair, followed by an instruction, and allowing the model to generate a response based on that example.  This helps the model to clarify expectations and improves performance.  

#### [Validate SAP Path using One-Shot Prompt](https://zebra-ai-web-prd.ait.microsoft.com/CommercialSearchCaseExp/e5c3a66b-a695-4ba6-9c7c-9ce8b8dfa939)  

This example employs the Commercial Case Search UX to select cases and subsequently validate each case's SAP Path. The initial system prompt delineates the [Data] section, incorporating the Case Title, Issue Description, and complete SAP Path. The following system prompt is integral to establishing this prompt as a one-shot prompt, providing a singular example for reference. The final system prompt specifies the [Output Format] section, offering the AI the format to utilize when generating the output. The user prompt instructs the AI to utilize information from [Data] to verify whether the correct SAP is set. If the SAP is incorrect, the AI suggests an appropriate SAP replacement. Following the evaluation of the SAP, the AI provides a rationale for its conclusion. To conclude the prompt, the AI is instructed to insert a horizontal line.  
```
{
  "Messages": [
    {
      "Role": "system",
      "Content": "[Data]\n@{CaseTitle}\n@{IssueDescription}\n@{SAPFullPath}"
    },
    {
      "Role": "system",
      "Content": "[Example]\nSAPFullPath: Azure/Databricks/Cluster/Cluster launch or creation failure due to other errors\nCaseTitle: Cluster launch or creation failure due to other errors\nIssueDescription: Question: What time did the problem begin? Answer: Thu, Sep 28, 2023, 02:30 PM Question: Approximate time when the problem stopped occurring. If the issue is ongoing, leave this field blank Answer: Question: What error message you received? Answer: 1) Cluster Launch Failure Error: An unknown error has occurred. When attempting to create new clusters, we encounter consistent failures. Is this a new problem, or it has happened before? Answer: Not new, happened before Question: Previous solution if applicable Answer: Previously, we had to manually reset the cluster configurations and restart. Question: {Name PII} URL if available Answer: {URL PII} Workspace ID if cluster URL is not available Answer: Question: Additional details about the issue Answer: This issue has been persistent despite following prior resolutions. Each cluster creation results in an unknown error making it impossible to execute any jobs. Customer answers to additional questions for Databricks: What time did the problem begin? - 2023-09-28T14:30:00.000Z Approximate time when the problem stopped occurring. If the issue is ongoing, leave this field blank - What error message you received? - 1) Cluster Launch Failure Error: An unknown error has occurred. When attempting to create new clusters, we encounter consistent failures. Is this a new problem, or it has happened before? - Not new, happened before Previous solution if applicable - Previously, we had to manually reset the cluster configurations and restart. Additional details about the issue - This issue has been persistent despite following prior resolutions. Each cluster creation results in an unknown error making it impossible to execute any jobs."
    },
    {
      "Role": "system",
      "Content": "[Output Format]\nSAP Full Path: \nSuggested SAP Path: \nReason:  "
    },
    {
      "Role": "user",
      "Content": "Using [Data] inspect CaseTitle and IssueDescription to determine if the correct SAPFullPath has been selected. Provide the response using the [Output Format]. If the SAPFullPath is incorrect, suggest a new SAPFullPath and provide reason why a new SAPFullPath was suggested. Then insert a solid line as a divider.\n\n"
    }
  ]
}

Result:
SAP Full Path: Azure/High Performance Computing (HPC)/HPC VM (N or H series)/Deployment and Configuration
Suggested SAP Path: Azure/High Performance Computing (HPC)/HPC VM (N or H series)/Deployment and Configuration
Reason: The SAP Full Path selected matches the context of the issue described, which involves deployment and configuration failures of HPC VMs due to network errors related to Infiniband. The details provided in the case align with the processes involved in HPC VM management.  
______________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________  
  
SAP Full Path: Azure/Virtual Machine running Windows/Cannot connect to my VM/Failure to connect using RDP or SSH port
Suggested SAP Path: Azure/Virtual Machine running Windows/Remote Desktop Connection Issue
Reason: The original SAPFullPath focuses on a failure to connect using RDP or SSH port, which is specific. However, the suggested path addresses the broader category of remote desktop connection issues, which encompasses the inability to connect via both Public and Private IPs. This aligns better with the overall problem description regarding connectivity issues after network configuration changes.\n\n---\n\n
______________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________  

SAP Full Path: Azure/Virtual Machine running Windows/Azure Features/VM Hibernate
Suggested SAP Path: Azure/Virtual Machine running Windows/Azure Features/VM Customization
Reason: The issue described is related to the AzureMySQLCustomizationExtension failing to provision due to customization states not being available, which is more aligned with VM customization issues rather than VM hibernation features.\n\n---\n\n
______________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________  
  
```
### Few-Shot Prompting  

Few-shot prompting provides two or more examples, which helps the model recognize patterns and handle more complex tasks. With more examples, the model gains a better understanding of the task, leading to improved accuracy and consistency. The most optimal number of examples is three to five.  

#### [Few-Shot Sentiment Analysis](https://zebra-ai-web-prd.ait.microsoft.com/CommercialSearchCaseExp/dc51f914-44b2-436b-9452-a84f52488eb4)  

The Few-Shot example uses the Commercial Case Search UX - AI Experiment. The demo uses two data substitution parameters, "@{SurveyVerbatim}\n@{SurveyRating}”. SurveyVerbatim the verbatim comments from a customer support survey and the SurveyRating injects the survey score (between 1 and 5, 5 being the highest).

To ensure this example is run using cases that have both a survey verbatim and survey score, an oData query will be used to filter cases that have both. To use an oData filter, click on Advanced Editor in the Search section.

![Few Shot](/wiki/imgs/Few-shot-prompt.png)

The oData query to be utilized includes two filters. The first filter applies to the Boolean field “SurveyVerbatimAvailable” and retrieves all records where the value is True. The second filter then identifies all entries with a “SurveyRating” greater than 0. Essentially, this ensures that the SurveyRating field contains a numeric value.
  
```
oData Query:
{
  "Search": "*",
  "SearchFields": "",
  "SearchMode": "any",
  "Filter": "SurveyVerbatimAvailable and SurveyRating gt 0",
  "Orderby": "",
  "QueryType": "simple",
  "Top": 25
}
```

Enter the oData query and click Search to list cases in the data table. Scroll right to find the SurveyRating field. Enable "Show Sensitive Fields" (available with Synthetic data) to view the SurveyVerbatim field. Select cases for the experiment, then click Submit.

In the prompt, several system messages are present. The first system message introduces data into the prompt. The second message informs the AI that there are only three types of sentiment. The next three system messages provide examples of verbatims and sentiment for each example, with one example per sentiment type. The user message then instructs the AI on how to use the information from the system messages. The prompt directs the AI to determine the Sentiment field in the response using the text from SurveyVerbatim. It also specifies that the SurveyRating should be explicitly used for the Survey Rating field in the response. A guardrail is added to ensure that the Verbatim, as seen in the few-shot examples, is never displayed, but only the Sentiment and Survey Rating. The Survey Rating is included to demonstrate the accuracy of the AI in determining sentiment.

```
Prompt:
{
  "Messages": [
    {
      "Role": "system",
      "Content": "@{SurveyVerbatim}\n@{SurveyRating}\n"
    },
    {
      "Role": "system",
      "Content": "Sentiment (Positive, Negative, Neutral)"
    },
    {
      "Role": "system",
      "Content": "Verbatim: {NAMEPII} provided excellent support and very helpful with finding permissions and opening up folders libraries. I recommend her a bonus. Thanks!\nSentiment: Positive"
    },
    {
      "Role": "system",
      "Content": "Verbatim: The root cause of the issue was that the user was a member of the Project Collection Administrators. I removed the user from the group, issue ceased. We have many Business Analysts who are in this group in multiple organizations. I would like to know if other customers have reported this issue.\nSentiment: Neutral"
    },
    {
      "Role": "system",
      "Content": "Verbatim: I sent over available times for the end user and the support rep never accepted any of them and closed the ticket saying I never responded. Unacceptable!\nSentiment: Negative"
    },
    {
      "Role": "user",
      "Content": "Use SurveyVerbatim to determine Sentiment. Survey Rating is equal to SurveyRating. Do not display the Verbatim. Only provide...\nSentiment: \nSurvey Rating:"
    }
  ]
}

Result:
Sentiment: Neutral Survey Rating: 4
Sentiment: Positive Survey Rating: 5
Sentiment: Negative Survey Rating: 1
Sentiment: Positive Survey Rating: 5
Sentiment: Positive Survey Rating: 5
```

### Chain-of-Thought Prompting

Chain-of-Thought Prompting technique improves LLM performance by encouraging them to articulate their reasoning process, leading to more accurate answers.  Chain-of-Thought is particularly beneficial for complex tasks. Unlike X-shot prompting techniques, this strategy encourages critical thinking and helps uncover new insights or approaches. 

#### [Content Links Evaluation Chain of Thought Example](https://zebra-ai-web-prd.ait.microsoft.com/ContentSearchExp/83c5a889-8348-4cdf-ae5c-0ed20ed568f9)

This experiment utilizes Chain-of-Thought prompting to evaluate hyperlinks in HTML content and subsequently aggregates the links into a table. The initial system prompt establishes the AI's persona and informs it that only the content inside the <body> tag of the HTML will be analyzed. Following this, the system prompt generates a [Data] section containing the content title and the raw HTML. An [Exclude] section is then created with a list of URLs to be excluded from the link analysis. This list can be updated as needed. Two subsequent system prompts provide the [Sample Out] format and instruct the AI not to use markdown due to inconsistent outputs. Instead, the AI produces a standard HTML table for all content.
The user prompt starts by instructing the AI to use [Sample Output] for its final output and to follow the step-by-step instructions. The first step is to find all the hyperlinks. The second step is excluding any hyperlinks in the [Exclude] section. Third is for the AI to create a table to aggregate and count the hyperlink instances. And the fourth, and final instruction is to sort the aggregate table by count (highest to lowest).

```
Prompt:
{
  "Messages": [
    {
      "Role": "system",
      "Content": "You are an HTML parser. You will be provided HTML content. Only uses the content that is inside the <body> tag."
    },
    {
      "Role": "system",
      "Content": "[Data]\n@{Title}\n@{ContentRaw}\n"
    },
    {
      "Role": "system",
      "Content":"[Exclude]\nhttps://aka.ms/ContentUserFeedback\nhttps://www.microsoft.com\nhttps://aka.ms/msftqanotifications\nhttps://aka.ms/LearnLinking\nhttps://aka.ms/yourcaliforniaprivacychoices\nhttps://learn.microsoft.com/en-us/contribute\nhttps://learn.microsoft.com/en-us/legal/intellectualproperty/Trademarks/\nhttps://learn.microsoft.com/en-us/legal/privacy\nhttps://learn.microsoft.com/en-us/legal/termsofuse\nhttps://learn.microsoft.com/en-us/previous-versions/\nhttps://learn.microsoft.com/en-us/techcommunity/microsoft-learn-blog\nhttps://portal.azure.com\nhttps://support.microsoft.com\nhttps://www.microsoft.com/legal/intellectualproperty/Trademarks"
    },
    {
      "Role": "system",
      "Content": "[Sample Output]\nTitle: partner center insights\nLink Summary Table:\n"
    },
    {
      "Role": "system",
      "Content": "Do not use markdown for the output."
    },
    {
      "Role": "user",
      "Content": "Use [Sample Output] to produce an output following the instructions below.\n\n1. Parse the HTML content and identify all the hyperlink URLs.\n2. Exclude the hyperlink URLs in the [Exclude] list.\n3. Aggregate the hyperlink URLs and put in a table with three columns -- Link Title, Link URL, Count\n4. Sort the table from highest Count to lowest.\n"
    }
  ]
}

Result:
Title: Restore a suspended Partner Center account

Link Summary Table:
| Link Title | Link URL | Count |
|------------|----------|-------|
| Partner profile | https://aka.ms/accountexp/legalInfo | 1 |
| Support | https://partner.microsoft.com/dashboard/v2/../support/servicerequests/create | 1 |
| Verify your partner profile | update-your-partner-profile | 1 |
| Verify your account information when you enroll in a new Partner Center program | ../verification-responses | 1 |
| Revenue requirement for CSP indirect resellers | ../new-indirect-reseller-requirement | 1 |
| Switch direct-bill partner to indirect reseller | ../transition-direct-to-indirect | 1 |


Title: Partner Center account setup

Link Summary Table:
| Link Title | Link URL | Count |
|------------|----------|-------|
| Partner Center | https://partner.microsoft.com/dashboard/home | 2 |
| Add a new user | create-user-accounts-and-set-permissions | 1 |
| Dun & Bradstreet | https://partner.microsoft.com/marketing/usisvshowcase/dunandbrad | 1 |
| Verification and your account information | ../verification-responses | 1 |
| Merge your partner account with another partner account | merge-accounts | 1 |
| Commercial Marketplace program | /en-us/azure/marketplace/partner-center-portal/create-account | 1 |
| Microsoft AI Cloud Partner Program membership benefits | ../mpn-overview | 1 |
| Cloud Solution Provider program | ../enrolling-in-the-csp-program | 1 |
| Microsoft 365 and Copilot program | https://partner.microsoft.com/dashboard/account/v3/enrollment/introduction/office | 1 |
| Partner network resources | https://partner.microsoft.com/ | 1 |
| Update your partner profile | update-your-partner-profile | 1 |
| Create user accounts and set permissions | create-user-accounts-and-set-permissions | 1 |
| Assign users roles and permissions | permissions-overview | 1 |
| My preferences | https://partner.microsoft.com/dashboard/actioncenter/mypreferences | 1 |
| Update email | ../media/account-settings/update-email.png#lightbox | 1 |
```
###Iterative (Follow-up) Prompting  

Iterative or expansive prompting is a technique that uses follow-up prompts based on the output of an initial prompt. This strategy allows for refining results by asking further questions or making additional requests from each successive response. It helps to capture the main ideas in a text and generate a concise and informative response.  

#### [Support Cases Trend Analysis Follow-up Prompt Example](https://zebra-ai-web-prd.ait.microsoft.com/CommercialSearchCaseExp/4f4afcc8-7fc7-4cf9-a57f-aece52fd67a8)  

This experiment utilizes the Commercial Case Search UX to review all support cases, offering a comprehensive analysis of the top support volume trends. The example is divided into two segments. The initial prompt processes each selected case, extracting case details and summarizing the unstructured text fields. Subsequently, the follow-up prompt is applied to the results from the initial prompt. This follow-up prompt groups similar cases and provides a symptom, cause, and resolution for each group.

A novel approach introduced in this example is the implementation of a # Definitions # system prompt. Large Language Models (LLMs) are trained on data from the internet up to a certain date. As a result, there may be instances where internal terminology is not recognized by the LLM. The # Definitions # system prompt serves to provide definitions for each term included in the # Data # section, thereby addressing this issue. 
  
```
Initial Prompt:
{
  "Messages": [
    {
      "Role": "system",
      "Content": "# Persona #\nYou are an AI focused on customer service and will act as a support case agent.\n"
    },
    {
      "Role": "system", 
      "Content": "# Data # \n@{CaseNumber}\n@{CaseNotes}\n@{CaseTitle}\n@{EmailTranscripts}\n@{IssueDescription}\n@{Symptom}\n@{SymptomText}\n@{RootCause}\n@{CauseText}\n@{Resolution}\n@{ResolutionText}\n@{SAPProductCategory}\n@{SAPProductSubCategory}\n@{SurveyVerbatim}\n@{SurveyRating}"
    },
    {
      "Role": "system",
      "Content": "# Objective #\nYou will be provided various customer support case # Data # and then will be asked to perform tasks on that # Data #. "
    },
    {
      "Role": "system",
      "Content": "# Definitions #\nCaseNumber is a unique identifier for a support case. Case Number should maintain its long number format.\nCaseNotes contains notes collected by the support agent.\nCaseTitle is a descriptive title for the support case.\nEmailTranscripts is a collection of all the emails sent and received for this support case.\nIssueDescription is a description of the issue per the customer.\nSymptom describes symptoms for the issue.\nSymptomText is descriptive text that provides for detail about the issue.\nRootCause is the primary cause of the issue as identified by the support agent.\nCauseText is descriptive text that provides for detail about the cause of the issue. \nResolution describes the resolution to the issue. \nResolutionText is descriptive text that provides details about how the issue was resolved.\nSurveyVerbatim is descriptive text provided by the customer to explain the reason for their SurveyRating.\nSurveyRating is a rating provided by customers to rate their customer experience. Ratings range from 1 to 5 (5 being the best).\nSAPProductCategory is the first level classification of the issue as described by the customer.\nSAPProductSubCategory is the second level classification of the issue as described by the customer."
    },
    {
      "Role": "system",
      "Content": "# Context #\nCase Number is equal to CaseNumber. Case Summary is a summarization of the text fields CaseNotes, CaseTitle, IssueDescription, and EmailTranscripts. Keywords is 3-5 keywords extracted from the CaseNotes and IssueDescription. Error Message should be indentified by parsing the IssueDescription, EmailTranscripts, or CaseNotes for specific error messages or error codes. Symptom is a summarization of the text fields Issue Description, SymptomText, and Symptom. Cause is a summarization of the text fields RootCause, CauseText, and CaseNotes. Resolution is a summarization of the text fields Resolution, ResolutionText, and Case Notes. SAPProductCategory and SAPProductSubCategory help to classify the issue category from the list of the choices given to a csutomer during case creation. It helps to make sure we are able to route cases based on a specific specialty to a specific engineer specializing in it and also analysis of number of cases in a specific bucket. Sentiment is the sentiment of both the EmailTranscripts and SurveyVerbatim. Survey Rating is equal to SurveyRating."
    },
    {
      "Role": "system",
      "Content": "# Example #\nCase Number: 9906062468259597\nCase Summary: The customer reported an issue with slow content distribution to Distribution Points (DPs) in Microsoft Configuration Manager. Despite having a general bandwidth of 1 Gbps, the replication bandwidth was very low (~5-7 Mbps). The customer experienced failure messages stating \"Failed to distribute content to Distribution Point.\" The issue was eventually resolved by the customer after making changes to the network configuration on the Hyper-V cluster, which improved the speed of content distribution.\nKeywords: Content distribution, Configuration Manager, Distribution Points, network configuration\nError Message: Failed to distribute content to Distribution Point\nSymptom: Slow content distribution speed between the Primary Site Server and Distribution Points, with low replication bandwidth and failure messages preventing successful content distribution.\nCause: Poor bandwidth and network configuration issues on the Hyper-V cluster affecting the content distribution speed.\nResolution: Changes to the network configuration on the Hyper-V cluster improved the speed of content distribution, resolving the issue.\nSentiment: Positive\nSAPProductCategory: Content Management\nSAPProductSubCategory: Content Distribution to Distribution Points\nSurvey Rating: 5\n"
    },
    {
      "Role": "user",
      "Content": "# Instruction #\nProduce a summary using Case data from # Data #, taking into account the # Context# and use the # Example # output. Do not make any assumptions. Only provide a response that is grounded in facts.\nCase Number: \nCase Summary: \nKeywords: \nError Message: \nSymptom: \nCause: \nResolution: \nSentiment: \nSAPProductCategory:\nSAPProductSubCategory:\nSurvey Rating:"
    }
  ]
}

Initial Prompt Result:
Case Number: 9910040528579353 Case Summary: The customer reported an unexpected restart of their Virtual Machine (VM) running RedHat on Azure. The issue occurred on October 1, 2024, between 4:12:56 AM and 5:35:27 AM. The initial Root Cause Analysis (RCA) indicated a Physical Host failure, but the customer requested a more detailed analysis. The VM was subsequently redeployed to a stable node, and preventive measures were suggested, including the use of Availability Zones and setting up availability sets for redundancy. The customer confirmed closure after the issue was resolved. Keywords: VM restart, Azure, RedHat, Physical Host failure, RCA Error Message: Not explicitly mentioned Symptom: The VM restarted unexpectedly on October 1, 2024, between 4:12:56 AM and 5:35:27 AM. Cause: The initial RCA cited a Physical Host failure, but detailed diagnostics and steps to prevent future incidents were requested by the customer. Resolution: The VM was redeployed to a new node, and preventive measures such as using Availability Zones and setting up availability sets were suggested. The customer confirmed closure after receiving a detailed RCA. Sentiment: Positive SAPProductCategory: Virtual Machines SAPProductSubCategory: VM Restart/Failure Survey Rating: 5

Case Number: 9910040535495693 Case Summary: The customer reported an issue with connecting to their Azure Virtual Machine using RDP, receiving the error message "Cannot connect to my VM." Both Public and Private IP connections were failing. The issue started after making network configuration changes for better security. The support team verified that the RDP port (3389) was open and that the VM was running and operational. Diagnostics showed no issues with the network interface. A misconfiguration in the Network Security Group (NSG) inbound rule was identified, which was blocking the RDP port. After correcting the NSG rule configuration, the customer was able to successfully connect to the VM via RDP. The issue was resolved, and the customer confirmed the resolution. Keywords: Azure Virtual Machine, RDP, Network Security Group, connectivity issues Error Message: Cannot connect to my VM Symptom: Inability to connect to Azure Virtual Machine using RDP, failing for both Public and Private IPs. Cause: Misconfiguration in the Network Security Group inbound rule blocking the RDP port. Resolution: Corrected the NSG rule configuration, allowing successful RDP connection to the VM. Sentiment: Positive SAPProductCategory: Cloud Services SAPProductSubCategory: Virtual Machine Connectivity Survey Rating: Not provided

Case Number: 9910040529269266 Case Summary: The customer reported an issue with Azure HPC VM deployments where PKEY changes caused job failures. They encountered the error NCCL WARN NET/IB: Got async event: P_Key change during training jobs, which led to significant disruptions. The problem was identified as SSL exceptions in UFM logs related to IB partition size, caused by a misconfigured SSL buffer size. Initial fixes were implemented, including adjustments to buffer size settings and a fix for duplicate set calls to partition configuration files. Despite these efforts, the customer continued to experience PKEY change events affecting new VM deployments. Further investigation revealed 413 (Request Entity Too Large) errors during API calls to UFM. Keywords: Azure HPC VM, PKEY changes, UFM logs, IB partition, SSL buffer size Error Message: NCCL WARN NET/IB: Got async event: P_Key change Symptom: Job failures during training due to PKEY changes, causing significant disruptions. Continuous PKEY change events affecting new VM deployments. Cause: SSL exceptions in UFM logs related to IB partition size due to misconfigured SSL buffer size, leading to PKEY change warnings. Resolution: Adjusted buffer size settings in UFM configuration, implemented a fix for duplicate set calls to partition configuration files, and coordinated with the vendor for a firmware hotfix. Further investigation pending due to ongoing issues. Sentiment: Negative SAPProductCategory: Azure SAPProductSubCategory: High Performance Computing (HPC) VM Deployment and Configuration Survey Rating: Not available

Case Number: 9910040746308470 Case Summary: The customer reported that the VM Guest Agent status intermittently becomes non-responsive, affecting the SQL Server service and impeding database operations. The issue is suspected to be related to the NIC configuration and Windows Update settings. Several action plans were discussed and implemented, including resetting the NIC and changing the RDP port due to security concerns. Follow-ups were scheduled to monitor the VM Guest Agent's performance and stability. Keywords: VM Guest Agent, NIC configuration, Windows Update, SQL Server, Azure Error Message: VM Guest Agent Health issue Symptom: The VM Guest Agent intermittently becomes non-responsive, and the SQL Server service on the virtual machine does not respond to queries, affecting database operations. Cause: The issue is likely due to a networking problem affecting the VM Guest Agent, potentially related to NIC configuration and Windows Update settings. Resolution: The actions taken include resetting the NIC, changing the RDP port, and monitoring the VM Guest Agent's performance and stability. Commands to restart the VM agent were also provided. Sentiment: Neutral SAPProductCategory: Virtual Machines SAPProductSubCategory: VM Guest Agent Survey Rating: None

Follow-up Prompt:
{
  "Messages": [
    {
      "Role": "system",
      "Content": "# Persona #\nYou are a technical content writer that has depth knowledge about technical support cases for Microsoft products."
    },
    {
      "Role": "system",
      "Content": "# Objective #\nYou will be provided various customer support case # Data # and then will be asked to perform tasks on that data. Your responses should not include any PII information, such as customer name, agent name, email, phone, address, SSN or any other sensitive or confidential information."
    },
    {
      "Role": "system",
      "Content": "# Data #\n@{InsertData}"
    },
    {
      "Role": "system",
      "Content": "# Context #\nYou will be grouping the support cases from InsertData based on Symptoms. Given the list of symptoms for each support case, categorize them into top trends by using the  SAPProductCategory , SAPProductSubCategory, Symptom and Summary. For each trend, provide a confidence score that represents the likelihood of the trend being a classified into the correct tending bucket and also include the number of cases classified in each trend. Each trending issue can consist of multiple symptoms which the support cases can be categorized into. Each case should fall into exactly one trending issue with the higher confidence score taking the priority. Include the symptoms which are classified with High confidence only."
    },
    {
      "Role": "system",
      "Content": "# Example #\n### Trending Issue 1: Content Distribution Failures ###\n**Number of Cases for trending issue 1: ** 3\n**Symptom 1:**\n- Slow content distribution speed between the Primary Site Server and Distribution Points, with low replication bandwidth and failure messages preventing successful content distribution.\n- Case Number: 9906062468259597\n- Confidence: \n\n**Symptom 2:**\n- The customer is unable to install the Distribution Point for Microsoft Configuration Manager and needs assistance with the configuration process.\n- Case Number: 9906052495468875\n- Confidence: \n\n**Symptom 3:**\n- The software update download feature in Microsoft Configuration Manager is stuck and does not complete successfully.\n- Case Number: 9906082464300658\n- Confidence: "
    },
    {
      "Role": "system",
      "Content": "# Guardrails #\nThe output should not emit any empty lines."
    },
    {
      "Role": "user",
      "Content": "# Instruction #\nGroup the cases to get the top trending issues in InsertData by # Example # format"
    }
  ]
}

Follow-up Prompt Result:
Trending Issue 1: VM Restart and Availability
**Number of Cases for trending issue 1: ** 1 Symptom 1:
   •  The VM restarted unexpectedly on October 1, 2024, between 4:12:56 AM and 5:35:27 AM.
   •  Case Number: 9910040528579353
   •  Confidence: High
Trending Issue 2: VM Connectivity Issues
**Number of Cases for trending issue 2: ** 1 Symptom 1:
   •  Inability to connect to Azure Virtual Machine using RDP, failing for both Public and Private IPs.
   •  Case Number: 9910040535495693
   •  Confidence: High
Trending Issue 3: HPC VM Deployment Failures
**Number of Cases for trending issue 3: ** 1 Symptom 1:
   •  Job failures during training due to PKEY changes, causing significant disruptions. Continuous PKEY change events affecting new VM deployments.
   •  Case Number: 9910040529269266
   •  Confidence: High
Trending Issue 4: VM Guest Agent and SQL Server Issues
**Number of Cases for trending issue 4: ** 1 Symptom 1:
   •  The VM Guest Agent intermittently becomes non-responsive, and the SQL Server service on the virtual machine does not respond to queries, affecting database operations.
   •  Case Number: 9910040746308470
   •  Confidence: High
```

Sure! Here is the section "Tips and Tricks" from your document "Prompt Engineering with ZebraAI v2" converted into markdown:

## Tips and Tricks

- **Prompting for Prompts**: One way to improve your prompt crafting is to use AI to provide suggestions. Use ZebraAI AI Chat to get started. Try this sample Prompt Generator.  
- **Refine Prompts with Prompting**: Just like asking the AI to help generate a new prompt. It is possible to ask AI to help refine a prompt. Use something like, “You're helping a data scientist who is tuning a prompt for a large language model. You will be given a prompt. Generate a candidate variation of the given prompt. This variation will be tested for quality in order to select a winner. Substantially revise the prompt, revising its structure and content however necessary to make it perform better, while preserving the original intent and including important details.”. Or “Check the factual correctness of the RESPONSE. generate a new prompt that achieves a higher accuracy.”  
- **Start simple and iterate**: Start with a simple and straightforward prompt and see how the AI responds. Then iterate and refine the prompt, by adding or removing information, changing the wording or format, or using different delimiters. Also compare the results of different prompts, models, and parameters, and see what provides the most relevant results.
- **Delimiters for Enhanced Structure**: Use special characters as delimiters within prompts to further clarify the structure and segregate different elements, improving the AI’s understanding.  
- **Task Decomposition for Complex Operations**: Instead of presenting LLMs with a monolithic prompt encompassing multiple tasks, breaking down complex processes into simpler subtasks significantly improves clarity and performance. This allows the AI to focus on each subtask individually, ultimately leading to a more accurate overall outcome.
- **Structured Inputs and Outputs**: Structure inputs using formats like JSON or XML significantly enhance an LLM's ability to understand and process information. Similarly, specifying the desired output format (e.g., a list, paragraph, or code snippet) improves response relevance.  
- **Specificity and Clarity**: Just like giving instructions to a human, prompts should clearly articulate the desired outcome. Ambiguity can lead to unexpected or irrelevant outputs.  
- **Order Matters**: The order in which information is presented to the AI may affect the output. Whether instructions come before content (“summarize the following…”) or after (“summarize the above…”) can influence the output. Even the order of few-shot examples can matter. This is referred to as recency bias.  
- **Double Down**: Sometimes it’s necessary to repeat information to the AI. Give instructions and/or cues before and after the primary content.  
- **Use examples and references**: Use examples and references to guide the AI and improve the output. Provide examples of inputs and outputs or use existing data or content as references.  
- **Give the AI an “out”**: Give the AI an alternative path if it is unable to complete the instructions using the information provided. For example, when instructing the AI to provide a response based on data provided, it’s a good practice to include something like “or respond with ‘not found’ if the answer is not present”. Append this to the end of the instructions. This can help the model avoid making up answers.  
- **Think Before Answering**: The key phrase "Let's think step by step" is often added at the end of a prompt to stimulate the AI’s reasoning process and improve the results. There are several variations that can be used. Test to identify the most optimal for your prompt.  
  - Let’s think step by step.
  - Break down your thought process.
  - Let’s think about this logically.
  - Let’s work this out in a step by step way to be sure we have the right answer.
  - First, let’s think about this logically.
  - Walk me through this context in manageable parts step by step, summarizing and analyzing as we go.
- **Self-Evaluation**: Use AI to evaluate the AI-generated output based on custom criteria defined in an evaluation prompt.
  - Given the INSTRUCTIONS and RESPONSE, evaluate if the response is helpful. Helpful responses are clear, relevant, and actionable. Unhelpful responses are vague, off-topic, or lacking detail. Return a label: 'helpful' or 'unhelpful'.
  - Evaluate the response for conciseness. A concise response delivers the key message clearly and directly, without unnecessary words. Return one of the following labels: 'Concise,’ or 'Verbose’.
  - Evaluate the following RESPONSE based on the given INSTRUCTIONS. A complete response is one that fully addresses all parts of the instructions. Return one of the following labels: 'Complete' or 'Incomplete.'
  - Evaluate the following RESPONSE for faithfulness to the CONTEXT. A faithful response should only include information present in the context, avoid inventing new details, and not contradict the context. Return one of the following labels: 'Faithful' or 'Not Faithful’.
  - A RESPONSE is correct when it is the same as the CONTEXT in all facts and details, even if worded differently. The RESPONSE is incorrect if it contradicts the CONTEXT, adds additional claims, omits or changes details.
  - Think step by step. Return the reasoning why the RESPONSE is accurate.
  - This is a very long detailed self-evaluation prompt:

    ```markdown
    # Evaluation prompt template based on G-Eval
    [EVALUATION_PROMPT_TEMPLATE]
    You will be given a prompt response. Your task is to rate the response on one metric. Please make sure you read and understand these instructions very carefully. Refer to this as needed.

    Evaluation Criteria:
    {criteria}

    Evaluation Steps:
    {steps}

    Example:

    Source Text:
    {original prompt}

    Response:
    {prompt response}

    Evaluation Form (scores ONLY):

    - {metric_name}

    [[Metric 1: Relevance]]
    [RELEVANCY_SCORE_CRITERIA]
    Relevance(1-5) - selection of important content from the source. The summary should include only valuable information from the source. Annotators were instructed to penalize responses which contains redundancies and excess information.

    [RELEVANCY_SCORE_STEPS]
    1. Read the response and the source carefully.
    2. Compare the response to the source and identify the main points.
    3. Assess how well the response covers the main points, and how much irrelevant or redundant information it contains.
    4. Assign a relevance score from 1 to 5.

    [[Metric 2: Coherence]]
    [COHERENCE_SCORE_CRITERIA]
    Coherence(1-5) - the collective quality of all sentences. We align this dimension with the DUC quality question of structure and coherence whereby "the response should be well-structured and well-organized. The response should not just be a heap of related information but should be built from sentence to a coherent body of information."

    [COHERENCE_SCORE_STEPS]
    1. Read the source carefully and identify the main topic and key points.
    2. Read the response and compare it to the source. Check if the response covers the main topic and key points of the source, and if it presents them in a clear and logical order.
    3. Assign a score for coherence on a scale of 1 to 5, where 1 is the lowest and 5 is the highest based on the Evaluation Criteria.

    [[Metric 3: Consistency]]
    [CONSISTENCY_SCORE_CRITERIA]
    Consistency(1-5) - the factual alignment between the response and the source. A factually consistent response contains only statements that are entailed by the source. Annotators were also asked to penalize responses that contained hallucinated facts.

    [CONSISTENCY_SCORE_STEPS]
    1. Read the source carefully and identify the main facts and details it presents.
    2. Read the response and compare it to the source. Check if the response contains any factual errors that are not supported by the source.
    3. Assign a score for consistency based on the Evaluation Criteria.

    [[Metric 4: Fluency]]
    [FLUENCY_SCORE_CRITERIA]
    Fluency(1-3): the quality of the response in terms of grammar, spelling, punctuation, word choice, and sentence structure.
    1: Poor. The response has many errors that make it hard to understand or sound unnatural.
    2: Fair. The response has some errors that affect the clarity or smoothness of the text, but the main points are still comprehensible.
    3: Good. The response has few or no errors and is easy to read and follow.

    [FLUENCY_SCORE_STEPS]
    Read the response and evaluate its fluency based on the given criteria. Assign a fluency score from 1 to 3.
    ```

