import {
  makeStyles,
  tokens,
  Button,
  Textarea,
  Field,
  Text,
} from "@fluentui/react-components";
import {
  ThumbLike20Filled,
  Edit20Regular,
  ThumbDislike20Regular,
  Dismiss16Regular,
} from "@fluentui/react-icons";
import { useState } from "react";
import type { ReviewDecision } from "../api/types";

const useStyles = makeStyles({
  bar: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  actions: {
    display: "flex",
    gap: tokens.spacingHorizontalM,
    flexWrap: "wrap",
  },
  panel: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    padding: tokens.spacingVerticalM,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground2,
  },
  panelActions: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
    justifyContent: "flex-end",
  },
  hint: {
    color: tokens.colorNeutralForeground3,
  },
});

type Mode = "none" | "edit" | "reject";

interface ReviewBarProps {
  currentReply: string;
  disabled?: boolean;
  onReview: (
    decision: ReviewDecision,
    opts?: { editedText?: string; reason?: string },
  ) => void;
}

export function ReviewBar({ currentReply, disabled, onReview }: ReviewBarProps) {
  const styles = useStyles();
  const [mode, setMode] = useState<Mode>("none");
  const [editedText, setEditedText] = useState(currentReply);
  const [reason, setReason] = useState("");

  return (
    <div className={styles.bar}>
      <Text size={200} className={styles.hint}>
        You are the human in the loop. Approve to send, edit the wording, or reject with a
        reason to have the agent revise.
      </Text>
      <div className={styles.actions}>
        <Button
          appearance="primary"
          icon={<ThumbLike20Filled />}
          disabled={disabled}
          onClick={() => onReview("approve")}
        >
          Approve &amp; send
        </Button>
        <Button
          appearance="secondary"
          icon={<Edit20Regular />}
          disabled={disabled}
          onClick={() => {
            setEditedText(currentReply);
            setMode(mode === "edit" ? "none" : "edit");
          }}
        >
          Edit reply
        </Button>
        <Button
          appearance="outline"
          icon={<ThumbDislike20Regular />}
          disabled={disabled}
          onClick={() => setMode(mode === "reject" ? "none" : "reject")}
        >
          Reject &amp; revise
        </Button>
      </div>

      {mode === "edit" ? (
        <div className={styles.panel}>
          <Field label="Edit the reply before sending">
            <Textarea
              value={editedText}
              rows={5}
              onChange={(_, d) => setEditedText(d.value)}
              disabled={disabled}
            />
          </Field>
          <div className={styles.panelActions}>
            <Button
              appearance="subtle"
              icon={<Dismiss16Regular />}
              onClick={() => setMode("none")}
            >
              Cancel
            </Button>
            <Button
              appearance="primary"
              disabled={disabled || editedText.trim().length === 0}
              onClick={() => onReview("edit", { editedText })}
            >
              Save &amp; send
            </Button>
          </div>
        </div>
      ) : null}

      {mode === "reject" ? (
        <div className={styles.panel}>
          <Field label="Why should the agent revise?" hint="This is fed back into the draft.">
            <Textarea
              value={reason}
              rows={3}
              placeholder="e.g. Add explicit rollback steps and reference the failover KB."
              onChange={(_, d) => setReason(d.value)}
              disabled={disabled}
            />
          </Field>
          <div className={styles.panelActions}>
            <Button
              appearance="subtle"
              icon={<Dismiss16Regular />}
              onClick={() => setMode("none")}
            >
              Cancel
            </Button>
            <Button
              appearance="primary"
              disabled={disabled || reason.trim().length === 0}
              onClick={() => onReview("reject", { reason })}
            >
              Send back for revision
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
