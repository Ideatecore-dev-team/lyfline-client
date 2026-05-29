import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  subtitle?: string;
  title: React.ReactNode;
  description?: string;
  containerClassName?: string;
  align?: "left" | "center";
}

export const Section: React.FC<SectionProps> = ({
  className,
  subtitle,
  title,
  description,
  containerClassName,
  align = "center",
  children,
  ...props
}) => {
  return (
    <section className={cn("py-20 md:py-28 overflow-hidden", className)} {...props}>
      <div className={cn("max-w-7xl mx-auto px-6 md:px-8", containerClassName)}>
        {(subtitle || title || description) && (
          <div
            className={cn("mb-12 md:mb-16 max-w-3xl", {
              "mx-auto text-center": align === "center",
              "text-left": align === "left",
            })}
          >
            {subtitle && (
              <span className="text-xs font-bold tracking-widest text-primary uppercase block mb-3 font-poppins">
                {subtitle}
              </span>
            )}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-dark mb-4 leading-tight">
              {title}
            </h2>
            {description && (
              <p className="text-base md:text-lg text-neutral-muted leading-relaxed">
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};
