# Function/Tool Experiment User Experience
Function/Tool Experiment User Experience (UX) provides for prompting in a similar manner to the **[Simple UX](Simple-UX.md)** but adds perhaps the most powerful construct available in ZebraAI, the use of functions. Functions allow you to call other pieces of code from within your experiments. There is no limitation to the kinds of functions that can be called.  Any code block or API available to ZebraAI can be used in a function. Even ZebraAI experiments can be called as functions, if those experiments have a provisioned API Endpoint.

Unlike in a structured programming language where functions are called explicitly. GPT determines if the functions defined are to be used to satisfy the needs of the prompt.  For example, if you create a function to share the current weather conditions anywhere in the world and a prompt that requests the current time anywhere in the world, your function will very likely not be used.  This is a very simplistic example but does illustrate how the GPT model makes the choice to use or not use a function.

![Functions UX](/wiki/imgs/functions.png)

# Creating a Function/Tool Experiment

As seen above there are three constructs that are unique to a Function/Tool Experiment, defining the function, defining the call request and defining the response.  Each of these are explained below.  

## Define Function(s)
The Define Functions section is where you define your function for the context of the experiment.  This is the section where you can introduce a simple code block or call executable code through an API. There is a specific syntax to be used in defining your function as seen in the example below, using JSON.

```json 
{
  "type": "function",
  "function_name": "add_numbers",
  "description": "Adds two numbers and returns the result.",
  "parameters": [
    {
      "name": "a",
      "type": "int",
      "description": "The first number."
    },
    {
      "name": "b",
      "type": "int",
      "description": "The second number."
    }
  ],
  "return": {
    "type": "int",
    "description": "The sum of the two numbers."
  }
}
```
Note that this section is not limited to the definition of a single function or limited to functions completely defined in this section.  The following is an example that uses an API call in a function definition.

```json 
{
  "type": "function",
  "function_name": "get_weather",
  "description": "Fetches the current weather for a given city using the Weather API.",
  "parameters": [
    {
      "name": "city",
      "type": "string",
      "description": "The name of the city for which to fetch the weather."
    }
  ],
  "return": {
    "type": "object",
    "description": "An object containing the temperature in Celsius and the weather condition.",
    "properties": {
      "temperature": {
        "type": "number",
        "description": "The current temperature in Celsius."
      },
      "condition": {
        "type": "string",
        "description": "The current weather condition."
      }
    }
  },
  "api_call": {
    "url": "http://api.weatherapi.com/v1/current.json",
    "method": "GET",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": "Bearer your_api_key"
    },
    "query_parameters": {
      "key": "your_api_key",
      "q": "{city}"
    }
  },
  "example": {
    "city": "Seattle",
    "response": {
      "temperature": 12,
      "condition": "Cloudy"
    }
  }
}
```
### Syntax Explained

-  **type:** Specifies that this JSON object defines a function.
-  **function_name:** The name of the function.
-  **description:** A brief description of what the function does.
-  **parameters:** An array of objects, each representing a parameter. Each object includes:
    -  **name:** The name of the parameter.
    -  **type:** The data type of the parameter.
    -  **description:** A brief description of the parameter.
-  **return:** An object describing the return value, including:
    -  **type:** The data type of the return value.
   -  **description:** A brief description of the return value.
    -  **properties:** Detailed properties of the return object, including types and descriptions.
-  **api_call:** Details of the API call, including:
    -  **url:** The endpoint URL of the API.
    -  **method:** The HTTP method used for the API call (e.g., GET, POST).
    -  **headers:** Any headers required for the API call, such as content type and authorization.
    -  **query_parameters:** Parameters to be included in the API call, with placeholders for dynamic values.

## Tool/Function Call Request by GPT Model
In this section you define how the GPT model will call the function(s) as defined above, if the GPT model chooses to call the function.  Below is an example of how to form a call request.

```json
{
  "type": "function_call",
  "function_name": "get_weather",
  "parameters": {
    "city": "Seattle"
  }
}

```
## Mock Answer/Result in JSON

As the on-page title suggests, this section is where you provide a sample response by *filling in a mock answer/result in JSON for each tool/function call request.  An example of a response is below, in JSON.

```json
{
  "type": "function_response",
  "function_name": "get_weather",
  "result": {
    "temperature": 12,
    "condition": "Cloudy"
  }
}
```
  
# API Availability

This experiment type can be configured for use through an API call. For more information on requesting API access to your experiments see [Manage MY Experiments](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/165/Manage-MY-Experiment-API). For more information on optimizing your experiments for use through an API, see [Prompt Guidelines for API Use](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/271/Prompt-Guidelines-for-API-Use).

# More Information

For more about functions go to [Function Calling](https://platform.openai.com/docs/guides/function-calling?api-mode=chat)

For more information about creating experiments or the individual controls displayed in the screen shot above see [Create An Experiment](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/258/Create-An-Experiment)

