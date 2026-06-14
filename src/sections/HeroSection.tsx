"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/Button";

export const HeroSection: React.FC = () => {
  const { lang } = useLanguage();

  return (
    <section className="relative w-full overflow-hidden bg-[#0C3D49]">
      {/* Background Image layer */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url('/background-images/bg-hero-1.jpg')`
        }}
      />
      {/* Brand blue tint overlay for contrast and layout legibility */}
      <div className="absolute inset-0 backdrop-blur-[2px] z-0" style={{ backgroundColor: "#345E98CC" }} />

      {/* Decorative premium glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#3F71B7]/10 blur-3xl z-0 animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-white/5 blur-3xl z-0" />

      {/* Content wrapper */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto min-h-[580px] px-6 md:px-36 py-16 md:py-24 flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-0">

        {/* Left Column (Text & Action Buttons) */}
        <motion.div
          className="w-full max-w-[460px] flex flex-col justify-start items-start gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="self-stretch flex flex-col justify-start items-start gap-6">
            <div className="self-stretch flex flex-col justify-start items-start gap-2">
              {/* Hearts icon badge */}
              <div className="size-10 rounded-full flex items-center justify-center">
                <Image
                  src="/icons/Hearts icon.svg"
                  alt="Hearts"
                  width={40}
                  height={40}
                  className="w-10 h-10 object-contain"
                />
              </div>

              {/* Main Headline */}
              <h1 className="w-full max-w-80 justify-start text-white text-5xl font-medium font-poppins leading-tight tracking-tight">
                {lang === "en" ? "Your Reliable Medical Care" : "Perawatan Medis Terpercaya Anda"}
              </h1>

              {/* Description */}
              <p className="self-stretch justify-start text-white text-base font-normal font-poppins opacity-90 leading-relaxed">
                {lang === "en"
                  ? "We connects Indonesians with the world’s most reputable international hospitals, from consultation to travel, we handle every steps of your medical journey."
                  : "Kami menghubungkan masyarakat Indonesia dengan rumah sakit internasional paling terkemuka di dunia, mulai dari konsultasi hingga perjalanan, kami menangani setiap langkah perjalanan medis Anda."}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="self-stretch flex flex-row flex-wrap justify-start items-center gap-3">
            <Button
              variant="primary"
              text={lang === "en" ? "Find a Doctor" : "Cari Dokter"}
              rightIcon="Right 1"
              className="shadow-lg active:scale-98 !bg-[#E02828] !bg-none !text-white hover:!bg-[#E02828]/90"
            />
            <Button
              variant="outline-white"
              text={lang === "en" ? "Learn More" : "Pelajari Lebih Lanjut"}
            />
          </div>
        </motion.div>

        {/* Right Column (Special Promo Card) */}
        <motion.div
          className="w-full max-w-96"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          {/* Glassmorphic outer container */}
          <div className="w-full h-80 p-4 bg-white/10 backdrop-blur-md rounded-3xl flex flex-col justify-start items-start gap-3 overflow-hidden border border-white/15 shadow-2xl">
            <div className="text-white">
              <span
                style={{
                  maskImage: 'url("/icons/Hearts icon.svg")',
                  WebkitMaskImage: 'url("/icons/Hearts icon.svg")',
                }}
                className="w-4 h-4 bg-white mask-contain mask-no-repeat mask-center shrink-0 block"
                aria-hidden="true"
              />
            </div>

            <div className="self-stretch justify-start text-white text-base font-medium font-poppins">
              {lang === "en" ? "Special Promo" : "Promo Spesial"}
            </div>

            {/* Glassmorphic inner promo box container */}
            <div className="self-stretch flex-1 relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 p-5 flex flex-col justify-start overflow-hidden">

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
