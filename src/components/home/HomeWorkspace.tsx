import { MessageSquare, CheckSquare, Code2, FolderGit2, ArrowUpRight, Play, Sparkles, Clock, Plus } from 'lucide-react';
import { Thread, CoWorkTask, CodeSession, ProjectItem } from '@/lib/chatStore';

interface HomeWorkspaceProps {
  threads: Thread[];
  tasks: CoWorkTask[];
  codeSessions: CodeSession[];
  projects: ProjectItem[];
  onNavigateModule: (module: 'chat' | 'cowork' | 'code' | 'projects' | 'files') => void;
  onSelectThread: (id: string) => void;
  onSelectTask: (id: string) => void;
  onSelectCodeSession: (id: string) => void;
}

export const HomeWorkspace = ({
  threads,
  tasks,
  codeSessions,
  projects,
  onNavigateModule,
  onSelectThread,
  onSelectTask,
  onSelectCodeSession,
}: HomeWorkspaceProps) => {
  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-[#f5f5f7] font-sans text-[#0F0F11] select-none">
      {/* Top Banner Greeting */}
      <div className="bg-white border border-[#E5E5E8] rounded-[2px] p-6 space-y-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[2px] bg-[#F4F2FF] border border-[#6E56CF]/30 text-[#6E56CF] text-xs font-bold font-mono">
            <Sparkles className="h-3.5 w-3.5" />
            <span>UNIFIED AI OPERATING SYSTEM</span>
          </div>
          <h1 className="font-puku font-brand text-2xl md:text-3xl font-extrabold text-[#0F0F11] tracking-tight">
            Good afternoon, Nibir
          </h1>
          <p className="text-xs md:text-sm text-[#4A4A52]">
            Think in Chat • Delegate through Co-work • Build through Code. Context is shared across your workspace.
          </p>
        </div>

        {/* Quick Launch Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onNavigateModule('chat')}
            className="px-3.5 py-2 bg-[#0F0F11] hover:bg-[#6E56CF] text-white font-semibold text-xs rounded-[2px] transition-colors flex items-center gap-1.5"
          >
            <MessageSquare className="h-4 w-4" />
            <span>New Chat</span>
          </button>

          <button
            onClick={() => onNavigateModule('cowork')}
            className="px-3.5 py-2 bg-white border border-[#E5E5E8] hover:border-[#6E56CF] text-[#0F0F11] hover:text-[#6E56CF] font-semibold text-xs rounded-[2px] transition-colors flex items-center gap-1.5"
          >
            <CheckSquare className="h-4 w-4" />
            <span>New Task</span>
          </button>

          <button
            onClick={() => onNavigateModule('code')}
            className="px-3.5 py-2 bg-white border border-[#E5E5E8] hover:border-[#6E56CF] text-[#0F0F11] hover:text-[#6E56CF] font-semibold text-xs rounded-[2px] transition-colors flex items-center gap-1.5"
          >
            <Code2 className="h-4 w-4" />
            <span>New Session</span>
          </button>
        </div>
      </div>

      {/* Grid: Active Tasks & Code Sessions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Tasks Widget */}
        <div className="bg-white border border-[#E5E5E8] rounded-[2px] p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[#E5E5E8] pb-3">
            <div className="flex items-center gap-2">
              <CheckSquare className="h-4 w-4 text-[#6E56CF]" />
              <h2 className="font-bold text-sm text-[#0F0F11]">Active Co-work Tasks</h2>
            </div>
            <button
              onClick={() => onNavigateModule('cowork')}
              className="text-xs font-semibold text-[#6E56CF] hover:underline flex items-center gap-1"
            >
              <span>View all</span>
              <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>

          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => {
                  onSelectTask(task.id);
                  onNavigateModule('cowork');
                }}
                className="p-3.5 bg-[#FAFAFC] border border-[#E5E5E8] hover:border-[#6E56CF] rounded-[2px] cursor-pointer transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[#0F0F11] group-hover:text-[#6E56CF] transition-colors">
                    {task.title}
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded-[2px] bg-[#F4F2FF] text-[#6E56CF] border border-[#6E56CF]/30">
                    {task.status}
                  </span>
                </div>

                <div className="w-full bg-[#E5E5E8] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#6E56CF] h-full transition-all duration-300" style={{ width: `${task.progress}%` }} />
                </div>

                <div className="flex items-center justify-between text-[11px] text-[#4A4A52]">
                  <span>Progress: {task.progress}%</span>
                  <span>Updated {task.updatedAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Code Sessions Widget */}
        <div className="bg-white border border-[#E5E5E8] rounded-[2px] p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[#E5E5E8] pb-3">
            <div className="flex items-center gap-2">
              <Code2 className="h-4 w-4 text-[#6E56CF]" />
              <h2 className="font-bold text-sm text-[#0F0F11]">Active Code Sessions</h2>
            </div>
            <button
              onClick={() => onNavigateModule('code')}
              className="text-xs font-semibold text-[#6E56CF] hover:underline flex items-center gap-1"
            >
              <span>View all</span>
              <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>

          <div className="space-y-3">
            {codeSessions.map((s) => (
              <div
                key={s.id}
                onClick={() => {
                  onSelectCodeSession(s.id);
                  onNavigateModule('code');
                }}
                className="p-3.5 bg-[#FAFAFC] border border-[#E5E5E8] hover:border-[#6E56CF] rounded-[2px] cursor-pointer transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[#0F0F11] group-hover:text-[#6E56CF] transition-colors">
                    {s.title}
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded-[2px] bg-white border border-[#E5E5E8] text-[#0F0F11]">
                    {s.mode} mode
                  </span>
                </div>

                <div className="text-[11px] font-mono text-[#4A4A52] flex items-center gap-3">
                  <span>Repo: {s.repository}</span>
                  <span>Diffs: {s.diffs.length} files</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="bg-white border border-[#E5E5E8] rounded-[2px] p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-[#E5E5E8] pb-3">
          <div className="flex items-center gap-2">
            <FolderGit2 className="h-4 w-4 text-[#6E56CF]" />
            <h2 className="font-bold text-sm text-[#0F0F11]">Recent Projects</h2>
          </div>
          <button
            onClick={() => onNavigateModule('projects')}
            className="text-xs font-semibold text-[#6E56CF] hover:underline flex items-center gap-1"
          >
            <span>View all</span>
            <ArrowUpRight className="h-3 w-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((p) => (
            <div
              key={p.id}
              onClick={() => onNavigateModule('projects')}
              className="p-4 bg-[#FAFAFC] border border-[#E5E5E8] hover:border-[#6E56CF] rounded-[2px] cursor-pointer transition-all space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-[#0F0F11] group-hover:text-[#6E56CF] transition-colors font-puku font-brand">
                  {p.name}
                </span>
                <span className="text-[11px] text-[#4A4A52] font-mono">{p.updatedAt}</span>
              </div>
              <p className="text-xs text-[#4A4A52] line-clamp-2">{p.tagline}</p>
              <div className="flex items-center gap-4 text-[11px] font-mono text-[#4A4A52] pt-1">
                <span>{p.filesCount} files</span>
                <span>{p.tasksCount} tasks</span>
                <span>{p.sessionsCount} code sessions</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
