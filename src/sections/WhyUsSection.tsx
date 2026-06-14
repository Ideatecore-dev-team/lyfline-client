"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface Benefit {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export const WhyUsSection: React.FC = () => {
  const { lang } = useLanguage();

  const benefits: Benefit[] = [
    {
      id: "1",
      title: lang === "en" ? "No Hidden Fees" : "Tanpa Biaya Tersembunyi",
      description: lang === "en"
        ? "Transparent pricing with no unexpected charges or complicated payment schemes."
        : "Harga transparan tanpa biaya tak terduga atau skema pembayaran yang rumit.",
      iconName: "Dollar Circle",
    },
    {
      id: "2",
      title: lang === "en" ? "End-to-End Guided Care" : "Perawatan Terpandu Ujung-ke-Ujung",
      description: lang === "en"
        ? "We support and guide you throughout your entire medical journey, from consultation to recovery."
        : "Kami mendukung dan membimbing Anda sepanjang perjalanan medis Anda, dari konsultasi hingga pemulihan.",
      iconName: "Profile Accepted 2",
    },
    {
      id: "3",
      title: lang === "en" ? "Flexible Treatment Packages" : "Paket Perawatan Fleksibel",
      description: lang === "en"
        ? "Choose from a variety of care and treatment options tailored to your medical needs."
        : "Pilih dari berbagai pilihan perawatan dan pengobatan yang disesuaikan dengan kebutuhan medis Anda.",
      iconName: "Activity 1",
    },
    {
      id: "4",
      title: lang === "en" ? "Transparent Procedures & Information" : "Prosedur & Informasi Transparan",
      description: lang === "en"
        ? "Clear communication and honest medical information at every stage of your care."
        : "Komunikasi yang jelas dan informasi medis yang jujur di setiap tahap perawatan Anda.",
      iconName: "Shield Tick",
    },
  ];

  return (
    <section id="why-us" className="bg-white w-full pb-16 relative overflow-hidden flex flex-col justify-start items-center">

      {/* Decorative Brand Watermark */}
      <span
        style={{
          maskImage: 'url("/icons/assets/lyflineQuarterCircle.svg")',
          WebkitMaskImage: 'url("/icons/assets/lyflineQuarterCircle.svg")',
        }}
        className="absolute top-0 left-0 size-[100px] pointer-events-none select-none bg-[#F1F7FF] mask-contain mask-no-repeat mask-center shrink-0 z-0"
        aria-hidden="true"
      />

      <div className="w-full max-w-[1440px] px-6 md:px-36 relative z-10 flex flex-col justify-start items-start gap-8">

        {/* Header Section */}
        <div className="self-stretch flex flex-col justify-start items-start gap-1">
          <span className="text-primary/50 text-sm font-normal font-poppins">
            {lang === "en" ? "WHY LYFLINE?" : "MENGAPA LYFLINE?"}
          </span>
          <h2 className="text-primary text-3xl font-medium font-poppins">
            {lang === "en" ? "We are a Partner in Care" : "Kami adalah Mitra dalam Perawatan"}
          </h2>
        </div>

        {/* 2-Column Benefits Layout */}
        <div className="self-stretch flex flex-col md:flex-row justify-start items-start gap-4">

          {/* Column 1 (No Hidden Fees, End-to-End Guided Care) */}
          <div className="flex-1 flex flex-col justify-start items-start gap-4 w-full">

            {/* Card 1: No Hidden Fees (Hover/Highlighted State) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              viewport={{ once: true }}
              className="self-stretch p-6 bg-primary rounded-[32px] inline-flex justify-start items-start gap-3 border border-transparent shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* White Icon container */}
              <div className="p-4 bg-slate-100 rounded-2xl border border-primary flex justify-center items-center shrink-0">
                <span
                  style={{
                    maskImage: `url("/icons/${benefits[0].iconName}.svg")`,
                    WebkitMaskImage: `url("/icons/${benefits[0].iconName}.svg")`,
                  }}
                  className="size-6 bg-primary mask-contain mask-no-repeat mask-center shrink-0"
                  aria-hidden="true"
                />
              </div>
              <div className="flex-1 inline-flex flex-col justify-start items-start gap-1">
                <h3 className="self-stretch justify-start text-white text-base font-medium font-poppins leading-snug">
                  {benefits[0].title}
                </h3>
                <p className="self-stretch justify-start text-white text-sm font-normal font-poppins opacity-90 leading-relaxed">
                  {benefits[0].description}
                </p>
              </div>
            </motion.div>

            {/* Card 2: End-to-End Guided Care (Default State) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="self-stretch p-6 bg-primary/10 rounded-[32px] inline-flex justify-start items-start gap-3 border border-transparent hover:border-primary/20 hover:bg-primary/15 transition-all duration-300"
            >
              {/* Default Slate Icon container */}
              <div className="p-4 bg-primary rounded-2xl border border-primary flex justify-center items-center shrink-0">
                <span
                  style={{
                    maskImage: `url("/icons/${benefits[1].iconName}.svg")`,
                    WebkitMaskImage: `url("/icons/${benefits[1].iconName}.svg")`,
                  }}
                  className="size-6 bg-white mask-contain mask-no-repeat mask-center shrink-0"
                  aria-hidden="true"
                />
              </div>
              <div className="flex-1 inline-flex flex-col justify-start items-start gap-1">
                <h3 className="self-stretch justify-start text-primary text-base font-medium font-poppins leading-snug">
                  {benefits[1].title}
                </h3>
                <p className="self-stretch justify-start text-black text-sm font-normal font-poppins opacity-80 leading-relaxed">
                  {benefits[1].description}
                </p>
              </div>
            </motion.div>

          </div>

          {/* Column 2 (Flexible Treatment Packages, Transparent Procedures & Info) */}
          <div className="flex-1 flex flex-col justify-start items-start gap-4 w-full">

            {/* Card 3: Flexible Treatment Packages (Default State) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
              className="self-stretch p-6 bg-primary/10 rounded-[32px] inline-flex justify-start items-start gap-3 border border-transparent hover:border-primary/20 hover:bg-primary/15 transition-all duration-300"
            >
              {/* Default Slate Icon container */}
              <div className="p-4 bg-primary rounded-2xl border border-primary flex justify-center items-center shrink-0">
                <span
                  style={{
                    maskImage: `url("/icons/${benefits[2].iconName}.svg")`,
                    WebkitMaskImage: `url("/icons/${benefits[2].iconName}.svg")`,
                  }}
                  className="size-6 bg-white mask-contain mask-no-repeat mask-center shrink-0"
                  aria-hidden="true"
                />
              </div>
              <div className="flex-1 inline-flex flex-col justify-start items-start gap-1">
                <h3 className="self-stretch justify-start text-primary text-base font-medium font-poppins leading-snug">
                  {benefits[2].title}
                </h3>
                <p className="self-stretch justify-start text-black text-sm font-normal font-poppins opacity-80 leading-relaxed">
                  {benefits[2].description}
                </p>
              </div>
            </motion.div>

            {/* Card 4: Transparent Procedures & Info (Default State) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              viewport={{ once: true }}
              className="self-stretch p-6 bg-primary/10 rounded-[32px] inline-flex justify-start items-start gap-3 border border-transparent hover:border-primary/20 hover:bg-primary/15 transition-all duration-300"
            >
              {/* Default Slate Icon container */}
              <div className="p-4 bg-primary rounded-2xl border border-primary flex justify-center items-center shrink-0">
                <span
                  style={{
                    maskImage: `url("/icons/${benefits[3].iconName}.svg")`,
                    WebkitMaskImage: `url("/icons/${benefits[3].iconName}.svg")`,
                  }}
                  className="size-6 bg-white mask-contain mask-no-repeat mask-center shrink-0"
                  aria-hidden="true"
                />
              </div>
              <div className="flex-1 inline-flex flex-col justify-start items-start gap-1">
                <h3 className="self-stretch justify-start text-primary text-base font-medium font-poppins leading-snug">
                  {benefits[3].title}
                </h3>
                <p className="self-stretch justify-start text-black text-sm font-normal font-poppins opacity-80 leading-relaxed">
                  {benefits[3].description}
                </p>
              </div>
            </motion.div>

          </div>

        </div>

      </div>

    </section>
  );
};
