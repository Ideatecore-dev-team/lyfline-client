"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, MessageSquareCode } from "lucide-react";
import { Button } from "@/shared/ui/Button";

export const CtaSection: React.FC = () => {
  return (
    <section className="py-12 md:py-16 bg-[#FAFCFF] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* The CTA blue banner card */}
        <motion.div
          className="relative bg-gradient-to-br from-primary to-primary-hover rounded-[32px] p-8 md:p-14 text-white overflow-hidden shadow-2xl shadow-primary/25 border border-white/10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Mockup custom graphic elements in background */}
          <div className="absolute right-0 bottom-0 w-[45%] h-full opacity-10 pointer-events-none select-none flex items-end justify-end">
            <span className="text-[300px] font-black leading-none select-none text-white translate-y-24 translate-x-12">✦</span>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Title Column */}
            <div className="lg:col-span-7 text-left">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
                Ready to start your <br />
                international health journey?
              </h2>
            </div>

            {/* Actions Column */}
            <div className="lg:col-span-5 flex flex-wrap gap-4 items-center justify-start lg:justify-end">
              <Button
                variant="ghost"
                className="bg-white text-primary hover:bg-slate-100 hover:shadow-lg hover:shadow-white/10 gap-2 font-bold px-8 py-4 text-base transition-all"
              >
                Book an Appointment <ArrowUpRight className="w-5 h-5" />
              </Button>
              
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 gap-2 font-bold px-8 py-4 text-base transition-all"
              >
                <MessageSquareCode className="w-5 h-5" /> Consult Now!
              </Button>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};
