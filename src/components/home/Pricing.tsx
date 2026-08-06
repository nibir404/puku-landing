import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ButtonLink } from '@/components/ui/Button';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const tiers = [
  {
    name: 'Student',
    desc: 'Perfect for learning and education.',
    price: '$0',
    period: 'forever',
    cta: { label: 'Download Puku', href: '/download' },
    features: [
      'All six products',
      'Unlimited personal workspaces',
      'Community support',
      'Public projects',
    ],
    accent: false,
  },
  {
    name: 'Pro',
    desc: 'Built for professional developers and freelancers.',
    price: '$20',
    period: 'per user / month',
    cta: { label: 'Start free trial', href: '/pricing' },
    features: [
      'Everything in Student',
      'Unlimited private projects',
      'GPT-class + Puku agents',
      'Priority compute',
      'Email support · 24h',
    ],
    accent: true,
  },
  {
    name: 'Power',
    desc: 'Advanced AI workflows with premium capabilities.',
    price: '$40',
    period: 'per user / month',
    cta: { label: 'Start free trial', href: '/pricing' },
    features: [
      'Everything in Pro',
      'Unlimited team workspaces',
      'SSO · SCIM · audit logs',
      'Shared agents & policies',
      'Dedicated support · 4h',
    ],
    accent: false,
  },
  {
    name: 'Enterprise',
    desc: 'Private deployment, enhanced security, unlimited collaboration, and dedicated support.',
    price: 'Custom',
    period: 'annual contract',
    cta: { label: 'Contact sales', href: '/enterprise' },
    features: [
      'Everything in Power',
      'Self-host · air-gapped',
      'Custom models & BYO',
      'SOC 2 · ISO 27001 · HIPAA',
      '99.99% SLA',
    ],
    accent: false,
  },
];

export const Pricing = () => {
  return (
    <section id="pricing" className="relative py-24 md:py-32 overflow-hidden">
      <Container>
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <Eyebrow className="justify-center">Pricing</Eyebrow>
          <h2 className="mt-5 font-sans text-display-lg md:text-display-xl font-bold tracking-tight text-ink">
            Simple Pricing for Every Builder
          </h2>
          <p className="mt-6 text-base md:text-lg leading-relaxed text-ink-muted">
            Start free. Upgrade when your team needs power. Nothing is hidden
            behind a sales call.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative flex flex-col rounded-2xl border p-6 transition-all duration-300 ${
                t.accent
                  ? 'border-accent/50 bg-surface shadow-glow'
                  : 'border-border bg-surface text-ink'
              }`}
            >
              {t.accent && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-1 text-[10.5px] font-bold uppercase tracking-wider text-bg border border-accent/20">
                  Most popular
                </div>
              )}
              <div className="font-mono text-base font-semibold uppercase tracking-wider text-ink">{t.name}</div>
              <div className="mt-1 text-[13.5px] text-ink-muted">{t.desc}</div>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-mono text-3xl font-bold text-accent">
                  {t.price}
                </span>
                <span className="text-[13px] text-ink-muted">{t.period}</span>
              </div>
              <ButtonLink
                to={t.cta.href}
                variant={t.accent ? 'primary' : 'secondary'}
                size="md"
                arrow="none"
                className="mt-6"
              >
                {t.cta.label}
              </ButtonLink>
              <ul className="mt-6 flex-1 space-y-2.5">
                {t.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-[13.5px] text-ink-muted"
                  >
                    <Check className="mt-0.5 h-4 w-4 text-accent" strokeWidth={2.2} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center text-[13px] text-ink-muted">
          Need academic or non-profit pricing?{' '}
          <Link to="/contact" className="text-ink underline-offset-4 hover:underline">
            Get in touch
          </Link>
          .
        </div>
      </Container>
    </section>
  );
};