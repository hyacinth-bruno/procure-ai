import { motion, AnimatePresence } from "framer-motion";
import { bCls, easeOut, fadeUp, card } from "../utils";
import type { HistoryEntry, Category } from "../types";

interface ResultsPanelProps {
  loading: boolean;
  result: HistoryEntry | null;
  error: string | null;
}

const CAT_ICO: Partial<Record<Category, string>> = { supplier: "⬡", contract: "▤", spend: "◎" };
const CAT_LBL: Partial<Record<Category, string>> = { supplier: "Supplier options", contract: "Clause analysis", spend: "Spend breakdown" };
const CAT_CLS: Partial<Record<Category, string>> = { supplier: "i-teal", contract: "i-violet", spend: "i-amber" };

export default function ResultsPanel({ loading, result, error }: ResultsPanelProps) {
  const r = result?.result;

  return (
    <div className="rscroll">
      <AnimatePresence mode="wait">

        {!loading && !result && !error && (
          <motion.div key="empty" className="empty"
            variants={fadeUp} initial="hidden" animate="visible" exit="exit">
            <div className="e-glyph">◈</div>
            <div className="e-title">AI Procurement Intelligence</div>
            <div className="e-sub">Query suppliers, analyse contracts, review spend, or check compliance — structured answers powered by Claude AI.</div>
          </motion.div>
        )}

        {loading && (
          <motion.div key="ld" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="ld-bar">
            <div className="ld-dots"><div className="ld-d"/><div className="ld-d"/><div className="ld-d"/></div>
            <span className="ld-txt">Analysing your procurement query…</span>
          </motion.div>
        )}

        {error && !loading && (
          <motion.div key="err" initial={{ opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} className="err">
            <span style={{ fontSize: 16 }}>⚠</span><span>{error}</span>
          </motion.div>
        )}

        {result && !loading && r && (
          <motion.div key={result.id} variants={fadeUp} initial="hidden" animate="visible" exit="exit">

            <div className="rq-head">
              <div className="rq-txt">"{result.query}"</div>
              <div className="tag-row">
                {r.category   && <span className={`tag t-${r.category}`}>{r.category}</span>}
                {r.confidence && <span className={`tag t-${r.confidence}`}>{r.confidence} confidence</span>}
              </div>
            </div>

            {r.summary && (
              <motion.div className="sc" variants={card(0)} initial="hidden" animate="visible">
                <div className="sc-h"><div className="sc-ico i-slate">📋</div><span className="sc-lbl">Executive summary</span></div>
                <div className="sc-b"><p className="sum-p">{r.summary}</p></div>
              </motion.div>
            )}

            {r.items?.length > 0 && (
              <motion.div className="sc" variants={card(1)} initial="hidden" animate="visible">
                <div className="sc-h">
                  <div className={`sc-ico ${CAT_CLS[r.category] ?? "i-slate"}`}>
                    {CAT_ICO[r.category] ?? "◈"}
                  </div>
                  <span className="sc-lbl">{CAT_LBL[r.category] ?? "Key findings"}</span>
                </div>
                <div className="sc-b">
                  <div className="il">
                    {r.items.map((item, i) => (
                      <motion.div key={i} className="ii"
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0, transition: { delay: i * .06 + .2, duration: .3, ease: easeOut } }}
                        whileHover={{ x: 2, transition: { duration: .15 } }}>
                        <div className="i-num">{i + 1}</div>
                        <div className="i-body">
                          <div className="i-name">{item.name}</div>
                          <div className="i-det">{item.detail}</div>
                        </div>
                        {item.badge && <span className={`bdg ${bCls(item.badge)}`}>{item.badge}</span>}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {r.flags?.length > 0 && (
              <motion.div className="sc" variants={card(2)} initial="hidden" animate="visible">
                <div className="sc-h"><div className="sc-ico i-amber">⚑</div><span className="sc-lbl">Risk flags & considerations</span></div>
                <div className="sc-b">
                  <div className="fl">
                    {r.flags.map((f, i) => (
                      <motion.div key={i} className="fi"
                        initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: i * .07 + .3 } }}>
                        <span className="fi-sym">⚠</span>{f}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {r.nextSteps?.length > 0 && (
              <motion.div className="sc" variants={card(3)} initial="hidden" animate="visible">
                <div className="sc-h"><div className="sc-ico i-navy">→</div><span className="sc-lbl">Recommended next steps</span></div>
                <div className="sc-b">
                  <div className="stl">
                    {r.nextSteps.map((s, i) => (
                      <motion.div key={i} className="sti"
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0, transition: { delay: i * .07 + .4, duration: .3 } }}>
                        <div className="st-n">{i + 1}</div>
                        <div className="st-t">{s}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            <div className="disc">ⓘ ProcureAI provides AI-generated guidance for decision support only. Validate all procurement decisions with your procurement team and legal counsel.</div>

          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
