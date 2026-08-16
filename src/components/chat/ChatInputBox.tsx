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
    <div className="p-3 sm:p-4 bg-gradient-to-t from-[#FAF9F5] via-[#FAF9F5] to-transparent shrink-0 select-none">
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white border border-[#E2E0D8] rounded-2xl shadow-sm p-3.5 space-y-2.5 focus-within:border-[#DA7756] focus-within:ring-2 focus-within:ring-[#DA7756]/15 transition-all"
      >
        <textarea
          ref={textareaRef}
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Reply to Puku..."
          className="w-full resize-none bg-transparent border-0 text-sm text-[#1F1F1E] placeholder-[#88857C] focus:outline-none font-normal leading-relaxed max-h-[160px]"
        />

        <div className="flex items-center justify-between pt-2 border-t border-[#F2F0E8]">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold text-[#DA7756] bg-[#FAF0EC] border border-[#DA7756]/20 px-2 py-0.5 rounded-md flex items-center gap-1">
              <Bot className="h-3 w-3" />
              {activeModel.tag}
            </span>

            <button
              type="button"
              title="Attach code file"
              className="p-1.5 text-[#66645E] hover:text-[#1F1F1E] hover:bg-[#FAF9F5] rounded-lg transition-colors"
            >
              <Paperclip className="h-4 w-4" />
            </button>
          </div>

          <div>
            {isGenerating ? (
              <button
                type="button"
                onClick={onStopGenerating}
                className="h-8 px-3 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs rounded-full flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Square className="h-3 w-3 fill-current" />
                <span>Stop</span>
              </button>
            ) : (
              <button
                type="submit"
                disabled={!input.trim()}
                className="h-8 w-8 rounded-full bg-[#DA7756] disabled:opacity-30 hover:bg-[#C26242] text-white flex items-center justify-center transition-colors shadow-xs"
                aria-label="Send message"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
