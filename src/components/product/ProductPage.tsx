import { ReactNode, useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ButtonLink } from '@/components/ui/Button';
import { CtaBanner } from '@/components/layout/CtaBanner';
import { motion } from 'framer-motion';
import { easeOut, staggerChild, staggerParent } from '@/lib/motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check, Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/cn';

type ProductPageProps = {
  name: string;
  color: string;
  glyph: ReactNode;
  tagline: string;
  description: string;
  bullets: string[];
  problem: { title: string; body: string };
  howItWorks: { step: string; title: string; body: string }[];
  visual: ReactNode;
  demo: ReactNode;
  workflow: string[];
  performance: { value: string; label: string; hint?: string }[];
  integrations: { name: string; category: string }[];
  faq: { q: string; a: string }[];
  cta: { primary: string; secondary: string };
  crossLinks: { name: string; href: string; desc: string }[];
};

export const ProductPage = (p: ProductPageProps) => {
  return (
    <>
      <section className="relative overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32 bg-bg">
        <div className="pointer-events-none absolute inset-0 bg-line-grid opacity-20 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <Container className="relative">
          <motion.div
            variants={staggerParent}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center"
          >
            <div className="lg:col-span-7">
              <motion.div variants={staggerChild}>
                <div className="inline-flex items-center gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-bg">
                    {p.glyph}
                  </div>
                  <Eyebrow>{p.name}</Eyebrow>
                </div>
              </motion.div>
              <motion.h1
                variants={staggerChild}
                className="mt-6 font-display text-display-xl md:text-display-2xl font-medium tracking-tight"
              >
                {p.tagline}
              </motion.h1>
              <motion.p
                variants={staggerChild}
                className="mt-7 max-w-2xl text-base md:text-lg leading-relaxed text-ink-muted"
              >
                {p.description}
              </motion.p>
              <motion.ul
                variants={staggerParent}
                className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-2"
              >
                {p.bullets.map((b) => (
                  <motion.li
                    key={b}
                    variants={staggerChild}
                    className="flex items-start gap-2.5 text-[14.5px] text-ink"
                  >
                    <Check className="mt-0.5 h-4 w-4 text-accent" strokeWidth={2.2} />
                    {b}
                  </motion.li>
                ))}
              </motion.ul>
              <motion.div
                variants={staggerChild}
                className="mt-10 flex flex-col sm:flex-row items-center gap-6"
              >
                <ButtonLink to="/download" size="lg" arrow="right">
                  {p.cta.primary}
                </ButtonLink>
                <ButtonLink to="/docs" variant="secondary" size="lg" arrow="none">
                  {p.cta.secondary}
                </ButtonLink>
              </motion.div>
            </div>

            <motion.div
              variants={staggerChild}
              className="lg:col-span-5"
            >
              {p.visual}
            </motion.div>
          </motion.div>
        </Container>
      </section>

      <ProblemSection {...p.problem} />

      <DemoSection visual={p.demo} />

      <HowItWorks steps={p.howItWorks} />

      <WorkflowSection items={p.workflow} />

      <PerformanceSection items={p.performance} />

      <IntegrationsSection items={p.integrations} />

      <CrossLinks links={p.crossLinks} />

      <FAQSection items={p.faq} />

      <ProductCTA primary={p.cta.primary} />
    </>
  );
};

const SectionShell = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <section className={`relative py-24 md:py-32 bg-bg ${className}`}>
    <Container>{children}</Container>
  </section>
);

const ProblemSection = ({ title, body }: { title: string; body: string }) => (
  <SectionShell>
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <Eyebrow>The problem</Eyebrow>
        <h2 className="mt-5 font-display text-display-md md:text-display-lg font-medium tracking-tight">
          {title}
        </h2>
      </div>
      <div className="lg:col-span-7">
        <p className="text-base md:text-lg leading-relaxed text-ink-muted">{body}</p>
      </div>
    </div>
  </SectionShell>
);

const DemoSection = ({ visual }: { visual: ReactNode }) => (
  <SectionShell className="border-y border-border/60">
    <div className="mb-10 max-w-3xl">
      <Eyebrow>See it in action</Eyebrow>
      <h2 className="mt-5 font-display text-display-md md:text-display-lg font-medium tracking-tight">
        Designed for the way you actually work.
      </h2>
    </div>
    {visual}
  </SectionShell>
);

const HowItWorks = ({ steps }: { steps: { step: string; title: string; body: string }[] }) => (
  <SectionShell>
    <div className="mb-12 max-w-3xl">
      <Eyebrow>How it works</Eyebrow>
      <h2 className="mt-5 font-display text-display-md md:text-display-lg font-medium tracking-tight">
        A clear mental model. A single workflow.
      </h2>
    </div>
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {steps.map((s) => (
        <motion.div
          key={s.step}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: easeOut }}
          className="rounded-2xl border border-border bg-surface p-6 hover:border-accent/20 transition-colors"
        >
          <div className="text-[11px] font-semibold uppercase tracking-wider text-accent">{s.step}</div>
          <div className="mt-1 font-mono text-lg font-semibold uppercase tracking-wide text-ink">{s.title}</div>
          <p className="mt-3 text-[14.5px] leading-relaxed text-ink-muted">{s.body}</p>
        </motion.div>
      ))}
    </div>
  </SectionShell>
);

const WorkflowSection = ({ items }: { items: string[] }) => (
  <SectionShell className="border-y border-border/60">
    <div className="mb-12 max-w-3xl">
      <Eyebrow>Real workflow</Eyebrow>
      <h2 className="mt-5 font-display text-display-md md:text-display-lg font-medium tracking-tight">
        From the moment you open the editor to the moment it ships.
      </h2>
    </div>
    <ol className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {items.map((t, i) => (
        <li key={i} className="flex items-start gap-4 rounded-2xl border border-border bg-surface p-5 hover:border-accent/20 transition-colors">
          <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-card text-[12px] font-semibold text-accent">
            {i + 1}
          </span>
          <span className="text-[14.5px] leading-relaxed text-ink-muted">{t}</span>
        </li>
      ))}
    </ol>
  </SectionShell>
);

const PerformanceSection = ({ items }: { items: { value: string; label: string; hint?: string }[] }) => (
  <SectionShell>
    <div className="mb-12 max-w-3xl">
      <Eyebrow>Performance</Eyebrow>
      <h2 className="mt-5 font-display text-display-md md:text-display-lg font-medium tracking-tight">
        Numbers that matter.
      </h2>
    </div>
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {items.map((s) => (
        <div key={s.label} className="rounded-2xl border border-border bg-surface p-6 hover:border-accent/20 transition-colors">
          <div className="font-mono text-3xl font-bold tracking-tight text-accent">{s.value}</div>
          <div className="mt-1 text-[13.5px] text-ink-muted font-medium">{s.label}</div>
          {s.hint && <div className="mt-2 text-[12px] text-ink-dim">{s.hint}</div>}
        </div>
      ))}
    </div>
  </SectionShell>
);

const IntegrationsSection = ({ items }: { items: { name: string; category: string }[] }) => (
  <SectionShell className="border-y border-border/60">
    <div className="mb-12 max-w-3xl">
      <Eyebrow>Integrations</Eyebrow>
      <h2 className="mt-5 font-display text-display-md md:text-display-lg font-medium tracking-tight">
        Works with your stack. Plays well with everyone.
      </h2>
    </div>
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
      {items.map((i) => (
        <div key={i.name} className="rounded-2xl border border-border bg-surface p-5 hover:border-accent/20 transition-colors">
          <div className="font-mono text-sm uppercase tracking-wide font-semibold text-ink">{i.name}</div>
          <div className="text-[12.5px] text-ink-muted mt-1">{i.category}</div>
        </div>
      ))}
    </div>
  </SectionShell>
);

const CrossLinks = ({ links }: { links: { name: string; href: string; desc: string }[] }) => (
  <SectionShell>
    <div className="mb-10 max-w-3xl">
      <Eyebrow>Connects to</Eyebrow>
      <h2 className="mt-5 font-display text-display-md md:text-display-lg font-medium tracking-tight">
        Better together. As part of Puku.
      </h2>
    </div>
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
      {links.map((l) => (
        <Link
          key={l.name}
          to={l.href}
          className="group rounded-2xl border border-border bg-surface p-6 transition-all duration-200 hover:border-accent/40 hover:shadow-card"
        >
          <div className="flex items-center justify-between">
            <div className="font-mono text-sm font-semibold uppercase tracking-wider text-ink">{l.name}</div>
            <ArrowUpRight className="h-4 w-4 text-accent transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
          <p className="mt-2 text-[13.5px] text-ink-muted">{l.desc}</p>
        </Link>
      ))}
    </div>
  </SectionShell>
);

const FAQSection = ({ items }: { items: { q: string; a: string }[] }) => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <SectionShell>
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <Eyebrow className="justify-center">FAQ</Eyebrow>
        <h2 className="mt-5 font-display text-display-md md:text-display-lg font-medium tracking-tight">
          Frequently asked questions.
        </h2>
      </div>
      <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-surface">
        {items.map((f, i) => (
          <div
            key={f.q}
            className={cn(
              'block w-full text-left transition-colors',
              i !== 0 && 'border-t border-border',
            )}
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between gap-6 px-6 py-5 md:px-8 hover:bg-card/50 transition-colors text-left"
            >
              <div className="font-mono text-sm uppercase tracking-wider font-semibold text-ink">
                {f.q}
              </div>
              <span className="text-accent">
                {open === i ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </span>
            </button>
            <motion.div
              initial={false}
              animate={{ height: open === i ? 'auto' : 0, opacity: open === i ? 1 : 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 md:px-8 md:pb-7 text-[14.5px] leading-relaxed text-ink-muted bg-card/20">
                {f.a}
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </SectionShell>
  );
};

const ProductCTA = ({ primary }: { primary: string }) => (
  <CtaBanner primaryCtaText={primary} />
);