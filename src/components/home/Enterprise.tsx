import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ButtonLink } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { easeOut } from '@/lib/motion';

const features = [
  { label: 'SSO', detail: 'SAML, OIDC, SCIM' },
  { label: 'Audit logs', detail: 'Tamper-evident, streaming' },
  { label: 'Self-host', detail: 'Air-gapped deployments' },
  { label: 'Custom models', detail: 'BYO + private endpoints' },
  { label: 'Compliance', detail: 'SOC 2 · ISO 27001 · HIPAA' },
  { label: 'Policies', detail: 'Branch, file, and secret rules' },
];

export const Enterprise = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-radial-purple opacity-60" />
      <Container className="relative">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <Eyebrow>Enterprise</Eyebrow>
            <h2 className="mt-5 font-display text-display-lg font-medium tracking-tight">
              Built for the most demanding teams.
            </h2>
            <p className="mt-6 text-base md:text-lg leading-relaxed text-ink-muted">
              Puku meets the bar of enterprise security, governance, and scale —
              without slowing your engineers down. Deploy on our cloud, in your
              VPC, or fully air-gapped.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <ButtonLink to="/enterprise" variant="primary" size="md" arrow="right">
                Talk to sales
              </ButtonLink>
              <ButtonLink to="/enterprise" variant="secondary" size="md" arrow="none">
                Read security overview
              </ButtonLink>
            </div>
          </div>

          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: easeOut }}
          >
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {features.map((f) => (
                <div
                  key={f.label}
                  className="rounded-2xl border border-border bg-surface p-5 transition-all duration-200 hover:border-accent/40 hover:shadow-card"
                >
                  <div className="font-mono text-base font-semibold uppercase tracking-wider text-ink">{f.label}</div>
                  <div className="mt-1.5 text-[13.5px] text-ink-muted">{f.detail}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};