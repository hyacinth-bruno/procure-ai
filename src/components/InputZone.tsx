import { RefObject } from "react";
import { motion } from "framer-motion";
import { PROMPTS } from "../constants";

interface InputZoneProps {
  q: string;
  foc: boolean;
  loading: boolean;
  taRef: RefObject<HTMLTextAreaElement | null>;
  onQueryChange: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  onSubmit: () => void;
  onChipClick: (prompt: string) => void;
}

export default function InputZone({ q, foc, loading, taRef, onQueryChange, onFocus, onBlur, onSubmit, onChipClick }: InputZoneProps) {
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); onSubmit(); }
  };

  return (
    <div className="shrink-0 bg-white border-b border-black/[0.06] px-6 pt-4 pb-3.5">
      <p className="font-syne text-[9px] font-bold tracking-[0.14em] uppercase text-mist mb-2">
        Procurement query
      </p>
      <div className="flex gap-2.5 items-end">
        <motion.div
          animate={{ scale: foc ? 1.005 : 1 }}
          transition={{ duration: .2 }}
          className={`flex-1 bg-surface2 border-[1.5px] rounded-xl overflow-hidden transition-all
            ${foc ? "border-gold shadow-[0_0_0_3px_rgba(212,168,67,0.1)]" : "border-black/10"}`}
        >
          <textarea
            ref={taRef}
            placeholder="Ask about suppliers, contracts, spend, or compliance…"
            value={q}
            onChange={e => onQueryChange(e.target.value)}
            onKeyDown={onKey}
            onFocus={onFocus}
            onBlur={onBlur}
            rows={1}
            className="w-full bg-transparent border-none outline-none px-4 py-3 font-dm text-sm text-slate-800 resize-none leading-snug min-h-12 max-h-[110px] block placeholder:text-slate-400"
          />
        </motion.div>

        <motion.button
          onClick={onSubmit}
          disabled={loading || !q.trim()}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: .97 }}
          className="h-12 px-5 bg-ink text-gold border-none rounded-xl font-syne text-xs font-bold tracking-[0.05em] cursor-pointer flex items-center gap-2 whitespace-nowrap shrink-0 transition-colors uppercase hover:bg-ink3 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <svg className="animate-spin" width="14" height="14" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"
                  strokeDasharray="28" strokeDashoffset="10" strokeLinecap="round"/>
              </svg>
              Analysing
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M8 2L14 8L8 14M14 8H2" stroke="currentColor" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Analyse
            </>
          )}
        </motion.button>
      </div>

      <div className="flex gap-1.5 flex-wrap mt-2.5">
        {PROMPTS.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0, transition: { delay: .05 * i, duration: .25 } }}
            whileTap={{ scale: .96 }}
            onClick={() => onChipClick(p)}
            className="bg-surface2 border border-black/10 rounded-full px-3 py-1 text-[11.5px] text-slate-500 cursor-pointer whitespace-nowrap transition-all hover:bg-gold/[0.08] hover:border-gold/35 hover:text-amber-800"
          >
            {p}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
