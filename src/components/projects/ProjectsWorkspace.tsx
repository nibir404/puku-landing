import { useState } from 'react';
import { FolderGit2, Plus, FileText, CheckSquare, Code2, MessageSquare, ArrowUpRight } from 'lucide-react';
import { ProjectItem } from '@/lib/chatStore';

interface ProjectsWorkspaceProps {
  projects: ProjectItem[];
  onNavigateModule: (module: 'chat' | 'cowork' | 'code') => void;
}

export const ProjectsWorkspace = ({ projects, onNavigateModule }: ProjectsWorkspaceProps) => {
  const [activeProject, setActiveProject] = useState<ProjectItem>(projects[0]);

  return (
    <div className="flex-1 flex flex-col md:flex-row min-h-0 bg-[#f5f5f7] font-sans text-[#0F0F11] select-none">
      {/* Left Column: Projects List */}
      <div className="w-full md:w-[280px] bg-white border-r border-[#E5E5E8] flex flex-col justify-between shrink-0 p-3.5 space-y-3">
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <FolderGit2 className="h-4 w-4 text-[#6E56CF]" />
              <span className="font-bold text-sm text-[#0F0F11]">Projects</span>
            </div>
          </div>

          <div className="space-y-1">
            {projects.map((p) => (
              <div
                key={p.id}
                onClick={() => setActiveProject(p)}
                className={`p-3 rounded-[2px] cursor-pointer transition-all border ${
                  activeProject.id === p.id
                    ? 'bg-[#F4F2FF] border-[#6E56CF]/30 text-[#6E56CF] font-bold'
                    : 'bg-white border-[#E5E5E8] text-[#4A4A52] hover:text-[#0F0F11]'
                }`}
              >
                <div className="text-xs font-bold font-puku font-brand">{p.name}</div>
                <div className="text-[10.5px] font-mono text-[#4A4A52] mt-0.5">{p.updatedAt}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Workspace Column */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
        {/* Project Header */}
        <div className="bg-white border border-[#E5E5E8] rounded-[2px] p-6 space-y-3">
          <div className="flex items-center justify-between">
            <h1 className="font-puku font-brand text-2xl font-extrabold text-[#0F0F11]">
              {activeProject.name}
            </h1>
            <span className="text-xs font-mono text-[#4A4A52]">Updated {activeProject.updatedAt}</span>
          </div>
          <p className="text-xs text-[#4A4A52]">{activeProject.tagline}</p>

          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => onNavigateModule('chat')}
              className="px-3 py-1.5 bg-[#0F0F11] hover:bg-[#6E56CF] text-white text-xs font-semibold rounded-[2px] transition-colors flex items-center gap-1"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span>Project Chat</span>
            </button>

            <button
              onClick={() => onNavigateModule('cowork')}
              className="px-3 py-1.5 bg-white border border-[#E5E5E8] text-[#0F0F11] text-xs font-semibold rounded-[2px] transition-colors flex items-center gap-1"
            >
              <CheckSquare className="h-3.5 w-3.5" />
              <span>New Task</span>
            </button>

            <button
              onClick={() => onNavigateModule('code')}
              className="px-3 py-1.5 bg-white border border-[#E5E5E8] text-[#0F0F11] text-xs font-semibold rounded-[2px] transition-colors flex items-center gap-1"
            >
              <Code2 className="h-3.5 w-3.5" />
              <span>Code Session</span>
            </button>
          </div>
        </div>

        {/* Project Instructions Card */}
        <div className="bg-white border border-[#E5E5E8] rounded-[2px] p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-[#E5E5E8] pb-2">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-[#6E56CF]" />
              <h2 className="font-bold text-xs text-[#0F0F11] font-mono uppercase">
                Persistent Project Context Instructions
              </h2>
            </div>
            <button className="text-xs font-semibold text-[#6E56CF]">Edit</button>
          </div>

          <pre className="p-3 bg-[#FAFAFC] border border-[#E5E5E8] rounded-[2px] font-mono text-xs text-[#0F0F11] whitespace-pre-wrap leading-relaxed">
            {activeProject.instructions}
          </pre>
        </div>
      </div>
    </div>
  );
};
