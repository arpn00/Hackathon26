#The Admin Menu
  
The Admin Menu provide a variety of options enpending upon your Entitlements. This page will provide a brief review of some of the options available.  
  
![Admin](/wiki/imgs/Admin-menu.png)  

The menu as a whole is not visible to those with **Read Only** entitlements. For ZebraAI user with a **Contributor** entitlement the options will limited to those in the green box above.  These options alow you to see run stats for your experiments and to manage access to your API enabled experiments.  
  
## Advanced access  
  
For those who have a role in managing ZebraAI there are two entitlements that provide access to the remainder of the Admin Menu:  
  
  - **CSS Data Access Approvers** have access to the options in the blue box as well as those in the green box.  These options empower you to approve access to CSS data for an experiment as well as revoke that access.  
  - **ZebraAI Administrators** have access to all the options in the menu, those contained in the Green, blue, and red boxes above. Details about this level of access are withheld.  
  
##My Experiment Stats
  
This page displays the run statistics for your experiments, see below.  

![Run Stats](/wiki/imgs/My-Experiment-Stats.png)  
  
##Manage My APIs
  
The Manage My Experiment APIs page provides you with the opportunity to edit access to the API calls to your experiments or to remove the capability of accessing Your experiments through an API call.  

![My APIs](/wiki/imgs/Manage-My-APIs.png)
  
The **Delete** icon removes the ability to call your experiment through an API.  
The **Edit** icon opens the access , as shown below.  

![API Editor](/wiki/imgs/API-Editor.png)

Through the access editor you can modify who or what in the case of an application can access your experiment through an API Call. By adding a persons email alias to the list you provide that person access to the experiment. Similarly, removing a person's alias from the list will remove their ability to call your experiment through an API call.  These changes do not change access to experiments through the ZebraAI web application.  
  
To grant access to your experiment to an application you add the Client ID of that application to the list. This is the Client ID created through EntraID and must reside in the Microsoft Corp Tenant.  
  
The **Submit** button saves your changes and closes the editor.  
The **Cancel** button closes the editor without saving.  
  
**Note** when configuring a Client ID to access an experiment, the ZebraAI Team must authorize that Client ID to access ZebraAI.  
