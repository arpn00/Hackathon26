// Mirrors the backend camelCase API envelope (app/api_models.py).

export type ReviewDecision = "approve" | "edit" | "reject";
export type RunStatus = "awaiting_review" | "completed";

export interface Draft {
  plan: string[];
  reply: string;
  citations: string[];
}

export interface Interaction {
  actor: "agent" | "human";
  kind: string;
  detail: string;
  revision: number;
  ts: string;
}

export interface ResolveResponse {
  threadId: string;
  runId: string;
  status: RunStatus;
  route: string | null;
  confidence: string | null;
  outageDeflection: string | null;
  draft: Draft | null;
  finalReply: string | null;
  seedCase: Record<string, unknown> | null;
  precedents: Array<Record<string, unknown>>;
  kbArticles: Array<Record<string, unknown>>;
  incident: Record<string, unknown> | null;
  interactions: Interaction[];
}

export interface ResolutionSummary {
  threadId: string;
  caseNumber: string | null;
  status: string;
  route: string | null;
  confidence: string | null;
  updatedAt: string | null;
}

export interface ResolutionListResponse {
  items: ResolutionSummary[];
}

export interface FeedbackResponse {
  status: string;
  detail: Record<string, unknown> | null;
}

export interface PrecedentsStep {
  seedCase: Record<string, unknown> | null;
  precedents: Array<Record<string, unknown>>;
}

export interface KbStep {
  kbArticles: Array<Record<string, unknown>>;
}

export interface IncidentStep {
  incident: Record<string, unknown> | null;
}

export interface ChatTurn {
  role: "user" | "assistant";
  content: string;
}

export interface ChatContext {
  seedCase?: Record<string, unknown> | null;
  precedents?: Array<Record<string, unknown>>;
  kbArticles?: Array<Record<string, unknown>>;
  incident?: Record<string, unknown> | null;
  draft?: Record<string, unknown> | null;
}

export interface ChatResponse {
  reply: string;
}


export interface HealthResponse {
  status: string;
  mode: string;
}

export interface ApiError {
  code: string;
  message: string;
}
