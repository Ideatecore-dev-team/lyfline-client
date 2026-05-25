import * as React from "react";
import { cn } from "@/shared/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]",
          {
            // Variants
            "bg-primary text-white hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/20": variant === "primary",
            "bg-primary-light text-primary hover:bg-primary/20": variant === "secondary",
            "border-2 border-primary text-primary hover:bg-primary-light": variant === "outline",
            "text-neutral-dark hover:bg-slate-100": variant === "ghost",
            "bg-accent text-white hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/20": variant === "danger",
            
            // Sizes
            "px-4 py-1.5 text-xs": size === "sm",
            "px-6 py-3 text-sm": size === "md",
            "px-8 py-4 text-base": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
