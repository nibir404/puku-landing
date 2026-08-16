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
      <section className="relative overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32 bg-white border-b border-[#E5E5E8]">
        <Container className="relative">
          <motion.div
            variants={staggerParent}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center text-left"
          >
            <div className="lg:col-span-7">
              <motion.div variants={staggerChild}>
                <div className="inline-flex items-center gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-[2px] bg-[#6E56CF] text-white">
                    {p.glyph}
                  </div>
                  <Eyebrow>{p.name}</Eyebrow>
                </div>
              </motion.div>
              <motion.h1
                variants={staggerChild}
                className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#0F0F11] leading-[1.08]"
              >
                {p.tagline}
              </motion.h1>
              <motion.p
                variants={staggerChild}
                className="mt-6 max-w-2xl text-[16px] leading-relaxed text-[#4A4A52] font-normal"
              >
                {p.description}
              </motion.p>
              <motion.ul
                variants={staggerParent}
                className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2"
              >
                {p.bullets.map((b) => (
                  <motion.li
                    key={b}
                    variants={staggerChild}
                    className="flex items-center gap-2.5 text-[15px] font-semibold text-[#0F0F11]"
                  >
                    <Check className="h-4 w-4 text-[#6E56CF] shrink-0" strokeWidth={2.2} />
                    <span>{b}</span>
                  </motion.li>
                ))}
              </motion.ul>
              <motion.div
                variants={staggerChild}
                className="mt-10 flex flex-col sm:flex-row items-center gap-6 w-full max-w-md"
              >
                <ButtonLink to="/signup" size="lg" arrow="right" className="w-full sm:w-[190px] shrink-0">
                  {p.cta.primary}
                </ButtonLink>
                <ButtonLink to="/docs" variant="secondary" size="lg" arrow="none" className="w-full sm:w-[190px] shrink-0">
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
  <section className={`relative py-24 md:py-32 bg-white ${className}`}>
    <Container>{children}</Container>
  </section>
);

const ProblemSection = ({ title, body }: { title: string; body: string }) => (
  <SectionShell className="bg-[#FAFAFC]">
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 text-left">
      <div className="lg:col-span-5">
        <Eyebrow>The problem</Eyebrow>
        <h2 className="mt-5 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#0F0F11]">
          {title}
        </h2>
      </div>
      <div className="lg:col-span-7">
        <p className="text-[16px] leading-relaxed text-[#4A4A52] font-normal">{body}</p>
      </div>
    </div>
  </SectionShell>
);

const DemoSection = ({ visual }: { visual: ReactNode }) => (
  <SectionShell className="border-y border-[#E5E5E8] bg-white">
    <div className="mb-10 max-w-3xl text-left">
      <Eyebrow>See it in action</Eyebrow>
      <h2 className="mt-5 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#0F0F11]">
        Designed for the way you actually work.
      </h2>
    </div>
    {visual}
  </SectionShell>
);

const HowItWorks = ({ steps }: { steps: { step: string; title: string; body: string }[] }) => (
  <SectionShell className="bg-[#FAFAFC]">
    <div className="mb-12 max-w-3xl text-left">
      <Eyebrow>How it works</Eyebrow>
      <h2 className="mt-5 font-display text-3xl sm:text-4xl font-semibold text-[#0F0F11] tracking-tight">
        A clear mental model. A single workflow.
      </h2>
    </div>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 text-left">
      {steps.map((s) => (
        <motion.div
          key={s.step}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: easeOut }}
          className="rounded-[2px] border border-[#E5E5E8] bg-white p-6 hover:border-[#6E56CF] transition-colors shadow-none"
        >
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#6E56CF]">{s.step}</div>
          <div className="mt-2 font-sans text-lg font-semibold text-[#0F0F11]">{s.title}</div>
          <p className="mt-3 text-[16px] leading-relaxed text-[#4A4A52] font-normal">{s.body}</p>
        </motion.div>
      ))}
    </div>
  </SectionShell>
);

const WorkflowSection = ({ items }: { items: string[] }) => (
  <SectionShell className="border-y border-[#E5E5E8] bg-white">
    <div className="mb-12 max-w-3xl text-left">
      <Eyebrow>Real workflow</Eyebrow>
      <h2 className="mt-5 font-display text-3xl sm:text-4xl font-semibold text-[#0F0F11] tracking-tight">
        From the moment you open the editor to the moment it ships.
      </h2>
    </div>
    <ol className="grid grid-cols-1 gap-4 md:grid-cols-2 text-left">
      {items.map((t, i) => (
        <li key={i} className="flex items-start gap-4 rounded-[2px] border border-[#E5E5E8] bg-[#FAFAFC] p-5 hover:border-[#6E56CF] transition-colors shadow-none">
          <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-[2px] border border-[#E5E5E8] bg-white text-[12px] font-bold text-[#6E56CF]">
            {i + 1}
          </span>
          <span className="text-[16px] leading-relaxed text-[#4A4A52] font-normal">{t}</span>
        </li>
      ))}
    </ol>
  </SectionShell>
);

const PerformanceSection = ({ items }: { items: { value: string; label: string; hint?: string }[] }) => (
  <SectionShell className="bg-[#FAFAFC]">
    <div className="mb-12 max-w-3xl text-left">
      <Eyebrow>Performance</Eyebrow>
      <h2 className="mt-5 font-display text-3xl sm:text-4xl font-semibold text-[#0F0F11] tracking-tight">
        Numbers that matter.
      </h2>
    </div>
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 text-left">
      {items.map((s) => (
        <div key={s.label} className="rounded-[2px] border border-[#E5E5E8] bg-white p-6 hover:border-[#6E56CF] transition-colors shadow-none">
          <div className="font-mono text-3xl font-bold tracking-tight text-[#6E56CF]">{s.value}</div>
          <div className="mt-2 text-[15px] text-[#0F0F11] font-semibold">{s.label}</div>
          {s.hint && <div className="mt-2 text-[13px] text-[#4A4A52] font-normal">{s.hint}</div>}
        </div>
      ))}
    </div>
  </SectionShell>
);

const IntegrationsSection = ({ items }: { items: { name: string; category: string }[] }) => (
  <SectionShell className="border-y border-[#E5E5E8] bg-white">
    <div className="mb-12 max-w-3xl text-left">
      <Eyebrow>Integrations</Eyebrow>
      <h2 className="mt-5 font-display text-3xl sm:text-4xl font-semibold text-[#0F0F11] tracking-tight">
        Works with your stack. Plays well with everyone.
      </h2>
    </div>
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 text-left">
      {items.map((i) => (
        <div key={i.name} className="rounded-[2px] border border-[#E5E5E8] bg-[#FAFAFC] p-5 hover:border-[#6E56CF] transition-colors shadow-none">
          <div className="font-sans text-base font-semibold text-[#0F0F11]">{i.name}</div>
          <div className="text-[13px] text-[#4A4A52] font-normal mt-1">{i.category}</div>
        </div>
      ))}
    </div>
  </SectionShell>
);

const CrossLinks = ({ links }: { links: { name: string; href: string; desc: string }[] }) => (
  <SectionShell className="bg-[#FAFAFC]">
    <div className="mb-10 max-w-3xl text-left">
      <Eyebrow>Connects to</Eyebrow>
      <h2 className="mt-5 font-display text-3xl sm:text-4xl font-semibold text-[#0F0F11] tracking-tight">
        Better together. As part of Puku.
      </h2>
    </div>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 text-left">
      {links.map((l) => (
        <Link
          key={l.name}
          to={l.href}
          className="group rounded-[2px] border border-[#E5E5E8] bg-white p-6 transition-all duration-200 hover:border-[#6E56CF] shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6E56CF]"
        >
          <div className="flex items-center justify-between">
            <div className="font-sans text-base font-semibold text-[#0F0F11]">{l.name}</div>
            <ArrowUpRight className="h-4 w-4 text-[#6E56CF] transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
          <p className="mt-3 text-[16px] text-[#4A4A52] font-normal leading-relaxed">{l.desc}</p>
        </Link>
      ))}
    </div>
  </SectionShell>
);

const FAQSection = ({ items }: { items: { q: string; a: string }[] }) => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <SectionShell className="bg-white">
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <Eyebrow className="justify-center">FAQ</Eyebrow>
        <h2 className="mt-5 font-display text-3xl sm:text-4xl font-semibold text-[#0F0F11] tracking-tight">
          Frequently asked questions.
        </h2>
      </div>
      <div className="mx-auto max-w-3xl rounded-[2px] border border-[#E5E5E8] bg-white shadow-none text-left">
        {items.map((f, i) => (
          <div
            key={f.q}
            className={cn(
              'block w-full text-left transition-colors',
              i !== 0 && 'border-t border-[#E5E5E8]',
            )}
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              className="flex w-full items-center justify-between gap-6 px-6 py-5 md:px-8 hover:bg-[#FAFAFC] transition-colors text-left font-semibold min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6E56CF]"
            >
              <div className="font-sans text-base font-semibold text-[#0F0F11]">
                {f.q}
              </div>
              <span className="text-[#6E56CF]">
                {open === i ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </span>
            </button>
            <motion.div
              initial={false}
              animate={{ height: open === i ? 'auto' : 0, opacity: open === i ? 1 : 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 md:px-8 md:pb-7 text-[16px] leading-relaxed text-[#4A4A52] font-normal bg-[#FAFAFC]/50">
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