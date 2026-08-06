import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';

export const Performance = () => {
  return (
    <section className="relative py-24 md:py-32 bg-bg border-y border-border">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>Performance & security</Eyebrow>
            <h2 className="mt-5 font-display text-display-lg font-medium tracking-tight">
              Fast where it matters. Private by default.
            </h2>
            <p className="mt-6 text-base md:text-lg leading-relaxed text-ink-muted">
              Puku runs native code where possible, defers heavy work to the
              edge, and never sends your source code to a model unless you ask
              it to. You own your data. Always.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              { t: 'End-to-end encryption', d: 'Zero-knowledge sync for sensitive workspaces.' },
              { t: 'On-device AI', d: 'Local model inference with privacy mode by default.' },
              { t: 'Native rendering', d: 'GPU-accelerated UI with zero jank at 120Hz.' },
              { t: 'Global edge', d: '12 regions, intelligent routing, sub-50ms p95.' },
              { t: 'Audit-ready', d: 'Detailed activity logs and policy enforcement.' },
              { t: 'Open SDK', d: 'Public APIs and first-party clients in every language.' },
            ].map((f) => (
              <div key={f.t} className="rounded-2xl border border-border bg-surface p-5 hover:border-accent/30 transition-all duration-200">
                <div className="font-mono text-sm uppercase tracking-wider font-semibold text-ink">{f.t}</div>
                <div className="mt-1 text-[13px] text-ink-muted">{f.d}</div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};