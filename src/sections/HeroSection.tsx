"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageSquare } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export const HeroSection: React.FC = () => {
  const { lang, t } = useLanguage();

  return (
    <section className="relative pt-32 pb-24 md:pt-44 md:pb-36 overflow-hidden min-h-[90vh] flex items-center bg-[#0C3D49]">
      {/* Background Image layer - Positive z-index (z-0) so it's guaranteed to draw on top of body's white background */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url('/background-images/bg-hero-1.jpg')` // Local high-res background image
        }}
      />
      {/* Soft vignette gradient for maximum legibility of white text on the left */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/15 to-transparent z-0" />

      {/* Decorative premium glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-3xl z-0 animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent/5 blur-3xl z-0" />

      {/* Content wrapper with positive z-index (z-10) to sit perfectly on top of the background image */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* TEXT CONTENT (LEFT COLUMN - 7 cols) */}
          <motion.div
            className="lg:col-span-7 flex flex-col items-start text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Red Heart Badge Icon */}
            <div className="mb-6 flex items-center">
              <Image
                src="/icons/Hearts icon.png"
                alt={t("hero.badge")}
                width={36}
                height={36}
                className="w-9 h-9 object-contain"
              />
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white mb-6">
              {lang === "en" ? (
                <>
                  Your Reliable <br />
                  Medical Care
                </>
              ) : (
                <>
                  Perawatan Medis <br />
                  Terpercaya Anda
                </>
              )}
            </h1>

            {/* Paragraph Description */}
            <p className="text-base md:text-lg text-slate-100/90 leading-relaxed max-w-xl mb-8">
              {t("hero.subtitle")}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 w-full sm:w-auto">
              <a
                href="#services"
                className="px-7 py-4 rounded-full bg-primary hover:bg-primary-hover text-white font-bold text-sm tracking-wide flex items-center gap-2 shadow-lg shadow-primary/20 cursor-pointer transition-all duration-300"
              >
                {lang === "en" ? "Find a Doctor" : "Cari Dokter"} <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#about-us"
                className="px-7 py-4 rounded-full border-2 border-white text-white font-bold text-sm bg-transparent hover:bg-white hover:text-[#0C3D49] transition-all cursor-pointer"
              >
                {t("hero.btn.learn")}
              </a>
            </div>
          </motion.div>

          {/* PROMO CARD (RIGHT COLUMN - 5 cols) */}
          <motion.div
            className="lg:col-span-5 flex justify-center lg:justify-end w-full"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            {/* Promo Card design according to Figma Prototype */}
            <div className="relative w-full max-w-[420px] bg-white/10 backdrop-blur-md rounded-[32px] p-6 border border-white/20 shadow-2xl flex flex-col justify-between h-[300px]">
              
              {/* Header inside grey glass container */}
              <div className="flex items-center justify-between mb-4 px-1">
                <span className="text-xs font-bold text-slate-200 tracking-wide">
                  {t("hero.promo.label")}
                </span>
                <Image
                  src="/icons/Hearts icon.png"
                  alt="Heart"
                  width={18}
                  height={18}
                  className="w-4.5 h-4.5 object-contain brightness-0 invert opacity-80"
                />
              </div>

              {/* Blue Promo Box inside */}
              <div className="relative bg-primary hover:bg-primary-hover rounded-[24px] p-6 text-white overflow-hidden shadow-lg flex flex-col justify-between h-full border border-white/10 transition-all duration-300">
                {/* Red Heart Accent on bottom-right of the blue card */}
                <div className="absolute bottom-0 right-0 w-16 h-16 bg-accent rounded-tl-[32px] pointer-events-none translate-x-1 translate-y-1" />
                
                <div>
                  <h3 className="text-4xl font-extrabold text-white tracking-tight mb-1">
                    {t("hero.promo.discount")}
                  </h3>
                  <p className="text-xs text-slate-100/90 leading-relaxed mb-4">
                    {t("hero.promo.desc")}
                  </p>
                </div>

                {/* Consultation White Button */}
                <a
                  href="https://wa.me/6281291578559"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit mt-auto px-5 py-2.5 rounded-full bg-white text-primary font-bold text-xs flex items-center gap-2 hover:bg-slate-100 active:scale-95 transition-all cursor-pointer shadow-md"
                >
                  <MessageSquare className="w-4 h-4 fill-current text-primary" /> {lang === "en" ? "Consult Now!" : "Konsultasi Sekarang!"} <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
