"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ThumbsUp, Star, Smile, MessageSquare } from "lucide-react";

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
          {/* Bottom-right red accent shape */}
          <div className="absolute bottom-0 right-0 w-28 h-28 bg-accent rounded-tl-[48px] z-0 pointer-events-none translate-x-1 translate-y-1" />

          {/* Banner grid layout */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* LEFT COLUMN: TITLE & BOOK APPOINTMENT BUTTON */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <h2 className="text-3xl md:text-4xl lg:text-[44px] font-extrabold tracking-tight text-white mb-8 leading-tight max-w-xl">
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

            {/* RIGHT COLUMN: MEDICAL CROSS & FLOATING BADGES */}
            <div className="lg:col-span-5 flex items-center justify-center w-full">
              <div className="relative w-full max-w-[360px] h-[280px] flex items-center justify-center">
                
                {/* Centered White Medical Cross */}
                <div className="relative z-10 opacity-95 drop-shadow-xl text-white">
                  <svg width="180" height="180" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path 
                      d="M75 10C75 4.47715 79.4772 0 85 0H135C140.523 0 145 4.47715 145 10V75H210C215.523 75 220 79.4772 220 85V135C220 140.523 215.523 145 210 145H145V210C145 215.523 140.523 220 135 220H85C79.4772 220 75 215.523 75 210V145H10C4.47715 145 0 140.523 0 135V85C0 79.4772 4.47715 75 10 75H75V10Z" 
                      fill="currentColor"
                    />
                  </svg>
                </div>

                {/* Floating Glassmorphic Badges */}
                
                {/* 1. Thumbs Up (Top Right) */}
                <motion.div 
                  className="absolute top-[8%] right-[10%] z-20 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-lg cursor-pointer"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                >
                  <ThumbsUp className="w-5 h-5 fill-current" />
                </motion.div>

                {/* 2. Star/Flower (Middle Left) */}
                <motion.div 
                  className="absolute top-[32%] left-[4%] z-20 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-lg cursor-pointer"
                  animate={{ scale: [1, 1.06, 1] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                >
                  <Star className="w-5 h-5 fill-current" />
                </motion.div>

                {/* 3. Smiling Face (Bottom Right) */}
                <motion.div 
                  className="absolute bottom-[20%] right-[6%] z-20 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-lg cursor-pointer"
                  animate={{ y: [0, 6, 0] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                >
                  <Smile className="w-5 h-5 fill-current" />
                </motion.div>

                {/* 4. Consult Now! Pill Button (Bottom Left) */}
                <a
                  href="https://wa.me/6281291578559"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-[10%] left-[2%] z-20 px-5 py-3 rounded-full bg-white/25 backdrop-blur-md border border-white/30 text-white font-bold text-sm tracking-wide flex items-center gap-2 shadow-lg hover:bg-white/40 active:scale-95 transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 fill-current" /> Consult Now!
                </a>

              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};
