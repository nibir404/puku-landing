import { SEO } from '@/components/layout/SEO';
import { ProductPage } from '@/components/product/ProductPage';
import { AppVisual } from '@/components/home/visuals/AppVisual';

const glyph = (
  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
    <rect x="6" y="2" width="12" height="20" rx="3" stroke="currentColor" strokeWidth="1.8" />
    <path d="M11 18h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export default function App() {
  return (
    <>
      <SEO
        title="Puku App — Your engineering team in your pocket"
        description="Approve deploys, review PRs, and stay in flow from anywhere."
      />
      <ProductPage
        name="Puku App"
        color="from-[#FFD18B] to-[#FF8FB1]"
        glyph={glyph}
        tagline="Your Engineering Workspace Anywhere"
        description="Stay connected with your engineering workflow from anywhere."
        bullets={[
          'Project Monitoring',
          'AI Notifications',
          'Mobile Access',
          'Pull Request Reviews',
          'Workspace Management',
          'Activity Timeline',
        ]}
        problem={{
          title: 'You are never truly off-call.',
          body:
            'Pagers fire for things you cannot act on. Slack threads ask for code reviews on the bus. Puku App only surfaces things you can fix from your phone — and lets you fix them fast.',
        }}
        howItWorks={[
          { step: '01', title: 'See what matters', body: 'Puku summarizes noise. You see deploys waiting, PRs needing you, and blockers. Nothing else.' },
          { step: '02', title: 'Approve with confidence', body: 'Every action shows the diff, the impact, and the rollback path. You decide in seconds.' },
          { step: '03', title: 'Stay in context', body: 'Tap into any thread, doc, or canvas from a notification. You do not have to dig back through Slack.' },
          { step: '04', title: 'Sleep well', body: 'Set quiet hours. Puku filters aggressively. P0s break through. Everything else waits.' },
        ]}
        visual={<AppVisual />}
        demo={
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              { title: 'Deploy ready', sub: 'main · 4d ago', accent: '#A4ABFF', body: '12 files changed. 38ms p95. 0 errors.' },
              { title: 'PR needs review', sub: 'FIN-204 · Maya', accent: '#7AD8C5', body: '+148 / −22 · approved by 1' },
              { title: 'Pager: P2', sub: 'us-east · API', accent: '#FF8FB1', body: '5xx rate 0.7% — auto-scaling' },
            ].map((n, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card p-5">
                <div className="text-[11px] uppercase tracking-wider text-ink-dim">{n.sub}</div>
                <div className="mt-2 text-[15px] font-medium text-ink">{n.title}</div>
                <div className="mt-2 text-[12.5px] text-ink-muted">{n.body}</div>
                <div className="mt-4 inline-flex items-center gap-2 rounded-md px-2 py-1 text-[11.5px]" style={{ background: `${n.accent}20`, color: n.accent }}>
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: n.accent }} />
                  Ready for action
                </div>
              </div>
            ))}
          </div>
        }
        workflow={[
          'Open the App to see only what needs you.',
          'Approve, reject, or escalate with one tap.',
          'Drill into the canvas, code, or thread in two more taps.',
          'Set quiet hours for everything but P0.',
        ]}
        performance={[
          { value: '50ms', label: 'Notification latency' },
          { value: '2', label: 'Taps to approve' },
          { value: 'E2E', label: 'Encrypted notifications' },
          { value: '0', label: 'Tracking pixels' },
        ]}
        integrations={[
          { name: 'iOS', category: 'Mobile' },
          { name: 'Android', category: 'Mobile' },
          { name: 'Apple Watch', category: 'Wearables' },
          { name: 'PagerDuty', category: 'On-call' },
          { name: 'GitHub', category: 'Code' },
          { name: 'Linear', category: 'Tickets' },
          { name: 'Slack', category: 'Comms' },
          { name: 'Twilio', category: 'SMS' },
        ]}
        faq={[
          { q: 'Is the App free?', a: 'Yes. The Puku App is free for everyone on iOS and Android — Team plans get richer notifications.' },
          { q: 'Does it work offline?', a: 'You can review cached code and threads offline. Approvals queue and fire when you reconnect.' },
          { q: 'What about privacy?', a: 'Puku App is end-to-end encrypted. We do not store notification contents on our servers.' },
        ]}
        cta={{ primary: 'Download Puku App', secondary: 'See on the App Store' }}
        crossLinks={[
          { name: 'Puku Cloud', href: '/products/cloud', desc: 'Approve deploys from your phone.' },
          { name: 'Puku Editor', href: '/products/editor', desc: 'Stay in sync with what is on your machine.' },
          { name: 'Puku CLI', href: '/products/cli', desc: 'Pair the App with terminal notifications.' },
        ]}
      />
    </>
  );
}