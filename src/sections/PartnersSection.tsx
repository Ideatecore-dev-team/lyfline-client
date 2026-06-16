"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/Button";

export interface PartnersSectionProps {
  isHomePage?: boolean;
}

export const PartnersSection: React.FC<PartnersSectionProps> = ({ isHomePage = false }) => {
  const { lang } = useLanguage();

  const countries = [
    {
      name: lang === "en" ? "Indonesia" : "Indonesia",
      flagSrc: "/Flags/ID - Indonesia.svg"
    },
    {
      name: lang === "en" ? "Singapore" : "Singapura",
      flagSrc: "/Flags/SG - Singapore.svg"
    },
    {
      name: lang === "en" ? "Malaysia" : "Malaysia",
      flagSrc: "/Flags/MY - Malaysia.svg"
    },
    {
      name: lang === "en" ? "Thailand" : "Thailand",
      flagSrc: "/Flags/TH - Thailand.svg"
    },
    {
      name: lang === "en" ? "China" : "China",
      flagSrc: "/Flags/CN - China.svg"
    },
    {
      name: lang === "en" ? "Japan" : "Jepang",
      flagSrc: "/Flags/JP - Japan.svg"
    },
    {
      name: lang === "en" ? "Korea" : "Korea",
      flagSrc: "/Flags/KR - Korea (South).svg"
    },
    {
      name: lang === "en" ? "India" : "India",
      flagSrc: "/Flags/IN - India.svg"
    },
    {
      name: lang === "en" ? "Taiwan" : "Taiwan",
      flagSrc: "/Flags/TW - Taiwan.svg"
    }
  ];

  const logos = [
    { src: "/Partners/1.png" },
    { src: "/Partners/2.png" },
    { src: "/Partners/3.png" },
    { src: "/Partners/4.png" },
    { src: "/Partners/5.png" },
    { src: "/Partners/6.png" },
    { src: "/Partners/7.png" },
    { src: "/Partners/8.png" },
    { src: "/Partners/9.png" },
    { src: "/Partners/10.png" }
  ];

  return (
    <section id="partners" className={`bg-white w-full py-16 flex flex-col justify-start items-center gap-2.5 relative overflow-hidden ${isHomePage ? "bg-transparent" : "bg-white"}`}>

      {/* Content Container */}
      <div className="w-full max-w-[1152px] px-6 md:px-12 xl:px-0 flex flex-col justify-start items-center gap-12 z-10">

        {/* Header Block */}
        <motion.div
          className="self-stretch flex flex-col justify-start items-start gap-1"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          viewport={{ once: true, margin: "-60px" }}
        >
          <div className="text-primary/50 text-sm font-normal font-poppins tracking-wider uppercase">
            {lang === "en" ? "EXPERTISE ACROSS THE WORLD" : "KEAHLIAN DI SELURUH DUNIA"}
          </div>
          <h2 className="text-primary text-3xl font-medium font-sans mt-1">
            {lang === "en" ? "40+ Partners Across These Countries" : "40+ Mitra di Negara-Negara Ini"}
          </h2>
        </motion.div>

        {/* Outer Grid of Countries and Partner Logos */}
        <div className="self-stretch flex flex-col justify-start items-center gap-8 w-full">

          {/* Countries wrap list */}
          <div className="w-full flex flex-row flex-wrap justify-center lg:justify-between items-center gap-6 lg:gap-0">
            {countries.map((country, idx) => (
              <motion.div
                key={idx}
                className="w-24 flex flex-col justify-start items-center gap-2 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.06, ease: "easeOut" }}
                viewport={{ once: true, margin: "-40px" }}
              >
                <div className="size-20 relative bg-white rounded-full shadow-[0px_2px_2px_0px_rgba(0,0,0,0.10)] outline-2 -outline-offset-2 outline-gray-200 overflow-hidden">
                  <Image
                    src={country.flagSrc}
                    alt={country.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div className="self-stretch text-center text-black text-base font-medium font-poppins group-hover:text-primary transition-colors">
                  {country.name}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Divider Line */}
          <div className="w-full h-px bg-gray-200 pointer-events-none" />

          {/* Logo Cards Grid */}
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 justify-items-center">
            {logos.map((logo, idx) => (
              <motion.div
                key={idx}
                className="w-full h-24 relative bg-white rounded-xl outline-2 -outline-offset-2 outline-stone-50 flex flex-col justify-center items-center shadow-xs transition-all duration-300 hover:shadow-md hover:border-gray-300 group overflow-hidden"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, delay: idx * 0.05, ease: [0.34, 1.56, 0.64, 1] }}
                viewport={{ once: true, margin: "-40px" }}
              >
                <Image
                  src={logo.src}
                  alt="Partner Logo"
                  fill
                  className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 30vw, 20vw"
                />
              </motion.div>
            ))}
          </div>

          {/* View All Partners CTA Button using button.tsx */}
          <div className="flex justify-center mt-4">
            <Button
              variant="outline-primary"
              text={lang === "en" ? "View All Partners" : "Lihat Semua Mitra"}
              rightIcon="Right 1"
              className="h-12 px-6 outline-2  transition-all duration-300"
            />
          </div>

        </div>

      </div>

      {/* Decorative Outer Circles */}
      <div className="size-48 left-[-100px] top-[570px] absolute bg-blue-50 rounded-full -z-10 pointer-events-none opacity-60"></div>
      <div className="size-48 left-[90%] lg:left-[1340px] top-[-104px] absolute bg-rose-50 rounded-full -z-10 pointer-events-none opacity-60"></div>

      {/* Decorative Heart Watermark */}
      {!isHomePage && (
        <span
          style={{
            maskImage: 'url("/icons/assets/lyflineHeart.svg")',
            WebkitMaskImage: 'url("/icons/assets/lyflineHeart.svg")',
          }}
          className="absolute bottom-0 right-0 size-[120px] pointer-events-none select-none opacity-10 bg-red-600/50 mask-contain mask-no-repeat mask-center shrink-0 z-0"
          aria-hidden="true"
        />
      )}

      {/* Decorative Quarter Circle Watermark (Bottom-Left) */}
      {isHomePage && (
        <span
          style={{
            maskImage: 'url("/icons/assets/lyflineQuarterCircle.svg")',
            WebkitMaskImage: 'url("/icons/assets/lyflineQuarterCircle.svg")',
            transform: 'scaleY(-1)',
            WebkitTransform: 'scaleY(-1)',
          }}
          className="absolute bottom-0 left-0 size-[100px] pointer-events-none select-none bg-[#F1F7FF] mask-contain mask-no-repeat mask-center shrink-0 z-0"
          aria-hidden="true"
        />
      )}

      {/* Decorative Quarter Circle Watermark (Top-Right - Red Variant) */}
      {isHomePage && (
        <span
          style={{
            maskImage: 'url("/icons/assets/lyflineQuarterCircle.svg")',
            WebkitMaskImage: 'url("/icons/assets/lyflineQuarterCircle.svg")',
            transform: 'scaleX(-1)',
            WebkitTransform: 'scaleX(-1)',
          }}
          className="absolute top-0 right-0 size-[100px] pointer-events-none select-none opacity-10 bg-[#F33C3C] mask-contain mask-no-repeat mask-center shrink-0 z-0"
          aria-hidden="true"
        />
      )}

    </section>
  );
};

