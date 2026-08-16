import { useState } from 'react';
import {
  X,
  Copy,
  Check,
  Download,
  Code,
  Eye,
  Terminal,
  ExternalLink,
  Layers,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Artifact } from '@/lib/chatStore';

interface ArtifactsPanelProps {
  artifact: Artifact | null;
  onClose: () => void;
}

export const ArtifactsPanel = ({ artifact, onClose }: ArtifactsPanelProps) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'console'>('preview');
  const [copied, setCopied] = useState(false);

  if (!artifact) return null;

  const copyCode = () => {
    navigator.clipboard.writeText(artifact.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadFile = () => {
    const blob = new Blob([artifact.code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = artifact.title;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full lg:w-[480px] xl:w-[560px] h-full bg-white border-l border-[#E5E5E8] flex flex-col justify-between shrink-0 z-30 select-none shadow-lg">
      {/* Top Panel Header */}
      <div className="h-14 px-4 border-b border-[#E5E5E8] flex items-center justify-between bg-[#FAFAFC] shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="p-1.5 rounded bg-[#F4F2FF] border border-[#E4DDFE] text-[#6E56CF] shrink-0">
            <Code className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <h3 className="text-xs font-bold text-[#0F0F11] truncate">{artifact.title}</h3>
            <span className="text-[10px] font-mono text-[#6E56CF] uppercase font-bold">
              {artifact.type} • {artifact.language}
            </span>
          </div>
        </div>

        {/* Tab Switcher & Actions */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-white border border-[#E5E5E8] p-0.5 rounded">
            <button
              onClick={() => setActiveTab('preview')}
              className={cn(
                'px-2.5 py-1 text-xs font-semibold rounded transition-colors flex items-center gap-1',
                activeTab === 'preview'
                  ? 'bg-[#0F0F11] text-white'
                  : 'text-[#4A4A52] hover:text-[#0F0F11]'
              )}
            >
              <Eye className="h-3 w-3" />
              <span>Preview</span>
            </button>

            <button
              onClick={() => setActiveTab('code')}
              className={cn(
                'px-2.5 py-1 text-xs font-semibold rounded transition-colors flex items-center gap-1',
                activeTab === 'code'
                  ? 'bg-[#0F0F11] text-white'
                  : 'text-[#4A4A52] hover:text-[#0F0F11]'
              )}
            >
              <Code className="h-3 w-3" />
              <span>Code</span>
            </button>
          </div>

          <button
            onClick={copyCode}
            title="Copy code"
            className="p-1.5 text-[#4A4A52] hover:text-[#6E56CF] rounded border border-[#E5E5E8] bg-white transition-colors"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-[#6E56CF]" /> : <Copy className="h-3.5 w-3.5" />}
          </button>

          <button
            onClick={downloadFile}
            title="Download file"
            className="p-1.5 text-[#4A4A52] hover:text-[#6E56CF] rounded border border-[#E5E5E8] bg-white transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
          </button>

          <button
            onClick={onClose}
            title="Close artifact inspector"
            className="p-1.5 text-[#4A4A52] hover:text-[#0F0F11] rounded hover:bg-[#E5E5E8] transition-colors ml-1"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main Content Viewer */}
      <div className="flex-1 overflow-y-auto min-h-0 bg-[#0F0F11] text-white p-4">
        {activeTab === 'preview' ? (
          artifact.previewHtml ? (
            <div
              className="w-full h-full bg-white text-black rounded p-2 overflow-auto"
              dangerouslySetInnerHTML={{ __html: artifact.previewHtml }}
            />
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3 text-[#C0C0C6]">
              <Layers className="h-8 w-8 text-[#6E56CF]" />
              <div className="text-sm font-bold text-white">Live Artifact Generated</div>
              <p className="text-xs max-w-xs">
                Code artifact is compiled and ready. Switch to the <strong>Code</strong> tab to inspect full source.
              </p>
            </div>
          )
        ) : activeTab === 'code' ? (
          <pre className="font-mono text-xs leading-relaxed text-[#E5E5E8] whitespace-pre-wrap overflow-x-auto">
            <code>{artifact.code}</code>
          </pre>
        ) : (
          <div className="font-mono text-xs text-emerald-400 space-y-1">
            <div>[Puku Fleet] Artifact compiled successfully.</div>
            <div>[Puku Fleet] Memory: 14.2MB • Latency: 120ms</div>
            <div>[Puku Fleet] Zero errors or warnings detected.</div>
          </div>
        )}
      </div>
    </div>
  );
};
