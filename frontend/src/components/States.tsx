import { makeStyles, tokens, Spinner, Text, Input, Button, Field } from "@fluentui/react-components";
import {
  ErrorCircle24Regular,
  Search16Regular,
  History24Regular,
  DocumentSearch24Regular,
  DocumentEdit24Regular,
  Sparkle28Filled,
  ArrowRight16Regular,
} from "@fluentui/react-icons";
import { useEffect, useState } from "react";

// Stages surfaced while the full agent runs, so the wait feels like real work.
const DEFAULT_STEPS = [
  "Recalling similar past cases…",
  "Reviewing knowledge base articles…",
  "Checking for related live incidents…",
  "Reasoning across the evidence…",
  "Drafting a grounded reply…",
  "Running a self-check…",
];

const useStyles = makeStyles({
  center: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: tokens.spacingVerticalM,
    paddingTop: tokens.spacingVerticalXXXL,
    paddingBottom: tokens.spacingVerticalXXXL,
    textAlign: "center",
  },
  icon: {
    fontSize: "40px",
  },
  error: {
    color: tokens.colorPaletteRedForeground1,
  },
  muted: {
    color: tokens.colorNeutralForeground3,
    maxWidth: "440px",
  },
  hero: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: tokens.spacingVerticalL,
    paddingTop: tokens.spacingVerticalXXL,
    paddingBottom: tokens.spacingVerticalXXL,
    paddingLeft: tokens.spacingHorizontalXXL,
    paddingRight: tokens.spacingHorizontalXXL,
    textAlign: "center",
  },
  heroMark: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "56px",
    height: "56px",
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground1,
  },
  heroCopy: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
    alignItems: "center",
  },
  heroSub: {
    color: tokens.colorNeutralForeground3,
    maxWidth: "460px",
  },
  steps: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: tokens.spacingHorizontalS,
    flexWrap: "wrap",
    marginTop: tokens.spacingVerticalS,
    marginBottom: tokens.spacingVerticalS,
  },
  step: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: tokens.spacingVerticalXS,
    width: "132px",
  },
  stepMark: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground2,
  },
  stepLabel: {
    color: tokens.colorNeutralForeground2,
  },
  stepCaption: {
    color: tokens.colorNeutralForeground3,
  },
  chevron: {
    color: tokens.colorNeutralForeground4,
  },
  lookupCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: tokens.spacingVerticalS,
    width: "100%",
    maxWidth: "460px",
    marginTop: tokens.spacingVerticalM,
    paddingTop: tokens.spacingVerticalL,
    paddingBottom: tokens.spacingVerticalL,
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
    borderRadius: tokens.borderRadiusLarge,
    backgroundColor: tokens.colorNeutralBackground2,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  lookupRow: {
    display: "flex",
    alignItems: "flex-end",
    gap: tokens.spacingHorizontalM,
    width: "100%",
  },
  lookupField: {
    flexGrow: 1,
    textAlign: "left",
  },
  hint: {
    color: tokens.colorNeutralForeground3,
  },
});

export function LoadingState({
  label,
  messages,
}: {
  label?: string;
  messages?: string[];
}) {
  const styles = useStyles();
  const steps = messages ?? DEFAULT_STEPS;
  const [i, setI] = useState(0);

  // Walk through the agent's stages so the wait reflects real work in progress.
  useEffect(() => {
    setI(0);
    const id = setInterval(() => {
      setI((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1800);
    return () => clearInterval(id);
  }, [steps]);

  return (
    <div className={styles.center}>
      <Spinner size="large" label={steps[i]} />
      <Text size={200} className={styles.muted}>
        {label ??
          "Pre-cedent AI is working across ZebraAI experiments. This can take a few seconds."}
      </Text>
    </div>
  );
}

export function ErrorState({ message }: { message: string }) {
  const styles = useStyles();
  return (
    <div className={styles.center}>
      <ErrorCircle24Regular className={`${styles.icon} ${styles.error}`} />
      <Text size={400} weight="semibold">
        Something went wrong
      </Text>
      <Text className={styles.muted}>{message}</Text>
    </div>
  );
}

export function EmptyState({
  onRun,
  disabled,
}: {
  onRun?: (caseNumber: string) => void;
  disabled?: boolean;
}) {
  const styles = useStyles();
  const [custom, setCustom] = useState("");

  const steps = [
    {
      icon: <History24Regular />,
      label: "Recall precedents",
      caption: "Similar resolved cases",
    },
    {
      icon: <DocumentSearch24Regular />,
      label: "Check KB & incidents",
      caption: "Grounded in live sources",
    },
    {
      icon: <DocumentEdit24Regular />,
      label: "Draft resolution",
      caption: "You review & approve",
    },
  ];

  return (
    <div className={styles.hero}>
      <div className={styles.heroMark}>
        <Sparkle28Filled />
      </div>
      <div className={styles.heroCopy}>
        <Text size={600} weight="semibold">
          Ready when you are
        </Text>
        <Text size={300} className={styles.heroSub}>
          Pick a ticket from your queue, or look up any case number. Pre-cedent AI does the
          research and drafts a reply, so you stay in control.
        </Text>
      </div>

      <div className={styles.steps}>
        {steps.map((s, i) => (
          <div key={s.label} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <div className={styles.step}>
              <div className={styles.stepMark}>{s.icon}</div>
              <Text size={200} weight="semibold" className={styles.stepLabel}>
                {s.label}
              </Text>
              <Text size={100} className={styles.stepCaption}>
                {s.caption}
              </Text>
            </div>
            {i < steps.length - 1 ? <ArrowRight16Regular className={styles.chevron} /> : null}
          </div>
        ))}
      </div>

      {onRun ? (
        <div className={styles.lookupCard}>
          <Text size={300} weight="semibold">
            Look up a case number
          </Text>
          <div className={styles.lookupRow}>
            <Field className={styles.lookupField}>
              <Input
                value={custom}
                size="large"
                placeholder="e.g. 8809074412559830"
                contentBefore={<Search16Regular />}
                onChange={(_, d) => setCustom(d.value)}
                disabled={disabled}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && custom.trim().length > 0 && !disabled) {
                    onRun(custom.trim());
                  }
                }}
              />
            </Field>
            <Button
              appearance="primary"
              size="large"
              disabled={disabled || custom.trim().length === 0}
              onClick={() => onRun(custom.trim())}
            >
              Resolve
            </Button>
          </div>
          <Text size={200} className={styles.hint}>
            Tip: your open tickets are in the queue on the left.
          </Text>
        </div>
      ) : null}
    </div>
  );
}
