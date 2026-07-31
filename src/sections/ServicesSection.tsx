"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import { SERVICES } from "@/data/mockData";
import { ServiceCard } from "@/components/card/ServiceCard";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

// Cards fan in from alternating sides for variety
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const getLocalizedService = (id: string, defaultTitle: string, defaultDesc: string, lang: string) => {
  const translations: Record<string, { en: { title: string; desc: string }; id: { title: string; desc: string } }> = {
    "1": {
      en: {
        title: "Medical Concierge",
        desc: "A personal assistant dedicated to managing all your medical travel needs."
      },
      id: {
        title: "Layanan Concierge Medis",
        desc: "Asisten pribadi yang didedikasikan untuk mengelola seluruh kebutuhan perjalanan medis Anda."
      }
    },
    "2": {
      en: {
        title: "Medical Tourism",
        desc: "Access to international standard healthcare, with over 120+ trusted hospitals and clinics across 9 countries."
      },
      id: {
        title: "Wisata Medis",
        desc: "Akses ke fasilitas kesehatan berstandar internasional, dengan lebih dari 120+ rumah sakit dan klinik terpercaya di 9 negara."
      }
    },
    "3": {
      en: {
        title: "Customized Medical Check-Up (MCU)",
        desc: "Comprehensive medical check-up packages specifically designed to adapt to your profile, age, and physical condition."
      },
      id: {
        title: "Customized Medical Check-Up (MCU)",
        desc: "Paket pemeriksaan medis menyeluruh yang dirancang secara khusus untuk menyesuaikan dengan profil, usia, dan kondisi fisik Anda."
      }
    },
    "4": {
      en: {
        title: "Homecare Services",
        desc: "Enjoy hospital-standard medical care and recovery directly from the comfort and privacy of your own home."
      },
      id: {
        title: "Layanan Perawatan di Rumah",
        desc: "Nikmati perawatan medis dan pemulihan berstandar rumah sakit secara langsung dari kenyamanan dan privasi rumah Anda sendiri."
      }
    },
    "5": {
      en: {
        title: "Emergency Medical Evacuation",
        desc: "A fast, reliable and secure emergency medical transport service to preferred healthcare facilities equipped with life-support."
      },
      id: {
        title: "Evakuasi Medis Darurat",
        desc: "Layanan transportasi medis darurat yang cepat, andal, dan aman ke fasilitas kesehatan pilihan dengan peralatan penunjang hidup."
      }
    }
  };

  const item = translations[id];
  if (item) {
    return lang === "en" ? item.en : item.id;
  }
  return { title: defaultTitle, desc: defaultDesc };
};

export const ServicesSection: React.FC = () => {
  const { lang } = useLanguage();

  return (
    <section className="w-full py-16 bg-transparent flex flex-col justify-start items-center gap-2.5">
      <div className="w-full max-w-[1152px] px-6 md:px-12 lg:px-0 flex flex-col justify-start items-start gap-12 z-10">

        {/* Header Block */}
        <motion.div
          className="flex flex-col justify-start items-start gap-1"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <div className="text-primary/50 text-sm font-normal font-poppins tracking-wider">
            {lang === "en" ? "OUR SERVICES" : "LAYANAN KAMI"}
          </div>
          <div className="inline-flex justify-start items-center gap-3 mt-2">
            <span
              style={{
                maskImage: 'url("/icons/assets/lyflineHeart.svg")',
                WebkitMaskImage: 'url("/icons/assets/lyflineHeart.svg")',
              }}
              className="size-6 bg-red-600 mask-contain mask-no-repeat mask-center shrink-0"
              aria-hidden="true"
            />
            <h2 className="text-black text-3xl font-medium font-poppins">
              {lang === "en" ? "End-to-End Integrated Healthcare Services" : "Layanan Kesehatan Terintegrasi Menyeluruh"}
            </h2>
          </div>
        </motion.div>

        {/* Cards Grid Container */}
        <motion.div
          className="w-full flex flex-wrap justify-center gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {SERVICES.map((service, index) => {
            const localized = getLocalizedService(service.id, service.title, service.description, lang);
            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-96 flex justify-center"
              >
                <Link href={`/services?service=${service.id}`} className="w-full flex justify-center">
                  <ServiceCard
                    icon={service.iconName}
                    title={localized.title}
                    description={localized.desc}
                    variant={index === 0 ? "blue" : "white"}
                  />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};
