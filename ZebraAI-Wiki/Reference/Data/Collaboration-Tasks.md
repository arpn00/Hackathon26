#Collaboration Tasks in ZebraAI

[[_TOC_]]


Overview
--------

**Collaboration Tasks** are separately indexed records linked to commercial support cases. ZebraAI now indexes and surfaces these records alongside parent cases, giving users a complete view of case activity.

> **Key concept:** Searching by case number returns both the parent case and its associated collaboration tasks. Collaboration tasks are identifiable by **3 extra digits** appended to the parent case number (e.g., case `12345678` → collab task `12345678-001`).

* * *

Availability & Supported Experiments
------------------------------------

| Experiment Type | Collaboration Tasks | Pipeline |
| --- | --- | --- |
| **Commercial Case Search** | ✅ Supported | Next-Day (~24h refresh) |
| **Commercial Case Lookup** | ✅ Supported | Next-Day (~24h refresh) |
| NRT | ❌ Not Supported | — |
| Other experiment types | ❌ Not Supported | — |



* * *

How to Use
----------

### Enable Collaboration Tasks

1.  Open an existing or new **Commercial Case Search** or **Commercial Case Lookup** experiment
2.  Locate the **Collaboration Tasks toggle** in experiment configuration
3.  Enable the toggle to include collaboration task records in results

### Search for Collaboration Tasks

*   **By parent case number:** Returns the case plus all linked collaboration tasks
*   **By collaboration task ID:** Directly returns the specific collaboration task record
*   **Via ZebraAI Interface or API:** Collaboration Tasks are available via ZebraAI API when the collaboration toggle is enabled in the experiment. Lookup endpoint accepts **case numbers or collaboration task IDs** as input.

Collaboration tasks appear as separate result entries, identifiable by the extended case number

![image (28).png](/.attachments/image%20(28)-eb7f441f-f76a-46de-929a-8ee926df8625.png)


* * *

FAQ
---

**Q: Can I search for collaboration tasks in NRT experiments?** A: No. Collaboration tasks are only available in Next-Day pipeline experiments (Commercial Case Search and Commercial Case Lookup). NRT is not supported.

**Q: How do I tell the difference between a case and a collaboration task in results?** A: Collaboration tasks have 3 extra digits appended to the parent case number (e.g., `12345678-001`).

**Q: Do I need separate API access for collaboration tasks?** A: No. The same API endpoint returns collaboration tasks when the toggle is enabled. 
