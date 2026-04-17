export default function Topbar() {
  return (
    <div className="col-span-full bg-ink border-b border-white/5 flex items-center z-20">
      <div className="w-60 px-5 flex items-center gap-2.5 border-r border-white/5 h-full shrink-0">
        <div className="w-7 h-7 bg-gold rounded-[7px] flex items-center justify-center shrink-0">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1L9.5 5.5H12.5L10 8.5L11 13L7 10.5L3 13L4 8.5L1.5 5.5H4.5L7 1Z" fill="#0a0f1e"/>
          </svg>
        </div>
        <div>
          <div className="font-syne text-sm font-bold text-white">ProcureAI</div>
          <div className="text-[10px] text-mist mt-px">Procurement Demo</div>
        </div>
      </div>

      <div className="flex-1 flex items-center px-5 gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)]"/>
        <span className="text-xs text-mist">AI model connected</span>
      </div>

      <div className="flex items-center gap-3 px-5 ml-auto">
        <span className="font-syne text-[10px] font-bold tracking-[0.08em] text-gold bg-gold/15 border border-gold/25 px-2.5 py-[3px] rounded-full uppercase">
          Beta v0.1
        </span>
        <div className="w-7 h-7 rounded-full bg-ink3 border-[1.5px] border-ink4 flex items-center justify-content-center items-center justify-center font-syne text-[10px] font-bold text-gold">
          UP
        </div>
      </div>
    </div>
  );
}
