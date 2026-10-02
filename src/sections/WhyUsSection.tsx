"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const headerDropDown: Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const gridContainerVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardItemVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
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
        ? "We are available 24/7 to provide instant medical aid in every critical moment."
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

  const renderBenefitCard = (benefit: Benefit) => (
    <div
      key={benefit.id}
      className="why-us-card self-stretch w-full h-full inline-flex justify-start items-start gap-3 shadow-sm"
    >
      {/* Icon container */}
      <div className="card-icon-box p-4 rounded-2xl flex justify-center items-center shrink-0">
        <span
          style={{
            maskImage: `url("/icons/${benefit.iconName}.svg")`,
            WebkitMaskImage: `url("/icons/${benefit.iconName}.svg")`,
          }}
          className="card-icon size-6 mask-contain mask-no-repeat mask-center shrink-0"
          aria-hidden="true"
        />
      </div>
      <div className="flex-1 inline-flex flex-col justify-start items-start gap-1">
        <h3 className="card-title self-stretch justify-start text-base font-medium font-poppins leading-snug">
          {benefit.title}
        </h3>
        <p className="card-desc self-stretch justify-start text-sm font-normal font-poppins leading-relaxed text-justify">
          {benefit.description}
        </p>
      </div>
    </div>
  );

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

        {/* 2-Column Responsive Grid Layout where row cards match height */}
        <motion.div
          className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch"
          variants={gridContainerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {/* Row 1: Fast Response & Cost Transparency */}
          <motion.div variants={cardItemVariant} className="h-full flex">
            {renderBenefitCard(benefits[0])}
          </motion.div>
          <motion.div variants={cardItemVariant} className="h-full flex">
            {renderBenefitCard(benefits[2])}
          </motion.div>

          {/* Row 2: Seamless Experience & Personalized Service */}
          <motion.div variants={cardItemVariant} className="h-full flex">
            {renderBenefitCard(benefits[1])}
          </motion.div>
          <motion.div variants={cardItemVariant} className="h-full flex">
            {renderBenefitCard(benefits[3])}
          </motion.div>
        </motion.div>

      </div>

    </section>
  );
};
