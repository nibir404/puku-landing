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
          className="font-sans text-[36px] sm:text-[54px] font-semibold tracking-tight text-[#0F0F11] leading-[1.08] max-w-4xl"
        >
          Intelligent coordination for modern codebases
          <span className="animate-cursor-blink text-[#6E56CF] ml-0.5">|</span>
        </motion.h1>

        {/* Subtitle description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="mx-auto mt-6 max-w-2xl text-[16px] leading-relaxed text-[#4A4A52] font-normal"
        >
          A unified AI system that streams repository index structures, orchestrates autonomous agents, and coordinates workspace deployments securely.
        </motion.p>

        {/* Double Action Button Row (gap-6) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 w-full mx-auto px-4 sm:px-0"
        >
          <a
            href="/chat"
            className="w-full sm:w-auto min-w-[160px] whitespace-nowrap min-h-[44px] inline-flex items-center justify-center text-center bg-[#6E56CF] hover:bg-[#5B42F3] text-white font-semibold text-[15px] px-6 py-3 rounded-[2px] shadow-none transition-all shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6E56CF] focus-visible:ring-offset-2"
          >
            Open Web Workspace ↗
          </a>
          <a
            href="/signup"
            className="w-full sm:w-auto min-w-[160px] whitespace-nowrap min-h-[44px] inline-flex items-center justify-center text-center gap-2 bg-[#F3F3F5] border border-[#E5E5E8] hover:bg-[#E5E5E8] text-[#0F0F11] font-semibold text-[15px] px-6 py-3 rounded-[2px] shadow-none transition-all shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6E56CF] focus-visible:ring-offset-2"
          >
            <span>Get Started</span>
          </a>
        </motion.div>

        {/* Puku IDE Developer Workspace Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: 'easeOut' }}
          className="relative mx-auto mt-16 w-full max-w-4xl rounded-[2px] border border-[#E5E5E8] bg-white shadow-none overflow-hidden flex flex-col font-sans select-none"
        >
          {/* macOS window controls header bar */}
          <div className="h-10 bg-[#f5f5f7] border-b border-[#E5E5E8] flex items-center justify-between px-4">
            <div className="flex gap-1.5 items-center">
              <span className="h-3 w-3 rounded-full bg-[#ff5f56] border border-[#e0443e]" />
              <span className="h-3 w-3 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
              <span className="h-3 w-3 rounded-full bg-[#27c93f] border border-[#1aab29]" />
            </div>
            <div className="text-[11.5px] font-mono text-[#4A4A52]">puku-editor — src/components/ui/Button.tsx</div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#6E56CF] animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#6E56CF] font-bold">puku-agent: active</span>
            </div>
          </div>

          {/* Editor Workspace Pane */}
          <div className="grid grid-cols-12 h-auto md:h-[350px] text-xs">
            {/* Column 1: Sidebar Explorer (Desktop Only) */}
            <div className="hidden md:block col-span-3 border-r border-[#E5E5E8] bg-[#f5f5f7]/50 p-4 space-y-4">
              <div>
                <div className="text-[9.5px] uppercase tracking-wider text-[#333338] font-bold font-mono">Workspace Explorer</div>
                <ul className="mt-2.5 space-y-2 font-mono text-[11px] text-[#4A4A52]">
                  <li className="flex items-center gap-2">
                    <span className="text-slate-400">📁</span> src
                  </li>
                  <ul className="pl-4 space-y-2">
                    <li className="flex items-center gap-2 text-[#0F0F11] font-bold">
                      <span className="text-[#6E56CF]">📁</span> components
                    </li>
                    <ul className="pl-4 space-y-1.5">
                      <li className="flex items-center gap-2 text-[#0F0F11] font-bold">
                        <span className="text-[#6E56CF]">📄</span> Button.tsx
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
                <div className="flex items-center gap-2 border-b border-[#E5E5E8] pb-2 mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#6E56CF] font-bold">Active Buffer</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-slate-600 font-semibold select-none text-right w-4">9</span>
                  <span className="text-slate-900 font-medium">const base = 'inline-flex items-center';</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-slate-600 font-semibold select-none text-right w-4">10</span>
                  <span className="text-slate-900 font-medium">const variants = &#123;</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-slate-600 font-semibold select-none text-right w-4">11</span>
                  <span className="text-slate-900 font-medium pl-4">primary: 'bg-[#0F0F11] text-white</span>
                </div>
                <div className="flex gap-4 items-center">
                  <span className="text-slate-600 font-semibold select-none text-right w-4">12</span>
                  <span className="text-slate-900 font-medium pl-4">
                    rounded-
                    <span className="text-[#6E56CF] bg-[#F4F2FF] border-b-2 border-[#6E56CF] border-dashed px-1 py-0.5 font-bold">
                      [2px]
                    </span>
                    <span className="h-3.5 w-1 bg-[#6E56CF] inline-block animate-pulse ml-0.5" />
                  </span>
                </div>
                <div className="flex gap-4">
                  <span className="text-slate-600 font-semibold select-none text-right w-4">13</span>
                  <span className="text-[#4A4A52] font-semibold italic">// Autocomplete suggestion matching UI rules</span>
                </div>
              </div>

              {/* Mini Terminal inside editor */}
              <div className="border-t border-[#E5E5E8] pt-3 mt-4">
                <div className="flex items-center justify-between text-[9.5px] uppercase tracking-wider text-[#333338] font-bold mb-2">
                  <span>puku-terminal</span>
                  <span className="text-emerald-600">running</span>
                </div>
                <div className="bg-[#f5f5f7] rounded-[2px] border border-[#E5E5E8] p-2.5 font-mono text-[10.5px] text-[#4A4A52] space-y-1">
                  <div>$ puku build --verify</div>
                  <div className="text-emerald-700 font-semibold">✓ AST compiler checked index generated successfully (0.4s)</div>
                  <div className="text-emerald-700 font-semibold">✓ 14 unit tests passed without regression errors</div>
                </div>
              </div>
            </div>

            {/* Column 3: Puku Copilot Chat Panel */}
            <div className="col-span-12 md:col-span-3 border-t md:border-t-0 md:border-l border-[#E5E5E8] bg-[#f5f5f7]/40 p-4 flex flex-col justify-between text-left">
              <div>
                <div className="text-[9.5px] uppercase tracking-wider text-[#333338] font-bold font-mono border-b border-[#E5E5E8] pb-2 mb-3">
                  Puku Copilot
                </div>
                <div className="space-y-3">
                  <div className="bg-white border border-[#E5E5E8] p-2.5 rounded-[2px]">
                    <div className="text-[9px] font-mono text-[#4A4A52]">Developer</div>
                    <p className="mt-1 text-[11px] text-[#0F0F11] leading-relaxed">
                      Make the border radius of all workspace buttons exactly 2px.
                    </p>
                  </div>
                  <div className="bg-[#F4F2FF] border border-[#E4DDFE] p-2.5 rounded-[2px]">
                    <div className="text-[9px] font-mono text-[#6E56CF] font-bold">Puku Agent</div>
                    <p className="mt-1 text-[11px] text-[#0F0F11] leading-relaxed">
                      Scanning <span className="font-mono text-[#6E56CF]">Button.tsx</span>... Found variant templates. Overwriting border-radius declarations.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-1 bg-white border border-[#E5E5E8] rounded-[2px] px-2 py-1.5">
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
          className="w-full max-w-4xl mt-16 border border-[#E5E5E8] bg-white rounded-[2px] overflow-hidden grid grid-cols-2 sm:grid-cols-5 shadow-none divide-x divide-y sm:divide-y-0 divide-[#E5E5E8]"
        >
          {clientLogos.map((logo) => (
            <div
              key={logo.name}
              className="flex items-center justify-center p-6 font-display text-base font-semibold text-[#4A4A52] hover:text-[#0F0F11] transition-colors cursor-pointer select-none bg-white hover:bg-[#f5f5f7]/30"
            >
              {logo.label}
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};