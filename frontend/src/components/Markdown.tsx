import { makeStyles, tokens, Text, Link } from "@fluentui/react-components";
import { Fragment, type ReactNode } from "react";

// Minimal, dependency-free markdown renderer for assistant replies.
// Supports headings, bold, inline code, links, and bullet/numbered lists.

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  heading: {
    color: tokens.colorNeutralForeground1,
  },
  paragraph: {
    color: tokens.colorNeutralForeground1,
    whiteSpace: "pre-wrap",
  },
  list: {
    marginTop: 0,
    marginBottom: 0,
    paddingLeft: tokens.spacingHorizontalL,
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  code: {
    fontFamily: tokens.fontFamilyMonospace,
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.borderRadiusSmall,
    paddingLeft: "3px",
    paddingRight: "3px",
  },
});

// Renders inline **bold**, `code`, and [text](url) links within a line of text.
function renderInline(text: string, codeClass: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /\*\*(.+?)\*\*|`(.+?)`|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) {
      nodes.push(<Fragment key={key++}>{text.slice(last, match.index)}</Fragment>);
    }
    if (match[1] !== undefined) {
      nodes.push(<strong key={key++}>{match[1]}</strong>);
    } else if (match[2] !== undefined) {
      nodes.push(
        <code key={key++} className={codeClass}>
          {match[2]}
        </code>,
      );
    } else if (match[3] !== undefined && match[4] !== undefined) {
      const href = match[4].trim();
      // Only allow safe schemes; otherwise render the link text as plain text.
      if (/^(https?:\/\/|mailto:)/i.test(href)) {
        nodes.push(
          <Link key={key++} href={href} target="_blank" rel="noreferrer">
            {match[3]}
          </Link>,
        );
      } else {
        nodes.push(<Fragment key={key++}>{match[3]}</Fragment>);
      }
    }
    last = pattern.lastIndex;
  }
  if (last < text.length) {
    nodes.push(<Fragment key={key++}>{text.slice(last)}</Fragment>);
  }
  return nodes;
}

export function Markdown({ content }: { content: string }) {
  const styles = useStyles();

  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const blocks: ReactNode[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;
  let key = 0;

  const flushList = () => {
    if (!list) return;
    const ListTag = list.ordered ? "ol" : "ul";
    const items = list.items;
    blocks.push(
      <ListTag key={key++} className={styles.list}>
        {items.map((it, i) => (
          <li key={i}>
            <Text size={200}>{renderInline(it, styles.code)}</Text>
          </li>
        ))}
      </ListTag>,
    );
    list = null;
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (line.trim() === "") {
      flushList();
      continue;
    }
    const heading = /^(#{1,6})\s+(.*)$/.exec(line);
    if (heading) {
      flushList();
      const level = Math.min(heading[1].length, 4);
      const size = level <= 2 ? 400 : 300;
      blocks.push(
        <Text key={key++} size={size} weight="semibold" className={styles.heading}>
          {renderInline(heading[2], styles.code)}
        </Text>,
      );
      continue;
    }
    const bullet = /^[-*]\s+(.*)$/.exec(line);
    if (bullet) {
      if (!list || list.ordered) {
        flushList();
        list = { ordered: false, items: [] };
      }
      list.items.push(bullet[1]);
      continue;
    }
    const ordered = /^\d+[.)]\s+(.*)$/.exec(line);
    if (ordered) {
      if (!list || !list.ordered) {
        flushList();
        list = { ordered: true, items: [] };
      }
      list.items.push(ordered[1]);
      continue;
    }
    flushList();
    blocks.push(
      <Text key={key++} size={200} className={styles.paragraph}>
        {renderInline(line, styles.code)}
      </Text>,
    );
  }
  flushList();

  return <div className={styles.root}>{blocks}</div>;
}
