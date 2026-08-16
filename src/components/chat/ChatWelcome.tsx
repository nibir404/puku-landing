import { useState } from 'react';
import {
  ArrowUp,
  Paperclip,
  Sparkles,
  Zap,
  ShieldAlert,
  Code2,
  Bot,
  Layers,
  Terminal,
  FileCode,
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
    icon: LayoutGridIcon,
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

function LayoutGridIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  );
}

export const ChatWelcome = ({
  activeModelId,
  onSelectModel,
  onSendPrompt,
}: ChatWelcomeProps) => {
  const [promptInput, setPromptInput] = useState('');

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
    <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 max-w-4xl mx-auto w-full select-none">
      {/* Brand Icon Header */}
      <div className="flex flex-col items-center text-center space-y-4 mb-8">
        <div className="h-12 w-12 rounded-xl bg-[#F4F2FF] border border-[#E4DDFE] flex items-center justify-center shadow-xs">
          <img src="/puku-mark.svg" alt="Puku Logo" className="h-7 w-auto object-contain" />
        </div>

        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0F0F11] tracking-tight">
          What would you like to build today?
        </h1>
        <p className="text-sm text-[#4A4A52] max-w-lg font-normal">
          Puku Web Chat understands your entire codebase, generates live artifacts, and executes parallel cloud agent tasks.
        </p>
      </div>

      {/* Dedicated Claude-Style Central Input Box */}
      <form onSubmit={handleSubmit} className="w-full bg-white border border-[#E5E5E8] rounded-xl shadow-lg p-3.5 space-y-3 focus-within:border-[#6E56CF] focus-within:ring-2 focus-within:ring-[#6E56CF]/20 transition-all mb-8">
        <textarea
          rows={3}
          value={promptInput}
          onChange={(e) => setPromptInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Puku anything or describe a component to generate..."
          className="w-full resize-none bg-transparent border-0 text-sm text-[#0F0F11] placeholder-[#4A4A52] focus:outline-none font-normal leading-relaxed"
        />

        <div className="flex items-center justify-between pt-2 border-t border-[#E5E5E8]">
          {/* Left Actions: Model Selector Pill & File Attachment */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-[#FAFAFC] border border-[#E5E5E8] px-2.5 py-1 rounded text-xs font-semibold text-[#0F0F11]">
              <Bot className="h-3.5 w-3.5 text-[#6E56CF]" />
              {MODEL_OPTIONS.find((m) => m.id === activeModelId)?.name}
            </div>

            <button
              type="button"
              title="Attach code file or image"
              className="p-1.5 text-[#4A4A52] hover:text-[#6E56CF] hover:bg-[#FAFAFC] rounded transition-colors"
            >
              <Paperclip className="h-4 w-4" />
            </button>
          </div>

          {/* Right Action: Dedicated Send Button */}
          <button
            type="submit"
            disabled={!promptInput.trim()}
            className="h-8 px-3.5 bg-[#0F0F11] disabled:opacity-30 hover:bg-[#6E56CF] text-white font-semibold text-xs rounded transition-colors flex items-center gap-1.5"
          >
            <span>Send</span>
            <ArrowUp className="h-3.5 w-3.5" />
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
              className="p-3.5 bg-white border border-[#E5E5E8] hover:border-[#6E56CF] rounded-lg text-left transition-all group hover:shadow-xs flex items-start gap-3"
            >
              <div className="p-2 rounded bg-[#FAFAFC] border border-[#E5E5E8] group-hover:bg-[#F4F2FF] group-hover:border-[#E4DDFE] text-[#6E56CF] shrink-0 transition-colors">
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-[#0F0F11] group-hover:text-[#6E56CF] transition-colors truncate">
                  {card.title}
                </div>
                <div className="text-[11.5px] text-[#4A4A52] font-normal truncate mt-0.5">
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
