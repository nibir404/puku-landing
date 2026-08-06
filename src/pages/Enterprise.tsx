import { SEO } from '@/components/layout/SEO';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ButtonLink } from '@/components/ui/Button';
import { CtaBanner } from '@/components/layout/CtaBanner';

const pillars = [
  {
    title: 'Security by design',
    items: [
      'On-device AI by default — your code never leaves your machine.',
      'SOC 2 Type II, ISO 27001, HIPAA, FedRAMP-ready.',
      'SSO, SCIM, role-based access, audit logs.',
      'Bring your own KMS for encryption at rest.',
    ],
  },
  {
    title: 'Deploy your way',
    items: [
      'AWS, GCP, Azure, or your own data center.',
      'Air-gapped deployments for regulated environments.',
      'Single-tenant infrastructure with private connectivity.',
      'Custom data residency for global teams.',
    ],
  },
  {
    title: 'Built for the org',
    items: [
      'Centralized billing, seat management, and policy controls.',
      'Granular permissions for engineering, security, and legal.',
      'Custom agents trained on your private codebase.',
      'Dedicated solutions engineers and 99.99% SLA.',
    ],
  },
];

const customers = [
  { name: 'Northwind', industry: 'Fintech' },
  { name: 'Helios', industry: 'Healthcare' },
  { name: 'Stratos', industry: 'Defense' },
  { name: 'Meridian', industry: 'Retail' },
  { name: 'Voyager', industry: 'Logistics' },
  { name: 'Atlas', industry: 'Energy' },
];

export default function Enterprise() {
  return (
    <>
      <SEO title="Enterprise — Puku" description="Puku for the enterprise." />
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 -z-10 bg-radial-purple" />
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow className="justify-center">Enterprise</Eyebrow>
            <h1 className="mt-5 font-display text-display-xl font-medium tracking-tight">
              Puku at the scale your <span className="text-gradient">enterprise demands.</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-muted">
              The same platform, deployed where you need it, governed the way you require it, and supported by people who have shipped at your scale.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
              <ButtonLink to="/contact" arrow="right">Talk to sales</ButtonLink>
              <ButtonLink to="/solutions/security" variant="secondary">Read security overview</ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.title} className="rounded-2xl border border-border bg-surface p-7 hover:border-accent/20 transition-colors">
              <h3 className="font-mono text-base font-semibold uppercase tracking-wider text-ink">{p.title}</h3>
              <ul className="mt-5 space-y-3">
                {p.items.map((it, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[13.5px] text-ink-muted">
                    <svg viewBox="0 0 16 16" fill="none" className="mt-1 h-3.5 w-3.5 flex-none text-accent">
                      <path d="M3 8.5l3.5 3L13 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>

    <section className="py-20">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow className="justify-center">Trusted by</Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-medium">From startups to the Fortune 100.</h2>
        </div>
        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-3 md:grid-cols-6">
          {customers.map((c) => (
            <div key={c.name} className="rounded-xl border border-border bg-surface px-4 py-6 text-center hover:border-accent/20 transition-colors">
              <div className="font-mono text-base font-semibold uppercase tracking-wider text-ink">{c.name}</div>
              <div className="mt-1 text-[11px] uppercase tracking-wider text-ink-muted">{c.industry}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>

    <CtaBanner primaryCtaText="Book a call" secondaryCtaText="Contact sales" />
    </>
  );
}