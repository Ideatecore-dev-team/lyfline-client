import * as React from "react";
import Image from "next/image";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface HospitalPartnerCardProps extends HTMLMotionProps<"div"> {
  name: string;
  logo: string;
  country: string;
  flag: string;
}

export const HospitalPartnerCard: React.FC<HospitalPartnerCardProps> = ({
  name,
  logo,
  country,
  flag,
  className,
  ...props
}) => {
  return (
    <motion.div
      className={cn(
        "flex flex-col items-center justify-between p-5 h-36 rounded-2xl bg-white border border-slate-100 hover:shadow-lg hover:shadow-slate-100/50 hover:border-primary/20 transition-all duration-300 group cursor-pointer relative",
        className
      )}
      {...props}
    >
      {/* Country Flag centered at the top */}
      <div className="flex items-center justify-center">
        <Image
          src={flag}
          alt={country}
          width={20}
          height={13}
          className="w-5 h-auto object-contain rounded-sm shadow-xs border border-slate-100"
          style={{ height: "auto" }}
        />
      </div>

      {/* Hospital Logo Centered below the flag */}
      <div className="grow flex items-center justify-center w-full max-h-[60px] mt-2">
        <Image
          src={logo}
          alt={name}
          width={140}
          height={50}
          className="max-h-[45px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>
    </motion.div>
  );
};
