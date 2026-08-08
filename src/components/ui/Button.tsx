import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Standard shadcn UI Button implementation ---
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ShadcnButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const ShadcnButton = React.forwardRef<HTMLButtonElement, ShadcnButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
ShadcnButton.displayName = "ShadcnButton";

// --- Legacy puku design system button exports ---
type LegacyVariant = "primary" | "secondary" | "ghost" | "outline" | "purple";
type LegacySize = "sm" | "md" | "lg" | "xl";

const legacyBase =
  "inline-flex items-center justify-center gap-3 font-semibold rounded-[2px] text-[15px] transition-all duration-200 ease-out whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6E56CF] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer shadow-none";

const legacyVariants: Record<LegacyVariant, string> = {
  primary:
    "bg-[#0F0F11] hover:bg-[#6E56CF] text-white font-bold text-[15px]",
  secondary:
    "bg-[#F3F3F5] border border-[#E5E5E8] hover:bg-[#E5E5E8] text-[#0F0F11] font-bold text-[15px]",
  ghost:
    "bg-transparent text-[#0F0F11] hover:text-[#6E56CF] font-bold text-[15px]",
  outline:
    "border border-[#E5E5E8] text-[#0F0F11] hover:bg-[#F3F3F5] hover:border-[#6E56CF] text-[15px] font-bold",
  purple:
    "bg-[#6E56CF] hover:bg-[#4C3B99] text-white font-bold text-[15px]",
};

const legacySizes: Record<LegacySize, string> = {
  sm: "min-h-[44px] h-11 px-4 py-2 text-[14px]",
  md: "min-h-[44px] h-11 px-6 py-2.5 text-[15px]",
  lg: "min-h-[48px] h-12 px-7 py-3 text-[15px]",
  xl: "min-h-[52px] h-13 px-8 py-3.5 text-[16px]",
};

type LegacySharedProps = {
  variant?: LegacyVariant;
  size?: LegacySize;
  arrow?: "right" | "up-right" | "none";
  children: React.ReactNode;
  className?: string;
};

export const ButtonLink = ({
  to,
  variant = "primary",
  size = "md",
  arrow = "right",
  children,
  className,
  ...rest
}: LegacySharedProps & { to: string } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">) => {
  return (
    <Link
      to={to}
      className={cn(legacyBase, legacyVariants[variant], legacySizes[size], className)}
      {...rest}
    >
      <span>{children}</span>
      {arrow === "right" && <ArrowRight className="h-3.5 w-3.5 shrink-0 ml-1" strokeWidth={2.2} aria-hidden="true" />}
      {arrow === "up-right" && <ArrowUpRight className="h-3.5 w-3.5 shrink-0 ml-1" strokeWidth={2.2} aria-hidden="true" />}
    </Link>
  );
};

export const Button = ({
  variant = "primary",
  size = "md",
  arrow = "right",
  children,
  className,
  ...rest
}: LegacySharedProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={cn(legacyBase, legacyVariants[variant], legacySizes[size], className)}
      {...rest}
    >
      <span>{children}</span>
      {arrow === "right" && <ArrowRight className="h-3.5 w-3.5 shrink-0 ml-1" strokeWidth={2.2} aria-hidden="true" />}
      {arrow === "up-right" && <ArrowUpRight className="h-3.5 w-3.5 shrink-0 ml-1" strokeWidth={2.2} aria-hidden="true" />}
    </button>
  );
};

export { ShadcnButton, buttonVariants };