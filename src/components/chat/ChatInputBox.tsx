import { useState, useRef, useEffect } from 'react';
import { ArrowUp, Paperclip, Bot, Square } from 'lucide-react';
import { ModelId, MODEL_OPTIONS } from '@/lib/chatStore';

interface ChatInputBoxProps {
  activeModelId: ModelId;
  isGenerating: boolean;
  onSendMessage: (text: string) => void;
  onStopGenerating: () => void;
}

export const ChatInputBox = ({
  activeModelId,
  isGenerating,
  onSendMessage,
  onStopGenerating,
}: ChatInputBoxProps) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const activeModel = MODEL_OPTIONS.find((m) => m.id === activeModelId) || MODEL_OPTIONS[0];

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  }, [input]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isGenerating) {
      onSendMessage(input.trim());
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="p-3 sm:p-4 bg-white border-t border-[#E5E5E8] shrink-0 select-none">
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto bg-white border border-[#E5E5E8] rounded-lg shadow-sm p-3 space-y-2.5 focus-within:border-[#6E56CF] focus-within:ring-2 focus-within:ring-[#6E56CF]/20 transition-all"
      >
        <textarea
          ref={textareaRef}
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Reply to Puku..."
          className="w-full resize-none bg-transparent border-0 text-sm text-[#0F0F11] placeholder-[#4A4A52] focus:outline-none font-normal leading-relaxed max-h-[160px]"
        />

        <div className="flex items-center justify-between pt-2 border-t border-[#E5E5E8]">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold text-[#6E56CF] bg-[#F4F2FF] border border-[#E4DDFE] px-2 py-0.5 rounded flex items-center gap-1">
              <Bot className="h-3 w-3" />
              {activeModel.tag}
            </span>

            <button
              type="button"
              title="Attach code file"
              className="p-1.5 text-[#4A4A52] hover:text-[#6E56CF] hover:bg-[#FAFAFC] rounded transition-colors"
            >
              <Paperclip className="h-4 w-4" />
            </button>
          </div>

          <div>
            {isGenerating ? (
              <button
                type="button"
                onClick={onStopGenerating}
                className="h-8 px-3 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs rounded flex items-center gap-1.5 transition-colors"
              >
                <Square className="h-3 w-3 fill-current" />
                <span>Stop</span>
              </button>
            ) : (
              <button
                type="submit"
                disabled={!input.trim()}
                className="h-8 px-3.5 bg-[#0F0F11] disabled:opacity-30 hover:bg-[#6E56CF] text-white font-semibold text-xs rounded transition-colors flex items-center gap-1.5"
              >
                <span>Send</span>
                <ArrowUp className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
