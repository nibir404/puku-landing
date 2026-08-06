/** Purple chat-style mockup. Small "Tasks" sidebar + chat bubbles + composer. */
export const ChatMockup = () => (
  <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
    <div className="flex items-center gap-1.5 border-b border-border bg-card px-3 py-2">
      <span className="h-2 w-2 rounded-full bg-ink-dim/40" />
      <span className="h-2 w-2 rounded-full bg-ink-dim/40" />
      <span className="h-2 w-2 rounded-full bg-ink-dim/40" />
      <span className="ml-3 text-[11px] font-medium text-ink-muted">Puku · Chat</span>
    </div>
    <div className="grid grid-cols-12">
      <aside className="col-span-4 border-r border-border bg-card p-2.5 text-[11px]">
        <div className="text-[10px] uppercase tracking-wider text-ink-muted mb-1.5 font-semibold">Tasks</div>
        {['Settings', 'Profile', 'Inbox', 'Messages', 'Calendar', 'Help', 'Logout'].map((f, i) => (
          <div
            key={f}
            className={`rounded-md px-2 py-1 ${i === 2 ? 'bg-accent/15 text-accent font-semibold' : 'text-ink-muted'}`}
          >
            <span className="mr-1.5 text-ink-dim/60">▸</span>
            {f}
          </div>
        ))}
      </aside>
      <div className="col-span-8 p-4 bg-surface">
        <div className="space-y-2">
          <div className="rounded-xl rounded-tl-sm bg-card p-2.5 text-[11px] text-ink-muted">
            Hi! I want to design a beautiful interface for my online store.
          </div>
          <div className="ml-auto rounded-xl rounded-tr-sm bg-accent/10 border border-accent/20 p-2.5 text-[11px] text-ink font-medium">
            Sure — what kind of products are you selling?
          </div>
          <div className="rounded-xl rounded-tl-sm bg-card p-2.5 text-[11px] text-ink-muted">
            Handmade ceramics. I want something minimal, but warm.
          </div>
          <div className="ml-auto rounded-xl rounded-tr-sm bg-accent/10 border border-accent/20 p-2.5 text-[11px] text-ink font-medium">
            Got it. I'll start with a clean grid, soft beige palette, and serif headings.
          </div>
        </div>
        <div className="mt-3 rounded-lg border border-border bg-card p-2 text-[11px] text-ink-muted flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
          Ask Puku anything...
        </div>
      </div>
    </div>
  </div>
);