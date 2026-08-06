import { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export const Eyebrow = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div
    className={cn(
      'inline-flex items-center gap-2 text-eyebrow uppercase font-medium text-ink-muted',
      className,
    )}
  >
    {children}
  </div>
);

export const Kicker = ({ children, tone = 'dark' }: { children: ReactNode; tone?: 'light' | 'dark' }) => (
  <span
    className={cn(
      'inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider',
      'border-border bg-surface text-accent',
    )}
  >
    {children}
  </span>
);