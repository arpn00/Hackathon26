import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { InteractionTimeline } from "../components/InteractionTimeline";
import type { Interaction } from "../api/types";

function wrap(ui: React.ReactElement) {
  return render(<FluentProvider theme={webLightTheme}>{ui}</FluentProvider>);
}

const INTERACTIONS: Interaction[] = [
  { actor: "agent", kind: "retrieve", detail: "Reviewed 3 precedents", revision: 0, ts: "2025-09-20T10:00:00Z" },
  { actor: "agent", kind: "route", detail: "Routed → resolve (confidence: high)", revision: 0, ts: "2025-09-20T10:00:01Z" },
  { actor: "agent", kind: "draft", detail: "Drafted resolution v1", revision: 1, ts: "2025-09-20T10:00:02Z" },
  { actor: "human", kind: "reject", detail: "Reviewer rejected the draft: add rollback", revision: 0, ts: "2025-09-20T10:01:00Z" },
];

describe("InteractionTimeline", () => {
  it("renders ordered agent and human turns", () => {
    wrap(<InteractionTimeline interactions={INTERACTIONS} />);
    expect(screen.getByText("Routed → resolve (confidence: high)")).toBeInTheDocument();
    expect(screen.getByText("Drafted resolution v1")).toBeInTheDocument();
    expect(screen.getByText(/Reviewer rejected the draft/)).toBeInTheDocument();
    // Human turn labelled distinctly from agent turns.
    expect(screen.getByText("Reviewer")).toBeInTheDocument();
    expect(screen.getAllByText("Agent").length).toBeGreaterThanOrEqual(3);
  });

  it("renders nothing when empty", () => {
    const { container } = wrap(<InteractionTimeline interactions={[]} />);
    expect(container.firstChild?.firstChild).toBeNull();
  });
});
