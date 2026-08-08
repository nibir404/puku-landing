export const CoworkVisual = () => {
  const cursors = [
    { name: 'Avery', color: '#A4ABFF', x: 18, y: 22, t: 'editing checkout.ts' },
    { name: 'Mira', color: '#D08BFF', x: 60, y: 38, t: 'reviewing design' },
    { name: 'Jin', color: '#7AD8C5', x: 32, y: 62, t: 'on services/auth.ts' },
  ];
  return (
    <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-[#0E0E11] p-6 shadow-card relative">
      <div className="flex items-center justify-between text-[12px] text-zinc-200 font-semibold">
        <div>checkout-flow · live</div>
        <div className="flex items-center gap-2 font-bold text-[#6E56CF]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#6E56CF] animate-pulse" />
          3 humans · 2 agents
        </div>
      </div>

      <div className="relative mt-5 aspect-[16/10] w-full rounded-xl border border-zinc-800 bg-[#030303] overflow-hidden">
        <svg viewBox="0 0 100 60" className="absolute inset-0 h-full w-full">
          {Array.from({ length: 12 }).map((_, i) =>
            Array.from({ length: 20 }).map((_, j) => (
              <circle
                key={`${i}-${j}`}
                cx={4 + j * 4.8}
                cy={4 + i * 4.8}
                r="0.4"
                fill="rgba(255,255,255,0.06)"
              />
            )),
          )}
          {cursors.map((c) => (
            <g key={c.name} transform={`translate(${c.x},${c.y})`}>
              <path d="M0 0 L0 14 L4 10 L7 16 L9 15 L6 9 L11 9 Z" fill={c.color} />
              <text x="11" y="6" fontSize="3" fill="#ffffff" fontFamily="monospace" fontWeight="bold">
                {c.name}
              </text>
            </g>
          ))}
        </svg>

        <div className="absolute left-4 top-4 rounded-lg border border-zinc-800 bg-zinc-900/90 backdrop-blur p-3 text-[12px] shadow-sm">
          <div className="text-[10.5px] uppercase tracking-wider text-zinc-300 font-bold">Puku Agent</div>
          <div className="mt-1 text-white font-medium">Suggested fix for race condition</div>
        </div>
        <div className="absolute right-4 bottom-4 rounded-lg border border-zinc-800 bg-zinc-900/90 backdrop-blur p-3 text-[12px] max-w-[220px] shadow-sm">
          <div className="text-[10.5px] uppercase tracking-wider text-zinc-300 font-bold">Comment</div>
          <div className="mt-1 text-white font-medium">Mira: can we move this into a hook?</div>
        </div>
      </div>
    </div>
  );
};
