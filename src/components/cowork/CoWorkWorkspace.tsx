import { useState } from 'react';
import {
  CheckSquare,
  Play,
  Pause,
  Square,
  Plus,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  FileText,
  Download,
  ArrowRight,
  Sparkles,
  ListOrdered,
  Layers,
  HelpCircle,
  RefreshCw,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { CoWorkTask, TaskStep, Workstream } from '@/lib/chatStore';

interface CoWorkWorkspaceProps {
  tasks: CoWorkTask[];
  activeTaskId: string | null;
  onSelectTask: (id: string) => void;
  onNewTask: () => void;
  onOpenCode: () => void;
}

export const CoWorkWorkspace = ({
  tasks,
  activeTaskId,
  onSelectTask,
  onNewTask,
  onOpenCode,
}: CoWorkWorkspaceProps) => {
  const [objectiveInput, setObjectiveInput] = useState('');
  const [taskState, setTaskState] = useState<'create' | 'plan' | 'running' | 'completed'>('running');
  const [activeTask, setActiveTask] = useState<CoWorkTask>(
    tasks[0] || {
      id: 'task-new',
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
    }
  );

  const [userInputChoice, setUserInputChoice] = useState<string | null>(null);

  const handleStartNewTaskPlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!objectiveInput.trim()) return;
    setTaskState('plan');
  };

  return (
    <div className="flex-1 flex flex-col md:flex-row min-h-0 bg-[#f5f5f7] font-sans text-[#0F0F11] select-none">
      {/* Left Column: Tasks List Sidebar */}
      <div className="w-full md:w-[280px] bg-white border-r border-[#E5E5E8] flex flex-col justify-between shrink-0 p-3.5 space-y-3">
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <CheckSquare className="h-4 w-4 text-[#6E56CF]" />
              <span className="font-bold text-sm text-[#0F0F11]">Co-work Tasks</span>
            </div>

            <button
              onClick={() => {
                setTaskState('create');
                onNewTask();
              }}
              className="p-1 text-[#4A4A52] hover:text-[#6E56CF] hover:bg-[#F3F3F5] rounded-[2px] transition-colors"
              title="Create new task"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          {/* + New Task Button */}
          <button
            onClick={() => setTaskState('create')}
            className="w-full h-9 px-3 bg-[#0F0F11] hover:bg-[#6E56CF] text-white font-semibold text-xs rounded-[2px] transition-colors flex items-center justify-center gap-1.5"
          >
            <Plus className="h-4 w-4" />
            <span>New Co-work Task</span>
          </button>

          {/* Task List */}
          <div className="space-y-1 pt-1">
            {tasks.map((t) => (
              <div
                key={t.id}
                onClick={() => {
                  setActiveTask(t);
                  setTaskState('running');
                  onSelectTask(t.id);
                }}
                className={cn(
                  'p-2.5 rounded-[2px] text-xs cursor-pointer transition-all border space-y-1',
                  activeTask.id === t.id
                    ? 'bg-[#F4F2FF] border-[#6E56CF]/30 text-[#6E56CF] font-bold shadow-none'
                    : 'bg-white border-[#E5E5E8] text-[#4A4A52] hover:text-[#0F0F11] hover:bg-[#FAFAFC]'
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="truncate">{t.title}</span>
                  <span className="text-[10px] font-mono font-semibold">{t.progress}%</span>
                </div>
                <div className="text-[10.5px] font-mono text-[#4A4A52]">{t.status}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Workspace Column */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto p-6 md:p-8 space-y-6">
        {/* State A: Task Objective Creator */}
        {taskState === 'create' && (
          <div className="max-w-2xl mx-auto w-full bg-white border border-[#E5E5E8] rounded-[2px] p-6 space-y-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[2px] bg-[#F4F2FF] border border-[#6E56CF]/30 text-[#6E56CF] text-xs font-bold font-mono">
                <Sparkles className="h-3.5 w-3.5" />
                <span>STEP 1 OF 3: TASK OBJECTIVE</span>
              </div>
              <h2 className="font-puku font-brand text-2xl font-bold text-[#0F0F11]">
                What do you want to accomplish?
              </h2>
              <p className="text-xs text-[#4A4A52]">
                Puku will create an actionable multi-step plan with parallel workstreams.
              </p>
            </div>

            <form onSubmit={handleStartNewTaskPlan} className="space-y-4">
              <textarea
                rows={4}
                value={objectiveInput}
                onChange={(e) => setObjectiveInput(e.target.value)}
                placeholder="e.g., Analyze 20 competitors, identify positioning opportunities, and create an executive strategy document."
                className="w-full p-3 bg-[#FAFAFC] border border-[#E5E5E8] focus:border-[#6E56CF] rounded-[2px] text-xs text-[#0F0F11] placeholder-[#4A4A52] focus:outline-none font-normal leading-relaxed resize-none"
              />

              <div className="flex items-center justify-between pt-2">
                <div className="text-xs text-[#4A4A52] font-mono">
                  Context: [PRD.md] [3 Files] [Browser Active]
                </div>
                <button
                  type="submit"
                  disabled={!objectiveInput.trim()}
                  className="px-4 py-2 bg-[#6E56CF] hover:bg-[#5B42F3] disabled:opacity-40 text-white font-semibold text-xs rounded-[2px] transition-colors flex items-center gap-1.5"
                >
                  <span>Generate Task Plan</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* State B: Task Plan Reviewer */}
        {taskState === 'plan' && (
          <div className="max-w-2xl mx-auto w-full bg-white border border-[#E5E5E8] rounded-[2px] p-6 space-y-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[2px] bg-[#F4F2FF] border border-[#6E56CF]/30 text-[#6E56CF] text-xs font-bold font-mono">
                <ListOrdered className="h-3.5 w-3.5" />
                <span>STEP 2 OF 3: REVIEW TASK PLAN</span>
              </div>
              <h2 className="font-puku font-brand text-2xl font-bold text-[#0F0F11]">
                Proposed Task Execution Plan
              </h2>
            </div>

            <div className="space-y-3 border-y border-[#E5E5E8] py-4">
              {[
                'Step 1: Index workspace context and parse objective parameters',
                'Step 2: Launch 3 parallel workstreams for pricing & UX research',
                'Step 3: Synthesize feature matrix and cross-reference gaps',
                'Step 4: Generate executive strategy summary and downloadable PDF',
              ].map((step, idx) => (
                <div key={idx} className="p-3 bg-[#FAFAFC] border border-[#E5E5E8] rounded-[2px] flex items-center justify-between text-xs text-[#0F0F11]">
                  <span>{step}</span>
                  <span className="text-[10px] font-mono font-bold text-[#6E56CF]">Approved</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={() => setTaskState('create')}
                className="px-3.5 py-2 bg-white border border-[#E5E5E8] text-[#0F0F11] text-xs font-semibold rounded-[2px]"
              >
                Edit Plan
              </button>

              <button
                onClick={() => setTaskState('running')}
                className="px-5 py-2 bg-[#6E56CF] hover:bg-[#5B42F3] text-white font-semibold text-xs rounded-[2px] transition-colors flex items-center gap-1.5"
              >
                <Play className="h-4 w-4 fill-white" />
                <span>Start Task Execution</span>
              </button>
            </div>
          </div>
        )}

        {/* State C: Active Task Execution Workspace */}
        {taskState === 'running' && (
          <div className="space-y-6">
            {/* Task Header Bar */}
            <div className="bg-white border border-[#E5E5E8] rounded-[2px] p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-puku font-brand text-xl font-bold text-[#0F0F11]">
                    {activeTask.title}
                  </h1>
                  <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded-[2px] bg-[#F4F2FF] text-[#6E56CF] border border-[#6E56CF]/30">
                    {activeTask.status} ({activeTask.progress}%)
                  </span>
                </div>
                <p className="text-xs text-[#4A4A52] mt-1">{activeTask.objective}</p>
              </div>

              {/* Interruption Controls */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => alert('Task Paused')}
                  className="px-3 py-1.5 bg-white border border-[#E5E5E8] hover:border-[#6E56CF] text-[#0F0F11] text-xs font-semibold rounded-[2px] flex items-center gap-1"
                >
                  <Pause className="h-3.5 w-3.5 text-[#4A4A52]" />
                  <span>Pause</span>
                </button>

                <button
                  onClick={() => setTaskState('completed')}
                  className="px-3 py-1.5 bg-[#0F0F11] hover:bg-[#6E56CF] text-white text-xs font-semibold rounded-[2px] flex items-center gap-1"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Complete Task</span>
                </button>
              </div>
            </div>

            {/* Human-in-the-Loop Interruption Card (if applicable) */}
            {activeTask.requiresUserInput && !userInputChoice && (
              <div className="bg-[#F4F2FF] border border-[#6E56CF]/40 rounded-[2px] p-5 space-y-4">
                <div className="flex items-center gap-2 text-[#6E56CF] font-bold text-xs font-mono uppercase tracking-wider">
                  <HelpCircle className="h-4 w-4" />
                  <span>AI NEEDS YOUR INPUT</span>
                </div>

                <p className="text-sm font-semibold text-[#0F0F11]">
                  {activeTask.requiresUserInput.question}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeTask.requiresUserInput.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => setUserInputChoice(opt)}
                      className="p-3 bg-white border border-[#E5E5E8] hover:border-[#6E56CF] hover:bg-white rounded-[2px] text-xs text-left font-semibold text-[#0F0F11] hover:text-[#6E56CF] transition-all shadow-none"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Parallel Workstreams Grid */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-[#0F0F11] uppercase tracking-wider font-mono flex items-center gap-2">
                <Layers className="h-4 w-4 text-[#6E56CF]" />
                <span>Parallel Workstreams Execution Fleet</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {activeTask.workstreams.map((ws) => (
                  <div key={ws.id} className="p-3.5 bg-white border border-[#E5E5E8] rounded-[2px] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#0F0F11]">{ws.title}</span>
                      <span
                        className={cn(
                          'text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-[2px]',
                          ws.status === 'completed'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : ws.status === 'working'
                            ? 'bg-[#F4F2FF] text-[#6E56CF] border border-[#6E56CF]/30 animate-pulse'
                            : 'bg-[#FAFAFC] text-[#4A4A52] border border-[#E5E5E8]'
                        )}
                      >
                        {ws.status}
                      </span>
                    </div>
                    {ws.output && (
                      <p className="text-[11px] text-[#4A4A52] font-mono bg-[#FAFAFC] p-2 rounded-[2px] border border-[#E5E5E8]">
                        Output: {ws.output}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Expandable Activity Timeline & Completion Handoffs */}
            <div className="bg-white border border-[#E5E5E8] rounded-[2px] p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-[#E5E5E8] pb-3">
                <h3 className="text-xs font-bold text-[#0F0F11] uppercase tracking-wider font-mono">
                  Execution Activity Timeline
                </h3>
                <span className="text-[11px] font-mono text-[#4A4A52]">3 Events Logged</span>
              </div>

              <div className="space-y-2 font-mono text-xs">
                {activeTask.activityTimeline.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-2 bg-[#FAFAFC] border border-[#E5E5E8] rounded-[2px]">
                    <span className="text-[#4A4A52] shrink-0">{item.time}</span>
                    <span className="text-[#0F0F11]">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Cross-mode Handoffs */}
              <div className="pt-4 border-t border-[#E5E5E8] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-xs font-semibold text-[#0F0F11]">
                  Generated Outputs: {activeTask.outputs?.length || 0} Files
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={onOpenCode}
                    className="px-3.5 py-2 bg-[#0F0F11] hover:bg-[#6E56CF] text-white text-xs font-semibold rounded-[2px] transition-colors flex items-center gap-1.5"
                  >
                    <span>Open Output in Code</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
