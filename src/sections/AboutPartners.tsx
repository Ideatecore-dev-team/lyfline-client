"use client";

import React from "react";
import { motion } from "framer-motion";
import { HOSPITALS } from "@/data/mockData";
import { HospitalPartnerCard } from "@/components/HospitalPartnerCard";
import { Button } from "@/components/Button";
import { useLanguage } from "@/context/LanguageContext";

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

export const AboutPartners: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 md:py-24 bg-white border-t border-slate-50">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Section Headings */}
        <span className="text-xs font-bold text-[#95B0D7] tracking-widest uppercase mb-3 block text-left font-poppins">
          EXPERTISE ACROSS THE WORLD
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-12 text-left">
          <span className="text-accent">30+</span> Partners Across <span className="text-accent">7</span> Countries
        </h2>

        {/* Partners Logo grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 items-stretch justify-center mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {HOSPITALS.map((hospital) => (
            <HospitalPartnerCard
              key={hospital.id}
              variants={itemVariants}
              name={hospital.name}
              logo={hospital.logo}
              country={hospital.country}
              flag={hospital.flag}
            />
          ))}
        </motion.div>

        {/* View All CTA */}
        <div className="flex justify-center">
          <Button 
            variant="outline" 
            size="sm" 
            className="group gap-2 rounded-full px-7 py-3 text-xs font-bold border-primary text-primary hover:bg-primary/5 hover:border-primary"
          >
            {t("partners.btn.view")}
          </Button>
        </div>

      </div>
    </section>
  );
};
