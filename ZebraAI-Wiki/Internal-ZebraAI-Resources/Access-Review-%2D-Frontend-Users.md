# Review of User Access Rights — Frontend Users
.

  



  
![image.png](/.attachments/image-3a32a0e5-da69-4adb-a265-7990c6c72f56.png)
  

## Overview

  

Front-end access to the ZebraAI Portal is governed through CoreIdentity security groups mapped to application roles within Microsoft Entra ID. The system enforces role-based access control using the following groups:

  

Each CoreIdentity group creates a corresponding Entra ID security group, which is mapped to an application role in code. The mapping chain is: **CoreIdentity Group → Entra ID Security Group → Application Role**.


  
![image.png](/.attachments/image-d68df8d4-a91f-4dd5-9b6c-5ca18d3d2e99.png)

  

> **Note:** All CoreIdentity groups use a 180-day automatic expiration window. Users must re-justify their access before the expiration date or their entitlement is automatically revoked.

  

## Automated Access Controls

  

CoreIdentity provides built-in lifecycle management that enforces de-provisioning without manual intervention:

  

- **Automatic expiration:** All entitlements expire after 180 days. Users must re-justify continued access to retain their entitlement. If no justification is provided, access is automatically revoked.

- **Corporate offboarding:** When a user leaves Microsoft and their corporate account is disabled, CoreIdentity automatically revokes all ZebraAI entitlements as part of standard offboarding processes.

- **Organizational changes:** When a user changes teams or roles within the organization, dynamic group membership rules re-evaluate eligibility. Users who no longer meet the group criteria lose access automatically.

- **On-request removal:** Access may be revoked at any time via an explicit de-provisioning request submitted through the CoreIdentity system.

  

## Quarterly Access Review Process

  

In addition to automated expiration controls, the team performs a formal manual access review on a quarterly basis. This review ensures that all users with front-end access have a continued business need and that roles and permissions remain appropriate.

  

### Step 1 — Initiation (TPM)

  

At the start of each quarter, the TPM initiates the access review by:

  

1. Extracting the current membership list from each CoreIdentity security group (Reader, Contributor, Approver, Admin)

2. Compiling a complete access listing that includes: user name, email, role/group, and date of last entitlement renewal

3. Creating an ADO work item to track the review, linked to the appropriate compliance requirement

4. Assigning the review to a designated **Development Lead** who has the necessary knowledge of team composition and role requirements

  

### Step 2 — Review (Development Lead)

  

The assigned reviewer reviews the access listing to verify that:

  

- All listed users are recognized members of the team or organization with a legitimate need for access

- No unexpected, unfamiliar, or suspicious accounts are present

- Assigned roles are appropriate for each user's current function

  

Any users or entries that appear suspicious, outdated, or no longer justified are flagged for removal or role adjustment.

  

> **Segregation of Duties:** If the assigned reviewer appears in the access list, a separate reviewer must validate their access to maintain independence and avoid self-approval. The TPM ensures this is enforced during assignment.

  

### Step 3 — Remediation

  

For any users flagged during the review:

  

- **Removal:** The user's CoreIdentity entitlement is revoked through the CoreIdentity de-provisioning process. Removal is executed promptly upon review completion.

- **Role change:** If a user's access level is no longer appropriate, their current entitlement is revoked and a new entitlement at the correct level is provisioned.

- **Retention:** Users confirmed as appropriate are documented as reviewed and retained.

  

All review artifacts are attached to the corresponding ADO work item and retained for audit purposes.

  

## Review Schedule

  

![image.png](/.attachments/image-73436b85-454f-48b5-b963-aeff516fe46b.png)