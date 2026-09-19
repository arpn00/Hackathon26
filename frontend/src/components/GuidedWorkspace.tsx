import {
  makeStyles,
  tokens,
  Card,
  Text,
  Badge,
  Button,
  Spinner,
  Divider,
} from "@fluentui/react-components";
import {
  History20Regular,
  BookOpen20Regular,
  Alert20Regular,
  CheckmarkCircle16Filled,
  Sparkle16Filled,
  Person16Regular,
  Clock16Regular,
  ArrowSync16Regular,
} from "@fluentui/react-icons";
import { useMemo, useState } from "react";
import { api, ApiRequestError } from "../api/client";
import type { ChatContext } from "../api/types";
import { DEMO_CASES } from "../data/demoCases";
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
  spacer: { flexGrow: 1 },
  detailMeta: {
    display: "flex",
    gap: tokens.spacingHorizontalL,
    flexWrap: "wrap",
    color: tokens.colorNeutralForeground3,
  },
  metaItem: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  summary: {
    color: tokens.colorNeutralForeground2,
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
  actionBar: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
    flexWrap: "wrap",
  },
  actionHint: {
    color: tokens.colorNeutralForeground3,
    flexGrow: 1,
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
      state: incidents,
      run: runIncidents,
      count: incidents.status === "done" ? (incidents.data?.incident ? 1 : 0) : null,
    },
  ];

  return (
    <div className={styles.stack}>
      <Card className={styles.card}>
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
            <span className={styles.spacer} />
            <Text size={100} className={styles.ticketId}>
              #{caseNumber}
            </Text>
          </div>
          <Text size={500} weight="semibold">
            {demo?.title ?? `Case ${caseNumber}`}
          </Text>
          {demo ? (
            <>
              <div className={styles.detailMeta}>
                <span className={styles.metaItem}>
                  <Person16Regular />
                  <Text size={200}>{demo.customer}</Text>
                </span>
                <Text size={200}>{demo.product}</Text>
                <span className={styles.metaItem}>
                  <Clock16Regular />
                  <Text size={200}>{demo.sla}</Text>
                </span>
                <Text size={200}>
                  {demo.waiting} · {demo.channel}
                </Text>
              </div>
              <Text size={300} className={styles.summary}>
                {demo.summary}
              </Text>
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
                Trigger each step to watch the agent work — or gather everything at once.
              </Text>
            </div>
          </div>
          <Button
            appearance="secondary"
            icon={<ArrowSync16Regular />}
            onClick={runAll}
            disabled={busy}
          >
            Gather all evidence
          </Button>
        </div>

        <div className={styles.caps}>
          {caps.map((c) => (
            <div key={c.key} className={styles.cap}>
              <div className={styles.capTop}>
                <span className={styles.capMark}>{c.icon}</span>
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
            {precedents.status === "done" ? (
              <PrecedentsPanel precedents={precedents.data?.precedents ?? []} />
            ) : null}
            {kb.status === "done" ? (
              <KbPanel kbArticles={kb.data?.kbArticles ?? []} />
            ) : null}
            {incidents.status === "done" ? (
              <IncidentPanel incident={incidents.data?.incident ?? null} />
            ) : null}
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

      <Card className={styles.card}>
        <div className={styles.actionBar}>
          <span className={styles.actionHint}>
            <Text size={200}>
              <Sparkle16Filled style={{ verticalAlign: "-2px" }} /> When you're ready, let
              the agent reason across all sources and draft a reply for your review.
            </Text>
          </span>
          <Button
            appearance="primary"
            size="large"
            icon={<Sparkle16Filled />}
            disabled={busy}
            onClick={() => onSuggest(caseNumber)}
          >
            Suggest resolution
          </Button>
        </div>
        <Divider style={{ marginTop: 16, marginBottom: 16 }} />
        <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
          In a hurry? “Suggest resolution” runs the full agent — recall, KB, incidents,
          reasoning and self-check — in one pass.
        </Text>
      </Card>
    </div>
  );
}
