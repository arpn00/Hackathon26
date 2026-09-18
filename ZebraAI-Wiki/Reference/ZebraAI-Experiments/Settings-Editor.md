#Editing an Experiment with the Settings Editor

The **Settings Editor**, is a powerful tool for updating experiments for the [Run An Experiment](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/125/Run-An-Experiment) page. Through the **Settings Editor** you can change every aspect of an experiment, except for the User Experience.  The **Settings Editor** has many useful features which are described below.  
To open the **Settings Editor** select the **Edit** icon as shown in the red box below.

![Editor](/wiki/imgs/Settings-editor.png)  

##Experiment
  
![Exp](/wiki/imgs/Settings-editor-Experiment.png)  
The **Experiment** tab, displayed above is where you can create or change:  
- a name for the experiment in the **Experiment Name** field.   
- a description of what it will do in the **Description (HTML)** field.  
- a sharing level for your experiment, either keeping it private or allowing it to be shared, in the **Share Level** field.  

There are some controls on the **Experiment** tab that are common to the other Settings Editor tabs and other Zebra*AI* features.  These are:  

- [Editor select](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/260/Editor-select) enables you to choose between a text/builder edit mode and a Monaco styled edit mode.  
- [Editor closed](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/259/Editor-closed) enables you to collapse the **Settings Editor** leaving only the Model and Prompt displayed.
- **Next** enables you to move to the **Model** tab.  

##Model

The **Model** tab enables you to select the GPT model to be used in your experiment, see below.  

![Model tab](/wiki/imgs/Settings-editor-Model.png)  

- the **Select Model** drop-down menu to select one of the supported GPT models. Once selected a description and the scenarios that a model is best used for is provided for each option in the drop-down menu.  

![Model select](/wiki/imgs/Model-select.png)  

It is generally accepted that the latest available model produces the best result.  Models will continue to be supported for a period of time, primarily to support existing experiments. You are welcome to select an older model to see how that affects your result.  

There are some controls on the **Model** tab that are common to the other Settings Editor tabs and other Zebra*AI* features.  These are:  

- [Close Settings Editor](/Get-Started-With-ZebraAI/Editor-closed.md) enables you to collapse the **Settings Editor** leaving only the Model and Prompt displayed.
- **Previous** takes you back to the tab to the left. When creating and experiment this is the **User Experience** tab.  When editing an existing experiment this is the **Experiment** tab.
- **Next** takes you to the **Prompt** tab. 

##Prompt

The **Prompt** tab enables you to create the AI prompts that drive your experiment, see below.

![Prompt tab](/wiki/imgs/Settings-editor-Prompt.png)

- The easiest way to create a prompt for your experiment is to select an option from the **Copy from sample prompt** drop-down menu. There are a variety of sample prompts to choose from, see below.

![Prompt tab](/wiki/imgs/Prompt-select.png)

- You can edit the selected prompt to suit your needs or simply type in your own prompt(s)  
### Builder Mode  
  
By selecting the Builder Radio button at the top of the **Settings Editor** you can open **Builder Mode** as shown below. **Builder Mode** is a more friendly editor for those who are less familiar with coding constructs. By clicking on a message in the list, you will open the detail view for the message. The detail view is open for the first message in the list below.

![Prompt tab](/wiki/imgs/Settings-editor-Prompt-Builder.png)   

- The **Add Message** button adds a blank message to the bottom of the list. The default message type is *User*. To change the message type, first save your changes by pressing the **Save Changes** button, then change the edit mode to wither Monico or TextArea.  IN either of these modes you can find your message and change the Message from User to another message type by finding the line, "Role": "user", and changing "User" to another role or message type.  

- The **Save Changes** button saves any changes you have made to your prompt.  Be sure to press the **Save Changes** button frequently as changes will be lost if you change editor modes or you change focus to other sections of the page.  

###Icon Know-how

![Prompt Icons](/wiki/imgs/Prompt-icons.png)  

**Delete Message** Deletes the current message.  

**Duplicate Message** Duplicates the current message, leaving you on the duplicated message. The new message appears immediately below the duplicated message.  

**Move up** Moves the current message up the list by one place.  If the current message is the third message in the list it becomes the second message in the list.  *Note* that the detail view will not move with the message.  If you are working with the third message prior to moving it up, the detail view will remain on the third message after the move is complete.  

**Move Down** Moves the current message down the list by one place. If the current message is the second message in the list it becomes the third message in the list. As with **Move Up**, the detail view will not move with the message. If the detail view is on the second message in the list, it will remain on the second message in the list.  

**Set as System Message** Users can set the current message to be a System Message. System Messages are used to prime a language model with specific context, instructions, or guidelines. It is included at the beginning of the prompt and helps shape the model’s behavior and responses.  

**Set as Assistant Message** Users can set the current message as an Assistant Message.  Assistant Messages are used to provide example responses or historical completions from the AI model. These messages are paired with user messages to form examples that help guide the model’s behavior.  

**Set as User Message** Users can set the current message as a User Message. User Messages are inputs provided by the user that the AI model responds to. These messages play a crucial role in guiding the model’s behavior and ensuring it understands the context and requirements of the task.  

**Set as Comment** Users can set the current message as a comment.  Comment Messages are annotations or notes added to a prompt to provide additional context or instructions. They help clarify the intent, structure, or desired outcome of the prompt, ensuring the model understands and generates the expected response.   


Note: If users are creating a prompt that will use case data, they can scroll to the bottom of the editor for a list of parameter substitutions that are available for Commercial and Consumer cases.

There are some controls on the **Prompt** tab that are common to the other Settings Editor tabs and other Zebra*AI* features.  These are:  
- [Editor closed](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/259/Editor-closed) enables you to collapse the **Settings Editor** leaving only the Model and Prompt displayed.
- **Previous** takes you back to the **Model** tab.  
- **Next** takes you to the **Follow-up Prompt** tab. 

### TextArea Mode  
  
By selecting the TextArea Radio button at the top of the **Settings Editor** you can open **TextArea Mode** as shown below.

![Prompt tab](/wiki/imgs/Settings-editor-Prompt-TextArea.png)  

In TextArea mode your prompt appears in a plain text editor.

##**NEW** Prompt History

![Prompt History](/wiki/imgs/Prompt-History.png)

The **Prompt History** and **Follow-Up Prompt History** tabs enable you to review the change history for your experiment prompts.  You can also revert to a prior version of your prompt by highlighting the desired version and pressing the **Set Selection as Current** button.  Primary prompts and follow-up prompts have their own histories which are managed independently by ZebraAI.  

##Follow-Up Prompt  

![Follow-up Prompt tab](/wiki/imgs/Settings-editor-Follow-up.png)  

The **Follow-Up Prompt** tab enables you to create a second set of prompts which is capable of using the output of the initial set of prompts.  Use the Follow-up Prompt if you need your experiment to complete a set of actions on all the responses produced by the initial set of prompts. The Follow-up Prompt executes after all the prompts in the initial set of prompts completes.  The Follow-up Prompt tab functions exactly the same as the Prompt tab with all the same functions and controls. If a second set of prompts isn't needed, leave it blank. Adding a second set of prompts is optional.  

## Parameters

The **Parameters tab** enables you to adjust the key parameters that govern the experiment.  There are four of these parameters as shown below.

![Parameter Tab](/wiki/imgs/Settings-editor-Parameters.png)

 Either select an action from the **Select Existing Parameters** drop-down menu to populate the parameter values associated with the action automatically, as shown below or change the parameter values that you feel are appropriate for your experiment by using the sliders. For details about a parameter, hover over the information button at the end of the slider for the parameter value.  

![Parameter Select](/wiki/imgs/Parameter-select.png)

**Temperature** Enables you to adjust model creativity.
**Top P** Enables you to adjust the diversity of the model outcomes.
**Frequency Penalty** Enables you to adjust the level of repetition in the model outcomes.
**Presence Penalty** Enables you to adjust the level of consistency in the model outcomes.    
  
There are some controls on the **Parameters** tab that are common to the other Settings Editor tabs and other Zebra*AI* features.  These are:  
- [Editor closed](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/259/Editor-closed) enables you to collapse the **Settings Editor** leaving only the Model and Prompt displayed.
- **Previous** takes you back to the **Follow-up Prompt** tab.  
- **Next** takes you to the **Contributors** tab.  

## Contributors  

The **Contributors** tab enables you to configure co-authors or collaborators for your experiment.

![Contributors](/wiki/imgs/Settings-editor-Contributors.png)

While you can add contributors to your experiment, those people will not be able to contribute to your experiment until you share the experiment with them. Review the instructions in the above screen grab to successfully add contributors.  

There are some controls on the **Contributors** tab that are common to the other Settings Editor tabs and other Zebra*AI* features.  These are:  
- [Editor closed](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/259/Editor-closed) enables you to collapse the **Settings Editor** leaving only the Model and Prompt displayed.
- **Previous** takes you back to the **Parameters** tab.  
- **Next** takes you to the **Attributes** tab.  

## Attributes - *Coming Soon*  

The **Attributes** tab enables you to configure or customize the attribute set for your experiment.

![Contributors](/wiki/imgs/Settings-editor-Attributes.png)  

*More to come when this functionality is implemented*

There are some controls on the **Attributes** tab that are common to the other Settings Editor tabs and other Zebra*AI* features.  These are:  
- [Editor closed](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/259/Editor-closed) enables you to collapse the **Settings Editor** leaving only the Model and Prompt displayed.
- **Previous** takes you back to the **Contributors** tab.  