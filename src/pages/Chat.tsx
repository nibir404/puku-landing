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
      // Create new thread
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
      // Append to active thread
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

    // Simulate streaming AI assistant response
    setIsGenerating(true);
    setTimeout(() => {
      const modelName = MODEL_OPTIONS.find((m) => m.id === activeModelId)?.name || 'Puku Assistant';
      const mockArtifact: Artifact = {
        id: `art-${Date.now()}`,
        title: 'GeneratedComponent.tsx',
        type: 'component',
        language: 'tsx',
        code: `import React from 'react';

export default function GeneratedComponent() {
  return (
    <div className="p-6 bg-white border border-[#E5E5E8] rounded-lg shadow-sm font-sans">
      <h3 className="text-lg font-bold text-[#0F0F11]">Puku AI Generated Output</h3>
      <p className="text-sm text-[#4A4A52] mt-2">
        Generated response for query: "${userText}"
      </p>
    </div>
  );
}`,
        previewHtml: `
          <div style="font-family: sans-serif; padding: 24px; background: white; border: 1px solid #E5E5E8; border-radius: 8px;">
            <h3 style="margin: 0; font-size: 18px; color: #0F0F11; font-weight: 800;">Puku AI Generated Output</h3>
            <p style="margin: 8px 0 0 0; font-size: 13px; color: #4A4A52;">Processed by ${modelName}</p>
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
      <SEO title="Puku Web Chat — Claude Style AI Assistant" description="Start interactive AI engineering web chat directly in your browser with live split-pane code artifacts." />

      <div className="h-screen w-screen overflow-hidden flex bg-white font-sans text-[#0F0F11] select-none">
        {/* Left Navigation Sidebar */}
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
          {/* Top Mobile/Desktop Sidebar Toggle Bar */}
          <div className="lg:hidden h-12 px-4 border-b border-[#E5E5E8] flex items-center justify-between bg-[#FAFAFC] shrink-0">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-1.5 text-[#0F0F11] hover:text-[#6E56CF] rounded border border-[#E5E5E8] bg-white flex items-center gap-1.5 text-xs font-semibold"
            >
              <PanelLeft className="h-4 w-4" />
              <span>Menu</span>
            </button>

            <div className="flex items-center gap-2">
              <Bot className="h-4 w-4 text-[#6E56CF]" />
              <span className="text-xs font-bold">Puku Web Chat</span>
            </div>
          </div>

          {/* Conditional View: Initial Dedicated Welcome Input vs Active Message Feed */}
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
