import { makeStyles, tokens, Text, Badge } from "@fluentui/react-components";
import {
  Bot24Filled,
  Person24Filled,
  Search16Regular,
  ArrowRoutingRegular,
  DocumentEdit16Regular,
  CheckmarkCircle16Regular,
  ThumbLike16Regular,
  ThumbDislike16Regular,
  Edit16Regular,
} from "@fluentui/react-icons";
import type { Interaction } from "../api/types";

const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
  },
  row: {
    display: "flex",
    gap: tokens.spacingHorizontalM,
    position: "relative",
  },
  railCol: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  dot: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "32px",
    height: "32px",
    borderRadius: tokens.borderRadiusCircular,
    flexShrink: 0,
    zIndex: 1,
  },
  agentDot: {
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground1,
  },
  humanDot: {
    backgroundColor: tokens.colorPaletteLavenderBackground2,
    color: tokens.colorNeutralForeground1,
  },
  line: {
    flexGrow: 1,
    width: "2px",
    backgroundColor: tokens.colorNeutralStroke2,
    minHeight: "8px",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    paddingBottom: tokens.spacingVerticalM,
    gap: "2px",
  },
  head: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  detail: {
    color: tokens.colorNeutralForeground2,
  },
  ts: {
    color: tokens.colorNeutralForeground4,
  },
});

const KIND_ICON: Record<string, JSX.Element> = {
  retrieve: <Search16Regular />,
  route: <ArrowRoutingRegular />,
  draft: <DocumentEdit16Regular />,
  selfcheck: <CheckmarkCircle16Regular />,
  approve: <ThumbLike16Regular />,
  reject: <ThumbDislike16Regular />,
  edit: <Edit16Regular />,
};

function label(i: Interaction): string {
  if (i.actor === "human") return "Reviewer";
  return "Agent";
}

function formatTs(ts: string): string {
  try {
    return new Date(ts).toLocaleTimeString();
  } catch {
    return "";
  }
}

export function InteractionTimeline({ interactions }: { interactions: Interaction[] }) {
  const styles = useStyles();
  if (interactions.length === 0) return null;

  return (
    <div className={styles.wrapper}>
      {interactions.map((i, idx) => {
        const isHuman = i.actor === "human";
        const isLast = idx === interactions.length - 1;
        return (
          <div className={styles.row} key={`${i.kind}-${i.ts}-${idx}`}>
            <div className={styles.railCol}>
              <div className={`${styles.dot} ${isHuman ? styles.humanDot : styles.agentDot}`}>
                {isHuman ? <Person24Filled /> : <Bot24Filled />}
              </div>
              {!isLast ? <div className={styles.line} /> : null}
            </div>
            <div className={styles.content}>
              <div className={styles.head}>
                <Text weight="semibold" size={200}>
                  {label(i)}
                </Text>
                <Badge
                  appearance="tint"
                  color={isHuman ? "important" : "brand"}
                  icon={KIND_ICON[i.kind]}
                  size="small"
                >
                  {i.kind}
                </Badge>
                <Text size={100} className={styles.ts}>
                  {formatTs(i.ts)}
                </Text>
              </div>
              <Text size={200} className={styles.detail}>
                {i.detail}
              </Text>
            </div>
          </div>
        );
      })}
    </div>
  );
}
