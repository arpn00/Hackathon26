# Translator
**Translator** experiments are very much like [Simple UX](Simple-UX.md) experiments but as the name suggests, is optimized to take an input and translating it to a target Language, using your prompt(s) for guidance.  
  
![Translate](/wiki/imgs/Translator.png) 

# How it Works

As suggested above, your prompt guides the translation of the input **@{Content}** into the selected **@{Language}**.  This provides you the flexibility to use the translator to do almost anything you wish.  The most business appropriate instruction to include in your prompt may be something like:  
```  
Translate @{Content} into @{language} using phrasing that is appropriate for conduct business in countries where that language is spoken as the primary language.  
```  
The intent here is that the input is translated into the selected language in such a way that the result is appropriate to be spoken when conducting business where the language is commonly spoken.

# Available Data Fields
The following data references are available to be used in your prompts:  

@{Content}, @{Language}
     
# API Availability

This experiment type can be configured for use through an API call. For more information on requesting API access to your experiments see [Manage MY Experiments](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/165/Manage-MY-Experiment-API). For more information on optimizing your experiments for use through an API, see [Prompt Guidelines for API Use](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/271/Prompt-Guidelines-for-API-Use).

# More Information

For more information about creating experiments or the individual controls displayed in the screen shot above see [Create An Experiment](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/258/Create-An-Experiment)  
  
