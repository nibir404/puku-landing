import { useState } from 'react';
import { FileText, Download, Upload, Search, FileCode, ExternalLink } from 'lucide-react';

export const FilesWorkspace = () => {
  const [search, setSearch] = useState('');

  const files = [
    { name: 'AnalyticsDashboard.tsx', type: 'React Component', size: '4.2 KB', usedIn: 'Chat & Code', date: '10 mins ago' },
    { name: 'types.ts', type: 'TypeScript Definitions', size: '1.8 KB', usedIn: 'Code Session', date: '1 hour ago' },
    { name: 'Competitor_Strategy_Matrix.pdf', type: 'PDF Document', size: '2.4 MB', usedIn: 'Co-work Task', date: '2 hours ago' },
    { name: 'PRD_Puku_Workspace.md', type: 'Markdown Spec', size: '18 KB', usedIn: 'Project Instructions', date: '1 day ago' },
  ];

  const filtered = files.filter((f) => f.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 bg-[#f5f5f7] font-sans text-[#0F0F11] select-none">
      {/* Header Bar */}
      <div className="bg-white border border-[#E5E5E8] rounded-[2px] p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-puku font-brand text-2xl font-extrabold text-[#0F0F11]">
              Workspace Files & Artifacts
            </h1>
            <p className="text-xs text-[#4A4A52] mt-0.5">
              All files uploaded, generated, or referenced across Chat, Co-work, and Code.
            </p>
          </div>

          <button className="px-4 py-2 bg-[#0F0F11] hover:bg-[#6E56CF] text-white font-semibold text-xs rounded-[2px] transition-colors flex items-center gap-1.5 shrink-0">
            <Upload className="h-4 w-4" />
            <span>Upload File</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#4A4A52]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search workspace files..."
            className="w-full pl-9 pr-4 py-2 bg-[#FAFAFC] border border-[#E5E5E8] focus:border-[#6E56CF] rounded-[2px] text-xs text-[#0F0F11] placeholder-[#4A4A52] focus:outline-none"
          />
        </div>
      </div>

      {/* Files List */}
      <div className="bg-white border border-[#E5E5E8] rounded-[2px] p-5 space-y-3">
        <div className="text-xs font-bold font-mono text-[#0F0F11] uppercase tracking-wider border-b border-[#E5E5E8] pb-3">
          Indexed Workspace Files ({filtered.length})
        </div>

        <div className="space-y-2">
          {filtered.map((f, idx) => (
            <div
              key={idx}
              className="p-3 bg-[#FAFAFC] border border-[#E5E5E8] hover:border-[#6E56CF] rounded-[2px] flex items-center justify-between transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white border border-[#E5E5E8] text-[#6E56CF] rounded-[2px]">
                  <FileCode className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-bold text-xs text-[#0F0F11] group-hover:text-[#6E56CF] transition-colors">
                    {f.name}
                  </div>
                  <div className="text-[11px] font-mono text-[#4A4A52]">
                    {f.type} • {f.size} • Used in: <span className="font-bold text-[#6E56CF]">{f.usedIn}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10.5px] font-mono text-[#4A4A52]">{f.date}</span>
                <button
                  onClick={() => alert(`Downloading ${f.name}`)}
                  className="p-1.5 bg-white hover:bg-[#F3F3F5] border border-[#E5E5E8] rounded-[2px] text-[#4A4A52] hover:text-[#6E56CF]"
                  title="Download file"
                >
                  <Download className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
