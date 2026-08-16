import { useState } from 'react';
import { SEO } from '@/components/layout/SEO';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';

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
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-white border-b border-[#E5E5E8]">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow className="justify-center">Contact</Eyebrow>
            <h1 className="mt-5 font-display text-4xl sm:text-5xl font-semibold tracking-tight text-[#0F0F11]">
              Let's <span className="text-[#6E56CF]">talk.</span>
            </h1>
            <p className="mt-6 text-[16px] leading-relaxed text-[#4A4A52] font-normal">
              Tell us a little about what you have in mind. We will get back to you within one business day.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-[3fr_2fr]">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="rounded-[2px] border border-[#E5E5E8] bg-white p-7 shadow-none text-left"
            >
              <div className="flex flex-wrap gap-2">
                {reasons.map((r) => (
                  <button
                    key={r.name}
                    type="button"
                    onClick={() => setReason(r.name)}
                    className={`rounded-[2px] border px-4 py-2 text-[13px] font-semibold min-h-[44px] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6E56CF] ${
                      reason === r.name
                        ? 'border-[#6E56CF] bg-[#6E56CF] text-white shadow-none'
                        : 'border-[#E5E5E8] bg-[#FAFAFC] text-[#0F0F11] hover:border-[#6E56CF]'
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
                <label className="block text-[14px] font-semibold text-[#0F0F11]">Tell us more</label>
                <textarea
                  rows={5}
                  placeholder="A few sentences about what you have in mind."
                  className="mt-2 w-full rounded-[2px] border border-[#E5E5E8] bg-white px-3.5 py-2.5 text-[15px] text-[#0F0F11] placeholder-[#4A4A52] focus:border-[#6E56CF] focus:outline-none focus:ring-2 focus:ring-[#6E56CF] transition-colors"
                />
              </div>

              <div className="mt-7 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-[13px] text-[#4A4A52] font-normal">By submitting, you agree to our privacy policy.</span>
                <Button type="submit" variant="primary" size="md" arrow="right">
                  Send message
                </Button>
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
      <label className="block text-[14px] font-semibold text-[#0F0F11]">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full min-h-[44px] rounded-[2px] border border-[#E5E5E8] bg-white px-3.5 py-2.5 text-[15px] text-[#0F0F11] placeholder-[#4A4A52] focus:border-[#6E56CF] focus:outline-none focus:ring-2 focus:ring-[#6E56CF] transition-colors"
      />
    </div>
  );
}

function InfoCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-[2px] border border-[#E5E5E8] bg-[#FAFAFC] p-5 hover:border-[#6E56CF] transition-colors shadow-none text-left">
      <div className="text-[11px] font-semibold uppercase tracking-wider text-[#6E56CF]">{title}</div>
      <div className="mt-1.5 text-[14px] text-[#0F0F11] font-mono font-semibold">{body}</div>
    </div>
  );
}