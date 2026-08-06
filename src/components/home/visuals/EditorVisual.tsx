export const EditorVisual = () => (
  <div className="overflow-hidden rounded-3xl border border-border bg-surface shadow-card">
    <div className="flex items-center justify-between border-b border-border bg-[#e4e4e7] px-4 py-2.5">
      <div className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#d4d4d8]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#d4d4d8]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#d4d4d8]" />
      </div>
      <div className="font-mono text-[12px] text-ink-muted">services/checkout.ts · Puku</div>
      <div className="font-mono text-[11px] text-accent font-semibold flex items-center gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
        ai editing
      </div>
    </div>
    <div className="grid grid-cols-12">
      <aside className="col-span-3 hidden md:flex flex-col gap-0.5 border-r border-border bg-[#f4f4f5] p-3 text-[12px]">
        <div className="mb-1 text-[10.5px] uppercase tracking-wider text-ink-dim font-semibold">Files</div>
        {['app/', 'services/', 'lib/', 'tests/', 'designs/'].map((f) => (
          <div
            key={f}
            className={`rounded-md px-2 py-1 ${
              f === 'services/' ? 'bg-ink/5 text-ink font-semibold' : 'text-ink-muted'
            }`}
          >
            ▸ {f}
          </div>
        ))}
      </aside>
      <div className="col-span-12 md:col-span-9 p-5 font-mono text-[12.5px] leading-[1.75] bg-surface">
        {[
          ['1', 'import', ' { stripe, db } ', 'from', " '@/lib'", ''],
          ['2', '', '', '', '', ''],
          ['3', 'export const ', 'createCheckout', ' = ', 'async (input) => {', ''],
          ['4', '  ', 'const ', 'session = ', 'await stripe.checkout', ''],
          ['5', '', '', '', '', ''],
          ['6', '  return ', '{ url: session.url }', '', '', ''],
          ['7', '}', '', '', '', ''],
        ].map((row, i) => (
          <div key={i} className="flex">
            <span className="mr-3 w-5 text-right text-ink-dim/60">{row[0]}</span>
            {row.slice(1).map((seg, j) => (
              <span
                key={j}
                className={
                  ['export', 'const', 'return', 'await', 'from', 'import'].includes(seg.trim())
                    ? 'text-accent-secondary font-semibold'
                    : seg.includes('createCheckout')
                    ? 'text-accent font-semibold'
                    : 'text-ink'
                }
              >
                {seg}
              </span>
            ))}
            {i === 3 && (
              <span className="ml-1 inline-block h-4 w-1.5 self-center bg-accent animate-cursor-blink" />
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
);
