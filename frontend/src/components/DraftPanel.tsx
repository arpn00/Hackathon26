import { makeStyles, tokens, Text, Badge, Divider } from "@fluentui/react-components";
import type { Draft } from "../api/types";

const useStyles = makeStyles({
  panel: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  sectionLabel: {
    color: tokens.colorNeutralForeground3,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  plan: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
    paddingLeft: 0,
    margin: 0,
    listStyle: "none",
  },
  step: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
    alignItems: "flex-start",
  },
  stepNum: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "22px",
    height: "22px",
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground1,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    flexShrink: 0,
  },
  reply: {
    whiteSpace: "pre-wrap",
    padding: tokens.spacingVerticalM,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground2,
    borderLeft: `3px solid ${tokens.colorBrandStroke1}`,
    color: tokens.colorNeutralForeground1,
  },
  citations: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
    flexWrap: "wrap",
  },
});

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
        <div>
          <Text size={200} weight="semibold" className={styles.sectionLabel}>
            Resolution plan
          </Text>
          <ol className={styles.plan}>
            {draft.plan.map((step, i) => (
              <li className={styles.step} key={i}>
                <span className={styles.stepNum}>{i + 1}</span>
                <Text size={300}>{step}</Text>
              </li>
            ))}
          </ol>
        </div>
      ) : null}

      <Divider />

      <div>
        <Text size={200} weight="semibold" className={styles.sectionLabel}>
          {finalReply ? "Final reply" : "Proposed reply"}
        </Text>
        <div className={styles.reply}>
          <Text size={300}>{replyText}</Text>
        </div>
      </div>

      {draft.citations.length > 0 ? (
        <div>
          <Text size={200} weight="semibold" className={styles.sectionLabel}>
            Grounded in
          </Text>
          <div className={styles.citations}>
            {draft.citations.map((c) => (
              <Badge key={c} appearance="outline" color="brand">
                {c}
              </Badge>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
