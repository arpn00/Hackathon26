# Restricted Access Case Exclusion in ZebraAI

##Why aren’t my "restricted" cases showing up in ZebraAI?
Following a security assessment in early August 2025, ZebraAI underwent a full platform cleanup and implemented new compliance filters to protect sensitive data. As a result, cases flagged as restricted—due to government associations, specific TPIDs, or internal flags—are now excluded from the platform.  This exclusion policy was introduced in alignment with guidance from the Security Management team following their assessment.

##Which cases are affected by these exclusions? 
ZebraAI does not include Restricted Access cases if any of the criteria is true:
*   **Restricted Program flag** has been set
*   Service Name contains some variant of **gov** or **fairfax**
*   Originating system contains **fairfax**
*   Internal title contains **government**
*   Queue Name contains **gov** or **fairfax**
*   TPID equals 752274, 6041391, 2154065, 16252051, 627554, 2487190, 643924, 2162550, 15127713, 23529896, 644189

##What should I do if I believe a case is missing in error from ZebraAI? 
If you believe a case is missing in error, please open a ticket (excluding PII) for review. The team has restored all major datasets and continues to refine filtering and user notifications.