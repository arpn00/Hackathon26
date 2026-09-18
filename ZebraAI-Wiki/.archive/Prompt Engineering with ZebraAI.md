
Creating a detailed wiki page from the extensive content provided in "Prompt Engineering with ZebraAI.txt" involves organizing the material into a structured and navigable format. Here’s how you could structure the wiki page:

---

## Prompt Engineering with ZebraAI

### Introduction
ZebraAI is an AI for Support experimentation platform that allows users to quickly test hypotheses or ideas through prompt engineering that interacts with different types of customer support data and Large Language Models (LLMs) in a secure, compliant way.

### Table of Contents
1. [Overview of ZebraAI Experiments](#overview-of-zebraai-experiments)
2. [Principles of Prompt Engineering](#principles-of-prompt-engineering)
3. [Prompt Engineering Techniques](#prompt-engineering-techniques)
    - [Template-Based Prompting](#template-based-prompting)
    - [Input/Output Prompting](#input-output-prompting)
    - [Zero-Shot Prompting](#zero-shot-prompting)
    - [One-Shot Prompting](#one-shot-prompting)
    - [Few-Shot Prompting](#few-shot-prompting)
    - [Chain-of-Thought Prompting](#chain-of-thought-prompting)
    - [Self-Criticism Prompting](#self-criticism-prompting)
    - [Iterative Prompting](#iterative-prompting)
4. [Prompt Engineering in ZebraAI](#prompt-engineering-in-zebraai)
5. [Starting a ZebraAI Experiment](#starting-a-zebraai-experiment)
6. [ZebraAI Prompt Basics](#zebraai-prompt-basics)
7. [Using Data in ZebraAI](#using-data-in-zebraai)
8. [Internal and External Prompt Engineering Resources](#internal-and-external-prompt-engineering-resources)
9. [Tips and Best Practices for Prompt Engineering](#tips-and-best-practices-for-prompt-engineering)
10. [Conclusion and Next Steps](#conclusion-and-next-steps)

### Overview of ZebraAI Experiments
ZebraAI experiments consist of five core components:
- **LLM Model**: The latest production LLMs.
- **Experiment UX**: Fetch data from different sources for use in an experiment.
- **Data**: Various types of support data available, plus options to bring your own.
- **Prompt**: Detailed description of the desired output from the model.
- **Model Parameters**: Control the behavior of LLM models.

### Principles of Prompt Engineering
1. **Define Clear Objectives and Desired Outputs**
2. **Utilize Contextual Information**
3. **Optimize Prompt Length and Complexity**
4. **Ensure Privacy and Data Protection in Prompting**

### Prompt Engineering Techniques
#### Template-Based Prompting
Create a fixed template specifying input and output format.
```json
{
    "messages":[
        {"role": "system", "content": "Q: Summarize the following text in one sentence.\nAs a Microsoft Azure customer, I have access to a wide range of cloud computing services and tools that help me build, deploy, and manage applications and services."},
        {"role": "user", "content": "A:"}
    ]
}
```

#### Input/Output Prompting
Provide clear input/output examples to guide the model.
```json
{
    "messages":[
        {"role": "system", "content": "Given the following sentences, label them as positive, negative, or neutral."},
        {"role": "user", "content": "I love this movie.\nThis book is boring and poorly written.\nThe weather is cloudy today.\nWhat did you think of the new album?"}
    ]
}
```

#### Zero-Shot Prompting
Describe the task without providing examples.
```json
{
    "messages":[
        {"role": "user", "content": "Write a recipe for chocolate cake that includes the ingredients, the steps, and the serving size."}
    ]
}
```

#### One-Shot Prompting
Provide a single input/output example to guide the model.
```json
{
    "messages":[
        {"role": "user", "content": "Generate 10 possible names for my new dog."},
        {"role": "user", "content": "A dog name I like is Remy."}
    ]
}
```

#### Few-Shot Prompting
Provide a few examples of input/output pairs.
```json
{
    "messages":[
        {"role": "system", "content": "Sentiment (Positive, Negative, Neutral)"},
        {"role": "user", "content": "Review: It was a terrible movie with no plot and bad acting.\nSentiment: Negative"},
        {"role": "user", "content": "Review: I loved the book. It was engaging and well-written.\nSentiment: Positive"},
        {"role": "user", "content": "Review: The product was okay, but not what I expected.\nSentiment: Neutral"},
        {"role": "user", "content": "Review: The service was fast and friendly, but the food was bland and cold.\nSentiment: ?"}
    ]
}
```

#### Chain-of-Thought Prompting
Guide the model towards more accurate answers by encouraging reasoning.
```json
{
    "messages":[
        {"role": "system", "content": "Let's think step by step."},
        {"role": "user", "content": "Pete has 5 video games. He buys 2 more video games. Each video game takes 6 hours to complete. How long will it take Pete to complete all his games?"}
    ]
}
```

#### Self-Criticism Prompting
Elicit self-evaluation and reflection from the user.
```json
{
    "messages":[
        {"role": "user", "content": "@{EmailTranscripts}\nI made mistakes while exchanging emails with my customer. I feel so embarrassed and angry at myself."}
    ]
}
```

#### Iterative Prompting
Use follow-up prompts based on the output of an initial prompt.
```json
{
    "messages":[
        {"role": "user", "content": "I am writing a book on time travel theories. Generate 5 specific topic suggestions for such a book."}
    ]
}
```

### Prompt Engineering in ZebraAI
ZebraAI offers a user-friendly interface for prompt engineering, where users can select an OpenAI model, prompt, and model parameters to run their experiments.

### Starting a ZebraAI Experiment
1. Go to [ZebraAI](https://aka.ms/ZebraAI) and click on **Create AI Experiment**.
2. Provide your experiment with a name, description, and share level.
3. Attach the appropriate UX to your experiment.

### ZebraAI Prompt Basics
A prompt in ZebraAI is a structured JSON object that contains instructions for the model to generate an output. 

### Using Data in ZebraAI
ZebraAI leverages Azure Cognitive Search for rich OData driven queries. Here are examples for creating case summaries and support articles using customer support data.

### Internal and External Prompt Engineering Resources
- [Prompt Engineering for Effective Interaction with ChatGPT](https://machinelearningmastery.com)
- [Best practices for prompt engineering with OpenAI API](https://help.openai.com)
- [Azure OpenAI Service](https://learn.microsoft.com/en-us/azure/cognitive-services/openai/overview)

### Tips and Best Practices for Prompt Engineering
1. Understand the model.
2. Define the task and goal.
3. Start simple and iterate.
4. Use examples and references.
5. Be creative and curious.
6. Be Specific.
7. Be Descriptive.
8. Double Down.
9. Order Matters.
10. Give the model an "out".

### Conclusion and Next Steps
Prompt engineering is a valuable and exciting skill that can unlock the potential of generative AI models for support and beyond. ZebraAI provides a powerful platform for practicing and improving prompt engineering skills.

---

This structure covers all sections from the document, organizes the information logically, and makes it easy to navigate for users. Each section can be further expanded with sub-sections and additional examples as needed.
