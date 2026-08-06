import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';

const logos = [
  'Nimbus', 'Linear', 'Helio', 'Atlas', 'Mira', 'Forge', 'Quanta',
  'Lumen', 'Cobalt', 'Vertex', 'Aether', 'Northwind', 'Helix', 'Orbit',
];

export const TrustedBy = () => {
  return (
    <section className="relative py-16 md:py-20 border-y border-border bg-bg">
      <Container>
        <div className="flex flex-col items-center gap-8 text-center">
          <Eyebrow className="text-ink-muted">Trusted by engineering teams shipping faster</Eyebrow>
        </div>
      </Container>

      <div className="marquee mt-10 overflow-hidden">
        <div className="flex w-max items-center gap-16 px-6 animate-drift">
          {[...logos, ...logos].map((l, i) => (
            <div
              key={`${l}-${i}`}
              className="font-display text-2xl font-medium text-ink/70 hover:text-ink transition-colors whitespace-nowrap"
            >
              {l}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};