import { useState } from 'react';
import {
  X,
  ChevronDown,
  Globe,
  FileCode,
  BarChart3,
  Copy,
  Check,
  Download,
  Code2,
  Eye,
  Terminal,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Artifact } from '@/lib/chatStore';

interface ArtifactsPanelProps {
  artifact: Artifact | null;
  onClose: () => void;
}

export const ArtifactsPanel = ({ artifact, onClose }: ArtifactsPanelProps) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'console'>('code');
  const [copied, setCopied] = useState(false);
  const [progressOpen, setProgressOpen] = useState(true);
  const [outputsOpen, setOutputsOpen] = useState(true);
  const [contextOpen, setContextOpen] = useState(true);

  const handleCopyCode = () => {
    if (artifact?.code) {
      navigator.clipboard.writeText(artifact.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadFile = () => {
    if (!artifact) return;
    const blob = new Blob([artifact.code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = artifact.title || 'puku_artifact.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-[300px] sm:w-[340px] h-full bg-white border-l border-[#E5E5E8] flex flex-col justify-between shrink-0 z-30 select-none font-sans text-[#0F0F11]">
      {/* Top Header Bar */}
      <div className="p-3.5 bg-[#f5f5f7] border-b border-[#E5E5E8] flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <FileCode className="h-4 w-4 text-[#6E56CF] shrink-0" />
          <span className="text-xs font-bold text-[#0F0F11] font-puku font-brand truncate">
            {artifact ? artifact.title : 'Task Inspector & Memory'}
          </span>
        </div>

        <button
          onClick={onClose}
          className="p-1 text-[#4A4A52] hover:text-[#6E56CF] rounded-[2px] hover:bg-[#E5E5E8]"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Artifact Code / Preview View */}
      {artifact ? (
        <div className="flex-1 flex flex-col min-h-0 bg-[#FFFFFF]">
          {/* Sub-Header Tabs & Actions */}
          <div className="px-3 py-2 border-b border-[#E5E5E8] bg-[#FAFAFC] flex items-center justify-between gap-2">
            <div className="flex items-center gap-1 bg-[#E5E5E8]/60 p-0.5 rounded-[2px] text-xs font-semibold">
              <button
                onClick={() => setActiveTab('code')}
                className={cn(
                  'px-2.5 py-1 rounded-[2px] flex items-center gap-1 transition-all',
                  activeTab === 'code' ? 'bg-white text-[#6E56CF] font-bold shadow-none' : 'text-[#4A4A52] hover:text-[#0F0F11]'
                )}
              >
                <Code2 className="h-3 w-3" />
                <span>Code</span>
              </button>

              <button
                onClick={() => setActiveTab('preview')}
                className={cn(
                  'px-2.5 py-1 rounded-[2px] flex items-center gap-1 transition-all',
                  activeTab === 'preview' ? 'bg-white text-[#6E56CF] font-bold shadow-none' : 'text-[#4A4A52] hover:text-[#0F0F11]'
                )}
              >
                <Eye className="h-3 w-3" />
                <span>Preview</span>
              </button>

              <button
                onClick={() => setActiveTab('console')}
                className={cn(
                  'px-2.5 py-1 rounded-[2px] flex items-center gap-1 transition-all',
                  activeTab === 'console' ? 'bg-white text-[#6E56CF] font-bold shadow-none' : 'text-[#4A4A52] hover:text-[#0F0F11]'
                )}
              >
                <Terminal className="h-3 w-3" />
                <span>Console</span>
              </button>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleCopyCode}
                title="Copy code"
                className="p-1.5 text-[#4A4A52] hover:text-[#6E56CF] hover:bg-[#E5E5E8] rounded-[2px] transition-colors flex items-center gap-1 text-[11px] font-semibold"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                    <span className="text-emerald-600">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>

              <button
                onClick={handleDownloadFile}
                title="Download file"
                className="p-1.5 bg-[#6E56CF] hover:bg-[#5B42F3] text-white rounded-[2px] transition-colors flex items-center gap-1 text-[11px] font-semibold"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download</span>
              </button>
            </div>
          </div>

          {/* Main Tab Content */}
          <div className="flex-1 overflow-y-auto p-3 font-mono text-xs text-[#0F0F11] bg-[#FAFAFC]">
            {activeTab === 'code' && (
              <pre className="p-3 bg-white border border-[#E5E5E8] rounded-[2px] leading-relaxed overflow-x-auto whitespace-pre font-mono text-[11.5px] text-[#0F0F11]">
                <code>{artifact.code}</code>
              </pre>
            )}

            {activeTab === 'preview' && (
              <div className="p-4 bg-white border border-[#E5E5E8] rounded-[2px] text-center space-y-3">
                <div className="text-xs font-bold text-[#0F0F11]">Live Component Preview</div>
                <div className="p-3 bg-[#F4F2FF] border border-[#6E56CF]/20 rounded-[2px] text-xs text-[#6E56CF] font-semibold">
                  Component: {artifact.title} (v{artifact.version || 1})
                </div>
                <p className="text-[11px] text-[#4A4A52] font-normal leading-relaxed font-sans">
                  The generated code block is verified and ready for production import into your workspace.
                </p>
              </div>
            )}

            {activeTab === 'console' && (
              <div className="p-3 bg-[#0F0F11] text-emerald-400 rounded-[2px] font-mono text-[11px] space-y-1">
                <div>[PUKU FLEET ENGINE] Task started...</div>
                <div>[CHECK] Syntax analysis complete (0 errors)</div>
                <div>[BUILD] Artifact compiled cleanly: {artifact.title}</div>
                <div>[STATUS] Memory cached in task context.</div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Accordions when no artifact is open */
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
                  Task telemetry and execution step progress.
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
                <div className="p-3 bg-[#FAFAFC] border border-[#E5E5E8] rounded-[2px] flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-[#4A4A52]" />
                  <span className="text-[11px] text-[#4A4A52]">Files and code artifacts generated during tasks.</span>
                </div>
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
      )}
    </div>
  );
};
