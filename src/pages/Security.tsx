import { SEO } from '@/components/layout/SEO';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ButtonLink } from '@/components/ui/Button';
import { CtaBanner } from '@/components/layout/CtaBanner';
import { ShieldCheck, HardDrive, Cpu, Terminal, Key } from 'lucide-react';

const policies = [
  {
    title: 'Local-First Indexing',
    desc: 'Code analysis and vector embeddings creation happen entirely on your local machine. AST parsing indexes the codebase offline, and embeddings are stored inside your project folder.',
    icon: <HardDrive className="h-5 w-5 text-accent" />
  },
  {
    title: 'Model Execution Boundaries',
    desc: 'When using remote large language models, Puku transmits only relevant code snippets inside the context window. Your source files are never cached, saved, or used for model training by model partners.',
    icon: <Cpu className="h-5 w-5 text-accent" />
  },
  {
    title: 'CLI Sandboxing',
    desc: 'Commands suggested by AI agents are intercepted before executing. The runtime parses file touches and environment variables, requiring an explicit manual confirm (y/N) before launching in your terminal.',
    icon: <Terminal className="h-5 w-5 text-accent" />
  },
  {
    title: 'Encryption & Keys',
    desc: 'In-transit connections use TLS 1.3. For teams, shared indices are encrypted using AES-256. Enterprise deployments can use private key management systems (KMS).',
    icon: <Key className="h-5 w-5 text-accent" />
  }
];

export default function Security() {
  return (
    <>
      <SEO title="Security Architecture — Puku" description="Learn how Puku protects your codebase and runtime environments." />
      
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-[#f5f5f7]">
        <div className="absolute inset-0 -z-10 bg-radial-glow" />
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow className="justify-center">Security Overview</Eyebrow>
            <h1 className="mt-5 font-display text-display-xl font-medium tracking-tight">
              Enterprise-grade <span className="text-gradient">code security.</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-muted">
              Puku is engineered from the ground up to protect your IP. By coupling local-first computation with transparent user approval, your security policies are never compromised.
            </p>
            <div className="mt-8 flex justify-center gap-6">
              <ButtonLink to="/contact" arrow="right">Request security whitepaper</ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 bg-bg">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-16">
            <Eyebrow className="justify-center">Core Security Pillars</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-medium">Protecting your code at every stage.</h2>
          </div>
          
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
            {policies.map((p) => (
              <div key={p.title} className="rounded-2xl border border-border bg-surface p-7 hover:border-accent/35 transition-colors">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card">
                  {p.icon}
                </div>
                <h3 className="mt-4 font-mono text-sm font-semibold uppercase tracking-wider text-ink">{p.title}</h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-ink-muted">{p.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 bg-[#f5f5f7]">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-12">
            <Eyebrow className="justify-center">Compliance</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-medium">SOC 2 Type II & Compliance Ready</h2>
            <p className="mt-4 text-ink-muted">
              We undergo regular third-party audits to verify that our operations match industry-leading security practices.
            </p>
          </div>
          
          <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="border border-border bg-bg p-6 rounded-xl text-center hover:border-accent/20 transition-colors">
              <div className="font-mono text-xs font-bold text-ink uppercase tracking-wider">SOC 2 Type II</div>
              <div className="mt-1 text-[11px] text-ink-muted">Certified Audit</div>
            </div>
            <div className="border border-border bg-bg p-6 rounded-xl text-center hover:border-accent/20 transition-colors">
              <div className="font-mono text-xs font-bold text-ink uppercase tracking-wider">ISO 27001</div>
              <div className="mt-1 text-[11px] text-ink-muted">Infosec Compliant</div>
            </div>
            <div className="border border-border bg-bg p-6 rounded-xl text-center hover:border-accent/20 transition-colors">
              <div className="font-mono text-xs font-bold text-ink uppercase tracking-wider">GDPR</div>
              <div className="mt-1 text-[11px] text-ink-muted">Data Protection</div>
            </div>
            <div className="border border-border bg-bg p-6 rounded-xl text-center hover:border-accent/20 transition-colors">
              <div className="font-mono text-xs font-bold text-ink uppercase tracking-wider">HIPAA</div>
              <div className="mt-1 text-[11px] text-ink-muted">Health Data Safe</div>
            </div>
          </div>
        </Container>
      </section>

      <CtaBanner primaryCtaText="Request security whitepaper" secondaryCtaText="Contact sales" />
    </>
  );
}
