# Mermaid

Mermaid is a JavaScript-based diagramming and charting tool that allows users to create diagrams using a simple markdown-like syntax. It's popular among developers and technical writers for visualizing:

-  Flowcharts
-  Sequence diagrams
-  Gantt charts
-  Class diagrams
-  Entity-relationship diagrams

The following is a sample of the Mermaid syntax:
```
 graph TD
  A[Start] --> B{Is it working?}
  B -- Yes --> C[Great!]
  B -- No --> D[Fix it]
  D --> B 
```

Zebra AI has the capability to both create experiment output in Mermaid syntax as well as render Mermaid diagrams. 

## Generating Mermaid Code

The first step in displaying Mermaid diagrams as part of your experiment output is to create an experiment capable of generating Mermaid code.  To do this
-  Create an experiment that will naturally create a process flow, ERD, etc.
-  In your prompt, instruct Zebra AI to generate a description of the process flow, ERD etc. in Mermaid syntax.

The result will look something like the following:

![Mermaid Output](/wiki/imgs/Mermaid-output.png)

**NOTE:** ZebraAI Mermaid Viewer currently supports Mermaid version 9. When generating Mermaid code, please restrict this code to the features available in this version.

## Rendering a Mermaid Diagram

On the right side of the above picture, just below the Copy button, is a **Render** button.  The Render button will display while your cursor is over the Mermaid code block in your output. by pressing the **Render** button you will open the Mermaid viewer, see below.  Zebra AI will automatically render your Mermaid diagram and display it in the Mermaid viewer.  

![Mermaid Viewer](/wiki/imgs/Mermaid-Viewer.png)

For more about Mermaid Charts see [Mermaid](https://www.mermaidchart.com/)  
  