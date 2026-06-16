import * as React from "react";

export type BadgeVariant =
  | "green"
  | "red"
  | "blue"
  | "yellow"
  | "purple"
  | "gray"
  | "indigo"
  | "orange";

// Keep legacy variants and support children for backward compatibility
export interface BadgeProps {
  text?: string;
  variant?: BadgeVariant | "primary" | "secondary" | "success" | "accent" | "neutral";
  className?: string;
  showDot?: boolean;
  children?: React.ReactNode;
  customColor?: string;
}

const variantClasses: Record<BadgeVariant, { container: string; dot: string; text: string }> = {
  green: {
    container: "bg-green-50/80 border border-green-100",
    dot: "bg-green-400",
    text: "text-green-500",
  },
  red: {
    container: "bg-red-50/80 border border-red-100",
    dot: "bg-red-400",
    text: "text-red-500",
  },
  blue: {
    container: "bg-blue-50/80 border border-blue-100",
    dot: "bg-blue-400",
    text: "text-blue-500",
  },
  yellow: {
    container: "bg-yellow-50/80 border border-yellow-100",
    dot: "bg-yellow-400",
    text: "text-yellow-600",
  },
  purple: {
    container: "bg-purple-50/80 border border-purple-100",
    dot: "bg-purple-400",
    text: "text-purple-500",
  },
  gray: {
    container: "bg-slate-50/80 border border-slate-100",
    dot: "bg-slate-400",
    text: "text-slate-500",
  },
  indigo: {
    container: "bg-indigo-50/80 border border-indigo-100",
    dot: "bg-indigo-400",
    text: "text-indigo-500",
  },
  orange: {
    container: "bg-orange-50/80 border border-orange-100",
    dot: "bg-orange-400",
    text: "text-orange-500",
  },
};

// Map old variants to new ones
const mapVariant = (v?: BadgeProps["variant"]): BadgeVariant => {
  if (!v) return "green";
  if (v === "primary") return "blue";
  if (v === "accent") return "red";
  if (v === "success") return "green";
  if (v === "neutral" || v === "secondary") return "gray";
  return v as BadgeVariant;
};

export function Badge({
  text,
  variant = "green",
  className = "",
  showDot = true,
  children,
  customColor,
}: BadgeProps) {
  let resolvedVariant = mapVariant(variant);
  let resolvedCustomColor = customColor;

  if (resolvedCustomColor) {
    const lowerColor = resolvedCustomColor.toLowerCase().trim();
    if (lowerColor in variantClasses) {
      resolvedVariant = lowerColor as BadgeVariant;
      resolvedCustomColor = undefined;
    }
  }

  const selected = variantClasses[resolvedVariant] || variantClasses.green;

  const style: React.CSSProperties = resolvedCustomColor
    ? {
        backgroundColor: resolvedCustomColor.startsWith("#") ? `${resolvedCustomColor}12` : resolvedCustomColor,
        borderColor: resolvedCustomColor.startsWith("#") ? `${resolvedCustomColor}26` : resolvedCustomColor,
        color: resolvedCustomColor,
        borderWidth: "1px",
        borderStyle: "solid",
      }
    : {};

  return (
    <div
      style={style}
      className={`px-2.5 py-1.5 ${resolvedCustomColor ? "" : selected.container} rounded-[16px] inline-flex justify-center items-center gap-2 transition-all ${className}`}
    >
      {showDot && (
        <div
          style={resolvedCustomColor ? { backgroundColor: resolvedCustomColor } : {}}
          className={`size-1.5 ${resolvedCustomColor ? "" : selected.dot} rounded-full`}
        />
      )}
      <div className={`justify-start ${resolvedCustomColor ? "" : selected.text} text-sm font-normal font-sans`}>
        {text !== undefined ? text : children}
      </div>
    </div>
  );
}

export default Badge;
