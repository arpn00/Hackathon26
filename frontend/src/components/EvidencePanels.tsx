import {
  makeStyles,
  tokens,
  Text,
  Badge,
  Link,
} from "@fluentui/react-components";
import {
  History16Regular,
  BookOpen16Regular,
  Alert16Regular,
  Open16Regular,
  CheckmarkCircle16Filled,
  Flash16Filled,
} from "@fluentui/react-icons";

const useStyles = makeStyles({
  group: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  groupHead: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    color: tokens.colorNeutralForeground1,
  },
  headMark: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "28px",
    height: "28px",
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground1,
    flexShrink: 0,
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  card: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    paddingTop: tokens.spacingVerticalS,
    paddingBottom: tokens.spacingVerticalS,
    paddingLeft: tokens.spacingHorizontalM,
    paddingRight: tokens.spacingHorizontalM,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderLeftWidth: "3px",
    borderLeftColor: tokens.colorNeutralStroke1,
    transitionProperty: "border-color, box-shadow",
    transitionDuration: "180ms",
    ":hover": {
      borderTopColor: tokens.colorBrandStroke1,
      borderRightColor: tokens.colorBrandStroke1,
      borderBottomColor: tokens.colorBrandStroke1,
      borderLeftColor: tokens.colorBrandStroke1,
      boxShadow: tokens.shadow4,
    },
  },
  cardMatchHigh: {
    borderLeftColor: tokens.colorPaletteGreenBorder2,
  },
  cardMatchMed: {
    borderLeftColor: tokens.colorPaletteMarigoldBorder2,
  },
  cardHead: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    flexWrap: "wrap",
  },
  cardTitle: {
    color: tokens.colorNeutralForeground1,
  },
  spacer: { flexGrow: 1 },
  idChip: {
    fontFamily: tokens.fontFamilyMonospace,
    color: tokens.colorNeutralForeground3,
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.borderRadiusSmall,
    paddingLeft: "6px",
    paddingRight: "6px",
    paddingTop: "1px",
    paddingBottom: "1px",
  },
  fieldLabel: {
    color: tokens.colorNeutralForeground4,
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  },
  body: {
    color: tokens.colorNeutralForeground2,
    lineHeight: tokens.lineHeightBase200,
  },
  link: {
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
  },
  empty: {
    color: tokens.colorNeutralForeground4,
    fontStyle: "italic",
    paddingLeft: tokens.spacingHorizontalM,
  },
  incident: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    paddingTop: tokens.spacingVerticalM,
    paddingBottom: tokens.spacingVerticalM,
    paddingLeft: tokens.spacingHorizontalM,
    paddingRight: tokens.spacingHorizontalM,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorPaletteRedBackground1,
    border: `1px solid ${tokens.colorPaletteRedBorder1}`,
    borderLeftWidth: "3px",
    borderLeftColor: tokens.colorPaletteRedBorder2,
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
      <span className={styles.headMark}>{icon}</span>
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
        <div className={styles.list}>
          {precedents.map((p, idx) => {
            const caseNumber = s(p.caseNumber) ?? `precedent-${idx}`;
            const similarity = s(p.similarity);
            const matchClass =
              similarity === "high"
                ? styles.cardMatchHigh
                : similarity
                  ? styles.cardMatchMed
                  : "";
            return (
              <div className={`${styles.card} ${matchClass}`} key={caseNumber}>
                <div className={styles.cardHead}>
                  <Text size={200} weight="semibold" className={styles.cardTitle}>
                    {s(p.title) ?? `Case ${caseNumber}`}
                  </Text>
                  <span className={styles.spacer} />
                  {similarity ? (
                    <Badge
                      appearance="tint"
                      color={similarity === "high" ? "success" : "warning"}
                      size="small"
                      icon={
                        similarity === "high" ? <CheckmarkCircle16Filled /> : undefined
                      }
                    >
                      {similarity} match
                    </Badge>
                  ) : null}
                  <Text size={100} className={styles.idChip}>
                    #{caseNumber}
                  </Text>
                </div>
                {s(p.resolutionText) ? (
                  <>
                    <Text size={100} className={styles.fieldLabel}>
                      Resolution
                    </Text>
                    <Text size={200} className={styles.body}>
                      {s(p.resolutionText)}
                    </Text>
                  </>
                ) : null}
              </div>
            );
          })}
        </div>
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
        <div className={styles.list}>
          {kbArticles.map((k, idx) => {
            const kmId = s(k.kmId) ?? `km-${idx}`;
            const url = s(k.url);
            const title = s(k.title) ?? `KB ${kmId}`;
            return (
              <div className={styles.card} key={kmId}>
                <div className={styles.cardHead}>
                  {url ? (
                    <Link
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.link}
                    >
                      <Text size={200} weight="semibold">
                        {title}
                      </Text>
                      <Open16Regular />
                    </Link>
                  ) : (
                    <Text size={200} weight="semibold" className={styles.cardTitle}>
                      {title}
                    </Text>
                  )}
                  <span className={styles.spacer} />
                  <Text size={100} className={styles.idChip}>
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
          })}
        </div>
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
          <div className={styles.cardHead}>
            <Text size={200} weight="semibold" className={styles.cardTitle}>
              {s(incident.title) ?? "Incident"}
            </Text>
            <span className={styles.spacer} />
            {incident.isOutage ? (
              <Badge
                appearance="filled"
                color="danger"
                size="small"
                icon={<Flash16Filled />}
              >
                Active outage
              </Badge>
            ) : null}
            {s(incident.status) ? (
              <Badge appearance="outline" color="subtle" size="small">
                {s(incident.status)}
              </Badge>
            ) : null}
            <Text size={100} className={styles.idChip}>
              ICM #{s(incident.incidentId)}
            </Text>
          </div>
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
