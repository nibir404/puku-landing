import { useParams, Link, useNavigate } from 'react-router-dom';
import { SEO } from '@/components/layout/SEO';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { cn } from '@/lib/cn';
import { Search, Compass, BookOpen, Code, Cloud, Paintbrush, Users, Smartphone, Terminal, ShieldAlert, Cpu, Check, Copy, ArrowUp, ChevronDown } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type DocTopic = {
  id: string;
  name: string;
  desc: string;
  icon: React.ReactNode;
};

type DocSection = {
  title: string;
  items: DocTopic[];
};

// 1. Documentation Sections for the 6 Products
const EDITOR_SECTIONS: DocSection[] = [
  {
    title: 'Getting started',
    items: [
      { id: 'introduction', name: 'Introduction', desc: 'Welcome to Puku Editor.', icon: <Compass className="h-4 w-4" /> },
      { id: 'quick-start', name: 'Quickstart', desc: 'Install and set up.', icon: <BookOpen className="h-4 w-4" /> },
      { id: 'troubleshooting', name: 'Troubleshooting', desc: 'Solve common problems.', icon: <ShieldAlert className="h-4 w-4" /> },
    ],
  },
  {
    title: 'Core Features',
    items: [
      { id: 'features', name: 'Overview', desc: 'Features layout.', icon: <Code className="h-4 w-4" /> },
      { id: 'chat', name: 'AI Chat', desc: 'Interactive chat environment.', icon: <Compass className="h-4 w-4" /> },
      { id: 'context-engine', name: 'Context Engine', desc: '200k Token compaction.', icon: <Cpu className="h-4 w-4" /> },
      { id: 'completions', name: 'Code Completions', desc: 'Fill-In-The-Middle completions.', icon: <Code className="h-4 w-4" /> },
    ],
  },
];

const CLI_SECTIONS: DocSection[] = [
  {
    title: 'Getting started',
    items: [
      { id: 'introduction', name: 'Introduction', desc: 'Welcome to Puku CLI.', icon: <Compass className="h-4 w-4" /> },
      { id: 'quick-start', name: 'Quick Start', desc: 'Install and set up CLI.', icon: <BookOpen className="h-4 w-4" /> },
      { id: 'installation', name: 'Installation', desc: 'Detailed setup instructions.', icon: <Terminal className="h-4 w-4" /> },
    ],
  },
  {
    title: 'Advanced Settings',
    items: [
      { id: 'agents', name: 'Agents Config', desc: 'AI Persona setups.', icon: <Users className="h-4 w-4" /> },
      { id: 'skills', name: 'Skills Mappings', desc: 'Invoking custom templates.', icon: <Code className="h-4 w-4" /> },
    ],
  },
];

const CLOUD_SECTIONS: DocSection[] = [
  {
    title: 'Getting started',
    items: [
      { id: 'introduction', name: 'Introduction', desc: 'Welcome to Puku Cloud.', icon: <Compass className="h-4 w-4" /> },
      { id: 'deployments', name: 'Deployments Flow', desc: 'Ship from code to staging.', icon: <Cloud className="h-4 w-4" /> },
    ],
  },
  {
    title: 'Infrastructure',
    items: [
      { id: 'gpu-pools', name: 'Serverless GPU Pools', desc: 'Scale computing pipelines.', icon: <Cpu className="h-4 w-4" /> },
      { id: 'secrets', name: 'Secrets Manager', desc: 'Manage API tokens safely.', icon: <ShieldAlert className="h-4 w-4" /> },
    ],
  },
];

const DESIGN_SECTIONS: DocSection[] = [
  {
    title: 'Getting Started',
    items: [
      { id: 'introduction', name: 'Introduction', desc: 'Welcome to Puku Design.', icon: <Compass className="h-4 w-4" /> },
    ],
  },
  {
    title: 'Layout & Tokens',
    items: [
      { id: 'tokens', name: 'Canvas Tokens Sync', desc: 'Connect variables with Figma.', icon: <Paintbrush className="h-4 w-4" /> },
      { id: 'layouts', name: 'Layout Structures', desc: 'Review coordinate nodes.', icon: <Code className="h-4 w-4" /> },
    ],
  },
];

const COWORK_SECTIONS: DocSection[] = [
  {
    title: 'Getting Started',
    items: [
      { id: 'introduction', name: 'Introduction', desc: 'Welcome to Puku Co-work.', icon: <Compass className="h-4 w-4" /> },
    ],
  },
  {
    title: 'Multi-Agent Flow',
    items: [
      { id: 'collaboration', name: 'Collaboration Canvases', desc: 'Work inside shared threads.', icon: <Users className="h-4 w-4" /> },
      { id: 'agent-sync', name: 'Multi-Agent Sync', desc: 'Synthesize context traces.', icon: <Cpu className="h-4 w-4" /> },
    ],
  },
];

const APP_SECTIONS: DocSection[] = [
  {
    title: 'Getting Started',
    items: [
      { id: 'introduction', name: 'Introduction', desc: 'Welcome to Puku App.', icon: <Compass className="h-4 w-4" /> },
    ],
  },
  {
    title: 'Desktop Client',
    items: [
      { id: 'desktop', name: 'Desktop Client Options', desc: 'System requirements.', icon: <Smartphone className="h-4 w-4" /> },
      { id: 'notifications', name: 'Agent Notifications', desc: 'Receive background ticks.', icon: <ShieldAlert className="h-4 w-4" /> },
    ],
  },
];

const DocsCodeBlock = ({ code, language = 'bash' }: { code: string; language?: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  return (
    <div className="relative group border border-border rounded-[4px] overflow-hidden bg-ink text-zinc-200 shadow-soft my-4">
      <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800 bg-zinc-900/40 text-[11px] font-mono text-zinc-400 select-none">
        <span>{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 hover:text-white transition-colors"
          aria-label="Copy code snippet"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
              <span className="text-emerald-400 font-semibold">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 font-mono text-[13px] overflow-x-auto leading-relaxed">
        <code>{code.trim()}</code>
      </pre>
    </div>
  );
};

// 2. Comprehensive Documentation Database for the 6 Products
const DOCS_CONTENT: Record<string, Record<string, {
  title: string;
  category: string;
  description: string;
  content: React.ReactNode;
  toc: { id: string; label: string }[];
}>> = {
  'puku-editor': {
    'introduction': {
      title: 'Introduction — Puku Editor',
      category: 'Getting Started',
      description: 'Puku Editor is an AI-powered code editor that helps you code faster through intelligent predictions, semantic understanding, and context-aware suggestions.',
      toc: [
        { id: 'what-is-puku', label: 'What is Puku?' },
        { id: 'platforms', label: 'Available Platforms' },
      ],
      content: (
        <div className="space-y-6">
          <h2 id="what-is-puku" className="text-lg font-bold text-ink border-b border-border/60 pb-2">What is Puku?</h2>
          <p>
            Puku is a lightweight, high-performance editor enhanced with AI capabilities that go beyond basic autocomplete. It predicts where you'll edit next, understands your codebase semantically, and provides intelligent assistance throughout your workflow.
          </p>
          <h2 id="platforms" className="text-lg font-bold text-ink border-b border-border/60 pb-2">Available Platforms</h2>
          <p>Download the installer matching your OS profile: macOS (Apple Silicon & Intel), Windows, and Linux are supported out-of-the-box.</p>
        </div>
      )
    },
    'quick-start': {
      title: 'Quickstart — Puku Editor',
      category: 'Getting Started',
      description: 'Get up and running with Puku Editor and connect your first codebase.',
      toc: [
        { id: 'first-folder', label: 'Opening a Workspace' }
      ],
      content: (
        <div className="space-y-6">
          <h2 id="first-folder" className="text-lg font-bold text-ink border-b border-border/60 pb-2">Opening a Workspace</h2>
          <p>Once open, load any directory by selecting <strong>File &gt; Open Folder</strong>. Puku will prompt you to build a local vector database index for fast codebase context retrieval.</p>
        </div>
      )
    },
    'troubleshooting': {
      title: 'Troubleshooting — Puku Editor',
      category: 'Getting Started',
      description: 'Resolve common setup issues, indexing errors, and connection faults.',
      toc: [
        { id: 'reindex-db', label: 'Resetting Indices' }
      ],
      content: (
        <div className="space-y-6">
          <h2 id="reindex-db" className="text-lg font-bold text-ink border-b border-border/60 pb-2">Resetting Indices</h2>
          <p>Re-trigger database generation by calling the command palette command <code>Puku: Rebuild Search Index</code>.</p>
        </div>
      )
    },
    'features': {
      title: 'Overview — Puku Editor',
      category: 'Core Features',
      description: 'An overview of principal capabilities in Puku Editor.',
      toc: [{ id: 'layout', label: 'Interface Layout' }],
      content: (
        <div className="space-y-6">
          <h2 id="layout" className="text-lg font-bold text-ink border-b border-border/60 pb-2">Interface Layout</h2>
          <p>Puku includes a standard workspace area, a persistent right-hand AI Chat drawer, and an interactive terminal debugger at the bottom.</p>
        </div>
      )
    },
    'chat': {
      title: 'AI Chat — Puku Editor',
      category: 'Core Features',
      description: 'Interact with AI reasoning models and prompt files locally.',
      toc: [{ id: 'summon-chat', label: 'Summoning Chat' }],
      content: (
        <div className="space-y-6">
          <h2 id="summon-chat" className="text-lg font-bold text-ink border-b border-border/60 pb-2">Summoning Chat</h2>
          <p>Press <code>Cmd + L</code> to toggle the interactive AI assistant sidebar pane. Ask coding questions or request complex refactors.</p>
        </div>
      )
    },
    'context-engine': {
      title: 'Context Engine — Puku Editor',
      category: 'Core Features',
      description: 'Compact code context inside the active 200k token window.',
      toc: [{ id: 'compaction-rules', label: 'Compaction Rules' }],
      content: (
        <div className="space-y-6">
          <h2 id="compaction-rules" className="text-lg font-bold text-ink border-b border-border/60 pb-2">Compaction Rules</h2>
          <p>Puku summarizes imports, class structures, and function outlines dynamically to maintain relevant context without blowing input limits.</p>
        </div>
      )
    },
    'completions': {
      title: 'Code Completions — Puku Editor',
      category: 'Core Features',
      description: 'Sub-12ms prediction overlays inside the editor.',
      toc: [{ id: 'ghost-text', label: 'Ghost Text Completions' }],
      content: (
        <div className="space-y-6">
          <h2 id="ghost-text" className="text-lg font-bold text-ink border-b border-border/60 pb-2">Ghost Text Completions</h2>
          <p>Ghost text updates instantly as you type, predicting code before and after the cursor using Fill-in-the-Middle logic.</p>
        </div>
      )
    }
  },
  'puku-cli': {
    'introduction': {
      title: 'Introduction — Puku CLI',
      category: 'Getting Started',
      description: 'Puku CLI is an AI-powered coding assistant that runs entirely in your terminal. It lets you write, edit, debug, and review code.',
      toc: [{ id: 'cli-features', label: 'What Puku CLI Can Do' }],
      content: (
        <div className="space-y-6">
          <h2 id="cli-features" className="text-lg font-bold text-ink border-b border-border/60 pb-2">What Puku CLI Can Do</h2>
          <p>Unlike web-based AI tools, puku-cli operates directly where developers work: the command line. It reads your files, runs shell commands, searches your codebase, and executes code safely on your behalf.</p>
        </div>
      )
    },
    'quick-start': {
      title: 'Quick Start — Puku CLI',
      category: 'Getting Started',
      description: 'Launch Puku CLI in under two minutes.',
      toc: [{ id: 'cli-boot', label: 'Invoking Puku' }],
      content: (
        <div className="space-y-6">
          <h2 id="cli-boot" className="text-lg font-bold text-ink border-b border-border/60 pb-2">Invoking Puku</h2>
          <p>Start a terminal thread session by running:</p>
          <DocsCodeBlock code="puku" language="bash" />
        </div>
      )
    },
    'installation': {
      title: 'Installation — Puku CLI',
      category: 'Getting Started',
      description: 'Setup dependencies and compile options for the command line utility.',
      toc: [{ id: 'prereqs', label: 'Prerequisites' }],
      content: (
        <div className="space-y-6">
          <h2 id="prereqs" className="text-lg font-bold text-ink border-b border-border/60 pb-2">Prerequisites</h2>
          <p>puku-cli requires Node.js v18 or newer. Install it using your terminal script:</p>
          <DocsCodeBlock code="curl -fsSL https://get.puku.dev/install | sh" language="bash" />
        </div>
      )
    },
    'agents': {
      title: 'Agents Config — Puku CLI',
      category: 'Advanced Settings',
      description: 'Define customized assistant roles and tool access boundaries.',
      toc: [{ id: 'agents-config', label: 'Agents Personas' }],
      content: (
        <div className="space-y-6">
          <h2 id="agents-config" className="text-lg font-bold text-ink border-b border-border/60 pb-2">Agents Personas</h2>
          <p>Save persona specifications inside <code>.puku/agents.json</code> to declare customized prompt templates and shell commands permission limits.</p>
        </div>
      )
    },
    'skills': {
      title: 'Skills Mappings — Puku CLI',
      category: 'Advanced Settings',
      description: 'Trigger prompt templates as slash commands.',
      toc: [{ id: 'skills-triggers', label: 'Command Mappings' }],
      content: (
        <div className="space-y-6">
          <h2 id="skills-triggers" className="text-lg font-bold text-ink border-b border-border/60 pb-2">Command Mappings</h2>
          <p>Define prompt shortcuts in `.puku/skills/` to execute complex multi-step templates from CLI prompts.</p>
        </div>
      )
    }
  },
  'puku-cloud': {
    'introduction': {
      title: 'Introduction — Puku Cloud',
      category: 'Getting Started',
      description: 'Puku Cloud is a serverless deployment platform built for containerized agent workloads, edge routing, and GPU scaling.',
      toc: [{ id: 'core-cloud', label: 'Core Capabilities' }],
      content: (
        <div className="space-y-6">
          <h2 id="core-cloud" className="text-lg font-bold text-ink border-b border-border/60 pb-2">Core Capabilities</h2>
          <p>Puku Cloud routes code execution environments globally, maintaining lightweight SQLite snapshots for rapid startup times (&lt; 100ms).</p>
        </div>
      )
    },
    'deployments': {
      title: 'Deployments Flow — Puku Cloud',
      category: 'Getting Started',
      description: 'Learn how to ship application workspaces from the editor to global production.',
      toc: [{ id: 'ship-trigger', label: 'Shipping Command' }],
      content: (
        <div className="space-y-6">
          <h2 id="ship-trigger" className="text-lg font-bold text-ink border-b border-border/60 pb-2">Shipping Command</h2>
          <p>Execute deployment actions directly inside your terminal or editor console:</p>
          <DocsCodeBlock code="puku deploy --prod" language="bash" />
        </div>
      )
    },
    'gpu-pools': {
      title: 'Serverless GPU Pools — Puku Cloud',
      category: 'Infrastructure',
      description: 'Scale computing parameters and model weights dynamically.',
      toc: [{ id: 'scale-configs', label: 'Scaling Configs' }],
      content: (
        <div className="space-y-6">
          <h2 id="scale-configs" className="text-lg font-bold text-ink border-b border-border/60 pb-2">Scaling Configs</h2>
          <p>Define dynamic scaling bounds inside your `.puku/cloud.json` deployment rules to assign model resources when needed.</p>
        </div>
      )
    },
    'secrets': {
      title: 'Secrets Manager — Puku Cloud',
      category: 'Infrastructure',
      description: 'Safeguard credentials, tokens, and encrypted keys.',
      toc: [{ id: 'env-secrets', label: 'Secrets Injection' }],
      content: (
        <div className="space-y-6">
          <h2 id="env-secrets" className="text-lg font-bold text-ink border-b border-border/60 pb-2">Secrets Injection</h2>
          <p>Credentials are encrypted at rest using AES-256 and injected into active workspace containers as read-only env variables.</p>
        </div>
      )
    }
  },
  'puku-design': {
    'introduction': {
      title: 'Introduction — Puku Design',
      category: 'Getting Started',
      description: 'Puku Design brings layout canvases and variables design directly into your code buffer.',
      toc: [{ id: 'design-intent', label: 'What is Puku Design?' }],
      content: (
        <div className="space-y-6">
          <h2 id="design-intent" className="text-lg font-bold text-ink border-b border-border/60 pb-2">What is Puku Design?</h2>
          <p>By mapping layout tokens to active React/CSS coordinate classes, changing visual assets inside Puku synchronizes code values immediately.</p>
        </div>
      )
    },
    'tokens': {
      title: 'Canvas Tokens Sync — Puku Design',
      category: 'Layout & Tokens',
      description: 'Synchronize design variables and Figma layouts with source code.',
      toc: [{ id: 'figma-sync', label: 'Figma Integration' }],
      content: (
        <div className="space-y-6">
          <h2 id="figma-sync" className="text-lg font-bold text-ink border-b border-border/60 pb-2">Figma Integration</h2>
          <p>Configure tokens mappings inside your local style sheets using standard CSS variables declarations.</p>
        </div>
      )
    },
    'layouts': {
      title: 'Layout Structures — Puku Design',
      category: 'Layout & Tokens',
      description: 'Visual coordinate layouts in Puku canvas editors.',
      toc: [{ id: 'editor-canvas', label: 'Canvas Editor' }],
      content: (
        <div className="space-y-6">
          <h2 id="editor-canvas" className="text-lg font-bold text-ink border-b border-border/60 pb-2">Canvas Editor</h2>
          <p>Toggle the split canvas preview inside Puku Editor to view graphic alignments updated in real time as you change code.</p>
        </div>
      )
    }
  },
  'puku-cowork': {
    'introduction': {
      title: 'Introduction — Puku Co-work',
      category: 'Getting Started',
      description: 'Puku Co-work coordinates team buffers and concurrent AI sub-agents in a single session.',
      toc: [{ id: 'cowork-overview', label: 'Collaborative Workspace' }],
      content: (
        <div className="space-y-6">
          <h2 id="cowork-overview" className="text-lg font-bold text-ink border-b border-border/60 pb-2">Collaborative Workspace</h2>
          <p>Share code sessions with design teammates and engineering developers, allowing multiple cursor modifications simultaneously.</p>
        </div>
      )
    },
    'collaboration': {
      title: 'Collaboration Canvases — Puku Co-work',
      category: 'Multi-Agent Flow',
      description: 'Collaborate with teammates inside the active editor canvas.',
      toc: [{ id: 'session-sharing', label: 'Sharing Sessions' }],
      content: (
        <div className="space-y-6">
          <h2 id="session-sharing" className="text-lg font-bold text-ink border-b border-border/60 pb-2">Sharing Sessions</h2>
          <p>Press the workspace share link button in Puku to invite collaborators. Invites are fully authenticated.</p>
        </div>
      )
    },
    'agent-sync': {
      title: 'Multi-Agent Sync — Puku Co-work',
      category: 'Multi-Agent Flow',
      description: 'Coordinate parallel agents execution securely.',
      toc: [{ id: 'agents-sync-rules', label: 'Sync Rules' }],
      content: (
        <div className="space-y-6">
          <h2 id="agents-sync-rules" className="text-lg font-bold text-ink border-b border-border/60 pb-2">Sync Rules</h2>
          <p>Agents align tasks dynamically, communicating through unified state contexts to prevent compile blocks.</p>
        </div>
      )
    }
  },
  'puku-app': {
    'introduction': {
      title: 'Introduction — Puku App',
      category: 'Getting Started',
      description: 'Puku App runs background checks and notification managers on your device.',
      toc: [{ id: 'desktop-client', label: 'Local Agent Checks' }],
      content: (
        <div className="space-y-6">
          <h2 id="desktop-client" className="text-lg font-bold text-ink border-b border-border/60 pb-2">Local Agent Checks</h2>
          <p>Puku App runs quietly in the system tray, monitoring workspace build logs and alerting developers when background tests succeed.</p>
        </div>
      )
    },
    'desktop': {
      title: 'Desktop Client Options — Puku App',
      category: 'Desktop Client',
      description: 'Manage desktop client installations and update schedules.',
      toc: [{ id: 'client-updates', label: 'Client Auto-updates' }],
      content: (
        <div className="space-y-6">
          <h2 id="client-updates" className="text-lg font-bold text-ink border-b border-border/60 pb-2">Client Auto-updates</h2>
          <p>Auto-updates execute in background threads. Updates verify cryptographic signatures before merging.</p>
        </div>
      )
    },
    'notifications': {
      title: 'Agent Notifications — Puku App',
      category: 'Desktop Client',
      description: 'Set alert configurations for build events.',
      toc: [{ id: 'alert-rules', label: 'Setting Custom Alerts' }],
      content: (
        <div className="space-y-6">
          <h2 id="alert-rules" className="text-lg font-bold text-ink border-b border-border/60 pb-2">Setting Custom Alerts</h2>
          <p>Map tray warnings to agent success stages (e.g. notify when edge container test runs compile clean).</p>
        </div>
      )
    }
  }
};

const PRODUCTS_LIST = [
  { id: 'puku-editor', name: 'Puku Editor', icon: <Code className="h-4 w-4" /> },
  { id: 'puku-cli', name: 'Puku CLI', icon: <Terminal className="h-4 w-4" /> },
  { id: 'puku-cloud', name: 'Puku Cloud', icon: <Cloud className="h-4 w-4" /> },
  { id: 'puku-design', name: 'Puku Design', icon: <Paintbrush className="h-4 w-4" /> },
  { id: 'puku-cowork', name: 'Puku Co-work', icon: <Users className="h-4 w-4" /> },
  { id: 'puku-app', name: 'Puku App', icon: <Smartphone className="h-4 w-4" /> },
];

export default function Docs() {
  const { productName, pageId } = useParams<{ productName?: string; pageId?: string }>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeHeading, setActiveHeading] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showSelector, setShowSelector] = useState(false);
  
  const selectorRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (selectorRef.current && !selectorRef.current.contains(event.target as Node)) {
        setShowSelector(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Determine active product, mapping route parameter
  const activeProduct = productName && DOCS_CONTENT[productName] ? productName : 'puku-editor';
  const activeTopic = pageId && DOCS_CONTENT[activeProduct][pageId] ? pageId : 'introduction';
  const article = DOCS_CONTENT[activeProduct][activeTopic];

  const handleTopicClick = (id: string) => {
    navigate(`/docs/${activeProduct}/${id}`);
    setSearchQuery('');
  };

  // Select sections matching active product
  const sections = 
    activeProduct === 'puku-cli' ? CLI_SECTIONS :
    activeProduct === 'puku-cloud' ? CLOUD_SECTIONS :
    activeProduct === 'puku-design' ? DESIGN_SECTIONS :
    activeProduct === 'puku-cowork' ? COWORK_SECTIONS :
    activeProduct === 'puku-app' ? APP_SECTIONS :
    EDITOR_SECTIONS;

  const allItems = sections.flatMap(s => s.items);

  const selectedProductInfo = PRODUCTS_LIST.find(p => p.id === activeProduct) || PRODUCTS_LIST[0];

  // Filter sections based on search query
  const filteredSections = sections.map(section => {
    const items = section.items.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return { ...section, items };
  }).filter(section => section.items.length > 0);

  // ScrollSpy observer setup
  useEffect(() => {
    const headings = article.toc.map(item => document.getElementById(item.id));
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
          }
        });
      },
      { rootMargin: '-120px 0px -70% 0px', threshold: 0.1 }
    );

    headings.forEach((heading) => {
      if (heading) observer.observe(heading);
    });

    return () => {
      headings.forEach((heading) => {
        if (heading) observer.unobserve(heading);
      });
    };
  }, [activeTopic, activeProduct]);

  // Scroll details back to top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -110;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveHeading(id);
    }
  };

  return (
    <>
      <SEO title={`${article.title} — Puku Documentation`} description={article.description} />
      
      <div className="min-h-screen pt-24 bg-[#f5f5f7]">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] lg:grid-cols-[260px_1fr_200px] gap-8 py-10">
            
            {/* Left Sidebar - Navigation */}
            <aside className="space-y-6 md:sticky md:top-28 self-start">
              
              {/* Premium Product Switcher Dropdown (Accommodating 6 products seamlessly) */}
              <div className="relative" ref={selectorRef}>
                <button
                  onClick={() => setShowSelector(!showSelector)}
                  className="w-full flex items-center justify-between gap-2 border border-border bg-white rounded-[4px] p-2.5 shadow-sm text-[13px] font-semibold text-ink hover:border-accent/40 hover:bg-[#f5f5f7]/30 transition-all select-none"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-accent">{selectedProductInfo.icon}</span>
                    <span>{selectedProductInfo.name}</span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-ink-muted transition-transform duration-200" style={{ transform: showSelector ? 'rotate(180deg)' : 'none' }} />
                </button>

                <AnimatePresence>
                  {showSelector && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute z-50 left-0 right-0 mt-1 bg-white border border-border rounded-[4px] shadow-lg py-1 overflow-hidden"
                    >
                      {PRODUCTS_LIST.map((prod) => (
                        <Link
                          key={prod.id}
                          to={`/docs/${prod.id}/introduction`}
                          onClick={() => setShowSelector(false)}
                          className={cn(
                            "w-full flex items-center gap-2 px-3.5 py-2 text-[12.5px] text-left transition-colors font-medium",
                            activeProduct === prod.id
                              ? "bg-[#F4F2FF] text-[#6E56CF] font-bold"
                              : "text-[#1A1A1E] hover:text-[#6E56CF] hover:bg-[#FAFAFC]"
                          )}
                        >
                          <span className={activeProduct === prod.id ? 'text-[#6E56CF]' : 'text-[#0F0F11]'}>
                            {prod.icon}
                          </span>
                          <span>{prod.name}</span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#0F0F11]" />
                <input
                  type="text"
                  placeholder="Search documentation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 rounded-[4px] border border-[#E5E5E8] bg-white pl-9 pr-8 text-[13.5px] text-[#0F0F11] font-medium placeholder-[#4A4A52] focus:outline-none focus:border-[#6E56CF] transition-colors"
                />
              </div>

              {/* Dynamic Navigation Sections */}
              <div className="space-y-6">
                {filteredSections.length > 0 ? (
                  filteredSections.map((section) => (
                    <div key={section.title} className="space-y-2">
                      <h3 className="font-mono text-[11px] uppercase tracking-wider text-[#0F0F11] font-bold border-b border-[#E5E5E8] pb-1.5">
                        {section.title}
                      </h3>
                      <ul className="space-y-1">
                        {section.items.map((item) => (
                          <li key={item.id}>
                            <button
                              onClick={() => handleTopicClick(item.id)}
                              className={cn(
                                "w-full flex items-center gap-2 px-3 py-2.5 rounded-[4px] text-[13px] text-left font-medium transition-all duration-200 border min-h-[44px]",
                                activeTopic === item.id
                                  ? "bg-[#F4F2FF] border-[#6E56CF] text-[#6E56CF] font-bold shadow-sm"
                                  : "text-[#1A1A1E] hover:text-[#6E56CF] hover:bg-[#FAFAFC] border-transparent font-medium"
                              )}
                            >
                              <span className={activeTopic === item.id ? "text-[#6E56CF]" : "text-[#0F0F11]"}>
                                {item.icon}
                              </span>
                              <span>{item.name}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))
                ) : (
                  <div className="text-[13px] text-[#333338] font-medium text-center py-4">
                    No matching articles found.
                  </div>
                )}
              </div>
            </aside>

            {/* Center Content - Documentation Article */}
            <main className="min-w-0 bg-white border border-[#E5E5E8] rounded-xl p-8 shadow-sm">
              {/* Claude-Style Breadcrumbs */}
              <div className="flex items-center gap-1.5 text-[11.5px] font-mono font-bold uppercase tracking-wider text-[#333338] mb-4 select-none">
                <Link to="/docs" className="hover:text-[#6E56CF] transition-colors">Docs</Link>
                <span className="text-[#0F0F11]">/</span>
                <Link to={`/docs/${activeProduct}/introduction`} className="hover:text-[#6E56CF] transition-colors">
                  {selectedProductInfo.name}
                </Link>
                <span className="text-[#0F0F11]">/</span>
                <span className="text-[#0F0F11] font-extrabold">{article.category}</span>
              </div>

              <div className="border-b border-[#E5E5E8] pb-6">
                <h1 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F0F11] leading-tight">
                  {article.title}
                </h1>
                <p className="mt-4 text-[15px] sm:text-[16px] leading-relaxed text-[#1A1A1E] font-medium">
                  {article.description}
                </p>
              </div>

              <div className="mt-8 font-sans text-[14.5px] sm:text-[15.5px] leading-relaxed text-[#0F0F11] font-medium space-y-6">
                {article.content}
              </div>

              {/* Navigation Footer */}
              <div className="mt-16 pt-8 border-t border-[#E5E5E8] flex items-center justify-between">
                <div>
                  {activeTopic !== 'introduction' && (
                    <button
                      onClick={() => {
                        const currentIdx = allItems.findIndex(item => item.id === activeTopic);
                        if (currentIdx > 0) {
                          handleTopicClick(allItems[currentIdx - 1].id);
                        }
                      }}
                      className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#0F0F11] hover:text-[#6E56CF] transition-colors min-h-[44px]"
                    >
                      ← Previous
                    </button>
                  )}
                </div>
                <div>
                  {allItems.findIndex(item => item.id === activeTopic) < allItems.length - 1 && (
                    <button
                      onClick={() => {
                        const currentIdx = allItems.findIndex(item => item.id === activeTopic);
                        if (currentIdx < allItems.length - 1) {
                          handleTopicClick(allItems[currentIdx + 1].id);
                        }
                      }}
                      className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#6E56CF] hover:text-[#4C3B99] transition-colors min-h-[44px]"
                    >
                      Next →
                    </button>
                  )}
                </div>
              </div>
            </main>

            {/* Right Sidebar - On This Page */}
            <aside className="hidden lg:block space-y-4 sticky top-28 self-start border-l border-[#E5E5E8] pl-5">
              <h4 className="font-mono text-[11px] uppercase tracking-wider text-[#0F0F11] font-bold">
                On this page
              </h4>
              <ul className="space-y-2.5 text-[13px]">
                {article.toc.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => handleAnchorClick(e, item.id)}
                      className={cn(
                        "block font-medium transition-colors duration-200",
                        activeHeading === item.id
                          ? "text-[#6E56CF] font-bold"
                          : "text-[#1A1A1E] font-medium hover:text-[#6E56CF]"
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </aside>

          </div>
        </Container>
      </div>

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-40 p-3 rounded-[4px] bg-ink text-white shadow-pill hover:bg-ink/90 transition-colors focus-visible:outline-none"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}