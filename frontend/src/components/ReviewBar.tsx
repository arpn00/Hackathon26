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
  Send20Filled,
  Bot24Filled,
  Person24Filled,
  Sparkle16Regular,
} from "@fluentui/react-icons";
import { useEffect, useRef, useState } from "react";
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
  reviseHead: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  reviseTitle: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
  },
  reviseTitleIcon: {
    display: "inline-flex",
    color: tokens.colorBrandForeground1,
  },
  reviseHint: {
    color: tokens.colorNeutralForeground3,
  },
  thread: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
    maxHeight: "320px",
    overflowY: "auto",
    paddingRight: "2px",
  },
  turn: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
    alignItems: "flex-start",
  },
  turnUser: {
    flexDirection: "row-reverse",
  },
  avatar: {
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "30px",
    height: "30px",
    borderRadius: tokens.borderRadiusCircular,
  },
  avatarAgent: {
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground1,
  },
  avatarUser: {
    backgroundColor: tokens.colorNeutralBackground4,
    color: tokens.colorNeutralForeground2,
  },
  column: {
    display: "flex",
    flexDirection: "column",
    gap: "3px",
    maxWidth: "82%",
  },
  columnUser: {
    alignItems: "flex-end",
  },
  meta: {
    color: tokens.colorNeutralForeground4,
    paddingLeft: "2px",
    paddingRight: "2px",
  },
  bubble: {
    paddingTop: tokens.spacingVerticalS,
    paddingBottom: tokens.spacingVerticalS,
    paddingLeft: tokens.spacingHorizontalM,
    paddingRight: tokens.spacingHorizontalM,
    borderRadius: tokens.borderRadiusLarge,
    whiteSpace: "pre-wrap",
  },
  bubbleAgent: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderTopLeftRadius: tokens.borderRadiusSmall,
  },
  bubbleUser: {
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorNeutralForeground1,
    borderTopRightRadius: tokens.borderRadiusSmall,
  },
  typing: {
    display: "inline-flex",
    gap: "4px",
    alignItems: "center",
  },
  typingDot: {
    width: "6px",
    height: "6px",
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: tokens.colorNeutralForeground4,
    animationName: {
      "0%, 80%, 100%": { opacity: 0.2, transform: "translateY(0)" },
      "40%": { opacity: 1, transform: "translateY(-3px)" },
    },
    animationDuration: "1.2s",
    animationIterationCount: "infinite",
    animationTimingFunction: "ease-in-out",
  },
  chipsWrap: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  chipsLabel: {
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    color: tokens.colorNeutralForeground3,
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
    gap: tokens.spacingHorizontalXS,
  },
  chip: {
    borderRadius: tokens.borderRadiusCircular,
  },
  composer: {
    display: "flex",
    alignItems: "flex-end",
    gap: tokens.spacingHorizontalS,
  },
  input: {
    flexGrow: 1,
  },
});

type Mode = "none" | "edit" | "revise";

type ReviseTurn = { role: "user" | "assistant"; content: string };

const REVISE_SUGGESTIONS = [
  "Make it more concise",
  "Sound warmer and more empathetic",
  "Add explicit rollback steps",
  "Explain the root cause in simpler terms",
];

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

  // Revise chat state
  const [turns, setTurns] = useState<ReviseTurn[]>([]);
  const [input, setInput] = useState("");
  const awaitingRef = useRef(false);
  const prevDisabled = useRef<boolean | undefined>(disabled);
  const threadRef = useRef<HTMLDivElement | null>(null);

  // When a revision request finishes (busy true -> false), acknowledge in the thread.
  useEffect(() => {
    if (awaitingRef.current && prevDisabled.current && !disabled) {
      awaitingRef.current = false;
      setTurns((t) => [
        ...t,
        {
          role: "assistant",
          content:
            "Done. I revised the reply above based on your feedback. Take a look, and tell me if anything else should change.",
        },
      ]);
    }
    prevDisabled.current = disabled;
  }, [disabled]);

  // Keep the newest message in view.
  useEffect(() => {
    if (threadRef.current) {
      threadRef.current.scrollTop = threadRef.current.scrollHeight;
    }
  }, [turns, disabled]);

  const sendRevision = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    setTurns((t) => [...t, { role: "user", content: trimmed }]);
    setInput("");
    awaitingRef.current = true;
    onReview("reject", { reason: trimmed });
  };

  return (
    <div className={styles.bar}>
      <div className={styles.actions}>
        <Button
          appearance="primary"
          icon={<ThumbLike20Filled />}
          disabled={disabled}
          onClick={() => onReview("approve")}
        >
          Approve resolution
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
          onClick={() => setMode(mode === "revise" ? "none" : "revise")}
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

      {mode === "revise" ? (
        <div className={styles.panel}>
          <div className={styles.reviseHead}>
            <span className={styles.reviseTitle}>
              <span className={styles.reviseTitleIcon}>
                <Sparkle16Regular />
              </span>
              <Text size={300} weight="semibold">
                Revise with the agent
              </Text>
            </span>
            <Text size={200} className={styles.reviseHint}>
              Describe what to change and the agent rewrites the reply above. You
              can iterate until it looks right.
            </Text>
          </div>

          {turns.length > 0 || (disabled && awaitingRef.current) ? (
            <div className={styles.thread} ref={threadRef}>
              {turns.map((t, i) => {
                const isUser = t.role === "user";
                return (
                  <div
                    key={i}
                    className={`${styles.turn} ${isUser ? styles.turnUser : ""}`}
                  >
                    <span
                      className={`${styles.avatar} ${
                        isUser ? styles.avatarUser : styles.avatarAgent
                      }`}
                    >
                      {isUser ? (
                        <Person24Filled fontSize={18} />
                      ) : (
                        <Bot24Filled fontSize={18} />
                      )}
                    </span>
                    <div
                      className={`${styles.column} ${
                        isUser ? styles.columnUser : ""
                      }`}
                    >
                      <Text size={100} className={styles.meta}>
                        {isUser ? "You" : "Pre-cedent AI"}
                      </Text>
                      <div
                        className={`${styles.bubble} ${
                          isUser ? styles.bubbleUser : styles.bubbleAgent
                        }`}
                      >
                        <Text size={200}>{t.content}</Text>
                      </div>
                    </div>
                  </div>
                );
              })}

              {disabled && awaitingRef.current ? (
                <div className={styles.turn}>
                  <span className={`${styles.avatar} ${styles.avatarAgent}`}>
                    <Bot24Filled fontSize={18} />
                  </span>
                  <div className={styles.column}>
                    <Text size={100} className={styles.meta}>
                      Pre-cedent AI
                    </Text>
                    <div className={`${styles.bubble} ${styles.bubbleAgent}`}>
                      <span className={styles.typing}>
                        <span className={styles.typingDot} />
                        <span className={styles.typingDot} />
                        <span className={styles.typingDot} />
                      </span>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}

          {turns.length === 0 ? (
            <div className={styles.chipsWrap}>
              <Text size={100} className={styles.chipsLabel}>
                <Sparkle16Regular fontSize={12} /> Quick revisions
              </Text>
              <div className={styles.chips}>
                {REVISE_SUGGESTIONS.map((sug) => (
                  <Button
                    key={sug}
                    size="small"
                    appearance="outline"
                    className={styles.chip}
                    disabled={disabled}
                    onClick={() => sendRevision(sug)}
                  >
                    {sug}
                  </Button>
                ))}
              </div>
            </div>
          ) : null}

          <div className={styles.composer}>
            <Textarea
              className={styles.input}
              value={input}
              rows={2}
              placeholder="e.g. Add explicit rollback steps and reference the failover KB."
              disabled={disabled}
              onChange={(_, d) => setInput(d.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendRevision(input);
                }
              }}
            />
            <Button
              appearance="primary"
              icon={<Send20Filled />}
              disabled={disabled || input.trim().length === 0}
              onClick={() => sendRevision(input)}
            >
              Send
            </Button>
          </div>

          <div className={styles.panelActions}>
            <Button
              appearance="subtle"
              icon={<Dismiss16Regular />}
              disabled={disabled}
              onClick={() => setMode("none")}
            >
              Close
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
