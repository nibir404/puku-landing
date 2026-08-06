/** AI summary card mockup with a "Show me" link. */
export const AgentMockup = () => (
  <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
    <div className="border-b border-border bg-card px-3 py-2 text-[11px] font-medium text-ink-muted flex items-center gap-2">
      <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
      Puku · Agent
    </div>
    <div className="p-4 space-y-3">
      <div className="rounded-xl border border-border bg-card p-3">
        <div className="flex items-center gap-2 text-[11px] font-medium">
          <span className="h-4 w-4 rounded-full bg-accent text-white flex items-center justify-center text-[9px] font-bold">P</span>
          Summary
        </div>
        <div className="mt-2 space-y-1.5 text-[11px] text-ink-muted">
          <div className="flex items-center justify-between">
            <span>Defects found before release</span>
            <span className="rounded-full bg-surface px-1.5 py-0.5 text-[10px] text-ink border border-border">3.7x</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Faster ticket resolution</span>
            <span className="rounded-full bg-surface px-1.5 py-0.5 text-[10px] text-ink border border-border">2.4x</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Coverage of large codebases</span>
            <span className="rounded-full bg-surface px-1.5 py-0.5 text-[10px] text-ink border border-border">98%</span>
          </div>
        </div>
        <div className="mt-3 text-[10px] text-accent font-medium cursor-pointer">Show me</div>
      </div>
      <div className="rounded-xl bg-accent/10 border border-accent/20 p-3 text-[11px] text-ink">
        Model Puku-M trained on your codebase, ready to deploy.
      </div>
      <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-2 text-[11px] text-ink-muted">
        <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
        Ask the agent...
      </div>
    </div>
  </div>
);