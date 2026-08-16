import { useState } from 'react';
import { SEO } from '@/components/layout/SEO';
import { ChatSidebar } from '@/components/chat/ChatSidebar';
import { ChatWelcome } from '@/components/chat/ChatWelcome';
import { ChatMessageFeed } from '@/components/chat/ChatMessageFeed';
import { ChatInputBox } from '@/components/chat/ChatInputBox';
import { ArtifactsPanel } from '@/components/chat/ArtifactsPanel';
import {
  Thread,
  Message,
  Artifact,
  ModelId,
  INITIAL_THREADS,
  MODEL_OPTIONS,
} from '@/lib/chatStore';
import { PanelLeft, Bot } from 'lucide-react';

export default function Chat() {
  const [threads, setThreads] = useState<Thread[]>(INITIAL_THREADS);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [activeModelId, setActiveModelId] = useState<ModelId>('puku-3.5-sonnet');
  const [activeArtifact, setActiveArtifact] = useState<Artifact | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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

  const handleSendMessage = (userText: string) => {
    let currentThreadId = activeThreadId;
    let updatedThreads = [...threads];

    if (!currentThreadId) {
      const newThread: Thread = {
        id: `thread-${Date.now()}`,
        title: userText.slice(0, 36) + (userText.length > 36 ? '...' : ''),
        updatedAt: 'Just now',
        category: 'Today',
        modelId: activeModelId,
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
      const modelName = MODEL_OPTIONS.find((m) => m.id === activeModelId)?.name || 'Puku Assistant';
      const mockArtifact: Artifact = {
        id: `art-${Date.now()}`,
        title: 'GeneratedComponent.tsx',
        type: 'component',
        language: 'tsx',
        version: 1,
        code: `import React from 'react';

export default function GeneratedComponent() {
  return (
    <div className="p-6 bg-white border border-[#E2E0D8] rounded-xl shadow-xs font-sans">
      <h3 className="text-lg font-serif font-bold text-[#1F1F1E]">Claude-Style Output Generated</h3>
      <p className="text-sm text-[#66645E] mt-2">
        Generated response for query: "${userText}"
      </p>
    </div>
  );
}`,
        previewHtml: `
          <div style="font-family: serif; padding: 24px; background: white; border: 1px solid #E2E0D8; border-radius: 12px;">
            <h3 style="margin: 0; font-size: 18px; color: #1F1F1E; font-weight: 600;">Claude-Style Output Generated</h3>
            <p style="margin: 8px 0 0 0; font-size: 13px; color: #66645E;">Processed by ${modelName}</p>
          </div>
        `,
      };

      const assistantMsg: Message = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: `I've analyzed your prompt and generated the code solution.\n\nKey highlights:\n• Optimized type definitions and clean component structure\n• Standardized WCAG AAA accessibility compliance\n• Zero-dependency implementation`,
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

  const handleClearThread = () => {
    if (activeThreadId) {
      setThreads((prev) =>
        prev.map((t) => {
          if (t.id === activeThreadId) {
            return { ...t, messages: [] };
          }
          return t;
        })
      );
    }
  };

  return (
    <>
      <SEO title="Claude Style Puku Web Chat" description="Interactive AI engineering web chat directly in your browser with live split-pane code artifacts." />

      <div className="h-screen w-screen overflow-hidden flex bg-[#FAF9F5] font-sans text-[#1F1F1E] select-none">
        {/* Left Navigation Drawer */}
        <ChatSidebar
          threads={threads}
          activeThreadId={activeThreadId}
          activeModelId={activeModelId}
          onSelectThread={handleSelectThread}
          onNewChat={handleNewChat}
          onDeleteThread={handleDeleteThread}
          onSelectModel={setActiveModelId}
          isOpen={isSidebarOpen}
          onCloseMobile={() => setIsSidebarOpen(false)}
        />

        {/* Main Workspace Area */}
        <div className="flex-1 flex flex-col min-w-0 h-full relative">
          {/* Top Mobile Bar */}
          <div className="lg:hidden h-12 px-4 border-b border-[#E2E0D8] flex items-center justify-between bg-[#FAF9F5] shrink-0">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-1.5 text-[#1F1F1E] hover:bg-[#F2F0E8] rounded-md border border-[#E2E0D8] bg-white flex items-center gap-1.5 text-xs font-semibold"
            >
              <PanelLeft className="h-4 w-4" />
              <span>Menu</span>
            </button>

            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-[#DA7756] text-white flex items-center justify-center text-[9px] font-bold">
                P
              </div>
              <span className="text-xs font-serif font-bold">Puku Chat</span>
            </div>
          </div>

          {/* Conditional View */}
          {!activeThread || activeThread.messages.length === 0 ? (
            <ChatWelcome
              activeModelId={activeModelId}
              onSelectModel={setActiveModelId}
              onSendPrompt={handleSendMessage}
            />
          ) : (
            <div className="flex-1 flex flex-col min-h-0">
              <ChatMessageFeed
                thread={activeThread}
                isGenerating={isGenerating}
                onOpenArtifact={setActiveArtifact}
                onClearThread={handleClearThread}
                onRegenerate={() => {
                  if (activeThread.messages.length > 0) {
                    const lastUserMsg = [...activeThread.messages].reverse().find((m) => m.role === 'user');
                    if (lastUserMsg) handleSendMessage(lastUserMsg.content);
                  }
                }}
                onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
              />
              <ChatInputBox
                activeModelId={activeModelId}
                isGenerating={isGenerating}
                onSendMessage={handleSendMessage}
                onStopGenerating={() => setIsGenerating(false)}
              />
            </div>
          )}
        </div>

        {/* Split Side-by-Side Artifact Inspector Panel */}
        <ArtifactsPanel
          artifact={activeArtifact}
          onClose={() => setActiveArtifact(null)}
        />
      </div>
    </>
  );
}
