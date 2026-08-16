import { useState, useMemo } from 'react';
import { SEO } from '@/components/layout/SEO';
import { Container } from '@/components/ui/Container';
import { CtaBanner } from '@/components/layout/CtaBanner';
import { cn } from '@/lib/cn';
import {
  Search,
  Mail,
  Rss,
  Sparkles,
  Zap,
  Wrench,
  Check,
  Link as LinkIcon,
  Filter,
  X,
  Bell,
  Calendar,
  Layers,
} from 'lucide-react';

type HighlightType = 'new' | 'improved' | 'fixed';
type ProductId = 'editor' | 'cli' | 'cloud' | 'design' | 'cowork' | 'app';

type Highlight = {
  type: HighlightType;
  product: ProductId;
  text: string;
};

type Release = {
  version: string;
  date: string;
  title: string;
  summary?: string;
  image?: string;
  highlights: Highlight[];
};

const releases: Release[] = [
  {
    version: '2026.2.0',
    date: '02 Feb 2026',
    title: 'Autonomous Multi-Agent Fleet & Multi-Repo Workspace',
    summary: 'Orchestrate teams of specialized AI agents working across multiple repositories simultaneously with real-time sync.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&h=675&q=80',
    highlights: [
      { type: 'new', product: 'cloud', text: 'Multi-Agent Fleet: Run parallel agent sub-tasks across dedicated cloud GPU nodes.' },
      { type: 'new', product: 'editor', text: 'Multi-Repo Workspace support: Reference and refactor across linked Git repositories.' },
      { type: 'new', product: 'cli', text: '`puku swarm` command for parallel background task execution in CLI.' },
      { type: 'improved', product: 'editor', text: 'Context indexing latency reduced by 45% using Rust native indexing engine.' },
      { type: 'fixed', product: 'app', text: 'Fixed push notification delays on mobile companion app.' },
    ],
  },
  {
    version: '2026.1.0',
    date: '14 Jan 2026',
    title: 'Puku Cloud General Availability & Custom AI Agents',
    summary: 'Puku Cloud is officially GA with low-latency GPU pools, edge execution, custom prompt engines, and enterprise RBAC.',
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&h=675&q=80',
    highlights: [
      { type: 'new', product: 'cloud', text: 'Puku Cloud GA: Global edge execution, serverless GPU pools, and execution queues.' },
      { type: 'new', product: 'editor', text: 'Custom Agents Engine: Define custom prompts, tool permissions, and memory rules.' },
      { type: 'new', product: 'app', text: 'Puku App 2.0 with real-time build status alerts and one-tap agent approvals.' },
      { type: 'improved', product: 'editor', text: 'Type-checker performance improved 38% on large TypeScript monorepos.' },
      { type: 'fixed', product: 'editor', text: 'Resolved a memory edge-case when editing files with over 15,000 lines.' },
    ],
  },
  {
    version: '2025.12.1',
    date: '19 Dec 2025',
    title: 'Puku Co-work Realtime Canvas & Storybook Integration',
    summary: 'Collaborate with teammates and AI agents in real time on a shared design and code canvas.',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&h=675&q=80',
    highlights: [
      { type: 'new', product: 'cowork', text: 'Puku Co-work: Live multiplayer canvas with interactive AI pair programming.' },
      { type: 'new', product: 'editor', text: 'Native Storybook preview panel with automatic UI component variant generation.' },
      { type: 'improved', product: 'editor', text: 'Faster incremental project indexing on initial workspace launch.' },
      { type: 'fixed', product: 'design', text: 'Fixed a token synchronization issue when exporting Figma design tokens.' },
    ],
  },
  {
    version: '2025.12.0',
    date: '04 Dec 2025',
    title: 'Puku Design System & CLI 2.0 Redesign',
    summary: 'Design directly inside your editor with automated token sync, code generation, and a overhauled CLI.',
    image: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&w=1200&h=675&q=80',
    highlights: [
      { type: 'new', product: 'design', text: 'Puku Design: Unified design-to-code canvas with auto-generated React components.' },
      { type: 'new', product: 'cli', text: 'Puku CLI 2.0: Beautiful terminal UI with interactive command completion.' },
      { type: 'improved', product: 'editor', text: 'Reduced idle CPU consumption during background local model execution.' },
      { type: 'fixed', product: 'cloud', text: 'Fixed token expiration refresh loop in Puku Cloud CLI login.' },
    ],
  },
  {
    version: '2025.11.2',
    date: '18 Nov 2025',
    title: 'Smart Agent History & Memory Graph',
    summary: 'Agents now retain context across git branches, commit histories, and pull request reviews.',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&h=675&q=80',
    highlights: [
      { type: 'improved', product: 'editor', text: 'Smart Agent History: Agents remember past context across branch switches.' },
      { type: 'fixed', product: 'editor', text: 'Resolved context leak on long-running multi-file agent sessions.' },
      { type: 'fixed', product: 'cloud', text: 'Fixed cloud file sync conflicts when switching offline/online modes.' },
    ],
  },
  {
    version: '2025.11.0',
    date: '01 Nov 2025',
    title: 'Local On-Device Models & Team Audit Logs',
    summary: 'Run local privacy-focused AI models directly on device and track team security activities.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&h=675&q=80',
    highlights: [
      { type: 'new', product: 'editor', text: 'On-device local LLM execution support for offline development.' },
      { type: 'new', product: 'cloud', text: 'Enterprise Audit Logs: Track agent file access and command history.' },
      { type: 'improved', product: 'editor', text: 'Global code search query response time reduced by 22%.' },
    ],
  },
];

const PRODUCTS: { id: 'all' | ProductId; name: string }[] = [
  { id: 'all', name: 'All Products' },
  { id: 'editor', name: 'Puku Editor' },
  { id: 'cli', name: 'Puku CLI' },
  { id: 'cloud', name: 'Puku Cloud' },
  { id: 'design', name: 'Puku Design' },
  { id: 'cowork', name: 'Puku Co-work' },
  { id: 'app', name: 'Puku App' },
];

const TYPES: { id: 'all' | HighlightType; name: string; icon: React.ElementType }[] = [
  { id: 'all', name: 'All Changes', icon: Layers },
  { id: 'new', name: 'New Features', icon: Sparkles },
  { id: 'improved', name: 'Improvements', icon: Zap },
  { id: 'fixed', name: 'Fixes', icon: Wrench },
];

const typeBadgeStyles: Record<HighlightType, { bg: string; text: string; border: string; icon: React.ElementType; label: string }> = {
  new: {
    bg: 'bg-[#F4F2FF]',
    text: 'text-[#6E56CF]',
    border: 'border-[#E4DDFE]',
    icon: Sparkles,
    label: 'New',
  },
  improved: {
    bg: 'bg-[#EFF6FF]',
    text: 'text-[#2563EB]',
    border: 'border-[#DBEAFE]',
    icon: Zap,
    label: 'Improved',
  },
  fixed: {
    bg: 'bg-[#FFF7ED]',
    text: 'text-[#EA580C]',
    border: 'border-[#FFEDD5]',
    icon: Wrench,
    label: 'Fixed',
  },
};

export default function Changelog() {
  const [selectedProduct, setSelectedProduct] = useState<'all' | ProductId>('all');
  const [selectedType, setSelectedType] = useState<'all' | HighlightType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedVersion, setCopiedVersion] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Dynamic counts per product
  const getProductCount = (productId: 'all' | ProductId) => {
    if (productId === 'all') {
      return releases.reduce((sum, r) => sum + r.highlights.length, 0);
    }
    return releases.reduce((sum, r) => sum + r.highlights.filter((h) => h.product === productId).length, 0);
  };

  // Dynamic counts per type
  const getTypeCount = (typeId: 'all' | HighlightType) => {
    if (typeId === 'all') {
      return releases.reduce((sum, r) => sum + r.highlights.length, 0);
    }
    return releases.reduce((sum, r) => sum + r.highlights.filter((h) => h.type === typeId).length, 0);
  };

  // Filtered releases pipeline
  const filteredReleases = useMemo(() => {
    return releases
      .map((release) => {
        const highlights = release.highlights.filter((h) => {
          const matchesProduct = selectedProduct === 'all' || h.product === selectedProduct;
          const matchesType = selectedType === 'all' || h.type === selectedType;
          const query = searchQuery.toLowerCase().trim();
          const matchesSearch =
            !query ||
            release.version.toLowerCase().includes(query) ||
            release.title.toLowerCase().includes(query) ||
            (release.summary && release.summary.toLowerCase().includes(query)) ||
            h.text.toLowerCase().includes(query) ||
            h.product.toLowerCase().includes(query) ||
            h.type.toLowerCase().includes(query);

          return matchesProduct && matchesType && matchesSearch;
        });

        return { ...release, highlights };
      })
      .filter((release) => release.highlights.length > 0);
  }, [selectedProduct, selectedType, searchQuery]);

  const totalVisibleItems = filteredReleases.reduce((sum, r) => sum + r.highlights.length, 0);

  const copyPermalink = (version: string) => {
    const url = `${window.location.origin}${window.location.pathname}#v${version}`;
    navigator.clipboard.writeText(url);
    setCopiedVersion(version);
    setTimeout(() => setCopiedVersion(null), 2000);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <>
      <SEO title="Changelog — Puku AI" description="Weekly product updates, new features, performance improvements, and fixes across Puku tools." />

      {/* Hero Header */}
      <section className="relative pt-32 pb-14 md:pt-40 md:pb-18 bg-[#FAFAFC] border-b border-[#E5E5E8]">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            {/* Live shipping pill badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E5E5E8] shadow-sm mb-6 text-xs font-mono font-bold text-[#6E56CF]">
              <span className="h-2 w-2 rounded-full bg-[#6E56CF] animate-pulse" />
              Shipped Weekly • v{releases[0].version} Latest
            </div>

            <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-[#0F0F11] tracking-tight">
              Changelog
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#4A4A52] font-normal max-w-xl mx-auto leading-relaxed">
              Every feature, speed optimization, and fix we ship to Puku Editor, CLI, Cloud, Design, and Companion apps.
            </p>

            {/* Subscribe & Social bar */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <form onSubmit={handleSubscribe} className="flex items-center gap-2 max-w-md w-full sm:w-auto">
                <div className="relative flex-1 min-w-[240px]">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-[#4A4A52]" />
                  <input
                    type="email"
                    required
                    placeholder="Enter email for weekly updates..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-10 pl-9 pr-3 text-xs sm:text-sm bg-white border border-[#E5E5E8] rounded-[2px] text-[#0F0F11] placeholder-[#4A4A52] focus:outline-none focus:border-[#6E56CF] focus:ring-1 focus:ring-[#6E56CF]"
                  />
                </div>
                <button
                  type="submit"
                  className="h-10 px-4 text-xs font-semibold text-white bg-[#0F0F11] hover:bg-[#6E56CF] rounded-[2px] transition-colors flex items-center gap-1.5 shrink-0"
                >
                  <Bell className="h-3.5 w-3.5" />
                  Subscribe
                </button>
              </form>

              <div className="flex items-center gap-2 border-l border-[#E5E5E8] pl-3 ml-1 hidden sm:flex">
                <a
                  href="/rss.xml"
                  aria-label="RSS Feed"
                  className="h-10 px-3 bg-white border border-[#E5E5E8] hover:border-[#6E56CF] text-[#0F0F11] hover:text-[#6E56CF] rounded-[2px] transition-colors flex items-center gap-1.5 text-xs font-semibold"
                >
                  <Rss className="h-3.5 w-3.5 text-[#6E56CF]" />
                  RSS
                </a>
              </div>
            </div>

            {subscribed && (
              <div className="mt-3 text-xs font-semibold text-[#6E56CF] bg-[#F4F2FF] border border-[#E4DDFE] px-4 py-2 rounded-[2px] inline-flex items-center gap-1.5 animate-fadeIn">
                <Check className="h-3.5 w-3.5" /> You're subscribed! We'll email you when new releases drop.
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Main Content Area */}
      <section className="py-16 bg-white min-h-[600px]">
        <Container>
          {/* Controls Filter Deck */}
          <div className="mx-auto max-w-4xl mb-14 space-y-5">
            {/* Search Input Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-[#4A4A52]" />
              <input
                type="text"
                placeholder="Search releases (e.g. cloud, speed, memory, editor)..."
                value={searchQuery}
                aria-label="Search release notes"
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 rounded-[2px] border border-[#E5E5E8] bg-white pl-10 pr-12 text-sm text-[#0F0F11] font-normal placeholder-[#4A4A52] focus:outline-none focus:border-[#6E56CF] focus:ring-2 focus:ring-[#6E56CF]/20 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-3.5 text-xs text-[#4A4A52] hover:text-[#6E56CF] font-semibold flex items-center gap-1"
                >
                  <X className="h-3.5 w-3.5" /> Clear
                </button>
              )}
            </div>

            {/* Type Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#4A4A52] mr-1 hidden sm:inline">Type:</span>
              {TYPES.map((t) => {
                const Icon = t.icon;
                const count = getTypeCount(t.id);
                const isSelected = selectedType === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setSelectedType(t.id)}
                    className={cn(
                      'px-3 py-1.5 text-xs font-semibold rounded-[2px] border transition-all flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6E56CF]',
                      isSelected
                        ? 'bg-[#0F0F11] border-[#0F0F11] text-white shadow-sm'
                        : 'bg-[#FAFAFC] border-[#E5E5E8] text-[#1A1A1E] hover:border-[#6E56CF] hover:text-[#6E56CF]'
                    )}
                  >
                    <Icon className={cn('h-3.5 w-3.5', isSelected ? 'text-white' : 'text-[#6E56CF]')} />
                    <span>{t.name}</span>
                    <span
                      className={cn(
                        'px-1.5 py-0.2 text-[10px] font-mono font-bold rounded',
                        isSelected ? 'bg-white/20 text-white' : 'bg-[#E5E5E8] text-[#4A4A52]'
                      )}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Product Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-2 justify-start sm:justify-center border-t border-[#E5E5E8] pt-4 select-none">
              {PRODUCTS.map((p) => {
                const count = getProductCount(p.id);
                const isSelected = selectedProduct === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedProduct(p.id)}
                    className={cn(
                      'px-3.5 py-2 text-xs font-semibold rounded-[2px] border transition-all flex items-center gap-2 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6E56CF]',
                      isSelected
                        ? 'bg-[#6E56CF] border-[#6E56CF] text-white'
                        : 'bg-white border-[#E5E5E8] text-[#1A1A1E] hover:border-[#6E56CF] hover:text-[#6E56CF]'
                    )}
                  >
                    <span>{p.name}</span>
                    <span
                      className={cn(
                        'px-1.5 py-0.2 text-[10px] font-mono font-bold rounded',
                        isSelected ? 'bg-white/20 text-white' : 'bg-[#F3F3F5] text-[#4A4A52]'
                      )}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Filter Status Bar */}
            {(selectedProduct !== 'all' || selectedType !== 'all' || searchQuery) && (
              <div className="flex items-center justify-between bg-[#F4F2FF] border border-[#E4DDFE] px-4 py-2 rounded-[2px] text-xs text-[#6E56CF]">
                <div className="flex items-center gap-2 font-medium">
                  <Filter className="h-3.5 w-3.5 shrink-0" />
                  <span>
                    Showing <strong>{totalVisibleItems}</strong> item{totalVisibleItems === 1 ? '' : 's'} across{' '}
                    <strong>{filteredReleases.length}</strong> release{filteredReleases.length === 1 ? '' : 's'}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setSelectedProduct('all');
                    setSelectedType('all');
                    setSearchQuery('');
                  }}
                  className="font-bold underline hover:text-[#0F0F11] transition-colors"
                >
                  Reset all filters
                </button>
              </div>
            )}
          </div>

          {/* Timeline Releases */}
          <div className="mx-auto max-w-3xl">
            {filteredReleases.length > 0 ? (
              filteredReleases.map((release, index) => {
                return (
                  <article
                    key={release.version}
                    id={`v${release.version}`}
                    className="relative flex md:grid md:grid-cols-[130px_32px_1fr] gap-x-4 md:gap-x-6 pb-16 last:pb-0 group"
                  >
                    {/* Left Column: Version & Date (Desktop) */}
                    <div className="hidden md:flex flex-col items-end pt-1 select-none text-right">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#F4F2FF] text-[#6E56CF] border border-[#E4DDFE]">
                        v{release.version}
                      </span>
                      <span className="text-[12px] font-medium text-[#4A4A52] mt-1.5 flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-[#4A4A52]" />
                        {release.date}
                      </span>
                    </div>

                    {/* Middle Column: Timeline Line & Node */}
                    <div className="flex flex-col items-center relative flex-none">
                      <div className="h-4 w-4 rounded-full border-2 border-white bg-[#6E56CF] ring-4 ring-[#F4F2FF] z-10 group-hover:bg-[#0F0F11] group-hover:ring-[#E5E5E8] transition-all" />
                      {index !== filteredReleases.length - 1 && (
                        <div className="absolute top-4 bottom-0 w-px bg-[#E5E5E8] -mb-16" />
                      )}
                    </div>

                    {/* Right Column: Release Content Card */}
                    <div className="space-y-4 pt-0 flex-1 min-w-0">
                      {/* Version & Date Header for Mobile */}
                      <div className="flex items-center gap-2 md:hidden">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#F4F2FF] text-[#6E56CF] border border-[#E4DDFE]">
                          v{release.version}
                        </span>
                        <span className="text-xs font-medium text-[#4A4A52]">{release.date}</span>
                      </div>

                      {/* Release Title & Quick Share */}
                      <div className="flex items-start justify-between gap-4">
                        <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0F0F11] tracking-tight group-hover:text-[#6E56CF] transition-colors leading-tight">
                          {release.title}
                        </h2>

                        <button
                          onClick={() => copyPermalink(release.version)}
                          title="Copy permalink"
                          className="p-1.5 text-[#4A4A52] hover:text-[#6E56CF] hover:bg-[#FAFAFC] rounded border border-transparent hover:border-[#E5E5E8] transition-all shrink-0"
                          aria-label={`Copy permalink for release ${release.version}`}
                        >
                          {copiedVersion === release.version ? (
                            <span className="text-[11px] font-semibold text-[#6E56CF] flex items-center gap-1">
                              <Check className="h-3.5 w-3.5" /> Copied
                            </span>
                          ) : (
                            <LinkIcon className="h-4 w-4" />
                          )}
                        </button>
                      </div>

                      {/* Summary */}
                      {release.summary && (
                        <p className="text-sm text-[#4A4A52] leading-relaxed font-normal">
                          {release.summary}
                        </p>
                      )}

                      {/* Optional Release Image */}
                      {release.image && (
                        <div className="w-full aspect-[16/9] rounded-[2px] overflow-hidden border border-[#E5E5E8] bg-[#FAFAFC] shadow-none">
                          <img
                            src={release.image}
                            alt={`Release v${release.version} visual overview`}
                            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>
                      )}

                      {/* Highlights Card Container */}
                      <div className="bg-[#FAFAFC] border border-[#E5E5E8] rounded-[2px] p-4 sm:p-5 space-y-3 mt-4">
                        <div className="text-[11px] font-mono uppercase tracking-wider text-[#4A4A52] font-semibold">
                          Release Notes ({release.highlights.length})
                        </div>

                        <ul className="space-y-3">
                          {release.highlights.map((h, i) => {
                            const badge = typeBadgeStyles[h.type];
                            const Icon = badge.icon;
                            return (
                              <li key={i} className="flex items-start gap-3 text-sm text-[#1A1A1E] font-medium leading-relaxed">
                                <span
                                  className={cn(
                                    'px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shrink-0 mt-0.5 border',
                                    badge.bg,
                                    badge.text,
                                    badge.border
                                  )}
                                >
                                  <Icon className="h-3 w-3" />
                                  {badge.label}
                                </span>

                                <span className="flex-1">
                                  <span className="font-mono text-[11px] font-bold bg-white border border-[#E5E5E8] px-1.5 py-0.5 rounded text-[#0F0F11] uppercase mr-2 tracking-wide">
                                    {h.product}
                                  </span>
                                  {h.text}
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </article>
                );
              })
            ) : (
              /* Empty Filter State */
              <div className="text-center py-16 px-6 border border-[#E5E5E8] border-dashed rounded-[2px] bg-[#FAFAFC]">
                <Search className="h-8 w-8 text-[#4A4A52] mx-auto mb-3" />
                <h3 className="text-base font-bold text-[#0F0F11]">No updates match your filters</h3>
                <p className="text-sm text-[#4A4A52] mt-1 max-w-sm mx-auto">
                  Try searching for another keyword or reset the category/product filters.
                </p>
                <button
                  onClick={() => {
                    setSelectedProduct('all');
                    setSelectedType('all');
                    setSearchQuery('');
                  }}
                  className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-[#0F0F11] hover:bg-[#6E56CF] rounded-[2px] transition-colors inline-flex items-center gap-2"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}