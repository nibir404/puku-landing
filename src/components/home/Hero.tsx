import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const clientLogos = [
  { name: 'nimbus', label: 'Nimbus' },
  { name: 'linear', label: 'Linear' },
  { name: 'calendly', label: 'Calendly' },
  { name: 'vertex', label: 'Vertex' },
  { name: 'huckberry', label: 'Huckberry' }
];

export const Hero = () => {
  return (
    <section className="relative bg-[#f5f5f7] pt-32 pb-24 px-6 flex flex-col items-center justify-center overflow-hidden border-b border-border/50">
      {/* Background Dot Grid */}
      <div className="absolute inset-0 bg-dot-grid pointer-events-none opacity-30" />

      {/* Grid Wireframe Boxes (Desktop Only) */}
      <div className="hidden lg:block absolute left-8 top-36 w-[120px] space-y-4 pointer-events-none opacity-40">
        <div className="h-20 border border-border/80 rounded-lg relative">
          <span className="absolute -top-1 -left-1 h-2 w-2 bg-slate-300 rounded-full" />
          <span className="absolute -bottom-1 -right-1 h-2 w-2 bg-slate-300 rounded-full" />
        </div>
        <div className="h-20 border border-border/80 rounded-lg relative" />
        <div className="h-20 border border-border/80 rounded-lg relative" />
      </div>

      <div className="hidden lg:block absolute right-8 top-36 w-[120px] space-y-4 pointer-events-none opacity-40">
        <div className="h-20 border border-border/80 rounded-lg relative">
          <span className="absolute -top-1 -right-1 h-2 w-2 bg-slate-300 rounded-full" />
          <span className="absolute -bottom-1 -left-1 h-2 w-2 bg-slate-300 rounded-full" />
        </div>
        <div className="h-20 border border-border/80 rounded-lg relative" />
        <div className="h-20 border border-border/80 rounded-lg relative" />
      </div>

      {/* Main Core Content Container */}
      <div className="relative z-10 max-w-5xl flex flex-col items-center text-center">
        
        {/* Top Header Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 border border-border bg-white px-3.5 py-1.5 rounded-full shadow-sm text-[11.5px] font-mono text-ink-muted mb-8"
        >
          <span className="font-bold text-accent">[x]</span>
          <span className="tracking-wide font-semibold text-[10.5px]">New Era: AI-Native Software Engineering Platform &gt;</span>
        </motion.div>

        {/* Title Case Heading with Blinking Cursor */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
          className="font-sans text-[36px] sm:text-[58px] font-bold tracking-tight text-ink leading-[1.08] max-w-4xl"
        >
          Intelligent coordination for modern codebases
          <span className="animate-cursor-blink text-accent ml-0.5">|</span>
        </motion.h1>

        {/* Subtitle description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="mx-auto mt-6 max-w-2xl text-[14px] sm:text-[15.5px] leading-relaxed text-ink-muted"
        >
          A unified AI system that streams repository index structures, orchestrates autonomous agents, and coordinates workspace deployments securely.
        </motion.p>

        {/* Double Action Button Row */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="flex flex-wrap items-center justify-center gap-3 mt-8"
        >
          <a
            href="/contact"
            className="inline-block bg-accent hover:bg-accent/90 text-white border border-accent/20 font-bold uppercase tracking-wider text-[11.5px] px-7 py-3 rounded-[4px] shadow-sm transition-all"
          >
            Get Started
          </a>
          <a
            href="#workflow"
            className="inline-flex items-center gap-2 bg-[#e8e8ed] border border-border/80 hover:bg-[#dcdce3] text-ink font-semibold uppercase tracking-wider text-[11px] px-6 py-3 rounded-[4px] shadow-sm transition-all"
          >
            <Play className="h-3 w-3 fill-current" />
            <span>See It in Action</span>
          </a>
        </motion.div>

        {/* Puku IDE Developer Workspace Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: 'easeOut' }}
          className="relative mx-auto mt-16 w-full max-w-4xl rounded-xl border border-border/85 bg-white shadow-soft overflow-hidden flex flex-col font-sans select-none"
        >
          {/* macOS window controls header bar */}
          <div className="h-10 bg-[#f5f5f7] border-b border-border flex items-center justify-between px-4">
            <div className="flex gap-1.5 items-center">
              <span className="h-3 w-3 rounded-full bg-[#ff5f56] border border-[#e0443e]" />
              <span className="h-3 w-3 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
              <span className="h-3 w-3 rounded-full bg-[#27c93f] border border-[#1aab29]" />
            </div>
            <div className="text-[11.5px] font-mono text-ink-muted">puku-editor — src/components/ui/Button.tsx</div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-wider text-accent font-bold">puku-agent: active</span>
            </div>
          </div>

          {/* Editor Workspace Pane */}
          <div className="grid grid-cols-12 h-auto md:h-[350px] text-xs">
            {/* Column 1: Sidebar Explorer (Desktop Only) */}
            <div className="hidden md:block col-span-3 border-r border-border bg-[#f5f5f7]/50 p-4 space-y-4">
              <div>
                <div className="text-[9.5px] uppercase tracking-wider text-ink-dim font-bold font-mono">Workspace Explorer</div>
                <ul className="mt-2.5 space-y-2 font-mono text-[11px] text-ink-muted">
                  <li className="flex items-center gap-2">
                    <span className="text-slate-400">📁</span> src
                  </li>
                  <ul className="pl-4 space-y-2">
                    <li className="flex items-center gap-2 text-ink font-bold">
                      <span className="text-accent">📁</span> components
                    </li>
                    <ul className="pl-4 space-y-1.5">
                      <li className="flex items-center gap-2 text-ink font-bold">
                        <span className="text-accent">📄</span> Button.tsx
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-slate-400">📄</span> Nav.tsx
                      </li>
                    </ul>
                    <li className="flex items-center gap-2">
                      <span className="text-slate-400">📄</span> App.tsx
                    </li>
                  </ul>
                </ul>
              </div>
            </div>

            {/* Column 2: Code Editor Pane */}
            <div className="col-span-12 md:col-span-6 bg-white p-4 font-mono leading-relaxed text-[11.5px] flex flex-col justify-between text-left">
              <div className="space-y-1">
                <div className="flex items-center gap-2 border-b border-border/40 pb-2 mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-accent font-bold">Active Buffer</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-slate-300 select-none text-right w-4">9</span>
                  <span className="text-slate-700">const base = 'inline-flex items-center';</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-slate-300 select-none text-right w-4">10</span>
                  <span className="text-slate-700">const variants = &#123;</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-slate-300 select-none text-right w-4">11</span>
                  <span className="text-slate-700 pl-4">primary: 'bg-accent text-white</span>
                </div>
                <div className="flex gap-4 items-center">
                  <span className="text-slate-300 select-none text-right w-4">12</span>
                  <span className="text-slate-700 pl-4">
                    rounded-
                    <span className="text-accent-secondary/60 bg-accent/5 border-b-2 border-accent border-dashed px-1 py-0.5">
                      [4px]
                    </span>
                    <span className="h-3.5 w-1 bg-accent inline-block animate-pulse ml-0.5" />
                  </span>
                </div>
                <div className="flex gap-4">
                  <span className="text-slate-300 select-none text-right w-4">13</span>
                  <span className="text-slate-400 italic">// Autocomplete suggestion matching UI rules</span>
                </div>
              </div>

              {/* Mini Terminal inside editor */}
              <div className="border-t border-border/80 pt-3 mt-4">
                <div className="flex items-center justify-between text-[9.5px] uppercase tracking-wider text-ink-dim font-bold mb-2">
                  <span>puku-terminal</span>
                  <span className="text-emerald-600">running</span>
                </div>
                <div className="bg-[#f5f5f7] rounded border border-border/60 p-2.5 font-mono text-[10.5px] text-ink-muted space-y-1">
                  <div>$ puku build --verify</div>
                  <div className="text-emerald-700 font-semibold">✓ AST compiler checked index generated successfully (0.4s)</div>
                  <div className="text-emerald-700 font-semibold">✓ 14 unit tests passed without regression errors</div>
                </div>
              </div>
            </div>

            {/* Column 3: Puku Copilot Chat Panel */}
            <div className="col-span-12 md:col-span-3 border-t md:border-t-0 md:border-l border-border bg-[#f5f5f7]/40 p-4 flex flex-col justify-between text-left">
              <div>
                <div className="text-[9.5px] uppercase tracking-wider text-ink-dim font-bold font-mono border-b border-border/60 pb-2 mb-3">
                  Puku Copilot
                </div>
                <div className="space-y-3">
                  <div className="bg-white border border-border/60 p-2.5 rounded-lg">
                    <div className="text-[9px] font-mono text-ink-muted">Developer</div>
                    <p className="mt-1 text-[11px] text-ink leading-relaxed">
                      Make the border radius of all workspace buttons exactly 4px.
                    </p>
                  </div>
                  <div className="bg-accent/5 border border-accent/15 p-2.5 rounded-lg">
                    <div className="text-[9px] font-mono text-accent font-bold">Puku Agent</div>
                    <p className="mt-1 text-[11px] text-ink leading-relaxed">
                      Scanning <span className="font-mono text-accent">Button.tsx</span>... Found variant templates. Overwriting border-radius declarations.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-1 bg-white border border-border/80 rounded px-2 py-1.5">
                <span className="text-[10px] text-slate-400">⚡ Ask agent...</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 5-Cell Segmented Client Logo Cloud */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full max-w-4xl mt-16 border border-border bg-white rounded-xl overflow-hidden grid grid-cols-2 sm:grid-cols-5 shadow-sm divide-x divide-y sm:divide-y-0 divide-border"
        >
          {clientLogos.map((logo) => (
            <div
              key={logo.name}
              className="flex items-center justify-center p-6 font-display text-base font-semibold text-ink-muted hover:text-ink transition-colors cursor-pointer select-none bg-white hover:bg-[#f5f5f7]/30"
            >
              {logo.label}
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};