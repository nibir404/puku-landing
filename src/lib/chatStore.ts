export type ModelId = 'sonnet-5-high' | 'opus-4.8-high' | 'fast-agent';

export type ModelOption = {
  id: ModelId;
  name: string;
  badge: string;
  description: string;
  tag: string;
};

export const MODEL_OPTIONS: ModelOption[] = [
  {
    id: 'sonnet-5-high',
    name: 'Sonnet 5 High',
    badge: 'Recommended',
    description: 'Optimal balance of deep reasoning, speed, and coding capabilities.',
    tag: 'Sonnet 5 High',
  },
  {
    id: 'opus-4.8-high',
    name: 'Opus 4.8 High',
    badge: 'Maximum Reasoning',
    description: 'Highest intelligence for complex architecture & multi-file coding.',
    tag: 'Opus 4.8 High',
  },
  {
    id: 'fast-agent',
    name: 'Fast Agent',
    badge: 'Ultra Fast',
    description: 'Lightning-fast model for quick edits and terminal scripts.',
    tag: 'Fast Agent',
  },
];

export type Artifact = {
  id: string;
  title: string;
  type: 'code' | 'component' | 'markdown' | 'document';
  language: string;
  code: string;
  previewHtml?: string;
  version?: number;
};

export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  artifact?: Artifact;
  modelUsed?: string;
  sources?: { title: string; url: string }[];
};

export type Thread = {
  id: string;
  title: string;
  updatedAt: string;
  category: 'Chats and tasks';
  modelId: ModelId;
  messages: Message[];
  starred?: boolean;
  activeMode?: 'Chat' | 'Cowork';
};

export const INITIAL_THREADS: Thread[] = [
  {
    id: 'thread-puku-info',
    title: 'Puku information',
    updatedAt: '10 mins ago',
    category: 'Chats and tasks',
    modelId: 'sonnet-5-high',
    starred: true,
    activeMode: 'Chat',
    messages: [
      {
        id: 'msg-puku-1',
        role: 'user',
        content: 'Tell me about Puku and what common uses or classifications exist for it.',
        timestamp: '11:20 AM',
      },
      {
        id: 'msg-puku-2',
        role: 'assistant',
        content: `A few common uses of the name: there's a Puku language (a minor language classification), a "Puku" entry in some animated wiki fandoms, and Puku is also the name of an autonomous AI software engineering platform. If you meant one of those specifically, let me know and I can dig into that.

Sources:
• Puku - Wikipedia
• Puku - World Land Trust
• Puku - Facts, Diet, Habitat & Pictures on Animalia.bio
• Kobus vardonii (puku) - Animal Diversity Web
• Puku (Kobus vardonii) - Quick facts - Ultimate Ungulate
• GitHub - please-build/puku`,
        timestamp: '11:21 AM',
        modelUsed: 'Sonnet 5 High',
        sources: [
          { title: 'Puku - Wikipedia', url: 'https://en.wikipedia.org/wiki/Puku' },
          { title: 'Puku - World Land Trust', url: 'https://www.worldlandtrust.org' },
          { title: 'Puku - Facts & Pictures on Animalia.bio', url: 'https://animalia.bio' },
          { title: 'GitHub - please-build/puku', url: 'https://github.com' },
        ],
      },
    ],
  },
  {
    id: 'thread-medistick',
    title: 'Medistick content creation',
    updatedAt: '1 hour ago',
    category: 'Chats and tasks',
    modelId: 'opus-4.8-high',
    activeMode: 'Chat',
    messages: [
      {
        id: 'msg-med-1',
        role: 'user',
        content: 'i want a single product page where all product will be listed so i need the body and heading for this specific page',
        timestamp: '10:14 AM',
      },
      {
        id: 'msg-med-2',
        role: 'assistant',
        content: `You already have that page — it's the Products overview I built, which lists all 8 products on one page. You just need the heading and body text for it, pulled out cleanly. Here it is:

Page heading (hero)
Tag: THE MEDISTACK PLATFORM
Heading: One Platform for Your Whole Practice
Body: Prescriptions, records, scheduling, and patient care — built to work together, not scattered across separate apps.

The 8 products (heading + body for each card):
Prescription Builder — The daily workhorse, where most doctors spend their time.`,
        timestamp: '10:15 AM',
        modelUsed: 'Opus 4.8 High',
        artifact: {
          id: 'art-medistack',
          title: 'Medistack product pages final',
          type: 'document',
          language: 'markdown',
          version: 1,
          code: `# THE MEDISTACK PLATFORM\n## One Platform for Your Whole Practice\nPrescriptions, records, scheduling, and patient care — built to work together.`,
        },
      },
    ],
  },
];

const STORAGE_KEY = 'puku_web_chat_threads_v1';

export const loadStoredThreads = (): Thread[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (err) {
    console.error('Failed to load stored threads', err);
  }
  return INITIAL_THREADS;
};

export const saveStoredThreads = (threads: Thread[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(threads));
  } catch (err) {
    console.error('Failed to save stored threads', err);
  }
};

export const generateAssistantResponse = (
  userPrompt: string,
  modelId: ModelId
): { content: string; artifact?: Artifact; sources?: { title: string; url: string }[] } => {
  const lower = userPrompt.toLowerCase();
  const modelName = MODEL_OPTIONS.find((m) => m.id === modelId)?.name || 'Sonnet 5 High';

  // Case 1: React Component / Dashboard UI request
  if (lower.includes('react') || lower.includes('dashboard') || lower.includes('component') || lower.includes('ui')) {
    return {
      content: `I've created a complete **React Analytics Dashboard Component** with metric cards, live status telemetry, and responsive layout styling.

Click **Download** or open the **Task Memory & Context** panel on the right to view and copy the generated component code.`,
      artifact: {
        id: `art-${Date.now()}`,
        title: 'AnalyticsDashboard.tsx',
        type: 'component',
        language: 'tsx',
        version: 1,
        code: `import React, { useState } from 'react';
import { Activity, ArrowUpRight, DollarSign, Users, CheckCircle2 } from 'lucide-react';

export default function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState('7d');

  const stats = [
    { title: 'Total Revenue', value: '$48,294.00', change: '+14.2%', icon: DollarSign },
    { title: 'Active Agents', value: '1,284', change: '+28.4%', icon: Users },
    { title: 'Cloud Executions', value: '94,102', change: '+8.1%', icon: Activity },
    { title: 'Pass Rate', value: '99.94%', change: '+0.04%', icon: CheckCircle2 },
  ];

  return (
    <div className="p-6 bg-white border border-[#E5E5E8] rounded-[2px] font-sans max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between border-b border-[#E5E5E8] pb-4">
        <div>
          <h2 className="text-xl font-bold text-[#0F0F11]">Telemetry & Analytics</h2>
          <p className="text-xs text-[#4A4A52] mt-0.5">Real-time Puku Cloud Fleet performance telemetry.</p>
        </div>
        <div className="flex items-center gap-1 bg-[#F3F3F5] border border-[#E5E5E8] p-1 rounded-[2px]">
          {['24h', '7d', '30d'].map((r) => (
            <button
              key={r}
              onClick={() => setTimeRange(r)}
              className={\`px-2.5 py-1 text-xs font-semibold rounded-[2px] transition-all \${
                timeRange === r ? 'bg-[#0F0F11] text-white' : 'text-[#4A4A52] hover:text-[#0F0F11]'
              }\`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="p-4 bg-[#FAFAFC] border border-[#E5E5E8] rounded-[2px] space-y-2">
            <div className="flex items-center justify-between text-xs text-[#4A4A52]">
              <span>{s.title}</span>
              <s.icon className="h-4 w-4 text-[#6E56CF]" />
            </div>
            <div className="text-2xl font-extrabold text-[#0F0F11]">{s.value}</div>
            <div className="text-xs font-bold text-emerald-600 flex items-center gap-0.5">
              <ArrowUpRight className="h-3 w-3" /> {s.change}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}`,
      },
    };
  }

  // Case 2: TypeScript / Type refactor request
  if (lower.includes('typescript') || lower.includes('type') || lower.includes('union') || lower.includes('refactor')) {
    return {
      content: `I've refactored the TypeScript type definitions into **strict discriminated unions** with type guard helpers and exhaustive matching patterns.`,
      artifact: {
        id: `art-${Date.now()}`,
        title: 'types.ts',
        type: 'code',
        language: 'typescript',
        version: 1,
        code: `export type ApiResponse<T> =
  | { status: 'success'; data: T; timestamp: number }
  | { status: 'error'; code: string; message: string }
  | { status: 'loading'; progressPercentage: number };

export function isSuccess<T>(
  res: ApiResponse<T>
): res is { status: 'success'; data: T; timestamp: number } {
  return res.status === 'success';
}

export function handleResponse<T>(res: ApiResponse<T>): string {
  switch (res.status) {
    case 'success':
      return \`Success (\${res.timestamp})\`;
    case 'error':
      return \`Error [\${res.code}]: \${res.message}\`;
    case 'loading':
      return \`Loading \${res.progressPercentage}%\`;
  }
}`,
      },
    };
  }

  // Case 3: Audit / Security / WCAG request
  if (lower.includes('audit') || lower.includes('security') || lower.includes('wcag') || lower.includes('a11y')) {
    return {
      content: `Completed **WCAG 2.1 & 2.2 AAA Accessibility and Security Audit**.

Key findings:
• Color contrast ratios across all buttons exceed 7:1 minimum requirements.
• Touch targets satisfy >=44px minimum bounding areas.
• Keyboard focus rings and ARIA labels are fully implemented.`,
      artifact: {
        id: `art-${Date.now()}`,
        title: 'Accessibility_Security_Audit.md',
        type: 'document',
        language: 'markdown',
        version: 1,
        code: `# AUDIT REPORT: PUKU ACCESSIBILITY & SECURITY\n\n## Summary\n- WCAG 2.1 & 2.2 AAA Compliance: PASSED (100%)\n- Color Contrast Ratio: >7:1\n- Touch Target Bounding: >=44px\n- Keyboard Focus Rings: Fully accessible`,
      },
      sources: [
        { title: 'W3C WCAG 2.2 Level AAA Guidelines', url: 'https://www.w3.org/WAI/standards-guidelines/wcag/' },
        { title: 'Puku Accessibility Checker Documentation', url: 'https://docs.puku.dev' },
      ],
    };
  }

  // Default general response
  return {
    content: `Processed your prompt with **${modelName}**.\n\nSummary:\n• Workspace indexes scanned and updated.\n• Operational rules & context rules verified.\n• All sub-tasks completed with zero warnings.`,
    artifact: {
      id: `art-${Date.now()}`,
      title: 'PukuTaskResult.md',
      type: 'document',
      language: 'markdown',
      version: 1,
      code: `# PUKU TASK RESULT\nPrompt: "${userPrompt}"\nModel: ${modelName}\nStatus: Execution Successful`,
    },
    sources: [
      { title: 'Puku Platform Docs', url: '/docs' },
      { title: 'Puku System Status', url: '/changelog' },
    ],
  };
};
