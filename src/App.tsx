import { useReducer, useRef, useEffect } from "react";
import "./App.css";

import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import InputZone from "./components/InputZone";
import ResultsPanel from "./components/ResultsPanel";
import { initialState, reducer } from "./store";
import { SYSTEM } from "./constants";
import type { HistoryEntry, AIResult } from "./types";

export default function ProcureAI() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const taRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!taRef.current) return;
    taRef.current.style.height = "auto";
    taRef.current.style.height = taRef.current.scrollHeight + "px";
  }, [state.q]);

  async function submit() {
    if (!state.q.trim() || state.loading) return;
    const query = state.q.trim();
    dispatch({ type: "SUBMIT_START" });
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system: SYSTEM,
          messages: [{ role: "user", content: query }],
        }),
      });
      const data = await res.json();
      const txt: string = data.content?.[0]?.text ?? "";
      let parsed: AIResult | null = null;
      try { parsed = JSON.parse(txt) as AIResult; }
      catch { const m = txt.match(/\{[\s\S]*\}/); parsed = m ? JSON.parse(m[0]) as AIResult : null; }
      if (!parsed) throw new Error("Could not parse AI response — please retry.");
      const entry: HistoryEntry = { id: Date.now(), query, result: parsed, ts: Date.now() };
      dispatch({ type: "SUBMIT_SUCCESS", payload: entry });
    } catch (e) {
      dispatch({ type: "SUBMIT_ERROR", payload: (e as Error).message });
    }
  }

  return (
    <div className="grid grid-cols-[240px_1fr] grid-rows-[52px_1fr] h-screen overflow-hidden">
      <Topbar/>
      <Sidebar
        cat={state.cat}
        onSetCat={cat => dispatch({ type: "SET_CAT", payload: cat })}
        hist={state.hist}
        activeHistory={state.activeHistory}
        onLoadHistory={e => dispatch({ type: "LOAD_HISTORY", payload: e })}
      />
      <div className="flex flex-col bg-surface2 overflow-hidden">
        <InputZone
          q={state.q}
          foc={state.foc}
          loading={state.loading}
          taRef={taRef}
          onQueryChange={q => dispatch({ type: "SET_Q", payload: q })}
          onFocus={() => dispatch({ type: "SET_FOC", payload: true })}
          onBlur={() => dispatch({ type: "SET_FOC", payload: false })}
          onSubmit={submit}
          onChipClick={p => dispatch({ type: "SET_Q", payload: p })}
        />
        <ResultsPanel loading={state.loading} result={state.result} error={state.error}/>
      </div>
    </div>
  );
}
