import { makeStyles, tokens, Text, Badge, Button } from "@fluentui/react-components";
import { ArrowClockwise16Regular, Open16Regular } from "@fluentui/react-icons";
import { useCallback, useEffect, useState } from "react";
import { api } from "../api/client";
import type { ResolutionSummary } from "../api/types";

const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  head: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
  },
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: tokens.spacingHorizontalS,
    padding: tokens.spacingVerticalS,
    borderRadius: tokens.borderRadiusMedium,
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  rowMain: {
    display: "flex",
    flexDirection: "column",
  },
  mono: {
    fontFamily: tokens.fontFamilyMonospace,
    color: tokens.colorNeutralForeground3,
  },
  empty: {
    color: tokens.colorNeutralForeground4,
    fontStyle: "italic",
  },
});

interface RecentResolutionsProps {
  refreshKey: number;
  onOpen: (threadId: string) => void;
}

export function RecentResolutions({ refreshKey, onOpen }: RecentResolutionsProps) {
  const styles = useStyles();
  const [items, setItems] = useState<ResolutionSummary[]>([]);
  const [available, setAvailable] = useState(true);

  const load = useCallback(async () => {
    try {
      const resp = await api.listResolutions();
      setItems(resp.items);
      setAvailable(true);
    } catch {
      setAvailable(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load, refreshKey]);

  if (!available) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        <Text size={300} weight="semibold">
          Recent resolutions
        </Text>
        <Button
          appearance="subtle"
          size="small"
          icon={<ArrowClockwise16Regular />}
          onClick={() => void load()}
          aria-label="Refresh"
        />
      </div>
      {items.length === 0 ? (
        <Text size={200} className={styles.empty}>
          No runs yet.
        </Text>
      ) : (
        <div className={styles.list}>
          {items.map((it) => (
            <div className={styles.row} key={it.threadId}>
              <div className={styles.rowMain}>
                <Text size={200} weight="semibold">
                  {it.caseNumber ? `#${it.caseNumber}` : it.threadId.slice(0, 8)}
                </Text>
                <Text size={100} className={styles.mono}>
                  {it.updatedAt ? new Date(it.updatedAt).toLocaleString() : ""}
                </Text>
              </div>
              <Badge
                appearance="tint"
                color={it.status === "completed" ? "success" : "warning"}
                size="small"
              >
                {it.status === "completed" ? "Completed" : "Awaiting review"}
              </Badge>
              <Button
                appearance="subtle"
                size="small"
                icon={<Open16Regular />}
                onClick={() => onOpen(it.threadId)}
                aria-label={`Open ${it.threadId}`}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
