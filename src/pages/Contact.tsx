import { useState } from 'react';
import { SEO } from '@/components/layout/SEO';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ButtonLink } from '@/components/ui/Button';

const reasons = [
  { name: 'Sales', desc: 'Talk to us about Puku for your team or enterprise.' },
  { name: 'Support', desc: 'Get help from our team on an existing Puku account.' },
  { name: 'Press', desc: 'Media inquiries, interviews, and brand assets.' },
  { name: 'Partnerships', desc: 'Integrations, technology partners, and resellers.' },
];

export default function Contact() {
  const [reason, setReason] = useState('Sales');
  return (
    <>
      <SEO title="Contact — Puku" description="Talk to the Puku team." />
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 -z-10 bg-radial-glow" />
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow className="justify-center">Contact</Eyebrow>
            <h1 className="mt-5 font-display text-display-xl font-medium tracking-tight">
              Let's <span className="text-gradient">talk.</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-muted">
              Tell us a little about what you have in mind. We will get back to you within one business day.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-[3fr_2fr]">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="rounded-2xl border border-border bg-surface p-7 shadow-card"
            >
              <div className="flex flex-wrap gap-2">
                {reasons.map((r) => (
                  <button
                    key={r.name}
                    type="button"
                    onClick={() => setReason(r.name)}
                    className={`rounded-lg border px-3.5 py-1.5 text-[12.5px] transition-all ${
                      reason === r.name
                        ? 'border-accent bg-accent text-bg font-semibold'
                        : 'border-border bg-card text-ink-muted hover:border-accent/30'
                    }`}
                  >
                    {r.name}
                  </button>
                ))}
              </div>

              <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2">
                <Field label="Full name" placeholder="Avery Chen" />
                <Field label="Work email" placeholder="avery@company.com" type="email" />
              </div>
              <div className="mt-4">
                <Field label="Company" placeholder="Northwind" />
              </div>
              <div className="mt-4">
                <label className="block text-[12.5px] font-medium text-ink-muted">Tell us more</label>
                <textarea
                  rows={5}
                  placeholder="A few sentences about what you have in mind."
                  className="mt-2 w-full rounded-lg border border-border bg-bg px-3.5 py-2.5 text-[13.5px] text-ink placeholder:text-ink-dim focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink"
                />
              </div>

              <div className="mt-7 flex items-center justify-between">
                <span className="text-[11.5px] text-ink-muted">By submitting, you agree to our privacy policy.</span>
                <ButtonLink to="/contact" arrow="right">Send message</ButtonLink>
              </div>
            </form>

            <div className="space-y-3">
              <InfoCard title="Email" body="hello@puku.dev" />
              <InfoCard title="Sales" body="sales@puku.dev" />
              <InfoCard title="Support" body="support@puku.dev" />
              <InfoCard title="Press" body="press@puku.dev" />
              <InfoCard title="HQ" body="Pier 33, San Francisco, CA" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function Field({ label, placeholder, type = 'text' }: { label: string; placeholder: string; type?: string }) {
  return (
    <div>
      <label className="block text-[12.5px] font-medium text-ink-muted">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full rounded-lg border border-border bg-card px-3.5 py-2.5 text-[13.5px] text-ink placeholder:text-ink-dim focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
      />
    </div>
  );
}

function InfoCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5 hover:border-accent/20 transition-colors">
      <div className="text-[11px] font-semibold uppercase tracking-wider text-accent">{title}</div>
      <div className="mt-1.5 text-[14px] text-ink font-mono">{body}</div>
    </div>
  );
}