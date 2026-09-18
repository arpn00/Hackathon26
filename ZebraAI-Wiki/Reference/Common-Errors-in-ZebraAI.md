# Common Errors in ZebraAI
This page details some of the more common errors users may experience in ZebraAI. 

## HTTP 429 Too Many Requests
**HTTP 429: Too Many Requests – You have reached your daily case processing quota.**
<br>On December 11, 2025, ZebraAI's v1.3.0.1 release introduced a daily processing limit (1000 cases)* for ZebraAI users. This change supports compliance requirements and helps reduce platform‑wide bandwidth strain.
<br> <br>
Teams who regularly process high volumes can request an exception. Approved users and apps will be added to the High Volume Processor list and receive an increased daily quota (30K/day)*.
- To request an exception as a user, complete a [CoreIdentity membership request](https://coreidentity.microsoft.com/manage/Entitlement/entitlement/zebraai-lmrc "https://coreidentity.microsoft.com/manage/entitlement/entitlement/zebraai-lmrc") for HighVolumeProcessor. (You must include a valid business justification or your request will automatically be denied.)
- To request an exception for an app, fill out the form here: [ZebraAI Limited Access Requests – Fill out form](https://forms.office.com/r/cGiQSTUKs7 "https://forms.office.com/r/cgiqstuks7")

_*These numbers are subject to change based on direction from Azure Security._

## Timeout Error
**The request was canceled due to the configured HttpClient.Timeout of 100 seconds elapsing.**

Recommended solutions:
*   Run experiments during off-peak times when the platform is less busy.
*   Try a different model.
*   Use an alternate instance of the model when possible.

## ZebraAi Website Behavior and Cache Issues
The UX will get bundled and DL'ed to your browser each time there is a deployment. If it doesn't refresh it properly you may experience odd UI behavior on the website.
*   Clear your browser history for the past several days
*   Complete a hard refresh (ctrl+f5)

![image.png](/.attachments/image-6fc07852-d136-4f5c-9a5a-b9c7b3cb83e8.png)

##TPID
**Error: Caller is not permitted to use the TPID filter for Commercial Case indexes**
- To request an exception as a user, complete a [CoreIdentity membership request](https://coreidentity.microsoft.com/manage/Entitlement/entitlement/zebraai-lmrc "https://coreidentity.microsoft.com/manage/entitlement/entitlement/zebraai-lmrc")  for TPIDFilterUser. (You must include a valid business justification or your request will automatically be denied.)
- To request an exception for an app, fill out the form here: [ZebraAI Limited Access Requests – Fill out form](https://forms.office.com/r/cGiQSTUKs7 "https://forms.office.com/r/cgiqstuks7")

**Error: When filtering by TPID in Advanced Query Interface**
*   When experiencing "Failed to search for text" error, double check that the TPID filter being used has quotes included. <br>
**Incorrect:** "Filter": "TPID eq 123456", <br>
**Correct:** "Filter": "TPID eq '123456'",

