import {
  makeStyles,
  tokens,
  Text,
  Badge,
  Link,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
} from "@fluentui/react-components";
import {
  History16Regular,
  BookOpen16Regular,
  Alert16Regular,
} from "@fluentui/react-icons";

const useStyles = makeStyles({
  group: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
  },
  groupHead: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    color: tokens.colorNeutralForeground2,
  },
  item: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  itemHead: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    flexWrap: "wrap",
  },
  body: {
    color: tokens.colorNeutralForeground3,
  },
  mono: {
    fontFamily: tokens.fontFamilyMonospace,
    color: tokens.colorNeutralForeground4,
  },
  empty: {
    color: tokens.colorNeutralForeground4,
    fontStyle: "italic",
  },
  incident: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
    padding: tokens.spacingVerticalM,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorPaletteRedBackground1,
  },
});

function s(v: unknown): string | null {
  return typeof v === "string" && v.trim().length > 0 ? v : null;
}

function GroupHeader({
  icon,
  title,
  count,
}: {
  icon: JSX.Element;
  title: string;
  count: number;
}) {
  const styles = useStyles();
  return (
    <div className={styles.groupHead}>
      {icon}
      <Text weight="semibold" size={300}>
        {title}
      </Text>
      <Badge appearance="tint" color="informative" size="small">
        {count}
      </Badge>
    </div>
  );
}

export function PrecedentsPanel({
  precedents,
}: {
  precedents: Array<Record<string, unknown>>;
}) {
  const styles = useStyles();
  return (
    <div className={styles.group}>
      <GroupHeader
        icon={<History16Regular />}
        title="Precedent cases"
        count={precedents.length}
      />
      {precedents.length === 0 ? (
        <Text size={200} className={styles.empty}>
          No similar prior cases found.
        </Text>
      ) : (
        <Accordion multiple collapsible>
          {precedents.map((p, idx) => {
            const caseNumber = s(p.caseNumber) ?? `precedent-${idx}`;
            const similarity = s(p.similarity);
            return (
              <AccordionItem value={caseNumber} key={caseNumber}>
                <AccordionHeader>
                  <div className={styles.itemHead}>
                    <Text size={200} weight="semibold">
                      {s(p.title) ?? `Case ${caseNumber}`}
                    </Text>
                    {similarity ? (
                      <Badge
                        appearance="tint"
                        color={similarity === "high" ? "success" : "warning"}
                        size="small"
                      >
                        {similarity} match
                      </Badge>
                    ) : null}
                  </div>
                </AccordionHeader>
                <AccordionPanel>
                  <div className={styles.item}>
                    <Text size={100} className={styles.mono}>
                      #{caseNumber}
                    </Text>
                    {s(p.resolutionText) ? (
                      <Text size={200} className={styles.body}>
                        {s(p.resolutionText)}
                      </Text>
                    ) : null}
                  </div>
                </AccordionPanel>
              </AccordionItem>
            );
          })}
        </Accordion>
      )}
    </div>
  );
}

export function KbPanel({
  kbArticles,
}: {
  kbArticles: Array<Record<string, unknown>>;
}) {
  const styles = useStyles();
  return (
    <div className={styles.group}>
      <GroupHeader
        icon={<BookOpen16Regular />}
        title="Knowledge articles"
        count={kbArticles.length}
      />
      {kbArticles.length === 0 ? (
        <Text size={200} className={styles.empty}>
          No knowledge articles matched.
        </Text>
      ) : (
        kbArticles.map((k, idx) => {
          const kmId = s(k.kmId) ?? `km-${idx}`;
          const url = s(k.url);
          return (
            <div className={styles.item} key={kmId}>
              <div className={styles.itemHead}>
                {url ? (
                  <Link href={url} target="_blank" rel="noreferrer">
                    <Text size={200} weight="semibold">
                      {s(k.title) ?? `KB ${kmId}`}
                    </Text>
                  </Link>
                ) : (
                  <Text size={200} weight="semibold">
                    {s(k.title) ?? `KB ${kmId}`}
                  </Text>
                )}
                <Text size={100} className={styles.mono}>
                  KB #{kmId}
                </Text>
              </div>
              {s(k.snippet) ? (
                <Text size={200} className={styles.body}>
                  {s(k.snippet)}
                </Text>
              ) : null}
            </div>
          );
        })
      )}
    </div>
  );
}

export function IncidentPanel({
  incident,
}: {
  incident: Record<string, unknown> | null;
}) {
  const styles = useStyles();
  return (
    <div className={styles.group}>
      <GroupHeader
        icon={<Alert16Regular />}
        title="Related incident"
        count={incident ? 1 : 0}
      />
      {!incident ? (
        <Text size={200} className={styles.empty}>
          No related incident.
        </Text>
      ) : (
        <div className={styles.incident}>
          <div className={styles.itemHead}>
            <Text size={200} weight="semibold">
              {s(incident.title) ?? "Incident"}
            </Text>
            {incident.isOutage ? (
              <Badge appearance="filled" color="danger" size="small">
                Active outage
              </Badge>
            ) : null}
            {s(incident.status) ? (
              <Badge appearance="outline" color="subtle" size="small">
                {s(incident.status)}
              </Badge>
            ) : null}
          </div>
          <Text size={100} className={styles.mono}>
            ICM #{s(incident.incidentId)}
          </Text>
          {s(incident.summary) ? (
            <Text size={200} className={styles.body}>
              {s(incident.summary)}
            </Text>
          ) : null}
        </div>
      )}
    </div>
  );
}
