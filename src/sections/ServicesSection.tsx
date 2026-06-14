"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { SERVICES } from "@/data/mockData";
import { ServiceCard } from "@/components/card/ServiceCard";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const getLocalizedService = (id: string, defaultTitle: string, defaultDesc: string, lang: string) => {
  const translations: Record<string, { en: { title: string; desc: string }; id: { title: string; desc: string } }> = {
    "1": {
      en: {
        title: "Medical Appointment Assistance",
        desc: "We help schedule your consultations and treatments with trusted medical providers."
      },
      id: {
        title: "Bantuan Janji Temu Medis",
        desc: "Kami membantu menjadwalkan konsultasi dan perawatan Anda dengan penyedia medis tepercaya."
      }
    },
    "2": {
      en: {
        title: "Your Personalized Home Care",
        desc: "Get medical care from the comfort of your home, including lab tests, IV therapy, home visits, and more."
      },
      id: {
        title: "Perawatan Rumah Pribadi Anda",
        desc: "Dapatkan perawatan medis dari kenyamanan rumah Anda, termasuk tes laboratorium, terapi IV, kunjungan rumah, dan banyak lagi."
      }
    },
    "3": {
      en: {
        title: "Medical Evacuation",
        desc: "Safe and reliable transportation to your preferred medical provider."
      },
      id: {
        title: "Evakuasi Medis",
        desc: "Transportasi yang aman dan andal ke penyedia medis pilihan Anda."
      }
    },
    "4": {
      en: {
        title: "Patient–Doctor Matching",
        desc: "We carefully match patients with suitable doctors based on medical needs and background analysis."
      },
      id: {
        title: "Pencocokan Pasien-Dokter",
        desc: "Kami mencocokkan pasien dengan dokter yang sesuai berdasarkan kebutuhan medis dan analisis latar belakang secara cermat."
      }
    },
    "5": {
      en: {
        title: "Travel & Accommodation Support",
        desc: "We assist with flights, accommodation, transport, visas, and travel arrangements for your medical journey."
      },
      id: {
        title: "Dukungan Perjalanan & Akomodasi",
        desc: "Kami membantu penerbangan, akomodasi, transportasi, visa, dan pengaturan perjalanan untuk perjalanan medis Anda."
      }
    },
    "6": {
      en: {
        title: "Guided Care",
        desc: "Your treatment journey is carefully monitored to ensure the right care for your medical needs."
      },
      id: {
        title: "Perawatan Terpandu",
        desc: "Perjalanan perawatan Anda dipantau secara cermat untuk memastikan perawatan yang tepat untuk kebutuhan medis Anda."
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
    <section className="w-full py-16 bg-slate-100 flex flex-col justify-start items-center gap-2.5">
      <div className="w-full max-w-[1152px] px-6 md:px-12 lg:px-0 flex flex-col justify-start items-start gap-12 z-10">
        
        {/* Header Block */}
        <div className="flex flex-col justify-start items-start gap-1">
          <div className="text-slate-400 text-sm font-normal font-poppins tracking-wider">
            {lang === "en" ? "WHAT WE DO" : "APA YANG KAMI LAKUKAN"}
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
              {lang === "en" ? "Your Gateway to International Healthcare" : "Gerbang Anda Menuju Layanan Kesehatan Internasional"}
            </h2>
          </div>
        </div>

        {/* Cards Grid Container */}
        <motion.div
          className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center"
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
                className="w-full flex justify-center"
              >
                <ServiceCard
                  icon={service.iconName}
                  title={localized.title}
                  description={localized.desc}
                  variant={index === 0 ? "blue" : "white"}
                />
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};
