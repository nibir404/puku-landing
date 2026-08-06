import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { motion } from 'framer-motion';
import { staggerChild, staggerParent } from '@/lib/motion';

const points = [
  {
    n: '01',
    title: 'Software has fragmented.',
    body:
      'Designers draw in one app. Engineers write in another. Terminals run in a third. Deploys happen in a fourth. Nothing talks to anything else. Every handoff is a context reset.',
  },
  {
    n: '02',
    title: 'AI made it worse.',
    body:
      'AI is now bolted into every tool separately. Each tool has its own model, its own context, its own idea of what you are building. The result is more tools, more noise, and more re-explaining.',
  },
  {
    n: '03',
    title: 'The next decade demands a platform.',
    body:
      'AI will not live inside one app. It will live across the entire workflow. We need a single surface where design, code, terminal, cloud, and team context all converge.',
  },
];

export const Why = () => {
  return (
    <section className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-radial-glow" />
      <Container className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 lg:sticky lg:top-32 self-start">
            <Eyebrow>The shift</Eyebrow>
            <h2 className="mt-5 font-display text-display-lg font-medium tracking-tight">
              Engineering needs a new foundation.
            </h2>
            <p className="mt-6 text-base md:text-lg leading-relaxed text-ink-muted">
              For thirty years, every new tool has been another tab. Every
              AI feature has been another checkbox. We are not adding more.
              We are starting over.
            </p>
            <div className="mt-8 inline-flex items-center gap-3 rounded-lg border border-border bg-white px-4 py-2 text-[12.5px] text-ink-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-ink animate-pulse" />
              The era of the disconnected toolchain is over.
            </div>
          </div>

          <motion.div
            className="lg:col-span-7 flex flex-col gap-5"
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            {points.map((p) => (
              <motion.div
                key={p.n}
                variants={staggerChild}
                className="group rounded-2xl border border-border bg-white p-6 md:p-8 transition-colors hover:shadow-card"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-[12px] text-ink-muted">{p.n}</span>
                  <h3 className="font-display text-xl md:text-2xl font-medium tracking-tight">
                    {p.title}
                  </h3>
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-ink-muted md:pl-10">
                  {p.body}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
};