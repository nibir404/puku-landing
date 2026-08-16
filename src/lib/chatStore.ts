export type ModelId = 'puku-3.5-sonnet' | 'puku-3.0-opus' | 'puku-3.5-haiku' | 'puku-swarm-fleet';

export type ModelOption = {
  id: ModelId;
  name: string;
  badge: string;
  description: string;
  tag: string;
};

export const MODEL_OPTIONS: ModelOption[] = [
  {
    id: 'puku-3.5-sonnet',
    name: 'Puku 3.5 Sonnet',
    badge: 'Most Intelligent',
    description: 'Optimal balance of reasoning, speed, and coding capabilities.',
    tag: '3.5 Sonnet',
  },
  {
    id: 'puku-3.0-opus',
    name: 'Puku 3.0 Opus',
    badge: 'Deep Reasoning',
    description: 'Maximum intelligence for complex architecture & security audits.',
    tag: '3.0 Opus',
  },
  {
    id: 'puku-3.5-haiku',
    name: 'Puku 3.5 Haiku',
    badge: 'Fast & Light',
    description: 'Ultra-fast response model for quick edits & terminal scripts.',
    tag: '3.5 Haiku',
  },
  {
    id: 'puku-swarm-fleet',
    name: 'Puku Swarm Fleet',
    badge: 'Multi-Agent',
    description: 'Parallel multi-agent cloud execution fleet for monorepos.',
    tag: 'Swarm Fleet',
  },
];

export type Artifact = {
  id: string;
  title: string;
  type: 'code' | 'component' | 'markdown' | 'svg';
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
};

export type ProjectSpace = {
  id: string;
  name: string;
  description: string;
  iconName: string;
};

export type Thread = {
  id: string;
  title: string;
  updatedAt: string;
  category: 'Today' | 'Yesterday' | 'Previous 7 Days';
  modelId: ModelId;
  messages: Message[];
  starred?: boolean;
  projectId?: string;
};

export const MOCK_PROJECTS: ProjectSpace[] = [
  { id: 'proj-1', name: 'Web Analytics App', description: 'React dashboard & telemetry', iconName: 'BarChart' },
  { id: 'proj-2', name: 'TypeScript Monorepo', description: 'Shared types & API clients', iconName: 'FolderGit2' },
];

export const INITIAL_THREADS: Thread[] = [
  {
    id: 'thread-1',
    title: 'React Analytics Dashboard Component',
    updatedAt: '10 mins ago',
    category: 'Today',
    modelId: 'puku-3.5-sonnet',
    starred: true,
    projectId: 'proj-1',
    messages: [
      {
        id: 'msg-1',
        role: 'user',
        content: 'Create a full React Analytics Dashboard UI component with stat metrics, interactive charts, and Tailwind CSS styling.',
        timestamp: '10:40 AM',
      },
      {
        id: 'msg-2',
        role: 'assistant',
        content: `I've created a complete **React Analytics Dashboard Component** with high-contrast metrics cards, live activity feeds, and interactive status badges.

Click **Click to open artifact ↗** below to view the interactive live preview or inspect the full source code side-by-side.`,
        timestamp: '10:41 AM',
        modelUsed: 'Puku 3.5 Sonnet',
        artifact: {
          id: 'art-dashboard',
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
    <div className="p-6 bg-[#FAF9F5] border border-[#E2E0D8] rounded-2xl font-sans max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between border-b border-[#E2E0D8] pb-4">
        <div>
          <h2 className="text-xl font-serif font-semibold text-[#1F1F1E]">Telemetry & Analytics</h2>
          <p className="text-xs text-[#66645E] mt-0.5">Real-time Puku Cloud Fleet performance telemetry.</p>
        </div>
        <div className="flex items-center gap-1.5 bg-white border border-[#E2E0D8] p-1 rounded-lg">
          {['24h', '7d', '30d'].map((r) => (
            <button
              key={r}
              onClick={() => setTimeRange(r)}
              className={\`px-2.5 py-1 text-xs font-medium rounded-md transition-all \${
                timeRange === r ? 'bg-[#1F1F1E] text-white' : 'text-[#66645E] hover:text-[#1F1F1E]'
              }\`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="p-4 bg-white border border-[#E2E0D8] rounded-xl space-y-2">
              <div className="flex items-center justify-between text-xs text-[#66645E]">
                <span>{s.title}</span>
                <Icon className="h-4 w-4 text-[#DA7756]" />
              </div>
              <div className="text-2xl font-extrabold text-[#1F1F1E] tracking-tight">{s.value}</div>
              <div className="text-xs font-bold text-emerald-600 flex items-center gap-0.5">
                <ArrowUpRight className="h-3 w-3" /> {s.change}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}`,
          previewHtml: `
            <div style="font-family: serif; padding: 24px; background: #FAF9F5; border: 1px solid #E2E0D8; border-radius: 16px;">
              <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #E2E0D8; padding-bottom: 16px; margin-bottom: 20px;">
                <div>
                  <h3 style="margin: 0; font-size: 20px; color: #1F1F1E; font-weight: 600;">Puku System Telemetry</h3>
                  <p style="margin: 4px 0 0 0; font-size: 12px; color: #66645E;">Live Puku Cloud Fleet telemetry</p>
                </div>
                <span style="background: #DA7756; color: white; padding: 4px 12px; font-size: 11px; font-weight: bold; border-radius: 6px;">Live 7d</span>
              </div>
              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
                <div style="background: white; padding: 16px; border: 1px solid #E2E0D8; border-radius: 12px;">
                  <div style="font-size: 11px; color: #66645E; font-weight: 600;">TOTAL REVENUE</div>
                  <div style="font-size: 22px; font-weight: 800; color: #1F1F1E; margin-top: 4px;">$48,294.00</div>
                  <div style="font-size: 11px; color: #16a34a; font-weight: bold; margin-top: 4px;">↑ +14.2%</div>
                </div>
                <div style="background: white; padding: 16px; border: 1px solid #E2E0D8; border-radius: 12px;">
                  <div style="font-size: 11px; color: #66645E; font-weight: 600;">ACTIVE AGENTS</div>
                  <div style="font-size: 22px; font-weight: 800; color: #1F1F1E; margin-top: 4px;">1,284</div>
                  <div style="font-size: 11px; color: #16a34a; font-weight: bold; margin-top: 4px;">↑ +28.4%</div>
                </div>
              </div>
            </div>
          `,
        },
      },
    ],
  },
  {
    id: 'thread-2',
    title: 'TypeScript Monorepo Type Refactor',
    updatedAt: '2 hours ago',
    category: 'Today',
    modelId: 'puku-3.0-opus',
    messages: [
      {
        id: 'msg-3',
        role: 'user',
        content: 'Refactor our TypeScript workspace types to enforce strict discriminated unions across API payloads.',
        timestamp: '08:15 AM',
      },
      {
        id: 'msg-4',
        role: 'assistant',
        content: 'Here is the refactored strict type architecture with type guard utilities and exhaustive matching.',
        timestamp: '08:16 AM',
        modelUsed: 'Puku 3.0 Opus',
        artifact: {
          id: 'art-types',
          title: 'types.ts',
          type: 'code',
          language: 'typescript',
          version: 1,
          code: `export type ApiResponse<T> =
  | { status: 'success'; data: T; timestamp: number }
  | { status: 'error'; code: string; message: string }
  | { status: 'loading'; progressPercentage: number };

export function isSuccess<T>(res: ApiResponse<T>): res is { status: 'success'; data: T; timestamp: number } {
  return res.status === 'success';
}`,
        },
      },
    ],
  },
  {
    id: 'thread-3',
    title: 'WCAG AAA Accessibility Audit',
    updatedAt: 'Yesterday',
    category: 'Yesterday',
    modelId: 'puku-3.5-sonnet',
    messages: [
      {
        id: 'msg-5',
        role: 'user',
        content: 'Audit our landing page buttons and navigation bar for WCAG 2.1 & 2.2 AAA accessibility compliance.',
        timestamp: 'Yesterday',
      },
      {
        id: 'msg-6',
        role: 'assistant',
        content: 'Completed WCAG AAA accessibility audit. All interactive elements satisfy minimum contrast (>7:1) and touch target size (>=44px).',
        timestamp: 'Yesterday',
        modelUsed: 'Puku 3.5 Sonnet',
      },
    ],
  },
];
