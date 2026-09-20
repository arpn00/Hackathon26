import {
  makeStyles,
  tokens,
  Button,
  Text,
  Input,
} from "@fluentui/react-components";
import {
  Star20Filled,
  Star20Regular,
  CheckmarkCircle16Filled,
} from "@fluentui/react-icons";
import { useState } from "react";
import { api } from "../api/client";

const useStyles = makeStyles({
  bar: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
    flexWrap: "wrap",
  },
  stars: {
    display: "flex",
    gap: "2px",
  },
  star: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
    color: tokens.colorPaletteMarigoldForeground1,
    display: "flex",
  },
  note: {
    minWidth: "220px",
    flexGrow: 1,
    maxWidth: "360px",
  },
  done: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    color: tokens.colorPaletteGreenForeground1,
  },
  label: {
    color: tokens.colorNeutralForeground3,
  },
});

interface FeedbackBarProps {
  runId: string;
  experiment?: string;
}

export function FeedbackBar({ runId, experiment = "case_km" }: FeedbackBarProps) {
  const styles = useStyles();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [busy, setBusy] = useState(false);

  if (submitted) {
    return (
      <div className={styles.done}>
        <CheckmarkCircle16Filled />
        <Text size={200}>Thanks, your feedback was recorded for the flywheel.</Text>
      </div>
    );
  }

  const submit = async () => {
    if (rating === 0) return;
    setBusy(true);
    try {
      await api.feedback(experiment, runId, rating, note.trim() || undefined);
      setSubmitted(true);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={styles.bar}>
      <Text size={200} weight="semibold" className={styles.label}>
        Rate this resolution
      </Text>
      <div className={styles.row}>
        <div className={styles.stars} role="radiogroup" aria-label="Rating">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              className={styles.star}
              aria-label={`${n} star${n > 1 ? "s" : ""}`}
              aria-pressed={rating === n}
              onMouseEnter={() => setHover(n)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(n)}
            >
              {(hover || rating) >= n ? <Star20Filled /> : <Star20Regular />}
            </button>
          ))}
        </div>
        <Input
          className={styles.note}
          value={note}
          placeholder="Optional note"
          onChange={(_, d) => setNote(d.value)}
        />
        <Button
          appearance="primary"
          size="small"
          disabled={rating === 0 || busy}
          onClick={submit}
        >
          Submit feedback
        </Button>
      </div>
    </div>
  );
}
