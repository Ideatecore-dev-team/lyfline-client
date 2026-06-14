import type { ButtonHTMLAttributes } from "react";
import * as React from "react";

export type ButtonVariant =
  | "primary"
  | "outline-white"
  | "outline-primary"
  | "slate-primary"
  | "ghost-primary"
  | "ghost-white"
  | "ghost-black";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  leftIcon?: string;
  rightIcon?: string;
  variant?: ButtonVariant | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  children?: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-linear-to-r from-[#3F71B7] to-[#3365AC] text-white hover:from-[#335E99] hover:to-[#28528C]",
  "outline-white": "bg-transparent text-white outline outline-2 outline-offset-[-2px] outline-white hover:bg-white/10",
  "outline-primary": "bg-transparent text-[#3F71B7] outline outline-2 outline-offset-[-2px] outline-[#3F71B7] hover:bg-[#3F71B7]/10",
  "slate-primary": "bg-linear-to-r from-[#3F71B7] to-[#3365AC] text-white hover:opacity-95",
  "ghost-primary": "bg-transparent text-[#3F71B7]",
  "ghost-white": "bg-transparent text-white",
  "ghost-black": "bg-transparent text-black",
};

// Map old variants to new ones
const mapVariant = (v?: ButtonProps["variant"]): ButtonVariant => {
  if (!v) return "primary";
  if (v === "outline") return "outline-primary";
  if (v === "secondary") return "ghost-primary";
  if (v === "ghost") return "ghost-black";
  if (v === "danger") return "primary";
  return v as ButtonVariant;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      text,
      leftIcon,
      rightIcon,
      variant = "primary",
      size,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    // Helper to format the icon filename
    const getIconSrc = (iconName: string) => {
      const formattedName = iconName.endsWith(".svg") ? iconName : `${iconName}.svg`;
      return `/icons/${formattedName}`;
    };

    const resolvedVariant = mapVariant(variant);
    const selectedVariantClass = variantClasses[resolvedVariant] || variantClasses.primary;
    const isGhost = resolvedVariant.startsWith("ghost");
    const underlineColorClass = resolvedVariant === "ghost-white" ? "after:bg-white" : "after:bg-primary";

    const sizeClass = size === "sm"
      ? "h-10 px-4 text-sm"
      : size === "lg"
        ? "h-14 px-8 text-base"
        : "h-12 px-4 text-sm";

    return (
      <button
        ref={ref}
        className={`rounded-[48px] inline-flex justify-center items-center gap-2.5 font-semibold font-sans active:scale-98 transition-all cursor-pointer group ${sizeClass} ${selectedVariantClass} ${className}`}
        {...props}
      >
        {leftIcon && (
          <span
            style={{
              maskImage: `url("${getIconSrc(leftIcon)}")`,
              WebkitMaskImage: `url("${getIconSrc(leftIcon)}")`,
            }}
            className="size-6 bg-current mask-contain mask-no-repeat mask-center shrink-0 transition-transform duration-300 group-hover:-translate-x-1"
            aria-hidden="true"
          />
        )}
        {text !== undefined ? (
          <span
            className={`leading-none relative py-1 ${
              isGhost
                ? `after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] ${underlineColorClass} after:transition-all after:duration-300 group-hover:after:w-full`
                : ""
            }`}
          >
            {text}
          </span>
        ) : (
          children
        )}
        {rightIcon && (
          <span
            style={{
              maskImage: `url("${getIconSrc(rightIcon)}")`,
              WebkitMaskImage: `url("${getIconSrc(rightIcon)}")`,
            }}
            className="size-6 bg-current mask-contain mask-no-repeat mask-center shrink-0 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
