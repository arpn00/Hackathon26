# Introduction

ZebraAI is an experimentation playground that allows users to create and
run experiments using Azure OpenAI and secure customer support data.
Experiments are projects that use AI models to perform tasks such as
summarization, predictions, or data analysis. Users can design their own
experiments or use pre-built templates from the ZebraAI library.

When an experiment is initially created it uses synthetic data. Once the
creator of the experiment has completed their prompt engineering and
would like to use real customer support data, they submit a request for
CSS Data Use. The request for CSS Data Use is sent to ZebraAI approvers,
who validate the experiment using the [ZebraAI Experiment Approvers
Checklist](https://microsoftapc.sharepoint.com/teams/ZebraAI/Shared%20Documents/General/Approvers/ZebraAI%20Approvers%20Checklist.docx).

This document describes the process for approving ZebraAI experiments,
including the steps to use the ZebraAI site, how to resolve conflicts,
and how to rollback an experiment if needed.

# Process Steps

The following steps outline the process for approving ZebraAI
experiments:

1.  ZebraAI Approvers receive an email with a new request.

2.  Approver logs in to the ZebraAI site and goes to [Admin\\Approve
    Experiments](https://zebra-ai-webapp-uat.azurewebsites.net/admin/approveexperiments).

3.  Review the list of experiments that are waiting for approval. You
    can click on the icon under Review for each experiment to see more
    details.

4.  For each experiment, decide whether to approve or reject it. You use
    the [ZebraAI Experiment Approvers
    Checklist](https://microsoftapc.sharepoint.com/teams/ZebraAI/Shared%20Documents/General/Approvers/ZebraAI%20Approvers%20Checklist.docx)
    to evaluate the experiment.

5.  If you approve the experiment, click on the Approve button. This
    will move the experiment to the Approved filter and notify the
    creator of the approval.

6.  If you reject the experiment, provide a reason for the rejection
    then click the Reject button. The reason will be sent to the creator
    of the experiment and the experiment will need to have the reasons
    for rejection resolved before resubmitting.

7.  Repeat steps 4 to 6 for each experiment waiting for approval.

# Conflict Resolution

Sometimes, there may be conflicts or disagreements between the approvers
or the creators of the experiments. For example, an approver may reject
an experiment that the creator thinks is valid, or an approver may
approve an experiment that another approver thinks is invalid. In such
cases, the following steps can be taken to resolve the conflict:

1.  The approver or the creator who has a concern about the approval
    decision should contact the other party and explain their reasoning
    and evidence.

2.  The other party should listen to the concern and respond with their
    own reasoning and evidence.

3.  The two parties should try to reach a consensus, or a compromise
    based on the facts and the criteria for approval.

4.  If the two parties cannot resolve the conflict by themselves, they
    should escalate the issue to ZebraAI Administrators who can mediate
    the discussion and make the final decision.

# Rollback

Sometimes, an experiment that has been approved and deployed to
production may need to be rolled back or reverted. For example, an
experiment may cause unexpected errors, performance issues, or negative
feedback from the users. In such cases, the following steps can be taken
to rollback the experiment:

1.  The approver or the creator who notices the problem with the
    experiment should report the issue to the [ZebraAI support
    team](https://forms.office.com/pages/responsepage.aspx?id=v4j5cvGGr0GRqy180BHbR3IuNv7lfiNCnaFIzX4ZZoFUQ0NGMUxFT1owVzM0MEtaWlVPWVRGOEs2Ni4u).

2.  The ZebraAI support team will verify the issue and confirm the
    rollback request.

3.  The ZebraAI support team will roll back the experiment to use
    synthetic support data.

4.  The approver and the creator should review the experiment and
    identify the root cause of the problem and the possible solutions.

5.  The creator should make the necessary changes to the experiment and
    resubmit it for approval.

6.  The approver should re-evaluate the experiment and approve or reject
    it accordingly.

# ZebraAI Approvers Checklist

<https://microsoftapc.sharepoint.com/teams/ZebraAI/Shared%20Documents/General/Approvers/ZebraAI%20Approvers%20Checklist.docx?web=1>
