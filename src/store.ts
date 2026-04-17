import type { AppState, AppAction } from "./types";

export const initialState: AppState = {
  q: "",
  foc: false,
  loading: false,
  result: null,
  error: null,
  hist: [],
  cat: "all",
  activeHistory: null,
};

export function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_Q":          return { ...state, q: action.payload };
    case "SET_FOC":        return { ...state, foc: action.payload };
    case "SET_CAT":        return { ...state, cat: action.payload };
    case "LOAD_HISTORY":   return { ...state, result: action.payload, activeHistory: action.payload.id, error: null };
    case "SUBMIT_START":   return { ...state, loading: true, error: null, result: null, activeHistory: null };
    case "SUBMIT_ERROR":   return { ...state, loading: false, error: action.payload };
    case "SUBMIT_SUCCESS": {
      const entry = action.payload;
      return { ...state, loading: false, q: "", result: entry, activeHistory: entry.id, hist: [entry, ...state.hist].slice(0, 20) };
    }
  }
}
