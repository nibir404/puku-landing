import { useState } from 'react';
import {
  Copy,
  Check,
  RotateCw,
  ExternalLink,
  Code,
  Bot,
  User,
  Star,
  Trash2,
  PanelLeft,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Thread, Message, Artifact, MODEL_OPTIONS } from '@/lib/chatStore';

interface ChatMessageFeedProps {
  thread: Thread;
  isGenerating: boolean;
  onOpenArtifact: (artifact: Artifact) => void;
  onClearThread: () => void;
  onRegenerate: () => void;
  onToggleSidebar: () => void;
}

export const ChatMessageFeed = ({
  thread,
  isGenerating,
  onOpenArtifact,
  onClearThread,
  onRegenerate,
  onToggleSidebar,
}: ChatMessageFeedProps) => {
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);

  const activeModel = MODEL_OPTIONS.find((m) => m.id === thread.modelId) || MODEL_OPTIONS[0];

  const copyToClipboard = (text: string, msgId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMsgId(msgId);
    setTimeout(() => setCopiedMsgId(null), 2000);
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[#FAF9F5] font-sans">
      {/* Claude Top Bar Header */}
      <div className="h-14 px-4 sm:px-6 border-b border-[#E2E0D8] flex items-center justify-between shrink-0 bg-[#FAF9F5] select-none">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onToggleSidebar}
            title="Toggle sidebar"
            className="p-1.5 text-[#66645E] hover:text-[#1F1F1E] rounded-md hover:bg-[#F2F0E8] transition-colors"
          >
            <PanelLeft className="h-4 w-4" />
          </button>

          <h2 className="text-sm font-serif font-bold text-[#1F1F1E] truncate">{thread.title}</h2>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#FAF0EC] text-[#DA7756] border border-[#DA7756]/20 shrink-0">
            {activeModel.tag}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onClearThread}
            title="Clear thread history"
            className="p-1.5 text-[#66645E] hover:text-red-600 rounded-md hover:bg-[#F2F0E8] transition-colors text-xs flex items-center gap-1 font-semibold"
          >
            <Trash2 className="h-4 w-4" />
            <span className="hidden sm:inline">Clear</span>
          </button>
        </div>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 max-w-3xl w-full mx-auto">
        {thread.messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div key={msg.id} className="space-y-2 group">
              {/* Sender Badge Header */}
              <div className="flex items-center justify-between text-xs text-[#66645E] select-none">
                <div className="flex items-center gap-2 font-bold text-[#1F1F1E]">
                  {isUser ? (
                    <div className="h-6 w-6 rounded-full bg-[#1F1F1E] text-white flex items-center justify-center text-[10px]">
                      U
                    </div>
                  ) : (
                    <div className="h-6 w-6 rounded-full bg-[#DA7756] text-white flex items-center justify-center text-[10px]">
                      P
                    </div>
                  )}
                  <span>{isUser ? 'You' : msg.modelUsed || 'Puku Assistant'}</span>
                </div>
                <span className="text-[11px] font-mono text-[#88857C]">{msg.timestamp}</span>
              </div>

              {/* Message Content Bubble */}
              <div
                className={cn(
                  'p-4 rounded-2xl text-sm leading-relaxed font-normal',
                  isUser
                    ? 'bg-white border border-[#E2E0D8] text-[#1F1F1E]'
                    : 'bg-white border border-[#E2E0D8] text-[#1F1F1E] shadow-xs'
                )}
              >
                <div className="whitespace-pre-wrap font-sans">{msg.content}</div>

                {/* Claude-Style Artifact Card Box */}
                {msg.artifact && (
                  <div className="mt-4 p-3.5 bg-[#FAF9F5] border border-[#E2E0D8] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 select-none">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="p-2 rounded-lg bg-white border border-[#E2E0D8] text-[#DA7756]">
                        <Code className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-[#1F1F1E] truncate">{msg.artifact.title}</div>
                        <div className="text-[10.5px] font-mono text-[#DA7756] uppercase font-bold mt-0.5">
                          {msg.artifact.type} • {msg.artifact.language}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onOpenArtifact(msg.artifact!)}
                      className="px-3.5 py-1.5 bg-[#DA7756] hover:bg-[#C26242] text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 shrink-0 shadow-xs"
                    >
                      <span>Click to open artifact</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Response Action Bar */}
              {!isUser && (
                <div className="flex items-center gap-3 pt-1 text-xs text-[#66645E] select-none">
                  <button
                    onClick={() => copyToClipboard(msg.content, msg.id)}
                    className="flex items-center gap-1 hover:text-[#1F1F1E] transition-colors"
                  >
                    {copiedMsgId === msg.id ? <Check className="h-3.5 w-3.5 text-[#DA7756]" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copiedMsgId === msg.id ? 'Copied' : 'Copy'}</span>
                  </button>

                  <button
                    onClick={onRegenerate}
                    className="flex items-center gap-1 hover:text-[#1F1F1E] transition-colors"
                  >
                    <RotateCw className="h-3.5 w-3.5" />
                    <span>Retry</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}

        {/* Streaming Animation */}
        {isGenerating && (
          <div className="flex items-center gap-2 text-xs text-[#DA7756] font-semibold p-3.5 bg-[#FAF0EC] border border-[#DA7756]/20 rounded-xl animate-pulse">
            <Bot className="h-4 w-4 animate-spin text-[#DA7756]" />
            <span>Puku is generating response & compiling artifact...</span>
          </div>
        )}
      </div>
    </div>
  );
};
