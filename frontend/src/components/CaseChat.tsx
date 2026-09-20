import {
  makeStyles,
  tokens,
  Text,
  Textarea,
  Button,
} from "@fluentui/react-components";
import {
  Send24Filled,
  Bot24Filled,
  Person24Filled,
  Sparkle16Regular,
} from "@fluentui/react-icons";
import { useEffect, useRef, useState } from "react";
import { api, ApiRequestError } from "../api/client";
import type { ChatContext, ChatTurn } from "../api/types";
import { Markdown } from "./Markdown";

const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  intro: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    color: tokens.colorNeutralForeground3,
  },
  introIcon: {
    display: "inline-flex",
    color: tokens.colorBrandForeground1,
  },
  thread: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
    maxHeight: "360px",
    overflowY: "auto",
    padding: tokens.spacingVerticalM,
    borderRadius: tokens.borderRadiusLarge,
    backgroundColor: tokens.colorNeutralBackground2,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  turn: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
    alignItems: "flex-start",
  },
  turnUser: {
    flexDirection: "row-reverse",
  },
  dot: {
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "30px",
    height: "30px",
    borderRadius: tokens.borderRadiusCircular,
  },
  dotAgent: {
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground1,
  },
  dotUser: {
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
  composer: {
    display: "flex",
    alignItems: "flex-end",
    gap: tokens.spacingHorizontalS,
  },
  input: {
    flexGrow: 1,
  },
  disabledNote: {
    color: tokens.colorNeutralForeground4,
    fontStyle: "italic",
  },
  error: {
    color: tokens.colorPaletteRedForeground1,
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
});

interface CaseChatProps {
  caseNumber: string;
  context: ChatContext;
  enabled: boolean;
}

// Suggested questions shown as chips, gated on which evidence the user has gathered.
function suggestionsFor(context: ChatContext): string[] {
  const out: string[] = [];
  if (context.precedents && context.precedents.length > 0) {
    out.push("Which precedent is the closest match, and why?");
    out.push("How were similar cases resolved?");
  }
  if (context.kbArticles && context.kbArticles.length > 0) {
    out.push("Which KB article applies here?");
  }
  if (context.incident) {
    out.push("Is this linked to a known incident?");
  }
  if (out.length > 0) {
    out.push("Summarize the evidence so far.");
  }
  return out;
}

export function CaseChat({ caseNumber, context, enabled }: CaseChatProps) {
  const styles = useStyles();
  const [turns, setTurns] = useState<ChatTurn[]>([]);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const threadRef = useRef<HTMLDivElement>(null);

  const suggestions = suggestionsFor(context);

  // Keep the latest message in view as the conversation grows.
  useEffect(() => {
    const el = threadRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [turns, sending]);

  const ask = async (question: string) => {
    const q = question.trim();
    if (!q || sending) return;
    const history = [...turns];
    setTurns((t) => [...t, { role: "user", content: q }]);
    setDraft("");
    setSending(true);
    setError(null);
    try {
      const res = await api.chat(caseNumber, q, history, context);
      setTurns((t) => [...t, { role: "assistant", content: res.reply }]);
    } catch (e) {
      setError(
        e instanceof ApiRequestError ? e.message : "Could not reach the assistant.",
      );
    } finally {
      setSending(false);
    }
  };

  const send = () => ask(draft);

  return (
    <div className={styles.wrapper}>
      <Text size={200} className={styles.intro}>
        <span className={styles.introIcon}>
          <Sparkle16Regular />
        </span>
        Ask questions grounded in the evidence you've gathered: precedents, knowledge
        articles, the related incident, and any draft.
      </Text>

      {turns.length > 0 || sending ? (
        <div className={styles.thread} ref={threadRef}>
          {turns.map((t, i) => {
            const isUser = t.role === "user";
            return (
              <div
                key={i}
                className={`${styles.turn} ${isUser ? styles.turnUser : ""}`}
              >
                <span
                  className={`${styles.dot} ${isUser ? styles.dotUser : styles.dotAgent}`}
                >
                  {isUser ? <Person24Filled /> : <Bot24Filled />}
                </span>
                <div className={`${styles.column} ${isUser ? styles.columnUser : ""}`}>
                  <Text size={100} className={styles.meta}>
                    {isUser ? "You" : "Pre-cedent AI"}
                  </Text>
                  <div
                    className={`${styles.bubble} ${
                      isUser ? styles.bubbleUser : styles.bubbleAgent
                    }`}
                  >
                    {isUser ? (
                      <Text size={200}>{t.content}</Text>
                    ) : (
                      <Markdown content={t.content} />
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {sending ? (
            <div className={styles.turn}>
              <span className={`${styles.dot} ${styles.dotAgent}`}>
                <Bot24Filled />
              </span>
              <div className={styles.column}>
                <Text size={100} className={styles.meta}>
                  Pre-cedent AI
                </Text>
                <div className={`${styles.bubble} ${styles.bubbleAgent}`}>
                  <span className={styles.typing} aria-label="Thinking">
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

      {error ? (
        <Text size={200} className={styles.error}>
          {error}
        </Text>
      ) : null}

      {enabled && suggestions.length > 0 ? (
        <div className={styles.chipsWrap}>
          <Text size={100} className={styles.chipsLabel}>
            <Sparkle16Regular />
            Suggested questions
          </Text>
          <div className={styles.chips}>
            {suggestions.map((q) => (
              <Button
                key={q}
                size="small"
                shape="circular"
                appearance="outline"
                className={styles.chip}
                disabled={sending}
                onClick={() => void ask(q)}
              >
                {q}
              </Button>
            ))}
          </div>
        </div>
      ) : null}

      {enabled ? (
        <div className={styles.composer}>
          <Textarea
            className={styles.input}
            resize="vertical"
            value={draft}
            placeholder="e.g. Which precedent is the closest match, and why?"
            onChange={(_, d) => setDraft(d.value)}
            disabled={sending}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void send();
              }
            }}
          />
          <Button
            appearance="primary"
            icon={<Send24Filled />}
            disabled={sending || draft.trim().length === 0}
            onClick={() => void send()}
          >
            Send
          </Button>
        </div>
      ) : (
        <Text size={200} className={styles.disabledNote}>
          Gather at least one source above to start chatting.
        </Text>
      )}
    </div>
  );
}
