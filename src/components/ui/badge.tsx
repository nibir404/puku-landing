import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-[2px] border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#6E56CF] focus:ring-offset-2 shadow-none",
  {
    variants: {
      variant: {
        default:
          "border-[#E4DDFE] bg-[#F4F2FF] text-[#6E56CF] shadow-none",
        secondary:
          "border-[#E5E5E8] bg-[#F3F3F5] text-[#0F0F11] shadow-none",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow-none",
        outline: "border-[#E5E5E8] text-[#0F0F11]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
