import { Container } from '@/components/ui/Container';

const logos = [
  { src: '/6ecd316a-4c95-4582-8a91-a4e5c1ee879b.svg', alt: 'AUST' },
  { src: '/0ff98364-d587-4ea1-8312-94fb7c8e14bb.svg', alt: 'UIU' },
  { src: '/873bc898-b15b-4e80-8e6f-5f07f0292a15.svg', alt: 'BRAC' },
  { src: '/7ba3661a-ccbb-45f8-b3fc-dccfacc159fc.svg', alt: 'SUST' },
  { src: '/4c429b94-fef3-4d98-a7a7-4c0dbff414d3.svg', alt: 'IUB' },
  { src: '/b15b232f-6578-4773-84ef-90a90450d4fb.svg', alt: 'BUP' },
  { src: '/702f46f0-04d2-4409-88ad-87a07716b2c2.svg', alt: 'Daffodil' },
  { src: '/3df278ac-b7f7-4041-8e76-8f5bcc89014e.svg', alt: 'UAP' },
  { src: '/c898d421-863d-48d4-afb6-ebe41d2ab349.svg', alt: 'Metropolitan' },
  { src: '/cae7dc9b-7569-4c01-8c69-3ddf6e680b15.svg', alt: 'Leading' },
  { src: '/ec9a5986-6724-46bb-a69a-2ea509fbdf49.svg', alt: 'Southeast' },
];

export const Mosaic = () => {
  return (
    <section className="py-16 bg-bg border-t border-border/60">
      <Container>
        <div className="mx-auto max-w-4xl text-center mb-10">
          <p className="text-[13px] font-semibold tracking-wider text-ink-muted uppercase">
            Trusted by engineering teams, AI startups, and global universities
          </p>
        </div>

        <div className="mx-auto max-w-5xl flex flex-wrap items-center justify-center gap-x-12 gap-y-8 opacity-60 filter grayscale hover:opacity-100 hover:filter-none transition-all duration-300">
          {logos.map((l) => (
            <img
              key={l.alt}
              src={l.src}
              alt={l.alt}
              className="h-8 w-auto object-contain"
            />
          ))}
        </div>
      </Container>
    </section>
  );
};