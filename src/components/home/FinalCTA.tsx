import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';

export const FinalCTA = () => {
  return (
    <section className="relative py-32 md:py-40 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-radial-glow" />
      <Container className="relative text-center">
        <h2 className="mx-auto max-w-3xl font-sans text-display-xl font-bold tracking-tight text-ink">
          Start Building with Puku Today
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-ink-muted">
          Download Puku and experience the next generation of AI-powered software engineering.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <ButtonLink to="/download" size="lg" arrow="right">
            Download Now
          </ButtonLink>
          <ButtonLink to="/docs" variant="secondary" size="lg" arrow="none">
            View Documentation
          </ButtonLink>
        </div>
        <div className="mt-6 text-[12.5px] text-ink-muted">
          Free for individuals · Open beta for teams · Enterprise on request
        </div>
      </Container>
    </section>
  );
};