export type ModelId = 'puku-3.5-sonnet' | 'puku-opus-3.0' | 'puku-fast-agent' | 'puku-swarm-fleet';

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
    badge: 'Default',
    description: 'Most intelligent model for code, architecture & design',
    tag: 'Sonnet 3.5',
  },
  {
    id: 'puku-opus-3.0',
    name: 'Puku Opus 3.0',
    badge: 'Deep Reasoning',
    description: 'Advanced reasoning for complex refactoring & security audits',
    tag: 'Opus 3.0',
  },
  {
    id: 'puku-fast-agent',
    name: 'Puku Fast Agent',
    badge: 'Low Latency',
    description: 'Ultra-fast sub-second model for quick edits & shell scripts',
    tag: 'Fast Agent',
  },
  {
    id: 'puku-swarm-fleet',
    name: 'Puku Swarm Fleet',
    badge: 'Multi-Agent',
    description: 'Parallel multi-agent cloud execution fleet for monorepos',
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
};

export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  artifact?: Artifact;
  modelUsed?: string;
};

export type Thread = {
  id: string;
  title: string;
  updatedAt: string;
  category: 'Today' | 'Yesterday' | 'Previous 7 Days';
  modelId: ModelId;
  messages: Message[];
  pinned?: boolean;
};

// Default initial mock threads to give realistic Claude.ai experience immediately
export const INITIAL_THREADS: Thread[] = [
  {
    id: 'thread-1',
    title: 'React Analytics Dashboard Component',
    updatedAt: '10 mins ago',
    category: 'Today',
    modelId: 'puku-3.5-sonnet',
    pinned: true,
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

Click **View Artifact** in the split panel to inspect the live preview or view the full source code.`,
        timestamp: '10:41 AM',
        modelUsed: 'Puku 3.5 Sonnet',
        artifact: {
          id: 'art-dashboard',
          title: 'AnalyticsDashboard.tsx',
          type: 'component',
          language: 'tsx',
          code: `import React, { useState } from 'react';
import { Activity, ArrowUpRight, CreditCard, DollarSign, Users, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState('7d');

  const stats = [
    { title: 'Total Revenue', value: '$48,294.00', change: '+14.2%', icon: DollarSign, isUp: true },
    { title: 'Active Agents', value: '1,284', change: '+28.4%', icon: Users, isUp: true },
    { title: 'Cloud Runs', value: '94,102', change: '+8.1%', icon: Activity, isUp: true },
    { title: 'Pass Rate', value: '99.94%', change: '+0.04%', icon: CheckCircle2, isUp: true },
  ];

  return (
    <div className="p-6 bg-[#FAFAFC] border border-[#E5E5E8] rounded-lg font-sans max-w-5xl mx-auto space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E5E8] pb-5">
        <div>
          <h2 className="text-xl font-bold text-[#0F0F11]">System Intelligence Dashboard</h2>
          <p className="text-xs text-[#4A4A52] mt-0.5">Real-time Puku Cloud Fleet telemetry & agent executions.</p>
        </div>
        <div className="flex items-center gap-2">
          {['24h', '7d', '30d'].map((r) => (
            <button
              key={r}
              onClick={() => setTimeRange(r)}
              className={\`px-3 py-1 text-xs font-semibold rounded border transition-all \${
                timeRange === r
                  ? 'bg-[#6E56CF] text-white border-[#6E56CF]'
                  : 'bg-white text-[#0F0F11] border-[#E5E5E8] hover:border-[#6E56CF]'
              }\`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="p-4 bg-white border border-[#E5E5E8] rounded-md shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[#4A4A52]">{s.title}</span>
                <div className="p-2 rounded bg-[#F4F2FF] text-[#6E56CF]">
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <div className="text-2xl font-extrabold text-[#0F0F11] tracking-tight">{s.value}</div>
              <div className="text-xs font-bold text-emerald-600 flex items-center gap-0.5">
                <ArrowUpRight className="h-3 w-3" /> {s.change} vs previous period
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}`,
          previewHtml: `
            <div style="font-family: sans-serif; padding: 24px; background: #FAFAFC; border: 1px solid #E5E5E8; border-radius: 8px;">
              <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #E5E5E8; padding-bottom: 16px; margin-bottom: 20px;">
                <div>
                  <h3 style="margin: 0; font-size: 18px; color: #0F0F11; font-weight: 800;">Puku System Intelligence</h3>
                  <p style="margin: 4px 0 0 0; font-size: 12px; color: #4A4A52;">Live Puku Cloud Fleet telemetry</p>
                </div>
                <span style="background: #6E56CF; color: white; padding: 4px 10px; font-size: 11px; font-weight: bold; border-radius: 4px;">Live 7d</span>
              </div>
              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
                <div style="background: white; padding: 16px; border: 1px solid #E5E5E8; border-radius: 6px;">
                  <div style="font-size: 11px; color: #4A4A52; font-weight: 600;">REVENUE</div>
                  <div style="font-size: 22px; font-weight: 800; color: #0F0F11; margin-top: 4px;">$48,294.00</div>
                  <div style="font-size: 11px; color: #16a34a; font-weight: bold; margin-top: 4px;">↑ +14.2%</div>
                </div>
                <div style="background: white; padding: 16px; border: 1px solid #E5E5E8; border-radius: 6px;">
                  <div style="font-size: 11px; color: #4A4A52; font-weight: 600;">ACTIVE AGENTS</div>
                  <div style="font-size: 22px; font-weight: 800; color: #0F0F11; margin-top: 4px;">1,284</div>
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
    modelId: 'puku-opus-3.0',
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
        modelUsed: 'Puku Opus 3.0',
        artifact: {
          id: 'art-types',
          title: 'types.ts',
          type: 'code',
          language: 'typescript',
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
