import { Container } from '@/components/ui/Container';
import { DotConstellation } from './visuals/DotConstellation';

export const Debug = () => {
  return (
    <section className="relative py-16 md:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative order-2 lg:order-1">
            <DotConstellation />
          </div>

          <div className="max-w-xl order-1 lg:order-2 lg:justify-self-end">
            <h2 className="font-display text-[36px] sm:text-[44px] md:text-[52px] font-medium tracking-tight leading-[1.1] text-ink">
              Debug any problem down to a line of{' '}
              <span className="text-ink-muted">code, and make sure it never happens again</span>
            </h2>
            <p className="mt-8 text-[15px] leading-relaxed text-ink-muted max-w-md">
              The first-of-its-kind agentic system that can understand and
              predict state in large distributed codebases
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};