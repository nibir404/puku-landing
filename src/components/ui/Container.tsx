import { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type ContainerProps = {
  children: ReactNode;
  className?: string;
  size?: 'default' | 'narrow' | 'wide';
  as?: 'div' | 'section' | 'article' | 'main' | 'header' | 'footer';
};

export const Container = ({
  children,
  className,
  size = 'default',
  as: Tag = 'div',
}: ContainerProps) => {
  const sizes = {
    narrow: 'max-w-4xl',
    default: 'max-w-7xl',
    wide: 'max-w-[1400px]',
  };
  return <Tag className={cn('mx-auto w-full px-6 md:px-8', sizes[size], className)}>{children}</Tag>;
};
