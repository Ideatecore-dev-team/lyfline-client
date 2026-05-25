"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { HOSPITALS } from "@/entities";
import { Button } from "@/shared/ui/Button";
import { useLanguage } from "@/shared/lib/LanguageContext";

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
  const { lang, t } = useLanguage();

  return (
    <section id="partners" className="py-16 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-6 md:px-8 text-center">
        
        {/* Section Headline */}
        <h2 className="text-base md:text-lg font-medium text-neutral-dark mb-10 tracking-wide">
          {lang === "en" ? (
            <>
              Partnered with <span className="text-[#E02828] font-bold">30+</span> hospitals accross <span className="text-[#E02828] font-bold">7</span> countries
            </>
          ) : (
            <>
              Bekerjasama dengan <span className="text-[#E02828] font-bold">30+</span> rumah sakit di <span className="text-[#E02828] font-bold">7</span> negara
            </>
          )}
        </h2>

        {/* Partners Logogrid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 items-stretch justify-center mb-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {HOSPITALS.map((hospital) => (
            <motion.div
              key={hospital.id}
              variants={itemVariants}
              className="flex flex-col items-center justify-between p-5 h-36 rounded-2xl bg-white border border-slate-100 hover:shadow-lg hover:shadow-slate-100/50 hover:border-primary/20 transition-all duration-300 group cursor-pointer relative"
            >
              {/* Country Flag centered at the top */}
              <div className="flex items-center justify-center">
                <Image
                  src={hospital.flag}
                  alt={hospital.country}
                  width={20}
                  height={13}
                  className="w-5 h-auto object-contain rounded-sm shadow-xs border border-slate-100"
                  style={{ height: "auto" }}
                />
              </div>

              {/* Hospital Logo Centered below the flag */}
              <div className="flex-grow flex items-center justify-center w-full max-h-[60px] mt-2">
                <Image
                  src={hospital.logo}
                  alt={hospital.name}
                  width={140}
                  height={50}
                  className="max-h-[45px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All CTA */}
        <div className="flex justify-center mt-6">
          <Button 
            variant="outline" 
            size="sm" 
            className="group gap-2 rounded-full px-7 py-3 text-xs font-bold border-[#3F71B7] text-[#3F71B7] hover:bg-[#3F71B7]/5 hover:border-[#3F71B7]"
          >
            {t("partners.btn.view")}
          </Button>
        </div>

      </div>
    </section>
  );
};
