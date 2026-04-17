import { motion, AnimatePresence } from "framer-motion";
import { easeOut, fadeUp, card, badgeCls, tagCls, confidenceCls, catIconCls } from "../utils";
import type { HistoryEntry, Category } from "../types";

interface ResultsPanelProps {
  loading: boolean;
  result: HistoryEntry | null;
  error: string | null;
}

const CAT_ICO: Record<Category, string> = {
  supplier: "⬡", contract: "▤", spend: "◎", compliance: "◈", general: "◈",
};
const CAT_LBL: Record<Category, string> = {
  supplier: "Supplier options", contract: "Clause analysis",
  spend: "Spend breakdown", compliance: "Key findings", general: "Key findings",
};

export default function ResultsPanel({ loading, result, error }: ResultsPanelProps) {
  const r = result?.result;

  return (
    <div className="flex-1 overflow-y-auto p-6 scrollbar-results">
      <AnimatePresence mode="wait">

        {!loading && !result && !error && (
          <motion.div key="empty" variants={fadeUp} initial="hidden" animate="visible" exit="exit"
            className="h-full flex flex-col items-center justify-center gap-3 text-center px-10">
            <div className="font-serif text-[56px] text-slate-300 leading-none mb-2 italic">◈</div>
            <div className="font-serif text-2xl text-slate-500 italic">AI Procurement Intelligence</div>
            <div className="text-[13px] max-w-[340px] leading-relaxed text-slate-400">
              Query suppliers, analyse contracts, review spend, or check compliance — structured answers powered by Claude AI.
            </div>
          </motion.div>
        )}

        {loading && (
          <motion.div key="ld" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="bg-white border border-black/[0.06] rounded-2xl p-5 flex items-center gap-4">
            <div className="flex gap-1.5">
              <div className="ld-d w-[7px] h-[7px] rounded-full bg-gold"/>
              <div className="ld-d w-[7px] h-[7px] rounded-full bg-gold"/>
              <div className="ld-d w-[7px] h-[7px] rounded-full bg-gold"/>
            </div>
            <span className="text-[13.5px] text-slate-500">Analysing your procurement query…</span>
          </motion.div>
        )}

        {error && !loading && (
          <motion.div key="err" initial={{ opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-red-50 border border-red-200 rounded-2xl p-5 flex gap-3 text-red-600 text-[13.5px] leading-relaxed">
            <span className="text-base">⚠</span><span>{error}</span>
          </motion.div>
        )}

        {result && !loading && r && (
          <motion.div key={result.id} variants={fadeUp} initial="hidden" animate="visible" exit="exit">

            {/* Query header */}
            <div className="flex items-start justify-between mb-[18px] gap-4">
              <div className="font-serif text-[22px] text-slate-900 leading-snug flex-1 italic">
                "{result.query}"
              </div>
              <div className="flex gap-1.5 shrink-0 items-start mt-1">
                <span className={`font-syne text-[9px] font-bold tracking-[0.1em] uppercase px-2.5 py-[3px] rounded-full border ${tagCls(r.category)}`}>
                  {r.category}
                </span>
                <span className={`font-syne text-[9px] font-bold tracking-[0.1em] uppercase px-2.5 py-[3px] rounded-full border ${confidenceCls(r.confidence)}`}>
                  {r.confidence} confidence
                </span>
              </div>
            </div>

            {/* Summary */}
            {r.summary && (
              <motion.div className="bg-white border border-black/[0.06] rounded-2xl mb-3 overflow-hidden" variants={card(0)} initial="hidden" animate="visible">
                <div className="flex items-center gap-2.5 px-[18px] py-3 border-b border-black/[0.06] bg-[#fafbfc]">
                  <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-[13px] shrink-0">📋</div>
                  <span className="font-syne text-[10px] font-bold tracking-[0.12em] uppercase text-slate-500">Executive summary</span>
                </div>
                <div className="px-[18px] py-4">
                  <p className="text-sm leading-[1.75] text-slate-700">{r.summary}</p>
                </div>
              </motion.div>
            )}

            {/* Items */}
            {r.items?.length > 0 && (
              <motion.div className="bg-white border border-black/[0.06] rounded-2xl mb-3 overflow-hidden" variants={card(1)} initial="hidden" animate="visible">
                <div className="flex items-center gap-2.5 px-[18px] py-3 border-b border-black/[0.06] bg-[#fafbfc]">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-[13px] shrink-0 ${catIconCls(r.category)}`}>
                    {CAT_ICO[r.category]}
                  </div>
                  <span className="font-syne text-[10px] font-bold tracking-[0.12em] uppercase text-slate-500">
                    {CAT_LBL[r.category]}
                  </span>
                </div>
                <div className="px-[18px] py-4 flex flex-col gap-2">
                  {r.items.map((item, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0, transition: { delay: i * .06 + .2, duration: .3, ease: easeOut } }}
                      whileHover={{ x: 2, transition: { duration: .15 } }}
                      className="flex gap-3 items-start p-3 px-3.5 rounded-xl bg-slate-50 border border-slate-100 transition-colors hover:border-gold/30"
                    >
                      <div className="w-[22px] h-[22px] rounded-full bg-ink text-gold font-syne text-[9px] font-bold flex items-center justify-center shrink-0 mt-px">
                        {i + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[13px] font-medium text-slate-900 mb-0.5">{item.name}</div>
                        <div className="text-xs text-slate-500 leading-relaxed">{item.detail}</div>
                      </div>
                      {item.badge && (
                        <span className={`font-syne text-[9px] font-bold tracking-[0.07em] uppercase px-2.5 py-[3px] rounded-xl shrink-0 self-start mt-0.5 ${badgeCls(item.badge)}`}>
                          {item.badge}
                        </span>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Flags */}
            {r.flags?.length > 0 && (
              <motion.div className="bg-white border border-black/[0.06] rounded-2xl mb-3 overflow-hidden" variants={card(2)} initial="hidden" animate="visible">
                <div className="flex items-center gap-2.5 px-[18px] py-3 border-b border-black/[0.06] bg-[#fafbfc]">
                  <div className="w-7 h-7 rounded-lg bg-amber-600/8 flex items-center justify-center text-[13px] shrink-0">⚑</div>
                  <span className="font-syne text-[10px] font-bold tracking-[0.12em] uppercase text-slate-500">Risk flags & considerations</span>
                </div>
                <div className="px-[18px] py-4 flex flex-col gap-1.5">
                  {r.flags.map((f, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: i * .07 + .3 } }}
                      className="flex gap-2.5 px-3.5 py-2.5 bg-amber-50 border border-amber-600/15 rounded-[9px] text-[13px] text-stone-700 leading-snug"
                    >
                      <span className="text-amber-600 shrink-0 text-sm mt-px">⚠</span>{f}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Next steps */}
            {r.nextSteps?.length > 0 && (
              <motion.div className="bg-white border border-black/[0.06] rounded-2xl mb-3 overflow-hidden" variants={card(3)} initial="hidden" animate="visible">
                <div className="flex items-center gap-2.5 px-[18px] py-3 border-b border-black/[0.06] bg-[#fafbfc]">
                  <div className="w-7 h-7 rounded-lg bg-[rgba(15,31,61,0.07)] flex items-center justify-center text-[13px] shrink-0">→</div>
                  <span className="font-syne text-[10px] font-bold tracking-[0.12em] uppercase text-slate-500">Recommended next steps</span>
                </div>
                <div className="px-[18px] py-4 flex flex-col gap-2">
                  {r.nextSteps.map((s, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0, transition: { delay: i * .07 + .4, duration: .3 } }}
                      className="flex gap-3 items-start"
                    >
                      <div className="w-[22px] h-[22px] border-[1.5px] border-gold/40 text-amber-800 font-syne text-[9px] font-bold rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <div className="text-[13px] text-slate-600 leading-relaxed pt-0.5">{s}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            <div className="text-[11px] text-slate-400 px-3.5 py-2.5 bg-slate-50 rounded-[9px] border border-slate-100 leading-relaxed mt-1">
              ⓘ ProcureAI provides AI-generated guidance for decision support only. Validate all procurement decisions with your procurement team and legal counsel.
            </div>

          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
