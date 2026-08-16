import { useState } from 'react';
import {
  X,
  ChevronDown,
  Globe,
  FileCode,
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
    <div className="w-[300px] sm:w-[320px] h-full bg-white border-l border-[#E5E5E8] flex flex-col justify-between shrink-0 z-30 select-none font-sans text-[#0F0F11]">
      {/* Top Header */}
      <div className="p-3.5 bg-[#f5f5f7] border-b border-[#E5E5E8] flex items-center justify-between">
        <span className="text-xs font-bold text-[#0F0F11]">Task Memory & Context</span>
        <button
          onClick={onClose}
          className="p-1 text-[#4A4A52] hover:text-[#6E56CF] rounded-[2px] hover:bg-[#E5E5E8]"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Accordions: Progress, Outputs, Context */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-4 text-xs font-medium">
        {/* Progress Accordion */}
        <div className="space-y-2 border-b border-[#E5E5E8] pb-3.5">
          <button
            onClick={() => setProgressOpen(!progressOpen)}
            className="w-full flex items-center justify-between font-bold text-[#0F0F11]"
          >
            <div className="flex items-center gap-1.5">
              <span>Progress</span>
              <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', !progressOpen && '-rotate-90')} />
            </div>
          </button>

          {progressOpen && (
            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-2 text-[#6E56CF] font-mono text-sm">
                <div className="h-5 w-5 rounded-[2px] border border-[#6E56CF] flex items-center justify-center text-[10px] font-bold bg-[#F4F2FF]">
                  ✓
                </div>
                <span>—</span>
                <div className="h-5 w-5 rounded-[2px] border border-[#6E56CF] flex items-center justify-center text-[10px] font-bold bg-[#F4F2FF]">
                  ✓
                </div>
                <span>—</span>
                <div className="h-5 w-5 rounded-[2px] border border-[#E5E5E8] text-[#4A4A52] flex items-center justify-center text-[10px]" />
              </div>
              <p className="text-[11px] text-[#4A4A52] font-normal leading-relaxed">
                See task progress for longer tasks.
              </p>
            </div>
          )}
        </div>

        {/* Outputs Accordion */}
        <div className="space-y-2 border-b border-[#E5E5E8] pb-3.5">
          <button
            onClick={() => setOutputsOpen(!outputsOpen)}
            className="w-full flex items-center justify-between font-bold text-[#0F0F11]"
          >
            <div className="flex items-center gap-1.5">
              <span>Outputs</span>
              <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', !outputsOpen && '-rotate-90')} />
            </div>
          </button>

          {outputsOpen && (
            <div className="space-y-2 pt-1">
              {artifact ? (
                <div className="p-3 bg-[#FAFAFC] border border-[#E5E5E8] rounded-[2px] space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0F0F11]">
                    <FileCode className="h-4 w-4 text-[#6E56CF]" />
                    <span className="truncate">{artifact.title}</span>
                  </div>
                  <div className="text-[10.5px] font-mono text-[#4A4A52]">
                    {artifact.type} • {artifact.language}
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-[#FAFAFC] border border-[#E5E5E8] rounded-[2px] flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-[#4A4A52]" />
                  <span className="text-[11px] text-[#4A4A52]">View and open files created during this task.</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Context Accordion */}
        <div className="space-y-2">
          <button
            onClick={() => setContextOpen(!contextOpen)}
            className="w-full flex items-center justify-between font-bold text-[#0F0F11]"
          >
            <div className="flex items-center gap-1.5">
              <span>Context</span>
              <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', !contextOpen && '-rotate-90')} />
            </div>
          </button>

          {contextOpen && (
            <div className="space-y-2 pt-1">
              <div className="text-[11px] text-[#4A4A52]">Connectors</div>
              <div className="inline-flex items-center gap-1.5 bg-[#FAFAFC] border border-[#E5E5E8] px-2.5 py-1 rounded-[2px] text-xs text-[#0F0F11] font-semibold">
                <Globe className="h-3.5 w-3.5 text-[#6E56CF]" />
                <span>Web Search</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
