"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { DoctorCard } from "@/components/card/DoctorCard";
import { Doctor, DOCTORS } from "@/data/mockData";

interface DoctorsGridSectionProps {
  doctors: Doctor[];
  totalCount: number;
  isLoading: boolean;
  currentPage: number;
}

export const DoctorsGridSection: React.FC<DoctorsGridSectionProps> = ({
  doctors,
  totalCount,
  isLoading,
  currentPage,
}) => {
  const { t } = useLanguage();

  const resultsText = React.useMemo(() => {
    if (totalCount === DOCTORS.length) {
      return t("doctors.grid.showing_all");
    }
    return t("doctors.grid.showing_results").replace("{n}", totalCount.toString());
  }, [totalCount, t]);

  // Create exactly 8 slots for the grid to keep layout/height stable
  const renderSlots = () => {
    if (isLoading) {
      // Show 8 skeleton loaders
      return Array.from({ length: 8 }).map((_, i) => (
        <DoctorCard key={`skeleton-${i}`} isLoading={true} />
      ));
    }

    const slots: React.ReactNode[] = [];

    // Render actual doctors
    doctors.forEach((doctor, idx) => {
      slots.push(
        <DoctorCard key={doctor.id} doctor={doctor} isLoading={false} />
      );
    });

    // Fill remaining slots up to 8 with invisible cards to prevent grid collapse
    const remainingCount = 8 - doctors.length;
    if (remainingCount > 0) {
      for (let i = 0; i < remainingCount; i++) {
        slots.push(
          <div
            key={`placeholder-${i}`}
            className="invisible opacity-0 select-none pointer-events-none h-full"
            aria-hidden="true"
          >
            <DoctorCard isLoading={true} />
          </div>
        );
      }
    }

    return slots;
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-36">
        
        {/* Results Banner Info */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-slate-100">
          <h2 className="text-sm font-bold text-slate-800 tracking-wide">
            {resultsText}
          </h2>
          <span className="text-xs text-slate-400 font-semibold">
            {t("nav.doctors")}
          </span>
        </div>

        {/* Doctor Grid Container */}
        <div className="min-h-[760px] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage + (isLoading ? "-loading" : "-loaded") + doctors.map((d) => d.id).join("-")}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {renderSlots()}
            </motion.div>
          </AnimatePresence>

          {/* No Doctors Found State */}
          {!isLoading && doctors.length === 0 && (
            <motion.div 
              className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-slate-50/50 rounded-[32px] border border-dashed border-slate-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-base font-bold text-slate-600 mb-1">
                {t("nav.select_language") === "Select Language" 
                  ? "No Doctors Found" 
                  : "Dokter Tidak Ditemukan"}
              </p>
              <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                {t("nav.select_language") === "Select Language"
                  ? "Try resetting filters or adjusting search queries to find specialists."
                  : "Coba atur ulang filter atau sesuaikan kata kunci pencarian Anda."}
              </p>
            </motion.div>
          )}
        </div>

      </div>
    </section>
  );
};
