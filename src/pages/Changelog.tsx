import { useState } from 'react';
import { SEO } from '@/components/layout/SEO';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { CtaBanner } from '@/components/layout/CtaBanner';
import { cn } from '@/lib/cn';
import { Search, Mail, Twitter, Rss } from 'lucide-react';

type Highlight = {
  type: 'new' | 'improved' | 'fixed';
  product: 'editor' | 'cli' | 'cloud' | 'design' | 'cowork' | 'app';
  text: string;
};

type Release = {
  version: string;
  date: string;
  title: string;
  image: string;
  highlights: Highlight[];
};

const releases: Release[] = [
  {
    version: '2026.1.0',
    date: '14 Jan 2026',
    title: 'Puku Cloud GA',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&h=450&q=80',
    highlights: [
      { type: 'new', product: 'cloud', text: 'Puku Cloud GA: global edge, GPU pools, queues.' },
      { type: 'new', product: 'editor', text: 'Custom agents: define prompts, tools, and permissions.' },
      { type: 'new', product: 'app', text: 'Puku App 2.0 with redesigned notification model.' },
      { type: 'improved', product: 'editor', text: 'Editor type-check performance improved 38% on large repos.' },
      { type: 'fixed', product: 'editor', text: 'Resolved a rare crash when editing very large files (>10k lines).' },
    ],
  },
  {
    version: '2025.12.1',
    date: '19 Dec 2025',
    title: 'Puku Co-work & Storybook',
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&h=450&q=80',
    highlights: [
      { type: 'new', product: 'cowork', text: 'Puku Cowork: shared canvases with AI agents as collaborators.' },
      { type: 'new', product: 'editor', text: 'Native Storybook integration.' },
      { type: 'improved', product: 'editor', text: 'Faster incremental indexing on first repo open.' },
      { type: 'fixed', product: 'design', text: 'Resolved a regression in the design tokens export.' },
    ],
  },
  {
    version: '2025.12.0',
    date: '4 Dec 2025',
    title: 'Puku Design & CLI 2.0',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&h=450&q=80',
    highlights: [
      { type: 'new', product: 'design', text: 'Puku Design: canvas + tokens + code in one workspace.' },
      { type: 'new', product: 'cli', text: 'Puku CLI 2.0 with a redesigned command surface.' },
      { type: 'improved', product: 'editor', text: 'Lower CPU usage during idle on-device inference.' },
    ],
  },
  {
    version: '2025.11.2',
    date: '18 Nov 2025',
    title: 'Smart Agent History',
    image: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&w=800&h=450&q=80',
    highlights: [
      { type: 'improved', product: 'editor', text: 'Smarter agent suggestions based on commit history.' },
      { type: 'fixed', product: 'editor', text: 'Resolved a memory leak on long-running agent sessions.' },
      { type: 'fixed', product: 'cloud', text: 'Fixed cloud sync conflicts in offline-first mode.' },
    ],
  },
  {
    version: '2025.11.0',
    date: '1 Nov 2025',
    title: 'Local Agents & Audit Logs',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&h=450&q=80',
    highlights: [
      { type: 'new', product: 'editor', text: 'On-device agents in Puku Editor for free users.' },
      { type: 'new', product: 'cloud', text: 'Audit logs for Team plans.' },
      { type: 'improved', product: 'editor', text: 'Search latency down 22% across the workspace.' },
    ],
  },
];

const PRODUCTS = [
  { id: 'all', name: 'All Products' },
  { id: 'editor', name: 'Puku Editor' },
  { id: 'cli', name: 'Puku CLI' },
  { id: 'cloud', name: 'Puku Cloud' },
  { id: 'design', name: 'Puku Design' },
  { id: 'cowork', name: 'Puku Co-work' },
  { id: 'app', name: 'Puku App' },
];

const dotColor: Record<string, string> = {
  new: '#6954C4',       // Purple / Accent
  improved: '#2563eb',  // Blue
  fixed: '#ea580c',     // Orange
};

const badgeClasses: Record<string, string> = {
  new: 'bg-accent/10 text-accent border border-accent/20',
  improved: 'bg-blue-50 text-blue-600 border border-blue-100',
  fixed: 'bg-orange-50 text-orange-600 border border-orange-100',
};

const badgeLabel: Record<string, string> = {
  new: 'New',
  improved: 'Improved',
  fixed: 'Fixed',
};

export default function Changelog() {
  const [selectedProduct, setSelectedProduct] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate dynamic totals for each product tab
  const getProductCount = (productId: string) => {
    if (productId === 'all') {
      return releases.reduce((sum, r) => sum + r.highlights.length, 0);
    }
    return releases.reduce((sum, r) => sum + r.highlights.filter(h => h.product === productId).length, 0);
  };

  // Filter highlights inside each release by product and text query, hide empty releases
  const filteredReleases = releases.map((release) => {
    const highlights = release.highlights.filter((h) => {
      const matchesProduct = selectedProduct === 'all' || h.product === selectedProduct;
      const matchesSearch =
        h.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.product.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesProduct && matchesSearch;
    });
    return { ...release, highlights };
  }).filter((release) => release.highlights.length > 0);

  return (
    <>
      <SEO title="Changelog — Puku" description="What's new in Puku." />
      
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-dot-grid bg-white border-b border-border/40">
        <Container>
          <div className="mx-auto max-w-3xl text-center relative z-10">
            {/* Elegant Header similar to mynaui */}
            <div className="flex flex-col items-center">
              <h1 className="font-sans text-display-xl font-bold text-ink tracking-tight">
                Changelog
              </h1>
              <p className="mt-4 text-sm font-sans leading-relaxed text-ink-muted">
                New updates, improvements, and fixes to Puku.
              </p>
              {/* Header Actions / Social Row */}
              <div className="flex items-center gap-4 mt-6">
                <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
                  <Twitter className="h-4 w-4 text-ink-dim hover:text-accent transition-colors" />
                </a>
                <a href="/rss.xml" aria-label="RSS Feed">
                  <Rss className="h-4 w-4 text-ink-dim hover:text-accent transition-colors" />
                </a>
                <a href="/newsletter" aria-label="Newsletter">
                  <Mail className="h-4 w-4 text-ink-dim hover:text-accent transition-colors" />
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 bg-white min-h-[500px]">
        <Container>
          {/* Controls Bar: Filter tabs + Search */}
          <div className="mx-auto max-w-4xl mb-20 space-y-6">
            {/* Search Input */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-ink-dim" />
              <input
                type="text"
                placeholder="Search updates by keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 rounded-full border border-border/80 bg-[#f5f5f7]/50 pl-10 pr-4 text-[13.5px] text-ink placeholder-ink-dim focus:outline-none focus:border-accent transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-2.5 text-xs text-ink-muted hover:text-ink font-semibold"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Product Filter tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 select-none">
              {PRODUCTS.map((p) => {
                const count = getProductCount(p.id);
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedProduct(p.id)}
                    className={cn(
                      "px-4 py-2 text-[13px] font-semibold rounded-full border transition-all duration-200 flex items-center gap-1.5",
                      selectedProduct === p.id
                        ? "bg-accent border-accent text-white shadow-sm"
                        : "bg-bg border-border text-ink-muted hover:border-accent/40 hover:text-ink"
                    )}
                  >
                    <span>{p.name}</span>
                    <span className={cn(
                      "px-1.5 py-0.5 text-[10px] font-mono font-bold rounded-full",
                      selectedProduct === p.id
                        ? "bg-white/20 text-white"
                        : "bg-slate-100 text-slate-500"
                    )}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Timeline Releases List matching mynaui */}
          <div className="mx-auto max-w-3xl">
            {filteredReleases.length > 0 ? (
              filteredReleases.map((r) => {
                const themeColor = dotColor[r.highlights[0]?.type || 'new'];
                return (
                  <div key={r.version} className="relative flex md:grid md:grid-cols-[120px_auto_1fr] gap-x-4 md:gap-x-6 pb-16 last:pb-0">
                    {/* Left: Date (Desktop only) */}
                    <div className="hidden md:block text-right text-[12.5px] font-semibold pt-1 font-sans select-none tracking-tight" style={{ color: themeColor }}>
                      {r.date}
                    </div>

                    {/* Center: Timeline line and node */}
                    <div className="flex flex-col items-center relative flex-none">
                      <span
                        className="h-3.5 w-3.5 rounded-full border-4 border-white z-10 shadow-sm"
                        style={{ backgroundColor: themeColor }}
                      />
                      {/* Connection Line */}
                      <div className="absolute top-4 bottom-0 w-px bg-border/80 -mb-16" />
                    </div>

                    {/* Right: Content */}
                    <div className="space-y-4 pt-0.5 flex-1 min-w-0 text-left">
                      {/* Date & Title row */}
                      <div className="flex flex-col md:flex-row md:items-baseline gap-1.5 md:gap-3">
                        {/* Mobile Date */}
                        <span className="block md:hidden text-[11px] font-bold tracking-wider uppercase font-mono" style={{ color: themeColor }}>
                          {r.date}
                        </span>
                        <h2 className="font-sans text-[17.5px] font-bold text-ink leading-tight">
                          {r.title}
                        </h2>
                      </div>

                      {/* Cover Preview Image */}
                      {r.image && (
                        <div className="w-full aspect-[16/9] rounded-xl overflow-hidden border border-border/80 shadow-sm bg-[#f5f5f7] mt-3">
                          <img
                            src={r.image}
                            alt={`Release v${r.version} overview`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>
                      )}

                      {/* Highlights Details */}
                      <ul className="mt-5 space-y-4">
                        {r.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-3.5 text-[14px] text-ink-muted">
                            <span className={cn(
                              "px-2 py-0.5 rounded text-[9.5px] font-bold uppercase tracking-wider flex-none mt-0.5 border",
                              badgeClasses[h.type]
                            )}>
                              {badgeLabel[h.type]}
                            </span>
                            <span className="leading-relaxed">
                              <span className="font-mono text-[10.5px] bg-[#f5f5f7] border border-border/60 px-1.5 py-0.5 rounded text-slate-700 mr-2.5 uppercase tracking-wide">
                                {h.product}
                              </span>
                              {h.text}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-16 border border-border border-dashed rounded-xl bg-bg/50">
                <p className="text-sm text-ink-muted">No updates found matching your filter criteria.</p>
              </div>
            )}
          </div>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}