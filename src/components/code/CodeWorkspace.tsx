import { useState } from 'react';
import {
  Code2,
  Terminal,
  CheckCircle2,
  AlertCircle,
  Play,
  RotateCw,
  ExternalLink,
  FileCode,
  GitBranch,
  Sparkles,
  ArrowRight,
  Eye,
  Check,
  X,
  Bug,
  Globe,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { CodeSession, FileDiff } from '@/lib/chatStore';

interface CodeWorkspaceProps {
  sessions: CodeSession[];
  activeSessionId: string | null;
  onSelectSession: (id: string) => void;
  onNewSession: () => void;
}

export const CodeWorkspace = ({
  sessions,
  activeSessionId,
  onSelectSession,
  onNewSession,
}: CodeWorkspaceProps) => {
  const [activeSession, setActiveSession] = useState<CodeSession>(
    sessions[0] || {
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
    }
  );

  const [activeTab, setActiveTab] = useState<'diffs' | 'terminal' | 'tests' | 'preview'>('diffs');
  const [selectedFileIdx, setSelectedFileIdx] = useState(0);
  const [codeMode, setCodeMode] = useState<'ask' | 'plan' | 'code'>(activeSession.mode);

  const activeDiff = activeSession.diffs[selectedFileIdx] || activeSession.diffs[0];

  return (
    <div className="flex-1 flex flex-col md:flex-row min-h-0 bg-[#f5f5f7] font-sans text-[#0F0F11] select-none">
      {/* Left Column: Code Sessions & Files List */}
      <div className="w-full md:w-[280px] bg-white border-r border-[#E5E5E8] flex flex-col justify-between shrink-0 p-3.5 space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <Code2 className="h-4 w-4 text-[#6E56CF]" />
              <span className="font-bold text-sm text-[#0F0F11]">Code Sessions</span>
            </div>

            <button
              onClick={onNewSession}
              className="p-1 text-[#4A4A52] hover:text-[#6E56CF] hover:bg-[#F3F3F5] rounded-[2px] transition-colors"
              title="New code session"
            >
              <PlusIcon />
            </button>
          </div>

          <div className="p-2 bg-[#FAFAFC] border border-[#E5E5E8] rounded-[2px] text-xs space-y-1">
            <div className="flex items-center gap-1.5 text-[#4A4A52] font-mono text-[11px]">
              <GitBranch className="h-3.5 w-3.5 text-[#6E56CF]" />
              <span>{activeSession.repository}</span>
            </div>
          </div>

          {/* Mode Switcher: [Ask | Plan | Code] */}
          <div className="p-1 bg-[#E5E5E8]/60 rounded-[2px] flex items-center justify-between text-xs font-semibold">
            <button
              onClick={() => setCodeMode('ask')}
              className={cn(
                'flex-1 py-1 rounded-[2px] transition-all text-center',
                codeMode === 'ask' ? 'bg-white text-[#6E56CF] font-bold shadow-none' : 'text-[#4A4A52] hover:text-[#0F0F11]'
              )}
            >
              Ask
            </button>
            <button
              onClick={() => setCodeMode('plan')}
              className={cn(
                'flex-1 py-1 rounded-[2px] transition-all text-center',
                codeMode === 'plan' ? 'bg-white text-[#6E56CF] font-bold shadow-none' : 'text-[#4A4A52] hover:text-[#0F0F11]'
              )}
            >
              Plan
            </button>
            <button
              onClick={() => setCodeMode('code')}
              className={cn(
                'flex-1 py-1 rounded-[2px] transition-all text-center',
                codeMode === 'code' ? 'bg-white text-[#6E56CF] font-bold shadow-none' : 'text-[#4A4A52] hover:text-[#0F0F11]'
              )}
            >
              Code
            </button>
          </div>

          {/* File Changes List */}
          <div className="space-y-1 pt-2">
            <div className="px-1 text-[11px] font-mono text-[#4A4A52] uppercase font-bold tracking-wider">
              Modified Files ({activeSession.diffs.length})
            </div>
            {activeSession.diffs.map((d, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedFileIdx(idx)}
                className={cn(
                  'p-2 rounded-[2px] text-xs font-mono cursor-pointer flex items-center justify-between border transition-all',
                  selectedFileIdx === idx
                    ? 'bg-[#F4F2FF] border-[#6E56CF]/30 text-[#6E56CF] font-bold'
                    : 'bg-white border-[#E5E5E8] text-[#0F0F11] hover:bg-[#FAFAFC]'
                )}
              >
                <div className="flex items-center gap-1.5 truncate">
                  <FileCode className="h-3.5 w-3.5 text-[#6E56CF]" />
                  <span className="truncate">{d.filename}</span>
                </div>
                <span className="text-[10px] uppercase font-bold text-amber-600">M</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Workspace Column */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Header Bar */}
        <div className="h-12 px-6 border-b border-[#E5E5E8] bg-white flex items-center justify-between shrink-0 select-none">
          <div className="flex items-center gap-3">
            <h1 className="font-puku font-brand font-bold text-sm text-[#0F0F11]">
              {activeSession.title}
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded-[2px] bg-[#F4F2FF] text-[#6E56CF] border border-[#6E56CF]/30">
              {codeMode.toUpperCase()} MODE
            </span>
          </div>

          {/* Tab Controls: Diffs | Terminal | Tests | Preview */}
          <div className="flex items-center gap-1 bg-[#E5E5E8]/60 p-0.5 rounded-[2px] text-xs font-semibold">
            <button
              onClick={() => setActiveTab('diffs')}
              className={cn(
                'px-3 py-1 rounded-[2px] transition-all',
                activeTab === 'diffs' ? 'bg-white text-[#6E56CF] font-bold shadow-none' : 'text-[#4A4A52] hover:text-[#0F0F11]'
              )}
            >
              Changes ({activeSession.diffs.length})
            </button>

            <button
              onClick={() => setActiveTab('terminal')}
              className={cn(
                'px-3 py-1 rounded-[2px] transition-all',
                activeTab === 'terminal' ? 'bg-white text-[#6E56CF] font-bold shadow-none' : 'text-[#4A4A52] hover:text-[#0F0F11]'
              )}
            >
              Terminal
            </button>

            <button
              onClick={() => setActiveTab('tests')}
              className={cn(
                'px-3 py-1 rounded-[2px] transition-all',
                activeTab === 'tests' ? 'bg-white text-[#6E56CF] font-bold shadow-none' : 'text-[#4A4A52] hover:text-[#0F0F11]'
              )}
            >
              Tests ({activeSession.tests.length})
            </button>

            <button
              onClick={() => setActiveTab('preview')}
              className={cn(
                'px-3 py-1 rounded-[2px] transition-all flex items-center gap-1',
                activeTab === 'preview' ? 'bg-white text-[#6E56CF] font-bold shadow-none' : 'text-[#4A4A52] hover:text-[#0F0F11]'
              )}
            >
              <Eye className="h-3 w-3" />
              <span>Preview</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#f5f5f7]">
          {/* PLAN MODE Reviewer Banner */}
          {codeMode === 'plan' && activeSession.plan && (
            <div className="bg-white border border-[#E5E5E8] rounded-[2px] p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-[#E5E5E8] pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#6E56CF]" />
                  <h2 className="font-bold text-sm text-[#0F0F11]">Implementation Plan Summary</h2>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono">
                  <span>Affected Files: {activeSession.plan.affectedFilesCount}</span>
                  <span className="px-2 py-0.5 bg-amber-50 text-amber-700 font-bold border border-amber-200 rounded-[2px]">
                    Risk: {activeSession.plan.risk}
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#4A4A52]">{activeSession.plan.summary}</p>

              <div className="space-y-2">
                {activeSession.plan.steps.map((step, idx) => (
                  <div key={idx} className="p-2.5 bg-[#FAFAFC] border border-[#E5E5E8] rounded-[2px] text-xs font-mono text-[#0F0F11]">
                    {idx + 1}. {step}
                  </div>
                ))}
              </div>

              <button
                onClick={() => setCodeMode('code')}
                className="px-4 py-2 bg-[#6E56CF] hover:bg-[#5B42F3] text-white text-xs font-semibold rounded-[2px] transition-colors flex items-center gap-1.5"
              >
                <Check className="h-4 w-4" />
                <span>Approve & Execute Code Modifications</span>
              </button>
            </div>
          )}

          {/* TAB 1: Side-by-Side File Diff Reviewer */}
          {activeTab === 'diffs' && activeDiff && (
            <div className="space-y-4">
              <div className="bg-white border border-[#E5E5E8] rounded-[2px] p-3 flex items-center justify-between font-mono text-xs">
                <div className="flex items-center gap-2 font-bold text-[#0F0F11]">
                  <FileCode className="h-4 w-4 text-[#6E56CF]" />
                  <span>{activeDiff.filename}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-[2px] font-bold">
                    Accept Changes
                  </button>
                  <button className="px-2.5 py-1 bg-white border border-[#E5E5E8] text-[#4A4A52] rounded-[2px]">
                    Revert
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                {/* Old Code */}
                <div className="p-4 bg-white border border-[#E5E5E8] rounded-[2px] space-y-2">
                  <div className="text-[11px] font-bold text-red-600 border-b border-[#E5E5E8] pb-2">
                    BEFORE (Original)
                  </div>
                  <pre className="text-red-700 bg-red-50/50 p-3 rounded-[2px] overflow-x-auto whitespace-pre leading-relaxed">
                    {activeDiff.oldCode}
                  </pre>
                </div>

                {/* New Code */}
                <div className="p-4 bg-white border border-[#E5E5E8] rounded-[2px] space-y-2">
                  <div className="text-[11px] font-bold text-emerald-600 border-b border-[#E5E5E8] pb-2">
                    AFTER (AI Modified)
                  </div>
                  <pre className="text-emerald-700 bg-emerald-50/50 p-3 rounded-[2px] overflow-x-auto whitespace-pre leading-relaxed">
                    {activeDiff.newCode}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Interactive Terminal */}
          {activeTab === 'terminal' && (
            <div className="bg-[#0F0F11] text-white rounded-[2px] p-5 font-mono text-xs space-y-3 min-h-[300px]">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3 text-zinc-400">
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-[#6E56CF]" />
                  <span>Terminal — puku-fleet-worker-1</span>
                </div>
                <div className="flex items-center gap-2 text-[11px]">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span>Active Session</span>
                </div>
              </div>

              <div className="space-y-1.5 text-zinc-300">
                {activeSession.terminalLogs.map((log, i) => (
                  <div key={i} className={cn(log.startsWith('$') ? 'text-emerald-400 font-bold' : '')}>
                    {log}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Test Results Suite */}
          {activeTab === 'tests' && (
            <div className="bg-white border border-[#E5E5E8] rounded-[2px] p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-[#E5E5E8] pb-3">
                <div className="font-bold text-xs text-[#0F0F11] uppercase font-mono">
                  Unit & E2E Test Suite Results
                </div>
                <span className="text-xs font-mono font-bold text-emerald-600">
                  {activeSession.tests.filter((t) => t.passed).length} / {activeSession.tests.length} Passed
                </span>
              </div>

              <div className="space-y-2">
                {activeSession.tests.map((t, idx) => (
                  <div key={idx} className="p-3 bg-[#FAFAFC] border border-[#E5E5E8] rounded-[2px] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span className="font-bold text-[#0F0F11]">{t.name}</span>
                    </div>
                    <span className="font-mono text-[#4A4A52]">{t.duration}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Live Web App Preview & Browser Verification */}
          {activeTab === 'preview' && (
            <div className="bg-white border border-[#E5E5E8] rounded-[2px] p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-[#E5E5E8] pb-3">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-[#6E56CF]" />
                  <span className="font-bold text-xs text-[#0F0F11] font-mono">
                    Live Web App Preview: {activeSession.previewUrl}
                  </span>
                </div>
                {activeSession.browserVerified && (
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-[2px] text-xs font-bold font-mono">
                    ✓ Closed-Loop Browser Verified
                  </span>
                )}
              </div>

              <div className="p-6 bg-[#FAFAFC] border border-[#E5E5E8] rounded-[2px] text-center space-y-3">
                <div className="font-puku font-brand font-bold text-lg text-[#0F0F11]">
                  App Preview Rendering Live
                </div>
                <p className="text-xs text-[#4A4A52] max-w-md mx-auto">
                  AI Browser agent has tested the user flow, verified component state, and confirmed 0 console errors.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-4 w-4">
    <path d="M12 5v14M5 12h14" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
