import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { motion } from 'framer-motion';
import { easeOut } from '@/lib/motion';

const steps = [
  { name: 'Idea', product: 'You', desc: 'A thought becomes a brief.' },
  { name: 'Design', product: 'Puku Design', desc: 'Interface emerges from intent.' },
  { name: 'Code', product: 'Puku Editor', desc: 'Architecture paired with AI.' },
  { name: 'Run', product: 'Puku CLI', desc: 'Terminal anticipates the next move.' },
  { name: 'Deploy', product: 'Puku Cloud', desc: 'Live in 12 regions in seconds.' },
  { name: 'Collaborate', product: 'Puku Co-work', desc: 'Team and agents in one room.' },
  { name: 'Monitor', product: 'Puku App', desc: 'Approve from anywhere.' },
];

export const Workflow = () => {
  return (
    <section className="relative py-24 md:py-32">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow className="justify-center">The connected workflow</Eyebrow>
          <h2 className="mt-5 font-display text-display-lg md:text-display-xl font-medium tracking-tight">
            Six products. One continuous story.
          </h2>
          <p className="mt-6 text-base md:text-lg leading-relaxed text-ink-muted">
            Every step in building software belongs to the same workflow. Puku
            stitches them together so context never resets, and shipping never
            stops.
          </p>
        </div>

        <div className="relative mx-auto mt-20 max-w-5xl">
          <div className="pointer-events-none absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent md:left-1/2" />
          <ol className="space-y-10">
            {steps.map((s, i) => (
              <motion.li
                key={s.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease: easeOut, delay: i * 0.04 }}
                className={`relative grid grid-cols-12 items-start gap-6`}
              >
                <div className="col-span-12 md:col-span-5 md:col-start-1">
                  {i % 2 === 0 ? (
                    <StepCard s={s} align="right" />
                  ) : (
                    <div className="hidden md:block" />
                  )}
                </div>

                <div className="hidden md:flex col-span-2 items-center justify-center">
                  <div className="relative z-10 h-3 w-3 rounded-full bg-ink shadow-pill" />
                </div>

                <div className="col-span-12 md:col-span-5">
                  {i % 2 === 1 ? (
                    <StepCard s={s} align="left" />
                  ) : (
                    <div className="md:hidden">
                      <StepCard s={s} align="left" />
                    </div>
                  )}
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
};

const StepCard = ({
  s,
  align,
}: {
  s: { name: string; product: string; desc: string };
  align: 'left' | 'right';
}) => (
  <div
    className={`rounded-2xl border border-border bg-white p-5 ${
      align === 'right' ? 'md:text-right' : ''
    }`}
  >
    <div className="text-[11px] uppercase tracking-wider text-ink-muted">{s.name}</div>
    <div className="mt-1 font-display text-lg font-medium">{s.product}</div>
    <div className="mt-1 text-[13.5px] text-ink-muted">{s.desc}</div>
  </div>
);