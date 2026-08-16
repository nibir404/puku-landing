import { useState } from 'react';
import {
  Cloud,
  ChevronDown,
  PanelLeft,
  Plus,
  Mic,
  Bot,
  Globe,
  FileText,
  Download,
  Share2,
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

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[#FAF9F5] font-sans text-[#1F1F1E]">
      {/* Top Header matching Screenshot 2: ☁️ Puku information ∨ ... [|] */}
      <div className="h-12 px-4 sm:px-6 border-b border-[#E2E0D8] flex items-center justify-between shrink-0 bg-[#FAF9F5] select-none">
        <div className="flex items-center gap-2 min-w-0">
          <button
            onClick={onToggleSidebar}
            title="Toggle left sidebar"
            className="lg:hidden p-1 text-[#66645E] hover:text-[#1F1F1E] rounded-md"
          >
            <PanelLeft className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-1.5 cursor-pointer hover:text-[#DA7756] transition-colors">
            <Cloud className="h-4 w-4 text-[#66645E]" />
            <h2 className="text-sm font-semibold text-[#1F1F1E] truncate">{thread.title}</h2>
            <ChevronDown className="h-3.5 w-3.5 text-[#66645E]" />
          </div>
        </div>

        <div className="flex items-center gap-2 text-[#66645E]">
          <button
            title="Share thread"
            className="p-1.5 hover:text-[#1F1F1E] rounded-md hover:bg-[#F0EEE6] transition-colors"
          >
            <Share2 className="h-4 w-4" />
          </button>

          <button
            onClick={onToggleRightDrawer}
            title="Toggle right task panel"
            className="p-1.5 hover:text-[#1F1F1E] rounded-md hover:bg-[#F0EEE6] transition-colors bg-[#E8E5DB] text-[#1F1F1E]"
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
                /* User Chat Bubble matching Screenshot 3: Dark rounded card */
                <div className="bg-[#2A2926] text-white p-4 rounded-2xl max-w-xl ml-auto text-sm leading-relaxed font-normal shadow-xs">
                  {msg.content}
                </div>
              ) : (
                /* Assistant Output matching Screenshot 2 & 3 */
                <div className="space-y-4">
                  {/* Document Artifact Card matching Screenshot 3 */}
                  {msg.artifact && (
                    <div className="p-4 bg-[#F0EEE6] border border-[#E2E0D8] rounded-2xl space-y-3 max-w-md select-none">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-xl bg-white border border-[#E2E0D8] text-[#1F1F1E]">
                            <FileText className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-[#1F1F1E]">{msg.artifact.title}</div>
                            <div className="text-[11px] text-[#66645E]">Document • MD</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => onOpenArtifact(msg.artifact!)}
                            className="px-3 py-1.5 bg-[#1F1F1E] hover:bg-[#383733] text-white font-semibold text-xs rounded-lg transition-colors"
                          >
                            Download
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => onOpenArtifact(msg.artifact!)}
                        className="w-full py-1.5 bg-white hover:bg-[#FAF9F5] border border-[#E2E0D8] text-[#1F1F1E] font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Download className="h-3.5 w-3.5" />
                        <span>Download all</span>
                      </button>
                    </div>
                  )}

                  {/* Assistant Text in Warm Serif Typography */}
                  <div className="font-serif text-base text-[#1F1F1E] leading-relaxed whitespace-pre-wrap">
                    {msg.content}
                  </div>

                  {/* Sources List matching Screenshot 2 */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="space-y-1.5 pt-2 text-xs font-sans text-[#66645E]">
                      <div className="font-bold text-[#1F1F1E]">Sources:</div>
                      <ul className="space-y-1">
                        {msg.sources.map((s, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <span className="text-[#DA7756] font-bold">•</span>
                            <a href={s.url} className="underline hover:text-[#DA7756] transition-colors">
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

        {/* Burst Loading Spinner matching Screenshot 2: ✳️ */}
        {isGenerating && (
          <div className="flex items-center gap-2 text-[#DA7756] text-xl font-light animate-spin">
            ✳️
          </div>
        )}
      </div>

      {/* Floating Bottom Input Container matching Screenshot 2 & 3 */}
      <div className="p-4 bg-gradient-to-t from-[#FAF9F5] via-[#FAF9F5] to-transparent shrink-0">
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto bg-white border border-[#E2E0D8] rounded-2xl shadow-sm p-3.5 space-y-3 relative focus-within:border-[#DA7756] transition-all"
        >
          {/* Top Right Green Robot Icon */}
          <div className="absolute top-3.5 right-4 h-5 w-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
            <Bot className="h-3 w-3 text-white" />
          </div>

          <textarea
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Write a message..."
            className="w-full resize-none bg-transparent border-0 text-sm text-[#1F1F1E] placeholder-[#88857C] focus:outline-none font-normal leading-relaxed pr-8"
          />

          <div className="flex items-center justify-between pt-2 border-t border-[#F2F0E8] text-xs font-semibold text-[#66645E]">
            <div className="flex items-center gap-2">
              <button type="button" className="p-1 hover:text-[#1F1F1E]">
                <Plus className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-1 cursor-pointer hover:text-[#1F1F1E]">
                <Globe className="h-3.5 w-3.5" />
                <span>Manual</span>
                <ChevronDown className="h-3 w-3" />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 cursor-pointer hover:text-[#1F1F1E]">
                <span>{activeModel.name}</span>
                <ChevronDown className="h-3 w-3" />
              </div>

              <button type="button" className="p-1 hover:text-[#1F1F1E]">
                <Mic className="h-4 w-4" />
              </button>
            </div>
          </div>
        </form>

        {/* Footer Disclaimer matching Screenshot 2 & 3 */}
        <div className="text-[11px] font-sans text-center text-[#88857C] mt-2 select-none">
          Puku is AI and can make mistakes. Please double-check responses.
        </div>
      </div>
    </div>
  );
};
