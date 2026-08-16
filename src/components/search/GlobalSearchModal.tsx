import { useState, useEffect } from 'react';
import { Search, X, MessageSquare, CheckSquare, Code2, FolderGit2, FileText, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Thread, CoWorkTask, CodeSession, ProjectItem } from '@/lib/chatStore';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  threads: Thread[];
  tasks: CoWorkTask[];
  codeSessions: CodeSession[];
  projects: ProjectItem[];
  onSelectThread: (id: string) => void;
  onSelectTask: (id: string) => void;
  onSelectCodeSession: (id: string) => void;
  onSelectProject: (id: string) => void;
}

export const GlobalSearchModal = ({
  isOpen,
  onClose,
  threads,
  tasks,
  codeSessions,
  projects,
  onSelectThread,
  onSelectTask,
  onSelectCodeSession,
  onSelectProject,
}: GlobalSearchModalProps) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          /* Trigger via parent */
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredThreads = threads.filter((t) => t.title.toLowerCase().includes(query.toLowerCase()));
  const filteredTasks = tasks.filter((t) => t.title.toLowerCase().includes(query.toLowerCase()));
  const filteredSessions = codeSessions.filter((s) => s.title.toLowerCase().includes(query.toLowerCase()));
  const filteredProjects = projects.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-start justify-center pt-20 px-4 font-sans select-none">
      <div className="w-full max-w-2xl bg-white border border-[#E5E5E8] rounded-[2px] shadow-2xl overflow-hidden flex flex-col">
        {/* Search Header Input */}
        <div className="p-3.5 border-b border-[#E5E5E8] flex items-center gap-3 bg-white">
          <Search className="h-4 w-4 text-[#6E56CF] shrink-0" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search conversations, tasks, code sessions, projects, files... (⌘K)"
            className="w-full bg-transparent border-0 text-sm text-[#0F0F11] placeholder-[#4A4A52] focus:outline-none font-normal"
          />
          <button
            onClick={onClose}
            className="p-1 text-[#4A4A52] hover:text-[#0F0F11] rounded-[2px] hover:bg-[#F3F3F5]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[420px] overflow-y-auto p-3 space-y-4 text-xs font-medium bg-[#FAFAFC]">
          {/* Projects */}
          {filteredProjects.length > 0 && (
            <div className="space-y-1">
              <div className="px-2 text-[10.5px] font-mono text-[#4A4A52] uppercase tracking-wider font-semibold">
                Projects
              </div>
              {filteredProjects.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    onSelectProject(p.id);
                    onClose();
                  }}
                  className="p-2.5 bg-white border border-[#E5E5E8] hover:border-[#6E56CF] rounded-[2px] flex items-center justify-between cursor-pointer transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <FolderGit2 className="h-4 w-4 text-[#6E56CF]" />
                    <div>
                      <div className="font-bold text-[#0F0F11] group-hover:text-[#6E56CF] transition-colors">{p.name}</div>
                      <div className="text-[11px] text-[#4A4A52] font-normal">{p.tagline}</div>
                    </div>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-[#4A4A52] group-hover:text-[#6E56CF] opacity-0 group-hover:opacity-100 transition-all" />
                </div>
              ))}
            </div>
          )}

          {/* Co-work Tasks */}
          {filteredTasks.length > 0 && (
            <div className="space-y-1">
              <div className="px-2 text-[10.5px] font-mono text-[#4A4A52] uppercase tracking-wider font-semibold">
                Co-work Tasks
              </div>
              {filteredTasks.map((t) => (
                <div
                  key={t.id}
                  onClick={() => {
                    onSelectTask(t.id);
                    onClose();
                  }}
                  className="p-2.5 bg-white border border-[#E5E5E8] hover:border-[#6E56CF] rounded-[2px] flex items-center justify-between cursor-pointer transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <CheckSquare className="h-4 w-4 text-[#6E56CF]" />
                    <div>
                      <div className="font-bold text-[#0F0F11] group-hover:text-[#6E56CF] transition-colors">{t.title}</div>
                      <div className="text-[11px] text-[#4A4A52] font-normal">Status: {t.status} • {t.progress}%</div>
                    </div>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-[#4A4A52] group-hover:text-[#6E56CF] opacity-0 group-hover:opacity-100 transition-all" />
                </div>
              ))}
            </div>
          )}

          {/* Code Sessions */}
          {filteredSessions.length > 0 && (
            <div className="space-y-1">
              <div className="px-2 text-[10.5px] font-mono text-[#4A4A52] uppercase tracking-wider font-semibold">
                Code Sessions
              </div>
              {filteredSessions.map((s) => (
                <div
                  key={s.id}
                  onClick={() => {
                    onSelectCodeSession(s.id);
                    onClose();
                  }}
                  className="p-2.5 bg-white border border-[#E5E5E8] hover:border-[#6E56CF] rounded-[2px] flex items-center justify-between cursor-pointer transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <Code2 className="h-4 w-4 text-[#6E56CF]" />
                    <div>
                      <div className="font-bold text-[#0F0F11] group-hover:text-[#6E56CF] transition-colors">{s.title}</div>
                      <div className="text-[11px] font-mono text-[#4A4A52]">Mode: {s.mode.toUpperCase()} • Repo: {s.repository}</div>
                    </div>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-[#4A4A52] group-hover:text-[#6E56CF] opacity-0 group-hover:opacity-100 transition-all" />
                </div>
              ))}
            </div>
          )}

          {/* Conversations */}
          {filteredThreads.length > 0 && (
            <div className="space-y-1">
              <div className="px-2 text-[10.5px] font-mono text-[#4A4A52] uppercase tracking-wider font-semibold">
                Chat Conversations
              </div>
              {filteredThreads.map((th) => (
                <div
                  key={th.id}
                  onClick={() => {
                    onSelectThread(th.id);
                    onClose();
                  }}
                  className="p-2.5 bg-white border border-[#E5E5E8] hover:border-[#6E56CF] rounded-[2px] flex items-center justify-between cursor-pointer transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <MessageSquare className="h-4 w-4 text-[#6E56CF]" />
                    <div className="font-bold text-[#0F0F11] group-hover:text-[#6E56CF] transition-colors">{th.title}</div>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-[#4A4A52] group-hover:text-[#6E56CF] opacity-0 group-hover:opacity-100 transition-all" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
