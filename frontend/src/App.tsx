import {
  makeStyles,
  tokens,
  Card,
  Text,
  Divider,
} from "@fluentui/react-components";
import { useEffect, useState } from "react";
import { AppHeader } from "./components/AppHeader";
import { CaseGallery } from "./components/CaseGallery";
import { RecentResolutions } from "./components/RecentResolutions";
import { InteractionTimeline } from "./components/InteractionTimeline";
import { SeedCasePanel } from "./components/SeedCasePanel";
import {
  PrecedentsPanel,
  KbPanel,
  IncidentPanel,
} from "./components/EvidencePanels";
import { DraftPanel } from "./components/DraftPanel";
import { ReviewBar } from "./components/ReviewBar";
import { FeedbackBar } from "./components/FeedbackBar";
import { RouteBadge, ConfidenceBadge } from "./components/RouteBadge";
import { LoadingState, ErrorState, EmptyState } from "./components/States";
import { useResolveRun } from "./hooks/useResolveRun";
import { api } from "./api/client";

const useStyles = makeStyles({
  page: {
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground3,
    display: "flex",
    flexDirection: "column",
  },
  body: {
    display: "grid",
    gridTemplateColumns: "minmax(320px, 380px) 1fr",
    gap: tokens.spacingHorizontalXXL,
    padding: tokens.spacingHorizontalXXL,
    alignItems: "start",
    "@media (max-width: 980px)": {
      gridTemplateColumns: "1fr",
    },
  },
  leftCol: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
    position: "sticky",
    top: tokens.spacingVerticalL,
  },
  mainCol: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
    minWidth: 0,
  },
  card: {
    padding: tokens.spacingVerticalL,
  },
  cardTitleRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: tokens.spacingHorizontalM,
    marginBottom: tokens.spacingVerticalM,
    flexWrap: "wrap",
  },
  badges: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
    alignItems: "center",
    flexWrap: "wrap",
  },
  evidenceGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: tokens.spacingHorizontalL,
    "@media (max-width: 700px)": {
      gridTemplateColumns: "1fr",
    },
  },
  sectionTitle: {
    color: tokens.colorNeutralForeground2,
  },
});

export function App() {
  const styles = useStyles();
  const { state, start, open, review } = useResolveRun();
  const [mode, setMode] = useState<string>();
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    api
      .health()
      .then((h) => setMode(h.mode))
      .catch(() => setMode(undefined));
  }, []);

  // Refresh the recent list whenever a run reaches a stable phase.
  useEffect(() => {
    if (state.phase === "reviewing" || state.phase === "completed") {
      setRefreshKey((k) => k + 1);
    }
  }, [state.phase]);

  const run = state.run;
  const busy = state.phase === "resolving";
  const activeCase =
    (run?.seedCase?.caseNumber as string | undefined) ?? undefined;

  return (
    <div className={styles.page}>
      <AppHeader mode={mode} />

      <div className={styles.body}>
        <aside className={styles.leftCol}>
          <Card className={styles.card}>
            <CaseGallery onRun={start} activeCaseNumber={activeCase} disabled={busy} />
          </Card>
          <Card className={styles.card}>
            <RecentResolutions refreshKey={refreshKey} onOpen={open} />
          </Card>
        </aside>

        <main className={styles.mainCol}>
          {state.phase === "idle" ? (
            <Card className={styles.card}>
              <EmptyState onRun={start} disabled={busy} />
            </Card>
          ) : null}

          {state.phase === "error" ? (
            <Card className={styles.card}>
              <ErrorState message={state.error ?? "Unknown error"} />
            </Card>
          ) : null}

          {busy && !run ? (
            <Card className={styles.card}>
              <LoadingState label="Agent is recalling precedents and reasoning…" />
            </Card>
          ) : null}

          {run ? (
            <>
              <Card className={styles.card}>
                <div className={styles.cardTitleRow}>
                  <Text size={300} weight="semibold" className={styles.sectionTitle}>
                    Case under review
                  </Text>
                  <div className={styles.badges}>
                    <RouteBadge route={run.route} />
                    <ConfidenceBadge confidence={run.confidence} />
                  </div>
                </div>
                <SeedCasePanel seedCase={run.seedCase} />
              </Card>

              <Card className={styles.card}>
                <Text size={300} weight="semibold" className={styles.sectionTitle}>
                  Evidence gathered
                </Text>
                <div className={styles.evidenceGrid} style={{ marginTop: 12 }}>
                  <PrecedentsPanel precedents={run.precedents} />
                  <div>
                    <KbPanel kbArticles={run.kbArticles} />
                    <div style={{ height: 12 }} />
                    <IncidentPanel incident={run.incident} />
                  </div>
                </div>
              </Card>

              <Card className={styles.card}>
                <div className={styles.cardTitleRow}>
                  <Text size={300} weight="semibold" className={styles.sectionTitle}>
                    {state.phase === "completed"
                      ? "Resolution"
                      : "Proposed resolution"}
                  </Text>
                </div>
                <DraftPanel draft={run.draft} finalReply={run.finalReply} />

                <Divider style={{ marginTop: 16, marginBottom: 16 }} />

                {state.phase === "reviewing" ? (
                  <ReviewBar
                    currentReply={run.draft?.reply ?? ""}
                    disabled={busy}
                    onReview={review}
                  />
                ) : (
                  <FeedbackBar runId={run.runId} />
                )}
              </Card>

              {run.interactions.length > 0 ? (
                <Card className={styles.card}>
                  <Text size={300} weight="semibold" className={styles.sectionTitle}>
                    Agent &amp; human activity
                  </Text>
                  <div style={{ marginTop: 12 }}>
                    <InteractionTimeline interactions={run.interactions} />
                  </div>
                </Card>
              ) : null}
            </>
          ) : null}
        </main>
      </div>
    </div>
  );
}
