import { motion, AnimatePresence } from "framer-motion";
import { CATS } from "../constants";
import { ago, easeOut } from "../utils";
import type { HistoryEntry, CategoryId } from "../types";

interface SidebarProps {
  cat: CategoryId;
  onSetCat: (cat: CategoryId) => void;
  hist: HistoryEntry[];
  activeHistory: number | null;
  onLoadHistory: (entry: HistoryEntry) => void;
}

export default function Sidebar({ cat, onSetCat, hist, activeHistory, onLoadHistory }: SidebarProps) {
  const filtH = cat === "all" ? hist : hist.filter(h => h.result?.category === cat);

  return (
    <div className="sidebar">
      <div className="sb-lbl">Modules</div>
      {CATS.map(c => (
        <motion.button key={c.id} className={`cat-btn ${cat === c.id ? "on" : ""}`}
          onClick={() => onSetCat(c.id)} whileTap={{ scale: .97 }}>
          {cat === c.id && (
            <motion.div className="cat-bar" layoutId="cat-bar"
              transition={{ duration: .25, ease: easeOut }}/>
          )}
          <div className="cat-ico">{c.icon}</div>
          <span>{c.label}</span>
          <span className="cat-cnt">
            {c.id === "all" ? hist.length : hist.filter(h => h.result?.category === c.id).length}
          </span>
        </motion.button>
      ))}

      <div className="sb-sep"/>
      <div className="sb-lbl">History</div>
      <div className="h-wrap">
        <AnimatePresence>
          {filtH.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              style={{ padding: "10px 16px", fontSize: 11.5, color: "var(--mist)", opacity: .5 }}>
              No queries yet
            </motion.div>
          ) : filtH.map((e, i) => (
            <motion.div key={e.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0, transition: { delay: i * .04, duration: .25 } }}
              className={`h-item ${activeHistory === e.id ? "on" : ""}`}
              onClick={() => onLoadHistory(e)}>
              <div className="h-q">{e.query.length > 58 ? e.query.slice(0, 58) + "…" : e.query}</div>
              <div className="h-t">{ago(e.ts)}</div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
