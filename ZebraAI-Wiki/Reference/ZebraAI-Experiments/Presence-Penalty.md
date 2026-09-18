#Presence Penalty

The presence penalty is a parameter used in prompt engineering to control the repetition of words or phrases in the generated text. Unlike the frequency penalty, which increases the penalty based on how often a word appears, the presence penalty applies a consistent penalty to any repeated token, regardless of how many times it has already appeared12. Here are the key points:

Discourages Repetition: By applying a presence penalty, the model is less likely to repeat the same words or phrases, promoting more diverse and novel responses.  
Consistent Penalty: The penalty is the same for all repeated tokens, whether they appear twice or ten times.  
Customization: Adjusting the presence penalty can help tailor the output to be more creative or to avoid redundancy, depending on the desired outcome.  

The Presence Penalty slider only appears in the **Parameter Editor** as seen below. Use these sliders to increase or decrease the Frequency Penalty.

## Parameters Editor:

A tab of the Experiment Editor  

![Param-Edit](/wiki/imgs/Parameters-Editor.png)

## Parameter Field in the Experiment Editor:
An edit box that allows you to change the parameter values directly.

![Param text](/wiki/imgs/Parameter-text.png)
