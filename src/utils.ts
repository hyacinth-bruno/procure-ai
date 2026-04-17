import type { Badge } from "./types";

export const ago = (ts: number): string => {
  const d = Date.now() - ts;
  if (d < 60000) return "just now";
  if (d < 3600000) return `${Math.floor(d / 60000)}m ago`;
  return `${Math.floor(d / 3600000)}h ago`;
};

export const bCls = (b: Badge): string =>
  ({ recommended: "b-g", caution: "b-a", risk: "b-r", info: "b-b" }[b] ?? "b-b");

export const easeOut: number[] = [0.22, 1, 0.36, 1];

export const fadeUp = {
  hidden:  { opacity: 0, y: 14 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: .35, delay: i * .07, ease: easeOut } }),
  exit:    { opacity: 0, y: -8, transition: { duration: .2 } },
};

export const card = (i = 0) => ({
  hidden:  { opacity: 0, y: 16, scale: .98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: .4, delay: i * .08, ease: easeOut } },
});
