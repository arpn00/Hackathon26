      
The application enforces structured and role‑appropriate de‑provisioning controls across front‑end access, back‑end systems, and source code repositories to ensure access is revoked in a timely manner when no longer required.

**Front‑End Access (ZebraAI Portal – Core Identity / AID‑Controlled Access)**
Front‑end access to the ZebraAI Portal is governed by Core Identity entitlements and follows standard identity lifecycle management controls, including periodic access review and automatic expiration.


**Access Review and Expiration**  

All Core Identity entitlements for front‑end access are subject to a mandatory 90‑day renewal cycle. Users must re‑justify continued access during this cycle to retain their entitlement.


**De‑Provisioning Mechanisms**

Front‑end access is de‑provisioned through the following mechanisms:
*   **Automatic De‑Provisioning**
    *   If a user does not re‑justify access during the 90‑day renewal window, the Core Identity entitlement automatically expires, and access is revoked without human intervention.
    *   When a user leaves Microsoft and their corporate account is disabled, Core Identity automatically revokes their ZebraAI front‑end access as part of standard corporate offboarding processes.
*   **On‑Request Removal**
    *   Front‑end access may also be revoked at any time via an explicit de‑provisioning request submitted through the Core Identity system, which removes the associated entitlement.

**Back‑End Access (Development Resources, JIT Groups, Azure Access)**
Back‑end access includes Development (Dev) resources, Azure Just‑In‑Time (JIT) group memberships, and access to PME‑restricted systems. De‑provisioning is enforced using a combination of automated controls and manual reviews appropriate to access sensitivity.


**Dev / Standard Back‑End Access (Azure JIT Groups)**
*   Users are manually removed from Dev JIT groups when they leave a project, team, or role requiring access.
*   JIT access is time‑bound by design and expires automatically after the defined access window (e.g., 8 hours).
*   Access also lapses naturally during periodic access reviews if the user fails to renew or re‑justify access.


**PME Back‑End Access (High‑Security Systems)**
PME access is intentionally limited, tightly controlled, and manually maintained due to the sensitivity of the systems involved.
*   Access must be re‑approved every 3–6 months. If a developer does not renew access, the entitlement expires and is not automatically re‑approved.
*   Manual de‑provisioning occurs when a developer leaves the team or their engagement ends. Development leadership periodically reviews and removes stale users.
*   PME group membership can only be modified or revoked by a limited and authorized set of approvers to maintain separation of duties and access integrity.

**Source Code Access (Azure DevOps Security Groups)**
Source code access is controlled through explicit Azure DevOps (ADO) security group membership.
**De‑Provisioning Process**
*   Source code de‑provisioning is managed manually. When a developer, vendor, or contributor leaves the team, project, or organization, they are removed from the relevant ADO security groups.
*   End users default to read‑only access unless explicitly granted elevated permissions. Revoking access is accomplished by removing the user from the applicable security group.

This approach ensures source code access remains restricted to authorized individuals and is promptly revoked when no longer required.

When applicable; Access revocation actions are initiated and recorded using standardized mechanisms to ensure consistency and auditability. Requests for access removal may be generated through formal identity management workflows (e.g., Core Identity de‑provisioning requests), Azure DevOps (ADO) work items, or system‑generated triggers such as entitlement expiration or corporate offboarding events. These mechanisms provide a centralized record of the request, action taken, and final outcome.