import {
  makeStyles,
  tokens,
  Card,
  Text,
  Badge,
} from "@fluentui/react-components";
import {
  Sparkle16Filled,
  Clock16Regular,
  Person16Regular,
} from "@fluentui/react-icons";
import { DEMO_CASES, type DemoCase } from "../data/demoCases";

const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  queueHead: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
  },
  sectionLabel: {
    color: tokens.colorNeutralForeground2,
  },
  countPill: {
    color: tokens.colorNeutralForeground3,
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  card: {
    display: "flex",
    flexDirection: "row",
    gap: tokens.spacingHorizontalM,
    cursor: "pointer",
    paddingLeft: 0,
    overflow: "hidden",
    transitionProperty: "transform, box-shadow",
    transitionDuration: tokens.durationNormal,
    ":hover": {
      transform: "translateY(-1px)",
      boxShadow: tokens.shadow16,
    },
  },
  cardActive: {
    boxShadow: tokens.shadow8,
    backgroundColor: tokens.colorNeutralBackground1Selected,
  },
  sevRail: {
    width: "4px",
    flexShrink: 0,
    alignSelf: "stretch",
  },
  sevA: { backgroundColor: tokens.colorPaletteRedBackground3 },
  sevB: { backgroundColor: tokens.colorPaletteMarigoldBackground3 },
  sevC: { backgroundColor: tokens.colorBrandBackground },
  cardBody: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
    paddingTop: tokens.spacingVerticalS,
    paddingBottom: tokens.spacingVerticalS,
    paddingRight: tokens.spacingHorizontalM,
    flexGrow: 1,
    minWidth: 0,
  },
  topRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    flexWrap: "wrap",
  },
  ticketId: {
    color: tokens.colorNeutralForeground2,
    fontFamily: tokens.fontFamilyMonospace,
    fontWeight: tokens.fontWeightSemibold,
  },
  spacer: {
    flexGrow: 1,
  },
  title: {
    lineHeight: tokens.lineHeightBase300,
  },
  metaRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
    color: tokens.colorNeutralForeground3,
    flexWrap: "wrap",
  },
  metaItem: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  bottomRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: tokens.spacingHorizontalS,
    marginTop: tokens.spacingVerticalXS,
    flexWrap: "wrap",
  },
  hint: {
    color: tokens.colorBrandForeground1,
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
});

const SEV_RAIL: Record<string, string> = {
  "Sev A": "sevA",
  "Sev B": "sevB",
  "Sev C": "sevC",
};

const SEV_COLOR: Record<string, "danger" | "warning" | "brand"> = {
  "Sev A": "danger",
  "Sev B": "warning",
  "Sev C": "brand",
};

interface CaseGalleryProps {
  onRun: (caseNumber: string) => void;
  activeCaseNumber?: string;
  disabled?: boolean;
}

export function CaseGallery({ onRun, activeCaseNumber, disabled }: CaseGalleryProps) {
  const styles = useStyles();

  return (
    <section className={styles.wrapper}>
      <div className={styles.queueHead}>
        <Text size={400} weight="semibold" className={styles.sectionLabel}>
          My queue
        </Text>
        <Text size={200} className={styles.countPill}>
          {DEMO_CASES.length} open · assigned to you
        </Text>
      </div>

      <div className={styles.list}>
        {DEMO_CASES.map((c: DemoCase) => {
          const active = c.caseNumber === activeCaseNumber;
          const railClass = styles[SEV_RAIL[c.severity] as "sevA" | "sevB" | "sevC"];
          return (
            <Card
              key={c.caseNumber}
              className={`${styles.card} ${active ? styles.cardActive : ""}`}
              onClick={() => !disabled && onRun(c.caseNumber)}
              aria-label={`Open ticket ${c.caseNumber}`}
            >
              <div className={`${styles.sevRail} ${railClass}`} />
              <div className={styles.cardBody}>
                <div className={styles.topRow}>
                  <Badge appearance="filled" color={SEV_COLOR[c.severity]} size="small">
                    {c.severity}
                  </Badge>
                  <Badge appearance="tint" color="informative" size="small">
                    {c.ticketStatus}
                  </Badge>
                  <span className={styles.spacer} />
                  <Text size={200} className={styles.ticketId}>
                    #{c.caseNumber}
                  </Text>
                </div>

                <Text weight="semibold" className={styles.title}>
                  {c.title}
                </Text>

                <div className={styles.metaRow}>
                  <span className={styles.metaItem}>
                    <Person16Regular />
                    <Text size={200}>{c.customer}</Text>
                  </span>
                  <span className={styles.metaItem}>
                    <Text size={200}>{c.product}</Text>
                  </span>
                </div>

                <div className={styles.metaRow}>
                  <span className={styles.metaItem}>
                    <Clock16Regular />
                    <Text size={200}>{c.sla}</Text>
                  </span>
                  <Text size={200}>{c.waiting}</Text>
                  <Text size={200}>· {c.channel}</Text>
                </div>

                <div className={styles.bottomRow}>
                  <span className={styles.hint}>
                    <Sparkle16Filled />
                    <Text size={100}>{c.expectedLabel}</Text>
                  </span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
