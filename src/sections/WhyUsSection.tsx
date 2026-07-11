"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const headerDropDown: Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const colLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

const colRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: "easeOut", delay: 0.1 } },
};

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
      title: lang === "en" ? "Fast Response" : "Tanggapan Cepat",
      description: lang === "en"
        ? "We are available 24/7 to provide instant medical aid in every critical moment.s"
        : "Kami tersedia 24/7 untuk memberikan bantuan medis instan di setiap momen kritis.",
      iconName: "Message 18",
    },
    {
      id: "2",
      title: lang === "en" ? "Seamless Experience" : "Pengalaman Tanpa Hambatan",
      description: lang === "en"
        ? "Enjoy a smooth, practical, and hassle-free journey from the moment you contact us."
        : "Nikmati perjalanan yang mulus, praktis, dan bebas repot sejak Anda menghubungi kami.",
      iconName: "Profile Accepted 2",
    },
    {
      id: "3",
      title: lang === "en" ? "Cost Transparency" : "Transparansi Biaya",
      description: lang === "en"
        ? "Our services are 100% free of charge. No hidden fees. You only pay your hospital bill directly to the healthcare facility."
        : "Layanan kami 100% gratis. Tanpa biaya tersembunyi. Anda hanya membayar tagihan rumah sakit langsung ke fasilitas kesehatan.",
      iconName: "Dollar Circle",
    },
    {
      id: "4",
      title: lang === "en" ? "Personalized Service" : "Layanan Personal",
      description: lang === "en"
        ? "Get custom-tailored treatment plans according to your health needs."
        : "Dapatkan rencana perawatan yang disesuaikan dengan kebutuhan kesehatan Anda.",
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

      <div className="w-full max-w-[1440px] px-6 md:px-16 lg:px-24 xl:px-36 relative z-10 flex flex-col justify-start items-start gap-8">

        {/* Header Section */}
        <motion.div
          className="self-stretch flex flex-col justify-start items-start gap-1"
          variants={headerDropDown}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <span className="text-primary/50 text-sm font-normal font-poppins">
            {lang === "en" ? "WHY LYFLINE?" : "MENGAPA LYFLINE?"}
          </span>
          <h2 className="text-primary text-3xl font-medium font-poppins">
            {lang === "en" ? "Built on Trust, Driven with Care" : "Dibangun di Atas Kepercayaan, Didorong dengan Kepedulian"}
          </h2>
        </motion.div>

        {/* 2-Column Benefits Layout */}
        <div className="self-stretch flex flex-col md:flex-row justify-start items-start gap-4">

          {/* Column 1 (No Hidden Fees, End-to-End Guided Care) */}
          <motion.div
            className="flex-1 flex flex-col justify-start items-start gap-4 w-full"
            variants={colLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >

            {/* Card 1: No Hidden Fees (Hover/Highlighted State) */}
            <div
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
            </div>

            {/* Card 2: End-to-End Guided Care (Default State) */}
            <div
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
            </div>

          </motion.div>

          {/* Column 2 (Flexible Treatment Packages, Transparent Procedures & Info) */}
          <motion.div
            className="flex-1 flex flex-col justify-start items-start gap-4 w-full"
            variants={colRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >

            {/* Card 3: Flexible Treatment Packages (Default State) */}
            <div
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
            </div>

            {/* Card 4: Transparent Procedures & Info (Default State) */}
            <div
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
            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
};
