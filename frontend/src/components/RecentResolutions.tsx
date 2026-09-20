import { makeStyles, tokens, Text, Badge, Button } from "@fluentui/react-components";
import {
  ArrowClockwise16Regular,
  Open16Regular,
  ChevronLeft16Regular,
  ChevronRight16Regular,
} from "@fluentui/react-icons";
import { useCallback, useEffect, useState } from "react";
import { api } from "../api/client";
import type { ResolutionSummary } from "../api/types";

const PAGE_SIZE = 5;

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
  pager: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: tokens.spacingHorizontalS,
    marginTop: tokens.spacingVerticalXS,
  },
  pagerInfo: {
    color: tokens.colorNeutralForeground3,
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
  const [page, setPage] = useState(0);

  const load = useCallback(async () => {
    try {
      const resp = await api.listResolutions();
      setItems(resp.items);
      setPage(0);
      setAvailable(true);
    } catch {
      setAvailable(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load, refreshKey]);

  if (!available) return null;

  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages - 1);
  const start = safePage * PAGE_SIZE;
  const pageItems = items.slice(start, start + PAGE_SIZE);

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
          {pageItems.map((it) => (
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
      {items.length > PAGE_SIZE ? (
        <div className={styles.pager}>
          <Text size={100} className={styles.pagerInfo}>
            {start + 1}–{start + pageItems.length} of {items.length}
          </Text>
          <Button
            appearance="subtle"
            size="small"
            icon={<ChevronLeft16Regular />}
            disabled={safePage === 0}
            onClick={() => setPage(safePage - 1)}
            aria-label="Previous page"
          />
          <Button
            appearance="subtle"
            size="small"
            icon={<ChevronRight16Regular />}
            disabled={safePage >= totalPages - 1}
            onClick={() => setPage(safePage + 1)}
            aria-label="Next page"
          />
        </div>
      ) : null}
    </div>
  );
}
