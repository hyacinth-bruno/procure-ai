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
    <div className="bg-ink2 border-r border-white/5 flex flex-col overflow-hidden pt-4">

      <p className="font-syne text-[9px] font-bold tracking-[0.15em] uppercase text-mist opacity-50 px-4 pb-2">
        Modules
      </p>

      {CATS.map(c => {
        const active = cat === c.id;
        const count  = c.id === "all" ? hist.length : hist.filter(h => h.result?.category === c.id).length;
        return (
          <motion.button
            key={c.id}
            onClick={() => onSetCat(c.id)}
            whileTap={{ scale: .97 }}
            className={`flex items-center gap-2.5 py-[9px] px-4 cursor-pointer text-[13px] relative transition-colors border-none bg-transparent w-full text-left
              ${active ? "text-gold2 font-medium" : "text-mist2 font-normal hover:text-white"}`}
          >
            {active && (
              <motion.div
                layoutId="cat-bar"
                transition={{ duration: .25, ease: easeOut }}
                className="absolute left-0 top-1 bottom-1 w-0.5 bg-gold rounded-r-sm"
              />
            )}
            <div className={`w-[26px] h-[26px] rounded-[6px] flex items-center justify-center text-xs shrink-0 transition-colors
              ${active ? "bg-gold/15" : "bg-white/[0.04]"}`}>
              {c.icon}
            </div>
            <span>{c.label}</span>
            <span className="ml-auto font-syne text-[10px] font-semibold text-mist opacity-60 bg-white/[0.06] px-1.5 py-px rounded-full min-w-[20px] text-center">
              {count}
            </span>
          </motion.button>
        );
      })}

      <div className="h-px bg-white/[0.04] my-3"/>
      <p className="font-syne text-[9px] font-bold tracking-[0.15em] uppercase text-mist opacity-50 px-4 pb-2">
        History
      </p>

      <div className="flex-1 overflow-y-auto pb-4 scrollbar-sidebar">
        <AnimatePresence>
          {filtH.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="px-4 py-2.5 text-[11.5px] text-mist opacity-50"
            >
              No queries yet
            </motion.div>
          ) : filtH.map((e, i) => (
            <motion.div
              key={e.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0, transition: { delay: i * .04, duration: .25 } }}
              onClick={() => onLoadHistory(e)}
              className={`px-4 py-2 cursor-pointer border-l-2 transition-all
                ${activeHistory === e.id
                  ? "bg-gold/[0.06] border-gold"
                  : "border-transparent hover:bg-white/[0.03] hover:border-gold/30"}`}
            >
              <div className={`text-[11.5px] leading-snug ${activeHistory === e.id ? "text-gold2" : "text-mist2"}`}>
                {e.query.length > 58 ? e.query.slice(0, 58) + "…" : e.query}
              </div>
              <div className="text-[10px] text-mist opacity-50 mt-0.5">{ago(e.ts)}</div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
