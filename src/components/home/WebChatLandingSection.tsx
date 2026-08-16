import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowUp,
  Plus,
  Mic,
  AudioWaveform,
  ChevronDown,
  Bot,
  Sparkles,
  Code2,
  ShieldAlert,
  FileCode,
  LayoutGrid,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MODEL_OPTIONS, ModelId } from '@/lib/chatStore';

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

export const WebChatLandingSection = () => {
  const navigate = useNavigate();
  const [promptInput, setPromptInput] = useState('');
  const [activeMode, setActiveMode] = useState<'Chat' | 'Cowork'>('Chat');
  const [activeModelId, setActiveModelId] = useState<ModelId>('sonnet-5-high');
  const [modelMenuOpen, setModelMenuOpen] = useState(false);

  const activeModel = MODEL_OPTIONS.find((m) => m.id === activeModelId) || MODEL_OPTIONS[0];

  const handleLaunchChat = (text: string) => {
    if (text.trim()) {
      navigate('/chat', { state: { initialPrompt: text.trim(), modelId: activeModelId } });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLaunchChat(promptInput);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <section className="py-16 px-4 bg-[#FAF9F5] border-y border-[#E2E0D8] select-none font-sans">
      <div className="max-w-4xl mx-auto space-y-8 text-center">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF0EC] border border-[#DA7756]/20 text-[#DA7756] text-xs font-bold font-mono">
            <span>✳️</span>
            <span>PUKU WEB CHAT WORKSPACE</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1F1F1E] tracking-tight">
            Try Puku Web Chat right here
          </h2>
          <p className="text-sm sm:text-base text-[#66645E] max-w-xl mx-auto font-normal leading-relaxed">
            Type your coding prompt below to launch an autonomous AI engineering workspace directly in your browser.
          </p>
        </div>

        {/* Dedicated Interactive Claude Light Mode Prompt Input Box */}
        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto bg-white border border-[#E2E0D8] rounded-2xl shadow-md p-4 space-y-4 text-left focus-within:border-[#DA7756] focus-within:ring-2 focus-within:ring-[#DA7756]/15 transition-all relative"
        >
          {/* Top Right Green Robot Icon Badge */}
          <div className="absolute top-4 right-4 h-6 w-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
            <Bot className="h-3.5 w-3.5 text-white" />
          </div>

          {/* Text Area */}
          <textarea
            rows={3}
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type / for skills or describe a React component..."
            className="w-full resize-none bg-transparent border-0 text-sm text-[#1F1F1E] placeholder-[#88857C] focus:outline-none font-normal leading-relaxed pr-10"
          />

          {/* Bottom Toolbar: + [ Chat | Cowork ] ... Sonnet 5 High ∨ 🎤 🎙️ */}
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

            {/* Right Controls: Model Selector & Send Button */}
            <div className="flex items-center gap-3">
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
                          setActiveModelId(m.id);
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
                type="submit"
                className="h-8 w-8 rounded-full bg-[#DA7756] hover:bg-[#C26242] text-white flex items-center justify-center transition-colors shadow-xs"
                aria-label="Launch Web Chat"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
            </div>
          </div>
        </form>

        {/* Preset Starter Prompt Cards */}
        <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
          {STARTER_PROMPTS.map((card, i) => {
            const Icon = card.icon;
            return (
              <button
                key={i}
                onClick={() => handleLaunchChat(card.prompt)}
                className="p-3 bg-white border border-[#E2E0D8] hover:border-[#DA7756] rounded-xl transition-all group hover:shadow-xs flex items-start gap-3"
              >
                <div className="p-2 rounded-lg bg-[#FAF9F5] border border-[#E2E0D8] group-hover:bg-[#FAF0EC] group-hover:border-[#DA7756]/30 text-[#DA7756] shrink-0 transition-colors">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-[#1F1F1E] group-hover:text-[#DA7756] transition-colors truncate">
                    {card.title}
                  </div>
                  <div className="text-[11px] text-[#66645E] font-normal truncate mt-0.5">
                    {card.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
