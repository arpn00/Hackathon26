import { makeStyles, tokens, Text, Divider } from "@fluentui/react-components";
import { CheckmarkCircle16Regular, DocumentText16Regular } from "@fluentui/react-icons";
import type { Draft } from "../api/types";
import { Markdown } from "./Markdown";

const useStyles = makeStyles({
  panel: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  sectionHead: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
  },
  sectionLabel: {
    color: tokens.colorNeutralForeground3,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  plan: {
    display: "flex",
    flexDirection: "column",
    gap: 0,
    paddingLeft: 0,
    margin: 0,
    listStyle: "none",
  },
  step: {
    position: "relative",
    display: "flex",
    gap: tokens.spacingHorizontalM,
    alignItems: "flex-start",
    paddingBottom: tokens.spacingVerticalM,
    // vertical connector line behind the number badges
    "::before": {
      content: '""',
      position: "absolute",
      left: "13px",
      top: "26px",
      bottom: 0,
      width: "2px",
      backgroundColor: tokens.colorNeutralStroke2,
    },
  },
  stepLast: {
    paddingBottom: 0,
    "::before": { display: "none" },
  },
  stepNum: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "28px",
    width: "28px",
    height: "28px",
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground1,
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    flexShrink: 0,
    zIndex: 1,
  },
  stepText: {
    paddingTop: "3px",
    lineHeight: tokens.lineHeightBase400,
  },
  reply: {
    whiteSpace: "pre-wrap",
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalL}`,
    borderRadius: tokens.borderRadiusLarge,
    backgroundColor: tokens.colorNeutralBackground2,
    borderLeft: `3px solid ${tokens.colorBrandStroke1}`,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase400,
  },
  citations: {
    display: "flex",
    gap: tokens.spacingHorizontalXS,
    flexWrap: "wrap",
  },
  citation: {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXXS,
    paddingTop: tokens.spacingVerticalXXS,
    paddingBottom: tokens.spacingVerticalXXS,
    paddingLeft: tokens.spacingHorizontalS,
    paddingRight: tokens.spacingHorizontalS,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground2,
    fontFamily: tokens.fontFamilyMonospace,
    fontSize: tokens.fontSizeBase200,
  },
  citationIcon: {
    color: tokens.colorNeutralForeground3,
    fontSize: "14px",
  },
});

// Strip redundant leading "Step N:" / "N." / "N)" prefixes so we don't double-number.
function cleanStep(text: string): string {
  return text.replace(/^\s*(?:step\s*)?\d+\s*[:.)-]\s*/i, "").trim();
}

export function DraftPanel({
  draft,
  finalReply,
}: {
  draft: Draft | null;
  finalReply?: string | null;
}) {
  const styles = useStyles();
  if (!draft) return null;

  const replyText = finalReply ?? draft.reply;

  return (
    <div className={styles.panel}>
      {draft.plan.length > 0 ? (
        <div className={styles.section}>
          <div className={styles.sectionHead}>
            <CheckmarkCircle16Regular className={styles.citationIcon} />
            <Text size={200} weight="semibold" className={styles.sectionLabel}>
              Resolution plan
            </Text>
          </div>
          <ol className={styles.plan}>
            {draft.plan.map((step, i) => (
              <li
                className={`${styles.step} ${
                  i === draft.plan.length - 1 ? styles.stepLast : ""
                }`}
                key={i}
              >
                <span className={styles.stepNum}>{i + 1}</span>
                <Text size={300} className={styles.stepText}>
                  {cleanStep(step)}
                </Text>
              </li>
            ))}
          </ol>
        </div>
      ) : null}

      <Divider />

      <div className={styles.section}>
        <Text size={200} weight="semibold" className={styles.sectionLabel}>
          {finalReply ? "Final reply" : "Proposed reply"}
        </Text>
        <div className={styles.reply}>
          <Markdown content={replyText} />
        </div>
      </div>

      {draft.citations.length > 0 ? (
        <div className={styles.section}>
          <Text size={200} weight="semibold" className={styles.sectionLabel}>
            Grounded in {draft.citations.length}{" "}
            {draft.citations.length === 1 ? "source" : "sources"}
          </Text>
          <div className={styles.citations}>
            {draft.citations.map((c) => (
              <span key={c} className={styles.citation}>
                <DocumentText16Regular className={styles.citationIcon} />
                {c}
              </span>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
