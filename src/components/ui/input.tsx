import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex min-h-[44px] h-11 w-full rounded-[2px] border border-[#E5E5E8] bg-white px-3.5 py-2 text-[15px] font-normal text-[#0F0F11] shadow-none transition-colors file:border-0 file:bg-transparent file:text-sm file:font-semibold file:text-[#0F0F11] placeholder:text-[#4A4A52] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6E56CF] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
