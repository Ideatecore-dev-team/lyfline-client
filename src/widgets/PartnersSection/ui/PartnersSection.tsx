"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { HOSPITALS } from "@/entities";
import { Button } from "@/shared/ui/Button";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export const PartnersSection: React.FC = () => {
  return (
    <section id="partners" className="py-16 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-6 md:px-8 text-center">
        
        {/* Section Headline */}
        <p className="text-sm font-semibold text-neutral-muted mb-8 tracking-wide">
          Partnered with <span className="text-accent font-bold">30+</span> hospitals across <span className="text-accent font-bold">7</span> countries
        </p>

        {/* Partners Logogrid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 items-center justify-center mb-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {HOSPITALS.map((hospital) => (
            <motion.div
              key={hospital.id}
              variants={itemVariants}
              className="flex flex-col items-center justify-center p-6 h-28 rounded-2xl bg-[#FAFCFF] border border-slate-100 hover:shadow-lg hover:shadow-slate-100/50 hover:border-primary/20 transition-all duration-300 group cursor-pointer relative overflow-hidden"
            >
              {/* Flag Badge indicator */}
              <span className="absolute top-2 right-3 text-sm" title={hospital.country}>
                {hospital.flag}
              </span>

              {/* Text logo styled beautifully (since it's a placeholder mockup) */}
              <div className="flex flex-col items-center">
                <span className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-1">
                  HOSPITAL PARTNER
                </span>
                <span className="text-sm font-extrabold text-neutral-dark group-hover:text-primary transition-colors text-center">
                  {hospital.name}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All CTA */}
        <div className="flex justify-center mt-6">
          <Button variant="outline" size="sm" className="group gap-2 border-primary/30 text-primary hover:border-primary">
            View All Partners <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

      </div>
    </section>
  );
};
