import { ReactNode } from 'react';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ChatMockup } from './visuals/ChatMockup';
import { DashboardMockup } from './visuals/DashboardMockup';
import { MarketingMockup } from './visuals/MarketingMockup';
import { AgentMockup } from './visuals/AgentMockup';
import { Terminal, Cpu } from 'lucide-react';

type Feature = {
  number: string;
  title: string;
  body: string;
  visual: ReactNode;
};

const features: Feature[] = [
  {
    number: '01',
    title: 'AI That Understands Your Project',
    body: 'Puku analyzes your entire codebase instead of just the current file. It understands architecture, dependencies, APIs, coding conventions, and project history to provide more accurate AI assistance.',
    visual: <ChatMockup />,
  },
  {
    number: '02',
    title: 'Agentic Development',
    body: "Assign complete engineering tasks instead of writing long prompts. Puku's intelligent agents plan, execute, verify, and improve their own work with minimal supervision.",
    visual: <DashboardMockup />,
  },
  {
    number: '03',
    title: 'Persistent Project Memory',
    body: 'Your AI never starts from scratch. Every interaction strengthens project knowledge, making future assistance smarter and more personalized.',
    visual: <MarketingMockup />,
  },
  {
    number: '04',
    title: 'Multi-Model Intelligence',
    body: 'Automatically route requests to the best AI model for coding, reasoning, documentation, or debugging.',
    visual: <AgentMockup />,
  },
];

export const FeatureRows = () => {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="mx-auto max-w-3xl text-center mb-24">
          <Eyebrow className="justify-center">Why Puku</Eyebrow>
          <h2 className="mt-5 font-sans text-display-lg font-bold tracking-tight text-ink">
            Designed for Modern Software Engineering
          </h2>
        </div>
      </Container>

      <div className="space-y-32 md:space-y-40">
        {features.map((f, i) => (
          <FeatureRow key={f.number} feature={f} reverse={i % 2 === 1} />
        ))}
      </div>

      <Container className="mt-32">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Feature 5 */}
          <div className="rounded-2xl border border-border bg-surface p-8 shadow-sm hover:border-accent/30 transition-all duration-200">
            <div className="h-10 w-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-6">
              <Terminal className="h-5 w-5" />
            </div>
            <h3 className="font-sans text-xl font-bold text-ink">Integrated Terminal</h3>
            <p className="mt-3 text-[14.5px] leading-relaxed text-ink-muted">
              Execute commands, install dependencies, debug environments, and automate workflows directly inside Puku.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="rounded-2xl border border-border bg-surface p-8 shadow-sm hover:border-accent/30 transition-all duration-200">
            <div className="h-10 w-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-6">
              <Cpu className="h-5 w-5" />
            </div>
            <h3 className="font-sans text-xl font-bold text-ink">Developer First Experience</h3>
            <p className="mt-3 text-[14.5px] leading-relaxed text-ink-muted">
              Fast startup, lightweight performance, keyboard-first navigation, and zero unnecessary distractions.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

const FeatureRow = ({ feature, reverse }: { feature: Feature; reverse: boolean }) => (
  <Container>
    <div className={`grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center ${reverse ? 'lg:[direction:rtl]' : ''}`}>
      <div
        className="lg:col-span-7 [direction:ltr]"
        data-aos={reverse ? 'fade-left' : 'fade-right'}
      >
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-accent">
            {feature.number}
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="text-[11px] font-semibold text-ink-muted uppercase tracking-wider">Why Puku</span>
        </div>
        <h3 className="mt-4 font-sans text-2xl md:text-3xl font-bold tracking-tight text-ink">
          {feature.title}
        </h3>
        <p className="mt-5 text-[15px] sm:text-[16px] leading-relaxed text-ink-muted max-w-md">
          {feature.body}
        </p>
      </div>

      <div className="lg:col-span-5 [direction:ltr]">
        {feature.visual}
      </div>
    </div>
  </Container>
);