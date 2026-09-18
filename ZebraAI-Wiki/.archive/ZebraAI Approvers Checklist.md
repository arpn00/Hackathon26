# Introduction

As a Prompt Approver, you are responsible for reviewing and approving
experiments that would like to use real support data. Real support data
is highly sensitive, and it should be handled with care and caution. You
should ensure that the experiments you approve follow the prompt
security, data leakage prevention, malicious intent detection, and
responsible AI principles that are outlined in this document. These
principles are designed to protect the privacy and security of the
customers, the integrity of the data, and the reputation and trust of
Microsoft.

# Prompt Security

Prompt security refers to the measures that are taken to prevent
unauthorized access, modification, or disclosure of the prompts have
requested approval for use with real support data. Prompt security is
important to ensure that the prompts are accurate, relevant, and
helpful, and that they do not contain any sensitive or confidential
information that could harm our customers or Microsoft. To ensure prompt
security, you should check the following tasks before approving an
experiment:

Verify that the experiment has a clear and specific purpose and scope.

Verify that the experiment has no PII in the prompt.

Verify that the experiment is not abusing the use of tokens by including
excessive amounts of unnecessary information.

# Data Leakage Prevention

Data leakage prevention refers to the measures that are taken to prevent
accidental or intentional exposure of the real support data that is used
and displayed by prompts. Data leakage prevention is important to ensure
that the data is not compromised, misused, or exploited by users. To
prevent data leakage, you should check the following tasks before
approving an experiment:

Verify that the experiment has strict and minimal data selection and
extraction process, and that it only uses the data that is necessary and
relevant for the experiment.

Verify that the experiment has not made a direct or indirect request to
return raw PII, sensitive information, or confidential information from
the data.

# Malicious Intent Detection

Malicious intent detection refers to the measures that are taken to
prevent prompts that are harmful, offensive, or inappropriate. Malicious
intent detection is important to ensure that a prompt is unable to do
something that could cause harm or damage the reputation, trust, or
relationship of ZebraAI with its users. To detect malicious intent, you
should check the following tasks before approving an experiment:

Verify that the experiment is unable do remote execution on a user
computer or in ZebraAI's Azure environment.

Verify that the experiment is unable to retrieve information about a
user.

Verify that the experiment is unable to perform prompt injections.

# Responsible AI Principles

Responsible AI principles refer to the values and guidelines that are
followed to ensure that prompts using real support data are ethical,
fair, and beneficial for the users and Microsoft. Responsible AI
principles are important to ensure that the prompts respect and protect
the dignity, rights, and interests of users, our customers and
Microsoft, and that they do not cause any harm or disadvantage to them.
To follow responsible AI principles, you should check the following
tasks before approving an experiment:

Verify that the experiment is free of bias and doesn't make decisions
that result in discrimination or favor any group or individual based on
their characteristics or attributes.

Verify that the experiment has transparent and accountable prompts, and
that they can explain and justify the logic, methods, and results of the
prompts.

Verify that the experiment protects PII and does not subvert data
privacy laws like GPDR.

# Approving ZebraAI Experiments Process

The process for approving experiments is available
[here](https://microsoftapc.sharepoint.com/teams/ZebraAI/Shared%20Documents/General/Approvers/Approving%20ZebraAI%20Experiments%20Process.docx?web=1).

# Resources

[Prompt-Hacking.pptx](https://microsoft.sharepoint.com/:p:/t/OpenAIHackathon2/EfRuSJW56DlBmfFtBLJNAhIBU-pbcUjDa-Y2v59bmtc5jw?e=Pzu5y5)

[Responsible use of AI for MCAPS
(sharepoint.com)](https://microsoft.sharepoint.com/teams/TrIP/SitePages/Responsible-use-of-AI.aspx)

[Data, privacy, and security for Azure OpenAI Service - Azure AI
services \| Microsoft
Learn](https://learn.microsoft.com/en-us/legal/cognitive-services/openai/data-privacy)

[Responsible AI Principles and Approach \| Microsoft
AI](https://www.microsoft.com/en-us/ai/principles-and-approach/)

[Welcome to the Office of Responsible AI
(sharepoint.com)](https://microsoft.sharepoint.com/sites/ResponsibleAI)

[Data classification labels
(sharepoint.com)](https://microsoft.sharepoint.com/sites/MSProtect/SitePages/Data-Classification-Labels.aspx)

[OpenAI Security Portal \| SafeBase](https://trust.openai.com/)

[Why it\'s hard to defend against AI prompt injection attacks • The
Register](https://www.theregister.com/2023/04/26/simon_willison_prompt_injection/)

[🔓 Prompt Hacking \| Learn Prompting: Your Guide to Communicating with
AI](https://learnprompting.org/docs/category/-prompt-hacking)
