import { ReactNode, ElementType } from 'react';
import { cn } from '@/lib/cn';

type PixelHeadingProps = {
  children: ReactNode;
  as?: ElementType;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
};

/**
 * Display heading rendered in the pixel font (Press Start 2P).
 * Use for the "FIX. LEARN." / "PREVENT." style pixel-lede headings.
 */
export const PixelHeading = ({
  children,
  as: Tag = 'h2',
  size = 'lg',
  className,
}: PixelHeadingProps) => {
  const sizes = {
    sm: 'text-[20px] sm:text-[24px] md:text-[28px] tracking-[0.06em]',
    md: 'text-[28px] sm:text-[36px] md:text-[44px] tracking-[0.06em]',
    lg: 'text-[36px] sm:text-[48px] md:text-[64px] tracking-[0.05em]',
    xl: 'text-[44px] sm:text-[60px] md:text-[88px] tracking-[0.04em]',
  };
  return (
    <Tag
      className={cn(
        'font-pixel leading-[1.15] text-ink uppercase',
        sizes[size],
        className,
      )}
    >
      {children}
    </Tag>
  );
};

type PixelTextProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
};

export const PixelText = ({ children, as: Tag = 'span', className }: PixelTextProps) => (
  <Tag
    className={cn(
      'font-pixel-mono text-[17px] leading-[1] text-ink-muted',
      className,
    )}
  >
    {children}
  </Tag>
);
