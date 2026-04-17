export type Category = "supplier" | "contract" | "spend" | "compliance" | "general";
export type Badge = "recommended" | "caution" | "risk" | "info";
export type Confidence = "high" | "medium" | "low";
export type CategoryId = "all" | Category;

export interface Cat {
  id: CategoryId;
  label: string;
  icon: string;
}

export interface ResultItem {
  name: string;
  detail: string;
  badge: Badge;
}

export interface AIResult {
  category: Category;
  summary: string;
  items: ResultItem[];
  flags: string[];
  nextSteps: string[];
  confidence: Confidence;
}

export interface HistoryEntry {
  id: number;
  query: string;
  result: AIResult;
  ts: number;
}

export interface AppState {
  q: string;
  foc: boolean;
  loading: boolean;
  result: HistoryEntry | null;
  error: string | null;
  hist: HistoryEntry[];
  cat: CategoryId;
  activeHistory: number | null;
}

export type AppAction =
  | { type: "SET_Q";          payload: string }
  | { type: "SET_FOC";        payload: boolean }
  | { type: "SET_CAT";        payload: CategoryId }
  | { type: "LOAD_HISTORY";   payload: HistoryEntry }
  | { type: "SUBMIT_START" }
  | { type: "SUBMIT_ERROR";   payload: string }
  | { type: "SUBMIT_SUCCESS"; payload: HistoryEntry };
