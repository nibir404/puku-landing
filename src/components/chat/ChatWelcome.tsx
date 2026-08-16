import { useState } from 'react';
import {
  Plus,
  Mic,
  AudioWaveform,
  ChevronDown,
  ArrowUp,
  Sparkles,
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
    <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 max-w-3xl mx-auto w-full select-none bg-[#f5f5f7] font-sans">
      {/* Official Puku Logo Greeting */}
      <div className="flex items-center gap-3 mb-8">
        <img src="/puku-mark.svg" alt="Puku Logo" className="h-9 w-auto object-contain" />
        <h1 className="font-puku font-brand text-3xl sm:text-4xl font-extrabold text-[#0F0F11] tracking-tight">
          Puku Web Workspace
        </h1>
      </div>

      {/* Interactive Input Box Container in Standard Puku Site Theme */}
      <form
        onSubmit={handleSubmit}
        className="w-full bg-white border border-[#E5E5E8] rounded-[2px] shadow-none p-4 space-y-4 focus-within:border-[#6E56CF] focus-within:ring-2 focus-within:ring-[#6E56CF]/15 transition-all relative"
      >
        {/* Top Right Logo Badge */}
        <div className="absolute top-4 right-4 h-6 w-6 rounded-[2px] bg-[#6E56CF] text-white flex items-center justify-center shadow-none">
          <Sparkles className="h-3.5 w-3.5 text-white" />
        </div>

        {/* Text Area */}
        <textarea
          rows={3}
          value={promptInput}
          onChange={(e) => setPromptInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type / for skills or describe a React component..."
          className="w-full resize-none bg-transparent border-0 text-sm text-[#0F0F11] placeholder-[#4A4A52] focus:outline-none font-normal leading-relaxed pr-10"
        />

        {/* Bottom Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[#E5E5E8]">
          {/* Left Controls: + Button & Mode Pill Switcher */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              title="Add attachment or skill"
              className="p-1.5 text-[#4A4A52] hover:text-[#6E56CF] hover:bg-[#F3F3F5] rounded-[2px] transition-colors"
            >
              <Plus className="h-4 w-4" />
            </button>

            {/* Pill Toggle: [ Chat | Cowork ] */}
            <div className="p-1 bg-[#E5E5E8]/60 rounded-[2px] flex items-center gap-1 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveMode('Chat')}
                className={cn(
                  'px-3 py-1 rounded-[2px] transition-all',
                  activeMode === 'Chat'
                    ? 'bg-white text-[#6E56CF] shadow-none font-bold'
                    : 'text-[#4A4A52] hover:text-[#0F0F11]'
                )}
              >
                Chat
              </button>

              <button
                type="button"
                onClick={() => setActiveMode('Cowork')}
                className={cn(
                  'px-3 py-1 rounded-[2px] transition-all',
                  activeMode === 'Cowork'
                    ? 'bg-white text-[#6E56CF] shadow-none font-bold'
                    : 'text-[#4A4A52] hover:text-[#0F0F11]'
                )}
              >
                Cowork
              </button>
            </div>
          </div>

          {/* Right Controls: Model Dropdown & Mic */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                type="button"
                onClick={() => setModelMenuOpen(!modelMenuOpen)}
                className="flex items-center gap-1 text-xs font-semibold text-[#0F0F11] hover:text-[#6E56CF] transition-colors"
              >
                <span>{activeModel.name}</span>
                <ChevronDown className="h-3.5 w-3.5 text-[#4A4A52]" />
              </button>

              {modelMenuOpen && (
                <div className="absolute bottom-full right-0 mb-1.5 w-56 bg-white border border-[#E5E5E8] rounded-[2px] shadow-none p-1.5 z-50 space-y-1">
                  {MODEL_OPTIONS.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => {
                        onSelectModel(m.id);
                        setModelMenuOpen(false);
                      }}
                      className={cn(
                        'w-full text-left p-2 rounded-[2px] text-xs transition-colors flex flex-col',
                        m.id === activeModelId
                          ? 'bg-[#F4F2FF] text-[#6E56CF] font-bold'
                          : 'hover:bg-[#F3F3F5] text-[#0F0F11]'
                      )}
                    >
                      <span>{m.name}</span>
                      <span className="text-[10.5px] text-[#4A4A52] font-normal">{m.description}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              title="Voice input"
              className="p-1.5 text-[#4A4A52] hover:text-[#6E56CF] transition-colors"
            >
              <Mic className="h-4 w-4" />
            </button>

            <button
              type="button"
              title="Audio mode"
              className="p-1.5 text-[#4A4A52] hover:text-[#6E56CF] transition-colors"
            >
              <AudioWaveform className="h-4 w-4" />
            </button>

            <button
              type="submit"
              disabled={!promptInput.trim()}
              className="h-8 w-8 rounded-[2px] bg-[#6E56CF] hover:bg-[#5B42F3] disabled:opacity-30 text-white flex items-center justify-center transition-colors shadow-none"
              aria-label="Send message"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
