import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { CaseGallery } from "../components/CaseGallery";
import { DEMO_CASES } from "../data/demoCases";

function wrap(ui: React.ReactElement) {
  return render(<FluentProvider theme={webLightTheme}>{ui}</FluentProvider>);
}

describe("CaseGallery", () => {
  it("renders all demo cases with expected-flow labels", () => {
    wrap(<CaseGallery onRun={() => {}} />);
    for (const c of DEMO_CASES) {
      expect(screen.getByText(c.title)).toBeInTheDocument();
      expect(screen.getByText(c.expectedLabel)).toBeInTheDocument();
    }
  });
});
