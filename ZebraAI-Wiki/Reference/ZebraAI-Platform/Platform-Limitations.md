# Limitations
1. Daily processing limits: 
    -  By default, users and apps are capped at 1k cases per sliding 24-hour window. The cap is at UPN or ClientID level.
    -  High volume exceptions can be requested, increasing the daily limit to 30k cases (via [CoreIdentity](https://coreidentity.microsoft.com/manage/Entitlement/entitlement/zebraai-lmrc) for users, or via [this form](https://forms.office.com/r/cGiQSTUKs7) for apps). 
      - Enterprise volume processing (restricted) <br>
This is reserved for production tools, critical endpoints, high impact custom apps with proven ROI. 
Daily limits are from 30k to 180k cases. 
For complete policy details, please see here: [High Volume Processing Exception - Overview](https://cnfe.visualstudio.com/ZebraAI/_wiki/wikis/ZebraAI/338/High-Volume-Processing-Exception)
      - The cap is only for prompts that touch a case. 
2. Token limits vary by model. 
3. Not all cases will be available in ZebraAI; some cases and data are restricted and unavailable. 

# Experiment Retention

Due to platform limitations, inactive or unused experiments will be (logically) deleted after 30 days.  See [Manage MY Experiments](/Working-with-Experiments/Manage-MY-Experiments.md) to learn how to **undelete** your experiments.  