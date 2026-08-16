import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  Search,
  ChevronDown,
  Trash2,
  X,
  FolderGit2,
  SlidersHorizontal,
  Home,
  Code2,
  Boxes,
  Clock,
  Settings2,
  Building2,
  Pin,
  Download,
  PanelLeft,
  Filter,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Thread, ModelId } from '@/lib/chatStore';

interface ChatSidebarProps {
  threads: Thread[];
  activeThreadId: string | null;
  activeModelId: ModelId;
  onSelectThread: (threadId: string) => void;
  onNewChat: () => void;
  onDeleteThread: (threadId: string) => void;
  isOpen: boolean;
  onCloseMobile: () => void;
}

export const ChatSidebar = ({
  threads,
  activeThreadId,
  onSelectThread,
  onNewChat,
  onDeleteThread,
  isOpen,
  onCloseMobile,
}: ChatSidebarProps) => {
  const [topTab, setTopTab] = useState<'home' | 'code'>('home');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredThreads = threads.filter((t) =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/30 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      <aside
        className={cn(
          'fixed lg:static inset-y-0 left-0 z-50 w-[270px] bg-[#FAF9F5] border-r border-[#E2E0D8] flex flex-col justify-between transition-transform duration-200 ease-in-out select-none font-sans text-[#1F1F1E]',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Top Header */}
        <div className="p-3.5 space-y-3">
          {/* Logo & Sidebar Controls */}
          <div className="flex items-center justify-between px-1">
            <Link to="/" className="flex items-center gap-2" aria-label="Puku Home">
              <span className="font-puku font-brand text-xl font-bold tracking-tight text-[#1F1F1E]">Puku</span>
            </Link>

            <div className="flex items-center gap-1.5 text-[#66645E]">
              <button
                onClick={onCloseMobile}
                title="Collapse sidebar"
                className="p-1 hover:text-[#1F1F1E] rounded hover:bg-[#F2F0E8] transition-colors"
              >
                <PanelLeft className="h-4 w-4" />
              </button>
              <button
                title="Search chats"
                className="p-1 hover:text-[#1F1F1E] rounded hover:bg-[#F2F0E8] transition-colors"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Top Segmented Switcher matching Screenshot 1: [ 🏠 Home ]  [ </ > Code ] */}
          <div className="p-1 bg-[#F0EEE6] rounded-xl flex items-center justify-between text-xs font-semibold">
            <button
              onClick={() => setTopTab('home')}
              className={cn(
                'flex-1 py-1.5 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all',
                topTab === 'home'
                  ? 'bg-white text-[#1F1F1E] shadow-xs font-bold'
                  : 'text-[#66645E] hover:text-[#1F1F1E]'
              )}
            >
              <Home className="h-3.5 w-3.5" />
              <span>Home</span>
            </button>

            <button
              onClick={() => setTopTab('code')}
              className={cn(
                'flex-1 py-1.5 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all',
                topTab === 'code'
                  ? 'bg-white text-[#1F1F1E] shadow-xs font-bold'
                  : 'text-[#66645E] hover:text-[#1F1F1E]'
              )}
            >
              <Code2 className="h-3.5 w-3.5" />
              <span>Code</span>
            </button>
          </div>

          {/* + New Chat Pill Card */}
          <button
            onClick={() => {
              onNewChat();
              onCloseMobile();
            }}
            className="w-full h-10 px-3.5 bg-[#F0EEE6] hover:bg-[#E6E3D8] text-[#1F1F1E] font-semibold text-xs rounded-xl transition-colors flex items-center gap-2 border border-[#E2E0D8]"
          >
            <Plus className="h-4 w-4 text-[#1F1F1E]" />
            <span>New</span>
          </button>
        </div>

        {/* Scrollable Middle Navigation */}
        <div className="flex-1 overflow-y-auto px-3 space-y-4 no-scrollbar text-xs font-medium">
          {/* Main Links */}
          <div className="space-y-1">
            <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-[#F0EEE6] cursor-pointer text-[#4A4843]">
              <FolderGit2 className="h-4 w-4 text-[#66645E]" />
              <span>Projects</span>
            </div>
            <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-[#F0EEE6] cursor-pointer text-[#4A4843]">
              <Boxes className="h-4 w-4 text-[#66645E]" />
              <span>Artifacts</span>
            </div>
            <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-[#F0EEE6] cursor-pointer text-[#4A4843]">
              <Clock className="h-4 w-4 text-[#66645E]" />
              <span>Scheduled</span>
            </div>
            <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-[#F0EEE6] cursor-pointer text-[#4A4843]">
              <Settings2 className="h-4 w-4 text-[#66645E]" />
              <span>Customize</span>
            </div>
          </div>

          {/* Workspaces Section */}
          <div className="pt-2 border-t border-[#E2E0D8] space-y-1">
            <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-[#F0EEE6] cursor-pointer text-[#4A4843]">
              <Building2 className="h-4 w-4 text-[#66645E]" />
              <span>Betopia.ai</span>
            </div>
            <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-[#F0EEE6] cursor-pointer text-[#4A4843]">
              <Building2 className="h-4 w-4 text-[#66645E]" />
              <span>Betopia</span>
            </div>
            <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-[#F0EEE6] cursor-pointer text-[#4A4843]">
              <Building2 className="h-4 w-4 text-[#66645E]" />
              <span>Akboria</span>
            </div>
          </div>

          {/* Pinned Section */}
          <div className="space-y-1">
            <div className="px-2.5 text-[10.5px] uppercase tracking-wider text-[#88857C] font-semibold">
              Pinned
            </div>
            <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-[#F0EEE6] cursor-pointer text-[#4A4843]">
              <Pin className="h-3.5 w-3.5 text-[#66645E]" />
              <span>Ask Betopiagroup</span>
            </div>
          </div>

          {/* Chats and tasks Section matching Screenshot 1 */}
          <div className="space-y-1 pt-1">
            <div className="flex items-center justify-between px-2.5 text-[11px] text-[#66645E] font-semibold">
              <span>Chats and tasks</span>
              <button title="Filter tasks" className="hover:text-[#1F1F1E]">
                <Filter className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="space-y-0.5">
              {filteredThreads.map((t) => {
                const isActive = activeThreadId === t.id;
                return (
                  <div
                    key={t.id}
                    onClick={() => {
                      onSelectThread(t.id);
                      onCloseMobile();
                    }}
                    className={cn(
                      'group flex items-center justify-between px-2.5 py-2 rounded-xl text-xs cursor-pointer transition-all',
                      isActive
                        ? 'bg-[#E8E5DB] text-[#1F1F1E] font-bold shadow-xs'
                        : 'text-[#66645E] hover:text-[#1F1F1E] hover:bg-[#F0EEE6]'
                    )}
                  >
                    <div className="flex items-center gap-2 min-w-0 truncate">
                      <span className={cn('h-1.5 w-1.5 rounded-full shrink-0', isActive ? 'bg-[#DA7756]' : 'bg-[#A8A59C]')} />
                      <span className="truncate">{t.title}</span>
                    </div>

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
          </div>
        </div>

        {/* Bottom Profile Footer matching Screenshot 1: Nibir · Betopiagroup */}
        <div className="p-3 border-t border-[#E2E0D8] bg-[#FAF9F5]">
          <div className="p-2 bg-[#F0EEE6] hover:bg-[#E6E3D8] rounded-xl flex items-center justify-between cursor-pointer transition-colors text-xs font-semibold">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="h-6 w-6 rounded-full bg-[#1F1F1E] text-white font-bold text-[10px] flex items-center justify-center relative shrink-0">
                N
                <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-blue-500 ring-1 ring-white" />
              </div>
              <div className="truncate">
                <span className="text-[#1F1F1E] truncate">Nibir · Betopiagroup</span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-[#66645E]">
              <ChevronDown className="h-3.5 w-3.5" />
              <Download className="h-3.5 w-3.5 ml-1" />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
