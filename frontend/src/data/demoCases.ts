// Curated synthetic tickets so reviewers see a realistic CSS engineer queue.
// Case numbers map to fixtures under fixtures/zebraai/ (synthetic data only — no PII).

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
}

export const DEMO_CASES: DemoCase[] = [
  {
    caseNumber: "8809074412559830",
    title: "Azure App Service — intermittent HTTP 503 & latency spikes",
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
  },
  {
    caseNumber: "8809081904518713",
    title: "Xbox — refund request for duplicate charge",
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
  },
  {
    caseNumber: "8809082348468911",
    title: "Advertising Solutions — bespoke SMB consultation request",
    product: "Advertising Solutions",
    severity: "Sev C",
    summary:
      "A bespoke consultation request with no matching precedents, knowledge articles, or incidents — the agent should escalate.",
    customer: "Northwind Traders · SMB",
    channel: "Email",
    sla: "SLA 8h 05m",
    waiting: "Opened 3h ago",
    ticketStatus: "New",
    expectedRoute: "escalate",
    expectedLabel: "AI hint: likely escalation",
    accent: "warning",
  },
];
