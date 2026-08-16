import { useState } from 'react';
import { Clock, Plus, Play, Pause, Trash2, Calendar, CheckCircle2 } from 'lucide-react';
import { ScheduledTask } from '@/lib/chatStore';

interface ScheduledWorkspaceProps {
  scheduledTasks: ScheduledTask[];
}

export const ScheduledWorkspace = ({ scheduledTasks }: ScheduledWorkspaceProps) => {
  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 bg-[#f5f5f7] font-sans text-[#0F0F11] select-none">
      <div className="bg-white border border-[#E5E5E8] rounded-[2px] p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-puku font-brand text-2xl font-extrabold text-[#0F0F11]">
              Scheduled & Recurring Tasks
            </h1>
            <p className="text-xs text-[#4A4A52] mt-0.5">
              Automated background cron jobs and scheduled AI execution workflows.
            </p>
          </div>

          <button className="px-4 py-2 bg-[#0F0F11] hover:bg-[#6E56CF] text-white font-semibold text-xs rounded-[2px] transition-colors flex items-center gap-1.5 shrink-0">
            <Plus className="h-4 w-4" />
            <span>Create Scheduled Task</span>
          </button>
        </div>
      </div>

      <div className="bg-white border border-[#E5E5E8] rounded-[2px] p-5 space-y-3">
        <div className="text-xs font-bold font-mono text-[#0F0F11] uppercase tracking-wider border-b border-[#E5E5E8] pb-3">
          Active Schedules ({scheduledTasks.length})
        </div>

        <div className="space-y-2">
          {scheduledTasks.map((t) => (
            <div
              key={t.id}
              className="p-4 bg-[#FAFAFC] border border-[#E5E5E8] rounded-[2px] flex items-center justify-between transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white border border-[#E5E5E8] text-[#6E56CF] rounded-[2px]">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-bold text-xs text-[#0F0F11]">{t.title}</div>
                  <div className="text-[11px] font-mono text-[#4A4A52]">
                    Schedule: <span className="font-bold text-[#6E56CF]">{t.schedule}</span> • Next Run: {t.nextRun}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded-[2px] bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {t.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
