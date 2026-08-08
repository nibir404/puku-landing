import { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export const Eyebrow = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div
    className={cn(
      'inline-flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-[#6E56CF]',
      className,
    )}
  >
    {children}
  </div>
);

export const Kicker = ({ children, tone = 'dark' }: { children: ReactNode; tone?: 'light' | 'dark' }) => (
  <span
    className={cn(
      'inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider',
      'border-[#E5E5E8] bg-[#FAFAFC] text-[#6E56CF]',
    )}
  >
    {children}
  </span>
);