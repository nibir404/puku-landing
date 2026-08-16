import { useState } from 'react';
import {
  ChevronDown,
  PanelLeft,
  Plus,
  Mic,
  Globe,
  FileText,
  Download,
  Share2,
  Sparkles,
  Copy,
  Check,
  X,
  Volume2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Thread, Message, Artifact, MODEL_OPTIONS } from '@/lib/chatStore';

interface ChatMessageFeedProps {
  thread: Thread;
  isGenerating: boolean;
  onOpenArtifact: (artifact: Artifact) => void;
  onSendMessage: (text: string) => void;
  onToggleRightDrawer: () => void;
  onToggleSidebar: () => void;
}

export const ChatMessageFeed = ({
  thread,
  isGenerating,
  onOpenArtifact,
  onSendMessage,
  onToggleRightDrawer,
  onToggleSidebar,
}: ChatMessageFeedProps) => {
  const [input, setInput] = useState('');
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [isVoiceListening, setIsVoiceListening] = useState(false);
  const [voiceToast, setVoiceToast] = useState(false);

  const activeModel = MODEL_OPTIONS.find((m) => m.id === thread.modelId) || MODEL_OPTIONS[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isGenerating) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleCopyMessage = (msgId: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMsgId(msgId);
    setTimeout(() => setCopiedMsgId(null), 2000);
  };

  const handleToggleVoice = () => {
    setIsVoiceListening(!isVoiceListening);
    setVoiceToast(true);
    setTimeout(() => setVoiceToast(false), 3000);
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[#f5f5f7] font-sans text-[#0F0F11] relative">
      {/* Share Modal Dialog */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#E5E5E8] rounded-[2px] p-6 max-w-md w-full space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="font-puku font-brand font-bold text-base text-[#0F0F11]">Share Conversation</h3>
              <button onClick={() => setShowShareModal(false)} className="text-[#4A4A52] hover:text-[#0F0F11]">
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-xs text-[#4A4A52]">
              Anyone with this secret share link can view this thread and its generated artifacts.
            </p>
            <div className="p-2.5 bg-[#FAFAFC] border border-[#E5E5E8] rounded-[2px] font-mono text-xs text-[#6E56CF] truncate">
              https://puku.ai/share/thread-{thread.id}
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(`https://puku.ai/share/thread-${thread.id}`);
                setShowShareModal(false);
                alert('Share link copied to clipboard!');
              }}
              className="w-full py-2 bg-[#6E56CF] hover:bg-[#5B42F3] text-white font-semibold text-xs rounded-[2px] transition-colors"
            >
              Copy Share Link
            </button>
          </div>
        </div>
      )}

      {/* Voice Mode Toast Indicator */}
      {voiceToast && (
        <div className="absolute top-14 left-1/2 -translate-x-1/2 z-40 bg-[#0F0F11] text-white px-4 py-2 rounded-[2px] text-xs font-mono flex items-center gap-2 shadow-lg animate-bounce">
          <Volume2 className="h-4 w-4 text-[#6E56CF]" />
          <span>{isVoiceListening ? 'Voice Mode Active — Listening... Speak now.' : 'Voice Mode Off'}</span>
        </div>
      )}

      {/* Top Header Bar */}
      <div className="h-12 px-4 sm:px-6 border-b border-[#E5E5E8] flex items-center justify-between shrink-0 bg-white select-none">
        <div className="flex items-center gap-2 min-w-0">
          <button
            onClick={onToggleSidebar}
            title="Toggle left sidebar"
            className="lg:hidden p-1 text-[#4A4A52] hover:text-[#6E56CF] rounded-[2px]"
          >
            <PanelLeft className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-2 cursor-pointer hover:text-[#6E56CF] transition-colors">
            <img src="/puku-mark.svg" alt="Puku Logo" className="h-5 w-auto object-contain" />
            <h2 className="text-sm font-semibold text-[#0F0F11] font-puku font-brand truncate">{thread.title}</h2>
            <ChevronDown className="h-3.5 w-3.5 text-[#4A4A52]" />
          </div>
        </div>

        <div className="flex items-center gap-2 text-[#4A4A52]">
          <button
            onClick={() => setShowShareModal(true)}
            title="Share thread"
            className="p-1.5 hover:text-[#6E56CF] rounded-[2px] hover:bg-[#F3F3F5] transition-colors"
          >
            <Share2 className="h-4 w-4" />
          </button>

          <button
            onClick={onToggleRightDrawer}
            title="Toggle right task panel"
            className="p-1.5 hover:text-[#6E56CF] rounded-[2px] hover:bg-[#F3F3F5] transition-colors bg-[#F4F2FF] text-[#6E56CF] border border-[#6E56CF]/30"
          >
            <PanelLeft className="h-4 w-4 rotate-180" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Feed */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 max-w-3xl w-full mx-auto">
        {thread.messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div key={msg.id} className="space-y-3">
              {isUser ? (
                /* USER CHAT BUBBLE — ASH / LIGHT GREY WITH DARK TEXT */
                <div className="bg-[#E5E5E8] border border-[#D5D5D8] text-[#0F0F11] p-4 rounded-[2px] max-w-xl ml-auto text-sm leading-relaxed font-normal shadow-none">
                  {msg.content}
                </div>
              ) : (
                /* Assistant Output */
                <div className="space-y-4">
                  {/* Document Artifact Card */}
                  {msg.artifact && (
                    <div className="p-4 bg-white border border-[#E5E5E8] rounded-[2px] space-y-3 max-w-md select-none">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-[2px] bg-[#F4F2FF] border border-[#6E56CF]/20 text-[#6E56CF]">
                            <FileText className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-[#0F0F11]">{msg.artifact.title}</div>
                            <div className="text-[11px] font-mono text-[#4A4A52]">Document • MD</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => onOpenArtifact(msg.artifact!)}
                            className="px-3 py-1.5 bg-[#6E56CF] hover:bg-[#5B42F3] text-white font-semibold text-xs rounded-[2px] transition-colors"
                          >
                            Download
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => onOpenArtifact(msg.artifact!)}
                        className="w-full py-1.5 bg-white hover:bg-[#F3F3F5] border border-[#E5E5E8] text-[#0F0F11] font-semibold text-xs rounded-[2px] transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Download className="h-3.5 w-3.5" />
                        <span>Download all</span>
                      </button>
                    </div>
                  )}

                  {/* Assistant Text */}
                  <div className="font-sans text-base text-[#0F0F11] leading-relaxed whitespace-pre-wrap">
                    {msg.content}
                  </div>

                  {/* Message Action Bar: Copy & Actions */}
                  <div className="flex items-center gap-2 pt-1 text-xs text-[#4A4A52]">
                    <button
                      onClick={() => handleCopyMessage(msg.id, msg.content)}
                      className="px-2.5 py-1 bg-white hover:bg-[#F3F3F5] border border-[#E5E5E8] rounded-[2px] transition-colors flex items-center gap-1 text-[11px] font-semibold text-[#4A4A52] hover:text-[#6E56CF]"
                      title="Copy message to clipboard"
                    >
                      {copiedMsgId === msg.id ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-600" />
                          <span className="text-emerald-600">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Sources List */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="space-y-1.5 pt-2 text-xs font-sans text-[#4A4A52]">
                      <div className="font-bold text-[#0F0F11]">Sources:</div>
                      <ul className="space-y-1">
                        {msg.sources.map((s, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <span className="text-[#6E56CF] font-bold">•</span>
                            <a href={s.url} target="_blank" rel="noreferrer" className="underline hover:text-[#6E56CF] transition-colors">
                              {s.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* Loading Spinner */}
        {isGenerating && (
          <div className="flex items-center gap-2 text-[#6E56CF] text-xs font-bold animate-pulse">
            <Sparkles className="h-4 w-4 animate-spin text-[#6E56CF]" />
            <span>Puku Fleet is generating response...</span>
          </div>
        )}
      </div>

      {/* Floating Bottom Input Container */}
      <div className="p-4 bg-gradient-to-t from-[#f5f5f7] via-[#f5f5f7] to-transparent shrink-0">
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto bg-white border border-[#E5E5E8] rounded-[2px] shadow-none p-3.5 space-y-3 relative focus-within:border-[#6E56CF] transition-all"
        >
          {/* Top Right Logo Badge */}
          <div className="absolute top-3.5 right-4 h-5 w-5 rounded-[2px] bg-[#6E56CF] text-white flex items-center justify-center shadow-none">
            <Sparkles className="h-3 w-3 text-white" />
          </div>

          <textarea
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Write a message..."
            className="w-full resize-none bg-transparent border-0 text-sm text-[#0F0F11] placeholder-[#4A4A52] focus:outline-none font-normal leading-relaxed pr-8"
          />

          <div className="flex items-center justify-between pt-2 border-t border-[#E5E5E8] text-xs font-semibold text-[#4A4A52]">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => alert('Attachment file browser opened')}
                className="p-1 hover:text-[#6E56CF]"
                title="Add attachment"
              >
                <Plus className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-1 cursor-pointer hover:text-[#6E56CF]">
                <Globe className="h-3.5 w-3.5" />
                <span>Manual</span>
                <ChevronDown className="h-3 w-3" />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 cursor-pointer hover:text-[#6E56CF]">
                <span>{activeModel.name}</span>
                <ChevronDown className="h-3 w-3" />
              </div>

              <button
                type="button"
                onClick={handleToggleVoice}
                className={cn('p-1 transition-colors', isVoiceListening ? 'text-[#6E56CF] font-bold' : 'hover:text-[#6E56CF]')}
                title="Toggle Voice Mode"
              >
                <Mic className="h-4 w-4" />
              </button>
            </div>
          </div>
        </form>

        {/* Footer Disclaimer */}
        <div className="text-[11px] font-mono text-center text-[#4A4A52] mt-2 select-none">
          Puku is AI and can make mistakes. Please double-check responses.
        </div>
      </div>
    </div>
  );
};
