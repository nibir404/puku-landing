import { ReactNode, useEffect, useState } from 'react';
import { cn } from '@/lib/cn';

type Line = { prompt?: string; text: string; type?: 'cmd' | 'out' | 'dim' | 'ok' };

type TerminalProps = {
  title?: string;
  lines?: Line[];
  typing?: string[];
  className?: string;
  children?: ReactNode;
  tone?: 'dark' | 'light';
};

export const Terminal = ({
  title = 'puku — zsh',
  lines = [],
  typing,
  className,
  tone = 'dark',
}: TerminalProps) => {
  const [typed, setTyped] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!typing) return;
    let i = 0;
    const full = typing.join('\n');
    const id = setInterval(() => {
      i += 1;
      setTyped(full.slice(0, i));
      if (i >= full.length) {
        clearInterval(id);
        setDone(true);
      }
    }, 22);
    return () => clearInterval(id);
  }, [typing]);

  const rendered = typing
    ? typed.split('\n').map((t) => ({ text: t, prompt: '$', type: 'cmd' as const }))
    : lines;

  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl border border-border bg-[#f4f4f5] shadow-card',
        className,
      )}
    >
      <div
        className={cn(
          'flex items-center justify-between border-b border-border/60 bg-[#e4e4e7] px-4 py-2.5 text-ink-muted',
        )}
      >
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        </div>
        <div className="font-mono text-[12px] text-ink-muted">
          {title}
        </div>
        <div className="w-12" />
      </div>
      <div
        className="min-h-[260px] p-5 font-mono text-[13px] leading-[1.7] text-ink"
      >
        {rendered.map((l, i) => (
          <div key={i} className="whitespace-pre-wrap">
            {l.prompt && (
              <span className="mr-2 text-accent">{l.prompt}</span>
            )}
            <span
              className={cn(
                l.type === 'dim' && 'text-ink-dim',
                l.type === 'out' && 'text-ink',
                l.type === 'ok' && 'text-accent',
              )}
            >
              {l.text}
            </span>
          </div>
        ))}
        {!done && typing && (
          <span
            className="inline-block h-4 w-2 align-middle animate-cursor-blink bg-accent"
          />
        )}
      </div>
    </div>
  );
};