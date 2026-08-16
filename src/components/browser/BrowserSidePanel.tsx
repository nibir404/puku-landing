import { useState } from 'react';
import { Globe, X, MousePointer, Eye, CheckCircle2, ArrowRight, MessageSquare, CheckSquare, Code2 } from 'lucide-react';

interface BrowserSidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateModule: (mod: 'chat' | 'cowork' | 'code') => void;
}

export const BrowserSidePanel = ({ isOpen, onClose, onNavigateModule }: BrowserSidePanelProps) => {
  if (!isOpen) return null;

  return (
    <div className="w-[300px] sm:w-[320px] h-full bg-white border-l border-[#E5E5E8] flex flex-col justify-between shrink-0 z-40 select-none font-sans text-[#0F0F11]">
      {/* Header */}
      <div className="p-3.5 bg-[#f5f5f7] border-b border-[#E5E5E8] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4 text-[#6E56CF]" />
          <span className="font-bold text-xs text-[#0F0F11] font-mono">Browser Context Agent</span>
        </div>
        <button
          onClick={onClose}
          className="p-1 text-[#4A4A52] hover:text-[#0F0F11] rounded-[2px] hover:bg-[#E5E5E8]"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Content Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs font-medium bg-[#FAFAFC]">
        {/* Active Page Card */}
        <div className="p-3.5 bg-white border border-[#E5E5E8] rounded-[2px] space-y-1.5">
          <div className="text-[10.5px] font-mono text-[#4A4A52] uppercase font-bold">Active Tab Context</div>
          <div className="font-bold text-xs text-[#0F0F11]">Puku Cloud Analytics Dashboard</div>
          <div className="text-[11px] font-mono text-[#6E56CF] truncate">http://localhost:3000/analytics</div>
        </div>

        {/* AI Browser Actions Log */}
        <div className="p-3.5 bg-white border border-[#E5E5E8] rounded-[2px] space-y-2">
          <div className="text-[10.5px] font-mono text-[#4A4A52] uppercase font-bold border-b border-[#E5E5E8] pb-1.5">
            Agent Actions History
          </div>
          <div className="space-y-1.5 font-mono text-[11px] text-[#0F0F11]">
            <div className="flex items-center gap-1.5 text-emerald-600 font-bold">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>👁 Reading DOM tree</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-600 font-bold">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>🖱 Clicking "Compare Plans"</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-600 font-bold">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>✓ Visual QA check passed</span>
            </div>
          </div>
        </div>

        {/* Handoff Buttons */}
        <div className="space-y-2 pt-2">
          <div className="text-[10.5px] font-mono text-[#4A4A52] uppercase font-bold">Send Page Context To:</div>
          <button
            onClick={() => onNavigateModule('chat')}
            className="w-full p-2 bg-white hover:bg-[#F3F3F5] border border-[#E5E5E8] rounded-[2px] text-xs font-semibold text-[#0F0F11] flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <MessageSquare className="h-3.5 w-3.5 text-[#6E56CF]" />
              <span>Send to Chat</span>
            </div>
            <ArrowRight className="h-3 w-3 text-[#4A4A52]" />
          </button>

          <button
            onClick={() => onNavigateModule('cowork')}
            className="w-full p-2 bg-white hover:bg-[#F3F3F5] border border-[#E5E5E8] rounded-[2px] text-xs font-semibold text-[#0F0F11] flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <CheckSquare className="h-3.5 w-3.5 text-[#6E56CF]" />
              <span>Send to Co-work Task</span>
            </div>
            <ArrowRight className="h-3 w-3 text-[#4A4A52]" />
          </button>

          <button
            onClick={() => onNavigateModule('code')}
            className="w-full p-2 bg-white hover:bg-[#F3F3F5] border border-[#E5E5E8] rounded-[2px] text-xs font-semibold text-[#0F0F11] flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Code2 className="h-3.5 w-3.5 text-[#6E56CF]" />
              <span>Send Issue to Code</span>
            </div>
            <ArrowRight className="h-3 w-3 text-[#4A4A52]" />
          </button>
        </div>
      </div>
    </div>
  );
};
