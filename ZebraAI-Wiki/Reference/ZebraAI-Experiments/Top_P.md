#Top P - Nucleus Sampling Factor

Top P (also known as nucleus sampling) is a parameter that controls the diversity of the generated text by considering only the most probable tokens. Here’s how it works:

**Top P = 0.1**: The model considers only the top 10% of the most likely next words. This makes the output more predictable and less diverse.

**Top P = 0.9**: The model considers the top 90% of the most likely next words. This increases the diversity of the output, allowing for more creative and varied responses.

By adjusting the Top P value, you can fine-tune the balance between creativity and coherence in the AI’s responses. Use the slider to increase or decrease Top P.  

The Top P Slider appears in a number of places in ZebraAI as seen below. Use these sliders to increase or decrease Top P.


## Chat Parameters: 
Displayed below the chat input  

![Chat-Parameters](/wiki/imgs/Chat-Parameters.png)

## Parameters Editor:
A tab of the Experiment Editor  

![Param-Edit](/wiki/imgs/Parameters-Editor.png)

## Parameter Field in the Experiment Editor:
An edit box that allows you to change the parameter values directly.

![Param text](/wiki/imgs/Parameter-text.png)
