"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { motion, Variants } from "framer-motion";
import { NoiseTexture } from "@/components/magicui/NoiseTexture";

const headerScaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.65, ease: [0.34, 1.56, 0.64, 1] } },
};

const visionBannerSlide: Variants = {
  hidden: { opacity: 0, x: -70 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const missionCardContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
};

const missionCardItem: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.34, 1.56, 0.64, 1] } },
};

export const VisionMissionSection: React.FC = () => {
  const { lang } = useLanguage();

  return (
    <section id="vision-mission" className="w-full bg-primary/10 flex justify-center py-16 border-b border-gray-100 relative overflow-hidden">
      <NoiseTexture noiseOpacity={0.05} />
      <div className="w-full max-w-[1440px] px-6 md:px-16 lg:px-24 xl:px-36 flex flex-col justify-start items-center gap-6 relative z-10">

        {/* Header Section */}
        <motion.div
          className="flex flex-col justify-start items-center gap-1 text-center"
          variants={headerScaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <span className="self-stretch text-primary/50 text-sm font-normal font-poppins tracking-wider">
            {lang === "en" ? "OUR VISION & MISSION" : "VISI & MISI KAMI"}
          </span>
          <div className="inline-flex justify-center items-center gap-3 mt-1">
            <div className="w-6 h-6 relative flex items-center justify-center select-none pointer-events-none">
              <Image
                src="/icons/Hearts icon.svg"
                alt="Hearts"
                width={24}
                height={24}
                className="w-full h-full object-contain"
              />
            </div>
            <h2 className="text-accent text-3xl font-sans">
              {lang === "en" ? "Dedicated to Your Health" : "Didedikasikan untuk Kesehatan Anda"}
            </h2>
          </div>
        </motion.div>

        {/* Vision Statement Banner */}
        <motion.div
          className="w-full bg-white rounded-[32px] p-6 md:p-8 flex flex-col justify-center items-center border border-gray-100"
          variants={visionBannerSlide}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-center text-black text-base font-normal font-poppins max-w-4xl leading-relaxed">
            {lang === "en" ? (
              "Our Vision is to become a prominent company in the medical society, known for delivering reliable medical consultancy services, with good value for money and trustworthy networks."
            ) : (
              "Visi kami adalah menjadi perusahaan terkemuka di masyarakat medis, yang dikenal dalam memberikan layanan konsultasi medis yang andal, dengan nilai uang yang baik dan jaringan yang tepercaya."
            )}
          </p>
        </motion.div>

        {/* 4 Cards Row */}
        <motion.div
          className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative"
          variants={missionCardContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >

          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 left-[12.5%] right-[12.5%] h-[2px] bg-white z-0 pointer-events-none" />

          {/* Card 1: Professional Excellence */}
          <motion.div
            className="w-full p-6 relative bg-primary rounded-3xl flex flex-col justify-start items-start gap-4 overflow-hidden group lg:min-h-[260px] cursor-pointer"
            variants={missionCardItem}
            whileHover={{
              y: -10,
              rotateX: 8,
              rotateY: -8,
              boxShadow: "0px 20px 30px rgba(0,0,0,0.12)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{ transformStyle: "preserve-3d", perspective: 1000 }}
          >
            <div className="p-4 bg-[#ECF1F8] rounded-2xl outline outline-offset-[-1px] outline-[#4D7CBC] inline-flex justify-start items-center gap-2.5 z-10">
              <span
                style={{
                  maskImage: 'url("/icons/Star 1.svg")',
                  WebkitMaskImage: 'url("/icons/Star 1.svg")',
                }}
                className="size-6 bg-primary mask-contain mask-no-repeat mask-center shrink-0"
                aria-hidden="true"
              />
            </div>

            <div className="flex flex-col justify-start items-start gap-2 z-10">
              <h3 className="text-white text-2xl font-medium font-poppins">
                {lang === "en" ? "Professional Excellence" : "Keunggulan Profesional"}
              </h3>
              <p className="text-white/90 text-sm font-normal font-poppins leading-relaxed">
                {lang === "en" ? (
                  "Continuously enhancing our knowledge and skills to keep pace with advancements in healthcare."
                ) : (
                  "Terus meningkatkan pengetahuan dan keterampilan kami untuk mengimbangi kemajuan dalam layanan kesehatan."
                )}
              </p>
            </div>

            {/* Background Decorative Quarter Circle */}
            <span
              style={{
                maskImage: 'url("/icons/assets/lyflineQuarterCircle.svg")',
                WebkitMaskImage: 'url("/icons/assets/lyflineQuarterCircle.svg")',
              }}
              className="absolute top-0 right-0 size-[80px] pointer-events-none select-none bg-[#4D7CBC] mask-contain mask-no-repeat mask-center shrink-0 z-0 rotate-90 group-hover:scale-110 transition-transform duration-500"
              aria-hidden="true"
            />
          </motion.div>

          {/* Card 2: Trusted Partnerships */}
          <motion.div
            className="w-full p-6 relative bg-white rounded-3xl flex flex-col justify-start items-start gap-4 overflow-hidden border border-gray-100 group lg:min-h-[260px] cursor-pointer"
            variants={missionCardItem}
            whileHover={{
              y: -10,
              rotateX: 8,
              rotateY: -8,
              boxShadow: "0px 20px 30px rgba(0,0,0,0.12)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{ transformStyle: "preserve-3d", perspective: 1000 }}
          >
            <div className="p-4 bg-accent rounded-2xl inline-flex justify-start items-center gap-2.5 z-10">
              <span
                style={{
                  maskImage: 'url("/icons/Like 1.svg")',
                  WebkitMaskImage: 'url("/icons/Like 1.svg")',
                }}
                className="size-6 bg-white mask-contain mask-no-repeat mask-center shrink-0"
                aria-hidden="true"
              />
            </div>

            <div className="flex flex-col justify-start items-start gap-2 z-10">
              <h3 className="text-accent text-2xl font-medium font-poppins">
                {lang === "en" ? "Trusted Partnerships" : "Kemitraan Tepercaya"}
              </h3>
              <p className="text-black text-sm font-normal font-poppins leading-relaxed">
                {lang === "en" ? (
                  "Ensuring a reliable and trustworthy network of doctors and healthcare providers."
                ) : (
                  "Memastikan jaringan dokter dan penyedia layanan kesehatan yang andal dan tepercaya."
                )}
              </p>
            </div>

            {/* Background Decorative Quarter Circle */}
            <span
              style={{
                maskImage: 'url("/icons/assets/lyflineQuarterCircle.svg")',
                WebkitMaskImage: 'url("/icons/assets/lyflineQuarterCircle.svg")',
              }}
              className="absolute top-0 right-0 size-[80px] pointer-events-none select-none bg-[#F1F7FF] mask-contain mask-no-repeat mask-center shrink-0 z-0 rotate-90 group-hover:scale-110 transition-transform duration-500"
              aria-hidden="true"
            />
          </motion.div>

          {/* Card 3: Patient-Centered Service */}
          <motion.div
            className="w-full p-6 relative bg-white rounded-3xl flex flex-col justify-start items-start gap-4 overflow-hidden border border-gray-100 group lg:min-h-[260px] cursor-pointer"
            variants={missionCardItem}
            whileHover={{
              y: -10,
              rotateX: 8,
              rotateY: -8,
              boxShadow: "0px 20px 30px rgba(0,0,0,0.12)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{ transformStyle: "preserve-3d", perspective: 1000 }}
          >
            <div className="p-4 bg-accent rounded-2xl inline-flex justify-start items-center gap-2.5 z-10">
              <span
                style={{
                  maskImage: 'url("/icons/Happy 2.svg")',
                  WebkitMaskImage: 'url("/icons/Happy 2.svg")',
                }}
                className="size-6 bg-white mask-contain mask-no-repeat mask-center shrink-0"
                aria-hidden="true"
              />
            </div>

            <div className="flex flex-col justify-start items-start gap-2 z-10">
              <h3 className="text-accent text-2xl font-medium font-poppins">
                {lang === "en" ? "Patient-Centered Service" : "Layanan Berpusat pada Pasien"}
              </h3>
              <p className="text-black text-sm font-normal font-poppins leading-relaxed">
                {lang === "en" ? (
                  "Delivering a valuable and supportive experience for clients throughout their healthcare journey."
                ) : (
                  "Memberikan pengalaman yang berharga dan mendukung bagi klien di sepanjang perjalanan layanan kesehatan mereka."
                )}
              </p>
            </div>

            {/* Background Decorative Quarter Circle */}
            <span
              style={{
                maskImage: 'url("/icons/assets/lyflineQuarterCircle.svg")',
                WebkitMaskImage: 'url("/icons/assets/lyflineQuarterCircle.svg")',
              }}
              className="absolute top-0 right-0 size-[80px] pointer-events-none select-none bg-[#F1F7FF] mask-contain mask-no-repeat mask-center shrink-0 z-0 rotate-90 group-hover:scale-110 transition-transform duration-500"
              aria-hidden="true"
            />
          </motion.div>

          {/* Card 4: Seamless Coordination */}
          <motion.div
            className="w-full p-6 relative bg-white rounded-3xl flex flex-col justify-start items-start gap-4 overflow-hidden border border-gray-100 group lg:min-h-[260px] cursor-pointer"
            variants={missionCardItem}
            whileHover={{
              y: -10,
              rotateX: 8,
              rotateY: -8,
              boxShadow: "0px 20px 30px rgba(0,0,0,0.12)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{ transformStyle: "preserve-3d", perspective: 1000 }}
          >
            <div className="p-4 bg-accent rounded-2xl inline-flex justify-start items-center gap-2.5 z-10">
              <span
                style={{
                  maskImage: 'url("/icons/Activity 1.svg")',
                  WebkitMaskImage: 'url("/icons/Activity 1.svg")',
                }}
                className="size-6 bg-white mask-contain mask-no-repeat mask-center shrink-0"
                aria-hidden="true"
              />
            </div>

            <div className="flex flex-col justify-start items-start gap-2 z-10">
              <h3 className="text-accent text-2xl font-medium font-poppins">
                {lang === "en" ? "Seamless Coordination" : "Koordinasi Mulus"}
              </h3>
              <p className="text-black text-sm font-normal font-poppins leading-relaxed">
                {lang === "en" ? (
                  "Managing all administrative, scheduling, and logistical details so you can focus entirely on recovery."
                ) : (
                  "Mengelola semua detail administratif, penjadwalan, dan logistik sehingga Anda dapat fokus sepenuhnya pada pemulihan."
                )}
              </p>
            </div>

            {/* Background Decorative Quarter Circle */}
            <span
              style={{
                maskImage: 'url("/icons/assets/lyflineQuarterCircle.svg")',
                WebkitMaskImage: 'url("/icons/assets/lyflineQuarterCircle.svg")',
              }}
              className="absolute top-0 right-0 size-[80px] pointer-events-none select-none bg-[#F1F7FF] mask-contain mask-no-repeat mask-center shrink-0 z-0 rotate-90 group-hover:scale-110 transition-transform duration-500"
              aria-hidden="true"
            />
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};
