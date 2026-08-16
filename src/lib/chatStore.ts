export type WorkspaceMode = 'chat' | 'cowork' | 'code';

export type WorkspaceModule =
  | 'home'
  | 'chat'
  | 'cowork'
  | 'code'
  | 'projects'
  | 'files'
  | 'browser'
  | 'scheduled'
  | 'skills'
  | 'settings';

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

export type SharedContextChip = {
  id: string;
  type: 'project' | 'file' | 'browser' | 'git' | 'instruction';
  label: string;
  detail?: string;
};

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
  projectId?: string;
};

export type Workstream = {
  id: string;
  title: string;
  status: 'completed' | 'working' | 'waiting' | 'failed';
  output?: string;
};

export type TaskStep = {
  id: string;
  label: string;
  status: 'completed' | 'running' | 'upcoming' | 'failed';
  detail?: string;
};

export type CoWorkTask = {
  id: string;
  title: string;
  objective: string;
  status: 'Draft' | 'Planning' | 'Running' | 'Waiting for User' | 'Paused' | 'Completed' | 'Failed';
  progress: number; // 0 to 100
  updatedAt: string;
  plan: TaskStep[];
  workstreams: Workstream[];
  activityTimeline: { time: string; text: string; type: 'info' | 'success' | 'warning' | 'action' }[];
  requiresUserInput?: {
    question: string;
    options: string[];
  };
  outputs?: { name: string; type: string; size: string; code?: string }[];
  projectId?: string;
};

export type FileDiff = {
  filename: string;
  status: 'modified' | 'added' | 'deleted';
  oldCode: string;
  newCode: string;
};

export type TestResult = {
  name: string;
  passed: boolean;
  duration: string;
  error?: string;
};

export type CodeSession = {
  id: string;
  title: string;
  mode: 'ask' | 'plan' | 'code';
  repository: string;
  updatedAt: string;
  plan?: {
    summary: string;
    affectedFilesCount: number;
    risk: 'Low' | 'Medium' | 'High';
    steps: string[];
    approved?: boolean;
  };
  diffs: FileDiff[];
  terminalLogs: string[];
  tests: TestResult[];
  previewUrl?: string;
  browserVerified?: boolean;
};

export type ProjectItem = {
  id: string;
  name: string;
  tagline: string;
  updatedAt: string;
  instructions: string;
  filesCount: number;
  tasksCount: number;
  sessionsCount: number;
};

export type ScheduledTask = {
  id: string;
  title: string;
  schedule: string;
  nextRun: string;
  status: 'active' | 'paused' | 'completed';
  type: 'cron' | 'timer';
};

export const INITIAL_CONTEXT_CHIPS: SharedContextChip[] = [
  { id: 'ctx-proj', type: 'project', label: 'Project: Puku Cloud Workspace', detail: 'Main monorepo context' },
  { id: 'ctx-files', type: 'file', label: '3 Context Files', detail: 'PRD.md, schema.prisma, auth.ts' },
  { id: 'ctx-[#E5E5E8]', type: 'git', label: 'Git: main (5de97e9)', detail: 'Latest commit indexed' },
  { id: 'ctx-browser', type: 'browser', label: 'Browser: localhost:3000', detail: 'Live web preview active' },
];

export const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-1',
    name: 'Puku Cloud Platform',
    tagline: 'Autonomous AI software engineering cloud engine',
    updatedAt: '2 mins ago',
    instructions: 'React + TypeScript + Tailwind CSS design system. Enforce 2px border radius, strict discriminated union types, and zero console warnings.',
    filesCount: 14,
    tasksCount: 3,
    sessionsCount: 2,
  },
  {
    id: 'proj-2',
    name: 'Medistack Practice OS',
    tagline: 'Healthcare practice management platform',
    updatedAt: '1 hour ago',
    instructions: 'HIPAA compliant endpoints, OpenAPI 3.1 schemas, and accessible WCAG AAA healthcare forms.',
    filesCount: 8,
    tasksCount: 1,
    sessionsCount: 1,
  },
];

export const INITIAL_COWORK_TASKS: CoWorkTask[] = [
  {
    id: 'task-1',
    title: 'Competitor Architecture & Pricing Audit',
    objective: 'Analyze 8 top AI engineering platforms, synthesize feature sets, and output strategic recommendations.',
    status: 'Running',
    progress: 65,
    updatedAt: 'Just now',
    plan: [
      { id: 'step-1', label: 'Understand objective and index PRD', status: 'completed' },
      { id: 'step-2', label: 'Gather public market data & pricing tiers', status: 'completed' },
      { id: 'step-3', label: 'Synthesize feature matrix & gaps', status: 'running' },
      { id: 'step-4', label: 'Generate executive strategy summary', status: 'upcoming' },
    ],
    workstreams: [
      { id: 'ws-1', title: 'Workstream 1 — Market Positioning', status: 'completed', output: 'Positioning report compiled (8 vendors).' },
      { id: 'ws-2', title: 'Workstream 2 — UX & Execution Architecture', status: 'working' },
      { id: 'ws-3', title: 'Workstream 3 — Pricing & Unit Economics', status: 'completed', output: 'Tier breakdown generated.' },
      { id: 'ws-4', title: 'Workstream 4 — Final Strategy Document', status: 'waiting' },
    ],
    activityTimeline: [
      { time: '14:02', text: 'Task initialized with 12 reference documents', type: 'info' },
      { time: '14:03', text: 'Parallel workstreams 1 & 3 completed successfully', type: 'success' },
      { time: '14:05', text: 'Analyzing positioning gaps & feature matrix...', type: 'action' },
    ],
    requiresUserInput: {
      question: 'I found two strategic positioning directions for the pricing breakdown. Which should we prioritize?',
      options: [
        'Option A: Direct developer pricing (Seat-based + GPU usage)',
        'Option B: Enterprise fleet licensing (Unlimited seats + pooled compute)',
      ],
    },
    outputs: [
      { name: 'Competitor_Strategy_Matrix.pdf', type: 'Document', size: '2.4 MB' },
      { name: 'Pricing_Tiers_Breakdown.xlsx', type: 'Spreadsheet', size: '1.1 MB' },
    ],
  },
];

export const INITIAL_CODE_SESSIONS: CodeSession[] = [
  {
    id: 'code-1',
    title: 'Authentication Middleware Timeout Fix',
    mode: 'code',
    repository: 'nibir404/puku-landing',
    updatedAt: '5 mins ago',
    plan: {
      summary: 'Fix session token expiration latency and add automatic refresh token fallback.',
      affectedFilesCount: 3,
      risk: 'Medium',
      steps: [
        'Inspect session middleware token validation',
        'Update token expiration buffer to 300 seconds',
        'Add refresh token fallback handling',
        'Run authentication unit test suite',
      ],
      approved: true,
    },
    diffs: [
      {
        filename: 'src/lib/auth.ts',
        status: 'modified',
        oldCode: `export function validateToken(token: string) {\n  return jwt.verify(token, SECRET);\n}`,
        newCode: `export function validateToken(token: string) {\n  const decoded = jwt.verify(token, SECRET);\n  if (decoded.exp - Date.now() / 1000 < 300) {\n    return refreshToken(token);\n  }\n  return decoded;\n}`,
      },
      {
        filename: 'src/lib/session.ts',
        status: 'modified',
        oldCode: `const SESSION_TIMEOUT = 3600;`,
        newCode: `const SESSION_TIMEOUT = 7200; // Extended session grace period`,
      },
    ],
    terminalLogs: [
      '$ npm run test',
      '✓ Auth suite: 24 passed (100%)',
      '$ npm run build',
      '✓ Production build clean in 1.28s',
    ],
    tests: [
      { name: 'Token Expiration Validation', passed: true, duration: '14ms' },
      { name: 'Refresh Token Fallback', passed: true, duration: '22ms' },
      { name: 'Session Timeout Grace Period', passed: true, duration: '18ms' },
    ],
    previewUrl: 'http://localhost:3000',
    browserVerified: true,
  },
];

export const INITIAL_SCHEDULED: ScheduledTask[] = [
  {
    id: 'sched-1',
    title: 'Daily QA & Visual Regression Test Suite',
    schedule: 'Every day at 08:00 AM',
    nextRun: 'Tomorrow at 08:00 AM',
    status: 'active',
    type: 'cron',
  },
  {
    id: 'sched-2',
    title: 'Weekly Dependency Vulnerability Audit',
    schedule: 'Every Monday at 09:00 AM',
    nextRun: 'In 3 days',
    status: 'active',
    type: 'cron',
  },
];

export const INITIAL_THREADS: Thread[] = [
  {
    id: 'thread-puku-info',
    title: 'Puku platform architecture',
    updatedAt: '10 mins ago',
    category: 'Chats and tasks',
    modelId: 'sonnet-5-high',
    starred: true,
    activeMode: 'Chat',
    messages: [
      {
        id: 'msg-puku-1',
        role: 'user',
        content: 'Explain how Puku unifies Chat, Co-work, and Code into one workspace.',
        timestamp: '11:20 AM',
      },
      {
        id: 'msg-puku-2',
        role: 'assistant',
        content: `Puku operates as a unified **Agentic Work Operating System** built around three core modes:

1. **CHAT (Think & Collaborate)**: Brainstorm, ask questions, analyze documents, and explore codebases with full conversational intelligence.
2. **CO-WORK (Delegate & Execute)**: Delegate long-running multi-step tasks to parallel agent swarms with visible plans, workstreams, and human-in-the-loop approvals.
3. **CODE (Build & Ship)**: Inspect code in Ask Mode, generate implementation plans in Plan Mode, and edit code with side-by-side diffs, terminal execution, test suites, and browser verification loops.

All modes share the exact same context (Project instructions, open files, git repository, and live web preview).`,
        timestamp: '11:21 AM',
        modelUsed: 'Sonnet 5 High',
      },
    ],
  },
];

const STORAGE_KEY = 'puku_web_chat_threads_v2';

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

  if (lower.includes('react') || lower.includes('dashboard') || lower.includes('component') || lower.includes('ui')) {
    return {
      content: `I've created a complete **React Analytics Dashboard Component** with metric cards, live status telemetry, and responsive layout styling.`,
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
      </div>
    </div>
  );
}`,
      },
    };
  }

  return {
    content: `Processed prompt with **${modelName}**.\n\nSummary:\n• Workspace indexes scanned and updated.\n• Operational rules & context rules verified.\n• All sub-tasks completed with zero warnings.`,
    artifact: {
      id: `art-${Date.now()}`,
      title: 'PukuTaskResult.md',
      type: 'document',
      language: 'markdown',
      version: 1,
      code: `# PUKU TASK RESULT\nPrompt: "${userPrompt}"\nModel: ${modelName}\nStatus: Execution Successful`,
    },
  };
};
