import {
  makeStyles,
  tokens,
  Text,
  Textarea,
  Button,
  Spinner,
} from "@fluentui/react-components";
import { Send24Filled, Bot24Filled, Person24Filled } from "@fluentui/react-icons";
import { useState } from "react";
import { api, ApiRequestError } from "../api/client";
import type { ChatContext, ChatTurn } from "../api/types";

const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  intro: {
    color: tokens.colorNeutralForeground3,
  },
  thread: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    maxHeight: "320px",
    overflowY: "auto",
    paddingRight: tokens.spacingHorizontalXS,
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
    width: "28px",
    height: "28px",
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
  bubble: {
    paddingTop: tokens.spacingVerticalS,
    paddingBottom: tokens.spacingVerticalS,
    paddingLeft: tokens.spacingHorizontalM,
    paddingRight: tokens.spacingHorizontalM,
    borderRadius: tokens.borderRadiusLarge,
    maxWidth: "80%",
    whiteSpace: "pre-wrap",
  },
  bubbleAgent: {
    backgroundColor: tokens.colorNeutralBackground3,
  },
  bubbleUser: {
    backgroundColor: tokens.colorBrandBackground2,
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

  const suggestions = suggestionsFor(context);

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
        Ask questions grounded in the evidence you've gathered — precedents, knowledge
        articles, the related incident, and any draft.
      </Text>

      {turns.length > 0 ? (
        <div className={styles.thread}>
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
                <div
                  className={`${styles.bubble} ${
                    isUser ? styles.bubbleUser : styles.bubbleAgent
                  }`}
                >
                  <Text size={200}>{t.content}</Text>
                </div>
              </div>
            );
          })}
          {sending ? <Spinner size="tiny" label="Thinking…" /> : null}
        </div>
      ) : null}

      {error ? (
        <Text size={200} className={styles.error}>
          {error}
        </Text>
      ) : null}

      {enabled && suggestions.length > 0 ? (
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
