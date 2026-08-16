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
  Star,
  Edit2,
  Check,
  X,
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
  onToggleStar?: (threadId: string) => void;
  onRenameThread?: (threadId: string, newTitle: string) => void;
  isOpen: boolean;
  onCloseMobile: () => void;
  width?: number;
  onStartDragResize?: () => void;
}

export const ChatSidebar = ({
  threads,
  activeThreadId,
  onSelectThread,
  onNewChat,
  onDeleteThread,
  onToggleStar,
  onRenameThread,
  isOpen,
  onCloseMobile,
  width = 270,
  onStartDragResize,
}: ChatSidebarProps) => {
  const [topTab, setTopTab] = useState<'home' | 'code'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [editingThreadId, setEditingThreadId] = useState<string | null>(null);
  const [editTitleInput, setEditTitleInput] = useState('');

  const filteredThreads = threads.filter((t) =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const starredThreads = threads.filter((t) => t.starred);

  const handleStartRename = (t: Thread) => {
    setEditingThreadId(t.id);
    setEditTitleInput(t.title);
  };

  const handleSaveRename = (threadId: string) => {
    if (editTitleInput.trim() && onRenameThread) {
      onRenameThread(threadId, editTitleInput.trim());
    }
    setEditingThreadId(null);
  };

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
        style={{ width: `${width}px` }}
        className={cn(
          'fixed lg:static inset-y-0 left-0 z-50 bg-[#f5f5f7] border-r border-[#E5E5E8] flex flex-col justify-between transition-transform duration-200 ease-in-out select-none font-sans text-[#0F0F11] relative group/sidebar',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Right Drag Resize Handle Bar */}
        <div
          onMouseDown={onStartDragResize}
          title="Drag to resize sidebar"
          className="hidden lg:block absolute top-0 right-0 w-1.5 h-full cursor-col-resize hover:bg-[#6E56CF]/40 active:bg-[#6E56CF] transition-colors z-50"
        />

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
                className="p-1 hover:text-[#6E56CF] rounded-[2px] hover:bg-white transition-colors"
              >
                <PanelLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setIsSearching(!isSearching)}
                title="Search chats"
                className={cn(
                  'p-1 rounded-[2px] transition-colors',
                  isSearching ? 'text-[#6E56CF] bg-white font-bold' : 'hover:text-[#6E56CF] hover:bg-white'
                )}
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Search Input Bar (when active) */}
          {isSearching && (
            <div className="relative">
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter chats..."
                className="w-full pl-8 pr-3 py-1.5 bg-white border border-[#E5E5E8] focus:border-[#6E56CF] rounded-[2px] text-xs text-[#0F0F11] placeholder-[#88857C] focus:outline-none"
              />
              <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-[#88857C]" />
            </div>
          )}

          {/* Top Segmented Switcher */}
          <div className="p-1 bg-[#E5E5E8]/60 rounded-[2px] border border-[#E5E5E8] flex items-center justify-between text-xs font-semibold">
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

          {/* + New Chat Button */}
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
            <div
              onClick={() => alert('Projects Directory Indexed (2 Active Projects)')}
              className="flex items-center gap-2.5 px-2.5 py-2 rounded-[2px] hover:bg-white cursor-pointer text-[#4A4A52] hover:text-[#6E56CF]"
            >
              <FolderGit2 className="h-4 w-4 text-[#6E56CF]" />
              <span>Projects</span>
            </div>
            <div
              onClick={() => alert('Artifacts Library: 14 Code & Markdown artifacts')}
              className="flex items-center gap-2.5 px-2.5 py-2 rounded-[2px] hover:bg-white cursor-pointer text-[#4A4A52] hover:text-[#6E56CF]"
            >
              <Boxes className="h-4 w-4 text-[#6E56CF]" />
              <span>Artifacts</span>
            </div>
            <div
              onClick={() => alert('Scheduled Tasks: 2 active cron tasks')}
              className="flex items-center gap-2.5 px-2.5 py-2 rounded-[2px] hover:bg-white cursor-pointer text-[#4A4A52] hover:text-[#6E56CF]"
            >
              <Clock className="h-4 w-4 text-[#6E56CF]" />
              <span>Scheduled</span>
            </div>
            <div
              onClick={() => alert('Customize Rules & Skills Active')}
              className="flex items-center gap-2.5 px-2.5 py-2 rounded-[2px] hover:bg-white cursor-pointer text-[#4A4A52] hover:text-[#6E56CF]"
            >
              <Settings2 className="h-4 w-4 text-[#6E56CF]" />
              <span>Customize</span>
            </div>
          </div>

          {/* Workspaces Section */}
          <div className="pt-2 border-t border-[#E5E5E8] space-y-1">
            <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-[2px] hover:bg-white cursor-pointer text-[#4A4A52]">
              <Building2 className="h-4 w-4 text-[#6E56CF]" />
              <span>Betopia.ai</span>
            </div>
            <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-[2px] hover:bg-white cursor-pointer text-[#4A4A52]">
              <Building2 className="h-4 w-4 text-[#6E56CF]" />
              <span>Betopia</span>
            </div>
          </div>

          {/* Starred / Pinned Section */}
          {starredThreads.length > 0 && (
            <div className="space-y-1">
              <div className="px-2.5 text-[10.5px] uppercase tracking-wider text-[#4A4A52] font-semibold font-mono flex items-center gap-1">
                <Star className="h-3 w-3 text-[#6E56CF] fill-[#6E56CF]" />
                <span>Starred</span>
              </div>
              {starredThreads.map((t) => (
                <div
                  key={t.id}
                  onClick={() => {
                    onSelectThread(t.id);
                    onCloseMobile();
                  }}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-[2px] hover:bg-white cursor-pointer text-[#4A4A52] hover:text-[#6E56CF] truncate"
                >
                  <Pin className="h-3 w-3 text-[#6E56CF] shrink-0" />
                  <span className="truncate">{t.title}</span>
                </div>
              ))}
            </div>
          )}

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
                const isEditing = editingThreadId === t.id;

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
                        : 'border-transparent text-[#4A4A52] hover:text-[#0F0F11] hover:bg-white'
                    )}
                  >
                    <div className="flex items-center gap-2 min-w-0 flex-1 truncate">
                      <span className={cn('h-1.5 w-1.5 rounded-full shrink-0', isActive ? 'bg-[#6E56CF]' : 'bg-[#A8A59C]')} />
                      
                      {isEditing ? (
                        <div className="flex items-center gap-1 flex-1" onClick={(e) => e.stopPropagation()}>
                          <input
                            autoFocus
                            type="text"
                            value={editTitleInput}
                            onChange={(e) => setEditTitleInput(e.target.value)}
                            className="w-full px-1 py-0.5 bg-white border border-[#6E56CF] text-xs text-[#0F0F11] focus:outline-none rounded-[2px]"
                          />
                          <button
                            onClick={() => handleSaveRename(t.id)}
                            className="p-1 text-emerald-600 hover:text-emerald-700"
                          >
                            <Check className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ) : (
                        <span className="truncate">{t.title}</span>
                      )}
                    </div>

                    {!isEditing && (
                      <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 shrink-0 ml-1">
                        {onToggleStar && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleStar(t.id);
                            }}
                            title="Star thread"
                            className="p-1 text-[#88857C] hover:text-[#6E56CF]"
                          >
                            <Star className={cn('h-3.5 w-3.5', t.starred && 'fill-[#6E56CF] text-[#6E56CF]')} />
                          </button>
                        )}

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStartRename(t);
                          }}
                          title="Rename thread"
                          className="p-1 text-[#88857C] hover:text-[#6E56CF]"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteThread(t.id);
                          }}
                          title="Delete thread"
                          className="p-1 text-[#88857C] hover:text-red-600 transition-opacity"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Profile Footer */}
        <div className="p-3 border-t border-[#E5E5E8] bg-[#f5f5f7]">
          <div className="p-2 bg-white border border-[#E5E5E8] hover:border-[#6E56CF] rounded-[2px] flex items-center justify-between cursor-pointer transition-colors text-xs font-semibold">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="h-6 w-6 rounded-[2px] bg-[#0F0F11] text-white font-bold text-[10px] flex items-center justify-center relative shrink-0">
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
