import { makeStyles, tokens, Text, Badge } from "@fluentui/react-components";

const useStyles = makeStyles({
  panel: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  topRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    flexWrap: "wrap",
  },
  desc: {
    color: tokens.colorNeutralForeground2,
  },
  meta: {
    display: "flex",
    gap: tokens.spacingHorizontalL,
    flexWrap: "wrap",
    color: tokens.colorNeutralForeground3,
  },
  metaItem: {
    display: "flex",
    flexDirection: "column",
  },
  metaLabel: {
    color: tokens.colorNeutralForeground4,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
});

function str(v: unknown): string | null {
  return typeof v === "string" && v.trim().length > 0 ? v : null;
}

function productName(v: unknown): string | null {
  if (typeof v === "string") return str(v);
  if (v && typeof v === "object" && "name" in v) return str((v as Record<string, unknown>).name);
  return null;
}

export function SeedCasePanel({ seedCase }: { seedCase: Record<string, unknown> | null }) {
  const styles = useStyles();
  if (!seedCase) return null;

  const caseNumber = str(seedCase.caseNumber);
  const title = str(seedCase.title) ?? str(seedCase.subject) ?? "Support case";
  const description =
    str(seedCase.issueDescription) ??
    str(seedCase.symptomText) ??
    str(seedCase.description) ??
    str(seedCase.summary);
  const product = productName(seedCase.product) ?? productName(seedCase.productName);
  const severity = str(seedCase.currentSeverity) ?? str(seedCase.severity);
  const status = str(seedCase.status);

  return (
    <div className={styles.panel}>
      <div className={styles.topRow}>
        <Text weight="semibold" size={400}>
          {title}
        </Text>
        {severity ? (
          <Badge appearance="tint" color="danger">
            Sev {severity}
          </Badge>
        ) : null}
        {status ? (
          <Badge appearance="outline" color="subtle">
            {status}
          </Badge>
        ) : null}
      </div>
      {description ? (
        <Text size={300} className={styles.desc}>
          {description}
        </Text>
      ) : null}
      <div className={styles.meta}>
        {caseNumber ? (
          <div className={styles.metaItem}>
            <Text size={100} className={styles.metaLabel}>
              Case
            </Text>
            <Text size={200}>#{caseNumber}</Text>
          </div>
        ) : null}
        {product ? (
          <div className={styles.metaItem}>
            <Text size={100} className={styles.metaLabel}>
              Product
            </Text>
            <Text size={200}>{product}</Text>
          </div>
        ) : null}
      </div>
    </div>
  );
}
