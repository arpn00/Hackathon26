import { makeStyles, tokens, Text, Badge, Avatar, Divider } from "@fluentui/react-components";
import { BrainCircuit24Filled } from "@fluentui/react-icons";

const useStyles = makeStyles({
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: tokens.spacingVerticalL,
    paddingBottom: tokens.spacingVerticalL,
    paddingLeft: tokens.spacingHorizontalXXL,
    paddingRight: tokens.spacingHorizontalXXL,
    backgroundColor: tokens.colorNeutralBackground1,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    boxShadow: tokens.shadow4,
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
    backgroundColor: "transparent",
    borderTopStyle: "none",
    borderRightStyle: "none",
    borderBottomStyle: "none",
    borderLeftStyle: "none",
    padding: 0,
    cursor: "pointer",
    textAlign: "left",
    ":hover": {
      opacity: 0.85,
    },
  },
  icon: {
    color: tokens.colorBrandForeground1,
    display: "flex",
  },
  titleGroup: {
    display: "flex",
    flexDirection: "column",
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalL,
  },
  meta: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  persona: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  personaText: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  role: {
    color: tokens.colorNeutralForeground3,
  },
  vDivider: {
    height: "28px",
  },
});

interface AppHeaderProps {
  mode?: string;
  onHome?: () => void;
}

export function AppHeader({ mode, onHome }: AppHeaderProps) {
  const styles = useStyles();
  return (
    <header className={styles.header}>
      <button type="button" className={styles.brand} onClick={onHome} aria-label="Go to home">
        <span className={styles.icon}>
          <BrainCircuit24Filled />
        </span>
        <div className={styles.titleGroup}>
          <Text size={500} weight="semibold">
            Precedent AI
          </Text>
          <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
            Support workspace · human-in-the-loop
          </Text>
        </div>
      </button>
      <div className={styles.right}>
        <div className={styles.meta}>
          <Badge appearance="tint" color="informative">
            Powered by ZebraAI
          </Badge>
          {mode ? (
            <Badge appearance="outline" color={mode === "live" ? "success" : "subtle"}>
              {mode === "live" ? "Live data" : "Synthetic data"}
            </Badge>
          ) : null}
        </div>
        <Divider vertical className={styles.vDivider} />
        <div className={styles.persona}>
          <div className={styles.personaText}>
            <Text size={200} weight="semibold">
              Alex Morgan
            </Text>
            <Text size={100} className={styles.role}>
              CSS Support Engineer
            </Text>
          </div>
          <Avatar
            name="Alex Morgan"
            color="colorful"
            badge={{ status: "available" }}
            aria-label="Signed in as Alex Morgan"
          />
        </div>
      </div>
    </header>
  );
}
