import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '@/components/layout/SEO';
import { CtaBanner } from '@/components/layout/CtaBanner';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Check, ChevronRight, GitPullRequest, FileText, RefreshCw,
  CalendarCheck, Bug, TestTube, Zap, Shield, Globe, Star, Quote, ChevronDown,
  Sparkles, Terminal, Code, Cpu, Play, CheckCircle2, AlertCircle, Layers,
  Lock, ArrowUpRight, Search, Server, ExternalLink, Cloud, Paintbrush, Users, Smartphone
} from 'lucide-react';
import { cn } from '@/lib/cn';
import * as BrandIcons from '@/components/ui/BrandIcons';


/* ─── Company Logos Matrix with Authentic SVG Brand Icons ───── */
const companyLogos = [
  {
    name: 'Stripe',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4.5 w-4.5 text-[#0F0F11]">
        <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C17.747 1.006 15.111.4 12.433.4 6.837.4 3.018 3.328 3.018 7.605c0 5.485 7.158 5.86 7.158 8.877 0 1.018-.847 1.479-2.164 1.479-2.607 0-5.385-1.121-7.072-2.148l-.949 5.764c1.867.973 4.802 1.684 7.781 1.684 5.86 0 9.802-2.825 9.802-7.55 0-5.918-7.6-6.28-7.6-8.561z" />
      </svg>
    ),
  },
  {
    name: 'Goldman Sachs',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4.5 w-4.5 text-[#0F0F11]">
        <path d="M2 2h20v20H2V2zm4 4v12h12V6H6zm2 2h8v8H8V8z" />
      </svg>
    ),
  },
  {
    name: 'Ramp',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4.5 w-4.5 text-[#0F0F11]">
        <path d="M4 4h8a5 5 0 015 5c0 2.2-1.4 4-3.5 4.7L18 20h-4.5l-3.8-5.5H8.5V20H4V4zm4.5 3.5v3.5h3.5a1.75 1.75 0 100-3.5H8.5z" />
      </svg>
    ),
  },
  {
    name: 'Nubank',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4.5 w-4.5 text-[#0F0F11]">
        <path d="M6 4h3.5v10.5L14.5 4H18v16h-3.5V9.5L9.5 20H6V4z" />
      </svg>
    ),
  },
  {
    name: 'Brex',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4.5 w-4.5 text-[#0F0F11]">
        <path d="M4 4h7a4.5 4.5 0 013 7.8A5 5 0 0118 16c0 2.8-2.2 4-5 4H4V4zm4.5 3.5v3h3a1.5 1.5 0 000-3h-3zm0 6.5v3.5h3.5a1.75 1.75 0 100-3.5h-3.5z" />
      </svg>
    ),
  },
  {
    name: 'DoorDash',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4.5 w-4.5 text-[#0F0F11]">
        <path d="M22.84 10.51a6.6 6.6 0 00-6.6-6.61H2.4a1.2 1.2 0 00-.85 2.05l5.04 5.04a1.2 1.2 0 00.85.35h8.8a2.1 2.1 0 012.1 2.1 2.1 2.1 0 01-2.1 2.1H8.4a1.2 1.2 0 00-1.2 1.2v3.6a1.2 1.2 0 001.2 1.2h7.84a6.6 6.6 0 006.6-6.61v-4.52z" />
      </svg>
    ),
  },
  {
    name: 'Mercari',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4.5 w-4.5 text-[#0F0F11]">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2v-5h2v5zm0-7h-2V7.5h2V9.5z" />
      </svg>
    ),
  },
  {
    name: 'Klarna',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4.5 w-4.5 text-[#0F0F11]">
        <path d="M3 4h4v16H3V4zm6 0h4v6.5L18.5 4H23.5l-6.8 7.2L23.5 20h-5.2l-5.3-6.5V20H9V4z" />
      </svg>
    ),
  },
  {
    name: 'Retool',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4.5 w-4.5 text-[#0F0F11]">
        <path d="M3 3h18v4H3V3zm0 7h18v4H3v-4zm0 7h12v4H3v-4z" />
      </svg>
    ),
  },
  {
    name: 'Vercel',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4.5 w-4.5 text-[#0F0F11]">
        <path d="M12 2L24 22H0L12 2Z" />
      </svg>
    ),
  },
  {
    name: 'Supabase',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4.5 w-4.5 text-[#0F0F11]">
        <path d="M13.35 2.1a1 1 0 00-1.7 0L2.83 16.48a1 1 0 00.85 1.52H11v4a1 1 0 001.7 0l8.82-14.38a1 1 0 00-.85-1.52H13.35v-4z" />
      </svg>
    ),
  },
  {
    name: 'Linear',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4.5 w-4.5 text-[#0F0F11]">
        <path d="M3.2 12A8.8 8.8 0 0112 3.2v3.2A5.6 5.6 0 006.4 12H3.2zm8.8 8.8A8.8 8.8 0 013.2 12h3.2a5.6 5.6 0 005.6 5.6v3.2zm8.8-8.8A8.8 8.8 0 0112 20.8v-3.2a5.6 5.6 0 005.6-5.6h3.2zm-8.8-8.8A8.8 8.8 0 0120.8 12h-3.2A5.6 5.6 0 0012 6.4V3.2z" />
      </svg>
    ),
  },
  {
    name: 'Notion',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4.5 w-4.5 text-[#0F0F11]">
        <path d="M4.459 4.208c.746.606 1.026.56 2.427.466l11.114-.653c.42-.047.653-.28.56-.7-.094-.373-.374-.606-.933-.56L6.512 3.415c-.98.047-1.4.28-2.053.793zm1.12 3.543v11.9c0 1.026.42 1.493 1.586 1.4l11.207-.653c1.12-.047 1.493-.653 1.493-1.633V6.864c0-.98-.373-1.447-1.493-1.353L7.165 6.164c-1.166.094-1.586.606-1.586 1.587zm4.293.7l6.627-.373v9.053l-6.627.373V8.451z" />
      </svg>
    ),
  },
  {
    name: 'GitHub',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4.5 w-4.5 text-[#0F0F11]">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    name: 'AWS',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4.5 w-4.5 text-[#0F0F11]">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    name: 'Datadog',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4.5 w-4.5 text-[#0F0F11]">
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1 14.5v-9l7 4.5-7 4.5z" />
      </svg>
    ),
  },
  {
    name: 'Figma',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4.5 w-4.5 text-[#0F0F11]">
        <path d="M8 24c2.2 0 4-1.8 4-4v-4H8c-2.2 0-4 1.8-4 4s1.8 4 4 4zM4 12c0-2.2 1.8-4 4-4h4v8H8c-2.2 0-4-1.8-4-4zM4 4c0-2.2 1.8-4 4-4h4v8H8c-2.2 0-4-1.8-4-4zM12 0h4c2.2 0 4 1.8 4 4s-1.8 4-4 4h-4V0zM20 12c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4 4 1.8 4 4z" />
      </svg>
    ),
  },
  {
    name: 'Postman',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4.5 w-4.5 text-[#0F0F11]">
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm3.8 6.8l-5.6 5.6-2.4-2.4 1.4-1.4 1 1 4.2-4.2 1.4 1.4z" />
      </svg>
    ),
  },
  {
    name: 'Sentry',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4.5 w-4.5 text-[#0F0F11]">
        <path d="M12 2L2 22h20L12 2zm0 6l5.5 11h-11L12 8z" />
      </svg>
    ),
  },
  {
    name: 'Redis',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4.5 w-4.5 text-[#0F0F11]">
        <path d="M12 2l10 5v10l-10 5-10-5V7l10-5zm0 3.5L5 9v6l7 3.5 7-3.5V9l-7-3.5z" />
      </svg>
    ),
  },
];

/* ─── 6 Puku Products (Subtle Accent Highlights) ────────── */
const pukuProducts = [
  {
    name: 'Puku Editor',
    tagline: 'AI-Native Code Workspace',
    desc: 'The core AI-native VS Code fork. Understands your entire repository, team context, and design tokens.',
    href: '/products/editor',
    icon: Code,
  },
  {
    name: 'Puku CLI',
    tagline: 'Autonomous Terminal Assistant',
    desc: 'Local command line agent that runs builds, investigates stack traces, and automates shell workflows.',
    href: '/products/cli',
    icon: Terminal,
  },
  {
    name: 'Puku Cloud',
    tagline: 'Parallel GPU Execution Fleet',
    desc: 'Scale your engineering velocity with isolated cloud containers running agent swarms in parallel.',
    href: '/products/cloud',
    icon: Cloud,
  },
  {
    name: 'Puku Design',
    tagline: 'Figma Layout & AI Canvas',
    desc: 'Automatically sync Figma design variables into UI component tokens and production React code.',
    href: '/products/design',
    icon: Paintbrush,
  },
  {
    name: 'Puku Co-work',
    tagline: 'Real-Time Team Agent Pair',
    desc: 'Collaborate with human engineers and autonomous agents in a shared multi-cursor workspace buffer.',
    href: '/products/cowork',
    icon: Users,
  },
  {
    name: 'Puku App',
    tagline: 'Desktop & Mobile Tray Workspace',
    desc: 'Manage agent tasks on the go from your menu bar or mobile device with live execution push notifications.',
    href: '/products/app',
    icon: Smartphone,
  },
];

/* ─── Use Cases Grid Data ────────────────────────────────── */
const useCases = [
  {
    title: 'PR review & visual QA',
    desc: 'Automatically identify and resolve bugs with visual QA in full browser and desktop preview.',
    bullets: ['Automatically identify and resolve bugs', 'Visual QA with full browser & desktop preview', 'Intelligently organize code diffs for review'],
    badge: 'Visual QA',
    colSpan: 'col-span-1 md:col-span-1',
  },
  {
    title: 'Documentation',
    desc: 'Auto-generate comprehensive technical documentation, architecture diagrams, and wiki pages.',
    bullets: ['Auto-generate docs for legacy codebases', 'Comprehensive system diagrams and wikis', 'Full visibility into unfamiliar systems'],
    badge: 'Docs',
    colSpan: 'col-span-1 md:col-span-1',
  },
  {
    title: 'Code migration & refactoring',
    desc: 'Assign a fleet of parallel cloud agents to migrate repositories with zero downtime.',
    bullets: ['Assign a fleet of agents to migrate repos in parallel', 'Accelerate legacy modernizations at scale', 'Complete auditability at each step'],
    badge: 'Fleet Migration',
    colSpan: 'col-span-1 md:col-span-1',
  },
  {
    title: 'Scheduled chores & app dev',
    desc: 'Schedule daily QA runs, release note summaries, and continuous maintenance chores automatically.',
    bullets: ['Schedule daily QA and release notes', 'Continuously review and address user feedback', 'Maintain documentation automatically'],
    badge: 'Chores',
    colSpan: 'col-span-1 md:col-span-2',
  },
  {
    title: 'Issue triage & bug fixing',
    desc: 'Investigate live incidents immediately and route Slack bug reports into tested Pull Requests.',
    bullets: ['Investigate incidents immediately', 'Intelligently route Slack bug reports to PRs', 'Automatically fix CI failures'],
    badge: 'Triage',
    colSpan: 'col-span-1 md:col-span-1',
  },
  {
    title: 'And many more',
    desc: 'Automated ticket resolution, unit testing, performance benchmarking, and web research.',
    bullets: ['Automated ticket resolution', 'Unit and E2E testing', 'Performance optimization', 'Web research & automation'],
    badge: 'Endless Tasks',
    colSpan: 'col-span-1 md:col-span-3',
  },
];

/* ─── Tools Matrix with Authentic Brand SVG Icons ─────────── */
const toolsListWithIcons = [
  { name: 'GitHub', icon: <BrandIcons.GitHubIcon className="h-4 w-4" /> },
  { name: 'GitLab', icon: <BrandIcons.GitLabIcon className="h-4 w-4" /> },
  { name: 'Docker', icon: <BrandIcons.DockerIcon className="h-4 w-4" /> },
  { name: 'VS Code', icon: <BrandIcons.VSCodeIcon className="h-4 w-4" /> },
  { name: 'Terminal', icon: <BrandIcons.TerminalIcon className="h-4 w-4" /> },
  { name: 'AWS', icon: <BrandIcons.AWSIcon className="h-4 w-4" /> },
  { name: 'Vercel', icon: <BrandIcons.VercelIcon className="h-4 w-4" /> },
  { name: 'Postgres', icon: <BrandIcons.PostgresIcon className="h-4 w-4" /> },
  { name: 'Redis', icon: <BrandIcons.RedisIcon className="h-4 w-4" /> },
  { name: 'Supabase', icon: <BrandIcons.SupabaseIcon className="h-4 w-4" /> },
  { name: 'Linear', icon: <BrandIcons.LinearIcon className="h-4 w-4" /> },
  { name: 'Slack', icon: <BrandIcons.SlackIcon className="h-4 w-4" /> },
  { name: 'Jira', icon: <BrandIcons.JiraIcon className="h-4 w-4" /> },
  { name: 'Figma', icon: <BrandIcons.FigmaIcon className="h-4 w-4" /> },
  { name: 'Python', icon: <BrandIcons.PythonIcon className="h-4 w-4" /> },
  { name: 'TypeScript', icon: <BrandIcons.TypeScriptIcon className="h-4 w-4" /> },
  { name: 'React', icon: <BrandIcons.ReactIcon className="h-4 w-4" /> },
  { name: 'Next.js', icon: <BrandIcons.NextjsIcon className="h-4 w-4" /> },
  { name: 'Node.js', icon: <BrandIcons.NodejsIcon className="h-4 w-4" /> },
  { name: 'Tailwind', icon: <BrandIcons.TailwindIcon className="h-4 w-4" /> },
  { name: 'Kubernetes', icon: <BrandIcons.KubernetesIcon className="h-4 w-4" /> },
  { name: 'Terraform', icon: <BrandIcons.TerraformIcon className="h-4 w-4" /> },
  { name: 'Datadog', icon: <BrandIcons.DatadogIcon className="h-4 w-4" /> },
  { name: 'Sentry', icon: <BrandIcons.SentryIcon className="h-4 w-4" /> },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<'explorer' | 'terminal' | 'diffs'>('explorer');

  return (
    <>
      <SEO
        title="Puku — The AI software engineer"
        description="Puku is the autonomous AI software engineer. Assign Puku to tickets, migrations, code reviews, and background chores."
      />

      <div className="bg-[#FFFFFF] text-[#0F0F11] font-sans selection:bg-[#6E56CF]/15 selection:text-[#0F0F11]">
        
        {/* ════════════════════════════════════════════════════
            SECTION 1 — HERO (Light Off-White Theme)
        ════════════════════════════════════════════════════ */}
        <section className="pt-28 pb-16 px-4 text-center max-w-5xl mx-auto">
          
          {/* Announcement Pill with Subtle Slate Violet Accents */}
          <div className="inline-block mb-6">
            <Link to="/blog" className="announcement-pill border-[#E4DDFE] bg-[#F4F2FF] hover:border-[#6E56CF]">
              <span className="h-5 px-2 rounded-[2px] bg-[#6E56CF] text-white text-[11px] font-bold uppercase tracking-wider flex items-center">
                NEW
              </span>
              <span className="text-[#6E56CF] font-semibold">Announcing Puku 2.0</span>
              <ChevronRight className="h-3.5 w-3.5 text-[#6E56CF]" />
            </Link>
          </div>

          {/* Hero Heading — 48px font-semibold */}
          <h1 className="text-[34px] sm:text-[42px] md:text-[48px] font-semibold tracking-[-0.03em] leading-[1.08] text-[#0F0F11] font-display max-w-3xl mx-auto">
            One Environment for
            <br />
            <span className="text-purple-highlight">AI Workflows</span>
          </h1>

          {/* Smaller Compact Action Buttons WITH GENEROUS GAP (gap-6) */}
          <div className="mt-8 flex items-center justify-center gap-6">
            <Link
              to="/contact"
              className="px-6 py-2.5 bg-[#0F0F11] text-white font-semibold text-[15px] rounded-[2px] hover:bg-[#6E56CF] transition-colors flex items-center justify-center shadow-none"
            >
              Try Puku
            </Link>
            <Link
              to="/contact"
              className="px-6 py-2.5 bg-white border border-[#E5E5E8] text-[#0F0F11] font-semibold text-[15px] rounded-[2px] hover:bg-[#F3F3F5] transition-colors flex items-center justify-center shadow-none"
            >
              Contact sales
            </Link>
          </div>

          {/* ─── Hero Floating Mock IDE Window ────────────────── */}
          <div className="mt-14 max-w-5xl mx-auto bg-white rounded-[2px] border border-[#E5E5E8] shadow-none overflow-hidden text-left">
            
            {/* Top Bar */}
            <div className="px-4 py-3 bg-[#FAFAFC] border-b border-[#E5E5E8] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-[#E5E5E8]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#E5E5E8]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#E5E5E8]" />
                <span className="ml-2 text-[12px] font-mono text-[#666666]">puku-workspace / src / auth</span>
              </div>
              <div className="flex items-center gap-1 font-mono text-[12.5px]">
                <button
                  onClick={() => setActiveTab('explorer')}
                  className={cn('px-3 py-1 rounded-[2px] text-[14px] transition-colors', activeTab === 'explorer' ? 'bg-white border border-[#E5E5E8] text-black font-semibold' : 'text-[#666666]')}
                >
                  Explorer
                </button>
                <button
                  onClick={() => setActiveTab('terminal')}
                  className={cn('px-3 py-1 rounded-[2px] text-[14px] transition-colors', activeTab === 'terminal' ? 'bg-white border border-[#E5E5E8] text-black font-semibold' : 'text-[#666666]')}
                >
                  Terminal
                </button>
                <button
                  onClick={() => setActiveTab('diffs')}
                  className={cn('px-3 py-1 rounded-[2px] text-[14px] transition-colors', activeTab === 'diffs' ? 'bg-white border border-[#E5E5E8] text-black font-semibold' : 'text-[#666666]')}
                >
                  Diffs
                </button>
              </div>
            </div>

            {/* IDE Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 min-h-[400px]">
              
              {/* Left Pane: Explorer & Task steps */}
              <div className="md:col-span-4 p-5 border-b md:border-b-0 md:border-r border-[#E5E5E8] bg-[#FAFAFC] text-[13px]">
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#333338] font-bold mb-3">Puku Agent Plan</div>
                
                <div className="space-y-2">
                  <div className="p-3 bg-white rounded-[2px] border border-[#E5E5E8] shadow-none flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-[#6E56CF] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-[#0F0F11]">Read 34 repository files</div>
                      <div className="text-[11px] text-[#333338] font-mono font-medium mt-0.5">Parsed auth & middleware dependencies</div>
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-[2px] border border-[#6E56CF]/40 shadow-none flex items-start gap-2.5">
                    <div className="h-3.5 w-3.5 rounded-full bg-[#6E56CF] animate-pulse shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-[#0F0F11]">Fixing JWT Session Expiry</div>
                      <div className="text-[11px] text-[#6E56CF] font-mono font-bold mt-0.5">Editing src/auth/session.ts...</div>
                    </div>
                  </div>

                  <div className="p-3 bg-[#F3F3F5] rounded-[2px] border border-[#E5E5E8] flex items-start gap-2.5 text-[#333338]">
                    <div className="h-3.5 w-3.5 rounded-full border border-[#0F0F11] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-[#0F0F11]">Run pytest & end-to-end suite</div>
                      <div className="text-[11px] font-mono font-semibold mt-0.5 text-[#333338]">Queued</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Center Pane: Prompt & Code Execution */}
              <div className="md:col-span-5 p-5 border-b md:border-b-0 md:border-r border-[#E5E5E8] bg-white font-mono text-[12px] leading-relaxed">
                <div className="text-[11px] text-[#333338] font-bold mb-1.5">// User Request</div>
                <div className="p-2.5 bg-[#F3F3F5] rounded-[2px] border border-[#E5E5E8] text-[#0F0F11] font-sans text-[13px] font-medium mb-3">
                  "Fix unhandled JWT session invalidation during high concurrent load."
                </div>

                <div className="text-[11px] text-[#333338] font-bold mb-1">// Puku Diff Patch</div>
                <div className="p-3 bg-[#09090C] text-[#F8FAFC] rounded-[2px] overflow-x-auto space-y-1">
                  <div className="text-[#6E56CF] font-bold">+ export class SessionHandler &#123;</div>
                  <div className="text-[#6E56CF] font-bold">+   private cache = new Map&lt;string, WeakRef&lt;Token&gt;&gt;();</div>
                  <div className="text-zinc-300">    public validateToken(token: string) &#123;</div>
                  <div className="text-[#6E56CF] font-bold">+     return this.cache.has(token);</div>
                  <div className="text-zinc-300">    &#125;</div>
                </div>
              </div>

              {/* Right Pane: Security & Feature Badges */}
              <div className="md:col-span-3 p-5 bg-[#FAFAFC] flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[#333338] font-bold mb-3">Puku Features</div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {['Secure', 'Private', 'Verified', 'Enterprise'].map((badge, idx) => (
                      <div key={idx} className="p-2.5 bg-white rounded-[2px] border border-[#E5E5E8] text-center font-extrabold text-[12.5px] text-[#0F0F11]">
                        {badge}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E5E5E8] text-[12px] text-[#1A1A1E] font-medium">
                  Status: <span className="font-bold text-[#6E56CF]">Active Execution</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            SECTION 2 — SIX INTEGRATED PRODUCTS OF PUKU
        ════════════════════════════════════════════════════ */}
        <section className="py-20 px-4 max-w-6xl mx-auto border-t border-[#E5E5E8]">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#6E56CF] px-3 py-1 rounded-[2px] bg-[#F4F2FF] border border-[#E4DDFE]">
              PUKU PRODUCT SUITE
            </span>
            <h2 className="mt-4 text-[32px] sm:text-[44px] font-bold text-[#0F0F11] font-display tracking-tight">
              Six products. <span className="text-purple-highlight">One platform.</span>
            </h2>
            <p className="mt-2.5 text-[16px] text-[#1A1A1E] font-medium">
              A complete autonomous software suite designed to accelerate engineering workflows across your entire stack.
            </p>
          </div>

          {/* 6 Products Cards with Subtle Slate Violet Accents */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {pukuProducts.map((prod, idx) => {
              const Icon = prod.icon;
              return (
                <Link
                  key={idx}
                  to={prod.href}
                  className="puku-light-card p-6 rounded-[2px] flex flex-col justify-between h-full group transition-all"
                >
                  <div>
                    {/* ICON BG: Neutral Grey Shade (#F3F3F5) */}
                    <div className="h-10 w-10 rounded-[2px] bg-[#F3F3F5] border border-[#E5E5E8] text-[#0F0F11] flex items-center justify-center mb-5 group-hover:bg-[#6E56CF] group-hover:border-[#6E56CF] group-hover:text-white transition-colors">
                      <Icon className="h-5 w-5 text-[#0F0F11] group-hover:text-white" />
                    </div>

                    <h3 className="text-[19px] font-bold text-[#0F0F11] font-display group-hover:text-[#6E56CF] transition-colors flex items-center justify-between mb-1">
                      <span>{prod.name}</span>
                      <ArrowRight className="h-4 w-4 text-[#0F0F11] group-hover:translate-x-1 group-hover:text-[#6E56CF] transition-all" />
                    </h3>

                    <div className="text-[12.5px] font-mono font-bold text-[#6E56CF] mb-3">{prod.tagline}</div>

                    <p className="text-[14px] text-[#1A1A1E] font-medium leading-relaxed mb-6">
                      {prod.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E5E5E8] flex items-center justify-between text-[14px] font-semibold text-[#0F0F11] group-hover:text-[#6E56CF] transition-colors">
                    <span>Explore {prod.name}</span>
                    <ChevronRight className="h-4 w-4 text-[#6E56CF]" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            SECTION 3 — BUILD WITH PUKU & LOGO MATRIX
        ════════════════════════════════════════════════════ */}
        <section className="py-20 px-4 text-center max-w-6xl mx-auto border-t border-[#E5E5E8]">
          <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#333338] mb-2.5">
            TRUSTED BY LEADING TEAMS
          </div>
          
          <h2 className="text-[32px] sm:text-[44px] font-bold text-[#0F0F11] font-display tracking-tight">
            Build with <span className="text-purple-highlight">Puku</span>
          </h2>

          <div className="mt-4 mb-10">
            <Link to="/enterprise" className="px-5 py-2 bg-[#0F0F11] text-white text-[15px] font-semibold rounded-[2px] hover:bg-[#6E56CF] transition-colors inline-block shadow-none">
              See customer stories
            </Link>
          </div>

          {/* 5x4 Grid of clean company logos */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
            {companyLogos.map((c, idx) => (
              <div
                key={idx}
                className="p-3.5 h-15 bg-white border border-[#E5E5E8] rounded-[2px] flex items-center justify-start px-4 gap-3 hover:border-[#6E56CF] transition-colors group shadow-none"
              >
                <div className="h-7.5 w-7.5 rounded-[2px] bg-[#F3F3F5] border border-[#E5E5E8] flex items-center justify-center text-[#0F0F11] group-hover:bg-[#6E56CF] group-hover:border-[#6E56CF] group-hover:text-white transition-colors shrink-0">
                  {c.icon}
                </div>
                <span className="text-[13.5px] font-bold text-[#0F0F11] font-display truncate">{c.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            SECTION 4 — USE CASES GRID
        ════════════════════════════════════════════════════ */}
        <section className="py-20 px-4 max-w-6xl mx-auto border-t border-[#E5E5E8]">
          <div className="text-left mb-12">
            <h2 className="text-[32px] sm:text-[44px] font-bold text-[#0F0F11] font-display tracking-tight">
              Use cases
            </h2>
            <p className="mt-2 text-[16px] font-medium text-[#1A1A1E] max-w-xl">
              Assign Puku to tickets, migrations, code reviews, and background chores.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {useCases.map((uc, idx) => (
              <div
                key={idx}
                className={cn(
                  'puku-light-card p-6 rounded-[2px] flex flex-col justify-between h-full shadow-none',
                  uc.colSpan
                )}
              >
                <div>
                  <div className="inline-block px-2.5 py-1 rounded-[2px] bg-[#F4F2FF] text-[11.5px] font-mono font-bold text-[#6E56CF] mb-4 border border-[#E4DDFE]">
                    {uc.badge}
                  </div>
                  <h3 className="text-[20px] font-extrabold text-[#0F0F11] font-display mb-2">{uc.title}</h3>
                  <p className="text-[14px] text-[#1A1A1E] font-medium leading-relaxed mb-4">{uc.desc}</p>
                  
                  <ul className="space-y-2 text-[13px] text-[#0F0F11] font-medium mb-6">
                    {uc.bullets.map((b, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="h-3.5 w-3.5 text-[#6E56CF] shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Mock Card Preview Graphic */}
                <div className="p-3.5 bg-[#FAFAFC] rounded-[2px] border border-[#E5E5E8]">
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#333338] font-bold mb-2">
                    <span>Puku Preview</span>
                    <span className="text-[#6E56CF] font-bold">✓ Verified</span>
                  </div>
                  <div className="h-12 bg-white rounded-[2px] border border-[#E5E5E8] px-3 flex items-center justify-between text-[12.5px] font-bold text-[#0F0F11]">
                    <span>{uc.title} automated task</span>
                    <ArrowRight className="h-4 w-4 text-[#6E56CF]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            SECTION 5 — DARK SECTION ("Learn & work together")
        ════════════════════════════════════════════════════ */}
        <section className="py-24 px-4 bg-[#09090C] text-white border-y border-white/10">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 text-left">
            
            {/* Left Column */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <h2 className="text-[36px] sm:text-[48px] font-semibold font-display tracking-tight leading-tight">
                  Learn & work
                  <br />
                  <span className="text-purple-highlight">together</span>
                </h2>
                <p className="mt-3.5 text-[16px] font-normal text-[#A0A0A6] leading-relaxed">
                  Puku learns your codebase guidelines, team conventions, and institutional knowledge over time.
                </p>
              </div>

              {/* Dark Card */}
              <div className="mt-8 puku-dark-card p-6 rounded-[2px]">
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#6E56CF] mb-2">Knowledge Engine</div>
                <h4 className="text-[18px] font-bold text-white font-display mb-3">Learn your codebase & enterprise knowledge</h4>
                <div className="p-3 bg-[#050508] rounded-[2px] border border-white/10 flex items-center gap-2 text-[13px] text-[#AAA] font-mono">
                  <Search className="h-4 w-4 text-[#6E56CF]" />
                  <span>Index 1,420 repository specs...</span>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-7 space-y-5">
              
              {/* Card 1: Data Privacy & Permissions */}
              <div className="puku-dark-card p-6 rounded-[2px]">
                <div className="flex items-center gap-3.5 mb-3.5">
                  <div className="h-10 w-10 rounded-[2px] bg-[#F4F2FF]/10 border border-white/10 flex items-center justify-center text-[#6E56CF] shrink-0">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-[18px] font-bold text-white font-display">Data privacy & permissions</h3>
                    <p className="text-[12.5px] text-[#AAA]">SOC 2 Type II, ISO 27001, Zero Data Retention</p>
                  </div>
                </div>
                <p className="text-[14px] text-[#C0C0C6] leading-relaxed">
                  Puku operates in isolated single-tenant cloud sandboxes. Your proprietary source code is never used to train global AI models.
                </p>
              </div>

              {/* Card 2: Self-correct & Learn over time */}
              <div className="puku-dark-card p-6 rounded-[2px]">
                <div className="flex items-center gap-3.5 mb-3.5">
                  <div className="h-10 w-10 rounded-[2px] bg-[#F4F2FF]/10 border border-white/10 flex items-center justify-center text-[#6E56CF] shrink-0">
                    <RefreshCw className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-[18px] font-bold text-white font-display">Self-correct & learn over time</h3>
                    <p className="text-[12.5px] text-[#AAA]">Adapts to code reviews & linter rules automatically</p>
                  </div>
                </div>

                <div className="p-3.5 bg-[#050508] rounded-[2px] border border-white/10 font-mono text-[12.5px] text-[#6E56CF] space-y-1">
                  <div>$ puku run linter-check</div>
                  <div className="text-white">✓ Adjusted component imports based on team conventions</div>
                  <div className="text-[#6E56CF]">✓ Saved rule to .puku/rules.md</div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            SECTION 6 — TOOLS SECTION ("hundreds of tools") WITH REAL BRAND SVG LOGOS
        ════════════════════════════════════════════════════ */}
        <section className="py-24 px-4 text-center max-w-6xl mx-auto">
          <div className="text-[13px] font-mono text-[#666666] max-w-2xl mx-auto mb-2.5">
            A full dev environment on the cloud.
          </div>

          <h2 className="text-[32px] sm:text-[44px] font-semibold text-[#0F0F11] font-display tracking-tight">
            Able to work with <span className="text-purple-highlight">hundreds of tools.</span>
          </h2>

          {/* Staggered Grid of Tools with Authentic Brand SVG Logos */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
            {toolsListWithIcons.map((t, idx) => (
              <div
                key={idx}
                className="p-3.5 h-14 bg-white border border-[#E5E5E8] rounded-[2px] flex items-center justify-start px-4 gap-3 hover:border-[#6E56CF] transition-colors shadow-none group"
              >
                <div className="h-7 w-7 rounded-[2px] bg-[#F3F3F5] border border-[#E5E5E8] flex items-center justify-center text-[#0F0F11] group-hover:bg-[#6E56CF] group-hover:border-[#6E56CF] group-hover:text-white transition-colors shrink-0">
                  {t.icon}
                </div>
                <span className="text-[13.5px] font-semibold text-[#0F0F11] font-display truncate">{t.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            SECTION 7 — BOTTOM CTA BANNER ("Build more with Puku")
        ════════════════════════════════════════════════════ */}
        <CtaBanner />

      </div>
    </>
  );
}