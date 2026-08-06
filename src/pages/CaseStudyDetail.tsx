import { useParams, Link } from 'react-router-dom';
import { SEO } from '@/components/layout/SEO';
import { Container } from '@/components/ui/Container';
import { ArrowLeft } from 'lucide-react';

const CASE_STUDIES: Record<string, {
  company: string;
  metric: string;
  metricLabel: string;
  subtitle: string;
  challenge: string;
  solution: string;
  result: string;
  quote: string;
  quoteAuthor: string;
  quoteRole: string;
}> = {
  'keydata': {
    company: 'KEYDATA',
    metric: '2.4x',
    metricLabel: 'Faster ticket resolution time',
    subtitle: 'How Keydata accelerated development cycles by deploying project-aware developer agents.',
    challenge: 'Keydata manages a massive distributed backend system with hundreds of microservices. As the product grew, engineers spent more than 40% of their time reading documentation, trace files, and resolving complex API conflicts, causing product iterations to slow down.',
    solution: 'Keydata integrated Puku Editor and Puku CLI directly into their developer toolchain. Puku’s shared project memory built an internal semantic map of their codebase, allowing developer agents to automatically predict, write test scenarios, and propose pull requests for incoming bug tickets.',
    result: 'Ticket resolution time dropped by 2.4x in the first month. Engineers shifted from resolving environmental conflicts and repetitive bug fixes to designing core product features, resulting in higher team satisfaction and accelerated shipping speeds.',
    quote: "Integrating Puku was like giving every engineer an assistant who already knew our entire, 5-million-line codebase inside out. Bug fixes that used to take days now get resolved in hours.",
    quoteAuthor: "Sarah Jenkins",
    quoteRole: "VP of Engineering, Keydata"
  },
  'cayuse': {
    company: 'Cayuse',
    metric: '3.7x',
    metricLabel: 'Defects found before release',
    subtitle: 'Simulating complex user interactions and code behavior to catch issues before staging.',
    challenge: 'Cayuse required a resilient testing environment to handle complex multi-player workflows. Classic testing suites were slow and often missed edge cases, leading to minor regressions reaching staging and production.',
    solution: 'Cayuse leveraged Puku Co-work and Puku Sim-1 models to simulate how modifications affect the codebase. By running automated simulations of active user inputs, they audited the app behavior across different viewport sizes and network speeds.',
    result: 'The simulation model identified 3.7x more defects before they could reach staging or release. This eliminated high-priority hotfixes and allowed the team to release software update pipelines with absolute confidence.',
    quote: "Simulating behavior with Sim-1 models transformed our QA process. We catch edge-case concurrency issues before a single line of code is pushed to our master branch.",
    quoteAuthor: "Marcus Chen",
    quoteRole: "Director of Platform, Cayuse"
  }
};

export default function CaseStudyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const study = slug ? CASE_STUDIES[slug] : null;

  if (!study) {
    return (
      <div className="flex min-h-[85vh] items-center justify-center px-6 pt-32 pb-20">
        <div className="text-center">
          <div className="font-pixel-mono text-[18px] uppercase tracking-wider text-ink-muted">404</div>
          <h1 className="mt-4 font-display text-3xl font-medium text-ink">Case Study Not Found</h1>
          <p className="mt-3 text-ink-muted">The case study you are looking for doesn't exist.</p>
          <Link to="/" className="mt-7 inline-block rounded-lg bg-ink px-5 py-2.5 text-[13px] font-medium text-white hover:bg-ink/85 transition-colors shadow-pill">
            Go home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO title={`${study.company} Case Study — Puku`} description={study.subtitle} />
      
      <section className="relative min-h-screen pt-32 pb-32">
        <div className="absolute inset-0 -z-10 bg-radial-glow" />
        
        <Container>
          <div className="mx-auto max-w-4xl">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-[13px] font-medium text-ink-muted hover:text-ink transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>

            <div className="text-[11.5px] font-semibold uppercase tracking-wider text-accent mb-4">
              Case Study
            </div>

            <h1 className="font-display text-4xl sm:text-5xl font-medium tracking-tight text-ink leading-tight">
              How <span className="text-gradient-purple">{study.company}</span> achieved a {study.metric} shift with Puku
            </h1>

            <p className="mt-6 text-lg sm:text-xl leading-relaxed text-ink-muted font-normal">
              {study.subtitle}
            </p>

            {/* Huge Metric Card */}
            <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-surface p-8 md:p-12 shadow-soft hover:shadow-glow transition-all duration-300 grid grid-cols-1 md:grid-cols-3 items-center gap-8">
              <div className="md:col-span-1 text-center md:text-left border-b md:border-b-0 md:border-r border-border pb-6 md:pb-0 md:pr-8">
                <span className="font-pixel-mono text-[72px] sm:text-[84px] leading-none text-accent font-semibold block">
                  {study.metric}
                </span>
                <span className="text-[14px] text-ink-muted uppercase font-mono tracking-wider mt-2 block">
                  Improvement
                </span>
              </div>
              <div className="md:col-span-2">
                <h3 className="font-display text-xl sm:text-2xl font-semibold text-ink leading-snug">
                  {study.metricLabel}
                </h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-ink-muted">
                  By introducing AI-native automation, the team eliminated manual search-and-fix tasks, moving straight from ticket to resolution.
                </p>
              </div>
            </div>

            {/* Challenge / Solution Columns */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider text-ink font-bold pb-2 border-b border-border">
                  The Challenge
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">
                  {study.challenge}
                </p>
              </div>
              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider text-ink font-bold pb-2 border-b border-border">
                  The Solution
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">
                  {study.solution}
                </p>
              </div>
            </div>

            {/* Results & Quote */}
            <div className="mt-16 border-t border-border/80 pt-12 space-y-10">
              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider text-ink font-bold mb-4">
                  The Results
                </h3>
                <p className="text-[15.5px] leading-relaxed text-ink/90 font-medium">
                  {study.result}
                </p>
              </div>

              <blockquote className="rounded-xl border border-border bg-card p-6 md:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 font-sans text-8xl text-accent/5 pointer-events-none select-none leading-none">
                  “
                </div>
                <p className="text-[15px] italic leading-relaxed text-ink-muted relative z-10">
                  "{study.quote}"
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center text-[12px] font-bold text-accent">
                    {study.quoteAuthor.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="text-[13.5px] font-semibold text-ink">{study.quoteAuthor}</div>
                    <div className="text-[12px] text-ink-muted">{study.quoteRole}</div>
                  </div>
                </div>
              </blockquote>
            </div>

          </div>
        </Container>
      </section>
    </>
  );
}
