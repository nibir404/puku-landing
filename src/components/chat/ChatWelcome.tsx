import { useState } from 'react';
import {
  ArrowUp,
  Paperclip,
  Sparkles,
  Zap,
  ShieldAlert,
  Code2,
  Bot,
  FileCode,
  SlidersHorizontal,
  ChevronDown,
  LayoutGrid,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ModelId, MODEL_OPTIONS } from '@/lib/chatStore';

interface ChatWelcomeProps {
  activeModelId: ModelId;
  onSelectModel: (modelId: ModelId) => void;
  onSendPrompt: (promptText: string) => void;
}

const STARTER_PROMPTS = [
  {
    title: 'Build a React Dashboard',
    desc: 'Full-stack UI component with stats, charts & Tailwind CSS',
    icon: LayoutGrid,
    prompt: 'Create a full React Analytics Dashboard UI component with stat metrics, interactive charts, and Tailwind CSS styling.',
  },
  {
    title: 'TypeScript Type Refactor',
    desc: 'Strict discriminated unions & payload type guards',
    icon: Code2,
    prompt: 'Refactor our TypeScript workspace types to enforce strict discriminated unions across API payloads.',
  },
  {
    title: 'WCAG AAA Accessibility Audit',
    desc: 'Audit buttons, color contrast, and keyboard navigation',
    icon: ShieldAlert,
    prompt: 'Audit our landing page buttons and navigation bar for WCAG 2.1 & 2.2 AAA accessibility compliance.',
  },
  {
    title: 'Generate OpenAPI Spec',
    desc: 'REST API schemas, type definitions & client SDK',
    icon: FileCode,
    prompt: 'Generate an OpenAPI 3.1 schema spec and type-safe fetch client for our user management API endpoints.',
  },
];

export const ChatWelcome = ({
  activeModelId,
  onSelectModel,
  onSendPrompt,
}: ChatWelcomeProps) => {
  const [promptInput, setPromptInput] = useState('');
  const [modelMenuOpen, setModelMenuOpen] = useState(false);

  const activeModel = MODEL_OPTIONS.find((m) => m.id === activeModelId) || MODEL_OPTIONS[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (promptInput.trim()) {
      onSendPrompt(promptInput.trim());
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
    <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 max-w-3xl mx-auto w-full select-none bg-[#FAF9F5]">
      {/* Header Greeting in Warm Claude Serif Typography */}
      <div className="flex flex-col items-center text-center space-y-3 mb-8">
        <div className="h-10 w-10 rounded-full bg-[#DA7756] text-white flex items-center justify-center font-bold text-base shadow-xs mb-2">
          P
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#1F1F1E] tracking-tight">
          What would you like to build today?
        </h1>
        <p className="text-sm text-[#66645E] max-w-lg font-normal leading-relaxed">
          Puku Web Chat understands your entire codebase, generates live artifacts, and executes parallel cloud agent tasks.
        </p>
      </div>

      {/* Claude Signature Large Input Card Box */}
      <form
        onSubmit={handleSubmit}
        className="w-full bg-white border border-[#E2E0D8] rounded-2xl shadow-md p-4 space-y-3 focus-within:border-[#DA7756] focus-within:ring-2 focus-within:ring-[#DA7756]/15 transition-all mb-8 relative"
      >
        <textarea
          rows={3}
          value={promptInput}
          onChange={(e) => setPromptInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Puku anything or describe a component to generate..."
          className="w-full resize-none bg-transparent border-0 text-sm text-[#1F1F1E] placeholder-[#88857C] focus:outline-none font-normal leading-relaxed"
        />

        <div className="flex items-center justify-between pt-2 border-t border-[#F2F0E8]">
          {/* Model Selector & Attach File */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                type="button"
                onClick={() => setModelMenuOpen(!modelMenuOpen)}
                className="flex items-center gap-1.5 bg-[#FAF9F5] hover:bg-[#F2F0E8] border border-[#E2E0D8] px-3 py-1.5 rounded-lg text-xs font-semibold text-[#1F1F1E] transition-colors"
              >
                <div className="h-2 w-2 rounded-full bg-[#DA7756]" />
                <span>{activeModel.name}</span>
                <ChevronDown className="h-3.5 w-3.5 text-[#66645E]" />
              </button>

              {modelMenuOpen && (
                <div className="absolute top-full left-0 mt-1.5 w-64 bg-white border border-[#E2E0D8] rounded-xl shadow-xl p-1.5 z-50 space-y-1">
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
                        m.id === activeModelId ? 'bg-[#FAF9F5] text-[#DA7756] font-bold' : 'hover:bg-[#F5F3ED] text-[#1F1F1E]'
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
              title="Attach code file or screenshot"
              className="p-2 text-[#66645E] hover:text-[#1F1F1E] hover:bg-[#FAF9F5] rounded-lg transition-colors"
            >
              <Paperclip className="h-4 w-4" />
            </button>
          </div>

          {/* Claude Circular Send Button */}
          <button
            type="submit"
            disabled={!promptInput.trim()}
            className="h-8 w-8 rounded-full bg-[#DA7756] disabled:opacity-30 hover:bg-[#C26242] text-white flex items-center justify-center transition-colors shadow-xs"
            aria-label="Send message"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </form>

      {/* Preset Starter Cards */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
        {STARTER_PROMPTS.map((card, i) => {
          const Icon = card.icon;
          return (
            <button
              key={i}
              onClick={() => onSendPrompt(card.prompt)}
              className="p-3.5 bg-white border border-[#E2E0D8] hover:border-[#DA7756] rounded-xl text-left transition-all group hover:shadow-sm flex items-start gap-3"
            >
              <div className="p-2 rounded-lg bg-[#FAF9F5] border border-[#E2E0D8] group-hover:bg-[#FAF0EC] group-hover:border-[#DA7756]/30 text-[#DA7756] shrink-0 transition-colors">
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-[#1F1F1E] group-hover:text-[#DA7756] transition-colors truncate">
                  {card.title}
                </div>
                <div className="text-[11.5px] text-[#66645E] font-normal truncate mt-0.5">
                  {card.desc}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
