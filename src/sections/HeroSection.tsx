"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/Button";
import { fetchPromoData } from "@/api/promo";
import { WHATSAPP_HREF } from "@/lib/constants";

export const HeroSection: React.FC = () => {
  const { lang } = useLanguage();
  const [promoImageUrl, setPromoImageUrl] = useState<string | null>(null);
  const [promoDestinationLink, setPromoDestinationLink] = useState<string | null>(null);
  const [promoLoading, setPromoLoading] = useState(true);

  useEffect(() => {
    fetchPromoData()
      .then((data) => {
        setPromoImageUrl(data.imageUrl);
        setPromoDestinationLink(data.destinationLink);
      })
      .catch(() => {
        setPromoImageUrl(null);
        setPromoDestinationLink(null);
      })
      .finally(() => setPromoLoading(false));
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#0C3D49]">
      {/* Background Image layer */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url('/background-images/bg-hero-1.webp')`
        }}
      />
      {/* Brand blue tint overlay for contrast and layout legibility */}
      <div className="absolute inset-0 backdrop-blur-[2px] z-0" style={{ backgroundColor: "#345E98CC" }} />

      {/* Decorative premium glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-3xl z-0 animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-white/5 blur-3xl z-0" />

      {/* Content wrapper */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto min-h-[580px] px-6 md:px-16 lg:px-24 xl:px-36 py-12 md:py-20 flex flex-col min-[1100px]:flex-row justify-between items-start min-[1100px]:items-center gap-10 min-[1100px]:gap-12">

        {/* Left Column (Text & Action Buttons) */}
        <motion.div
          className="w-full max-w-xl min-[1100px]:max-w-[480px] lg:max-w-[520px] xl:max-w-[560px] flex flex-col justify-start items-start gap-6"
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
              <h1 className="w-full max-w-lg justify-start text-white text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-medium font-poppins leading-tight tracking-tight">
                {lang === "en" ? "Medical Tourism & Concierge Service Provider" : "Penyedia Layanan Turisme Medis & Concierge"}
              </h1>

              {/* Description */}
              <p className="self-stretch justify-start text-white text-base font-normal font-poppins opacity-90 leading-relaxed">
                {lang === "en"
                  ? "LYFLINE simplifies your healthcare journey by providing seamless access to world-class hospitals locally & globally."
                  : "LYFLINE menyederhanakan perjalanan kesehatan Anda dengan menyediakan akses mudah ke rumah sakit kelas dunia secara lokal & global."}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="self-stretch flex flex-row flex-wrap justify-start items-center gap-3">
            <Link href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer">
              <Button
                variant="primary"
                text={lang === "en" ? "Consult Now" : "Konsultasi Sekarang"}
                rightIcon="Right 1"
                className="shadow-lg active:scale-98 bg-accent! bg-none! text-white! hover:bg-accent/90! cursor-pointer"
              />
            </Link>
            <Link href="/doctors">
              <Button
                variant="outline-white"
                text={lang === "en" ? "Find a Doctor" : "Cari Dokter"}
                className="cursor-pointer"
              />
            </Link>
          </div>
        </motion.div>

        {/* Right Column (Special Promo Card) */}
        <motion.div
          className="w-full max-w-sm sm:max-w-md md:max-w-lg min-[1100px]:max-w-[440px] xl:max-w-[460px] self-start"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          {/* Glassmorphic outer container */}
          <div className="w-full p-4 sm:p-5 bg-white/10 backdrop-blur-md rounded-3xl flex flex-col justify-start items-start gap-3 overflow-hidden border border-white/15 shadow-2xl transition-all duration-300">
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
              {lang === "en" ? "Special Announcement" : "Pengumuman Spesial"}
            </div>

            {/* Glassmorphic inner promo box container with locked 16:10 landscape aspect ratio */}
            <div className="w-full aspect-[16/10] relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 overflow-hidden flex items-center justify-center">
              {promoLoading ? (
                /* Skeleton shimmer */
                <div className="w-full h-full animate-pulse bg-white/10" />
              ) : promoImageUrl ? (
                promoDestinationLink ? (
                  <Link
                    href={promoDestinationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full h-full relative"
                  >
                    <Image
                      src={promoImageUrl}
                      alt="Special Promo"
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 460px"
                    />
                  </Link>
                ) : (
                  <Image
                    src={promoImageUrl}
                    alt="Special Promo"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 460px"
                  />
                )
              ) : (
                /* No image uploaded yet */
                <div className="w-full h-full flex items-center justify-center text-white/40 text-sm font-poppins text-center px-4">
                  {lang === "en" ? "No promo available" : "Belum ada promo"}
                </div>
              )}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
