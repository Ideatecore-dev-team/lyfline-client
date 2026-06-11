"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { DOCTORS } from "@/data/mockData";

interface DoctorsFilterSectionProps {
  filters: {
    region: string;
    hospital: string;
    specialty: string;
  };
  onFilterChange: (key: "region" | "hospital" | "specialty", value: string) => void;
}

export const DoctorsFilterSection: React.FC<DoctorsFilterSectionProps> = ({
  filters,
  onFilterChange,
}) => {
  const { t } = useLanguage();

  // Extract unique options dynamically from DOCTORS mock list
  const regions = React.useMemo(() => {
    return Array.from(new Set(DOCTORS.map((d) => d.region))).sort();
  }, []);

  const hospitals = React.useMemo(() => {
    return Array.from(new Set(DOCTORS.map((d) => d.hospital))).sort();
  }, []);

  const specialties = React.useMemo(() => {
    return Array.from(new Set(DOCTORS.map((d) => d.specialty))).sort();
  }, []);

  return (
    <section className="bg-white py-4 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-col gap-3">
          {/* Label */}
          <span className="text-[10px] font-extrabold tracking-widest text-[#E02828] uppercase">
            {t("doctors.filter.label")}
          </span>

          {/* Select Dropdowns Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            
            {/* Region Dropdown */}
            <div className="relative w-full">
              <select
                value={filters.region}
                onChange={(e) => onFilterChange("region", e.target.value)}
                className="w-full bg-white border border-slate-200/80 rounded-[16px] px-4.5 py-3.5 text-xs font-semibold text-slate-700 appearance-none cursor-pointer focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 shadow-xs transition-colors"
              >
                <option value="">{t("doctors.filter.region")}</option>
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
              <div className="absolute right-4.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>

            {/* Hospital Dropdown */}
            <div className="relative w-full">
              <select
                value={filters.hospital}
                onChange={(e) => onFilterChange("hospital", e.target.value)}
                className="w-full bg-white border border-slate-200/80 rounded-[16px] px-4.5 py-3.5 text-xs font-semibold text-slate-700 appearance-none cursor-pointer focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 shadow-xs transition-colors"
              >
                <option value="">{t("doctors.filter.hospital")}</option>
                {hospitals.map((hospital) => (
                  <option key={hospital} value={hospital}>
                    {hospital}
                  </option>
                ))}
              </select>
              <div className="absolute right-4.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>

            {/* Specialty Dropdown */}
            <div className="relative w-full">
              <select
                value={filters.specialty}
                onChange={(e) => onFilterChange("specialty", e.target.value)}
                className="w-full bg-white border border-slate-200/80 rounded-[16px] px-4.5 py-3.5 text-xs font-semibold text-slate-700 appearance-none cursor-pointer focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 shadow-xs transition-colors"
              >
                <option value="">{t("doctors.filter.specialty")}</option>
                {specialties.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
              <div className="absolute right-4.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
