import { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'purple';
type Size = 'sm' | 'md' | 'lg' | 'xl';

const base =
  'inline-flex items-center justify-center gap-3 font-semibold rounded-[2px] text-[15px] transition-all duration-200 ease-out whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6E56CF] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer shadow-none';

const variants: Record<Variant, string> = {
  primary:
    'bg-[#0F0F11] hover:bg-[#6E56CF] text-white font-semibold text-[15px]',
  secondary:
    'bg-[#F3F3F5] border border-[#E5E5E8] hover:bg-[#E5E5E8] text-[#0F0F11] font-semibold text-[15px]',
  ghost:
    'bg-transparent text-[#666666] hover:text-[#6E56CF] font-semibold text-[15px]',
  outline:
    'border border-[#E5E5E8] text-[#0F0F11] hover:bg-[#F3F3F5] hover:border-[#6E56CF] text-[15px] font-semibold',
  purple:
    'bg-[#6E56CF] hover:bg-[#4C3B99] text-white font-semibold text-[15px]',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 py-2 text-[14px]',
  md: 'h-11 px-6 py-2.5 text-[15px]',
  lg: 'h-12 px-7 py-3 text-[15px]',
  xl: 'h-13 px-8 py-3.5 text-[16px]',
};

type SharedProps = {
  variant?: Variant;
  size?: Size;
  arrow?: 'right' | 'up-right' | 'none';
  children: ReactNode;
  className?: string;
};

export const ButtonLink = ({
  to,
  variant = 'primary',
  size = 'md',
  arrow = 'right',
  children,
  className,
  ...rest
}: SharedProps & { to: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>) => {
  return (
    <Link
      to={to}
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      <span>{children}</span>
      {arrow === 'right' && <ArrowRight className="h-3.5 w-3.5 shrink-0 ml-1" strokeWidth={2.2} aria-hidden="true" />}
      {arrow === 'up-right' && <ArrowUpRight className="h-3.5 w-3.5 shrink-0 ml-1" strokeWidth={2.2} aria-hidden="true" />}
    </Link>
  );
};

export const Button = ({
  variant = 'primary',
  size = 'md',
  arrow = 'right',
  children,
  className,
  ...rest
}: SharedProps & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      <span>{children}</span>
      {arrow === 'right' && <ArrowRight className="h-3.5 w-3.5 shrink-0 ml-1" strokeWidth={2.2} aria-hidden="true" />}
      {arrow === 'up-right' && <ArrowUpRight className="h-3.5 w-3.5 shrink-0 ml-1" strokeWidth={2.2} aria-hidden="true" />}
    </button>
  );
};