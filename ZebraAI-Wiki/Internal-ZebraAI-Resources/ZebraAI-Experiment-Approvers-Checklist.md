# Experiment Approvers Checklist

A guide to ensure real secure support data in Torus remains secure by means of prompt security, data leakage prevention, malicious intent detection, and responsible AI principles when approving experiments.

## Introduction

As a Prompt Approver, you are responsible for reviewing and approving experiments that would like to use real support data. Real support data is highly sensitive, and it should be handled with care and caution. You should ensure that the experiments you approve follow the prompt security, data leakage prevention, malicious intent detection, and responsible AI principles that are outlined in this document. These principles are designed to protect the privacy and security of the customers, the integrity of the data, and the reputation and trust of Microsoft.

## Prompt Security

Prompt security refers to the measures that are taken to prevent unauthorized access, modification, or disclosure of the prompts have requested approval for use with real support data. Prompt security is important to ensure that the prompts are accurate, relevant, and helpful, and that they do not contain any sensitive or confidential information that could harm our customers or Microsoft. To ensure prompt security, you should check the following tasks before approving an experiment:

- Verify that the experiment has a clear and specific purpose and scope.
- Verify that the experiment has no PII in the prompt.
- Verify that the experiment is not abusing the use of tokens by including excessive amounts of unnecessary information.

## Data Leakage Prevention

Data leakage prevention refers to the measures that are taken to prevent accidental or intentional exposure of the real support data that is used and displayed by prompts. Data leakage prevention is important to ensure that the data is not compromised, misused, or exploited by users. To prevent data leakage, you should check the following tasks before approving an experiment:

- Verify that the experiment has strict and minimal data selection and extraction process, and that it only uses the data that is necessary and relevant for the experiment.
- Verify that the experiment has not made a direct or indirect request to return raw PII, sensitive information, or confidential information from the data.

## System Prompt Injection

Prior to the release of ZebraAI build 1.2.3.5 a standard system prompt, see below was required in every experiment before it could be approved. With 1.2.3.5, a feature to automatically inject this prompt was deployed.  Regardless of the state of the **Inject System Prompt** checkbox when approval is requested. when appoval is granted the **Inject System Prompt** is set and required system prompts automatically added to the experiment.  The standard PII and sensitive data protextion prompt is therefore no longer required for Experiment Approval.  

```
"Content": "Instructions: You will be provided with sensitive information and tasked with performing specific actions. Your responses must comply with the following guidelines to ensure no Personally Identifiable Information (PII) is disclosed:\n\n  
  
  What to Exclude:\n  
  Full names of individuals (e.g., customers, support agents)\n  
  Company names\n  
  Email addresses, phone numbers, or physical addresses\n  
  Social Security Numbers (SSNs), financial details (e.g., credit card, bank accounts)\n  
  Government-issued identification numbers (e.g. passport or driver's license numbers)\n  
  Any other data that can uniquely identify a person\n  
    
  Additional Requirements:\n  
  Anonymization: Your responses should paraphrase or summarize any unstructured text you receive. Avoid direct replication of phrases or sentences from the provided data.\n\nCaution with Ambiguity: If uncertain whether a piece of information qualifies as PII, exclude it entirely to ensure compliance.\n\n  
    
  Few-shot Examples:\n  
  Input Example 1: \"Customer John Smith reached out to request a refund. His address is 123 Main St, Anytown, USA, and his credit card number is 1234-5678-1234.\"\n  
  Incorrect Response:\n  
    \"John Smith requested a refund. His address and credit card details were provided.\"\n  
  Correct Response:\n  
    \"A customer requested a refund. The address and financial details have been noted and should be handled according to privacy protocols.\"\n\n  
      
  Input Example 2: \"Support agent Sally Jones communicated with the customer via email sally.jones@company.com to resolve the issue.\"\n  
  Incorrect Response:\n
    \"Sally Jones emailed the customer to resolve the issue.\"\n  
    
  Correct Response:\n
    \"The support agent contacted the customer to resolve the issue.\""
```
## Malicious Intent Detection

Malicious intent detection refers to the measures that are taken to prevent prompts that are harmful, offensive, or inappropriate. Malicious intent detection is important to ensure that a prompt is unable to do something that could cause harm or damage the reputation, trust, or relationship of ZebraAI with its users. To detect malicious intent, you should check the following tasks before approving an experiment:

- Verify that the experiment is unable do remote execution on a user computer or in ZebraAI’s Azure environment.
- Verify that the experiment is unable to retrieve information about a user.
- Verify that the experiment is unable to perform prompt injections.

## Responsible AI Principles

Responsible AI principles refer to the values and guidelines that are followed to ensure that prompts using real support data are ethical, fair, and beneficial for the users and Microsoft. Responsible AI principles are important to ensure that the prompts respect and protect the dignity, rights, and interests of users, our customers and Microsoft, and that they do not cause any harm or disadvantage to them. To follow responsible AI principles, you should check the following tasks before approving an experiment:

- Verify that the experiment is free of bias and doesn’t make decisions that result in discrimination or favor any group or individual based on their characteristics or attributes.
- Verify that the experiment has transparent and accountable prompts, and that they can explain and justify the logic, methods, and results of the prompts.
- Verify that the experiment protects PII and does not subvert data privacy laws like GPDR.  
  
## Token Efficiency and Placeholder Review
Large placeholders such as {{CaseNotes}} and {{EmailTranscripts}} often contain extensive text blocks. When these placeholders appear multiple times in a single prompt, they significantly increase token count, which leads to:
- Higher operational costs due to increased token usage.
- Reduced performance because longer prompts can slow down processing and impact model responsiveness.

**Approval Check:**
Before approving an experiment, verify that the prompt does not include unnecessary repetitions of {{CaseNotes}} or {{EmailTranscripts}}. If multiple instances are present, confirm whether they are essential for the experiment’s logic. If not, reject the request and ask the experiment owner to consolidate or remove duplicates.

**Example response:**
Thank you for your submission. We’re unable to approve this experiment because {{CaseNotes}} and {{EmailTranscripts}} are repeated multiple times in the prompt. These placeholders usually contain large text blocks, and repeating them unnecessarily increases token count, which leads to higher costs and reduced performance.

Best Practice:
Usually, these fields should only be added once in an Input section of your prompt:

Example:
CaseNote: {{CaseNotes}}  
EmailsTable: {{EmailTranscripts}}  

Please revise the prompt to minimize repeated placeholders and resubmit for approval.

## Experiment Form and Attribution
Experiment form refers to the use of fields included within the experiment, other than the prompt.  These fields should be completed in a meaningful way, so that the intent of the experiment and the need to access CSS Data is clear. Check the following fields before approving the experiment:
- **Title:** a brief and meaningful statement in the business context and reflects what the experiment is meant to accomplish. Title must not include “Copy of…”
- **Description:** reflects what the experiment is meant to accomplish. The description provides context for approvers or others who may use the experiment.
- **Hypothesis Attributes:** communicate the intended benefit of the experiment.  A fully formed ROI statement is not expected or desired.  It is expected that the ROI details will be learned through experimentation. Hypothesis components should include:
    - **Comprehension:** Something that can be improved upon is identified
    - **Response:** Change that can cause improvement
    - **Outcome:** Measurable result of change that determines success
- **Impact Metrics:** the business metrics to be improved are included.
- **Initiative Driver/Business Justification:** If the experiment is associated with an initiative, it is shared or there is a statement of business value.   

## Approving ZebraAI Experiments Process

The process for approving experiments: [Approving Experiments Process](Approving-ZebraAI-Experiments-Process.md).

## Resources
[PromptLabs/Prompt-Hacking-Resources: A list of curated resources for people interested in AI Red Teaming, Jailbreaking, and Prompt Injection](https://github.com/PromptLabs/Prompt-Hacking-Resources)
[AI Engineering Handbook: LLMs, RAG, Agents & System Design | Exemplar](https://handbook.exemplar.dev/ai_engineer/prompt_engineering/prompt_hacking)
[Prompt Hacking: Understanding Types and Defenses for LLM Security](https://learnprompting.org/docs/prompt_hacking/introduction)
[Responsible use ofResponsible use of AI for MCAPS (sharepoint.com)](https://microsoft.sharepoint.com/teams/TrIP/SitePages/Responsible-use-of-AI.aspx)  
[Data, privacy, and security for Azure OpenAI Service - Azure AI services | Microsoft Learn](https://learn.microsoft.com/en-us/legal/cognitive-services/openai/data-privacy?tabs=azure-portal)  
[Responsible AI Principles and Approach | Microsoft AI](https://www.microsoft.com/en-us/ai/principles-and-approach/)  
[Welcome to the Office of Responsible AI (sharepoint.com)](https://microsoft.sharepoint.com/sites/ResponsibleAI)  
[Data classification labels (sharepoint.com)](https://microsoft.sharepoint.com/sites/MSProtect/SitePages/Data-Classification-Labels.aspx)  
[OpenAI Security Portal | SafeBase](https://trust.openai.com/)
[Why it's hard to defend against AI prompt injection attacks • The Register](https://www.theregister.com/2023/04/26/simon_willison_prompt_injection/)  
[🔓 Prompt Hacking | Learn Prompting: Your Guide to Communicating with AI](https://learnprompting.org/docs/prompt_hacking/introduction)  