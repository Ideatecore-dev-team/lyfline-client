"use client";

import React from "react";
import Image from "next/image";
import { motion, HTMLMotionProps } from "framer-motion";

interface HospitalPartnerCardProps extends HTMLMotionProps<"div"> {
  name: string;
  logo: string;
  country: string;
  flag?: string;
}

export const HospitalPartnerCard: React.FC<HospitalPartnerCardProps> = ({
  name,
  logo,
  country,
  flag,
  ...props
}) => {
  return (
    <motion.div
      {...props}
      className="bg-white rounded-3xl p-6 shadow-[0px_2px_2px_0px_rgba(0,0,0,0.05)] outline-1 outline-offset-[-1px] outline-gray-200 flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-md h-36 relative overflow-hidden"
    >
      <div className="relative w-full h-12 flex items-center justify-center">
        {logo ? (
          <Image
            src={logo}
            alt={`${name} Logo`}
            width={160}
            height={48}
            className="max-h-12 object-contain"
          />
        ) : (
          <span className="text-primary font-poppins font-semibold text-center text-sm line-clamp-2">
            {name}
          </span>
        )}
      </div>
      
      {/* Country label with optional flag */}
      <div className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-100 rounded-full px-2.5 py-1">
        {flag && (
          <div className="w-3.5 h-2.5 relative overflow-hidden rounded-[1px]">
            <Image
              src={flag}
              alt={`${country} flag`}
              fill
              className="object-contain"
            />
          </div>
        )}
        <span className="text-slate-500 text-[10px] font-semibold font-poppins tracking-wider uppercase">
          {country}
        </span>
      </div>
    </motion.div>
  );
};

export default HospitalPartnerCard;
