import { useEffect, useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { Terminal } from '@/components/ui/Terminal';
import { CodeBlock } from '@/components/ui/CodeBlock';

const tabs = [
  { key: 'plan', label: 'Plan' },
  { key: 'code', label: 'Generate' },
  { key: 'test', label: 'Test' },
  { key: 'deploy', label: 'Deploy' },
];

const code = `export async function checkout(input: CheckoutInput) {
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: await cart.lineItems(input.cartId),
    customer_email: input.email,
    success_url: input.successUrl,
    cancel_url: input.cancelUrl,
    metadata: { userId: input.userId },
  });

  await db.orders.create({
    id: session.id,
    userId: input.userId,
    status: 'pending',
    amount: session.amount_total,
  });

  return { url: session.url! };
}`;

const terminalScript = [
  '$ puku cloud deploy ./services/checkout',
  '→ reading config…',
  '→ building image (esbuild · 1.2s)',
  '→ running 24 tests · 24 passed',
  '→ uploading to puku edge (12 regions)',
  '✓ live at checkout.puku.app',
  'p95 38ms · error rate 0.00% · ready',
];

export const InteractiveDemo = () => {
  const [active, setActive] = useState('plan');

  useEffect(() => {
    const id = setInterval(() => {
      setActive((a) => tabs[(tabs.findIndex((t) => t.key === a) + 1) % tabs.length].key);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-40 [mask-image:linear-gradient(180deg,transparent,black,transparent)]" />
      <Container className="relative">
        <div className="mb-14 max-w-3xl">
          <Eyebrow>Watch it work</Eyebrow>
          <h2 className="mt-4 font-display text-display-lg font-medium tracking-tight">
            From idea to production in one continuous flow.
          </h2>
          <p className="mt-5 text-base md:text-lg leading-relaxed text-ink-muted">
            Puku doesn't hand work between tools. It carries context. Watch a
            single idea become a designed interface, generated code, passing
            tests, and a live deployment without ever leaving the workspace.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-border bg-white shadow-card">
          <div className="flex items-center gap-1 border-b border-border bg-bg px-4 py-3 overflow-x-auto no-scrollbar">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                className={cn(
                  'flex items-center gap-2 rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors whitespace-nowrap',
                  active === t.key
                    ? 'bg-ink text-white'
                    : 'text-ink-muted hover:text-ink',
                )}
              >
                <span
                  className={cn(
                    'h-1.5 w-1.5 rounded-full',
                    active === t.key ? 'bg-white' : 'bg-ink-dim',
                  )}
                />
                {t.label}
              </button>
            ))}
            <div className="ml-auto font-mono text-[11.5px] text-ink-muted">
              step {tabs.findIndex((t) => t.key === active) + 1} of {tabs.length}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="border-r border-border bg-white p-5 md:p-6">
              {active === 'plan' && <PlanView />}
              {active === 'code' && (
                <CodeBlock
                  code={code}
                  language="ts"
                  filename="services/checkout.ts"
                  highlightLines={[4, 5, 6, 7, 8]}
                />
              )}
              {active === 'test' && (
                <Terminal
                  title="puku test"
                  lines={[
                    { prompt: '$', text: 'puku test ./services/checkout.ts' },
                    { prompt: '→', text: 'compiling 24 specs', type: 'dim' },
                    { prompt: '✓', text: 'creates checkout session', type: 'ok' },
                    { prompt: '✓', text: 'persists pending order', type: 'ok' },
                    { prompt: '✓', text: 'returns session url', type: 'ok' },
                    { prompt: '✓', text: 'passes 24/24 · 0.41s', type: 'ok' },
                  ]}
                />
              )}
              {active === 'deploy' && <Terminal title="puku · cloud" typing={terminalScript} />}
            </div>

            <div className="bg-bg p-5 md:p-8">
              <ContextPanel stage={active} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

const PlanView = () => (
  <div className="rounded-2xl border border-border bg-white p-5">
    <div className="mb-4 flex items-center justify-between">
      <div className="text-[13px] font-medium text-ink">Implementation plan</div>
      <div className="text-[11px] text-ink-muted">generated in 1.4s</div>
    </div>
    <ol className="space-y-3 text-[13.5px]">
      {[
        { n: 1, t: 'Define CheckoutInput type with cart, email, userId' },
        { n: 2, t: 'Create Stripe checkout session with metadata' },
        { n: 3, t: 'Persist pending order in db.orders' },
        { n: 4, t: 'Return session URL to caller' },
        { n: 5, t: 'Add 4 unit tests covering happy path + errors' },
        { n: 6, t: 'Deploy to puku edge with autoscale 1–4' },
      ].map((s) => (
        <li key={s.n} className="flex items-start gap-3">
          <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full border border-border bg-bg text-[11px] font-medium text-ink">
            {s.n}
          </span>
          <span className="text-ink">{s.t}</span>
        </li>
      ))}
    </ol>
  </div>
);

const ContextPanel = ({ stage }: { stage: string }) => {
  const items: Record<string, { label: string; value: string }[]> = {
    plan: [
      { label: 'Intent', value: 'Add checkout flow with Stripe' },
      { label: 'Files', value: '4 files · 132 lines' },
      { label: 'Risks', value: 'Stripe webhook retries' },
      { label: 'Owner', value: 'Avery · Backend' },
    ],
    code: [
      { label: 'Generated', value: '38 lines · types + logic' },
      { label: 'Imports', value: 'stripe · db · cart' },
      { label: 'Tests', value: 'auto-generated · 4 specs' },
      { label: 'Reviewer', value: 'Puku · 0 issues' },
    ],
    test: [
      { label: 'Specs', value: '24 / 24 passed' },
      { label: 'Coverage', value: '98.4%' },
      { label: 'Time', value: '0.41s' },
      { label: 'Flakes', value: 'none' },
    ],
    deploy: [
      { label: 'Region', value: '12 edges · global' },
      { label: 'Latency', value: 'p95 38ms' },
      { label: 'Errors', value: '0.00%' },
      { label: 'URL', value: 'checkout.puku.app' },
    ],
  };
  return (
    <div className="flex h-full flex-col gap-6">
      <div>
        <div className="text-[11px] uppercase tracking-wider text-ink-muted">Project context</div>
        <div className="mt-2 font-display text-2xl font-medium tracking-tight">
          Outpost · checkout service
        </div>
        <p className="mt-2 text-[13.5px] leading-relaxed text-ink-muted">
          Puku carries the entire project context — design tokens, environment,
          policies, dependencies, and team conventions — into every step.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {items[stage].map((i) => (
          <div key={i.label} className="rounded-xl border border-border bg-white p-3.5">
            <div className="text-[10.5px] uppercase tracking-wider text-ink-muted">{i.label}</div>
            <div className="mt-1 text-[14px] text-ink">{i.value}</div>
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-border bg-white p-4">
        <div className="text-[11px] uppercase tracking-wider text-ink-muted">Live activity</div>
        <ul className="mt-2 space-y-1.5 text-[13px] text-ink-muted">
          <li>· Puku generated plan · 1.4s</li>
          <li>· Generated code · 38 lines</li>
          <li>· Ran tests · 24/24 passed</li>
          <li>· Pushed to edge · 12 regions</li>
        </ul>
      </div>
    </div>
  );
};