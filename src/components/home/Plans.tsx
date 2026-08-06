import { Container } from '@/components/ui/Container';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Student',
    price: '$0',
    priceSuffix: '/mo',
    desc: 'Perfect for learning and education.',
    bullets: [
      'All six products',
      'Unlimited personal workspaces',
      'Community support',
      'Public projects',
    ],
    cta: 'Download Puku',
    accent: false,
  },
  {
    name: 'Pro',
    price: '$20',
    priceSuffix: '/mo',
    desc: 'Built for professional developers and freelancers.',
    bullets: [
      'Everything in Student',
      'Unlimited private projects',
      'GPT-class + Puku agents',
      'Priority compute',
      'Email support · 24h',
    ],
    cta: 'Start free trial',
    accent: true,
  },
  {
    name: 'Power',
    price: '$40',
    priceSuffix: '/mo',
    desc: 'Advanced AI workflows with premium capabilities.',
    bullets: [
      'Everything in Pro',
      'Unlimited team workspaces',
      'SSO · SCIM · audit logs',
      'Shared agents & policies',
      'Dedicated support · 4h',
    ],
    cta: 'Start free trial',
    accent: false,
  },
];

export const Plans = () => {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {plans.map((p, i) => (
            <div
              key={p.name}
              className={`relative overflow-hidden rounded-2xl border border-border bg-surface p-7 shadow-card ${
                i === 1 ? 'shadow-pill border-accent/40' : ''
              }`}
            >
              {i === 0 && (
                <div className="absolute top-5 right-5">
                  <div className="grid grid-cols-3 gap-1 animate-pulse">
                    {Array.from({ length: 9 }).map((_, j) => (
                      <div key={j} className="h-1.5 w-1.5 rounded-full bg-accent" />
                    ))}
                  </div>
                </div>
              )}
              <div className="text-[12px] font-medium uppercase tracking-wider text-ink-muted">
                {p.name}
              </div>
              {p.price && (
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="font-mono text-[40px] leading-none text-ink">
                    {p.price}
                  </span>
                  <span className="text-[13px] text-ink-muted">{p.priceSuffix}</span>
                </div>
              )}
              {p.desc && (
                <p className="mt-3 text-[13.5px] leading-relaxed text-ink-muted">{p.desc}</p>
              )}
              {p.bullets.length > 0 && (
                <ul className="mt-5 space-y-2">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2.5 text-[13.5px] text-ink">
                      <Check className="h-4 w-4 text-accent flex-none" strokeWidth={2.4} />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
              <button className={`mt-6 inline-flex items-center gap-1.5 rounded-[4px] px-4 py-2 text-[11px] font-bold uppercase tracking-wider transition-all shadow-sm ${
                i === 1 
                  ? 'bg-accent hover:bg-accent/90 text-white border border-accent/20' 
                  : 'bg-[#e8e8ed] border border-border/80 hover:bg-[#dcdce3] text-ink'
              }`}>
                {p.cta}
                <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-[13px] text-ink-muted">
          Looking for enterprise solutions? <span className="text-ink underline-offset-4 hover:underline cursor-pointer">Contact sales →</span>
        </p>
      </Container>
    </section>
  );
};