export const AppVisual = () => (
  <div className="grid grid-cols-2 gap-3">
    {[
      {
        title: 'Deploy approved',
        body: 'checkout.puku.app · p95 38ms',
        time: '2m ago',
        tag: 'live',
      },
      {
        title: 'Pull request ready',
        body: 'Puku opened PR #482 · 2 reviewers',
        time: '8m ago',
        tag: 'review',
      },
      {
        title: 'AI flagged a regression',
        body: 'tests/services/checkout.ts · 1 flake',
        time: '12m ago',
        tag: 'flag',
      },
      {
        title: 'Comment from Mira',
        body: 'Nice — let’s merge once tests pass.',
        time: '24m ago',
        tag: 'mention',
      },
    ].map((n, i) => (
      <div
        key={i}
        className="rounded-2xl border border-border bg-card p-4 shadow-card"
      >
        <div className="flex items-center justify-between text-[10.5px] uppercase tracking-wider text-ink-dim font-semibold">
          <span>{n.tag}</span>
          <span>{n.time}</span>
        </div>
        <div className="mt-2 font-sans text-[14px] font-bold text-ink">{n.title}</div>
        <div className="mt-1 text-[12.5px] text-ink-muted">{n.body}</div>
      </div>
    ))}
  </div>
);
