import { useCallback, useState } from "react";
import { api, ApiRequestError } from "../api/client";
import type { ResolveResponse, ReviewDecision } from "../api/types";

type Phase = "idle" | "resolving" | "reviewing" | "completed" | "error";

export interface RunState {
  phase: Phase;
  run: ResolveResponse | null;
  error: string | null;
}

const INITIAL: RunState = { phase: "idle", run: null, error: null };

function phaseFor(run: ResolveResponse): Phase {
  return run.status === "completed" ? "completed" : "reviewing";
}

function messageFor(e: unknown, fallback: string): string {
  return e instanceof ApiRequestError ? e.message : fallback;
}

export function useResolveRun() {
  const [state, setState] = useState<RunState>(INITIAL);

  const reset = useCallback(() => setState(INITIAL), []);

  const start = useCallback(async (caseNumber: string) => {
    setState({ phase: "resolving", run: null, error: null });
    try {
      const run = await api.resolve(caseNumber.trim());
      setState({ phase: phaseFor(run), run, error: null });
    } catch (e) {
      setState({
        phase: "error",
        run: null,
        error: messageFor(e, "Unexpected error starting the run."),
      });
    }
  }, []);

  const open = useCallback(async (threadId: string) => {
    setState({ phase: "resolving", run: null, error: null });
    try {
      const run = await api.getResolution(threadId);
      setState({ phase: phaseFor(run), run, error: null });
    } catch (e) {
      setState({
        phase: "error",
        run: null,
        error: messageFor(e, "Unexpected error loading the run."),
      });
    }
  }, []);

  const review = useCallback(
    async (
      decision: ReviewDecision,
      opts: { editedText?: string; reason?: string } = {},
    ) => {
      const threadId = state.run?.threadId;
      if (!threadId) return;
      setState((prev) => (prev.run ? { ...prev, phase: "resolving" } : prev));
      try {
        const run = await api.review(threadId, decision, opts);
        setState({ phase: phaseFor(run), run, error: null });
      } catch (e) {
        setState((prev) => ({
          ...prev,
          phase: "error",
          error: messageFor(e, "Unexpected error during review."),
        }));
      }
    },
    [state.run?.threadId],
  );

  return { state, start, open, review, reset };
}
