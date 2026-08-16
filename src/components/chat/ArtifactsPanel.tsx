import { useState } from 'react';
import {
  X,
  Check,
  ChevronDown,
  Globe,
  FileCode,
  Layers,
  Sparkles,
  BarChart3,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Artifact } from '@/lib/chatStore';

interface ArtifactsPanelProps {
  artifact: Artifact | null;
  onClose: () => void;
}

export const ArtifactsPanel = ({ artifact, onClose }: ArtifactsPanelProps) => {
  const [progressOpen, setProgressOpen] = useState(true);
  const [outputsOpen, setOutputsOpen] = useState(true);
  const [contextOpen, setContextOpen] = useState(true);

  return (
    <div className="w-[300px] sm:w-[320px] h-full bg-[#FAF9F5] border-l border-[#E2E0D8] flex flex-col justify-between shrink-0 z-30 select-none font-sans text-[#1F1F1E]">
      {/* Top Header */}
      <div className="p-3.5 border-b border-[#E2E0D8] flex items-center justify-between">
        <span className="text-xs font-bold text-[#1F1F1E]">Task Memory & Context</span>
        <button
          onClick={onClose}
          className="p-1 text-[#66645E] hover:text-[#1F1F1E] rounded hover:bg-[#F0EEE6]"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Accordions Matching Screenshot 2: Progress, Outputs, Context */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-4 text-xs font-medium">
        {/* Progress Accordion matching Screenshot 2 */}
        <div className="space-y-2 border-b border-[#E2E0D8] pb-3.5">
          <button
            onClick={() => setProgressOpen(!progressOpen)}
            className="w-full flex items-center justify-between font-bold text-[#1F1F1E]"
          >
            <div className="flex items-center gap-1.5">
              <span>Progress</span>
              <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', !progressOpen && '-rotate-90')} />
            </div>
          </button>

          {progressOpen && (
            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-2 text-emerald-600 font-mono text-sm">
                <div className="h-5 w-5 rounded-full border border-emerald-600 flex items-center justify-center text-[10px] font-bold">
                  ✓
                </div>
                <span>—</span>
                <div className="h-5 w-5 rounded-full border border-emerald-600 flex items-center justify-center text-[10px] font-bold">
                  ✓
                </div>
                <span>—</span>
                <div className="h-5 w-5 rounded-full border border-neutral-300 text-neutral-400 flex items-center justify-center text-[10px]" />
              </div>
              <p className="text-[11px] text-[#66645E] font-normal leading-relaxed">
                See task progress for longer tasks.
              </p>
            </div>
          )}
        </div>

        {/* Outputs Accordion matching Screenshot 2 */}
        <div className="space-y-2 border-b border-[#E2E0D8] pb-3.5">
          <button
            onClick={() => setOutputsOpen(!outputsOpen)}
            className="w-full flex items-center justify-between font-bold text-[#1F1F1E]"
          >
            <div className="flex items-center gap-1.5">
              <span>Outputs</span>
              <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', !outputsOpen && '-rotate-90')} />
            </div>
          </button>

          {outputsOpen && (
            <div className="space-y-2 pt-1">
              {artifact ? (
                <div className="p-3 bg-white border border-[#E2E0D8] rounded-xl space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#1F1F1E]">
                    <FileCode className="h-4 w-4 text-[#DA7756]" />
                    <span className="truncate">{artifact.title}</span>
                  </div>
                  <div className="text-[10.5px] font-mono text-[#66645E]">
                    {artifact.type} • {artifact.language}
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-white border border-[#E2E0D8] rounded-xl flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-[#66645E]" />
                  <span className="text-[11px] text-[#66645E]">View and open files created during this task.</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Context Accordion matching Screenshot 2 */}
        <div className="space-y-2">
          <button
            onClick={() => setContextOpen(!contextOpen)}
            className="w-full flex items-center justify-between font-bold text-[#1F1F1E]"
          >
            <div className="flex items-center gap-1.5">
              <span>Context</span>
              <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', !contextOpen && '-rotate-90')} />
            </div>
          </button>

          {contextOpen && (
            <div className="space-y-2 pt-1">
              <div className="text-[11px] text-[#66645E]">Connectors</div>
              <div className="inline-flex items-center gap-1.5 bg-white border border-[#E2E0D8] px-2.5 py-1 rounded-xl text-xs text-[#1F1F1E] font-semibold">
                <Globe className="h-3.5 w-3.5 text-[#66645E]" />
                <span>Web Search</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
