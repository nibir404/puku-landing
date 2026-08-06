import { SEO } from '@/components/layout/SEO';
import { ProductPage } from '@/components/product/ProductPage';
import { CloudVisual } from '@/components/home/visuals/CloudVisual';

const glyph = (
  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
    <path d="M7 18a4 4 0 1 1 .8-7.9A6 6 0 0 1 19 12a4 4 0 0 1-1 7H7z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);

export default function Cloud() {
  return (
    <>
      <SEO
        title="Puku Cloud — Deploy AI-powered apps globally"
        description="Infrastructure for deploying, running, and scaling AI-powered applications globally."
      />
      <ProductPage
        name="Puku Cloud"
        color="from-[#7AD8C5] to-[#A4ABFF]"
        glyph={glyph}
        tagline="Cloud Infrastructure Built for AI Engineering"
        description="Keep projects synchronized across devices while maintaining secure, organization-wide AI knowledge."
        bullets={[
          'Workspace Synchronization',
          'Shared Project Memory',
          'Team Collaboration',
          'Enterprise Permissions',
          'Version History',
          'Secure Storage',
          'Cloud Workspaces',
        ]}
        problem={{
          title: 'Cloud has become a maze of YAML.',
          body:
            'Kubernetes, ingress, IAM, secrets, observability, scaling — every team reinvents the same scaffolding. Puku gives you the substrate you actually need: a single config, a single deploy command, and a global edge that runs it for you.',
        }}
        howItWorks={[
          { step: '01', title: 'Write a puku.toml', body: 'A tiny config file describes your service, environment, and dependencies. No YAML forests.' },
          { step: '02', title: 'puku deploy', body: 'Puku builds, tests, and ships to the global edge. Rolls forward, rolls back, on demand.' },
          { step: '03', title: 'Monitor live', body: 'Real-time metrics, traces, and logs. Pinpoint a regression to a single commit in seconds.' },
          { step: '04', title: 'Scale on demand', body: 'From 1 to 1000 instances in seconds. CPU, GPU, memory — all primitives you can request.' },
        ]}
        visual={<CloudVisual />}
        demo={
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="text-[11px] uppercase tracking-wider text-ink-dim">puku.toml</div>
              <pre className="mt-3 overflow-x-auto font-mono text-[12.5px] leading-[1.7] text-ink">
{`[service]
name = "checkout"
runtime = "node@20"
entry = "services/checkout.ts"

[regions]
edge = ["us", "eu", "ap", "sa", "af"]

[scale]
min = 1
max = 12
cpu = "0.5"
memory = "512MB"

[ai]
gpu = "A100"
queue = "checkout-events"`}
              </pre>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="text-[11px] uppercase tracking-wider text-ink-dim">Live status</div>
              <ul className="mt-3 space-y-2 text-[13.5px]">
                <li className="flex items-center justify-between"><span className="text-ink-muted">us-east</span><span className="text-accent font-semibold">live · 38ms</span></li>
                <li className="flex items-center justify-between"><span className="text-ink-muted">eu-west</span><span className="text-accent font-semibold">live · 35ms</span></li>
                <li className="flex items-center justify-between"><span className="text-ink-muted">ap-east</span><span className="text-accent font-semibold">live · 44ms</span></li>
                <li className="flex items-center justify-between"><span className="text-ink-muted">sa-east</span><span className="text-accent font-semibold">live · 52ms</span></li>
              </ul>
              <div className="mt-5 inline-flex items-center gap-2 rounded-md bg-accent/10 px-2 py-1 text-[11.5px] text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                0 errors · 0.00% error rate
              </div>
            </div>
          </div>
        }
        workflow={[
          'puku init to scaffold a service from your design.',
          'puku deploy to ship to a global edge in seconds.',
          'Puku monitors traffic, scales, and surfaces regressions.',
          'puku rollback to revert to any prior deploy in one command.',
        ]}
        performance={[
          { value: '38ms', label: 'p95 latency (global edge)' },
          { value: '12', label: 'Regions on launch' },
          { value: '99.99%', label: 'SLA on Team plans' },
          { value: '8s', label: 'Median build-to-deploy' },
        ]}
        integrations={[
          { name: 'AWS', category: 'Cloud' },
          { name: 'GCP', category: 'Cloud' },
          { name: 'Azure', category: 'Cloud' },
          { name: 'Cloudflare', category: 'Edge' },
          { name: 'Postgres', category: 'Database' },
          { name: 'Redis', category: 'Cache' },
          { name: 'S3', category: 'Storage' },
          { name: 'Stripe', category: 'Payments' },
        ]}
        faq={[
          { q: 'Do I have to use Puku Cloud?', a: 'No. Puku runs on AWS, GCP, Azure, or your own data center. You can also self-host Puku fully.' },
          { q: 'How do I deploy?', a: 'puku deploy. That is the entire command. Puku builds, tests, and ships your service to every region you enabled.' },
          { q: 'What about AI workloads?', a: 'Puku Cloud includes GPU pools, queues, vector DBs, and inference primitives — designed for AI workloads.' },
        ]}
        cta={{ primary: 'Start free on Puku Cloud', secondary: 'Read the docs' }}
        crossLinks={[
          { name: 'Puku CLI', href: '/products/cli', desc: 'Deploy from any shell, anywhere.' },
          { name: 'Puku Editor', href: '/products/editor', desc: 'One keystroke to ship from the editor.' },
          { name: 'Puku App', href: '/products/app', desc: 'Monitor and approve deploys on the go.' },
        ]}
      />
    </>
  );
}