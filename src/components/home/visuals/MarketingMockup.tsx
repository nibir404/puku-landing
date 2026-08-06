/** "Good Morning, Dan" gradient banner mockup. */
export const MarketingMockup = () => (
  <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
    <div className="border-b border-border bg-card px-3 py-2 text-[11px] font-medium text-ink-muted">
      Home
    </div>
    <div className="p-4">
      <div className="rounded-2xl bg-accent/10 border border-accent/20 p-5">
        <div className="text-[11px] text-ink-muted">8:24 AM</div>
        <div className="mt-1 font-mono text-base font-semibold uppercase tracking-wider text-ink">
          Good Morning, Dan
        </div>
        <div className="mt-1.5 text-[11px] text-ink-muted max-w-[260px]">
          Hope you had a great sleep, here's a quick look at what's happening today.
        </div>
      </div>
      <div className="mt-4 rounded-xl bg-card p-4 border border-border">
        <div className="text-[11px] font-semibold text-ink-muted uppercase tracking-wider">Summary</div>
        <div className="mt-2 flex justify-between text-[10px] text-ink-muted">
          <span>Engagement</span>
          <span className="text-accent font-semibold">74%</span>
        </div>
        <div className="mt-2 h-1.5 rounded-full bg-surface">
          <div className="h-1.5 rounded-full bg-accent" style={{ width: '74%' }} />
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-card p-3 border border-border">
          <div className="text-[10px] text-ink-muted">Tasks</div>
          <div className="text-[14px] font-mono font-semibold text-ink">12</div>
        </div>
        <div className="rounded-xl bg-card p-3 border border-border">
          <div className="text-[10px] text-ink-muted">Inbox</div>
          <div className="text-[14px] font-mono font-semibold text-ink">4 new</div>
        </div>
      </div>
    </div>
  </div>
);