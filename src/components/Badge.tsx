import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "success" | "accent" | "neutral";
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "primary",
  children,
  ...props
}) => {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full tracking-wide",
        {
          "bg-primary-light text-primary": variant === "primary",
          "bg-slate-100 text-slate-700": variant === "neutral",
          "bg-success-light text-success": variant === "success",
          "bg-accent-light text-accent": variant === "accent",
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
