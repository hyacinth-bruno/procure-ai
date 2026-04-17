export default function Topbar() {
  return (
    <div className="topbar">
      <div className="t-brand">
        <div className="t-mark">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1L9.5 5.5H12.5L10 8.5L11 13L7 10.5L3 13L4 8.5L1.5 5.5H4.5L7 1Z" fill="#0a0f1e"/>
          </svg>
        </div>
        <div>
          <div className="t-name">ProcureAI</div>
          <div className="t-sub">Procurement Demo</div>
        </div>
      </div>
      <div className="t-center">
        <div className="s-dot"/>
        <span className="s-txt">AI model connected</span>
      </div>
      <div className="t-right">
        <span className="v-pill">Beta v0.1</span>
        <div className="av">UP</div>
      </div>
    </div>
  );
}
