import { useState } from 'react';
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
  INITIAL_THREADS,
  MODEL_OPTIONS,
} from '@/lib/chatStore';
import { PanelLeft } from 'lucide-react';

export default function Chat() {
  const [threads, setThreads] = useState<Thread[]>(INITIAL_THREADS);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [activeModelId, setActiveModelId] = useState<ModelId>('sonnet-5-high');
  const [activeArtifact, setActiveArtifact] = useState<Artifact | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

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
    let currentThreadId = activeThreadId;
    let updatedThreads = [...threads];

    if (!currentThreadId) {
      const newThread: Thread = {
        id: `thread-${Date.now()}`,
        title: userText.slice(0, 32) + (userText.length > 32 ? '...' : ''),
        updatedAt: 'Just now',
        category: 'Chats and tasks',
        modelId: activeModelId,
        activeMode: mode,
        messages: [
          {
            id: `msg-${Date.now()}`,
            role: 'user',
            content: userText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ],
      };
      updatedThreads = [newThread, ...threads];
      currentThreadId = newThread.id;
      setThreads(updatedThreads);
      setActiveThreadId(currentThreadId);
    } else {
      updatedThreads = threads.map((t) => {
        if (t.id === currentThreadId) {
          return {
            ...t,
            messages: [
              ...t.messages,
              {
                id: `msg-${Date.now()}`,
                role: 'user',
                content: userText,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              },
            ],
          };
        }
        return t;
      });
      setThreads(updatedThreads);
    }

    setIsGenerating(true);
    setTimeout(() => {
      const modelName = MODEL_OPTIONS.find((m) => m.id === activeModelId)?.name || 'Sonnet 5 High';
      const mockArtifact: Artifact = {
        id: `art-${Date.now()}`,
        title: 'Puku_system_overview.md',
        type: 'document',
        language: 'markdown',
        version: 1,
        code: `# PUKU WORKSPACE SYSTEM OVERVIEW\nQuery processed by ${modelName}.\nAll task requirements compiled cleanly.`,
      };

      const assistantMsg: Message = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: `Here is the requested information for: "${userText}"\n\nAll tasks and outputs compiled cleanly.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: modelName,
        artifact: mockArtifact,
      };

      setThreads((prev) =>
        prev.map((t) => {
          if (t.id === currentThreadId) {
            return {
              ...t,
              messages: [...t.messages, assistantMsg],
            };
          }
          return t;
        })
      );

      setActiveArtifact(mockArtifact);
      setIsGenerating(false);
    }, 1200);
  };

  return (
    <>
      <SEO title="Puku Web Chat Workspace" description="Interactive AI engineering web workspace matching Claude Light Mode UI." />

      <div className="h-screen w-screen overflow-hidden flex bg-[#FAF9F5] font-sans text-[#1F1F1E] select-none">
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
        <div className="flex-1 flex flex-col min-w-0 h-full relative bg-[#FAF9F5]">
          {/* Top Mobile Bar */}
          <div className="lg:hidden h-12 px-4 border-b border-[#E2E0D8] flex items-center justify-between bg-[#FAF9F5] shrink-0">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-1.5 text-[#1F1F1E] hover:bg-[#F0EEE6] rounded-md border border-[#E2E0D8] bg-white flex items-center gap-1.5 text-xs font-semibold"
            >
              <PanelLeft className="h-4 w-4" />
              <span>Menu</span>
            </button>

            <span className="font-serif text-sm font-bold">Puku</span>
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
