export const CloudVisual = () => {
  const regions = [
    { code: 'us-east', ms: 38, x: 22, y: 42 },
    { code: 'us-west', ms: 41, x: 14, y: 38 },
    { code: 'eu-west', ms: 35, x: 46, y: 32 },
    { code: 'eu-north', ms: 32, x: 50, y: 24 },
    { code: 'ap-south', ms: 48, x: 66, y: 50 },
    { code: 'ap-east', ms: 44, x: 78, y: 44 },
    { code: 'sa-east', ms: 52, x: 30, y: 64 },
    { code: 'af-south', ms: 56, x: 52, y: 62 },
    { code: 'me', ms: 46, x: 60, y: 44 },
  ];
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-surface p-6 shadow-card">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[11px] uppercase tracking-wider text-ink-dim font-semibold">Global edge</div>
          <div className="mt-1 font-mono text-sm font-semibold uppercase tracking-wider text-ink">checkout.puku.app</div>
        </div>
        <div className="text-right">
          <div className="text-[11px] uppercase tracking-wider text-ink-dim font-semibold">p95 latency</div>
          <div className="mt-1 font-mono text-sm font-semibold tracking-wider text-accent">38ms</div>
        </div>
      </div>

      <div className="relative mt-6 aspect-[16/9] w-full">
        <svg viewBox="0 0 100 70" className="absolute inset-0 h-full w-full">
          <defs>
            <radialGradient id="g1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#6954C4" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#6954C4" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* dotted world */}
          {Array.from({ length: 14 }).map((_, i) =>
            Array.from({ length: 22 }).map((_, j) => (
              <circle
                key={`${i}-${j}`}
                cx={4 + j * 4.2}
                cy={6 + i * 4.2}
                r="0.4"
                fill="rgba(9,9,11,0.08)"
              />
            )),
          )}
          {regions.map((r) => (
            <g key={r.code}>
              <circle cx={r.x} cy={r.y} r="4" fill="url(#g1)" />
              <circle cx={r.x} cy={r.y} r="1.2" fill="#6954C4" />
            </g>
          ))}
        </svg>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-[11.5px]">
        {regions.slice(0, 6).map((r) => (
          <div
            key={r.code}
            className="flex items-center justify-between rounded-md border border-border bg-bg px-2.5 py-1.5 hover:border-accent/30 transition-colors"
          >
            <span className="text-ink-muted">{r.code}</span>
            <span className="text-accent font-mono font-semibold">{r.ms}ms</span>
          </div>
        ))}
      </div>
    </div>
  );
};
