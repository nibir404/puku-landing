import { Link } from 'react-router-dom';
import { SEO } from '@/components/layout/SEO';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ButtonLink } from '@/components/ui/Button';
import { CtaBanner } from '@/components/layout/CtaBanner';

const verticals = [
  {
    name: 'Individuals',
    href: '/pricing',
    desc: 'Build faster using AI that understands your codebase and engineering workflow.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path d="M12 12c2 0 3.5-1.5 3.5-3.5S14 5 12 5 8.5 6.5 8.5 8.5 10 12 12 12zm0 2c-3 0-6 1.8-6 4v1h12v-1c0-2.2-3-4-6-4z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Teams',
    href: '/pricing',
    desc: 'Improve collaboration with shared project memory, intelligent reviews, and AI-powered documentation.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path d="M17 20v-1a3 3 0 00-3-3H6a3 3 0 00-3 3v1m13-7a3 3 0 10-3-3M6 10a3 3 0 100-6m11 6a3 3 0 013 3v1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Enterprise',
    href: '/contact',
    desc: 'Deploy AI securely with private infrastructure, SSO, audit logs, compliance, and enterprise administration.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'Education',
    href: '/docs',
    desc: 'Learn software engineering using AI tutors, guided learning, and practical coding assistance.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path d="M12 14l8-4.5-8-4.5-8 4.5 8 4.5zm0 0v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Startups',
    href: '/pricing',
    desc: 'Move from idea to production faster using AI-powered development workflows.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function Solutions() {
  return (
    <>
      <SEO title="Solutions — Puku" description="Puku for every team." />
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="absolute inset-0 -z-10 bg-radial-glow" />
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow className="justify-center">Solutions</Eyebrow>
            <h1 className="mt-5 font-display text-display-xl font-medium tracking-tight">
              One platform for <span className="text-gradient">every team.</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-muted">
              Puku adapts to the way your team works. Pick the role, and we will show you how Puku plugs into it.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-2">
            {verticals.map((v) => (
              <Link
                key={v.name}
                to={v.href}
                className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-8 transition-all duration-200 hover:border-accent/40 hover:shadow-card"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-ink">
                    {v.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-mono text-base font-semibold uppercase tracking-wider text-ink">{v.name}</h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-ink-muted">{v.desc}</p>
                    <div className="mt-5 inline-flex items-center gap-1 text-[13px] font-medium text-ink transition-all group-hover:gap-2">
                      Learn more
                      <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}