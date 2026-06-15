"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/Button";

const slideFromLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const slideFromRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut", delay: 0.15 } },
};

const statCardVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut", delay: 0.25 + i * 0.1 },
  }),
};

export interface AboutUsSectionProps {
  showButton?: boolean;
  isAboutPage?: boolean;
}

export const AboutUsSection: React.FC<AboutUsSectionProps> = ({ showButton = true, isAboutPage = false }) => {
  const { lang } = useLanguage();

  return (
    <section id="about-us" className="w-full bg-transparent flex justify-center">
      <div className={`w-full py-12 relative bg-white flex flex-col justify-start items-center gap-2.5 overflow-hidden ${
        isAboutPage ? "" : "rounded-bl-[48px] rounded-br-[48px] outline outline-offset-[-1px] outline-gray-200"
      }`}>

        {/* Decorative Watermarks */}
        <span
          style={{
            maskImage: 'url("/icons/assets/lyflineQuarterCircle.svg")',
            WebkitMaskImage: 'url("/icons/assets/lyflineQuarterCircle.svg")',
          }}
          className="absolute top-0 left-0 size-[100px] pointer-events-none select-none opacity-10 bg-red-600/50 mask-contain mask-no-repeat mask-center shrink-0 z-0"
          aria-hidden="true"
        />

        <span
          style={{
            maskImage: 'url("/icons/assets/lyflineHeart.svg")',
            WebkitMaskImage: 'url("/icons/assets/lyflineHeart.svg")',
          }}
          className="absolute bottom-0 right-0 size-[120px] pointer-events-none select-none opacity-10 bg-red-600/50 mask-contain mask-no-repeat mask-center shrink-0 z-0"
          aria-hidden="true"
        />

        {/* Content Container */}
        <div className="w-full max-w-[1152px] px-6 md:px-12 xl:px-0 flex flex-col justify-start items-center gap-12 lg:gap-24 z-10">
          <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-12">

            {/* Left Column (WHO WE ARE card) */}
            <motion.div
              className="w-full lg:w-[564px] flex flex-col justify-start items-start gap-6"
              variants={slideFromLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <div className="w-full px-6 py-8 bg-primary/10 rounded-3xl flex flex-col justify-start items-start gap-6">
                <div className="flex flex-col justify-start items-start gap-2">
                  <div className="text-primary/50 text-sm font-normal font-poppins tracking-wider">
                    {lang === "en" ? "WHO WE ARE" : "SIAPA KAMI"}
                  </div>
                  <h2 className="text-primary text-3xl font-medium font-poppins leading-tight">
                    {lang === "en" ? "Build on Trust, Driven with Care" : "Dibangun di Atas Kepercayaan, Didorong dengan Kepedulian"}
                  </h2>
                </div>

                <div className="text-black text-base font-normal font-poppins leading-relaxed space-y-4">
                  {lang === "en" ? (
                    <>
                      <p>
                        As your trusted medical care facilitator, we take care of every step of your healthcare journey — from initial consultation to treatment support and travel arrangements. Simply reach out to LYFLINE and share your medical history with us.
                      </p>
                      <p>
                        Our team will help you explore the best treatment options, recommended doctors, hospitals or clinics, preferred destinations, travel arrangements, and more — all tailored to your needs.
                      </p>
                      <p>
                        With LYFLINE, there are no hidden fees and no complicated payment schemes. You only pay for the services you receive.
                      </p>
                    </>
                  ) : (
                    <>
                      <p>
                        Sebagai fasilitator perawatan medis tepercaya Anda, kami mengurus setiap langkah perjalanan perawatan kesehatan Anda — mulai dari konsultasi awal hingga dukungan perawatan dan pengaturan perjalanan. Cukup hubungi LYFLINE dan bagikan riwayat medis Anda kepada kami.
                      </p>
                      <p>
                        Tim kami akan membantu Anda menjelajahi pilihan perawatan terbaik, dokter yang direkomendasikan, rumah sakit atau klinik, tujuan pilihan, pengaturan perjalanan, dan banyak lagi — semuanya disesuaikan dengan kebutuhan Anda.
                      </p>
                      <p>
                        Dengan LYFLINE, tidak ada biaya tersembunyi dan tidak ada skema pembayaran yang rumit. Anda hanya membayar untuk layanan yang Anda terima.
                      </p>
                    </>
                  )}
                </div>

                {showButton && (
                  <Button
                    variant="primary"
                    text={lang === "en" ? "Get to know more!" : "Pelajari lebih lanjut!"}
                    className=" text-white font-medium shadow-md transition-all duration-300"
                  />
                )}
              </div>
            </motion.div>

            {/* Right Column (Stat Cards Sidebar) */}
            <motion.div
              className="w-full lg:w-[384px] p-6 bg-primary/10 rounded-[32px] flex flex-col justify-center items-start gap-6"
              variants={slideFromRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <div className="text-primary/50 text-sm font-normal font-poppins tracking-wider">
                {lang === "en" ? "MORE ABOUT US" : "TENTANG KAMI"}
              </div>

              <div className="w-full grid grid-cols-2 gap-4">
                {/* Stat 1: 30+ Hospitals Partners */}
                <motion.div
                  className="w-full p-3 relative bg-red-600 rounded-3xl inline-flex flex-col justify-start items-center gap-4 overflow-hidden group hover:shadow-md transition-all duration-300"
                  custom={0}
                  variants={statCardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {/* Decorative Heart Watermark */}
                  <span
                    style={{
                      maskImage: 'url("/icons/assets/lyflineHeart.svg")',
                      WebkitMaskImage: 'url("/icons/assets/lyflineHeart.svg")',
                    }}
                    className="absolute bottom-0 right-0 size-[72px] pointer-events-none select-none bg-[#E83C3C] mask-contain mask-no-repeat mask-center shrink-0 z-0"
                    aria-hidden="true"
                  />
                  <div className="self-stretch flex flex-col justify-start items-center relative z-10">
                    <div className="self-stretch inline-flex justify-center items-center gap-3">
                      <div className="text-center justify-start text-white text-3xl font-medium font-poppins">30+</div>
                    </div>
                    <div className="self-stretch text-center justify-center text-white text-sm font-normal font-poppins mt-2">
                      {lang === "en" ? (
                        <>Hospitals Partners<br />Worldwide</>
                      ) : (
                        <>Mitra Rumah Sakit<br />di Seluruh Dunia</>
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* Stat 2: 7 Countries */}
                <motion.div
                  className="w-full p-3 relative bg-white rounded-3xl inline-flex flex-col justify-start items-center gap-4 overflow-hidden border border-gray-100 group hover:shadow-md transition-all duration-300"
                  custom={1}
                  variants={statCardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {/* Decorative Heart Watermark */}
                  <span
                    style={{
                      maskImage: 'url("/icons/assets/lyflineHeart.svg")',
                      WebkitMaskImage: 'url("/icons/assets/lyflineHeart.svg")',
                    }}
                    className="absolute bottom-0 right-0 size-[72px] pointer-events-none select-none bg-[#F8F8F8] mask-contain mask-no-repeat mask-center shrink-0 z-0"
                    aria-hidden="true"
                  />
                  <div className="self-stretch flex flex-col justify-start items-center relative z-10">
                    <div className="self-stretch inline-flex justify-center items-center gap-3">
                      <div className="text-center justify-start text-primary text-3xl font-medium font-poppins">7</div>
                    </div>
                    <div className="self-stretch text-center justify-center text-black text-sm font-normal font-poppins mt-2">
                      {lang === "en" ? (
                        <>Countries in<br />Our Network</>
                      ) : (
                        <>Negara dalam<br />Jaringan Kami</>
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* Stat 3: 100% End-to-End Service Coverage */}
                <motion.div
                  className="w-full p-3 relative bg-white rounded-3xl inline-flex flex-col justify-start items-center gap-4 overflow-hidden border border-gray-100 group hover:shadow-md transition-all duration-300"
                  custom={2}
                  variants={statCardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {/* Decorative Heart Watermark */}
                  <span
                    style={{
                      maskImage: 'url("/icons/assets/lyflineHeart.svg")',
                      WebkitMaskImage: 'url("/icons/assets/lyflineHeart.svg")',
                    }}
                    className="absolute bottom-0 right-0 size-[72px] pointer-events-none select-none bg-[#F8F8F8] mask-contain mask-no-repeat mask-center shrink-0 z-0"
                    aria-hidden="true"
                  />
                  <div className="self-stretch flex flex-col justify-start items-center relative z-10">
                    <div className="self-stretch inline-flex justify-center items-center gap-3">
                      <div className="text-center justify-start text-primary text-3xl font-medium font-poppins">100%</div>
                    </div>
                    <div className="self-stretch text-center justify-center text-black text-sm font-normal font-poppins mt-2">
                      {lang === "en" ? (
                        <>End-to-End<br />Service Coverage</>
                      ) : (
                        <>Cakupan Layanan<br />Ujung-ke-Ujung</>
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* Stat 4: 95% Satisfaction Rate */}
                <motion.div
                  className="w-full p-3 relative bg-primary rounded-3xl inline-flex flex-col justify-start items-center gap-4 overflow-hidden group hover:shadow-md transition-all duration-300"
                  custom={3}
                  variants={statCardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {/* Decorative Heart Watermark */}
                  <span
                    style={{
                      maskImage: 'url("/icons/assets/lyflineHeart.svg")',
                      WebkitMaskImage: 'url("/icons/assets/lyflineHeart.svg")',
                    }}
                    className="absolute bottom-0 right-0 size-[72px] pointer-events-none select-none bg-[#4D7CBC] mask-contain mask-no-repeat mask-center shrink-0 z-0"
                    aria-hidden="true"
                  />
                  <div className="self-stretch flex flex-col justify-start items-center relative z-10">
                    <div className="self-stretch inline-flex justify-center items-center gap-3">
                      <div className="text-center justify-start text-white text-3xl font-medium font-poppins">95%</div>
                    </div>
                    <div className="self-stretch text-center justify-center text-white text-sm font-normal font-poppins mt-2">
                      {lang === "en" ? (
                        <>Satisfaction<br />Rate</>
                      ) : (
                        <>Tingkat<br />Kepuasan</>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>

            </motion.div>

          </div>
        </div>

        {/* Absolute Background Ornaments */}
        <div className="size-40 left-[85%] lg:left-[1272px] top-[75%] lg:top-[421px] absolute bg-rose-50 rounded-full -z-10 pointer-events-none opacity-60"></div>
        <div className="size-48 left-[-100px] top-[-89.43px] absolute bg-rose-50 rounded-full -z-10 pointer-events-none opacity-60"></div>
      </div>
    </section>
  );
};
