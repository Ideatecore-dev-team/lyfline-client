import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface StatCardProps extends HTMLMotionProps<"div"> {
  value: string;
  label: string;
  valueClassName?: string;
  labelClassName?: string;
  delay?: number;
}

export const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  valueClassName,
  labelClassName,
  delay = 0,
  className,
  ...props
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn(
        "rounded-3xl p-5 flex flex-col justify-between min-h-[140px] md:min-h-[160px] transition-all duration-300 hover:-translate-y-1 hover:shadow-md",
        className
      )}
      {...props}
    >
      <h3 className={cn("text-3xl md:text-4xl font-extrabold tracking-tight", valueClassName)}>
        {value}
      </h3>
      <p className={cn("text-[10px] md:text-xs font-semibold leading-snug", labelClassName)}>
        {label}
      </p>
    </motion.div>
  );
};
