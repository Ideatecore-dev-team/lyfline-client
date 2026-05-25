import * as React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "flat" | "outline" | "glass";
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  className,
  variant = "default",
  hoverable = true,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        "rounded-3xl p-6 transition-all duration-300",
        {
          // Variants
          "bg-white shadow-xl shadow-slate-100/50 border border-slate-100": variant === "default",
          "bg-slate-50 border border-slate-100": variant === "flat",
          "border-2 border-slate-200 bg-transparent": variant === "outline",
          "bg-white/80 backdrop-blur-md shadow-xl shadow-slate-100/30 border border-white/50": variant === "glass",
          
          // Hover effect
          "hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-200/60": hoverable,
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
