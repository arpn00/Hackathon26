[[_TOC_]]


# Create A ZebraAI Experiment

To create a new experiment, first select **Create Experiment** on the left navigation menu, then give your experiment a name and brief description.  This will enable the **Create Experiment** button at the bottom of the page. Use the available tabs as described below to complete your experiment.  

## Edit Settings / Close Settings
There are some controls are used in multiple tabs.
  These are:  

- **Edit Settings** will show additional options for the current tab.
- **Close Settings** collapses the settings editor. 
- **Next** moves to the next tab.   

**For your first experiment, we recommend focusing on the first four tabs (Experiment, User Experience, Model, and Prompt).** The other tabs contain optional settings.  

## Experiment Tab

- Add a name for your experiment 
- Add a description for your experiment 
- Set the share level for your experiment (it's usually best to start with Private) 
- Toggle EU Data on or off (leave it off for now) 
- Toggle System Prompt Handling (leave it off for now) 

![Create-Experiment](/wiki/imgs/Create-Experiment-v2.png)

### Learn more about Share Levels
<details>
The different Experiment Levels determine where your experiment will be displayed while you [Explore AI Experiments](Explore-AI-Experiments.md). To share the experiment with other users, open the **Share Level** drop-down menu and select **Shared**, see above.  This will display your experiment on the Shared Experiments page. If you experiment is part of a Hackathon effort, select **Hackathon**.  Select **Private** if you wish to keep your experiment to yourself.  This is best when working on a new experiment.  
</details>

### Learn more about System Prompt Handling
<details>
System Prompt Handling allows you to automatically inject system prompts that will protect Customer (PII) and other sensitive data.  While this is not required when working with Synthetic Case Data, it is required and automatic when running your experiments on real CSS Case Data.  When your experiment is approved for real CSS Data, the **Inject System Prompt** check box is automatically checked, and the system prompt is automatically injected into your experiment.  
</details>


##User Experience Tab
    
Select the User Experience you want to use for this experiment (this setting cannot be changed once the experiment is created). 

A description and preview are provided for each User Experience option in the drop-down menu. Cycle through the available User Experiences to learn about them. More about each User Experience can be found in the Reference ➡️ Experiment Types section of the ZebraAI wiki. 
  
![UXs](/wiki/imgs/UX-tab.png)


## Model Tab
Select the AI model you want to use for your experiment. A description and the scenarios that a model is best used for is provided for each option in the drop-down menu. We encourage you to experiment with different models and to use models best suited for your purpose. More information about models is available at [Models](/Reference/ZebraAI-Platform/Models). 

![Model](/wiki/imgs/Model-tab.png)  


## Prompt Tab
Either select an option from the Copy from sample prompt drop-down menu or type in your own prompt. If you are creating a prompt that will use case data, scroll to the bottom of the window for a list of parameter substitutions that are available.


###Use a Sample Prompt

<details>

- The easiest way to create a prompt for your experiment is to select an option from the **Copy from sample prompt** drop-down menu.  You can edit the selected prompt to suit your needs. 

![Prompt tab](/wiki/imgs/Prompt-select.png)

</details>

### Create Your Own Prompt
<details>
You can write your own prompt using JSON or by leveraging ZebraAI's built-in Prompt Builder.  

By selecting the Builder Radio button at the top of the **Settings Editor** you can open **Builder Mode** as shown below. **Builder Mode** is a more friendly editor for those who are less familiar with coding constructs. By clicking on a message in the list, you will open the detail view for the message. The detail view is open for the first message in the list below.

![Prompt tab](/wiki/imgs/Settings-editor-Prompt-Builder.png)  

- The **Add Message** button adds a blank message to the bottom of the list. To make changes to the order or type of message, use the buttons below the prompt message.

![Prompt Icons](/wiki/imgs/Prompt-icons.png)  

Resources:
- [Prompt Engineering with ZebraAI](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/141/Prompt-Engineering-with-ZebraAI)
- [Create Trustful Prompts Framework](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/195/Create-Trustful-Prompts-Framework)

</details>

_______________

## Follow-Up Prompt Tab
<details>
The **Follow-Up Prompt** tab enables you to create a second set of prompts which is capable of using the output of the initial set of prompts.  Use the Follow-up Prompt if you need your experiment to complete a set of actions on all the responses produced by the initial set of prompts. The Follow-up Prompt executes after all the prompts in the initial set of prompts completes. The Follow-up Prompt tab functions exactly the same as the Prompt tab with all the same functions and controls. If a second set of prompts isn't needed, leave it blank. 

![Follow-up Prompt tab](/wiki/imgs/Follow-up-Prompt.png)  

</details>

## Parameter Tab
<details>

The **Parameters tab** enables you to adjust the key parameters that govern the experiment. You can select from existing parameters settings or fine tune your own parameter values. 

![Parameter Tab](/wiki/imgs/Parameters-tab.png)

**[Temperature](Temp.md)** Enables you to adjust model creativity.  
**[Top P](Top_P.md)** Enables you to adjust the diversity of the model outcomes.  
**[Frequency Penalty](Frequency-Penalty.md)** Enables you to adjust the level of repetition in the model outcomes.   
**[Presence Penalty](Presence-Penalty.md)** Enables you to adjust the level of consistency in the model outcomes.    

</details> 

## Contributors Tab 
<details>
The **Contributors** tab enables you to configure co-authors or collaborators for your experiment.

![Contributors](/wiki/imgs/Contributors.png)
</details>

## Custom UX Tab 
<details>
The **Custom UX** tab enables you to configure or customize the user experience for your experiment. The Custom UX supports up to 10 custom fields.  These fields can be of type TextField, TextArea, Json, and DropDownList. Each field must be configured with an ID and a Label. DropDownLists must be configured with Options.  The **Custom UX** is only supported with the Simple User Experience.  Support for customizing other user experiences is on the ZebraAI product roadmap.  

![Custom UX](/wiki/imgs/Custom-UX.png)  


The **Use Template** button populates the editor with a simple template as shown below.  

![Custom UX Template](/wiki/imgs/Custom-UX-def.png)  
</details>

_______________

## Launch your Experiment
When you are finished with your experiment's settings, click the "Create Experiment" button at the bottom left of the window. By pressing the **Create Experiment** button, the experiment is created and you are taken to [Run An Experiment](/Get-Started-With-ZebraAI/Run-An-Experiment), displaying your new experiment.  

- Your experiment must have a Name and Description in order to show the Create Experiment button.
- With the exception of the User Experience, most of the settings can be changed after you create your experiment. 