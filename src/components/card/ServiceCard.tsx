"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export interface ServiceCardProps {
  icon: string; // The filename of the SVG icon without path and extension (e.g. 'Calendar')
  title: string;
  description: string;
  variant?: "blue" | "white";
  onClick?: () => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
  variant = "blue",
  onClick
}) => {
  const { lang } = useLanguage();
  const isBlue = variant === "blue";

  return (
    <div
      onClick={onClick}
      className={`w-full max-w-96 h-80 p-6 relative rounded-3xl outline outline-offset-[-1px] flex flex-col justify-between items-start overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer ${isBlue
        ? "bg-primary outline-primary text-white shadow-primary/10"
        : "bg-white outline-gray-200 text-black shadow-slate-100"
        }`}
    >


      {/* Top Part: Icon & Text content */}
      <div className="w-full flex flex-col justify-start items-start gap-4 z-10">

        {/* Icon Container (matches style-glassmorphic on HeroSection for the blue variant) */}
        <div
          className={`p-4 rounded-2xl inline-flex justify-center items-center gap-2.5 outline outline-offset-[-1px] ${isBlue
            ? "bg-[#ECF1F8] outline-[1px] outline-[#4D7CBC]"
            : "bg-primary outline-transparent"
            }`}
        >
          <span
            style={{
              maskImage: `url("/icons/${icon}.svg")`,
              WebkitMaskImage: `url("/icons/${icon}.svg")`,
            }}
            className={`size-6 mask-contain mask-no-repeat mask-center shrink-0 ${isBlue ? "bg-primary" : "bg-white"
              }`}
            aria-hidden="true"
          />
        </div>

        {/* Title & Description */}
        <div className="self-stretch flex flex-col justify-start items-start gap-2">
          <h3
            className={`self-stretch justify-start text-2xl font-medium font-poppins leading-snug tracking-tight ${isBlue ? "text-white" : "text-primary"
              }`}
          >
            {title}
          </h3>
          <p
            className={`self-stretch justify-start text-base font-normal font-poppins leading-relaxed line-clamp-3 ${isBlue ? "text-white/85" : "text-black"
              }`}
          >
            {description}
          </p>
        </div>
      </div>

      {/* Bottom Part: Divider Line & View More */}
      <div className="w-full flex flex-col justify-start items-start gap-4 z-10 mt-auto">
        {/* Divider Line */}
        <div
          className={`self-stretch h-[1px] transition-colors duration-300 ${isBlue ? "bg-white/10 group-hover:bg-white/20" : "bg-gray-200/30 group-hover:bg-gray-300/45"
            }`}
        />

        {/* View More Row */}
        <div className="self-stretch inline-flex justify-center items-center gap-2.5">
          <span
            className={`text-sm font-medium font-poppins transition-transform duration-300 group-hover:translate-x-0.5 ${isBlue ? "text-white" : "text-red-600"
              }`}
          >
            {lang === "en" ? "View more" : "Lihat selengkapnya"}
          </span>
          <span
            style={{
              maskImage: 'url("/icons/Right 1.svg")',
              WebkitMaskImage: 'url("/icons/Right 1.svg")',
            }}
            className={`size-4 mask-contain mask-no-repeat mask-center shrink-0 transition-transform duration-300 group-hover:translate-x-1 ${isBlue ? "bg-white" : "bg-red-600"
              }`}
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
