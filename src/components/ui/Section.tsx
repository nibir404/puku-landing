import { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Container } from './Container';

type SectionProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  size?: 'default' | 'narrow' | 'wide';
  className?: string;
  id?: string;
};

export const Section = ({
  children,
  eyebrow,
  title,
  description,
  align = 'left',
  size = 'default',
  className,
  id,
  ...rest
}: SectionProps) => {
  return (
    <section id={id} className={cn('relative py-24 md:py-32', className)} {...rest}>
      <Container size={size}>
        {(eyebrow || title || description) && (
          <div
            className={cn(
              'mb-14 max-w-3xl',
              align === 'center' && 'mx-auto text-center',
            )}
          >
            {eyebrow && (
              <div className="mb-5 inline-flex items-center gap-2 text-eyebrow uppercase font-medium text-ink-muted">
                <span className="h-px w-6 bg-ink-muted/50" />
                {eyebrow}
              </div>
            )}
            {title && (
              <h2 className="text-display-lg md:text-display-xl font-display font-medium tracking-tight text-ink">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-5 text-base md:text-lg leading-relaxed text-ink-muted">
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
};