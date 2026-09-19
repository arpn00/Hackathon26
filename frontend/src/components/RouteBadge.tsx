import { Badge } from "@fluentui/react-components";
import {
  CheckmarkCircle16Filled,
  Warning16Filled,
  ArrowRoutingFilled,
} from "@fluentui/react-icons";

type BadgeColor = "success" | "warning" | "danger" | "informative" | "subtle";

const ROUTE_MAP: Record<
  string,
  { label: string; color: BadgeColor; icon: JSX.Element }
> = {
  resolve: {
    label: "Resolve",
    color: "success",
    icon: <CheckmarkCircle16Filled />,
  },
  deflect: {
    label: "Deflect (active outage)",
    color: "warning",
    icon: <Warning16Filled />,
  },
  escalate: {
    label: "Escalate",
    color: "danger",
    icon: <ArrowRoutingFilled />,
  },
};

export function RouteBadge({ route }: { route: string | null }) {
  if (!route) return null;
  const cfg = ROUTE_MAP[route] ?? {
    label: route,
    color: "informative" as BadgeColor,
    icon: <ArrowRoutingFilled />,
  };
  return (
    <Badge appearance="filled" color={cfg.color} icon={cfg.icon}>
      {cfg.label}
    </Badge>
  );
}

export function ConfidenceBadge({ confidence }: { confidence: string | null }) {
  if (!confidence) return null;
  const color: BadgeColor =
    confidence === "high" ? "success" : confidence === "medium" ? "warning" : "danger";
  return (
    <Badge appearance="tint" color={color}>
      Confidence: {confidence}
    </Badge>
  );
}
