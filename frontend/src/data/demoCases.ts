// Curated synthetic tickets so reviewers see a realistic CSS engineer queue.
// Case numbers map to fixtures under fixtures/zebraai/ (synthetic data only, no PII).
// Detail fields mirror real ZebraAI commercial case columns
// (see ZebraAI-Wiki/Reference/Data/Data-Dictionary-Commercial.md).

// A single case/handover note (maps to the CaseNotes column).
export interface CaseNote {
  author: string;
  role: string;
  timestamp: string;
  text: string;
}

// Rich CSS ticket metadata, grounded in the commercial data dictionary.
export interface CaseDetails {
  issueDescription?: string; // IssueDescription
  causeText?: string; // CauseText
  rootCause?: string; // RootCauseFull
  currentQueue?: string; // CurrentQueue
  caseAge?: string; // CaseAgeDays
  createdOn?: string; // CreatedDateTime
  initialSeverity?: string; // InitialSeverity
  maxSeverity?: string; // MaxSeverity
  ownershipCount?: number; // OwnershipCount (reassignments)
  collaborationCount?: number; // CollaborationCount
  isCritSit?: boolean; // IsCritSit
  initialResponseMet?: boolean; // IsIRMet
  entitlement?: string; // support plan / program
  handoverNotes?: CaseNote[]; // CaseNotes
}

export interface DemoCase {
  caseNumber: string;
  title: string;
  product: string;
  severity: string;
  summary: string;
  customer: string;
  channel: string;
  sla: string;
  waiting: string;
  ticketStatus: string;
  expectedRoute: "resolve" | "deflect" | "escalate";
  expectedLabel: string;
  accent: "brand" | "danger" | "warning";
  details?: CaseDetails;
}

export const DEMO_CASES: DemoCase[] = [
  {
    caseNumber: "8809074412559830",
    title: "Azure App Service: intermittent HTTP 503 & latency spikes",
    product: "Azure App Service",
    severity: "Sev A",
    summary:
      "Customer in East US reports intermittent 503s and latency spikes. Rich precedent history and a related incident exist.",
    customer: "Contoso Ltd. · Premier",
    channel: "Web portal",
    sla: "SLA 1h 12m",
    waiting: "Opened 22m ago",
    ticketStatus: "New",
    expectedRoute: "resolve",
    expectedLabel: "AI hint: resolvable with citations",
    accent: "danger",
    details: {
      issueDescription:
        "Production web app returns intermittent HTTP 503 responses and P95 latency spikes (up to 8s) for ~10% of requests during peak hours. Customer reports no recent deployment. Impact began ~26h ago and correlates with an autoscale event.",
      causeText:
        "Suspected platform-side capacity throttling on the App Service plan during scale-out; instances briefly unhealthy while warming up.",
      rootCause:
        "Azure / App Service / Availability, Performance, and Application Crashes / HTTP 503 - Service Unavailable",
      currentQueue: "Azure App Service: Availability (Tier 2)",
      caseAge: "1d 2h (26h)",
      createdOn: "2026-09-18 09:14 UTC",
      initialSeverity: "Sev B",
      maxSeverity: "Sev A",
      ownershipCount: 3,
      collaborationCount: 2,
      isCritSit: true,
      initialResponseMet: true,
      entitlement: "Premier / Unified: 24x7, 1h Sev A response",
      handoverNotes: [
        {
          author: "Priya N.",
          role: "L1 Front-line",
          timestamp: "18 Sep, 09:41 UTC",
          text: "Customer opened via portal at Sev B. Confirmed 503s in App Insights failures blade. Collected correlation IDs and time window. Advised against redeploy. Escalating to Tier 2; impact widening.",
        },
        {
          author: "Marco L.",
          role: "Tier 2 Engineer (prior owner)",
          timestamp: "18 Sep, 15:20 UTC",
          text: "Reproduced during 14:00–15:00 peak. Ruled out app code; no recent deploy, same behavior on staging slot. Health check shows instances flapping on scale-out. Raised ICM to platform team, requested capacity review. Bumped to Sev A after second outage window.",
        },
        {
          author: "On-call handoff",
          role: "Shift transfer",
          timestamp: "19 Sep, 00:05 UTC",
          text: "Overnight handover: awaiting platform capacity confirmation. Customer engaged and calm but wants RCA by EOD. Next step: confirm mitigation (scale-out min instances) and validate with customer during next peak. Precedents from prior 503 cases likely apply.",
        },
      ],
    },
  },
  {
    caseNumber: "8809081904518713",
    title: "Xbox: refund request for duplicate charge",
    product: "Xbox",
    severity: "Sev C",
    summary:
      "Customer requests a refund for a duplicate purchase. Precedents and a refund knowledge article are available.",
    customer: "Jordan Rivera · Consumer",
    channel: "Chat",
    sla: "SLA 6h 40m",
    waiting: "Opened 1h ago",
    ticketStatus: "New",
    expectedRoute: "resolve",
    expectedLabel: "AI hint: billing playbook",
    accent: "brand",
    details: {
      issueDescription:
        "Customer was charged twice for the same Xbox Game Pass Ultimate purchase on the same day. Requests a refund for the duplicate charge and confirmation it won't recur.",
      causeText:
        "Duplicate transaction: payment retried after a transient gateway timeout; both attempts settled.",
      rootCause:
        "Xbox / Billing & Subscriptions / Duplicate Charge / Refund Eligible",
      currentQueue: "Xbox: Billing & Refunds (Tier 1)",
      caseAge: "1h",
      createdOn: "2026-09-19 08:02 UTC",
      initialSeverity: "Sev C",
      maxSeverity: "Sev C",
      ownershipCount: 1,
      collaborationCount: 0,
      isCritSit: false,
      initialResponseMet: true,
      entitlement: "Consumer: standard",
      handoverNotes: [
        {
          author: "Sam O.",
          role: "L1 Billing",
          timestamp: "19 Sep, 08:15 UTC",
          text: "Verified two identical charges on the customer's account, same order ID root. Eligible per refund policy. Following standard duplicate-charge playbook; confirming payment instrument before issuing refund.",
        },
      ],
    },
  },
  {
    caseNumber: "8809082348468911",
    title: "Advertising Solutions: bespoke SMB consultation request",
    product: "Advertising Solutions",
    severity: "Sev C",
    summary:
      "A bespoke consultation request with no matching precedents, knowledge articles, or incidents, so the agent should escalate.",
    customer: "Northwind Traders · SMB",
    channel: "Email",
    sla: "SLA 8h 05m",
    waiting: "Opened 3h ago",
    ticketStatus: "New",
    expectedRoute: "escalate",
    expectedLabel: "AI hint: likely escalation",
    accent: "warning",
    details: {
      issueDescription:
        "SMB customer requests a bespoke, hands-on consultation to design a custom advertising campaign strategy for a niche market. Asks for a tailored plan and a call with a specialist.",
      causeText:
        "Non-standard request: requires human specialist judgement; no documented playbook or precedent covers a bespoke consultation.",
      rootCause: "Advertising Solutions / Consultation / Bespoke Strategy (unmapped)",
      currentQueue: "Advertising Solutions: SMB Intake (Tier 1)",
      caseAge: "3h",
      createdOn: "2026-09-19 06:10 UTC",
      initialSeverity: "Sev C",
      maxSeverity: "Sev C",
      ownershipCount: 1,
      collaborationCount: 0,
      isCritSit: false,
      initialResponseMet: false,
      entitlement: "SMB: standard",
      handoverNotes: [
        {
          author: "Dana K.",
          role: "L1 Intake",
          timestamp: "19 Sep, 06:31 UTC",
          text: "Customer wants a custom strategy session, not a how-to answer. No KB or prior case matches. Flagging for routing to a human advertising specialist; outside self-serve scope.",
        },
      ],
    },
  },
];
