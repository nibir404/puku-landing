/** Light "analytics dashboard" mockup with charts. */
export const DashboardMockup = () => (
  <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
    <div className="border-b border-border bg-card px-3 py-2 text-[11px] font-medium text-ink-muted flex items-center justify-between">
      <span>Dashboard</span>
      <span className="flex items-center gap-1.5 font-semibold text-accent">
        <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
        live
      </span>
    </div>
    <div className="p-4 space-y-3">
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: 'Users', value: '12.4k' },
          { label: 'Revenue', value: '$48k' },
          { label: 'Growth', value: '+24%' },
        ].map((s) => (
          <div key={s.label} className="rounded-lg border border-border bg-card p-2">
            <div className="text-[10px] text-ink-muted">{s.label}</div>
            <div className="text-[14px] font-mono font-semibold text-ink">{s.value}</div>
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-border bg-card p-3">
        <div className="flex items-center justify-between text-[10px] text-ink-muted mb-2">
          <span>Weekly active</span>
          <span>7d</span>
        </div>
        {/* Bar chart */}
        <div className="flex items-end gap-1.5 h-16">
          {[28, 52, 38, 64, 47, 80, 60].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm bg-accent"
              style={{ height: `${h}%`, opacity: i === 5 ? 1 : 0.65 }}
            />
          ))}
        </div>
      </div>
      <div className="rounded-lg border border-border bg-card p-3">
        <div className="flex items-center justify-between text-[10px] text-ink-muted mb-2">
          <span>Conversion</span>
          <span className="text-accent font-semibold">+12%</span>
        </div>
        {/* Line chart */}
        <svg viewBox="0 0 100 30" className="w-full h-10" preserveAspectRatio="none">
          <path
            d="M0 22 L15 18 L30 20 L45 14 L60 12 L75 8 L90 6 L100 4"
            fill="none"
            stroke="#6954C4"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M0 22 L15 18 L30 20 L45 14 L60 12 L75 8 L90 6 L100 4 L100 30 L0 30 Z"
            fill="url(#g)"
            opacity="0.2"
          />
          <defs>
            <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#6954C4" />
              <stop offset="100%" stopColor="#6954C4" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  </div>
);