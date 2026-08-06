import { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type CardProps = {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  hover?: boolean;
  tone?: 'light' | 'dark';
};

export const Card = ({ children, className, glow, hover, tone = 'dark' }: CardProps) => (
  <div
    className={cn(
      'relative overflow-hidden rounded-2xl border border-border bg-surface',
      hover && 'transition-all duration-300 hover:border-accent/40 hover:bg-card hover:shadow-card',
      className,
    )}
  >
    {glow && (
      <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl animate-pulse" />
    )}
    {children}
  </div>
);

export const Pill = ({
  children,
  className,
  tone = 'dark',
}: {
  children: ReactNode;
  className?: string;
  tone?: 'light' | 'dark';
}) => (
  <span
    className={cn(
      'inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1 text-[12px] font-medium text-ink-muted',
      className,
    )}
  >
    {children}
  </span>
);

export const Stat = ({
  value,
  label,
  hint,
  tone = 'dark',
}: {
  value: string;
  label: string;
  hint?: string;
  tone?: 'light' | 'dark';
}) => (
  <div className="flex flex-col gap-1.5">
    <div
      className={cn(
        'font-mono text-3xl md:text-4xl font-semibold tracking-tight text-accent',
      )}
    >
      {value}
    </div>
    <div className={cn('text-sm text-ink-muted')}>
      {label}
    </div>
    {hint && (
      <div className={cn('text-xs text-ink-dim')}>
        {hint}
      </div>
    )}
  </div>
);