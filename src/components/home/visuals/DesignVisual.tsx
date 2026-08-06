export const DesignVisual = () => (
  <div className="overflow-hidden rounded-3xl border border-border bg-surface shadow-card">
    <div className="flex items-center justify-between border-b border-border bg-[#e4e4e7] px-4 py-2.5">
      <div className="font-mono text-[12px] text-ink-muted">designs/checkout.fig</div>
      <div className="text-[11px] text-ink-muted">3 collaborators · 2 agents</div>
    </div>

    <div className="grid grid-cols-12 gap-3 p-4">
      <aside className="col-span-3 flex flex-col gap-1 rounded-xl bg-[#f4f4f5] p-3">
        <div className="text-[10.5px] uppercase tracking-wider text-ink-dim font-semibold">Layers</div>
        {['Hero', 'Form', 'Pricing', 'Footer', 'Tokens'].map((l) => (
          <div
            key={l}
            className={`rounded-md px-2 py-1 text-[12.5px] ${
              l === 'Form' ? 'bg-ink/5 text-ink font-semibold' : 'text-ink-muted'
            }`}
          >
            <span className="mr-1 text-ink-dim">◆</span>
            {l}
          </div>
        ))}
      </aside>

      <div className="col-span-9 rounded-xl bg-[#fafafa] border border-border/50 p-6 relative">
        <div className="mx-auto max-w-md rounded-2xl border border-border bg-surface p-5 shadow-card">
          <div className="text-[11px] uppercase tracking-wider text-ink-dim">Checkout</div>
          <div className="mt-1 font-mono text-base font-semibold uppercase tracking-wider text-ink">Confirm your order</div>
          <div className="mt-4 space-y-2.5">
            <div className="h-10 rounded-lg border border-border bg-bg px-3 flex items-center text-[12.5px] text-ink-muted">
              you@company.com
            </div>
            <div className="h-10 rounded-lg border border-border bg-bg px-3 flex items-center text-[12.5px] text-ink-muted">
              •••• •••• •••• 4242
            </div>
          </div>
          <div className="mt-4 h-10 rounded-[4px] bg-accent hover:bg-accent/90 text-white transition-all text-[11px] font-bold uppercase tracking-wider flex items-center justify-center cursor-pointer shadow-sm">
            Pay $48.00
          </div>
        </div>

        <div className="absolute right-4 top-4 rounded-lg border border-accent/30 bg-accent/10 px-2 py-1 text-[10.5px] font-medium text-accent">
          tokens · matched
        </div>
      </div>
    </div>
  </div>
);
