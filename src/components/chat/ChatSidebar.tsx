import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  MessageSquare,
  Search,
  ChevronDown,
  Trash2,
  Pin,
  Sparkles,
  Zap,
  Shield,
  Layers,
  Settings,
  X,
  Bot,
  User,
  Check,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Thread, ModelId, MODEL_OPTIONS, ModelOption } from '@/lib/chatStore';

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

  const categories = ['Today', 'Yesterday', 'Previous 7 Days'] as const;

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      <aside
        className={cn(
          'fixed lg:static inset-y-0 left-0 z-50 w-[280px] bg-[#FAFAFC] border-r border-[#E5E5E8] flex flex-col justify-between transition-transform duration-200 ease-in-out select-none',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Top Header & Brand */}
        <div className="p-4 space-y-3.5">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5" aria-label="Back to Puku landing">
              <img src="/puku-mark.svg" alt="Puku Logo" className="h-6 w-auto object-contain" />
              <span className="text-[17px] font-extrabold text-[#0F0F11] font-display">Puku Chat</span>
            </Link>

            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1 text-[#4A4A52] hover:text-[#0F0F11] rounded"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* New Chat Primary Action Button */}
          <button
            onClick={() => {
              onNewChat();
              onCloseMobile();
            }}
            className="w-full h-11 px-4 bg-[#0F0F11] hover:bg-[#6E56CF] text-white font-semibold text-sm rounded-[2px] transition-colors flex items-center justify-between shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6E56CF]"
          >
            <div className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>New chat</span>
            </div>
            <span className="text-[10.5px] font-mono opacity-70 bg-white/20 px-1.5 py-0.5 rounded">⌘N</span>
          </button>

          {/* Search Threads Box */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-[#4A4A52]" />
            <input
              type="text"
              placeholder="Search chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 pl-8 pr-3 bg-white border border-[#E5E5E8] rounded-[2px] text-xs text-[#0F0F11] placeholder-[#4A4A52] focus:outline-none focus:border-[#6E56CF]"
            />
          </div>
        </div>

        {/* Middle Scrollable Thread History */}
        <div className="flex-1 overflow-y-auto px-3 space-y-4 no-scrollbar">
          {categories.map((cat) => {
            const group = filteredThreads.filter((t) => t.category === cat);
            if (group.length === 0) return null;
            return (
              <div key={cat} className="space-y-1">
                <div className="px-2 text-[10.5px] font-mono uppercase tracking-wider text-[#4A4A52] font-bold">
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
                        'group flex items-center justify-between p-2.5 rounded-[2px] text-xs font-semibold cursor-pointer transition-all border',
                        isActive
                          ? 'bg-white border-[#E5E5E8] text-[#6E56CF] shadow-xs'
                          : 'border-transparent text-[#1A1A1E] hover:bg-white hover:border-[#E5E5E8]'
                      )}
                    >
                      <div className="flex items-center gap-2 min-w-0 truncate">
                        <MessageSquare className={cn('h-3.5 w-3.5 shrink-0', isActive ? 'text-[#6E56CF]' : 'text-[#4A4A52]')} />
                        <span className="truncate">{t.title}</span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteThread(t.id);
                        }}
                        title="Delete chat"
                        className="opacity-0 group-hover:opacity-100 p-1 text-[#4A4A52] hover:text-red-600 transition-opacity"
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

        {/* Bottom Model Selector & User Footer */}
        <div className="p-3 border-t border-[#E5E5E8] bg-white space-y-2 relative">
          {/* Model Switcher Button */}
          <div className="relative">
            <button
              onClick={() => setModelDropdownOpen(!modelDropdownOpen)}
              className="w-full p-2.5 rounded-[2px] border border-[#E5E5E8] hover:border-[#6E56CF] bg-[#FAFAFC] flex items-center justify-between text-xs transition-colors"
            >
              <div className="flex items-center gap-2 min-w-0">
                <Bot className="h-4 w-4 text-[#6E56CF] shrink-0" />
                <div className="text-left truncate">
                  <div className="font-bold text-[#0F0F11] truncate">{activeModel.name}</div>
                  <div className="text-[10px] text-[#4A4A52] font-normal truncate">{activeModel.badge}</div>
                </div>
              </div>
              <ChevronDown className={cn('h-3.5 w-3.5 text-[#4A4A52] transition-transform', modelDropdownOpen && 'rotate-180')} />
            </button>

            {/* Model Dropdown Menu */}
            {modelDropdownOpen && (
              <div className="absolute bottom-full left-0 right-0 mb-1.5 bg-white border border-[#E5E5E8] rounded-[2px] p-1.5 shadow-lg space-y-1 z-50">
                <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-[#4A4A52] font-bold">
                  Select Puku Model
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
                        'w-full text-left p-2 rounded-[2px] text-xs flex items-start justify-between gap-2 transition-colors border',
                        isSelected
                          ? 'bg-[#F4F2FF] border-[#E4DDFE] text-[#6E56CF]'
                          : 'border-transparent hover:bg-[#FAFAFC] text-[#0F0F11]'
                      )}
                    >
                      <div>
                        <div className="font-bold flex items-center gap-1.5">
                          {m.name}
                          <span className="text-[9.5px] font-mono px-1 bg-white border border-[#E5E5E8] rounded text-[#4A4A52]">
                            {m.tag}
                          </span>
                        </div>
                        <div className="text-[10.5px] text-[#4A4A52] font-normal mt-0.5 leading-tight">
                          {m.description}
                        </div>
                      </div>
                      {isSelected && <Check className="h-3.5 w-3.5 text-[#6E56CF] shrink-0 mt-0.5" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* User Account Bar */}
          <div className="flex items-center justify-between pt-1 px-1">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-[#0F0F11] text-white flex items-center justify-center text-[10px] font-bold">
                P
              </div>
              <div className="text-xs font-bold text-[#0F0F11]">Developer Pro</div>
            </div>

            <Link to="/settings" title="Settings" className="p-1 text-[#4A4A52] hover:text-[#6E56CF]">
              <Settings className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};
