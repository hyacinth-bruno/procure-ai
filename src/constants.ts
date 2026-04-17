import type { Cat } from "./types";

export const CATS: Cat[] = [
  { id: "all",        label: "All queries",       icon: "◈" },
  { id: "supplier",   label: "Supplier search",   icon: "⬡" },
  { id: "contract",   label: "Contract analysis", icon: "▤" },
  { id: "spend",      label: "Spend analysis",    icon: "◎" },
  { id: "compliance", label: "Compliance",        icon: "◉" },
];

export const PROMPTS: string[] = [
  "3 suppliers for industrial valves under €10k",
  "Risk in clause: terminate with 7 days notice",
  "Bulk steel pricing in Europe this year",
  "GDPR compliance for IT procurement in Germany",
  "Single-source vs multi-source strategy",
];

export const SYSTEM = `You are ProcureAI, an expert procurement assistant at a European energy company. Return ONLY valid JSON — no markdown, no preamble:
{"category":"supplier"|"contract"|"spend"|"compliance"|"general","summary":"2-3 sentence executive summary","items":[{"name":"string","detail":"string","badge":"recommended"|"caution"|"risk"|"info"}],"flags":["string"],"nextSteps":["string"],"confidence":"high"|"medium"|"low"}
2-5 items, 1-3 flags, 2-4 steps. Be specific and professional.`;
