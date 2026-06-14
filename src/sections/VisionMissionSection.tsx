"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { Award, Handshake, HeartHandshake } from "lucide-react";
import { motion } from "framer-motion";

export const VisionMissionSection: React.FC = () => {
  const { lang } = useLanguage();

  return (
    <section id="vision-mission" className="w-full bg-primary-light/20 flex justify-center py-16 border-b border-gray-100">
      <div className="w-full max-w-[1440px] px-6 md:px-36 flex flex-col justify-start items-center gap-6">
        
        {/* Header Section */}
        <div className="flex flex-col justify-start items-center gap-1 text-center">
          <span className="self-stretch text-slate-400 text-sm font-normal font-poppins tracking-wider">
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
            <h2 className="text-accent text-3xl font-semibold font-sans">
              {lang === "en" ? "Dedicated to Your Health" : "Didedikasikan untuk Kesehatan Anda"}
            </h2>
          </div>
        </div>

        {/* Vision Statement Banner */}
        <motion.div 
          className="w-full bg-white rounded-[32px] p-6 md:p-8 shadow-sm flex flex-col justify-center items-center border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
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

        {/* 3 Cards Row */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6 relative mt-4">
          
          {/* Card 1: Professional Excellence */}
          <motion.div 
            className="w-full p-6 relative bg-primary rounded-3xl flex flex-col justify-start items-start gap-4 overflow-hidden group hover:shadow-lg transition-all duration-300 min-h-[260px]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="p-4 bg-white/10 rounded-2xl outline outline-offset-[-1px] outline-white/20 inline-flex justify-start items-center gap-2.5 z-10">
              <Award className="w-6 h-6 text-white" />
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
            
            {/* Background Decorative Circle */}
            <div className="w-36 h-36 -right-6 -top-16 absolute bg-white/5 rounded-full pointer-events-none group-hover:scale-110 transition-transform duration-500"></div>
          </motion.div>

          {/* Card 2: Trusted Partnerships */}
          <motion.div 
            className="w-full p-6 relative bg-white rounded-3xl flex flex-col justify-start items-start gap-4 overflow-hidden border border-gray-100 shadow-sm group hover:shadow-lg transition-all duration-300 min-h-[260px]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="p-4 bg-accent rounded-2xl inline-flex justify-start items-center gap-2.5 z-10">
              <Handshake className="w-6 h-6 text-white" />
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
            
            {/* Background Decorative Circle */}
            <div className="w-36 h-36 -right-6 -top-16 absolute bg-primary-light rounded-full pointer-events-none group-hover:scale-110 transition-transform duration-500"></div>
          </motion.div>

          {/* Card 3: Patient-Centered Service */}
          <motion.div 
            className="w-full p-6 relative bg-white rounded-3xl flex flex-col justify-start items-start gap-4 overflow-hidden border border-gray-100 shadow-sm group hover:shadow-lg transition-all duration-300 min-h-[260px]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="p-4 bg-accent rounded-2xl inline-flex justify-start items-center gap-2.5 z-10">
              <HeartHandshake className="w-6 h-6 text-white" />
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
            
            {/* Background Decorative Circle */}
            <div className="w-36 h-36 -right-6 -top-16 absolute bg-primary-light rounded-full pointer-events-none group-hover:scale-110 transition-transform duration-500"></div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
