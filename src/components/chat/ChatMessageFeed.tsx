import { useState } from 'react';
import {
  Copy,
  Check,
  RotateCw,
  ThumbsUp,
  ThumbsDown,
  ExternalLink,
  Code,
  Bot,
  User,
  Sparkles,
  Share2,
  Trash2,
  Layers,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Thread, Message, Artifact } from '@/lib/chatStore';

interface ChatMessageFeedProps {
  thread: Thread;
  isGenerating: boolean;
  onOpenArtifact: (artifact: Artifact) => void;
  onClearThread: () => void;
  onRegenerate: () => void;
}

export const ChatMessageFeed = ({
  thread,
  isGenerating,
  onOpenArtifact,
  onClearThread,
  onRegenerate,
}: ChatMessageFeedProps) => {
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);

  const copyToClipboard = (text: string, msgId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMsgId(msgId);
    setTimeout(() => setCopiedMsgId(null), 2000);
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-white">
      {/* Top Conversation Header */}
      <div className="h-14 px-4 sm:px-6 border-b border-[#E5E5E8] flex items-center justify-between shrink-0 bg-white select-none">
        <div className="flex items-center gap-2.5 min-w-0">
          <h2 className="text-sm font-bold text-[#0F0F11] truncate">{thread.title}</h2>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#F4F2FF] text-[#6E56CF] border border-[#E4DDFE] shrink-0">
            {thread.modelId}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onClearThread}
            title="Clear message history"
            className="p-1.5 text-[#4A4A52] hover:text-red-600 rounded transition-colors text-xs flex items-center gap-1 font-semibold"
          >
            <Trash2 className="h-4 w-4" />
            <span className="hidden sm:inline">Clear</span>
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 max-w-4xl w-full mx-auto">
        {thread.messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div key={msg.id} className="space-y-2 group">
              {/* Sender Info Bar */}
              <div className="flex items-center justify-between text-xs text-[#4A4A52] select-none">
                <div className="flex items-center gap-2 font-bold text-[#0F0F11]">
                  {isUser ? (
                    <div className="h-6 w-6 rounded-full bg-[#0F0F11] text-white flex items-center justify-center text-[10px]">
                      U
                    </div>
                  ) : (
                    <div className="h-6 w-6 rounded-full bg-[#6E56CF] text-white flex items-center justify-center text-[10px]">
                      <Bot className="h-3.5 w-3.5" />
                    </div>
                  )}
                  <span>{isUser ? 'You' : msg.modelUsed || 'Puku Assistant'}</span>
                </div>
                <span className="text-[11px] font-mono text-[#4A4A52]">{msg.timestamp}</span>
              </div>

              {/* Message Content */}
              <div
                className={cn(
                  'p-4 rounded-lg text-sm leading-relaxed font-normal',
                  isUser
                    ? 'bg-[#FAFAFC] border border-[#E5E5E8] text-[#0F0F11]'
                    : 'bg-white border border-[#E5E5E8] text-[#0F0F11] shadow-xs'
                )}
              >
                <div className="whitespace-pre-wrap font-sans">{msg.content}</div>

                {/* Claude-Style Artifact Card Box inside message */}
                {msg.artifact && (
                  <div className="mt-4 p-3.5 bg-[#F4F2FF] border border-[#E4DDFE] rounded-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 select-none">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="p-2 rounded bg-white border border-[#E4DDFE] text-[#6E56CF]">
                        <Code className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-[#0F0F11] truncate">{msg.artifact.title}</div>
                        <div className="text-[10.5px] font-mono text-[#6E56CF] uppercase font-bold mt-0.5">
                          {msg.artifact.type} • {msg.artifact.language}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onOpenArtifact(msg.artifact!)}
                      className="px-3 py-1.5 bg-[#6E56CF] hover:bg-[#5B42F3] text-white font-semibold text-xs rounded transition-colors flex items-center justify-center gap-1.5 shrink-0"
                    >
                      <span>View Artifact</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Message Footer Action Bar */}
              {!isUser && (
                <div className="flex items-center gap-3 pt-1 text-xs text-[#4A4A52] select-none">
                  <button
                    onClick={() => copyToClipboard(msg.content, msg.id)}
                    className="flex items-center gap-1 hover:text-[#6E56CF] transition-colors"
                  >
                    {copiedMsgId === msg.id ? <Check className="h-3.5 w-3.5 text-[#6E56CF]" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copiedMsgId === msg.id ? 'Copied' : 'Copy'}</span>
                  </button>

                  <button
                    onClick={onRegenerate}
                    className="flex items-center gap-1 hover:text-[#6E56CF] transition-colors"
                  >
                    <RotateCw className="h-3.5 w-3.5" />
                    <span>Retry</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}

        {/* Streaming Animation Indicator */}
        {isGenerating && (
          <div className="flex items-center gap-2 text-xs text-[#6E56CF] font-semibold p-3 bg-[#F4F2FF] border border-[#E4DDFE] rounded-md animate-pulse">
            <Bot className="h-4 w-4 animate-spin" />
            <span>Puku is thinking and generating code...</span>
          </div>
        )}
      </div>
    </div>
  );
};
