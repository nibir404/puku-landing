import { Link } from 'react-router-dom';
import { SEO } from '@/components/layout/SEO';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ButtonLink } from '@/components/ui/Button';
import { CtaBanner } from '@/components/layout/CtaBanner';

const featured = {
  category: 'Engineering',
  title: 'Designing the agent-native IDE',
  excerpt: 'How we rebuilt the editor from scratch so it feels native to engineers and AI agents alike.',
  author: 'Avery Chen',
  date: 'Jan 12, 2026',
  readTime: '8 min',
  href: '/blog/agent-native-ide',
};

const posts = [
  {
    category: 'Product',
    title: 'Introducing Puku Cloud',
    excerpt: 'A global edge designed for AI workloads. GPU pools, queues, and vector DBs out of the box.',
    author: 'Maya Singh',
    date: 'Jan 8, 2026',
    readTime: '5 min',
    href: '/blog/introducing-puku-cloud',
  },
  {
    category: 'Engineering',
    title: 'How we typecheck TypeScript at 12k files/sec',
    excerpt: 'A look at the incremental type-check pipeline that powers Puku Code Intelligence.',
    author: 'Theo Park',
    date: 'Dec 30, 2025',
    readTime: '12 min',
    href: '/blog/typescript-perf',
  },
  {
    category: 'Design',
    title: 'Tokens that travel',
    excerpt: 'Why we chose a token-first architecture for Puku Design, and how it changed our workflow.',
    author: 'Lia Okafor',
    date: 'Dec 21, 2025',
    readTime: '6 min',
    href: '/blog/tokens-that-travel',
  },
  {
    category: 'Research',
    title: 'On-device agents in production',
    excerpt: 'A field report on running 200k on-device inference calls per day without burning laptops.',
    author: 'Ravi Patel',
    date: 'Dec 14, 2025',
    readTime: '9 min',
    href: '/blog/on-device-agents',
  },
  {
    category: 'Company',
    title: 'Why we built Puku',
    excerpt: 'The story behind the platform — and the future we are building toward.',
    author: 'Daniel Reyes',
    date: 'Dec 2, 2025',
    readTime: '4 min',
    href: '/blog/why-puku',
  },
  {
    category: 'Engineering',
    title: 'Cramming 47 agents into one editor',
    excerpt: 'How we built the multi-agent runtime that lets you collaborate with AI as if it were a team.',
    author: 'Maya Singh',
    date: 'Nov 24, 2025',
    readTime: '11 min',
    href: '/blog/multi-agent-runtime',
  },
];

export default function Blog() {
  return (
    <>
      <SEO title="Blog — Puku" description="News, engineering deep dives, and product updates from the Puku team." />
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="absolute inset-0 -z-10 bg-radial-purple" />
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow className="justify-center">Blog</Eyebrow>
            <h1 className="mt-5 font-display text-display-xl font-medium tracking-tight">
              Field notes from the <span className="text-gradient">Puku team.</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-muted">
              Engineering deep dives, design decisions, and product updates.
            </p>
          </div>
        </Container>
      </section>

      <section className="pb-12">
        <Container>
          <Link
            to={featured.href}
            className="group mx-auto block max-w-5xl overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-200 hover:border-accent/40 hover:shadow-card"
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="aspect-[5/3] bg-pixel-dots" />
              <div className="p-8 md:p-10">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#6E56CF]">{featured.category}</div>
                <h2 className="mt-3 font-mono text-lg font-bold leading-tight text-[#0F0F11] md:text-xl uppercase tracking-wider">
                  {featured.title}
                </h2>
                <p className="mt-4 text-[14.5px] leading-relaxed text-[#333338]">{featured.excerpt}</p>
                <div className="mt-6 flex items-center gap-3 text-[12.5px] font-medium text-[#4A4A52]">
                  <span>{featured.author}</span>
                  <span>·</span>
                  <span>{featured.date}</span>
                  <span>·</span>
                  <span>{featured.readTime} read</span>
                </div>
              </div>
            </div>
          </Link>
        </Container>
      </section>

      <section className="pb-32">
        <Container>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <Link
                key={p.title}
                to={p.href}
                className="group block overflow-hidden rounded-2xl border border-[#E5E5E8] bg-white p-6 transition-all duration-200 hover:border-[#6E56CF]"
              >
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#6E56CF]">{p.category}</div>
                <h3 className="mt-3 font-mono text-sm font-bold leading-snug text-[#0F0F11] uppercase tracking-wider">{p.title}</h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-[#333338]">{p.excerpt}</p>
                <div className="mt-5 flex items-center gap-2 text-[12px] font-medium text-[#4A4A52]">
                  <span>{p.author}</span>
                  <span>·</span>
                  <span>{p.readTime}</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mx-auto mt-16 max-w-3xl text-center">
            <ButtonLink to="/blog/archive" arrow="right">Browse the archive</ButtonLink>
          </div>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}