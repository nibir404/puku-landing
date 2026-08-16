import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { SEO } from '@/components/layout/SEO';
import {
  MessageSquare,
  CheckSquare,
  Code2,
  Home,
  FolderGit2,
  FileText,
  Clock,
  Settings2,
  Globe,
  Search,
  PanelLeft,
  Bell,
  X,
  ChevronDown,
  Sparkles,
  Plus,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Thread,
  CoWorkTask,
  CodeSession,
  ProjectItem,
  ScheduledTask,
  SharedContextChip,
  ModelId,
  WorkspaceMode,
  WorkspaceModule,
  INITIAL_CONTEXT_CHIPS,
  INITIAL_PROJECTS,
  INITIAL_COWORK_TASKS,
  INITIAL_CODE_SESSIONS,
  INITIAL_SCHEDULED,
  loadStoredThreads,
  saveStoredThreads,
  generateAssistantResponse,
  Artifact,
} from '@/lib/chatStore';

import { ChatSidebar } from '@/components/chat/ChatSidebar';
import { ChatWelcome } from '@/components/chat/ChatWelcome';
import { ChatMessageFeed } from '@/components/chat/ChatMessageFeed';
import { ArtifactsPanel } from '@/components/chat/ArtifactsPanel';

import { HomeWorkspace } from '@/components/home/HomeWorkspace';
import { CoWorkWorkspace } from '@/components/cowork/CoWorkWorkspace';
import { CodeWorkspace } from '@/components/code/CodeWorkspace';
import { ProjectsWorkspace } from '@/components/projects/ProjectsWorkspace';
import { FilesWorkspace } from '@/components/files/FilesWorkspace';
import { ScheduledWorkspace } from '@/components/scheduled/ScheduledWorkspace';
import { BrowserSidePanel } from '@/components/browser/BrowserSidePanel';
import { GlobalSearchModal } from '@/components/search/GlobalSearchModal';

export default function Chat() {
  const location = useLocation();

  // State Management
  const [activeModule, setActiveModule] = useState<WorkspaceModule>('chat');
  const [activeMode, setActiveMode] = useState<WorkspaceMode>('chat');
  const [threads, setThreads] = useState<Thread[]>(() => loadStoredThreads());
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [activeModelId, setActiveModelId] = useState<ModelId>('sonnet-5-high');
  const [activeArtifact, setActiveArtifact] = useState<Artifact | null>(null);

  const [coworkTasks, setCoworkTasks] = useState<CoWorkTask[]>(INITIAL_COWORK_TASKS);
  const [activeTaskId, setActiveTaskId] = useState<string | null>('task-1');

  const [codeSessions, setCodeSessions] = useState<CodeSession[]>(INITIAL_CODE_SESSIONS);
  const [activeCodeSessionId, setActiveCodeSessionId] = useState<string | null>('code-1');

  const [projects] = useState<ProjectItem[]>(INITIAL_PROJECTS);
  const [scheduledTasks] = useState<ScheduledTask[]>(INITIAL_SCHEDULED);
  const [contextChips, setContextChips] = useState<SharedContextChip[]>(INITIAL_CONTEXT_CHIPS);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);
  const [isBrowserPanelOpen, setIsBrowserPanelOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Save threads to local storage
  useEffect(() => {
    saveStoredThreads(threads);
  }, [threads]);

  // Handle location.state initialPrompt from landing page
  useEffect(() => {
    const state = location.state as { initialPrompt?: string; modelId?: ModelId } | null;
    if (state?.initialPrompt) {
      if (state.modelId) setActiveModelId(state.modelId);
      setActiveModule('chat');
      setActiveMode('chat');
      handleSendMessage(state.initialPrompt, 'Chat');
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const activeThread = threads.find((t) => t.id === activeThreadId) || null;

  const handleNewChat = () => {
    setActiveThreadId(null);
    setActiveArtifact(null);
    setActiveModule('chat');
    setActiveMode('chat');
  };

  const handleSendMessage = (userText: string, mode: 'Chat' | 'Cowork' = 'Chat') => {
    if (!userText.trim()) return;

    const userMessage = {
      id: `msg-${Date.now()}`,
      role: 'user' as const,
      content: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    let targetThreadId = activeThreadId;

    if (!targetThreadId || !threads.some((t) => t.id === targetThreadId)) {
      const newThreadId = `thread-${Date.now()}`;
      const newThread: Thread = {
        id: newThreadId,
        title: userText.length > 30 ? `${userText.slice(0, 30)}...` : userText,
        updatedAt: 'Just now',
        category: 'Chats and tasks',
        modelId: activeModelId,
        activeMode: mode,
        messages: [userMessage],
      };

      setThreads((prev) => [newThread, ...prev]);
      setActiveThreadId(newThreadId);
      targetThreadId = newThreadId;
    } else {
      setThreads((prev) =>
        prev.map((t) =>
          t.id === targetThreadId
            ? { ...t, updatedAt: 'Just now', messages: [...t.messages, userMessage] }
            : t
        )
      );
    }

    setIsGenerating(true);

    setTimeout(() => {
      const assistantData = generateAssistantResponse(userText, activeModelId);
      const assistantMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant' as const,
        content: assistantData.content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: activeModelId,
        artifact: assistantData.artifact,
        sources: assistantData.sources,
      };

      setThreads((prev) =>
        prev.map((t) =>
          t.id === targetThreadId
            ? { ...t, messages: [...t.messages, assistantMessage] }
            : t
        )
      );

      setIsGenerating(false);

      if (assistantData.artifact) {
        setActiveArtifact(assistantData.artifact);
        setIsRightDrawerOpen(true);
      }
    }, 800);
  };

  const removeContextChip = (id: string) => {
    setContextChips((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <>
      <SEO title="Puku Agentic Work OS" description="Unified AI-native browser/desktop workspace combining Chat, Co-work, and Code." />

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        threads={threads}
        tasks={coworkTasks}
        codeSessions={codeSessions}
        projects={projects}
        onSelectThread={(id) => {
          setActiveThreadId(id);
          setActiveModule('chat');
        }}
        onSelectTask={(id) => {
          setActiveTaskId(id);
          setActiveModule('cowork');
        }}
        onSelectCodeSession={(id) => {
          setActiveCodeSessionId(id);
          setActiveModule('code');
        }}
        onSelectProject={() => setActiveModule('projects')}
      />

      <div className="h-screen w-screen overflow-hidden flex flex-col bg-[#f5f5f7] font-sans text-[#0F0F11] select-none">
        {/* GLOBAL APPLICATION HEADER BAR */}
        <header className="h-12 px-4 bg-white border-b border-[#E5E5E8] flex items-center justify-between shrink-0 select-none z-30">
          {/* Left: Brand Logo & Navigation Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-1.5 text-[#0F0F11] hover:bg-[#F3F3F5] rounded-[2px]"
            >
              <PanelLeft className="h-4 w-4" />
            </button>

            <Link to="/" className="flex items-center gap-2" aria-label="Puku Home">
              <img src="/puku-mark.svg" alt="Puku Logo" className="h-6 w-auto object-contain" />
              <span className="text-[18px] font-extrabold tracking-tight text-[#0F0F11] font-puku font-brand">
                Puku OS
              </span>
            </Link>

            {/* Mode Selector Tabs: [ CHAT | CO-WORK | CODE ] */}
            <div className="hidden sm:flex items-center gap-1 p-0.5 bg-[#E5E5E8]/60 rounded-[2px] ml-4 text-xs font-semibold">
              <button
                onClick={() => {
                  setActiveModule('chat');
                  setActiveMode('chat');
                }}
                className={cn(
                  'px-3 py-1 rounded-[2px] flex items-center gap-1.5 transition-all',
                  activeModule === 'chat' ? 'bg-white text-[#6E56CF] font-bold shadow-none' : 'text-[#4A4A52] hover:text-[#0F0F11]'
                )}
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span>CHAT</span>
              </button>

              <button
                onClick={() => {
                  setActiveModule('cowork');
                  setActiveMode('cowork');
                }}
                className={cn(
                  'px-3 py-1 rounded-[2px] flex items-center gap-1.5 transition-all',
                  activeModule === 'cowork' ? 'bg-white text-[#6E56CF] font-bold shadow-none' : 'text-[#4A4A52] hover:text-[#0F0F11]'
                )}
              >
                <CheckSquare className="h-3.5 w-3.5" />
                <span>CO-WORK</span>
              </button>

              <button
                onClick={() => {
                  setActiveModule('code');
                  setActiveMode('code');
                }}
                className={cn(
                  'px-3 py-1 rounded-[2px] flex items-center gap-1.5 transition-all',
                  activeModule === 'code' ? 'bg-white text-[#6E56CF] font-bold shadow-none' : 'text-[#4A4A52] hover:text-[#0F0F11]'
                )}
              >
                <Code2 className="h-3.5 w-3.5" />
                <span>CODE</span>
              </button>
            </div>
          </div>

          {/* Center: Shared Context Chips */}
          <div className="hidden md:flex items-center gap-1.5 overflow-x-auto no-scrollbar max-w-md text-[11px] font-mono">
            {contextChips.map((chip) => (
              <div
                key={chip.id}
                className="px-2 py-0.5 bg-[#F4F2FF] border border-[#6E56CF]/30 text-[#6E56CF] rounded-[2px] flex items-center gap-1 shrink-0"
              >
                <span>{chip.label}</span>
                <button onClick={() => removeContextChip(chip.id)} className="hover:text-red-600">
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>

          {/* Right: Search ⌘K, Browser Side Panel, Notifications, User */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="px-2.5 py-1 bg-[#F3F3F5] hover:bg-[#E5E5E8] text-[#4A4A52] hover:text-[#0F0F11] border border-[#E5E5E8] rounded-[2px] text-xs font-mono flex items-center gap-2"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Search (⌘K)</span>
            </button>

            <button
              onClick={() => setIsBrowserPanelOpen(!isBrowserPanelOpen)}
              title="Toggle Browser Agent Panel"
              className={cn(
                'p-1.5 rounded-[2px] border transition-colors',
                isBrowserPanelOpen
                  ? 'bg-[#F4F2FF] border-[#6E56CF]/40 text-[#6E56CF]'
                  : 'bg-white border-[#E5E5E8] text-[#4A4A52] hover:text-[#0F0F11]'
              )}
            >
              <Globe className="h-4 w-4" />
            </button>

            <div className="h-7 w-7 rounded-[2px] bg-[#0F0F11] text-white font-bold text-xs flex items-center justify-center">
              N
            </div>
          </div>
        </header>

        {/* MAIN BODY AREA WITH PERSISTENT SIDEBAR */}
        <div className="flex-1 flex min-h-0 overflow-hidden relative">
          {/* PERSISTENT SIDEBAR MODULE NAVIGATION */}
          <ChatSidebar
            threads={threads}
            activeThreadId={activeThreadId}
            activeModelId={activeModelId}
            onSelectThread={(id) => {
              setActiveThreadId(id);
              setActiveModule('chat');
            }}
            onNewChat={handleNewChat}
            onDeleteThread={(id) => setThreads((prev) => prev.filter((t) => t.id !== id))}
            isOpen={isSidebarOpen}
            onCloseMobile={() => setIsSidebarOpen(false)}
          />

          {/* DYNAMIC MODULE CONTAINER VIEW */}
          <div className="flex-1 flex flex-col min-w-0 h-full relative overflow-hidden bg-[#f5f5f7]">
            {/* Module Switcher Routing */}
            {activeModule === 'home' && (
              <HomeWorkspace
                threads={threads}
                tasks={coworkTasks}
                codeSessions={codeSessions}
                projects={projects}
                onNavigateModule={(mod) => {
                  setActiveModule(mod as WorkspaceModule);
                  if (mod === 'chat' || mod === 'cowork' || mod === 'code') {
                    setActiveMode(mod as WorkspaceMode);
                  }
                }}
                onSelectThread={(id) => {
                  setActiveThreadId(id);
                  setActiveModule('chat');
                }}
                onSelectTask={(id) => {
                  setActiveTaskId(id);
                  setActiveModule('cowork');
                }}
                onSelectCodeSession={(id) => {
                  setActiveCodeSessionId(id);
                  setActiveModule('code');
                }}
              />
            )}

            {activeModule === 'chat' && (
              !activeThread || activeThread.messages.length === 0 ? (
                <ChatWelcome
                  activeModelId={activeModelId}
                  onSelectModel={setActiveModelId}
                  onSendPrompt={handleSendMessage}
                />
              ) : (
                <ChatMessageFeed
                  thread={activeThread}
                  isGenerating={isGenerating}
                  onOpenArtifact={(art) => {
                    setActiveArtifact(art);
                    setIsRightDrawerOpen(true);
                  }}
                  onSendMessage={(txt) => handleSendMessage(txt, activeThread.activeMode || 'Chat')}
                  onToggleRightDrawer={() => setIsRightDrawerOpen(!isRightDrawerOpen)}
                  onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                />
              )
            )}

            {activeModule === 'cowork' && (
              <CoWorkWorkspace
                tasks={coworkTasks}
                activeTaskId={activeTaskId}
                onSelectTask={setActiveTaskId}
                onNewTask={() => setActiveTaskId(null)}
                onOpenCode={() => {
                  setActiveModule('code');
                  setActiveMode('code');
                }}
              />
            )}

            {activeModule === 'code' && (
              <CodeWorkspace
                sessions={codeSessions}
                activeSessionId={activeCodeSessionId}
                onSelectSession={setActiveCodeSessionId}
                onNewSession={() => setActiveCodeSessionId(null)}
              />
            )}

            {activeModule === 'projects' && (
              <ProjectsWorkspace
                projects={projects}
                onNavigateModule={(mod) => {
                  setActiveModule(mod as WorkspaceModule);
                  if (mod === 'chat' || mod === 'cowork' || mod === 'code') {
                    setActiveMode(mod as WorkspaceMode);
                  }
                }}
              />
            )}

            {activeModule === 'files' && <FilesWorkspace />}

            {activeModule === 'scheduled' && (
              <ScheduledWorkspace scheduledTasks={scheduledTasks} />
            )}
          </div>

          {/* RIGHT DRAWERS */}
          {isRightDrawerOpen && (
            <ArtifactsPanel
              artifact={activeArtifact}
              onClose={() => setIsRightDrawerOpen(false)}
            />
          )}

          {/* BROWSER AI SIDE PANEL */}
          <BrowserSidePanel
            isOpen={isBrowserPanelOpen}
            onClose={() => setIsBrowserPanelOpen(false)}
            onNavigateModule={(mod) => {
              setActiveModule(mod as WorkspaceModule);
              if (mod === 'chat' || mod === 'cowork' || mod === 'code') {
                setActiveMode(mod as WorkspaceMode);
              }
            }}
          />
        </div>
      </div>
    </>
  );
}
