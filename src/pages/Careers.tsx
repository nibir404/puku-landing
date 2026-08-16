import { Link } from 'react-router-dom';
import { SEO } from '@/components/layout/SEO';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ButtonLink } from '@/components/ui/Button';

const perks = [
  { title: 'Top of market', body: 'Salary benchmarked to the 90th percentile. Equity for everyone.' },
  { title: 'Health & wellness', body: 'Comprehensive medical, dental, vision. Mental health support.' },
  { title: 'Time off', body: 'Unlimited PTO with a 3-week minimum. Sabbaticals at year 4.' },
  { title: 'Remote-friendly', body: 'Work from anywhere in our 9 countries. Quarterly offsites.' },
  { title: 'Equipment', body: 'Latest MacBook Pro, monitor, and $2k home-office stipend.' },
  { title: 'Learning', body: '$3k/year for conferences, books, and courses.' },
];

const roles = [
  { team: 'Engineering', title: 'Senior Engineer, Puku Editor', location: 'Remote · UTC ± 3' },
  { team: 'Engineering', title: 'Staff Engineer, Puku Cloud', location: 'San Francisco · Remote' },
  { team: 'Engineering', title: 'Engineer, AI Agents', location: 'Remote · Global' },
  { team: 'Engineering', title: 'Engineer, Puku CLI', location: 'Remote · Global' },
  { team: 'Design', title: 'Senior Product Designer, Puku Design', location: 'New York · Remote' },
  { team: 'Design', title: 'Brand Designer', location: 'Remote · Global' },
  { team: 'Research', title: 'Research Engineer, On-device AI', location: 'Remote · Global' },
  { team: 'Product', title: 'Group Product Manager, Puku Cloud', location: 'San Francisco · Remote' },
  { team: 'GTM', title: 'Solutions Engineer, Enterprise', location: 'New York · Remote' },
  { team: 'GTM', title: 'Account Executive, Enterprise', location: 'Remote · US' },
];

const teams = Array.from(new Set(roles.map((r) => r.team)));

export default function Careers() {
  return (
    <>
      <SEO title="Careers — Puku" description="Join the Puku team." />
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 -z-10 bg-radial-glow" />
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow className="justify-center">Careers</Eyebrow>
            <h1 className="mt-5 font-display text-display-xl font-medium tracking-tight">
              Come build the future of <span className="text-gradient">software.</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-muted">
              We are a small, focused team shipping the platform we always wanted. If that sounds like the right kind of work, we want to hear from you.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <ButtonLink to="#open-roles" arrow="right">See open roles</ButtonLink>
              <ButtonLink to="/about" variant="secondary">About Puku</ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow className="justify-center">Perks</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-medium">Built for builders.</h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-3">
            {perks.map((p) => (
              <div key={p.title} className="rounded-2xl border border-border bg-surface p-6 hover:border-accent/20 transition-colors">
                <h3 className="font-mono text-sm font-semibold uppercase tracking-wider text-ink">{p.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">{p.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="open-roles" className="py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow className="justify-center">Open roles</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-medium">12 roles across 5 teams.</h2>
            <p className="mt-3 text-ink-muted">Don't see a fit? Reach out anyway — we are always interested in meeting exceptional people.</p>
          </div>
          <div className="mx-auto mt-12 max-w-4xl space-y-8">
            {teams.map((team) => (
              <div key={team}>
                <h3 className="text-[11px] font-semibold uppercase tracking-wider text-accent">{team}</h3>
                <div className="mt-3 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface">
                  {roles.filter((r) => r.team === team).map((r) => (
                    <Link
                      key={r.title}
                      to={`/careers/${r.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                      className="group flex items-center justify-between gap-4 p-5 transition-all duration-200 hover:bg-card"
                    >
                      <div className="text-[14.5px] font-medium text-ink font-mono">{r.title}</div>
                      <div className="flex items-center gap-3 text-[12.5px] text-ink-muted">
                        <span>{r.location}</span>
                        <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5 text-accent transition-transform group-hover:translate-x-1">
                          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}