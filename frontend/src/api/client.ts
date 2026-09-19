import type {
  ChatContext,
  ChatResponse,
  ChatTurn,
  FeedbackResponse,
  HealthResponse,
  IncidentStep,
  KbStep,
  PrecedentsStep,
  ResolutionListResponse,
  ResolveResponse,
  ReviewDecision,
} from "./types";

const BASE_URL: string =
  (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, "") ??
  "http://localhost:8000";

export class ApiRequestError extends Error {
  code: string;
  status: number;

  constructor(message: string, code: string, status: number) {
    super(message);
    this.name = "ApiRequestError";
    this.code = code;
    this.status = status;
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let resp: Response;
  try {
    resp = await fetch(`${BASE_URL}${path}`, {
      ...init,
      headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
    });
  } catch {
    throw new ApiRequestError(
      "Could not reach the Precedent AI backend. Is it running?",
      "network_error",
      0,
    );
  }

  const text = await resp.text();
  const body = text ? JSON.parse(text) : {};

  if (!resp.ok) {
    const err = body?.error ?? {};
    throw new ApiRequestError(
      err.message ?? `Request failed (${resp.status})`,
      err.code ?? "error",
      resp.status,
    );
  }
  return body as T;
}

export const api = {
  health: () => request<HealthResponse>("/healthz"),

  listResolutions: () => request<ResolutionListResponse>("/resolve"),

  resolve: (caseNumber: string) =>
    request<ResolveResponse>("/resolve", {
      method: "POST",
      body: JSON.stringify({ caseNumber }),
    }),

  getResolution: (threadId: string) =>
    request<ResolveResponse>(`/resolve/${threadId}`),

  review: (
    threadId: string,
    decision: ReviewDecision,
    opts: { editedText?: string; reason?: string } = {},
  ) =>
    request<ResolveResponse>(`/resolve/${threadId}/review`, {
      method: "POST",
      body: JSON.stringify({
        decision,
        editedText: opts.editedText,
        reason: opts.reason,
      }),
    }),

  feedback: (experiment: string, runId: string, rating: number, note?: string) =>
    request<FeedbackResponse>("/feedback", {
      method: "POST",
      body: JSON.stringify({ experiment, runId, rating, note }),
    }),

  stepPrecedents: (caseNumber: string) =>
    request<PrecedentsStep>("/steps/precedents", {
      method: "POST",
      body: JSON.stringify({ caseNumber }),
    }),

  stepKb: (caseNumber: string) =>
    request<KbStep>("/steps/kb", {
      method: "POST",
      body: JSON.stringify({ caseNumber }),
    }),

  stepIncidents: (caseNumber: string) =>
    request<IncidentStep>("/steps/incidents", {
      method: "POST",
      body: JSON.stringify({ caseNumber }),
    }),

  chat: (
    caseNumber: string,
    question: string,
    history: ChatTurn[],
    context: ChatContext,
  ) =>
    request<ChatResponse>("/chat", {
      method: "POST",
      body: JSON.stringify({ caseNumber, question, history, context }),
    }),
};
