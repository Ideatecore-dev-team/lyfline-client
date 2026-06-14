"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const stepVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export const StepsSection: React.FC = () => {
  const { lang } = useLanguage();

  const steps = [
    {
      number: "01",
      isRed: true,
      title: lang === "en" ? "Initial Consultation" : "Konsultasi Awal",
      description: lang === "en"
        ? "No Hidden Fees\nTransparent pricing with no unexpected charges or complicated payment schemes."
        : "Tanpa Biaya Tersembunyi\nHarga transparan tanpa biaya tak terduga atau skema pembayaran yang rumit."
    },
    {
      number: "02",
      isRed: false,
      title: lang === "en" ? "Doctor & Hospital Match" : "Kecocokan Dokter & Rumah Sakit",
      description: lang === "en"
        ? "We shortlist the right specialists from our verified global network and coordinate with the chosen hospital."
        : "Kami menyeleksi spesialis yang tepat dari jaringan global kami yang terverifikasi dan berkoordinasi dengan rumah sakit yang dipilih."
    },
    {
      number: "03",
      isRed: true,
      title: lang === "en" ? "Travel Arrangements" : "Pengaturan Perjalanan",
      description: lang === "en"
        ? "From flights and visas to hotel bookings — every logistics detail is managed so you can travel stress-free."
        : "Mulai dari penerbangan dan visa hingga pemesanan hotel — setiap detail logistik dikelola sehingga Anda dapat bepergian tanpa stres."
    },
    {
      number: "04",
      isRed: false,
      title: lang === "en" ? "Treatment & Follow-up" : "Perawatan & Tindak Lanjut",
      description: lang === "en"
        ? "We stay with you through your treatment and coordinate aftercare, ensuring a smooth and safe recovery journey."
        : "Kami tetap bersama Anda selama perawatan Anda dan mengoordinasikan perawatan lanjutan, memastikan perjalanan pemulihan yang lancar dan aman."
    }
  ];

  return (
    <section className="w-full py-16 bg-primary text-white relative overflow-hidden flex flex-col justify-start items-center gap-6">

      {/* Background Ornaments / Decorative elements */}
      <div className="size-40 left-[85%] lg:left-[1286px] top-[320px] absolute bg-white/5 blur-2xl rounded-full pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-[40%] h-[30%] bg-white/5 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[30%] h-[40%] bg-white/5 blur-3xl rounded-full pointer-events-none" />

      {/* Header Container */}
      <div className="w-full max-w-[1152px] px-6 md:px-12 lg:px-0 flex flex-col justify-start items-start gap-12 z-10">
        <div className="flex flex-col justify-start items-start gap-0">
          <div className="text-slate-200/60 text-sm font-normal font-poppins tracking-wider">
            {lang === "en" ? "HOW WE WORK" : "BAGAIMANA KAMI BEKERJA"}
          </div>
          <h2 className="text-white text-3xl font-medium font-poppins mt-2">
            {lang === "en" ? "Simple Steps to Your Recovery" : "Langkah Mudah Menuju Pemulihan Anda"}
          </h2>
        </div>
      </div>

      {/* Steps Container */}
      <motion.div
        className="w-full max-w-[1152px] px-6 md:px-12 lg:px-0 relative flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 items-start gap-12 lg:gap-6 z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {steps.map((step, idx) => (
          <motion.div
            key={step.number}
            variants={stepVariants}
            className="w-full flex flex-col justify-start items-start gap-6 group relative"
          >
            {/* Number Container & Line Row */}
            <div className="relative w-full flex items-center">
              <div
                className={`size-16 p-4 rounded-2xl flex justify-center items-center backdrop-blur-md border transition-transform duration-300 group-hover:scale-105 shadow-lg ${step.isRed
                  ? "bg-[#E02828]/45 border-[#E02828]/25"
                  : "bg-white/10 border-white/15"
                  }`}
              >
                <div className="text-white text-3xl font-semibold font-sans leading-none">
                  {step.number}
                </div>
              </div>

              {/* Connecting line to the next step (Desktop Only, not for the last step) */}
              {idx < 3 && (
                <div
                  className="hidden lg:block absolute left-16 h-[1px] bg-indigo-300/30 pointer-events-none"
                  style={{ width: "calc(100% - 64px + 24px)" }} // 100% of column width minus badge size (64px) plus column gap (24px)
                />
              )}
            </div>

            {/* Step Content */}
            <div className="self-stretch flex flex-col justify-start items-start gap-3">
              <h3 className="self-stretch justify-start text-white text-base font-medium font-poppins group-hover:text-indigo-200 transition-colors">
                {step.title}
              </h3>

              {/* Divider Line */}
              <div className="self-stretch h-[1px] bg-white/20 group-hover:bg-white/40 transition-colors duration-300"></div>

              <p className="self-stretch justify-start text-white/80 text-sm font-normal font-poppins leading-relaxed whitespace-pre-line">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

    </section>
  );
};
