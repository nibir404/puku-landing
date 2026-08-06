import { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Copy } from 'lucide-react';

type CodeBlockProps = {
  code: string;
  language?: string;
  filename?: string;
  highlightLines?: number[];
  className?: string;
  children?: ReactNode;
  tone?: 'dark' | 'light';
};

export const CodeBlock = ({
  code,
  language = 'tsx',
  filename,
  highlightLines = [],
  className,
  tone = 'dark',
}: CodeBlockProps) => {
  const lines = code.split('\n');
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
          <span className="h-2.5 w-2.5 rounded-full bg-[#d4d4d8]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#d4d4d8]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#d4d4d8]" />
        </div>
        <div className="font-mono text-[12px] text-ink-muted">
          {filename ?? `untitled.${language}`}
        </div>
        <button
          className="transition-colors text-ink-muted hover:text-ink"
          aria-label="Copy"
        >
          <Copy className="h-3.5 w-3.5" />
        </button>
      </div>
      <pre
        className="overflow-x-auto p-5 font-mono text-[13.5px] leading-[1.65] text-ink"
      >
        <code>
          {lines.map((line, i) => (
            <div
              key={i}
              className={cn(
                'flex',
                highlightLines.includes(i + 1) &&
                  'bg-accent/10 -mx-5 px-5 border-l-2 border-accent',
              )}
            >
              <span className="mr-4 inline-block w-6 select-none text-right text-ink-dim">
                {i + 1}
              </span>
              <span dangerouslySetInnerHTML={{ __html: line || '&nbsp;' }} />
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
};