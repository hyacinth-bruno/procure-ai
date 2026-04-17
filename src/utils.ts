import type { Badge, Category, Confidence } from "./types";

export const ago = (ts: number): string => {
  const d = Date.now() - ts;
  if (d < 60000) return "just now";
  if (d < 3600000) return `${Math.floor(d / 60000)}m ago`;
  return `${Math.floor(d / 3600000)}h ago`;
};

export const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const fadeUp = {
  hidden:  { opacity: 0, y: 14 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: .35, delay: i * .07, ease: easeOut } }),
  exit:    { opacity: 0, y: -8, transition: { duration: .2 } },
};

export const card = (i = 0) => ({
  hidden:  { opacity: 0, y: 16, scale: .98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: .4, delay: i * .08, ease: easeOut } },
});

export const badgeCls = (b: Badge): string => ({
  recommended: "bg-emerald-500/10 text-emerald-600",
  caution:     "bg-amber-500/10  text-amber-600",
  risk:        "bg-red-500/10    text-red-600",
  info:        "bg-blue-500/10   text-blue-600",
}[b] ?? "bg-blue-500/10 text-blue-600");

export const tagCls = (cat: Category): string => ({
  supplier:   "bg-teal-600/10   text-teal-600   border-teal-600/20",
  contract:   "bg-violet-600/10 text-violet-600 border-violet-600/20",
  spend:      "bg-amber-600/10  text-amber-600  border-amber-600/20",
  compliance: "bg-rose-600/10   text-rose-600   border-rose-600/20",
  general:    "bg-slate-100     text-slate-500  border-slate-200",
}[cat] ?? "bg-slate-100 text-slate-500 border-slate-200");

export const confidenceCls = (c: Confidence): string => ({
  high:   "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  medium: "bg-amber-500/10   text-amber-600   border-amber-500/20",
  low:    "bg-red-500/10     text-red-600     border-red-500/20",
}[c] ?? "bg-slate-100 text-slate-500 border-slate-200");

export const catIconCls = (cat: Category): string => ({
  supplier:   "bg-teal-600/8",
  contract:   "bg-violet-600/8",
  spend:      "bg-amber-600/8",
  compliance: "bg-slate-100",
  general:    "bg-slate-100",
} satisfies Record<Category, string>)[cat];
