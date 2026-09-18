#Frequency Penalty

The frequency penalty is a parameter used in prompt engineering to control the repetition of words in the generated output. It works by applying a penalty to the next token based on how frequently it has already appeared in the response and the prompt. Here are the key points:

Reduces Repetition: By increasing the frequency penalty, the model is less likely to repeat the same words or phrases, leading to more diverse and varied responses.  
Proportional Penalty: The penalty is proportional to the number of times a token has already appeared. The more a word appears, the higher the penalty applied to it.  
Customization: Adjusting the frequency penalty can help tailor the output to be more creative or to avoid redundancy, depending on the desired outcome.  

The Frequency Penalty slider only appears in the **Parameter Editor** as seen below. Use these sliders to increase or decrease the Frequency Penalty.

## Parameters Editor:

A tab of the Experiment Editor  

![Param-Edit](/wiki/imgs/Parameters-Editor.png)

## Parameter Field in the Experiment Editor:
An edit box that allows you to change the parameter values directly.

![Param text](/wiki/imgs/Parameter-text.png)
