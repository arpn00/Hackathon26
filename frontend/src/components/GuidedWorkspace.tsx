import {
  makeStyles,
  tokens,
  Card,
  Text,
  Badge,
  Button,
  Spinner,
  TabList,
  Tab,
  Tooltip,
} from "@fluentui/react-components";
import {
  History20Regular,
  BookOpen20Regular,
  Alert20Regular,
  History16Regular,
  BookOpen16Regular,
  Alert16Regular,
  CheckmarkCircle16Filled,
  Sparkle16Filled,
  Person16Regular,
  Clock16Regular,
  ArrowSync16Regular,
  Notepad16Regular,
  Warning16Filled,
  Copy16Regular,
  Checkmark16Regular,
  Info16Regular,
  ChevronDown16Regular,
  ChevronUp16Regular,
} from "@fluentui/react-icons";
import { useEffect, useMemo, useRef, useState } from "react";
import { api, ApiRequestError } from "../api/client";
import type { ChatContext } from "../api/types";
import { DEMO_CASES } from "../data/demoCases";
import type { CaseDetails } from "../data/demoCases";
import { PrecedentsPanel, KbPanel, IncidentPanel } from "./EvidencePanels";
import { CaseChat } from "./CaseChat";

const useStyles = makeStyles({
  stack: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
  },
  card: {
    padding: tokens.spacingVerticalL,
  },
  detailHead: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  detailTop: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    flexWrap: "wrap",
  },
  ticketId: {
    color: tokens.colorNeutralForeground4,
    fontFamily: tokens.fontFamilyMonospace,
  },
  caseChip: {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    paddingTop: "2px",
    paddingBottom: "2px",
    paddingLeft: tokens.spacingHorizontalS,
    paddingRight: "4px",
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground3,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  caseChipLabel: {
    color: tokens.colorNeutralForeground3,
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  },
  caseChipNumber: {
    fontFamily: tokens.fontFamilyMonospace,
    color: tokens.colorNeutralForeground1,
    fontWeight: tokens.fontWeightSemibold,
  },
  spacer: { flexGrow: 1 },
  titleRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    flexWrap: "wrap",
  },
  detailMeta: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
    flexWrap: "wrap",
    color: tokens.colorNeutralForeground2,
  },
  metaItem: {
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    paddingTop: "3px",
    paddingBottom: "3px",
    paddingLeft: tokens.spacingHorizontalS,
    paddingRight: tokens.spacingHorizontalS,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground2,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  metaIcon: {
    color: tokens.colorNeutralForeground3,
    display: "inline-flex",
  },
  summary: {
    color: tokens.colorNeutralForeground2,
    lineHeight: tokens.lineHeightBase300,
  },
  sectionTitle: {
    color: tokens.colorNeutralForeground2,
  },
  capsHead: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: tokens.spacingHorizontalM,
    marginBottom: tokens.spacingVerticalM,
    flexWrap: "wrap",
  },
  headActions: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    flexWrap: "wrap",
  },
  caps: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: tokens.spacingHorizontalM,
    "@media (max-width: 820px)": {
      gridTemplateColumns: "1fr",
    },
  },
  cap: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    padding: tokens.spacingVerticalM,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground2,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    transitionProperty: "border-color, background-color, box-shadow",
    transitionDuration: "220ms",
  },
  capDone: {
    backgroundColor: tokens.colorBrandBackground2,
    border: `1px solid ${tokens.colorBrandStroke1}`,
  },
  capTop: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  capMark: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "34px",
    height: "34px",
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground1,
  },
  capMarkDone: {
    backgroundColor: tokens.colorPaletteGreenBackground2,
    color: tokens.colorPaletteGreenForeground1,
  },
  capTitle: {
    display: "flex",
    flexDirection: "column",
  },
  capDesc: {
    color: tokens.colorNeutralForeground3,
    minHeight: "32px",
  },
  capError: {
    color: tokens.colorPaletteRedForeground1,
  },
  results: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
    marginTop: tokens.spacingVerticalL,
  },
  evidenceHeader: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    paddingTop: tokens.spacingVerticalM,
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    color: tokens.colorNeutralForeground2,
  },
  evidenceIcon: {
    display: "inline-flex",
    color: tokens.colorBrandForeground1,
  },
  evidenceTabs: {
    marginTop: tokens.spacingVerticalXS,
  },
  tabCount: {
    marginLeft: "6px",
  },
  reveal: {
    animationName: {
      from: { opacity: 0, transform: "translateY(8px)" },
      to: { opacity: 1, transform: "translateY(0)" },
    },
    animationDuration: "340ms",
    animationTimingFunction: "ease-out",
    animationFillMode: "both",
  },
  detailGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: tokens.spacingHorizontalS,
  },
  detailField: {
    display: "flex",
    flexDirection: "column",
    gap: "3px",
    paddingTop: tokens.spacingVerticalS,
    paddingBottom: tokens.spacingVerticalS,
    paddingLeft: tokens.spacingHorizontalM,
    paddingRight: tokens.spacingHorizontalM,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground2,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  detailLabel: {
    color: tokens.colorNeutralForeground4,
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  },
  detailValue: {
    color: tokens.colorNeutralForeground1,
    fontWeight: tokens.fontWeightSemibold,
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  detailsWrap: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
    marginTop: tokens.spacingVerticalS,
  },
  sectionRow: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    color: tokens.colorNeutralForeground2,
  },
  sectionIcon: {
    display: "inline-flex",
    color: tokens.colorBrandForeground1,
  },
  panel: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    paddingTop: tokens.spacingVerticalM,
    paddingBottom: tokens.spacingVerticalM,
    paddingLeft: tokens.spacingHorizontalM,
    paddingRight: tokens.spacingHorizontalM,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground2,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  block: {
    display: "flex",
    flexDirection: "column",
    gap: "3px",
  },
  blockLabel: {
    color: tokens.colorNeutralForeground4,
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  },
  notes: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  note: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
    alignItems: "flex-start",
  },
  noteDot: {
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "30px",
    height: "30px",
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground1,
  },
  noteCard: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    gap: "3px",
    paddingTop: tokens.spacingVerticalS,
    paddingBottom: tokens.spacingVerticalS,
    paddingLeft: tokens.spacingHorizontalM,
    paddingRight: tokens.spacingHorizontalM,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground2,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  noteMeta: {
    display: "flex",
    gap: tokens.spacingHorizontalXS,
    alignItems: "center",
    flexWrap: "wrap",
  },
  noteAuthor: {
    color: tokens.colorNeutralForeground1,
  },
  noteTime: {
    color: tokens.colorNeutralForeground4,
  },
  noteText: {
    color: tokens.colorNeutralForeground2,
  },
});

type StepStatus = "idle" | "loading" | "done" | "error";

interface StepState<T> {
  status: StepStatus;
  data: T | null;
  error: string | null;
}

const IDLE: StepState<never> = { status: "idle", data: null, error: null };

interface GuidedWorkspaceProps {
  caseNumber: string;
  onSuggest: (caseNumber: string) => void;
  busy?: boolean;
}

export function GuidedWorkspace({ caseNumber, onSuggest, busy }: GuidedWorkspaceProps) {
  const styles = useStyles();
  const demo = useMemo(
    () => DEMO_CASES.find((c) => c.caseNumber === caseNumber),
    [caseNumber],
  );

  const [precedents, setPrecedents] = useState<
    StepState<{ seedCase: Record<string, unknown> | null; precedents: Array<Record<string, unknown>> }>
  >(IDLE);
  const [kb, setKb] = useState<StepState<{ kbArticles: Array<Record<string, unknown>> }>>(IDLE);
  const [incidents, setIncidents] = useState<
    StepState<{ incident: Record<string, unknown> | null }>
  >(IDLE);

  const errMsg = (e: unknown) =>
    e instanceof ApiRequestError ? e.message : "Something went wrong.";

  // Small artificial pause so the step's "working" state is visible during a demo.
  const beat = () => new Promise((r) => setTimeout(r, 450));

  const runPrecedents = async () => {
    setPrecedents({ status: "loading", data: null, error: null });
    try {
      const [data] = await Promise.all([api.stepPrecedents(caseNumber), beat()]);
      setPrecedents({ status: "done", data, error: null });
    } catch (e) {
      setPrecedents({ status: "error", data: null, error: errMsg(e) });
    }
  };

  const runKb = async () => {
    setKb({ status: "loading", data: null, error: null });
    try {
      const [data] = await Promise.all([api.stepKb(caseNumber), beat()]);
      setKb({ status: "done", data, error: null });
    } catch (e) {
      setKb({ status: "error", data: null, error: errMsg(e) });
    }
  };

  const runIncidents = async () => {
    setIncidents({ status: "loading", data: null, error: null });
    try {
      const [data] = await Promise.all([api.stepIncidents(caseNumber), beat()]);
      setIncidents({ status: "done", data, error: null });
    } catch (e) {
      setIncidents({ status: "error", data: null, error: errMsg(e) });
    }
  };

  const runAll = () => {
    void runPrecedents();
    void runKb();
    void runIncidents();
  };

  const anyGathered =
    precedents.status === "done" || kb.status === "done" || incidents.status === "done";

  // Collapse the full ticket detail to a high-level header once evidence exists,
  // so attention shifts to the gathered evidence. User can re-expand manually.
  const [showFullTicket, setShowFullTicket] = useState(true);
  const autoCollapsed = useRef(false);
  useEffect(() => {
    if (anyGathered && !autoCollapsed.current) {
      autoCollapsed.current = true;
      setShowFullTicket(false);
    }
    if (!anyGathered) autoCollapsed.current = false;
  }, [anyGathered]);

  // Which gathered-evidence tab is shown. Auto-advance to the most recently
  // completed step so the newest evidence is always in view.
  const [activeEvidence, setActiveEvidence] = useState<string>("precedents");
  const prevDone = useRef<Set<string>>(new Set());
  useEffect(() => {
    const order = ["precedents", "kb", "incidents"];
    const done = new Set<string>();
    if (precedents.status === "done") done.add("precedents");
    if (kb.status === "done") done.add("kb");
    if (incidents.status === "done") done.add("incidents");
    const newlyDone = order.filter((k) => done.has(k) && !prevDone.current.has(k));
    if (newlyDone.length > 0) {
      setActiveEvidence(newlyDone[newlyDone.length - 1]);
    } else if (!done.has(activeEvidence) && done.size > 0) {
      setActiveEvidence(order.find((k) => done.has(k)) as string);
    }
    prevDone.current = done;
  }, [precedents.status, kb.status, incidents.status, activeEvidence]);

  const [copied, setCopied] = useState(false);
  const copyCase = async () => {
    try {
      await navigator.clipboard.writeText(caseNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard may be unavailable (e.g. insecure context); ignore silently.
    }
  };

  const context: ChatContext = {
    seedCase: precedents.data?.seedCase ?? null,
    precedents: precedents.data?.precedents ?? [],
    kbArticles: kb.data?.kbArticles ?? [],
    incident: incidents.data?.incident ?? null,
  };

  const caps = [
    {
      key: "precedents",
      icon: <History20Regular />,
      title: "Recall precedents",
      agent: "Vector Case Review",
      desc: "Find similar prior cases with their resolutions.",
      zebra:
        "Calls ZebraAI's Commercial Vector Case Review, a vector search across past commercial cases that returns the most similar resolved cases with their resolutions.",
      state: precedents,
      run: runPrecedents,
      count:
        precedents.status === "done" ? precedents.data?.precedents.length ?? 0 : null,
    },
    {
      key: "kb",
      icon: <BookOpen20Regular />,
      title: "Find KB articles",
      agent: "Case + KM",
      desc: "Pull knowledge articles and documentation.",
      zebra:
        "Calls ZebraAI's Commercial Case + KM, which retrieves Knowledge Management (KM) articles related to this case.",
      state: kb,
      run: runKb,
      count: kb.status === "done" ? kb.data?.kbArticles.length ?? 0 : null,
    },
    {
      key: "incidents",
      icon: <Alert20Regular />,
      title: "Check live incidents",
      agent: "Case + ICM",
      desc: "Correlate with active or recent incidents.",
      zebra:
        "Calls ZebraAI's Commercial Case + ICM, which correlates the case with related incidents (ICMs) to deflect known outages.",
      state: incidents,
      run: runIncidents,
      count: incidents.status === "done" ? (incidents.data?.incident ? 1 : 0) : null,
    },
  ];

  return (
    <div className={styles.stack}>
      <Card
        className={styles.card}
        style={{
          borderLeft: `4px solid ${
            demo?.severity === "Sev A"
              ? tokens.colorPaletteRedBorder2
              : demo?.severity === "Sev B"
                ? tokens.colorPaletteDarkOrangeBorder2
                : tokens.colorBrandStroke1
          }`,
        }}
      >
        <div className={styles.detailHead}>
          <div className={styles.detailTop}>
            {demo ? (
              <Badge
                appearance="filled"
                color={
                  demo.severity === "Sev A"
                    ? "danger"
                    : demo.severity === "Sev B"
                      ? "warning"
                      : "brand"
                }
                size="small"
              >
                {demo.severity}
              </Badge>
            ) : null}
            <Badge appearance="tint" color="informative" size="small">
              {demo?.ticketStatus ?? "Open"}
            </Badge>
            {demo?.details?.isCritSit ? (
              <Badge appearance="filled" color="danger" size="small" icon={<Warning16Filled />}>
                CritSit
              </Badge>
            ) : null}
            <span className={styles.spacer} />
            <span className={styles.caseChip}>
              <Text size={100} className={styles.caseChipLabel}>
                Case
              </Text>
              <Text size={300} className={styles.caseChipNumber}>
                #{caseNumber}
              </Text>
              <Button
                appearance="subtle"
                size="small"
                icon={copied ? <Checkmark16Regular /> : <Copy16Regular />}
                aria-label="Copy case number"
                title={copied ? "Copied" : "Copy case number"}
                onClick={() => void copyCase()}
              />
            </span>
          </div>
          <Text size={600} weight="semibold" className={styles.titleRow}>
            {demo?.title ?? `Case ${caseNumber}`}
          </Text>
          {demo ? (
            <>
              <div className={styles.detailMeta}>
                <span className={styles.metaItem}>
                  <span className={styles.metaIcon}>
                    <Person16Regular />
                  </span>
                  <Text size={200}>{demo.customer}</Text>
                </span>
                <span className={styles.metaItem}>
                  <Text size={200}>{demo.product}</Text>
                </span>
                <span className={styles.metaItem}>
                  <span className={styles.metaIcon}>
                    <Clock16Regular />
                  </span>
                  <Text size={200}>{demo.sla}</Text>
                </span>
                <span className={styles.metaItem}>
                  <Text size={200}>
                    {demo.waiting} · {demo.channel}
                  </Text>
                </span>
              </div>
              <Button
                appearance="subtle"
                size="small"
                icon={showFullTicket ? <ChevronUp16Regular /> : <ChevronDown16Regular />}
                iconPosition="after"
                onClick={() => setShowFullTicket((v) => !v)}
                style={{ alignSelf: "flex-start" }}
              >
                {showFullTicket ? "Hide details" : "Show full ticket details"}
              </Button>
              {showFullTicket ? (
                <>
                  <Text size={300} className={styles.summary}>
                    {demo.summary}
                  </Text>
                  {demo.details ? (
                    <TicketDetails styles={styles} details={demo.details} />
                  ) : null}
                </>
              ) : null}
            </>
          ) : (
            <Text size={300} className={styles.summary}>
              Run the agent capabilities below to gather evidence for this case.
            </Text>
          )}
        </div>
      </Card>

      <Card className={styles.card}>
        <div className={styles.capsHead}>
          <div>
            <Text size={400} weight="semibold" className={styles.sectionTitle}>
              Agent capabilities
            </Text>
            <div>
              <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
                Trigger each step to watch the agent work, or gather everything at once.
              </Text>
            </div>
          </div>
          <div className={styles.headActions}>
            <Button
              appearance="secondary"
              icon={<ArrowSync16Regular />}
              onClick={runAll}
              disabled={busy}
            >
              Gather all evidence
            </Button>
            <Tooltip
              content="Runs the full agent (recall, KB, incidents, reasoning and self-check) in one pass and drafts a reply for your review."
              relationship="description"
              withArrow
            >
              <Button
                appearance="primary"
                icon={<Sparkle16Filled />}
                disabled={busy}
                onClick={() => onSuggest(caseNumber)}
              >
                Review &amp; resolve
              </Button>
            </Tooltip>
          </div>
        </div>

        <div className={styles.caps}>
          {caps.map((c) => (
            <div
              key={c.key}
              className={`${styles.cap} ${c.state.status === "done" ? styles.capDone : ""}`}
            >
              <div className={styles.capTop}>
                <span
                  className={`${styles.capMark} ${
                    c.state.status === "done" ? styles.capMarkDone : ""
                  }`}
                >
                  {c.state.status === "done" ? <CheckmarkCircle16Filled /> : c.icon}
                </span>
                <div className={styles.capTitle}>
                  <Text size={300} weight="semibold">
                    {c.title}
                  </Text>
                  <Text size={100} style={{ color: tokens.colorNeutralForeground3 }}>
                    {c.agent}
                  </Text>
                </div>
                <span className={styles.spacer} />
                {c.state.status === "done" ? (
                  <Badge
                    appearance="tint"
                    color="success"
                    size="small"
                    icon={<CheckmarkCircle16Filled />}
                  >
                    {c.count}
                  </Badge>
                ) : null}
                <Tooltip content={c.zebra} relationship="description" withArrow>
                  <Button
                    appearance="transparent"
                    size="small"
                    icon={<Info16Regular />}
                    aria-label={`How ${c.title} works`}
                  />
                </Tooltip>
              </div>
              <Text size={200} className={styles.capDesc}>
                {c.desc}
              </Text>
              {c.state.status === "error" ? (
                <Text size={200} className={styles.capError}>
                  {c.state.error}
                </Text>
              ) : null}
              <Button
                appearance={c.state.status === "done" ? "secondary" : "primary"}
                size="small"
                disabled={c.state.status === "loading" || busy}
                icon={
                  c.state.status === "loading" ? <Spinner size="tiny" /> : undefined
                }
                onClick={() => void c.run()}
              >
                {c.state.status === "loading"
                  ? "Running…"
                  : c.state.status === "done"
                    ? "Run again"
                    : "Run step"}
              </Button>
            </div>
          ))}
        </div>

        {anyGathered ? (
          <div className={styles.results}>
            <div className={styles.evidenceHeader}>
              <span className={styles.evidenceIcon}>
                <Sparkle16Filled />
              </span>
              <Text size={300} weight="semibold">
                Evidence gathered
              </Text>
            </div>
            <TabList
              className={styles.evidenceTabs}
              selectedValue={activeEvidence}
              onTabSelect={(_, d) => setActiveEvidence(d.value as string)}
              size="medium"
            >
              {precedents.status === "done" ? (
                <Tab value="precedents" icon={<History16Regular />}>
                  Precedents
                  <Badge
                    appearance="tint"
                    color="brand"
                    size="small"
                    className={styles.tabCount}
                  >
                    {precedents.data?.precedents.length ?? 0}
                  </Badge>
                </Tab>
              ) : null}
              {kb.status === "done" ? (
                <Tab value="kb" icon={<BookOpen16Regular />}>
                  KB articles
                  <Badge
                    appearance="tint"
                    color="brand"
                    size="small"
                    className={styles.tabCount}
                  >
                    {kb.data?.kbArticles.length ?? 0}
                  </Badge>
                </Tab>
              ) : null}
              {incidents.status === "done" ? (
                <Tab value="incidents" icon={<Alert16Regular />}>
                  Live incident
                  <Badge
                    appearance="tint"
                    color={incidents.data?.incident ? "danger" : "informative"}
                    size="small"
                    className={styles.tabCount}
                  >
                    {incidents.data?.incident ? 1 : 0}
                  </Badge>
                </Tab>
              ) : null}
            </TabList>
            <div className={styles.reveal} key={activeEvidence}>
              {activeEvidence === "precedents" && precedents.status === "done" ? (
                <PrecedentsPanel precedents={precedents.data?.precedents ?? []} />
              ) : null}
              {activeEvidence === "kb" && kb.status === "done" ? (
                <KbPanel kbArticles={kb.data?.kbArticles ?? []} />
              ) : null}
              {activeEvidence === "incidents" && incidents.status === "done" ? (
                <IncidentPanel incident={incidents.data?.incident ?? null} />
              ) : null}
            </div>
          </div>
        ) : null}
      </Card>

      <Card className={styles.card}>
        <Text size={400} weight="semibold" className={styles.sectionTitle}>
          Ask about this case
        </Text>
        <div style={{ marginTop: 12 }}>
          <CaseChat caseNumber={caseNumber} context={context} enabled={anyGathered} />
        </div>
      </Card>
    </div>
  );
}

type Styles = ReturnType<typeof useStyles>;

// Renders rich CSS ticket metadata + handover notes for an info-heavy case.
function TicketDetails({ styles, details }: { styles: Styles; details: CaseDetails }) {
  const fields: Array<{ label: string; value: string }> = [];
  if (details.currentQueue) fields.push({ label: "Queue", value: details.currentQueue });
  if (details.entitlement) fields.push({ label: "Entitlement", value: details.entitlement });
  if (details.caseAge) fields.push({ label: "Case age", value: details.caseAge });
  if (details.createdOn) fields.push({ label: "Created", value: details.createdOn });
  if (details.initialSeverity && details.maxSeverity)
    fields.push({
      label: "Severity",
      value: `${details.initialSeverity} → ${details.maxSeverity} (max)`,
    });
  if (typeof details.ownershipCount === "number")
    fields.push({ label: "Reassignments", value: String(details.ownershipCount) });
  if (typeof details.collaborationCount === "number")
    fields.push({ label: "Collaborations", value: String(details.collaborationCount) });
  if (typeof details.initialResponseMet === "boolean")
    fields.push({
      label: "Initial response",
      value: details.initialResponseMet ? "Met" : "Missed",
    });

  return (
    <div className={styles.detailsWrap}>
      {fields.length > 0 ? (
        <div className={styles.section}>
          <div className={styles.sectionRow}>
            <span className={styles.sectionIcon}>
              <Info16Regular />
            </span>
            <Text size={200} weight="semibold">
              Ticket details
            </Text>
          </div>
          <div className={styles.detailGrid}>
            {fields.map((f) => (
              <div key={f.label} className={styles.detailField}>
                <Text size={100} className={styles.detailLabel}>
                  {f.label}
                </Text>
                <Text size={200} className={styles.detailValue}>
                  {f.value}
                </Text>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {details.issueDescription || details.causeText || details.rootCause ? (
        <div className={styles.section}>
          <div className={styles.sectionRow}>
            <Text size={200} weight="semibold">
              Diagnosis
            </Text>
          </div>
          <div className={styles.panel}>
            {details.issueDescription ? (
              <div className={styles.block}>
                <Text size={100} className={styles.blockLabel}>
                  Issue description
                </Text>
                <Text size={200} className={styles.noteText}>
                  {details.issueDescription}
                </Text>
              </div>
            ) : null}
            {details.causeText ? (
              <div className={styles.block}>
                <Text size={100} className={styles.blockLabel}>
                  Suspected cause
                </Text>
                <Text size={200} className={styles.noteText}>
                  {details.causeText}
                </Text>
              </div>
            ) : null}
            {details.rootCause ? (
              <div className={styles.block}>
                <Text size={100} className={styles.blockLabel}>
                  Root cause (support topic)
                </Text>
                <Text
                  size={200}
                  className={styles.noteText}
                  style={{ fontFamily: tokens.fontFamilyMonospace }}
                >
                  {details.rootCause}
                </Text>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      {details.handoverNotes && details.handoverNotes.length > 0 ? (
        <div className={styles.section}>
          <div className={styles.sectionRow}>
            <span className={styles.sectionIcon}>
              <Notepad16Regular />
            </span>
            <Text size={200} weight="semibold">
              Handover notes ({details.handoverNotes.length})
            </Text>
          </div>
          <div className={styles.notes}>
            {details.handoverNotes.map((n, i) => (
              <div key={i} className={styles.note}>
                <span className={styles.noteDot}>
                  <Person16Regular />
                </span>
                <div className={styles.noteCard}>
                  <div className={styles.noteMeta}>
                    <Text size={200} weight="semibold" className={styles.noteAuthor}>
                      {n.author}
                    </Text>
                    <Text size={100} style={{ color: tokens.colorNeutralForeground3 }}>
                      · {n.role}
                    </Text>
                    <Text size={100} className={styles.noteTime}>
                      · {n.timestamp}
                    </Text>
                  </div>
                  <Text size={200} className={styles.noteText}>
                    {n.text}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
