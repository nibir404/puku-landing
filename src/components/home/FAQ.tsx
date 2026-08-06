import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Plus, Minus } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';

const faqs = [
  {
    q: 'Is Puku an AI code editor?',
    a: 'No. Puku is an AI-native engineering platform. The editor is one of six products. Puku unifies design, code, terminal, cloud, collaboration, and mobile into a single connected workspace.',
  },
  {
    q: 'How is Puku different from VS Code + Copilot?',
    a: 'VS Code is a fantastic editor. Puku is a platform. Puku understands your design tokens, your infrastructure, your deployment history, and your team decisions — and it carries that context across every product. Nothing is bolted on.',
  },
  {
    q: 'Can I use Puku with my existing tools?',
    a: 'Yes. Puku is built on open standards. You can use our components, our CLI, or our SDKs inside your existing stack. Puku plays well with GitHub, Linear, Figma, Postgres, Stripe, and the rest of your tools.',
  },
  {
    q: 'Is my code private?',
    a: 'Your code never leaves your machine unless you choose. Puku runs on-device AI by default. When you ask the cloud for help, your code is encrypted in transit and never stored. Enterprise plans offer air-gapped deployments.',
  },
  {
    q: 'Does Puku replace my whole team?',
    a: 'No. Puku amplifies the team you have. It removes glue work, reduces context switching, and helps every engineer — junior or principal — operate at the level of your best.',
  },
  {
    q: 'How does pricing work?',
    a: 'Free for individuals. Pro is $20 per user per month. Team is $40 per user per month. Enterprise is custom. No usage-based surprises. No hidden fees.',
  },
  {
    q: 'Which platforms are supported?',
    a: 'macOS, Windows, and Linux for the Editor and CLI. Cloud runs on our global edge and your AWS/GCP account. Design and Cowork run in any modern browser. App is on iOS and Android.',
  },
  {
    q: 'When does Puku 1.0 ship?',
    a: 'Puku is available today. Download the editor to get started, or sign up for the platform to access Co-work, Cloud, and the full suite.',
  },
];

export const FAQ = () => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative py-24 md:py-32">
      <Container size="narrow">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <Eyebrow className="justify-center">Questions</Eyebrow>
          <h2 className="mt-5 font-display text-display-lg md:text-display-xl font-medium tracking-tight">
            Everything you wanted to ask.
          </h2>
        </div>

        <div className="rounded-2xl border border-border bg-surface">
          {faqs.map((f, i) => (
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
                animate={{
                  height: open === i ? 'auto' : 0,
                  opacity: open === i ? 1 : 0,
                }}
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
      </Container>
    </section>
  );
};