import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';

const quotes = [
  {
    quote:
      'Puku is the first tool where I stopped feeling the seams between design, code, and deploy. It feels like one thing.',
    author: 'Anya Reyes',
    role: 'VP Engineering · Helio',
  },
  {
    quote:
      'Our shipping velocity doubled in a quarter, not because we wrote faster, but because nothing got lost between steps.',
    author: 'Marcus Chen',
    role: 'CTO · Nimbus',
  },
  {
    quote:
      'The CLI understands our codebase better than most of our team. It feels like cheating.',
    author: 'Priya Shah',
    role: 'Staff Engineer · Forge',
  },
  {
    quote:
      'Puku replaced five internal tools and one entire platform team worth of glue code.',
    author: 'Liam Park',
    role: 'Head of Platform · Atlas',
  },
  {
    quote:
      'It is the calmest, most thoughtful product in our stack. It never asks for attention — it just gets things done.',
    author: 'Sofía Núñez',
    role: 'Design Engineer · Mira',
  },
  {
    quote:
      'We onboarded 90 engineers in two days. They all said the same thing: it is obvious.',
    author: 'Theo Bramwell',
    role: 'Director of DX · Quanta',
  },
];

export const Testimonials = () => {
  return (
    <section className="relative py-24 md:py-32">
      <Container>
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <Eyebrow className="justify-center">What teams say</Eyebrow>
          <h2 className="mt-5 font-display text-display-lg md:text-display-xl font-medium tracking-tight">
            Teams are switching to Puku.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {quotes.map((q) => (
            <figure
              key={q.author}
              className="rounded-2xl border border-border bg-surface p-6 transition-all duration-200 hover:border-accent/40 hover:shadow-card"
            >
              <blockquote className="text-[15px] leading-relaxed text-ink">
                <span aria-hidden className="mr-1 text-accent font-mono font-bold">“</span>
                {q.quote}
                <span aria-hidden className="ml-1 text-accent font-mono font-bold">”</span>
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-accent text-bg flex items-center justify-center text-[12px] font-semibold">
                  {q.author
                     .split(' ')
                     .map((p) => p[0])
                     .join('')}
                </div>
                <div>
                  <div className="text-[13.5px] font-medium">{q.author}</div>
                  <div className="text-[12px] text-ink-muted">{q.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
};