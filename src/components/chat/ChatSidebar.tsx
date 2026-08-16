import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  MessageSquare,
  Search,
  ChevronDown,
  Trash2,
  Star,
  Settings,
  X,
  Bot,
  User,
  Check,
  FolderGit2,
  BarChart,
  Sparkles,
  Zap,
  SlidersHorizontal,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Thread, ModelId, MODEL_OPTIONS, MOCK_PROJECTS } from '@/lib/chatStore';

interface ChatSidebarProps {
  threads: Thread[];
  activeThreadId: string | null;
  activeModelId: ModelId;
  onSelectThread: (threadId: string) => void;
  onNewChat: () => void;
  onDeleteThread: (threadId: string) => void;
  onSelectModel: (modelId: ModelId) => void;
  isOpen: boolean;
  onCloseMobile: () => void;
}

export const ChatSidebar = ({
  threads,
  activeThreadId,
  activeModelId,
  onSelectThread,
  onNewChat,
  onDeleteThread,
  onSelectModel,
  isOpen,
  onCloseMobile,
}: ChatSidebarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [modelDropdownOpen, setModelDropdownOpen] = useState(false);

  const activeModel = MODEL_OPTIONS.find((m) => m.id === activeModelId) || MODEL_OPTIONS[0];

  const filteredThreads = threads.filter((t) =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const starredThreads = filteredThreads.filter((t) => t.starred);
  const categories = ['Today', 'Yesterday', 'Previous 7 Days'] as const;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      <aside
        className={cn(
          'fixed lg:static inset-y-0 left-0 z-50 w-[270px] bg-[#F5F3ED] border-r border-[#E2E0D8] flex flex-col justify-between transition-transform duration-200 ease-in-out select-none font-sans',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Header & Brand */}
        <div className="p-3.5 space-y-3">
          <div className="flex items-center justify-between px-1">
            <Link to="/" className="flex items-center gap-2.5" aria-label="Puku Home">
              <div className="h-6 w-6 rounded-md bg-[#DA7756] text-white flex items-center justify-center font-extrabold text-xs">
                P
              </div>
              <span className="text-base font-serif font-bold text-[#1F1F1E] tracking-tight">Puku</span>
            </Link>

            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1 text-[#66645E] hover:text-[#1F1F1E] rounded"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Claude Signature "+ Start new chat" Button */}
          <button
            onClick={() => {
              onNewChat();
              onCloseMobile();
            }}
            className="w-full h-10 px-3 bg-[#EAE7DC] hover:bg-[#E2DEC5] text-[#1F1F1E] font-semibold text-xs rounded-xl transition-colors flex items-center justify-between shadow-xs border border-[#E2E0D8]"
          >
            <div className="flex items-center gap-2">
              <Plus className="h-4 w-4 text-[#DA7756]" />
              <span>Start new chat</span>
            </div>
            <span className="text-[10px] font-mono opacity-60 bg-white/60 px-1.5 py-0.5 rounded">⌘N</span>
          </button>

          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-[#66645E]" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-8 pl-8 pr-3 bg-white border border-[#E2E0D8] rounded-lg text-xs text-[#1F1F1E] placeholder-[#88857C] focus:outline-none focus:border-[#DA7756]"
            />
          </div>
        </div>

        {/* Middle Scroll Area */}
        <div className="flex-1 overflow-y-auto px-3 space-y-4 no-scrollbar">
          {/* Projects / Workspaces */}
          <div className="space-y-1">
            <div className="px-2 text-[10.5px] font-mono uppercase tracking-wider text-[#66645E] font-bold">
              Projects & Memory
            </div>
            {MOCK_PROJECTS.map((proj) => (
              <div
                key={proj.id}
                className="flex items-center justify-between p-2 rounded-lg text-xs font-semibold text-[#1F1F1E] hover:bg-[#EAE7DC] cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <FolderGit2 className="h-3.5 w-3.5 text-[#DA7756] shrink-0" />
                  <span className="truncate">{proj.name}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Starred Chats */}
          {starredThreads.length > 0 && (
            <div className="space-y-1">
              <div className="px-2 text-[10.5px] font-mono uppercase tracking-wider text-[#66645E] font-bold flex items-center gap-1">
                <Star className="h-3 w-3 text-[#DA7756] fill-current" />
                <span>Starred</span>
              </div>
              {starredThreads.map((t) => {
                const isActive = activeThreadId === t.id;
                return (
                  <div
                    key={t.id}
                    onClick={() => {
                      onSelectThread(t.id);
                      onCloseMobile();
                    }}
                    className={cn(
                      'group flex items-center justify-between p-2 rounded-lg text-xs font-semibold cursor-pointer transition-all border',
                      isActive
                        ? 'bg-white border-[#E2E0D8] text-[#DA7756] shadow-xs'
                        : 'border-transparent text-[#1F1F1E] hover:bg-[#EAE7DC]'
                    )}
                  >
                    <div className="flex items-center gap-2 min-w-0 truncate">
                      <MessageSquare className="h-3.5 w-3.5 text-[#DA7756] shrink-0" />
                      <span className="truncate">{t.title}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Timeline History */}
          {categories.map((cat) => {
            const group = filteredThreads.filter((t) => t.category === cat);
            if (group.length === 0) return null;
            return (
              <div key={cat} className="space-y-1">
                <div className="px-2 text-[10.5px] font-mono uppercase tracking-wider text-[#66645E] font-bold">
                  {cat}
                </div>
                {group.map((t) => {
                  const isActive = activeThreadId === t.id;
                  return (
                    <div
                      key={t.id}
                      onClick={() => {
                        onSelectThread(t.id);
                        onCloseMobile();
                      }}
                      className={cn(
                        'group flex items-center justify-between p-2 rounded-lg text-xs font-semibold cursor-pointer transition-all border',
                        isActive
                          ? 'bg-white border-[#E2E0D8] text-[#1F1F1E] shadow-xs'
                          : 'border-transparent text-[#66645E] hover:text-[#1F1F1E] hover:bg-[#EAE7DC]'
                      )}
                    >
                      <span className="truncate">{t.title}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteThread(t.id);
                        }}
                        title="Delete thread"
                        className="opacity-0 group-hover:opacity-100 p-1 text-[#88857C] hover:text-red-600 transition-opacity"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Bottom Model Switcher & Profile Footer */}
        <div className="p-3 border-t border-[#E2E0D8] bg-[#F5F3ED] space-y-2 relative">
          {/* Model Switcher Button */}
          <div className="relative">
            <button
              onClick={() => setModelDropdownOpen(!modelDropdownOpen)}
              className="w-full p-2 rounded-lg border border-[#E2E0D8] bg-white hover:border-[#DA7756] flex items-center justify-between text-xs transition-colors"
            >
              <div className="flex items-center gap-2 min-w-0">
                <div className="h-4 w-4 rounded-full bg-[#DA7756] text-white flex items-center justify-center text-[9px] font-bold">
                  P
                </div>
                <div className="text-left truncate">
                  <div className="font-bold text-[#1F1F1E] truncate">{activeModel.name}</div>
                  <div className="text-[10px] text-[#66645E] font-normal truncate">{activeModel.badge}</div>
                </div>
              </div>
              <ChevronDown className={cn('h-3.5 w-3.5 text-[#66645E] transition-transform', modelDropdownOpen && 'rotate-180')} />
            </button>

            {/* Model Dropdown Menu */}
            {modelDropdownOpen && (
              <div className="absolute bottom-full left-0 right-0 mb-1.5 bg-white border border-[#E2E0D8] rounded-xl p-1.5 shadow-xl space-y-1 z-50">
                <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-[#66645E] font-bold">
                  Claude Model Tier
                </div>
                {MODEL_OPTIONS.map((m) => {
                  const isSelected = m.id === activeModelId;
                  return (
                    <button
                      key={m.id}
                      onClick={() => {
                        onSelectModel(m.id);
                        setModelDropdownOpen(false);
                      }}
                      className={cn(
                        'w-full text-left p-2 rounded-lg text-xs flex items-start justify-between gap-2 transition-colors border',
                        isSelected
                          ? 'bg-[#FAF9F5] border-[#DA7756] text-[#DA7756]'
                          : 'border-transparent hover:bg-[#F5F3ED] text-[#1F1F1E]'
                      )}
                    >
                      <div>
                        <div className="font-bold flex items-center gap-1.5">
                          {m.name}
                          <span className="text-[9.5px] font-mono px-1 bg-white border border-[#E2E0D8] rounded text-[#66645E]">
                            {m.tag}
                          </span>
                        </div>
                        <div className="text-[10.5px] text-[#66645E] font-normal mt-0.5 leading-tight">
                          {m.description}
                        </div>
                      </div>
                      {isSelected && <Check className="h-3.5 w-3.5 text-[#DA7756] shrink-0 mt-0.5" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* User Account Bar */}
          <div className="flex items-center justify-between pt-1 px-1 text-xs">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-[#1F1F1E] text-white flex items-center justify-center text-[10px] font-bold">
                P
              </div>
              <div className="font-bold text-[#1F1F1E]">Pro Plan</div>
            </div>

            <Link to="/settings" title="Settings" className="p-1 text-[#66645E] hover:text-[#1F1F1E]">
              <Settings className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};
