import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowUp,
  Plus,
  ChevronDown,
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
    <section className="py-16 px-4 bg-[#FFFFFF] border-y border-[#E5E5E8] select-none font-sans">
      <div className="max-w-4xl mx-auto space-y-8 text-center">
        {/* Section Header with Official Puku Logo Mark */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] bg-[#F4F2FF] border border-[#6E56CF]/30 text-[#6E56CF] text-xs font-bold font-mono">
            <Sparkles className="h-3.5 w-3.5" />
            <span>PUKU WEB CHAT WORKSPACE</span>
          </div>

          <div className="flex items-center justify-center gap-3">
            <img src="/puku-mark.svg" alt="Puku Logo" className="h-8 w-auto object-contain" />
            <h2 className="font-puku font-brand text-3xl sm:text-4xl font-extrabold text-[#0F0F11] tracking-tight">
              Try Puku Web Chat right here
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#4A4A52] max-w-xl mx-auto font-normal leading-relaxed">
            Type your coding prompt below to launch an autonomous AI engineering workspace directly in your browser.
          </p>
        </div>

        {/* Dedicated Interactive Prompt Input Box */}
        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto bg-[#FAFAFC] border border-[#E5E5E8] rounded-[2px] shadow-none p-4 space-y-4 text-left focus-within:border-[#6E56CF] focus-within:ring-2 focus-within:ring-[#6E56CF]/15 transition-all relative"
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

          {/* Bottom Toolbar: + [ Chat | Cowork ] ... Sonnet 5 High ∨ Send */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[#E5E5E8]">
            {/* Left Controls: + Button & Mode Pill Switcher */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                title="Add attachment or skill"
                className="p-1.5 text-[#4A4A52] hover:text-[#6E56CF] hover:bg-white rounded-[2px] transition-colors"
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

            {/* Right Controls: Model Selector & Send Button */}
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
                          setActiveModelId(m.id);
                          setModelMenuOpen(false);
                        }}
                        className={cn(
                          'w-full text-left p-2 rounded-[2px] text-xs transition-colors flex flex-col',
                          m.id === activeModelId
                            ? 'bg-[#F4F2FF] text-[#6E56CF] font-bold'
                            : 'hover:bg-[#FAFAFC] text-[#0F0F11]'
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
                type="submit"
                className="h-8 w-8 rounded-[2px] bg-[#6E56CF] hover:bg-[#5B42F3] text-white flex items-center justify-center transition-colors shadow-none"
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
                className="p-3 bg-[#FAFAFC] border border-[#E5E5E8] hover:border-[#6E56CF] hover:bg-[#F4F2FF] rounded-[2px] transition-all group shadow-none flex items-start gap-3"
              >
                <div className="p-2 rounded-[2px] bg-white border border-[#E5E5E8] group-hover:border-[#6E56CF]/40 text-[#6E56CF] shrink-0 transition-colors">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-[#0F0F11] group-hover:text-[#6E56CF] transition-colors truncate">
                    {card.title}
                  </div>
                  <div className="text-[11px] text-[#4A4A52] font-normal truncate mt-0.5">
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
