import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { easeOut } from '@/lib/motion';

const products = [
  {
    key: 'editor',
    name: 'Puku Editor',
    href: '/products/editor',
    desc: 'AI-native code editor for building, understanding, and shipping software.',
    glyph: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path d="M9 8 4 12l5 4M15 8l5 4-5 4M13 6l-2 12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: 'cli',
    name: 'Puku CLI',
    href: '/products/cli',
    desc: 'Intelligent terminal that understands projects and automates workflows.',
    glyph: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path d="M4 7l5 5-5 5M12 17h8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: 'cloud',
    name: 'Puku Cloud',
    href: '/products/cloud',
    desc: 'Infrastructure for deploying, running, and scaling AI-powered apps.',
    glyph: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path d="M7 18a4 4 0 1 1 .8-7.9A6 6 0 0 1 19 12a4 4 0 0 1-1 7H7z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: 'design',
    name: 'Puku Design',
    href: '/products/design',
    desc: 'Collaborative design workspace connecting product, UX, and engineering.',
    glyph: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    ),
  },
  {
    key: 'cowork',
    name: 'Puku Co-work',
    href: '/products/cowork',
    desc: 'Real-time space where developers, designers, and AI agents work together.',
    glyph: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="17" cy="13" r="2.5" stroke="currentColor" strokeWidth="1.7" />
        <path d="M3 19a6 6 0 0 1 12 0M14 19a4 4 0 0 1 7 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: 'app',
    name: 'Puku App',
    href: '/products/app',
    desc: 'Mobile companion for monitoring, notifications, and approvals on the go.',
    glyph: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <rect x="7" y="2.5" width="10" height="19" rx="2" stroke="currentColor" strokeWidth="1.7" />
        <path d="M11 18.5h2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
  },
];

export const Ecosystem = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-line-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <Container className="relative">
        <div className="mb-14 max-w-3xl">
          <Eyebrow>The ecosystem</Eyebrow>
          <h2 className="mt-5 font-display text-display-lg md:text-display-xl font-medium tracking-tight">
            Six products. One platform. Nothing disconnected.
          </h2>
          <p className="mt-6 text-base md:text-lg leading-relaxed text-ink-muted">
            Each product is best in class on its own. Together, they form one
            platform with shared memory, shared agents, and shared state —
            ready for the way modern teams actually build.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <motion.div
              key={p.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: easeOut, delay: i * 0.05 }}
            >
              <Link
                to={p.href}
                className="group relative block overflow-hidden rounded-2xl border border-border bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card"
              >
                <div className="flex items-center justify-between">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-ink text-white">
                    {p.glyph}
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-ink-muted transition-all group-hover:text-ink group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
                <h3 className="mt-5 font-display text-xl font-medium">{p.name}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">{p.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};