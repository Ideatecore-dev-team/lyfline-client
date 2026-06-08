"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { NoiseOverlay } from "@/components/NoiseOverlay";

export const CtaSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-[#FAFCFF] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* The CTA blue banner card */}
        <motion.div
          className="relative bg-primary rounded-[40px] p-8 md:p-16 lg:px-20 lg:py-16 text-white overflow-hidden shadow-2xl shadow-primary/25 border border-white/10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Heart Accent Ornament in the bottom-right corner as shown in Figma */}
          <div className="absolute bottom-0 right-0 w-[110px] h-[110px] pointer-events-none opacity-90 select-none z-0">
            <Image
              src="/icons/Hearts icon.svg"
              alt="Heart Ornament"
              width={110}
              height={110}
              className="w-full h-full object-contain filter drop-shadow-[0_4px_8px_rgba(224,40,40,0.25)]"
            />
          </div>

          {/* Decorative background glows */}
          <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[60%] bg-white/5 blur-2xl rounded-full pointer-events-none" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[50%] bg-white/5 blur-2xl rounded-full pointer-events-none" />

          {/* Noise Texture Overlay */}
          <NoiseOverlay opacity={0.6} />

          {/* Banner grid layout */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* LEFT COLUMN: TITLE & BOOK APPOINTMENT BUTTON */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <h2 className="text-3xl md:text-4xl lg:text-[44px] font-medium tracking-tight text-white mb-8 leading-tight max-w-xl font-poppins">
                Ready to start your <br />
                international health journey?
              </h2>
              
              <a
                href="#"
                className="inline-flex items-center gap-2.5 px-7 py-4 border-2 border-white rounded-full text-white font-bold text-base bg-transparent hover:bg-white hover:text-primary hover:shadow-lg transition-all duration-300 w-fit cursor-pointer animate-pulse-slow"
              >
                Book an Appointment <ArrowRight className="w-5 h-5" />
              </a>
            </div>

            {/* RIGHT COLUMN: BRAND LOGO */}
            <div className="lg:col-span-5 flex items-center justify-center w-full">
              <div className="relative w-[220px] h-[220px] select-none pointer-events-none">
                
                {/* Lyfline Logo Mark Composition */}
                <div className="relative w-[220px] h-[220px] z-10 drop-shadow-[0_8px_16px_rgba(0,0,0,0.15)]">
                  {/* 1. Faint Blue Heart Shadow (Top Left Background) */}
                  <div className="absolute top-[-12px] left-[-24px] w-[137px] h-[137px] opacity-20 z-0">
                    <LogoShape className="w-full h-full" fill="#3F71B7" />
                  </div>

                  {/* 2. Main White Logo Shape (Spotted Heart & Squares) */}
                  <div className="absolute top-0 left-0 w-[220px] h-[220px] z-10">
                    <Image
                      src="/icons/HeartPitaBintik.svg"
                      alt="Lyfline White Shape"
                      width={220}
                      height={220}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

// Helper component for the Lyfline Logo shape
const LogoShape: React.FC<{ className?: string; fill?: string }> = ({ className, fill = "currentColor" }) => (
  <svg viewBox="0 0 186 186" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M131.406 0.446799C112.704 3.79861 97.3369 18.4795 93.4781 36.6802C92.6479 40.594 92.3755 48.0496 92.3656 67.1454L92.3527 92.4284L67.051 92.4413C38.4248 92.4565 34.9008 92.8869 25.5312 97.5131C14.7401 102.841 5.89253 113.094 2.03298 124.745C0.35128 129.821 0.0149414 132.214 0.000483264 139.193C-0.0139748 146.276 0.28812 148.431 1.97135 153.26C4.64457 160.931 7.29344 165.459 12.21 170.766C17.6127 176.597 23.4622 180.394 31.443 183.25L37.9446 185.576L111.972 185.788L186 186L185.773 112.03C185.561 42.7124 185.459 37.7973 184.153 33.8782C178.832 17.9107 166.958 6.09879 151.731 1.62617C146.518 0.0954966 136.584 -0.48088 131.406 0.446799Z" 
      fill={fill}
    />
  </svg>
);
