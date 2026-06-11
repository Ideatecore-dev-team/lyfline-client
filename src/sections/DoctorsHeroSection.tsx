"use client";

import * as React from "react";
import { Search, MessageSquare } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

interface DoctorsHeroSectionProps {
  initialSearch?: string;
  onSearchSubmit: (val: string) => void;
}

export const DoctorsHeroSection: React.FC<DoctorsHeroSectionProps> = ({
  initialSearch = "",
  onSearchSubmit,
}) => {
  const [localSearch, setLocalSearch] = React.useState(initialSearch);
  const { lang, t } = useLanguage();

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearchSubmit(localSearch);
    }
  };

  const handleButtonClick = () => {
    onSearchSubmit(localSearch);
  };

  return (
    <section className="relative w-full pt-16 pb-0 bg-white overflow-visible">
      <div className="max-w-[1440px] mx-auto px-6 md:px-36 w-full overflow-visible">
        
        {/* Main Blue Banner Box */}
        <div className="relative w-full bg-primary rounded-[24px] px-6 py-8 md:px-12 md:py-10 text-white overflow-visible shadow-xl shadow-primary/10 min-h-[220px] lg:h-[220px] flex items-center">
          
          {/* Faint logo cross ornament in background */}
          <div className="absolute top-1/2 right-[32%] -translate-y-1/2 w-[180px] h-[180px] opacity-10 pointer-events-none select-none z-0">
            <svg viewBox="0 0 186 186" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M131.406 0.446799C112.704 3.79861 97.3369 18.4795 93.4781 36.6802C92.6479 40.594 92.3755 48.0496 92.3656 67.1454L92.3527 92.4284L67.051 92.4413C38.4248 92.4565 34.9008 92.8869 25.5312 97.5131C14.7401 102.841 5.89253 113.094 2.03298 124.745C0.35128 129.821 0.0149414 132.214 0.000483264 139.193C-0.0139748 146.276 0.28812 148.431 1.97135 153.26C4.64457 160.931 7.29344 165.459 12.21 170.766C17.6127 176.597 23.4622 180.394 31.443 183.25L37.9446 185.576L111.972 185.788L186 186L185.773 112.03C185.561 42.7124 185.459 37.7973 184.153 33.8782C178.832 17.9107 166.958 6.09879 151.731 1.62617C146.518 0.0954966 136.584 -0.48088 131.406 0.446799Z" 
                fill="#FFFFFF"
              />
            </svg>
          </div>

          <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-center overflow-visible">
            
            {/* Left Column: Text Content and Search input */}
            <div className="lg:col-span-7 flex flex-col items-start gap-3">
              {/* Badge/Label */}
              <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest">
                {t("doctors.hero.subtitle")}
              </span>

              {/* Title */}
              <h1 className="text-2xl md:text-3xl lg:text-[32px] font-bold tracking-tight leading-tight text-white mb-1 max-w-xl">
                {t("doctors.hero.title")}
              </h1>

              {/* Form Input Container */}
              <div className="w-full flex flex-col gap-1.5 max-w-lg">
                <label className="text-[10px] font-semibold text-white/95">
                  {lang === "en" ? "Search Doctor Name" : "Cari Nama Dokter"}
                </label>
                
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full">
                  <div className="relative grow">
                    <input
                      type="text"
                      value={localSearch}
                      onChange={(e) => setLocalSearch(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder={t("doctors.hero.search_placeholder")}
                      className="w-full bg-primary-light border-0 rounded-[12px] px-4 py-3 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-white/40 shadow-xs"
                    />
                  </div>
                  
                  <button
                    onClick={handleButtonClick}
                    className="border-2 border-white text-white hover:bg-white hover:text-primary transition-all duration-200 font-bold text-xs px-6 py-3 rounded-full flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap active:scale-95 shadow-xs"
                  >
                    <Search className="w-3.5 h-3.5" />
                    {t("doctors.hero.search_btn")}
                  </button>
                </div>
              </div>
            </div>

            {/* Empty right column on grid just to occupy space for absolute positioned doctors */}
            <div className="hidden lg:block lg:col-span-5" />

          </div>

          {/* Doctor Images Trio aligned at bottom of card and sticking out top */}
          <div className="hidden lg:flex absolute bottom-0 right-4 lg:right-6 w-[360px] h-[290px] items-end justify-end overflow-visible select-none pointer-events-none z-10">
            {/* Decorative Plus Shape */}
            <div className="absolute left-[30px] top-[70px] w-20 h-20 opacity-10 z-0">
              <div className="absolute top-1/2 left-0 w-full h-6 -translate-y-1/2 bg-white rounded-full"></div>
              <div className="absolute left-1/2 top-0 w-6 h-full -translate-x-1/2 bg-white rounded-full"></div>
            </div>

            {/* Doctor 1 (Left - Smiling man) */}
            <div className="absolute left-0 bottom-0 w-[120px] h-[230px] z-10">
              <Image
                src="/background-images/smiling-man-doctor-wearing-white-coat-in-hospital-2026-03-25-05-05-54-utc 1.png"
                alt="Doctor"
                fill
                priority
                className="object-contain object-bottom"
              />
            </div>

            {/* Doctor 3 (Right - Glasses man) */}
            <div className="absolute right-0 bottom-0 w-[130px] h-[240px] z-20">
              <Image
                src="/background-images/healthcare-smile-and-portrait-of-doctor-man-in-h-2026-03-25-03-22-12-utc(1) 1.png"
                alt="Doctor"
                fill
                priority
                className="object-contain object-bottom"
              />
            </div>

            {/* Doctor 2 (Middle - Scrubs woman) */}
            <div className="absolute left-[90px] bottom-0.5 w-[160px] h-[280px] z-30">
              <Image
                src="/background-images/Untitled 1.png"
                alt="Doctor"
                fill
                priority
                className="object-contain object-bottom"
              />
            </div>

            {/* Consult Now Button Overlay */}
            <a
              href="https://wa.me/6281291578559"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute right-[20px] bottom-[15px] z-40 bg-accent hover:bg-accent-hover text-white hover:scale-105 active:scale-95 transition-all duration-200 font-bold text-[10px] px-4 py-2.5 rounded-full flex items-center gap-1.5 shadow-xl shadow-accent/40 cursor-pointer pointer-events-auto"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-current text-white" />
              {t("doctors.hero.consult_btn")}
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};
