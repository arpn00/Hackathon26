# Edit An Experiment

The Experiment Editor is a text/code based editor that allows you to change every user configurable aspect of and experiment except the GPT model to be used by the experiment, see below.  

![Edit Text](/wiki/imgs/Edit-Experiment-text.png)

##Id
Id is a display-only field containing the unique identifier of your experiment. This is a helpful piece of information when searching for your experiment using the Manage Experiments administrative tool.  

##Title

Title is the Experiment Name.   

##Model

Model is a display-only field and shows the GPT model currently selected for this experiment.  

##Description

A brief description of the experiment.  

##Prompt

A prompt in AI is a set of instructions or input given to an AI model to generate a specific response or perform a task. It guides the AI on what to focus on and how to respond, ensuring the output aligns with your expectations.  To learn more about writing your own prompts see **[Prompt Engineering with ZebraAI](/Reference/Prompt-Engineering/Prompt-Engineering-with-ZebraAI)** or **[Create Trustful Prompts Framework](/Reference/Prompt-Engineering/Create-Trustful-Prompts-Framework)**

##Follow-up Prompt

A follow-up prompt is a prompt that can take the output of the **Prompt** as an input.  

##Parameter

**Temperature** Enables you to adjust model creativity. Valid values are between 0 and 2.  
**Max Tokens** Enable you to change the maximum limit for the number of tokens to be used by your experiment.  
**Nucleus Sampling Factor (Top P)** Enables you to adjust the diversity of the model outcomes. Valid values are between 0 and 1.  
**Frequency Penalty** Enables you to adjust the level of repetition in the model outcomes. Valid values are between 0 and 1.  
**Presence Penalty** Enables you to adjust the level of consistency in the model outcomes. Valid values are between 0 and 1.  

##Sharing

The sharing drop-down enables you to choose to share your experiment with the Zebra*AI* Community or to keep it private.  The different Experiment Levels determine where your experiment will be displayed while you [Explore ZebraAI Experiments](/Get-Started-With-ZebraAI/Explore-ZebraAI-Experiments). To share the experiment with other users, open the **Sharing** drop-down menu and select **Shared**, see above. This will display your experiment on the Shared Experiments page. If you experiment is part of a Hackathon effort select **Hackathon**. Select **Private** if you wish to keep your experiment to yourself. This is best when working on a new experiment.

![Shared Select](/wiki/imgs/Edit-share.png)

##Action(i.e. which UX to use)

The Action drop-down enables you to change the User Experience chosen for the experiment when it was created, see below.

![UX selction](/wiki/imgs/Edit-Select-UX.png)  

## Submit

The **Submit** button enables you to Save your changes to the experiment.

## Cancel

The **Cancel** button enables you to cancel the edit session and close the editor. 

## Run Experiment

The **Run Experiment** button enables you to Run the experiment.
  
##Attributes

More about the data stored for ZebraAI can be found in [Experiment Attributes](/Reference/ZebraAI-Experiments/Experiment-Attributes). 