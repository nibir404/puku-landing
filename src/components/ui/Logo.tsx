import { cn } from '@/lib/cn';

type LogoTone = 'light' | 'dark';

const srcFor = (tone: LogoTone) =>
  tone === 'dark' ? '/Logo%20White.png' : '/Logo%20Dark.png';

export const Logo = ({
  className,
  tone = 'light',
  alt = 'Puku',
}: {
  className?: string;
  tone?: LogoTone;
  alt?: string;
}) => (
  <img
    src={srcFor(tone)}
    alt={alt}
    className={cn('h-7 w-auto', className)}
  />
);

/** Small black logomark used inside hero pills and inline accents. */
export const LogoMark = ({
  className,
  tone = 'light',
}: {
  className?: string;
  tone?: LogoTone;
}) => (
  <span
    aria-hidden
    className={cn(
      'inline-flex h-7 w-7 items-center justify-center rounded-md border',
      tone === 'dark'
        ? 'border-white/20 bg-white/5 text-white'
        : 'border-border bg-white text-ink',
      className,
    )}
  >
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      {/* rounded-square Puku glyph (matches /public/Logo Dark.png) */}
      <path d="M3 7.2c0-1.7 1.4-3.2 3.2-3.2h2.4v3.2H6.2v9.6H3V7.2zM15.4 4h2.4c1.8 0 3.2 1.5 3.2 3.2v9.6c0 1.8-1.4 3.2-3.2 3.2h-2.4v-3.2h2.4V7.2h-2.4V4zM6.2 16.8h2.4V20H6.2c-1.8 0-3.2-1.4-3.2-3.2v-1.6h3.2v1.6zM9.8 11.4h4.4v3.2H9.8v-3.2zM17.8 15.2h3.2v1.6c0 1.8-1.4 3.2-3.2 3.2h-1.2v-3.2h1.2v-1.6z" />
    </svg>
  </span>
);