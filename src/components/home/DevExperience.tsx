import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Stat } from '@/components/ui/Callout';
import { motion } from 'framer-motion';
import { easeOut } from '@/lib/motion';

const stats = [
  { value: '12ms', label: 'Median input latency', hint: 'GPU-accelerated rendering' },
  { value: '99.99%', label: 'Workspace uptime', hint: 'Multi-region active-active' },
  { value: '4.9★', label: 'Developer rating', hint: 'Across 18,400 reviews' },
  { value: '< 80MB', label: 'Installer size', hint: 'macOS · Windows · Linux' },
];

export const DevExperience = () => {
  return (
    <section className="relative py-24 md:py-32">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow className="justify-center">Developer experience</Eyebrow>
          <h2 className="mt-5 font-display text-display-lg md:text-display-xl font-medium tracking-tight">
            Engineered to disappear.
          </h2>
          <p className="mt-6 text-base md:text-lg leading-relaxed text-ink-muted">
            The best tool is the one you stop noticing. Puku is built around
            invisible performance, zero-config onboarding, and a keyboard-first
            feel that rewards focus.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: easeOut }}
          className="mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-3 md:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-border bg-surface p-6 hover:border-accent/30 transition-all duration-200">
              <Stat value={s.value} label={s.label} hint={s.hint} />
            </div>
          ))}
        </motion.div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-3 md:grid-cols-3">
          {[
            { t: 'Keyboard-first', d: 'Every action has a binding. The command palette is the UI.' },
            { t: 'Local-first', d: 'Your files, your machine. Sync is optional and end-to-end encrypted.' },
            { t: 'Extensible', d: 'A real extension API, a real CLI, and a real plugin marketplace.' },
          ].map((f) => (
            <div key={f.t} className="rounded-2xl border border-border bg-surface p-6 hover:border-accent/30 transition-all duration-200">
              <div className="font-mono text-sm uppercase tracking-wider font-semibold text-ink">{f.t}</div>
              <p className="mt-2 text-[14px] text-ink-muted">{f.d}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};