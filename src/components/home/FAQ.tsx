import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
    <section className="relative py-24 md:py-32 bg-white border-t border-[#E5E5E8]">
      <Container size="narrow">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <Eyebrow className="justify-center">Questions</Eyebrow>
          <h2 className="mt-5 font-display text-[32px] sm:text-[44px] font-semibold tracking-tight text-[#0F0F11]">
            Everything you wanted to ask.
          </h2>
        </div>

        <div className="rounded-[2px] border border-[#E5E5E8] bg-white shadow-none divide-y divide-[#E5E5E8]">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="block w-full text-left">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 md:px-8 hover:bg-[#FAFAFC] transition-colors text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6E56CF] focus-visible:ring-offset-2"
                >
                  <span className="font-sans text-[16px] font-semibold text-[#0F0F11]">
                    {f.q}
                  </span>
                  <span className="text-[#6E56CF] shrink-0">
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden bg-[#FAFAFC]"
                    >
                      <div className="px-6 pb-6 md:px-8 md:pb-7 text-[16px] leading-relaxed font-normal text-[#4A4A52]">
                        {f.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};