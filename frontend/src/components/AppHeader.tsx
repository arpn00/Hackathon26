import { makeStyles, tokens, Text, Avatar } from "@fluentui/react-components";
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
});

interface AppHeaderProps {
  mode?: string;
  onHome?: () => void;
}

export function AppHeader({ onHome }: AppHeaderProps) {
  const styles = useStyles();
  return (
    <header className={styles.header}>
      <button type="button" className={styles.brand} onClick={onHome} aria-label="Go to home">
        <span className={styles.icon}>
          <BrainCircuit24Filled />
        </span>
        <div className={styles.titleGroup}>
          <Text size={500} weight="semibold">
            Pre-cedent AI
          </Text>
          <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
            Intelligent support case assistant
          </Text>
        </div>
      </button>
      <div className={styles.right}>
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
