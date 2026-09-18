# GPT Models

![Models](/wiki/imgs/Models.png)

## What is a GPT model? 
<details>

 **Generative Pre-trained Transformer (GPT)** is a type of large language model (LLM) that uses deep learning to generate human-like text. Here’s a breakdown of what it means:
- **Generative**: It can produce new content, such as text or images.
- **Pre-trained**: It has been trained on a large dataset before being fine-tuned for specific tasks.  
- **Transformer**: It uses a specific deep learning architecture known as a transformer, which is particularly effective for natural language processing tasks.  

GPT models are designed to understand and generate text in a way that mimics human conversation. They can be used for a variety of applications, including chatbots, content creation, and more.
In ZebraAI the Model is the basis upon which your experiment will run. In a way your experiment trains the model to perform the tasks you wish to complete. The following include some of the benefits each model may bring to your experiment.  
</details>
<br>

For more about the different **models** see:  
- [Azure Open AI Service Models](https://learn.microsoft.com/en-us/azure/ai-services/openai/concepts/models?tabs=global-standard%2Cstandard-chat-completions)
- [Open AI Models](https://platform.openai.com/docs/models)
- [Grok](https://grokaimodel.com)

## Choosing a Model for Your ZebraAI Experiment

### Quick Picks for Experiment Owners
Use this table to help identify which model can best support your experiment. 

| Use Case | Goal | Start With | When to Escalate | Notes |
|--|--|--|--|--|
| Short Q&A, tagging, lightweight RAG (<10k tokens) | Lowest latency & cost | **GPT‑4.1‑nano** | If quality drops on multi-step prompts or tool chains | Fastest and cheapest; ideal for real-time classification or simple completions.  |
| General chat, summaries, light tool use | Balance quality + speed | **GPT‑4.1‑mini** | If you need deeper reasoning or long-context handling | Matches or exceeds GPT‑4.1 on many short tasks at ~75% lower cost. |
| Multi-step reasoning, complex tool use | Quality first | **GPT‑4.1** | If latency/cost becomes a constraint, test mini again | Handles up to 16M tokens; excellent for coding and instruction-following. |
| General-purpose chat with cost control | Balanced performance | **GPT‑5** | If you need multimodal or deeper reasoning | ZebraAI’s default for general chat and summaries |
| Lightweight chat and tagging | Fastest ZebraAI model | **GPT‑5-mini** | If quality drops on chaining or long prompts | Ideal for tagging, autocomplete, and short Q&A |
| Ultra-low latency tagging | Cheapest ZebraAI model | **GPT‑5-nano** | If you need better reasoning or context | Best for real-time classification and microservices |
| General chat (preferred newer baseline) | Improved balance of quality + cost | **GPT-5.1 chat** | If you need stronger reasoning or multimodal depth | Iteration on GPT-5 with improved chat reliability and efficiency; good default replacement candidate |
| High-efficiency chat, low-latency reasoning | Better quality at mini-tier cost | **GPT-5.4 mini** | If complex reasoning or long context is required | Next-gen mini model; improved reasoning vs 5-mini with similar cost/latency profile |
| Ultra-low latency, next-gen nano tasks | Lowest cost with slight quality lift | **GPT-5.4 nano** | If results require structured reasoning or chaining | Improved nano-tier efficiency; best for high-throughput tagging and simple automation |



## ZebraAI Model Sites

ZebraAI is limited by the number of tokens processed at any one time. Most simply put, The maximum number and size of experiments that can be run at one time is capped. To allow for additional capacity the ZebraAI team has implemented multiple instances of several GPT Models.  Having two instances, Sites like **westus3** or **canadaeast**, for a model gives ZebraAI twice the capacity for that model. 

If you experience performance issues while running your experiment, try changing the model to a different site.  This can be done by editing the experiment through the [**Settings Editor**](/Working-with-Experiments/Settings-Editor.md).


## Availability of Roles by Model

Your prompts can take on a number of roles based upon your intent. 
- The **user role** represents the person interacting with the assistant—essentially, _you_. The user initiates prompts, asks questions, or provides input.
- The **assistant role** is used by the AI assistant itself, which responds to the user’s messages.
- The **system** role is used to set behavior, personality, or constraints for the assistant. It appears at the start of the conversation and helps guide how the assistant should respond.

The table below shows which roles are available with which models. 

<table>
  <tr style="background-color: lightgrey;">
    <th style="border: 1px solid black;">Model</th>
    <th style="border: 1px solid black;">System</th>
    <th style="border: 1px solid black;">User</th>
    <th style="border: 1px solid black;">Assistant</th>
  </tr>
  <tr style="background-color: white;">
    <td style="border: 1px solid black;">GPT-4o-mini</td>
    <td style="border: 1px solid black;">Y</td>
    <td style="border: 1px solid black;">Y</td>
    <td style="border: 1px solid black;">Y</td>
  </tr>
  <tr style="border: 1px solid black; background-color: whitesmoke;">
    <td style="border: 1px solid black;">4o1</td>
    <td style="border: 1px solid black;">Y</td>
    <td style="border: 1px solid black;">Y</td>
    <td style="border: 1px solid black;">Y</td>
  </tr>
  <tr style="border: 1px solid black; background-color: white;">
    <td style="border: 1px solid black;">o1-mini</td>
    <td style="border: 1px solid black;">N</td>
    <td style="border: 1px solid black;">Y</td>
    <td style="border: 1px solid black;">Y</td>
  </tr>
  <tr style="border: 1px solid black; background-color: whitesmoke;">
    <td style="border: 1px solid black;">o3-mini</td>
    <td style="border: 1px solid black;">Y</td>
    <td style="border: 1px solid black;">Y</td>
    <td style="border: 1px solid black;">Y</td>
  </tr>
  <tr style="border: 1px solid black; background-color: white;">
    <td style="border: 1px solid black;">o4-mini</td>
    <td style="border: 1px solid black;">Y</td>
    <td style="border: 1px solid black;">Y</td>
    <td style="border: 1px solid black;">Y</td>
  </tr>
  <tr style="border: 1px solid black; background-color: whitesmoke;">
    <td style="border: 1px solid black;">GPT 4.1</td>
    <td style="border: 1px solid black;">Y</td>
    <td style="border: 1px solid black;">Y</td>
    <td style="border: 1px solid black;">Y</td>
  </tr>
  <tr style="border: 1px solid black; background-color: white;">
    <td style="border: 1px solid black;">4.1-mini</td>
    <td style="border: 1px solid black;">Y</td>
    <td style="border: 1px solid black;">Y</td>
    <td style="border: 1px solid black;">Y</td>
  </tr>
  <tr style="border: 1px solid black; background-color: whitesmoke;">
    <td style="border: 1px solid black;">4.1-nano</td>
    <td style="border: 1px solid black;">Y</td>
    <td style="border: 1px solid black;">Y</td>
    <td style="border: 1px solid black;">Y</td>
  </tr>
    <tr style="border: 1px solid black; background-color: white;">
    <td style="border: 1px solid black;">Phi-4</td>
    <td style="border: 1px solid black;">Y</td>
    <td style="border: 1px solid black;">Y</td>
    <td style="border: 1px solid black;">Y</td>
  </tr>
  <tr style="border: 1px solid black; background-color: whitesmoke;">
    <td style="border: 1px solid black;">Grok-3</td>
    <td style="border: 1px solid black;">Y</td>
    <td style="border: 1px solid black;">Y</td>
    <td style="border: 1px solid black;">Y</td>
  </tr></table>

<br>
<br>

 

##Text Embedding
**Text Embedding 3 Small** is **not a chat model**—it’s a **specialized AI model that turns text into numbers** so systems can understand meaning and relationships between pieces of text. 

[Vector Embeddings | OpenAI API](https://developers.openai.com/api/docs/guides/embeddings)
 

*   It converts text (words, sentences, documents) into a **vector** (a long list of numbers)
*   Those numbers represent the **meaning** of the text, not just the words
*   Similar meaning → vectors are **close together**
*   Different meaning → vectors are **far apart**

<table>
  <tr style="background-color: lightgrey;">
    <th style="border: 1px solid black;">Model</th>
    <th style="border: 1px solid black;">System</th>
    <th style="border: 1px solid black;">User</th>
    <th style="border: 1px solid black;">Assistant</th>
  </tr>
 <tr style="background-color: white;">
    <td style="border: 1px solid black;">Text Embedding 3 Small</td>
    <td style="border: 1px solid black;">N</td>
    <td style="border: 1px solid black;">N</td>
    <td style="border: 1px solid black;">N</td>
  </tr>