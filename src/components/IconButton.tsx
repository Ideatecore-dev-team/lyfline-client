import type { ButtonHTMLAttributes } from "react";
import * as React from "react";

export type IconButtonVariant =
  | "slate-solid"
  | "primary-outline"
  | "black"
  | "glass"
  | "red";

export type IconButtonSize = "default" | "small";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: string;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  children?: React.ReactNode;
}

const variantClasses: Record<IconButtonVariant, string> = {
  "slate-solid": "bg-slate-500 text-white outline outline-1 outline-offset-[-1px] outline-slate-500 hover:bg-slate-600 hover:outline-slate-600",
  "primary-outline": "bg-slate-100 text-[#3F71B7] outline outline-1 outline-offset-[-1px] outline-[#3F71B7] hover:bg-slate-200",
  "black": "bg-black text-white hover:bg-black/90",
  "glass": "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm",
  "red": "bg-[#E02828] text-white hover:bg-[#E02828]/90",
};

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      variant = "slate-solid",
      size = "default",
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

    const sizeClass = size === "small"
      ? "w-9 h-9 rounded-lg"
      : "w-14 h-14 rounded-2xl";

    const iconSizeClass = size === "small"
      ? "size-5"
      : "size-6";

    const selectedVariantClass = variantClasses[variant] || variantClasses["slate-solid"];

    return (
      <button
        ref={ref}
        className={`group inline-flex justify-center items-center shrink-0 transition-all duration-300 hover:opacity-80 active:scale-95 cursor-pointer ${sizeClass} ${selectedVariantClass} ${className}`}
        {...props}
      >
        {icon ? (
          <span
            style={{
              maskImage: `url("${getIconSrc(icon)}")`,
              WebkitMaskImage: `url("${getIconSrc(icon)}")`,
            }}
            className={`bg-current mask-contain mask-no-repeat mask-center shrink-0 transition-transform duration-300 group-hover:-translate-y-1 ${iconSizeClass}`}
            aria-hidden="true"
          />
        ) : (
          children
        )}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";

export default IconButton;
