import { SEO } from '@/components/layout/SEO';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ButtonLink } from '@/components/ui/Button';
import { CtaBanner } from '@/components/layout/CtaBanner';

const values = [
  {
    title: 'Engineers first',
    body: 'Puku is built by engineers who got tired of the glue work. Every feature is grounded in a real workflow we needed ourselves.',
  },
  {
    title: 'Open by default',
    body: 'Puku plays well with the tools you already use. Open standards, open source, open community.',
  },
  {
    title: 'Privacy as a feature',
    body: 'On-device AI is the default. Your code stays where it belongs. We do not monetize your work.',
  },
  {
    title: 'Quiet but powerful',
    body: 'The best tools disappear. Puku gets out of the way so you can think about what you are building.',
  },
];

const team = [
  { name: 'Daniel Reyes', role: 'CEO & co-founder' },
  { name: 'Maya Singh', role: 'CTO & co-founder' },
  { name: 'Avery Chen', role: 'Head of Design' },
  { name: 'Theo Park', role: 'Head of Engineering' },
  { name: 'Lia Okafor', role: 'Head of Product' },
  { name: 'Ravi Patel', role: 'Head of Research' },
];

export default function About() {
  return (
    <>
      <SEO title="About — Puku" description="The team building Puku, and the future we are building toward." />
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 -z-10 bg-radial-glow" />
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow className="justify-center">About Puku</Eyebrow>
            <h1 className="mt-5 font-display text-display-xl font-medium tracking-tight">
              We are building the platform we <span className="text-gradient">always wanted.</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-muted">
              Puku is a team of engineers, designers, and researchers on a mission to make software creation closer to thinking. We started Puku in 2023 to bring AI, design, code, and infrastructure into a single workspace.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow className="justify-center">What we believe</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-medium">Four values, in order.</h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-2">
            {values.map((v, i) => (
              <div key={v.title} className="rounded-2xl border border-border bg-surface p-7 hover:border-accent/20 transition-colors">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-accent">0{i + 1}</div>
                <h3 className="mt-3 font-mono text-sm font-semibold uppercase tracking-wider text-ink">{v.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-ink-muted">{v.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow className="justify-center">The team</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-medium">A small team with a big mission.</h2>
            <p className="mt-4 text-ink-muted">We are 80 people across 9 countries. We are hiring.</p>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-3">
            {team.map((m) => (
              <div key={m.name} className="rounded-2xl border border-border bg-surface p-6 hover:border-accent/20 transition-colors">
                <div className="h-32 w-full rounded-xl bg-card flex items-center justify-center">
                  <span className="font-mono text-3xl font-semibold text-accent">
                    {m.name
                      .split(' ')
                      .map((p) => p[0])
                      .join('')}
                  </span>
                </div>
                <div className="mt-4 font-mono text-base font-semibold text-ink">{m.name}</div>
                <div className="mt-1 text-[12.5px] text-ink-muted">{m.role}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

    <CtaBanner />
    </>
  );
}