import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  Search,
  ChevronDown,
  Trash2,
  FolderGit2,
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
          'fixed lg:static inset-y-0 left-0 z-50 w-[270px] bg-[#FAFAFC] border-r border-[#E5E5E8] flex flex-col justify-between transition-transform duration-200 ease-in-out select-none font-sans text-[#0F0F11]',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Top Header */}
        <div className="p-3.5 space-y-3">
          {/* Logo & Sidebar Controls */}
          <div className="flex items-center justify-between px-1">
            <Link to="/" className="flex items-center gap-2" aria-label="Puku Home">
              <img src="/puku-mark.svg" alt="Puku Logo" className="h-6 w-auto object-contain" />
              <span className="text-[18px] font-extrabold tracking-tight text-[#0F0F11] font-puku font-brand">
                Puku
              </span>
            </Link>

            <div className="flex items-center gap-1 text-[#4A4A52]">
              <button
                onClick={onCloseMobile}
                title="Collapse sidebar"
                className="p-1 hover:text-[#6E56CF] rounded hover:bg-[#F3F3F5] transition-colors"
              >
                <PanelLeft className="h-4 w-4" />
              </button>
              <button
                title="Search chats"
                className="p-1 hover:text-[#6E56CF] rounded hover:bg-[#F3F3F5] transition-colors"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Top Segmented Switcher */}
          <div className="p-1 bg-[#F3F3F5] rounded-[2px] border border-[#E5E5E8] flex items-center justify-between text-xs font-semibold">
            <button
              onClick={() => setTopTab('home')}
              className={cn(
                'flex-1 py-1.5 px-3 rounded-[2px] flex items-center justify-center gap-1.5 transition-all',
                topTab === 'home'
                  ? 'bg-white text-[#6E56CF] shadow-none font-bold'
                  : 'text-[#4A4A52] hover:text-[#0F0F11]'
              )}
            >
              <Home className="h-3.5 w-3.5" />
              <span>Home</span>
            </button>

            <button
              onClick={() => setTopTab('code')}
              className={cn(
                'flex-1 py-1.5 px-3 rounded-[2px] flex items-center justify-center gap-1.5 transition-all',
                topTab === 'code'
                  ? 'bg-white text-[#6E56CF] shadow-none font-bold'
                  : 'text-[#4A4A52] hover:text-[#0F0F11]'
              )}
            >
              <Code2 className="h-3.5 w-3.5" />
              <span>Code</span>
            </button>
          </div>

          {/* + New Chat Pill Button */}
          <button
            onClick={() => {
              onNewChat();
              onCloseMobile();
            }}
            className="w-full h-10 px-3.5 bg-[#0F0F11] hover:bg-[#6E56CF] text-white font-semibold text-xs rounded-[2px] transition-colors flex items-center gap-2 border border-[#0F0F11]"
          >
            <Plus className="h-4 w-4 text-white" />
            <span>New Chat</span>
          </button>
        </div>

        {/* Scrollable Middle Navigation */}
        <div className="flex-1 overflow-y-auto px-3 space-y-4 no-scrollbar text-xs font-medium">
          {/* Main Links */}
          <div className="space-y-1">
            <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-[2px] hover:bg-[#F3F3F5] cursor-pointer text-[#4A4A52] hover:text-[#6E56CF]">
              <FolderGit2 className="h-4 w-4 text-[#6E56CF]" />
              <span>Projects</span>
            </div>
            <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-[2px] hover:bg-[#F3F3F5] cursor-pointer text-[#4A4A52] hover:text-[#6E56CF]">
              <Boxes className="h-4 w-4 text-[#6E56CF]" />
              <span>Artifacts</span>
            </div>
            <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-[2px] hover:bg-[#F3F3F5] cursor-pointer text-[#4A4A52] hover:text-[#6E56CF]">
              <Clock className="h-4 w-4 text-[#6E56CF]" />
              <span>Scheduled</span>
            </div>
            <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-[2px] hover:bg-[#F3F3F5] cursor-pointer text-[#4A4A52] hover:text-[#6E56CF]">
              <Settings2 className="h-4 w-4 text-[#6E56CF]" />
              <span>Customize</span>
            </div>
          </div>

          {/* Workspaces Section */}
          <div className="pt-2 border-t border-[#E5E5E8] space-y-1">
            <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-[2px] hover:bg-[#F3F3F5] cursor-pointer text-[#4A4A52]">
              <Building2 className="h-4 w-4 text-[#6E56CF]" />
              <span>Betopia.ai</span>
            </div>
            <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-[2px] hover:bg-[#F3F3F5] cursor-pointer text-[#4A4A52]">
              <Building2 className="h-4 w-4 text-[#6E56CF]" />
              <span>Betopia</span>
            </div>
          </div>

          {/* Pinned Section */}
          <div className="space-y-1">
            <div className="px-2.5 text-[10.5px] uppercase tracking-wider text-[#4A4A52] font-semibold font-mono">
              Pinned
            </div>
            <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-[2px] hover:bg-[#F3F3F5] cursor-pointer text-[#4A4A52]">
              <Pin className="h-3.5 w-3.5 text-[#6E56CF]" />
              <span>Ask Betopiagroup</span>
            </div>
          </div>

          {/* Chats and tasks Section */}
          <div className="space-y-1 pt-1">
            <div className="flex items-center justify-between px-2.5 text-[11px] text-[#4A4A52] font-semibold font-mono uppercase tracking-wider">
              <span>Chats and tasks</span>
              <button title="Filter tasks" className="hover:text-[#6E56CF]">
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
                      'group flex items-center justify-between px-2.5 py-2 rounded-[2px] text-xs cursor-pointer transition-all border',
                      isActive
                        ? 'bg-[#F4F2FF] border-[#6E56CF]/30 text-[#6E56CF] font-bold shadow-none'
                        : 'border-transparent text-[#4A4A52] hover:text-[#0F0F11] hover:bg-[#F3F3F5]'
                    )}
                  >
                    <div className="flex items-center gap-2 min-w-0 truncate">
                      <span className={cn('h-1.5 w-1.5 rounded-full shrink-0', isActive ? 'bg-[#6E56CF]' : 'bg-[#A8A59C]')} />
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

        {/* Bottom Profile Footer */}
        <div className="p-3 border-t border-[#E5E5E8] bg-[#FAFAFC]">
          <div className="p-2 bg-white border border-[#E5E5E8] hover:border-[#6E56CF] rounded-[2px] flex items-center justify-between cursor-pointer transition-colors text-xs font-semibold">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="h-6 w-6 rounded-full bg-[#0F0F11] text-white font-bold text-[10px] flex items-center justify-center relative shrink-0">
                N
                <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-[#6E56CF] ring-1 ring-white" />
              </div>
              <div className="truncate">
                <span className="text-[#0F0F11] truncate">Nibir · Betopiagroup</span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-[#4A4A52]">
              <ChevronDown className="h-3.5 w-3.5" />
              <Download className="h-3.5 w-3.5 ml-1" />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
