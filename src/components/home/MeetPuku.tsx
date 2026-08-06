import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { motion } from 'framer-motion';
import { easeOut } from '@/lib/motion';

export const MeetPuku = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-radial-glow" />
      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          <Eyebrow className="justify-center">Meet Puku</Eyebrow>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: easeOut }}
            className="mt-5 font-display text-display-xl font-medium tracking-tight"
          >
            One platform where every part of{' '}
            <span className="text-gradient">software comes together.</span>
          </motion.h2>
          <p className="mt-7 text-base md:text-lg leading-relaxed text-ink-muted">
            Puku is not an AI feature you turn on. It is the workspace itself —
            a single connected environment where every artifact, every agent,
            and every teammate shares the same understanding of what you are
            building.
          </p>
        </div>

        <div className="mx-auto mt-20 grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-3">
          {[
            {
              label: 'Unified context',
              body: 'Design, code, infrastructure, and team decisions stay in one memory — never re-explained.',
            },
            {
              label: 'Agent-native',
              body: 'Agents are first-class citizens. They plan, draft, review, test, deploy, and observe.',
            },
            {
              label: 'Built for teams',
              body: 'Real-time multiplayer across the entire workflow. On desktop and on the go.',
            },
          ].map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: easeOut, delay: i * 0.08 }}
              className="group rounded-2xl border border-border bg-white p-6 transition-colors hover:shadow-card"
            >
              <div className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-bg">
                <span className="h-1.5 w-1.5 rounded-full bg-ink" />
              </div>
              <h3 className="font-display text-lg font-medium">{c.label}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">{c.body}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};