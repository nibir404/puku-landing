import { useState } from 'react';
import {
  Plus,
  Mic,
  AudioWaveform,
  ChevronDown,
  Sparkles,
  Bot,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ModelId, MODEL_OPTIONS } from '@/lib/chatStore';

interface ChatWelcomeProps {
  activeModelId: ModelId;
  onSelectModel: (modelId: ModelId) => void;
  onSendPrompt: (promptText: string, mode?: 'Chat' | 'Cowork') => void;
}

export const ChatWelcome = ({
  activeModelId,
  onSelectModel,
  onSendPrompt,
}: ChatWelcomeProps) => {
  const [promptInput, setPromptInput] = useState('');
  const [activeMode, setActiveMode] = useState<'Chat' | 'Cowork'>('Chat');
  const [modelMenuOpen, setModelMenuOpen] = useState(false);

  const activeModel = MODEL_OPTIONS.find((m) => m.id === activeModelId) || MODEL_OPTIONS[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (promptInput.trim()) {
      onSendPrompt(promptInput.trim(), activeMode);
      setPromptInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 max-w-3xl mx-auto w-full select-none bg-[#FAF9F5] font-sans">
      {/* Burst Icon Greeting matching Screenshot 1: ✳️ Afternoon, Nibir */}
      <div className="flex items-center gap-3 mb-8">
        <div className="text-[#DA7756] text-3xl font-light">✳️</div>
        <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#1F1F1E] tracking-tight">
          Afternoon, Nibir
        </h1>
      </div>

      {/* Floating Input Box Container matching Screenshot 1 */}
      <form
        onSubmit={handleSubmit}
        className="w-full bg-white border border-[#E2E0D8] rounded-2xl shadow-sm p-4 space-y-4 focus-within:border-[#DA7756] focus-within:ring-2 focus-within:ring-[#DA7756]/15 transition-all relative"
      >
        {/* Top Right Green Robot Icon Badge */}
        <div className="absolute top-3.5 right-4 h-6 w-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
          <Bot className="h-3.5 w-3.5 text-white" />
        </div>

        {/* Text Area */}
        <textarea
          rows={3}
          value={promptInput}
          onChange={(e) => setPromptInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type / for skills"
          className="w-full resize-none bg-transparent border-0 text-sm text-[#1F1F1E] placeholder-[#88857C] focus:outline-none font-normal leading-relaxed pr-10"
        />

        {/* Bottom Toolbar matching Screenshot 1: + [ Chat | Cowork ] ... Sonnet 5 High ∨ 🎤 🎙️ */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[#F2F0E8]">
          {/* Left Controls: + Button & Mode Pill Switcher */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              title="Add attachment or skill"
              className="p-1.5 text-[#66645E] hover:text-[#1F1F1E] hover:bg-[#FAF9F5] rounded-lg transition-colors"
            >
              <Plus className="h-4 w-4" />
            </button>

            {/* Pill Toggle: [ Chat | Cowork ] */}
            <div className="p-1 bg-[#F0EEE6] rounded-xl flex items-center gap-1 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveMode('Chat')}
                className={cn(
                  'px-3 py-1 rounded-lg transition-all',
                  activeMode === 'Chat'
                    ? 'bg-white text-[#1F1F1E] shadow-xs font-bold'
                    : 'text-[#66645E] hover:text-[#1F1F1E]'
                )}
              >
                Chat
              </button>

              <button
                type="button"
                onClick={() => setActiveMode('Cowork')}
                className={cn(
                  'px-3 py-1 rounded-lg transition-all',
                  activeMode === 'Cowork'
                    ? 'bg-white text-[#1F1F1E] shadow-xs font-bold'
                    : 'text-[#66645E] hover:text-[#1F1F1E]'
                )}
              >
                Cowork
              </button>
            </div>
          </div>

          {/* Right Controls: Model Dropdown & Mic */}
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <button
                type="button"
                onClick={() => setModelMenuOpen(!modelMenuOpen)}
                className="flex items-center gap-1 text-xs font-semibold text-[#1F1F1E] hover:text-[#DA7756] transition-colors"
              >
                <span>{activeModel.name}</span>
                <ChevronDown className="h-3.5 w-3.5 text-[#66645E]" />
              </button>

              {modelMenuOpen && (
                <div className="absolute bottom-full right-0 mb-1.5 w-56 bg-white border border-[#E2E0D8] rounded-xl shadow-xl p-1.5 z-50 space-y-1">
                  {MODEL_OPTIONS.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => {
                        onSelectModel(m.id);
                        setModelMenuOpen(false);
                      }}
                      className={cn(
                        'w-full text-left p-2 rounded-lg text-xs transition-colors flex flex-col',
                        m.id === activeModelId
                          ? 'bg-[#FAF9F5] text-[#DA7756] font-bold'
                          : 'hover:bg-[#F5F3ED] text-[#1F1F1E]'
                      )}
                    >
                      <span>{m.name}</span>
                      <span className="text-[10.5px] text-[#66645E] font-normal">{m.description}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              title="Voice input"
              className="p-1.5 text-[#66645E] hover:text-[#1F1F1E] transition-colors"
            >
              <Mic className="h-4 w-4" />
            </button>

            <button
              type="button"
              title="Audio mode"
              className="p-1.5 text-[#66645E] hover:text-[#1F1F1E] transition-colors"
            >
              <AudioWaveform className="h-4 w-4" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
