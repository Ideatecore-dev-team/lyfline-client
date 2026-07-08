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
        title: "Medical Tourism",
        desc: "Access to global healthcare. We connect you to 120+ hospitals and clinics in 9 countries."
      },
      id: {
        title: "Wisata Medis",
        desc: "Kami membantu menjadwalkan konsultasi dan perawatan Anda dengan penyedia medis tepercaya."
      }
    },
    "2": {
      en: {
        title: "Medical Concierge",
        desc: "We streamline your medical journey by managing end-to-end services, ensuring every detail is meticulously handled."
      },
      id: {
        title: "Konsergi Medis",
        desc: "Kami menyederhanakan perjalanan medis Anda dengan mengelola layanan ujung ke ujung, memastikan setiap detail ditangani dengan cermat."
      }
    },
    "3": {
      en: {
        title: "Medical Consultant",
        desc: "Empowering your decisions with clarity. We provide deep insights into specialist expertise, facility capabilities, and cost transparency."
      },
      id: {
        title: "Konsultan Medis",
        desc: "Memberdayakan keputusan Anda dengan kejelasan. Kami menyediakan wawasan mendalam tentang keahlian spesialis, kemampuan fasilitas, dan transparansi biaya."
      }
    },
    "4": {
      en: {
        title: "Customized Medical Check-Up (MCU)",
        desc: "We offer customized health screening packages tailored to your personal healthcare needs and/ or corporate budget."
      },
      id: {
        title: "Pemeriksaan Kesehatan Terpadu (MCU)",
        desc: "Kami menawarkan paket pemeriksaan kesehatan yang disesuaikan dengan kebutuhan kesehatan pribadi Anda dan/atau anggaran korporat."
      }
    },
    "5": {
      en: {
        title: "Homecare Services",
        desc: "Bringing hospital-quality medical care straight to your home. Handled by professionals and backed by strict safety protocols."
      },
      id: {
        title: "Layanan Perawatan di Rumah",
        desc: "Memberikan perawatan medis berkualitas rumah sakit langsung ke rumah Anda. Ditangani oleh para profesional dan didukung oleh protokol keselamatan yang ketat."
      }
    },
    "6": {
      en: {
        title: "Emergency Medical Evacuation",
        desc: "Critical care transport by land or air ambulance. We ensure patients are safely and securely transferred to and from the hospital."
      },
      id: {
        title: "Evakuasi Medis Darurat",
        desc: "Transportasi perawatan kritis dengan ambulans darat atau udara. Kami memastikan pasien dipindahkan dengan aman dan terjamin ke dan dari rumah sakit."
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
          className="w-full flex flex-wrap justify-center xl:grid xl:grid-cols-3 gap-6 justify-items-center"
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
                className="w-full max-w-96 flex justify-center"
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
