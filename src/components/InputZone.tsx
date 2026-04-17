import { RefObject } from "react";
import { motion } from "framer-motion";
import { PROMPTS } from "../constants";

interface InputZoneProps {
  q: string;
  foc: boolean;
  loading: boolean;
  taRef: RefObject<HTMLTextAreaElement>;
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
    <div className="iz">
      <div className="iz-eye">Procurement query</div>
      <div className="iz-row">
        <motion.div className={`ta-shell ${foc ? "foc" : ""}`}
          animate={{ scale: foc ? 1.005 : 1 }} transition={{ duration: .2 }}>
          <textarea ref={taRef} className="ta"
            placeholder="Ask about suppliers, contracts, spend, or compliance…"
            value={q} onChange={e => onQueryChange(e.target.value)}
            onKeyDown={onKey} onFocus={onFocus} onBlur={onBlur} rows={1}/>
        </motion.div>
        <motion.button className="go-btn" onClick={onSubmit}
          disabled={loading || !q.trim()} whileHover={{ scale: 1.02 }} whileTap={{ scale: .97 }}>
          {loading ? (
            <>
              <svg className="spin" width="14" height="14" viewBox="0 0 16 16" fill="none">
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
      <div className="chips">
        {PROMPTS.map((p, i) => (
          <motion.div key={i} className="chip"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0, transition: { delay: .05 * i, duration: .25 } }}
            whileTap={{ scale: .96 }}
            onClick={() => onChipClick(p)}>
            {p}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
