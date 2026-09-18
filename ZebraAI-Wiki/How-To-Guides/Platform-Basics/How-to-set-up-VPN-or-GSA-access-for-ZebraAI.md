[[_TOC_]]

# VPN or GSA access for ZebraAI
To access ZebraAI, you will need to connect via VPN (MSFT-AzVPN-Manual) or GSA. 

## How to request and set up MSFT-AzVPN-Manual VPN connection for ZebraAI

### To request this VPN Connection:
1. Navigate to [CoreIdentity - Submit RAS Request](https://coreidentity.microsoft.com/landing-page/redmond/CRG-ras-exceptions/submit) as shown below.
![VPN request](/wiki/imgs/VPN-request.png)
2. Complete and submit the form.
3. Wait for approval.

### To set up this VPN connection once you receive approval: 
1. Use Search to find and select the **Add a VPN Connection** System Setting on your machine.  
2. Press the **Add VPN** button.
3. Fill in the Connection Name with **MSFT-AzVPN-Manual**  
4. Fill in the System Name or Address with **azuregateway-7cee0077-d553-4323-87df-069c331f58cb-053dd0f6af02.vpn.azure.com**
5. Press the **Save** button at the botton of the dialog box.

Before pressing the save button your screen should look like the following:  
![VPN Config](/wiki/imgs/VPN-config.png)


## How to request and set up GSA connection for ZebraAI

### To connect via GSA:

**1. Make sure GSA is enabled**

![GSA](/_site/wiki/imgs/GSA.png)

**2. Ensure the "Private" channel is enabled within GSA**

![GSA Private](/_site/wiki/imgs/GSAprivate.png)
<br>
<br>
**3. If you DON'T see Private channel within GSA:**
- Go to aka.ms/remote 
- Click on “Want early access? Join today”
![GSA Join](/_site/wiki/imgs/GSAJoin.png)
- Follow the steps in the intake form and submit 
- Please allow 1-2 hours for changes to land (you will be added to the proper security group* that will enable the channel and policies) 

**If you want to verify the steps for GSA have been completed properly:**
1. Go to portal.azure.com Security group is IES-GSA-PA-Prod 
2. Type your alias into the search bar 
3. Click on “Groups” 
4. Search for IES-GSA-PA-Prod 
5. Confirm it is present and assigned 
