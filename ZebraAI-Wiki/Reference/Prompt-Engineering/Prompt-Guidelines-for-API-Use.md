# Prompt and Experiment Guidelines for API

When engineering your experiments for use through an API there are a number of considerations to be addressed. Primary among these considerations is the need for your experiment to consume tokens efficiently. Unlike when your experiment is run from the web by a single user, API calls can be made by any number of users at the same time.  This creates a multiplication effect for the resources being consumed. The best way to avoid performance issues is to ensure that your prompts are written to be as efficient as possible. Creating effective prompts for API use and ensuring efficiency involves several best practices and guidelines. Here are some key points to consider:

## Best Practices for API Prompts 
-  **Provide Clear Context:** Be specific about the task and include relevant details. This helps the model understand the exact requirements and reduces ambiguity.
-  **Customize Prompts for Each Task:** Tailor prompts to fit unique use cases. Avoid generic prompts and include industry-specific terms and precise evaluation criteria1.
-  **Break Tasks into Steps:** Simplify complex workflows by dividing tasks into smaller, logical steps. Sequential prompts can guide the model through processes like analyzing data, identifying patterns, and drawing conclusions.
-  **Define Output Specifications:** Clearly outline the desired response format, structure, tone, and length. Whether you need a response in plain text, JSON, or XML, providing these details ensures the output meets your requirements.
-  **Validate and Preprocess Inputs:** Reliable outputs start with clean inputs. Use preprocessing to standardize text and formatting, remove inconsistencies, and ensure inputs are error-free.
-  **Set Personas and Tone:** Align the model’s tone with your audience and purpose. Defining the AI’s role (e.g., "Act as a marketing strategist") can help tailor responses to specific needs.
-  **Use Version Control:** Track changes and maintain consistency. This helps in managing prompt iterations and ensuring that updates are systematically applied.
-  **Fine-Tune Model Parameters:** Adjust settings like temperature for task-specific needs. Lower temperatures can improve precision, while higher temperatures can enhance creativity.
-  **Continuously Test and Improve:** Regularly monitor and refine prompts. Use tools like Latitude, LangChain, and PromptLayer to streamline workflows and integrate prompt optimization into CI/CD pipelines.

## Guidelines for Writing Efficient Prompts
-  **Understand Your Objectives:** Define the goal of the prompt clearly. Know what you want to achieve and tailor the prompt accordingly3.
-  **Use Clear and Concise Language:** Avoid ambiguity and be specific with your requests. Simple language ensures the AI understands your request and provides accurate responses.
-  **Include Context and Details:** Provide relevant information to guide the AI in generating precise responses. Context helps set the stage for the AI and improves the relevance of the output.
-  **Use Examples:** Incorporating examples in your prompts can guide the AI in understanding the desired format, style, or depth of response. This helps in achieving the expected output.
-  **Experiment and Iterate:** Sometimes, the first prompt might not give you the desired output. Experiment with different prompt structures and iterate based on the results to refine the prompts.

By following these best practices and guidelines, you can create effective and efficient prompts that enhance the performance of your experiments.

# Environment Factors

ZebraAI runs on Azure OpenAI. The number of concurrent prompts that can be run on an instance of Azure OpenAI depends on the specific configuration and resource allocation of your Azure instance. Generally, Azure OpenAI allows for multiple concurrent requests, but the exact number can vary based on factors such as:

- Instance Size: Larger instances can handle more concurrent prompts.
- Resource Allocation: The amount of CPU, memory, and other resources allocated to your instance.
- Rate Limits: Azure OpenAI may have rate limits in place to ensure fair usage and performance stability.

While the above factors are determined by others, it is important to know the types of constraints any ZebraAI experiment must execute within.  


# Prompting Techniques

The following table includes methods for writing effiective prompts.

| **Technique Name** | **Description** | **Source Link** |
|--------------------|-----------------|-----------------|
| **Chain of Thought (CoT)** | Chain of Thought prompting encourages the model to articulate intermediate reasoning steps before arriving at the final answer. By decomposing complex tasks into sequential steps, CoT enhances the model's ability to handle intricate problems that require logical reasoning, mathematical calculations, or multi-faceted analysis. This mirrors human problem-solving processes, leading to more accurate and interpretable responses. | [Chain-of-Thought Prompting Elicits Reasoning in Large Language Models](https://arxiv.org/abs/2201.11903) |
| **In-Context Learning** | In-Context Learning provides examples within the prompt to guide the model's response. This technique leverages the model's capacity to learn patterns and tasks from the context without additional fine-tuning. By showcasing desired behaviors or formats directly in the prompt, the model adapts quickly to new tasks, making it highly flexible and powerful for a wide range of applications. | [Language Models are Few-Shot Learners](https://arxiv.org/abs/2005.14165) |
| **Retrieval Augmented Generation (RAG)** | RAG integrates external information retrieval into the generation process. By incorporating relevant data from external sources into the prompt, the model's responses become more accurate and grounded in up-to-date information. This significantly reduces hallucinations (i.e., the model generating incorrect or fabricated facts) and enhances performance on tasks requiring current or specialized knowledge. | [Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://arxiv.org/abs/2005.11401) |
| **Few-Shot Prompting** | Few-Shot Prompting provides targeted examples that directly illustrate the expected behavior, enabling the model to quickly infer the task's structure without extensive fine-tuning. By embedding demonstrations into the prompt, the technique harnesses the model's inherent pattern-recognition abilities, resulting in improved generalisation, context understanding, and output consistency across diverse tasks. This method not only reduces ambiguity in instruction but also makes the model highly adaptable, bridging the gap between zero-shot conditions and fully supervised training scenarios. | [Optimization as a Model for Few-Shot Learning](https://openreview.net/forum?id=rJY0-Kcll) |
| **Chain-of-Draft (CoD)** | Chain-of-Draft (CoD) is a human-inspired method where LLMs produce concise and essential intermediate reasoning steps, in contrast to the verbose, step-by-step approach of Chain-of-Thought (CoT) prompting. This strategy achieves similar or superior accuracy on complex reasoning tasks while using just 7.6% of the tokens, significantly reducing cost and latency. | [Chain of Draft: Thinking Faster by Writing Less](https://arxiv.org/abs/2502.18600) |
| **ReAct Framework** | The ReAct (Reasoning and Acting) Framework combines reasoning steps with action-oriented outputs, enabling the model to not only process information but also interact with external tools or environments. This approach allows the model to perform tasks that require tool use, such as calculations, data retrieval, or interfacing with APIs, dramatically expanding its practical applications. | [ReAct: Synergizing Reasoning and Acting in Language Models](https://arxiv.org/abs/2210.03629) |
| **Automatic Chain-of-Thought (Auto-CoT)** | Auto-CoT automates the generation of reasoning steps without relying on human-annotated examples. By clustering problems and generating intermediate reasoning paths through zero-shot methods, it scales the benefits of Chain of Thought prompting to a broader range of tasks efficiently. This enhances logical consistency and problem-solving capabilities without extensive manual intervention. | [Automatic Chain of Thought Prompting in Large Language Models](https://arxiv.org/abs/2210.03493) |
| **Role-Prompting** | Role-Prompting assigns a specific persona or role to the model, such as a domain expert, teacher, or assistant. This technique influences the tone, depth, and style of the responses, making them more tailored and contextually appropriate. It enhances engagement and relevance, especially in tasks requiring specialized knowledge or particular communication styles. | [Unleashing the potential of prompt engineering in Large Language Models: a comprehensive review](https://arxiv.org/abs/2310.14735) |
| **Analogical Reasoning** | Analogical Reasoning enables the model to solve new problems by drawing parallels with known concepts or situations. By identifying similarities between different contexts, the model can transfer knowledge and apply it creatively to novel scenarios. This enhances problem-solving abilities and fosters innovative thinking, making it valuable for tasks that benefit from abstract reasoning. | [Large Language Models as Analogical Reasoners](https://arxiv.org/abs/2310.01714) |
| **Chain of Knowledge (CoK)** | Chain of Knowledge breaks down tasks into sequential, evidence-based steps, allowing the model to build upon prior information effectively. By dynamically adjusting the flow of knowledge, CoK enhances the model's ability to handle complex reasoning tasks that require integrating multiple pieces of information over several stages, leading to more comprehensive and accurate outcomes. | [Chain-of-Knowledge: Grounding Large Language Models via Dynamic Knowledge Adapting over Heterogeneous Sources](https://arxiv.org/abs/2305.13269) |

## Example Usage for Each of the Prompting Techniques

| **Technique Name** | **Example Usage in a Prompt** |
|--------------------|-------------------------------|
| **Chain of Thought (CoT)** | Let's think step by step |
| **In-Context Learning** | Example: Q: Translate ‘Good morning’ to Spanish. A: ‘Buenos días.’ Example: Q: What is 3+5? A: ‘8.’ Now, using these examples as a guide, answer: [Your Query]. |
| **Retrieval Augmented Generation (RAG)** | Context: [Insert retrieved factual snippets]. Based on the above information, answer the question: [Your Question]. |
| **Few-Shot Prompting** | Example 1: Q: Summarise the following text. A: [Brief Summary]. Example 2: Q: Summarise this paragraph. A: [Another Brief Summary]. Now, summarise: [New text]. |
| **Chain-of-Draft (CoD)** | Think step by step, but only keep a minimum draft for each thinking step, with 5 words at most. Then generate your final answer. |
| **ReAct Framework** | Reason: Analyse the problem and decide on the needed action. Action: If required, perform a lookup (e.g., ‘Action: Retrieve current data’). Finally, combine these steps and provide the answer: [Your Answer]. |
| **Automatic Chain-of-Thought (Auto-CoT)** | Without explicit examples, break down the problem into intermediate steps automatically. Provide a brief reasoning for each step before concluding with the final answer: [Your Problem]. |
| **Role-Prompting** | You are a seasoned expert in [field]. Using your domain expertise, provide a detailed explanation and answer the following question: [Your Question]. |
| **Analogical Reasoning** | Consider how [Concept A] is similar to [Concept B]. Using this analogy, explain and answer: [Your Query]. |
| **Chain of Knowledge (CoK)** | Step 1: Identify and list key facts about [Topic]. Step 2: Connect the facts logically. Step 3: Using the evidence, provide a comprehensive answer to: [Your Question]. |

For more on Prompt Engineering see [Prompt Engineering with ZebraAI](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/141/Prompt-Engineering-with-ZebraAI)