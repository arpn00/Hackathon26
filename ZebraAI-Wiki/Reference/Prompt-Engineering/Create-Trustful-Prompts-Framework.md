# Trustful Prompts for Support Ticket Analysis 
### (And any other tasks)
  
[[_TOC_]]


# 1. Introduction
Creating prompts for an AI that can be trusted when analyzing support tickets requires careful consideration of multiple factors to ensure accuracy, consistency, and relevancy.

***Hallucination: the model generates false or hypothetical data, occurs for several reasons:***

The model may try to fill gaps when unsure, lack sufficient context, is incapable of spotting inaccuracies, or not be trained to avoid errors or tries to be overhelpful, however, this issue can be mitigated through well-crafted prompts that encourage more accurate and logical responses, using prompt engineering techniques designed to steer the model towards a factual output.
This document outlines a “Prompt Creation Framework” for support ticket analysis that incorporates advanced prompting techniques to maximize the reliability of the model's output, it also contains information on how to showcase your results for a given project.

![Trustful Prompts 1](/wiki/imgs/Trustful-Prompts-1.png)

# 2. Prompt Creation Steps

## 2.1 Define Clear Goals and Scope
Before creating any prompt, define the specific goals of the analysis. Be clear about the scope, whether you want to analyze trends, root causes, business impacts, technical issues, etc.
### Goal Example:
- **Objective:** Identify patterns in the support tickets, both technical and business-related, and generate insights into frequent issues and customer escalations.

## 2.2 General Guidelines for Prompts


***Ensure the Following***  
    
- That your prompts do not include any text that is verbatim from the input data.
- Reduce the likelihood of using hypothetical data.
- Take care of PII

## 2.3 Create Prompts Using Specific Prompting Techniques

### 2.3.1 Role Prompting
**What it is:** Role prompting involves assigning the AI a specific role or persona to take on when generating a response. By framing the AI as an expert, assistant, or specific entity, you can steer the model to produce responses that align with that role.
  
**Example:**
- **Prompt:** “You are a cybersecurity expert. Analyze this report and provide suggestions for improving the company’s data security practices.”
- **Output:** “Based on the report, several vulnerabilities are evident. First, the firewall configurations should be updated to address potential backdoor access. Additionally, multi-factor authentication should be enforced across all critical systems…”
### 2.3.2 Zero-Shot Chain of Thought
**What it is:** prompting technique that explicitly asks the AI to think through a problem step by step before providing an answer.  
Unlike standard responses, which might provide an answer too quickly, Zero-Shot CoT forces logical reasoning, reducing errors in complex problems.  
  
**How It Works – Example Without Zero-Shot CoT**  
  
**Prompt (Without CoT)**
*"A farmer has 17 sheep, and all but 9 run away. How many sheep are left?"*  
  
**AI Response (Likely Incorrect)**
*"The number of sheep left is 8."*  
  
**Problem?**  
- The AI may **misinterpret the question** and fail to logically process the wording.
- It might **jump to a conclusion too fast**, assuming "all but 9" means 17 - 9 = 8.
  
**Using Zero-Shot Chain of Thought**  
  
**Prompt (With Zero-Shot CoT)**  
*"A farmer has 17 sheep, and all but 9 run away. Let's think through this step by step before answering."*  
  
**AI Response (Step-by-Step Reasoning)**  
- The total number of sheep the farmer originally had is **17**.
- The phrase "**all but 9** run away" means that **9 sheep did not run away**.
- Therefore, the number of sheep left is **9**.  

**Final Answer: 9 sheep are left.**  
  
**Why is this better?**
- Forces AI to **analyze the question logically** instead of guessing.
- Prevents misinterpretation of **tricky wording**.
- Leads to a **more reliable answer** in complex scenarios.

### 2.3.3 Few-Shot Prompting
**What it is:** Few-shot prompting involves providing the model with a few examples of the type of response you're looking for, and then asking it to generate a similar output. This is useful for guiding the model to follow specific formats or types of content.  

**Example:**  

- **Prompt:** “List all the identifiable issues on a case on a table by Ticket number, follow this markdown format: | Case Number | Case Description | Issue | Category | Reasoning |Time for This issue|. Use case creation time {{CreatedDateTime}} for the 'Time for This issue' column if you cannot infer the exact date from the communications or notes, For example: | SR12345 | Issue with VM access | SSH service not starting | Configuration Issue |The issue is related to connectivity and a service not starting |8/6/2024 4:47:03 AM|."”

Specific to reduce hallucination:
### 2.3.4 Use Retrieval-Augmented Generation (RAG)
RAG improves the trustworthiness of responses by pulling relevant external data (e.g., historical ticket data or knowledge bases) into the model’s context.  

**Prompt Structure (RAG):** 

Given the following historical support ticket data and current ticket dataset, identify recurring technical and business-related trends. Retrieve similar cases from the knowledge base to provide accurate comparisons. Cross-check any potential insights against past cases to ensure consistency in the analysis.  

- **Why It Works:** By retrieving external data, the model is anchored in concrete information, which increases the reliability of its analysis.
- **Use Case:** Trend analysis where the model compares new tickets against past issues for better context.

### 2.3.5 Chain-of-Verification (CoVe) Prompting
Incorporate verification steps into the prompt so the AI cross-references information from multiple tickets or sources before drawing conclusions.  

**Prompt Structure (CoVe):**  

Analyze the provided support tickets for technical and business trends. For each trend you identify, verify it by citing at least three related tickets where the issue or escalation occurred. Ensure each trend is backed by data points that confirm its validity.  

- **Why It Works:** This encourages the model to ground its analysis in specific data and ensures that every trend is verified by multiple sources.
- **Use Case:** When you need evidence-backed insights, such as identifying widespread issues based on multiple tickets.  

### 2.3.6 ReAct Prompting (Reasoning + Acting)
Guide the AI to first reason through the data logically and then act based on that reasoning. This helps the model arrive at well-thought-out conclusions.  

**Prompt Structure (ReAct):**  

First, categorize the support tickets into two groups: technical and business-related issues. Then, reason through each group to identify common patterns or outliers. Once you have reasoned through the data, act by summarizing key technical failures and business escalations. Finally, provide recommendations based on the trends you have identified.  

- **Why It Works:** Encourages step-by-step reasoning, ensuring that the model systematically works through the analysis instead of jumping to conclusions.
- **Use Case:** Detailed analysis where logical progression is necessary (e.g., diagnosing the root cause of recurring issues).  

### 2.3.7 Chain-of-Note (CoN) Prompting  
Use CoN prompting to make the AI annotate important points or potential flags during the analysis process. This provides a more granular, reliable set of insights.  

**Prompt Structure (CoN):**  

Review the support tickets and make annotations for each observation regarding technical failures and business issues. Highlight any unique cases or anomalies. Once the annotations are complete, summarize the key findings by reviewing the notes you've made.
- **Why It Works:** Encourages the AI to carefully document its process, increasing transparency and allowing for a more granular examination of issues.
- **Use Case:** When detailed, issue-by-issue insights are required (e.g., for ticket **prioritization or escalation reasons).  

### 2.3.8 Chain-of-Knowledge (CoK) Prompting  

Leverage the model's knowledge to contextualize the trends or patterns it identifies within a broader framework of common industry practices or known challenges.  

**Prompt Structure (CoK):**  

Using your knowledge of common technical issues and business escalations in the support field, analyze the provided tickets and identify both technical and business trends. Cross-reference these trends with known best practices or recurring industry challenges to ensure a robust analysis.
- **Why It Works:** This allows the AI to apply general knowledge to your specific problem, leading to more comprehensive and insightful analysis.
- **Use Case:** When you need broader industry insights to contextualize the support ticket analysis.
### 2.3.9 Multi-Step Prompting
Breaking the analysis into smaller, manageable steps ensures the model stays focused and comprehensive throughout the process.  

**Prompt Structure (Multi-Step):**
  
Step 1: Classify the support tickets into technical issues and business-related concerns.  
Step 2: Within each group, identify the top 5 recurring issues or escalations.  
Step 3: Provide a root cause analysis for the top 3 issues in each group.  
Step 4: Summarize the findings and provide actionable recommendations based on the trends observed.  
- **Why It Works:** Each step forces the model to focus on a specific task, ensuring depth and accuracy in each phase of the analysis.
- **Use Case:** When you want a detailed, methodical breakdown of complex support ticket datasets.  
  

## 2.4 Validation and Refinement Loop
Always include a refinement loop in your analysis process to ensure that the generated insights are double-checked for completeness and accuracy.  

**Prompt Structure (Validation Loop):** 
  
After completing the analysis of the support tickets, review the generated trends and insights. Validate the accuracy of each conclusion by revisiting the dataset. Where discrepancies or incomplete insights are found, refine your analysis to correct these. Provide a final version of the trends that have been thoroughly validated.
- **Why It Works:** Ensures that the AI double-checks its results, increasing the overall trustworthiness of the output.
- **Use Case:** Finalizing an analysis where any errors or gaps must be addressed before the report is delivered.  
## 2.5 Prompt and Analysis Validation

**Validation:**  
After creating a prompt, validate the model using the 30% of the data set, perform a manual analysis to ensure the accuracy of your prompts and the analysis that the model is performing and adjust accordingly so ensure the prompts are reducing the likelihood of using hypothetical data.

Take note of True positive and True Negative results, this indicates that the model performed correctly, focusing on False Positive and False Negative results to improve your prompts.  

**Techniques for Validation:**
- Use ZebraAI chat.

**Improvement:**  

You can do it yourself or use AI to improve your prompts.
Using AI to refine your prompts can be a highly effective approach to improving the quality and relevance of the responses generated.

## 2.6 Prompt Examples (Tips and Tricks)

### 2.6.1 PII
```
"You will be provided with sensitive information and tasked with performing specific actions. Your responses must comply with the following guidelines to ensure no Personally Identifiable Information (PII) is disclosed: What to Exclude: Full names of individuals (e.g., customers, support agents) Company names Email addresses, phone numbers, or physical addresses Social Security Numbers (SSNs), financial details (e.g., credit card, bank accounts) Government-issued identification numbers (e.g., passport or driver's license numbers) Any other data that can uniquely identify a person Additional Requirements: Anonymization: Your responses should paraphrase or summarize any unstructured text you receive. Avoid direct replication of phrases or sentences from the provided data. Caution with Ambiguity: If uncertain whether a piece of information qualifies as PII, exclude it entirely to ensure compliance. Few-short Examples: Input Example 1: \"Customer John Smith reached out to request a refund. His address is 123 Main St, Anytown, USA, and his credit card number is 1234-5678-1234.\" Incorrect Response: \"John Smith requested a refund. His address and credit card details were provided.\" Correct Response: \"A customer requested a refund. The address and financial details have been noted and should be handled according to privacy protocols.\" Input Example 2: \"Support agent Sally Jones communicated with the customer via email sally.jones@company.com to resolve the issue.\" Incorrect Response: \"Sally Jones emailed the customer to resolve the issue.\" Correct Response: \"The support agent contacted the customer to resolve the issue.\""
```
### 2.6.2 Verbatim Text
“Do not include any text in the output that is verbatim from the input data. Ensure that all text is paraphrased or summarized to avoid exact replication of the input content.”

### 2.6.3 Hypothetical Data
“Do not provide hypothetical data to illustrate any points. Only use the data provided to you, avoid fabricating information when you are unsure of the real answer, If you are unsure of an answer then state that there's no sufficient information to produce it.”

### 2.6.4 Prompt Refinement

“Act as a prompt engineer, I have a prompt that I would like you to improve. The goal is to make the prompt clearer, more specific, and effective for generating detailed and accurate responses. Please analyze the prompt and suggest refinements. If possible, provide examples of how your improvements would change the outcome.

Here is the original prompt:  
"[Insert your original prompt here]"

Please follow these steps to improve the prompt:
1. Identify any ambiguities or areas where clarity can be enhanced.
2. Suggest changes to make the prompt more specific and actionable.
3. Ensure the revised prompt guides the AI towards generating factually correct and relevant responses.
4. Provide examples of what kind of response the original prompt would generate and how the refined prompt would improve it.
After making improvements, explain why your changes will lead to better outputs.”

### 2.6.5 Goal reminder
This is for the human, not as part of the prompt, regardless of what the goal is, you can repeat it at the end of the prompt, so the AI gets that reminder, This helps AI maintain focus on the task and ensures alignment with the desired outcome.

### 2.6.6 Highly effective Instructions (Magical Phrases)

#### 2.6.6.1 Quality Control & Accuracy
- **“Prioritize depth over breadth.”** → Ensures a focused and detailed response rather than a surface-level one.
- **“If uncertain, state your confidence level and the most likely answer.”** → Encourages transparency in uncertain situations.
- **“Cite sources or provide logical reasoning for claims.”** → Reduces hallucinations and ensures factual correctness.
- **“Explain your reasoning step by step.”** → Encourages logical structuring of responses.
- **“Highlight any assumptions made in this answer.”** → Improves awareness of hidden biases in AI responses.  

#### 2.6.6.2 Refining & Improving Output
- **“Generate multiple variations and rank them from best to worst.”** → Useful when you want the AI to evaluate and refine its own responses.
- **“First provide an answer, then critique it and improve it.”** → Forces self-review and iterative improvement.
- **“Ensure the output is structured logically and formatted for easy readability.”** → Helps when generating documents, code, or structured data.
- **“Summarize the key insights in bullet points before elaborating.”** → Ensures clarity and prevents unnecessary fluff.
- **“Let’s do this step by step” or “Sequentially analyze each part before proceeding to the next.”**  → Forces the AI to slow down and logically structure its response.
- **“Think through this problem carefully" or “Analyze all possible angles and identify the most effective solution.”** → Encourages deliberate, methodical reasoning rather than a rushed answer.
- **“Break down your reasoning in a structured, step-by-step manner"** → Encourages explicit logical progression rather than implicit assumptions.
- **"Deciding on the best sequence yourself"** → Gives AI the autonomy to optimize the process order, rather than assuming a fixed sequence.
- **“Step 1: Identify…, Step 2: Output format…, Step 3: Verification…”** → Forces AI into a structured execution plan.
#### 2.6.6.3 Creativity & Problem-Solving
- **“Think like an expert in [field].”** → AI takes on a more specialized approach rather than a generic one.
- **“Provide unconventional but effective solutions.”** → Encourages lateral thinking instead of predictable answers.
- **“Imagine you're advising a top executive—be concise yet insightful.”** → Forces a balance between brevity and value.
- **“Give me an answer a world-class expert in this field would give.”** → Raises the response quality.
#### 2.6.6.4 Critical Thinking & Counterpoints
- **“Play devil’s advocate and critique this approach.”** → Forces AI to evaluate flaws in reasoning.
- **“List possible objections and how to address them.”** → Encourages robust, preemptive counterarguments.
- **“Compare and contrast multiple viewpoints before concluding.”** → Promotes balanced reasoning.
#### 2.6.6.4 Structured Execution & Code Generation
- **“Provide a solution first, then an explanation.”** → Reduces unnecessary filler before the main content.
- **“Follow best practices in [field].”** → Helps when generating technical outputs.
- **“Output the response in a structured template.”** → Ensures consistency, especially in technical writing.
- **“Include example use cases where applicable.”** → Helps contextualize code, concepts, or frameworks.
#### 2.6.6.5 Optimization & Efficiency
- **“Optimize for clarity and conciseness.”** → Ensures succinct, readable answers.
- **“Balance depth and efficiency—explain without unnecessary complexity.”** → Prevents over-complication.
- **“Prioritize actionable insights over general knowledge.”** → Ensures practical usefulness.
#### 2.6.6.6 Ethical & Safety Considerations
- **“Flag any potential biases in this response.”** → Improves fairness and reduces harmful assumptions.
- **“Ensure this advice follows ethical best practices.”** → Important for AI-generated recommendations in sensitive fields.
- **“Identify potential risks or unintended consequences.”** → Encourages a risk-aware approach.

#### 2.6.6.7 Meta-Enhancements for Prompting
If you're experimenting with AI prompting, you might also find it useful to combine these magic phrases. For example:
- **“Give me the best answer possible first, then refine it based on depth, clarity, and accuracy.”**
- **“Provide a response, then generate an alternative perspective and refine both into a stronger final answer.”**
- **“Write this as if it were an executive summary for decision-making, then a detailed breakdown for technical implementation.”**


### 2.6.7 Other Phrases
- “Prioritize quality over speed"  
- “Prioritize truth over agreement”  

# 3. Showcase your Results
Showcasing your results in a comparative way is a key element for this, highlighting how a process was improved by your work or how you created a process to do something that was not even done before and how that affects the business.

Present how a process was done before and after, then add anything that will take it even further, faster, better, etc.

Example:  

**Leveraging AI for Support Documentation**  

An AI assisted document creation process will heavily impact the organization in terms of:
  

| Aspect            | AI Assisted                                                                     | Human                                                                                   |
|-------------------|-------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------|
| Efficiency and Speed | Large amounts in minutes, one doc takes 1 minute to be ready for Human review                   | Starting, researching, drafting consumes a lot of time, one doc will be ready in 2 to 8 hours depending on complexity |
| Consistency and Standardization | AI consistently follows predefined rules for style, formatting, and terminology, reducing variability and ensuring a standardized document structure | Human writers might introduce inconsistencies due to personal writing styles, fatigue, or misinterpretation of guidelines |
| Quality and Accuracy | AI can quickly detect and correct grammar, spelling, and formatting errors. It can cross-reference data with existing sources to improve accuracy | Humans excel in understanding complex contexts, nuanced language, and subject matter expertise, which can enhance the accuracy and quality of documentation. They can identify and explain intricate details AI might overlook. |

Workflow slide, before and after:

![Trustful Prompts 2](/wiki/imgs/Trustful-Prompts-2.png)

Time Savings Slide:

![Trustful Prompts 3](/wiki/imgs/Trustful-Prompts-3.png)

Future, having this tool integrated on the DevOps Wiki (Other places could be Teams or DFM) will make it more usable, seamless for the human and overall, more convenient to use than its current form:

![Trustful Prompts 4](/wiki/imgs/Trustful-Prompts-4.png)

Take this template as an example: ShowcasingExperimentsTemplate.pptx

# Support Information on Prompt Engineering
Use this prompt on an LLM to get a full course on prompt engineering:

```
“Design a comprehensive multi-week course on prompt engineering that is accessible to beginners while also engaging intermediate and expert learners. Organize the course into clearly defined modules with detailed lesson plans. For each module, include:
• A brief overview with clear learning objectives
• Granular lessons that start with the fundamentals and progressively build advanced techniques
• Interactive, hands-on exercises that allow for practice in rewriting prompts and analyzing case studies
• Real-world examples and case studies to illustrate key concepts.
- Each module includes at least one detailed case study and one sample prompt example that I can analyze or modify.
• A summary of key takeaways and optional discussion or reflection questions
Ensure the course adopts a casual, engaging tone and is written in plain text, the language should be clear, conversational, and free of deep technical jargon where possible, especially in modules aimed at beginners.
Use bullet points for listing both modules and individual lessons. The course structure should be flexible to adjust the duration as needed, with the initial plan designed for multiple weeks but open to iterative refinement based on learner progress and emerging best practices.
Ensure you cover the following key topics:

• Fundamentals of prompt engineering
• Techniques for writing effective prompts
• Iterative refinement and troubleshooting
- Include a built-in feedback mechanism at the end of each module
• Advanced strategies for complex prompt design
Also suggest additional relevant topics that naturally complement prompt engineering.
The final output should provide a detailed module breakdown, including lesson objectives, interactive components, and examples, and be open to future adjustments.
You might include self-assessment quizzes to further enhance engagement.
For the advanced level you must include: a Prompt Engineering Challenge, a Case Study and a Refinement Exercise (Improving Your Prompt).
”
```


# References

| Document Name                | Link                                                                                      | Notes             |
|-----------------------------|-------------------------------------------------------------------------------------------|-------------------|
| Prompt Engineering With Zebra | Prompt Engineering with ZebraAI.docx                                                     | Doc for Zebra AI  |
| Prompt Engineering With Zebra | [ZebraAI Wiki Article](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/141/Prompt-Engineering-with-) | ZebraAI Wiki Article |




