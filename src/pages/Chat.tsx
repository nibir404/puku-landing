import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SEO } from '@/components/layout/SEO';
import { ChatSidebar } from '@/components/chat/ChatSidebar';
import { ChatWelcome } from '@/components/chat/ChatWelcome';
import { ChatMessageFeed } from '@/components/chat/ChatMessageFeed';
import { ArtifactsPanel } from '@/components/chat/ArtifactsPanel';
import {
  Thread,
  Message,
  Artifact,
  ModelId,
  loadStoredThreads,
  saveStoredThreads,
  generateAssistantResponse,
} from '@/lib/chatStore';

export default function Chat() {
  const location = useLocation();
  const [threads, setThreads] = useState<Thread[]>(() => loadStoredThreads());
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [activeModelId, setActiveModelId] = useState<ModelId>('sonnet-5-high');
  const [activeArtifact, setActiveArtifact] = useState<Artifact | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Save to local storage whenever threads change
  useEffect(() => {
    saveStoredThreads(threads);
  }, [threads]);

  // Check if an initial prompt was passed from landing page
  useEffect(() => {
    const state = location.state as { initialPrompt?: string; modelId?: ModelId } | null;
    if (state?.initialPrompt) {
      if (state.modelId) setActiveModelId(state.modelId);
      handleSendMessage(state.initialPrompt, 'Chat');
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const activeThread = threads.find((t) => t.id === activeThreadId) || null;

  const handleNewChat = () => {
    setActiveThreadId(null);
    setActiveArtifact(null);
  };

  const handleSelectThread = (threadId: string) => {
    setActiveThreadId(threadId);
    const selected = threads.find((t) => t.id === threadId);
    if (selected && selected.messages.some((m) => m.artifact)) {
      const art = selected.messages.find((m) => m.artifact)?.artifact;
      if (art) setActiveArtifact(art);
    }
  };

  const handleDeleteThread = (threadId: string) => {
    setThreads((prev) => prev.filter((t) => t.id !== threadId));
    if (activeThreadId === threadId) {
      setActiveThreadId(null);
      setActiveArtifact(null);
    }
  };

  const handleSendMessage = (userText: string, mode: 'Chat' | 'Cowork' = 'Chat') => {
    if (!userText.trim()) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
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
      const assistantMessage: Message = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
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

  return (
    <>
      <SEO title="Puku Web Chat Workspace" description="Interactive AI engineering web workspace matching Claude Light Mode UI." />

      <div className="h-screen w-screen overflow-hidden flex bg-[#f5f5f7] font-sans text-[#0F0F11] select-none">
        {/* Left Navigation Drawer */}
        <ChatSidebar
          threads={threads}
          activeThreadId={activeThreadId}
          activeModelId={activeModelId}
          onSelectThread={handleSelectThread}
          onNewChat={handleNewChat}
          onDeleteThread={handleDeleteThread}
          isOpen={isSidebarOpen}
          onCloseMobile={() => setIsSidebarOpen(false)}
        />

        {/* Main Workspace Area */}
        <div className="flex-1 flex flex-col min-w-0 h-full relative bg-[#f5f5f7]">
          {/* Top Mobile Bar */}
          <div className="lg:hidden h-12 px-4 border-b border-[#E5E5E8] flex items-center justify-between bg-[#FAFAFC] shrink-0">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-1.5 text-[#0F0F11] hover:bg-[#F3F3F5] rounded-[2px] border border-[#E5E5E8] bg-white flex items-center gap-1.5 text-xs font-semibold"
            >
              <span>Menu</span>
            </button>

            <span className="font-puku font-brand text-sm font-bold">Puku</span>
          </div>

          {/* Main Content Area */}
          {!activeThread || activeThread.messages.length === 0 ? (
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
          )}
        </div>

        {/* Right Task Drawer matching Screenshot 2 */}
        {isRightDrawerOpen && (
          <ArtifactsPanel
            artifact={activeArtifact}
            onClose={() => setIsRightDrawerOpen(false)}
          />
        )}
      </div>
    </>
  );
}
