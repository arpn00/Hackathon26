# ZebraAI Experiments
As is inherent in the scientific method, ZebraAI is designed to support an iterative investigation and validation of a hypothesis or idea. Central to this process is the experiment. Among the key capabilities of ZebraAI is the ability for you to create an experiment.  At its core, an experiment is an AI that you customize for your purposes.  The diagram below is an illustration of the lifecycle of an experiment in ZebraAI.
![Experiment Lifecycle](/wiki/imgs/Experiment-lifecycle.png)

## The Idea
The moment someone thinks, “Wouldn’t it be better if…” an idea is born. If it’s a good idea people will put energy and thought into how to make that idea come about. Since the creation of ChatGPT, the computer has been elevated from a tool to a collaborator. Through interaction with a GP, like [ZebraAI’s secure and compliant Chat]( https://zebra-ai-web-prd.ait.microsoft.com/chatexp)  function you can develop your ideas into actionable hypotheses and prepare yourself for the next step, testing your hypotheses through experimentation.  

## Creating an Experiment
The mechanics of creating an experiment in ZebraAI can be found on [Create an AI Experiment](/Get-Started-With-ZebraAI/Create-An-Experiment.md).  Summarizing the process in a brief list:
1.	On the Create AI Experiment page, provide a name and description on the Experiment Tab.
2.	Choose the Experiment Level (Private, Shared, etc) on the Experiment Tab.
3.	Select the type of experiment on the User Experience Tab.
4.	Choose a model on the Model Tab.
5.	Create or select a prompt on the Prompt Tab.
6.	Press Create Experiment at the bottom of the Settings Editor to create your experiment.  

### Synthetic Data
ZebraAI generates synthetic data for safe experimentation. Using synthetic data has the following benefits:
- Privacy Protection: Synthetic data doesn't involve real individuals, thus preserving privacy while being used in analysis and AI training. It eliminates the risk of exposing sensitive information.
- Bias Mitigation: By carefully designing synthetic data, it’s possible to address and reduce inherent biases found in real-world datasets. This helps in training fairer AI models.
- Controlled Scenario Testing: Synthetic data allows for the creation of specific, controlled scenarios to test various models and systems extensively without the unpredictability of real-world data.
- Data for Rare Events: It enables the generation of data for rare or edge cases that might not be well represented in existing datasets but are essential for robust model training.  

## Prompt Engineering  
An AI prompt is the instruction you give ZebraAI to execute in your experiments.  An AI prompt guides a ZebraAI’s behavior and responses using natural language. This differs from programming language code which is a set of explicit instructions for a computer to execute specific tasks. The results ZebraAI may give can vary based upon the wording of your prompts, even if the sentences you provide fundamentally mean the same thing. Just like a person interprets what you say to determine your meaning, ZebraAI will interpret your prompt to determine what you are asking.  Here are a few recommendations for creating effective prompts:
- **Be Clear and Specific**: Clearly state what you want the AI to do.
- **Provide Context**: Include relevant background information to help the AI understand the task.
- **Use Examples**: Provide examples of desired outputs to guide the AI.
- **Set Constraints**: Define any limitations or rules the AI should follow.
- **Iterate and Refine**: Test and refine your prompt based on the AI's responses.
- **Avoid Ambiguity**: Use precise language to minimize misunderstandings.
- **Encourage Creativity**: Allow some flexibility for the AI to generate creative responses.
More information about prompt engineering can be found in [Prompt Engineering with ZebraAI](/Reference/Prompt-Engineering/Prompt-Engineering-with-ZebraAI) and on learn.microsoft.com.  

 ## Testing
Once you have an experiment in ZebraAI, you can validate that this experiment achieves a result that supports your idea/hypothesis.  Initially it is required that you test your experiments using synthetic data, primarily to protect the customer information provided on ZebraAI.  Once you have validated that your experiment functions as you expect then you can [request access to real CSS Data](/How-To-Guides/Request-CSS-Data-Usage). Once your request is granted you will be able to execute your experiments with real CSS Cases. Note that this only applies to the types of experiments that use Case data.
You shouldn’t expect your experiments to be perfect on the first try.  As in the scientific method, the key to creating an effective experiment is iteration:
1.	Try your experiment
2.	Analyze your results
3.	If your experiment can be better, adjust it
4.	Go to step 1  

## Extending through API Access
For many experiments, the ZebraAI web interface provides everything you might need.  There are cases where this may not be true. You may want to use your experiment in a specific context or application. Perhaps your experiment is a part of a larger solution. In these cases you can make your experiments available through the ZebraAI API. At a high level here are the steps:
1.	Create your experiment
2.	Create your application
3.	Register your application on Azure Entra ID
4.	Request an API endpoint for your experiment through the [My Experiments](/Get-Started-With-ZebraAI/Navigate/My-Experiments) page.  
5.	Ensure that your application calls your experiment correctly
a.	Use the Experiment ID 
b.	Provide the Client ID of your application
c.	Be sure to call the correct ZebraAI environment.
**Note** that effectively using an API requires programing skills and some familiarity with authentication. Don’t be embarrassed to ask for help.  The [ZebraAI community]( https://teams.microsoft.com/l/team/19%3A1Pvl3cRXmwYrC0nv1jFV7NZj6qQLGbgv0EeGvg6swqc1%40thread.tacv2/conversations?groupId=af998ff3-0fad-4654-b368-5249e20ada9e&tenantId=72f988bf-86f1-41af-91ab-2d7cd011db47)  is there for you.
