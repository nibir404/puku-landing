import { useParams, Link, useNavigate } from 'react-router-dom';
import { SEO } from '@/components/layout/SEO';
import { Container } from '@/components/ui/Container';
import { cn } from '@/lib/cn';
import {
  Search,
  Compass,
  BookOpen,
  Code,
  Cloud,
  Paintbrush,
  Users,
  Smartphone,
  Terminal,
  ShieldAlert,
  Cpu,
  Check,
  Copy,
  ArrowUp,
  ChevronDown,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Github,
  Layers,
  FileCode,
  Zap,
} from 'lucide-react';
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

// 1. Sub-Header Product Navigation Tabs matching docs.devin.ai
const NAV_PRODUCTS = [
  { id: 'puku-cli', name: 'CLI', defaultTopic: 'quickstart', icon: <Terminal className="h-4 w-4" /> },
  { id: 'puku-editor', name: 'Editor', defaultTopic: 'introduction', icon: <Code className="h-4 w-4" /> },
  { id: 'puku-cloud', name: 'Cloud', defaultTopic: 'introduction', icon: <Cloud className="h-4 w-4" /> },
  { id: 'puku-design', name: 'Design', defaultTopic: 'introduction', icon: <Paintbrush className="h-4 w-4" /> },
  { id: 'puku-cowork', name: 'Co-work', defaultTopic: 'introduction', icon: <Users className="h-4 w-4" /> },
  { id: 'puku-app', name: 'Desktop & App', defaultTopic: 'introduction', icon: <Smartphone className="h-4 w-4" /> },
  { id: 'puku-api', name: 'API Reference', defaultTopic: 'overview', icon: <FileCode className="h-4 w-4" /> },
  { id: 'puku-enterprise', name: 'Enterprise', defaultTopic: 'overview', icon: <Layers className="h-4 w-4" /> },
];

// 2. Individual Section Definitions for Each Product
const CLI_SECTIONS: DocSection[] = [
  {
    title: 'Getting Started',
    items: [
      { id: 'quickstart', name: 'Quickstart', desc: 'Get up and running in 2 minutes with Puku CLI.', icon: <Zap className="h-4 w-4" /> },
      { id: 'installation', name: 'Installation', desc: 'Install puku-cli on macOS, Linux, and Windows.', icon: <Terminal className="h-4 w-4" /> },
      { id: 'essential-commands', name: 'Essential Commands', desc: 'Core terminal command flags and options.', icon: <BookOpen className="h-4 w-4" /> },
    ],
  },
  {
    title: 'Core Architecture',
    items: [
      { id: 'subagents', name: 'Subagents & Swarms', desc: 'Spawn autonomous terminal subagents.', icon: <Users className="h-4 w-4" /> },
      { id: 'handoff', name: 'Hand off to Cloud Fleet', desc: 'Delegate heavy tasks to Puku Cloud GPU nodes.', icon: <Cloud className="h-4 w-4" /> },
      { id: 'agents-config', name: 'Agents Persona Config', desc: 'Custom agent prompts and tool permissions.', icon: <Code className="h-4 w-4" /> },
    ],
  },
  {
    title: 'Reference & Integration',
    items: [
      { id: 'skills', name: 'Skills & Slash Triggers', desc: 'Custom prompt shortcuts and tools.', icon: <Compass className="h-4 w-4" /> },
      { id: 'troubleshooting', name: 'Troubleshooting', desc: 'Resolve permissions, API keys, and sandbox errors.', icon: <ShieldAlert className="h-4 w-4" /> },
    ],
  },
];

const EDITOR_SECTIONS: DocSection[] = [
  {
    title: 'Getting Started',
    items: [
      { id: 'introduction', name: 'Introduction', desc: 'Welcome to Puku AI-native Code Editor.', icon: <Compass className="h-4 w-4" /> },
      { id: 'quick-start', name: 'Quickstart', desc: 'Install editor and connect repository.', icon: <BookOpen className="h-4 w-4" /> },
      { id: 'troubleshooting', name: 'Troubleshooting', desc: 'Resolve indexing and memory issues.', icon: <ShieldAlert className="h-4 w-4" /> },
    ],
  },
  {
    title: 'Core Features',
    items: [
      { id: 'features', name: 'Workspace Overview', desc: 'Interface layout & dual-pane view.', icon: <Code className="h-4 w-4" /> },
      { id: 'chat', name: 'AI Sidebar Chat', desc: 'Interactive chat environment inside editor.', icon: <Compass className="h-4 w-4" /> },
      { id: 'context-engine', name: 'Context Engine', desc: '200k Token compaction engine.', icon: <Cpu className="h-4 w-4" /> },
      { id: 'completions', name: 'Code Completions', desc: 'Fill-In-The-Middle predictions.', icon: <Zap className="h-4 w-4" /> },
    ],
  },
];

const CLOUD_SECTIONS: DocSection[] = [
  {
    title: 'Getting Started',
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

const API_SECTIONS: DocSection[] = [
  {
    title: 'API Overview',
    items: [
      { id: 'overview', name: 'REST & GraphQL API', desc: 'Authentication & Endpoint endpoints.', icon: <FileCode className="h-4 w-4" /> },
      { id: 'webhooks', name: 'Webhooks & Events', desc: 'Realtime telemetry streaming.', icon: <Zap className="h-4 w-4" /> },
    ],
  },
];

const ENTERPRISE_SECTIONS: DocSection[] = [
  {
    title: 'Enterprise Architecture',
    items: [
      { id: 'overview', name: 'VPC & Air-Gapped Setup', desc: 'Self-hosted agent infrastructure.', icon: <Layers className="h-4 w-4" /> },
      { id: 'security', name: 'SSO & Audit Logs', desc: 'SAML 2.0, SCIM, and SOC 2 compliance.', icon: <ShieldAlert className="h-4 w-4" /> },
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
    <div className="relative group border border-[#E5E5E8] rounded-[2px] overflow-hidden bg-[#0F0F11] text-zinc-200 shadow-none my-4">
      <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800 bg-zinc-900/60 text-[11px] font-mono text-zinc-400 select-none">
        <span>{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 hover:text-white transition-colors"
          aria-label="Copy code snippet"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
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

// 3. Comprehensive Documentation Content Database for All Individual Products
const DOCS_CONTENT: Record<string, Record<string, {
  title: string;
  category: string;
  description: string;
  content: React.ReactNode;
  toc: { id: string; label: string }[];
}>> = {
  'puku-cli': {
    'quickstart': {
      title: 'Quickstart',
      category: 'Getting Started',
      description: 'Get up and running in 2 minutes with Puku CLI, a local command-line coding agent with deep Puku Cloud integration.',
      toc: [
        { id: 'installation', label: '1. Installation' },
        { id: 'authentication', label: '2. Authentication' },
        { id: 'first-run', label: '3. Run Your First Task' },
      ],
      content: (
        <div className="space-y-6">
          <div className="p-4 bg-[#F4F2FF] border border-[#E4DDFE] rounded-[2px] text-xs text-[#6E56CF] font-semibold flex items-center gap-2">
            <Zap className="h-4 w-4 shrink-0" />
            <span>Puku CLI v2.4 includes native Rust workspace indexing and multi-agent cloud offloading.</span>
          </div>

          <h2 id="installation" className="text-xl font-bold text-[#0F0F11] border-b border-[#E5E5E8] pb-2">1. Installation</h2>
          <p>Install the Puku CLI tool using curl or npm package manager on macOS, Linux, or Windows:</p>
          <DocsCodeBlock code="curl -fsSL https://get.puku.dev/install | sh" language="bash" />

          <h2 id="authentication" className="text-xl font-bold text-[#0F0F11] border-b border-[#E5E5E8] pb-2">2. Authentication</h2>
          <p>Login to your Puku developer account from the terminal:</p>
          <DocsCodeBlock code="puku auth login" language="bash" />

          <h2 id="first-run" className="text-xl font-bold text-[#0F0F11] border-b border-[#E5E5E8] pb-2">3. Run Your First Task</h2>
          <p>Start Puku inside any Git workspace directory to ask questions or execute refactors:</p>
          <DocsCodeBlock code="puku 'Audit authentication types and add JWT refresh handling'" language="bash" />
        </div>
      ),
    },
    'installation': {
      title: 'Installation',
      category: 'Getting Started',
      description: 'Detailed setup instructions for Puku CLI across macOS, Linux, and Windows platforms.',
      toc: [{ id: 'homebrew', label: 'Homebrew (macOS)' }, { id: 'npm', label: 'npm Global Package' }],
      content: (
        <div className="space-y-6">
          <h2 id="homebrew" className="text-xl font-bold text-[#0F0F11] border-b border-[#E5E5E8] pb-2">Homebrew (macOS)</h2>
          <DocsCodeBlock code="brew install puku-ai/tap/puku" language="bash" />
          <h2 id="npm" className="text-xl font-bold text-[#0F0F11] border-b border-[#E5E5E8] pb-2">npm Global Package</h2>
          <DocsCodeBlock code="npm install -g @puku/cli@latest" language="bash" />
        </div>
      ),
    },
    'essential-commands': {
      title: 'Essential Commands',
      category: 'Getting Started',
      description: 'Master core Puku CLI commands for code generation, test execution, and git commits.',
      toc: [{ id: 'commands-list', label: 'Core Commands' }],
      content: (
        <div className="space-y-6">
          <h2 id="commands-list" className="text-xl font-bold text-[#0F0F11] border-b border-[#E5E5E8] pb-2">Core Commands</h2>
          <DocsCodeBlock code={`puku                  # Start interactive terminal session
puku run "npm test"   # Execute tests with auto-healing agent
puku swarm            # Launch parallel subagents across cloud GPU nodes
puku deploy --prod    # Deploy workspace snapshot to Puku Cloud`} language="bash" />
        </div>
      ),
    },
    'subagents': {
      title: 'Subagents & Swarms',
      category: 'Core Architecture',
      description: 'Spawn and manage autonomous background subagents for complex multi-file engineering tasks.',
      toc: [{ id: 'swarm-mode', label: 'Swarm Orchestration' }],
      content: (
        <div className="space-y-6">
          <h2 id="swarm-mode" className="text-xl font-bold text-[#0F0F11] border-b border-[#E5E5E8] pb-2">Swarm Orchestration</h2>
          <p>Subagents run in isolated sandboxes and synchronize diffs safely back to your main branch.</p>
        </div>
      ),
    },
    'handoff': {
      title: 'Hand off to Cloud Fleet',
      category: 'Core Architecture',
      description: 'Seamlessly transition long-running agent tasks from local CLI to Puku Cloud GPU nodes.',
      toc: [{ id: 'cloud-handoff', label: 'Executing Cloud Handoff' }],
      content: (
        <div className="space-y-6">
          <h2 id="cloud-handoff" className="text-xl font-bold text-[#0F0F11] border-b border-[#E5E5E8] pb-2">Executing Cloud Handoff</h2>
          <DocsCodeBlock code="puku handoff --background" language="bash" />
        </div>
      ),
    },
    'agents-config': {
      title: 'Agents Persona Config',
      category: 'Core Architecture',
      description: 'Define customized agent behavior, rules, and tool access controls in `.puku/agents.json`.',
      toc: [{ id: 'config-file', label: 'Config Schema' }],
      content: (
        <div className="space-y-6">
          <h2 id="config-file" className="text-xl font-bold text-[#0F0F11] border-b border-[#E5E5E8] pb-2">Config Schema</h2>
          <DocsCodeBlock code={`{
  "name": "Security Auditor",
  "tools": ["grep", "ast-parser"],
  "rules": ["Never commit credentials to repo"]
}`} language="json" />
        </div>
      ),
    },
    'skills': {
      title: 'Skills & Slash Triggers',
      category: 'Reference & Integration',
      description: 'Create reusable prompt templates triggered by slash commands in Puku CLI.',
      toc: [{ id: 'slash-commands', label: 'Slash Command Syntax' }],
      content: (
        <div className="space-y-6">
          <h2 id="slash-commands" className="text-xl font-bold text-[#0F0F11] border-b border-[#E5E5E8] pb-2">Slash Command Syntax</h2>
          <p>Trigger pre-configured skills using <code>/test</code>, <code>/audit</code>, or <code>/refactor</code>.</p>
        </div>
      ),
    },
    'troubleshooting': {
      title: 'Troubleshooting',
      category: 'Reference & Integration',
      description: 'Diagnose and resolve common terminal connection and sandbox execution issues.',
      toc: [{ id: 'common-issues', label: 'Common Errors' }],
      content: (
        <div className="space-y-6">
          <h2 id="common-issues" className="text-xl font-bold text-[#0F0F11] border-b border-[#E5E5E8] pb-2">Common Errors</h2>
          <p>If permission is denied, ensure Node.js global binaries path is in your environment <code>$PATH</code>.</p>
        </div>
      ),
    },
  },
  'puku-editor': {
    'introduction': {
      title: 'Introduction — Puku Editor',
      category: 'Getting Started',
      description: 'Puku Editor is an AI-powered code editor with 200k token compaction, local model execution, and sub-12ms completions.',
      toc: [{ id: 'what-is-puku', label: 'What is Puku Editor?' }],
      content: (
        <div className="space-y-6">
          <h2 id="what-is-puku" className="text-xl font-bold text-[#0F0F11] border-b border-[#E5E5E8] pb-2">What is Puku Editor?</h2>
          <p>Puku Editor provides an AI-native workspace built for fast code understanding, intelligent refactoring, and real-time pair programming.</p>
        </div>
      ),
    },
    'quick-start': {
      title: 'Quickstart — Puku Editor',
      category: 'Getting Started',
      description: 'Set up Puku Editor and connect your first repository workspace.',
      toc: [{ id: 'open-repo', label: 'Opening a Workspace' }],
      content: (
        <div className="space-y-6">
          <h2 id="open-repo" className="text-xl font-bold text-[#0F0F11] border-b border-[#E5E5E8] pb-2">Opening a Workspace</h2>
          <p>Select <strong>File &gt; Open Folder</strong> to initialize local workspace indexing.</p>
        </div>
      ),
    },
    'troubleshooting': {
      title: 'Troubleshooting — Puku Editor',
      category: 'Getting Started',
      description: 'Fix indexing timeouts, memory allocation, and extension conflicts.',
      toc: [{ id: 'reindex', label: 'Re-building Index' }],
      content: (
        <div className="space-y-6">
          <h2 id="reindex" className="text-xl font-bold text-[#0F0F11] border-b border-[#E5E5E8] pb-2">Re-building Index</h2>
          <p>Run command palette <code>Puku: Rebuild Codebase Index</code> to reset workspace caches.</p>
        </div>
      ),
    },
    'features': {
      title: 'Workspace Overview — Puku Editor',
      category: 'Core Features',
      description: 'Explore the interface, AI sidebar, dual canvas view, and integrated terminal.',
      toc: [{ id: 'layout-overview', label: 'Interface Layout' }],
      content: (
        <div className="space-y-6">
          <h2 id="layout-overview" className="text-xl font-bold text-[#0F0F11] border-b border-[#E5E5E8] pb-2">Interface Layout</h2>
          <p>Puku Editor features a high-contrast editor buffer, right-hand AI agent chat, and split terminal view.</p>
        </div>
      ),
    },
    'chat': {
      title: 'AI Sidebar Chat — Puku Editor',
      category: 'Core Features',
      description: 'Interact with AI agents directly alongside your code buffer.',
      toc: [{ id: 'toggle-chat', label: 'Toggling AI Sidebar' }],
      content: (
        <div className="space-y-6">
          <h2 id="toggle-chat" className="text-xl font-bold text-[#0F0F11] border-b border-[#E5E5E8] pb-2">Toggling AI Sidebar</h2>
          <p>Press <code>Cmd + L</code> to toggle the AI side pane.</p>
        </div>
      ),
    },
    'context-engine': {
      title: 'Context Engine — Puku Editor',
      category: 'Core Features',
      description: 'Compress large repositories into dense 200k token context windows.',
      toc: [{ id: 'compaction', label: 'Compaction Rules' }],
      content: (
        <div className="space-y-6">
          <h2 id="compaction" className="text-xl font-bold text-[#0F0F11] border-b border-[#E5E5E8] pb-2">Compaction Rules</h2>
          <p>Puku automatically summarizes import trees and symbol signatures to preserve space for active files.</p>
        </div>
      ),
    },
    'completions': {
      title: 'Code Completions — Puku Editor',
      category: 'Core Features',
      description: 'Sub-12ms fill-in-the-middle code predictions as you type.',
      toc: [{ id: 'ghost-completions', label: 'Ghost Text Inline Predictions' }],
      content: (
        <div className="space-y-6">
          <h2 id="ghost-completions" className="text-xl font-bold text-[#0F0F11] border-b border-[#E5E5E8] pb-2">Ghost Text Inline Predictions</h2>
          <p>Press <code>Tab</code> to accept inline ghost text predictions.</p>
        </div>
      ),
    },
  },
  'puku-cloud': {
    'introduction': {
      title: 'Introduction — Puku Cloud',
      category: 'Getting Started',
      description: 'Global edge execution, serverless GPU pools, and automated deployment pipelines.',
      toc: [{ id: 'cloud-overview', label: 'Puku Cloud Architecture' }],
      content: (
        <div className="space-y-6">
          <h2 id="cloud-overview" className="text-xl font-bold text-[#0F0F11] border-b border-[#E5E5E8] pb-2">Puku Cloud Architecture</h2>
          <p>Serverless GPU pools scale sub-second agent containers for parallel software execution.</p>
        </div>
      ),
    },
    'deployments': {
      title: 'Deployments Flow — Puku Cloud',
      category: 'Getting Started',
      description: 'Ship workspace builds to global edge infrastructure.',
      toc: [{ id: 'deploy-cmd', label: 'Deploy Command' }],
      content: (
        <div className="space-y-6">
          <h2 id="deploy-cmd" className="text-xl font-bold text-[#0F0F11] border-b border-[#E5E5E8] pb-2">Deploy Command</h2>
          <DocsCodeBlock code="puku deploy --prod" language="bash" />
        </div>
      ),
    },
    'gpu-pools': {
      title: 'Serverless GPU Pools — Puku Cloud',
      category: 'Infrastructure',
      description: 'Manage GPU compute nodes for agent model inference.',
      toc: [{ id: 'gpu-configs', label: 'GPU Pools Config' }],
      content: (
        <div className="space-y-6">
          <h2 id="gpu-configs" className="text-xl font-bold text-[#0F0F11] border-b border-[#E5E5E8] pb-2">GPU Pools Config</h2>
          <p>Configure dedicated or shared GPU pools inside <code>.puku/cloud.json</code>.</p>
        </div>
      ),
    },
    'secrets': {
      title: 'Secrets Manager — Puku Cloud',
      category: 'Infrastructure',
      description: 'AES-256 encrypted environment keys and API secrets.',
      toc: [{ id: 'secrets-env', label: 'Env Injection' }],
      content: (
        <div className="space-y-6">
          <h2 id="secrets-env" className="text-xl font-bold text-[#0F0F11] border-b border-[#E5E5E8] pb-2">Env Injection</h2>
          <p>Inject secrets securely into isolated execution sandboxes.</p>
        </div>
      ),
    },
  },
  'puku-design': {
    'introduction': {
      title: 'Introduction — Puku Design',
      category: 'Getting Started',
      description: 'Connect UI component variables and Figma designs directly to React source code.',
      toc: [{ id: 'design-sync', label: 'Design Tokens Sync' }],
      content: (
        <div className="space-y-6">
          <h2 id="design-sync" className="text-xl font-bold text-[#0F0F11] border-b border-[#E5E5E8] pb-2">Design Tokens Sync</h2>
          <p>Synchronize tokens seamlessly between Figma canvases and Tailwind CSS configurations.</p>
        </div>
      ),
    },
    'tokens': {
      title: 'Canvas Tokens Sync — Puku Design',
      category: 'Layout & Tokens',
      description: 'Export and map Figma design variables.',
      toc: [{ id: 'export-tokens', label: 'Export Tokens' }],
      content: (
        <div className="space-y-6">
          <h2 id="export-tokens" className="text-xl font-bold text-[#0F0F11] border-b border-[#E5E5E8] pb-2">Export Tokens</h2>
          <DocsCodeBlock code="puku design export-tokens --format=tailwind" language="bash" />
        </div>
      ),
    },
    'layouts': {
      title: 'Layout Structures — Puku Design',
      category: 'Layout & Tokens',
      description: 'Automated flexbox and grid component generation.',
      toc: [{ id: 'flex-layouts', label: 'Flex Layout Engine' }],
      content: (
        <div className="space-y-6">
          <h2 id="flex-layouts" className="text-xl font-bold text-[#0F0F11] border-b border-[#E5E5E8] pb-2">Flex Layout Engine</h2>
          <p>Puku maps visual canvas nodes into clean React JSX components with responsive layout classes.</p>
        </div>
      ),
    },
  },
  'puku-cowork': {
    'introduction': {
      title: 'Introduction — Puku Co-work',
      category: 'Getting Started',
      description: 'Real-time multiplayer workspace where engineers and AI agents build together.',
      toc: [{ id: 'multiplayer', label: 'Multiplayer Canvases' }],
      content: (
        <div className="space-y-6">
          <h2 id="multiplayer" className="text-xl font-bold text-[#0F0F11] border-b border-[#E5E5E8] pb-2">Multiplayer Canvases</h2>
          <p>Share code buffers with teammates and AI pair programming agents in real time.</p>
        </div>
      ),
    },
    'collaboration': {
      title: 'Collaboration Canvases — Puku Co-work',
      category: 'Multi-Agent Flow',
      description: 'Set up live session canvases.',
      toc: [{ id: 'live-sessions', label: 'Live Session Setup' }],
      content: (
        <div className="space-y-6">
          <h2 id="live-sessions" className="text-xl font-bold text-[#0F0F11] border-b border-[#E5E5E8] pb-2">Live Session Setup</h2>
          <DocsCodeBlock code="puku cowork invite @teammate" language="bash" />
        </div>
      ),
    },
    'agent-sync': {
      title: 'Multi-Agent Sync — Puku Co-work',
      category: 'Multi-Agent Flow',
      description: 'Orchestrate parallel agent branches.',
      toc: [{ id: 'sync-traces', label: 'Branch Traces' }],
      content: (
        <div className="space-y-6">
          <h2 id="sync-traces" className="text-xl font-bold text-[#0F0F11] border-b border-[#E5E5E8] pb-2">Branch Traces</h2>
          <p>Agents propose atomic pull requests that can be reviewed and merged in one click.</p>
        </div>
      ),
    },
  },
  'puku-app': {
    'introduction': {
      title: 'Introduction — Puku App',
      category: 'Getting Started',
      description: 'Desktop client & mobile companion app for task telemetry and build notifications.',
      toc: [{ id: 'app-overview', label: 'Companion Apps' }],
      content: (
        <div className="space-y-6">
          <h2 id="app-overview" className="text-xl font-bold text-[#0F0F11] border-b border-[#E5E5E8] pb-2">Companion Apps</h2>
          <p>Monitor agent tasks on the go with real-time push notifications and mobile build approvals.</p>
        </div>
      ),
    },
    'desktop': {
      title: 'Desktop Client Options — Puku App',
      category: 'Desktop Client',
      description: 'macOS, Windows, and Linux standalone application setup.',
      toc: [{ id: 'sys-reqs', label: 'System Requirements' }],
      content: (
        <div className="space-y-6">
          <h2 id="sys-reqs" className="text-xl font-bold text-[#0F0F11] border-b border-[#E5E5E8] pb-2">System Requirements</h2>
          <p>Requires macOS 12+ (Apple Silicon recommended) or 64-bit Windows 11 / Linux.</p>
        </div>
      ),
    },
    'notifications': {
      title: 'Agent Notifications — Puku App',
      category: 'Desktop Client',
      description: 'Configure push alerts for agent task completions and build statuses.',
      toc: [{ id: 'push-config', label: 'Push Channels' }],
      content: (
        <div className="space-y-6">
          <h2 id="push-config" className="text-xl font-bold text-[#0F0F11] border-b border-[#E5E5E8] pb-2">Push Channels</h2>
          <p>Receive notifications via Desktop tray, Mobile App, or Slack / Discord Webhooks.</p>
        </div>
      ),
    },
  },
  'puku-api': {
    'overview': {
      title: 'REST & GraphQL API Overview',
      category: 'API Overview',
      description: 'Programmatically trigger agent tasks, retrieve telemetry, and manage cloud GPU clusters.',
      toc: [{ id: 'api-auth', label: 'Authentication' }, { id: 'api-endpoints', label: 'Core Endpoints' }],
      content: (
        <div className="space-y-6">
          <h2 id="api-auth" className="text-xl font-bold text-[#0F0F11] border-b border-[#E5E5E8] pb-2">Authentication</h2>
          <p>Pass your Puku API Key in the Authorization header:</p>
          <DocsCodeBlock code="Authorization: Bearer puku_live_94829148..." language="bash" />
          <h2 id="api-endpoints" className="text-xl font-bold text-[#0F0F11] border-b border-[#E5E5E8] pb-2">Core Endpoints</h2>
          <DocsCodeBlock code={`POST /v1/agents/tasks      # Launch an agent task
GET  /v1/agents/tasks/:id  # Retrieve task status & logs
POST /v1/deployments       # Trigger cloud deployment`} language="bash" />
        </div>
      ),
    },
    'webhooks': {
      title: 'Webhooks & Events',
      category: 'API Overview',
      description: 'Real-time webhook events for task start, test pass, and deployment success.',
      toc: [{ id: 'webhook-events', label: 'Webhook Payload' }],
      content: (
        <div className="space-y-6">
          <h2 id="webhook-events" className="text-xl font-bold text-[#0F0F11] border-b border-[#E5E5E8] pb-2">Webhook Payload</h2>
          <DocsCodeBlock code={`{
  "event": "agent.task.completed",
  "taskId": "task-8491",
  "status": "success"
}`} language="json" />
        </div>
      ),
    },
  },
  'puku-enterprise': {
    'overview': {
      title: 'VPC & Air-Gapped Setup',
      category: 'Enterprise Architecture',
      description: 'Deploy Puku agent workloads inside private VPCs or fully air-gapped environments.',
      toc: [{ id: 'vpc-deploy', label: 'VPC Deployment Model' }],
      content: (
        <div className="space-y-6">
          <h2 id="vpc-deploy" className="text-xl font-bold text-[#0F0F11] border-b border-[#E5E5E8] pb-2">VPC Deployment Model</h2>
          <p>Deploy Puku Cloud agents inside your AWS, GCP, or Azure VPC with private model endpoints.</p>
        </div>
      ),
    },
    'security': {
      title: 'SSO & Audit Logs',
      category: 'Enterprise Architecture',
      description: 'SAML 2.0, SCIM provisioning, and SOC 2 Type II compliance controls.',
      toc: [{ id: 'sso-scim', label: 'SSO & SCIM Integration' }],
      content: (
        <div className="space-y-6">
          <h2 id="sso-scim" className="text-xl font-bold text-[#0F0F11] border-b border-[#E5E5E8] pb-2">SSO & SCIM Integration</h2>
          <p>Integrate with Okta, Azure AD, or PingIdentity for automated user provisioning.</p>
        </div>
      ),
    },
  },
};

export default function Docs() {
  const { productName, pageId } = useParams<{ productName?: string; pageId?: string }>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeHeading, setActiveHeading] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Determine active product matching route parameter
  const activeProduct = productName && DOCS_CONTENT[productName] ? productName : 'puku-cli';
  const currentProductInfo = NAV_PRODUCTS.find((p) => p.id === activeProduct) || NAV_PRODUCTS[0];

  // Select sections for active product
  const sections: DocSection[] =
    activeProduct === 'puku-cli' ? CLI_SECTIONS :
    activeProduct === 'puku-editor' ? EDITOR_SECTIONS :
    activeProduct === 'puku-cloud' ? CLOUD_SECTIONS :
    activeProduct === 'puku-design' ? DESIGN_SECTIONS :
    activeProduct === 'puku-cowork' ? COWORK_SECTIONS :
    activeProduct === 'puku-app' ? APP_SECTIONS :
    activeProduct === 'puku-api' ? API_SECTIONS :
    ENTERPRISE_SECTIONS;

  const defaultTopicForProduct = currentProductInfo.defaultTopic;
  const activeTopic = pageId && DOCS_CONTENT[activeProduct]?.[pageId] ? pageId : defaultTopicForProduct;
  const article = DOCS_CONTENT[activeProduct]?.[activeTopic] || DOCS_CONTENT['puku-cli']['quickstart'];

  // All topics flat array for Next/Previous topic calculation
  const allTopicItems = sections.flatMap((s) => s.items);
  const currentTopicIndex = allTopicItems.findIndex((item) => item.id === activeTopic);
  const prevTopic = currentTopicIndex > 0 ? allTopicItems[currentTopicIndex - 1] : null;
  const nextTopic = currentTopicIndex < allTopicItems.length - 1 ? allTopicItems[currentTopicIndex + 1] : null;

  const handleTopicClick = (id: string) => {
    navigate(`/docs/${activeProduct}/${id}`);
    setSearchQuery('');
  };

  // Filter sections matching search query
  const filteredSections = sections.map((section) => {
    const items = section.items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return { ...section, items };
  }).filter((section) => section.items.length > 0);

  // ScrollSpy setup
  useEffect(() => {
    const headings = article.toc.map((item) => document.getElementById(item.id));
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

      {/* Sub-Header Horizontal Top Tabs Bar matching docs.devin.ai */}
      <div className="border-b border-[#E5E5E8] bg-white sticky top-16 z-40 select-none pt-2">
        <Container>
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-2 text-xs sm:text-sm font-semibold">
            {NAV_PRODUCTS.map((prod) => {
              const isSelected = activeProduct === prod.id;
              return (
                <Link
                  key={prod.id}
                  to={`/docs/${prod.id}/${prod.defaultTopic}`}
                  className={cn(
                    'px-3.5 py-2 rounded-[2px] transition-all flex items-center gap-2 whitespace-nowrap border-b-2 font-semibold',
                    isSelected
                      ? 'border-[#6E56CF] text-[#6E56CF] bg-[#F4F2FF]'
                      : 'border-transparent text-[#4A4A52] hover:text-[#0F0F11] hover:bg-[#FAFAFC]'
                  )}
                >
                  <span className={isSelected ? 'text-[#6E56CF]' : 'text-[#4A4A52]'}>{prod.icon}</span>
                  <span>{prod.name}</span>
                </Link>
              );
            })}
          </div>
        </Container>
      </div>

      <div className="min-h-screen pt-4 pb-20 bg-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] lg:grid-cols-[260px_1fr_220px] gap-8 py-6">
            {/* Left Column: Individual Product Sidebar Navigation */}
            <aside className="space-y-6 md:sticky md:top-36 self-start select-none">
              {/* Search Bar with Keyboard Hint */}
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-[#4A4A52]" />
                <input
                  type="text"
                  placeholder="Search docs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 rounded-[2px] border border-[#E5E5E8] bg-white pl-9 pr-8 text-[13.5px] text-[#0F0F11] font-normal placeholder-[#4A4A52] focus:outline-none focus:border-[#6E56CF] focus:ring-2 focus:ring-[#6E56CF]/20 transition-all"
                />
                <span className="absolute right-2.5 top-3 text-[10px] font-mono text-[#4A4A52] bg-[#FAFAFC] border border-[#E5E5E8] px-1.5 py-0.5 rounded">
                  ⌘K
                </span>
              </div>

              {/* Dynamic Navigation Sections for Active Product */}
              <div className="space-y-6">
                {filteredSections.length > 0 ? (
                  filteredSections.map((section) => (
                    <div key={section.title} className="space-y-2">
                      <h3 className="font-mono text-[11px] uppercase tracking-wider text-[#4A4A52] font-bold border-b border-[#E5E5E8] pb-1.5">
                        {section.title}
                      </h3>
                      <ul className="space-y-1">
                        {section.items.map((item) => {
                          const isActive = activeTopic === item.id;
                          return (
                            <li key={item.id}>
                              <button
                                onClick={() => handleTopicClick(item.id)}
                                className={cn(
                                  'w-full flex items-center gap-2.5 px-3 py-2 rounded-[2px] text-[13px] text-left font-semibold transition-all duration-200 border min-h-[40px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6E56CF]',
                                  isActive
                                    ? 'bg-[#F4F2FF] border-[#E4DDFE] text-[#6E56CF] font-bold shadow-xs'
                                    : 'text-[#1A1A1E] hover:text-[#6E56CF] hover:bg-[#FAFAFC] border-transparent'
                                )}
                              >
                                <span className={isActive ? 'text-[#6E56CF]' : 'text-[#4A4A52]'}>
                                  {item.icon}
                                </span>
                                <span className="truncate">{item.name}</span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))
                ) : (
                  <div className="text-[13px] text-[#4A4A52] font-normal text-center py-4">
                    No matching topics found.
                  </div>
                )}
              </div>

              {/* Ask Assistant Box in Sidebar */}
              <div className="p-3 bg-[#FAFAFC] border border-[#E5E5E8] rounded-[2px] space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0F0F11]">
                  <Sparkles className="h-4 w-4 text-[#6E56CF]" />
                  <span>Have questions?</span>
                </div>
                <p className="text-[12px] text-[#4A4A52] leading-relaxed">
                  Ask Puku Assistant directly in Web Chat for code assistance.
                </p>
                <Link
                  to="/chat"
                  className="w-full h-8 bg-[#0F0F11] hover:bg-[#6E56CF] text-white font-semibold text-xs rounded-[2px] transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Launch Web Chat</span>
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            </aside>

            {/* Center Content: Main Documentation Article */}
            <main className="min-w-0 bg-white border border-[#E5E5E8] rounded-[2px] p-6 sm:p-8 shadow-none">
              {/* Breadcrumb Navigation */}
              <div className="flex items-center gap-1.5 text-[11.5px] font-mono font-bold uppercase tracking-wider text-[#4A4A52] mb-4 select-none">
                <Link to="/docs" className="hover:text-[#6E56CF] transition-colors">Docs</Link>
                <span className="text-[#E5E5E8]">/</span>
                <Link to={`/docs/${activeProduct}/${defaultTopicForProduct}`} className="hover:text-[#6E56CF] transition-colors text-[#6E56CF]">
                  {currentProductInfo.name}
                </Link>
                <span className="text-[#E5E5E8]">/</span>
                <span className="text-[#4A4A52]">{article.category}</span>
                <span className="text-[#E5E5E8]">/</span>
                <span className="text-[#0F0F11] font-bold">{article.title}</span>
              </div>

              {/* Title & Description Header */}
              <div className="border-b border-[#E5E5E8] pb-6">
                <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F0F11] leading-tight">
                  {article.title}
                </h1>
                <p className="mt-3 text-base text-[#4A4A52] font-normal leading-relaxed">
                  {article.description}
                </p>
              </div>

              {/* Main Article Content */}
              <div className="mt-8 font-sans text-base leading-relaxed text-[#0F0F11] font-normal space-y-6">
                {article.content}
              </div>

              {/* Prev / Next Page Navigation Footer */}
              <div className="mt-16 pt-8 border-t border-[#E5E5E8] grid grid-cols-1 sm:grid-cols-2 gap-4 select-none">
                {prevTopic ? (
                  <button
                    onClick={() => handleTopicClick(prevTopic.id)}
                    className="p-4 rounded-[2px] border border-[#E5E5E8] hover:border-[#6E56CF] hover:bg-[#FAFAFC] text-left transition-all group"
                  >
                    <div className="text-[11px] font-mono uppercase tracking-wider text-[#4A4A52] font-semibold flex items-center gap-1">
                      <ArrowLeft className="h-3 w-3" /> Previous
                    </div>
                    <div className="text-sm font-bold text-[#0F0F11] group-hover:text-[#6E56CF] mt-1 truncate">
                      {prevTopic.name}
                    </div>
                  </button>
                ) : <div />}

                {nextTopic ? (
                  <button
                    onClick={() => handleTopicClick(nextTopic.id)}
                    className="p-4 rounded-[2px] border border-[#E5E5E8] hover:border-[#6E56CF] hover:bg-[#FAFAFC] text-right transition-all group sm:col-start-2"
                  >
                    <div className="text-[11px] font-mono uppercase tracking-wider text-[#4A4A52] font-semibold flex items-center justify-end gap-1">
                      Next <ArrowRight className="h-3 w-3" />
                    </div>
                    <div className="text-sm font-bold text-[#0F0F11] group-hover:text-[#6E56CF] mt-1 truncate">
                      {nextTopic.name}
                    </div>
                  </button>
                ) : null}
              </div>
            </main>

            {/* Right Column: "On This Page" Table of Contents matching docs.devin.ai */}
            <aside className="hidden lg:block space-y-6 sticky top-36 self-start text-xs select-none">
              {article.toc.length > 0 && (
                <div className="space-y-2">
                  <div className="font-mono text-[11px] uppercase tracking-wider text-[#4A4A52] font-bold border-b border-[#E5E5E8] pb-1.5">
                    On this page
                  </div>
                  <ul className="space-y-1.5 border-l border-[#E5E5E8] pl-3">
                    {article.toc.map((heading) => (
                      <li key={heading.id}>
                        <a
                          href={`#${heading.id}`}
                          onClick={(e) => handleAnchorClick(e, heading.id)}
                          className={cn(
                            'block py-0.5 text-xs transition-colors font-medium',
                            activeHeading === heading.id
                              ? 'text-[#6E56CF] font-bold'
                              : 'text-[#4A4A52] hover:text-[#0F0F11]'
                          )}
                        >
                          {heading.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Links */}
              <div className="pt-4 border-t border-[#E5E5E8] space-y-2.5 text-xs font-semibold text-[#4A4A52]">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-[#6E56CF] transition-colors"
                >
                  <Github className="h-3.5 w-3.5" />
                  <span>Edit page on GitHub</span>
                </a>
                <Link
                  to="/chat"
                  className="flex items-center gap-2 hover:text-[#6E56CF] transition-colors"
                >
                  <Sparkles className="h-3.5 w-3.5 text-[#6E56CF]" />
                  <span>Ask Puku Assistant</span>
                </Link>
              </div>
            </aside>
          </div>
        </Container>

        {/* Scroll To Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={scrollToTop}
              className="fixed bottom-6 right-6 z-40 p-3 rounded-[2px] bg-[#0F0F11] text-white hover:bg-[#6E56CF] transition-colors shadow-none min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6E56CF]"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="h-5 w-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}