"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { NavBar } from "@/components/NavBar";
import { CtaSection } from "@/sections/CtaSection";
import { Footer } from "@/components/Footer";
import { ServiceDetailCard } from "@/components/card/ServiceDetailCard";
import { SERVICES } from "@/data/mockData";
import { NoiseTexture } from "@/components/magicui/NoiseTexture";

// ─── Animation Variants ───────────────────────────────────────────────────────

// Header: scales up from 94% with a soft spring bounce
const headerVariants = {
  hidden: { opacity: 0, scale: 0.94, y: -20 },
  visible: {
    opacity: 1, scale: 1, y: 0,
    transition: { duration: 0.7, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] },
  },
};

// Masonry columns — each direction is unique
const colVariants: Record<number, { hidden: object; visible: object }> = {
  0: { hidden: { opacity: 0, x: -70 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } } },
  1: { hidden: { opacity: 0, y: 80 },  visible: { opacity: 1, y: 0,  transition: { duration: 0.65, ease: "easeOut", delay: 0.1 } } },
  2: { hidden: { opacity: 0, y: -80 }, visible: { opacity: 1, y: 0,  transition: { duration: 0.7, ease: "easeOut", delay: 0.05 } } },
  3: { hidden: { opacity: 0, y: 80 },  visible: { opacity: 1, y: 0,  transition: { duration: 0.65, ease: "easeOut", delay: 0.15 } } },
  4: { hidden: { opacity: 0, x: 70 },  visible: { opacity: 1, x: 0,  transition: { duration: 0.7, ease: "easeOut", delay: 0.1 } } },
};

// Image items within a column (stagger from below)
const imgItemVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

// Accordion cards stagger container
const accordionContainerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const accordionItemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// Section label slides from left
const labelSlideLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

// Ticker columns representing the images at their original/desktop sizes
const TickerColumns = () => (
  <>
    {/* Col 1 */}
    <div className="w-[200px] shrink-0 flex flex-col justify-end gap-6">
      <div className="self-stretch h-60 relative rounded-[32px] outline-1 outline-offset-[-1px] outline-zinc-200 overflow-hidden bg-slate-100">
        <Image src="/Illustration/services/1.png" alt="Partner in Care" fill className="object-cover" sizes="200px" />
      </div>
      <div className="self-stretch h-44 relative rounded-[32px] outline-1 outline-offset-[-1px] outline-zinc-200 overflow-hidden bg-slate-100">
        <Image src="/Illustration/services/2.png" alt="Insurance Buddy" fill className="object-cover" sizes="200px" />
      </div>
    </div>

    {/* Col 2 */}
    <div className="w-[200px] shrink-0 h-80 relative rounded-[32px] outline-1 outline-offset-[-1px] outline-zinc-200 overflow-hidden bg-slate-100">
      <Image src="/Illustration/services/3.png" alt="Doctor Matching" fill className="object-cover" sizes="200px" />
    </div>

    {/* Col 3 */}
    <div className="w-[200px] shrink-0 h-60 relative rounded-[32px] outline-1 outline-offset-[-1px] outline-zinc-200 overflow-hidden bg-slate-100">
      <Image src="/Illustration/services/4.png" alt="Travel Support" fill className="object-cover" sizes="200px" />
    </div>

    {/* Col 4 */}
    <div className="w-[200px] shrink-0 h-80 relative rounded-[32px] outline-1 outline-offset-[-1px] outline-zinc-200 overflow-hidden bg-slate-100">
      <Image src="/Illustration/services/5.png" alt="Monitor Ready" fill className="object-cover" sizes="200px" />
    </div>

    {/* Col 5 */}
    <div className="w-[200px] shrink-0 flex flex-col justify-end gap-6 mr-24">
      <div className="self-stretch h-60 relative rounded-[32px] outline-1 outline-offset-[-1px] outline-zinc-200 overflow-hidden bg-slate-100">
        <Image src="/Illustration/services/6.png" alt="Guided Care" fill className="object-cover" sizes="200px" />
      </div>
      <div className="self-stretch h-44 relative rounded-[32px] outline-1 outline-offset-[-1px] outline-zinc-200 overflow-hidden bg-slate-100">
        <Image src="/Illustration/services/7.png" alt="Medical Treatment" fill className="object-cover" sizes="200px" />
      </div>
    </div>
  </>
);

// ─────────────────────────────────────────────────────────────────────────────


function ServicesPageContent() {
  // First services card is open by default (index 0)
  const [openCardIdx, setOpenCardIdx] = useState<number | null>(0);
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get("service");

  const [prevServiceParam, setPrevServiceParam] = useState<string | null>(null);

  if (serviceParam !== prevServiceParam) {
    setPrevServiceParam(serviceParam);
    if (serviceParam) {
      const idx = SERVICES.findIndex(s => s.id === serviceParam);
      if (idx !== -1) {
        setOpenCardIdx(idx);
      }
    }
  }

  useEffect(() => {
    if (serviceParam) {
      const timer = setTimeout(() => {
        const element = document.getElementById(`service-detail-${serviceParam}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [serviceParam]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <NavBar />

      <main className="grow pt-[80px] w-full flex flex-col justify-start items-center relative overflow-x-hidden">
        {/* Combined Services Section */}
        <section className="w-full py-16 bg-primary/10 flex flex-col justify-start items-center overflow-hidden relative border-b border-gray-100 rounded-bl-[32px] rounded-br-[32px] outline outline-offset-[-1px] outline-gray-200">
          <NoiseTexture />

          {/* Header & Desktop Grid (inside padded container) */}
          <div className="w-full max-w-[1440px] px-6 md:px-16 lg:px-24 xl:px-36 flex flex-col justify-start items-start gap-8 relative z-10">

            <div className="self-stretch flex flex-col justify-start items-start gap-6 z-10 w-full">

              {/* ── Page Header: scales up from center ── */}
              <motion.div
                className="self-stretch inline-flex justify-between items-end w-full"
                variants={headerVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="flex-1 inline-flex flex-col justify-start items-center gap-1 w-full text-center">
                  <div className="inline-flex justify-center items-center gap-3">
                    <span
                      style={{
                        maskImage: 'url("/icons/assets/lyflineHeart.svg")',
                        WebkitMaskImage: 'url("/icons/assets/lyflineHeart.svg")',
                      }}
                      className="size-6 bg-red-600 mask-contain mask-no-repeat mask-center shrink-0"
                      aria-hidden="true"
                    />
                    <h1 className="justify-start text-primary text-3xl font-semibold font-sans">
                      Gateway to International Healthcare
                    </h1>
                  </div>
                  <span className="justify-start text-primary/50 text-sm font-normal font-poppins">
                    OUR SERVICES
                  </span>
                </div>
              </motion.div>

              {/* ── Masonry Grid: visible only on desktop (xl and above) ── */}
              <div className="hidden xl:inline-flex self-stretch flex-row justify-center items-end gap-6 overflow-hidden w-full mt-4">

                {/* Col 1 → slides from LEFT */}
                <motion.div
                  className="flex-1 inline-flex flex-col justify-end items-start gap-6 w-full"
                  variants={colVariants[0]}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div
                    className="self-stretch h-60 relative rounded-[32px] outline-1 outline-offset-[-1px] outline-zinc-200 overflow-hidden w-full bg-slate-100"
                    variants={imgItemVariants}
                  >
                    <Image src="/Illustration/services/1.png" alt="Partner in Care" fill className="object-cover" sizes="250px" />
                  </motion.div>
                  <motion.div
                    className="self-stretch h-44 relative rounded-[32px] outline-1 outline-offset-[-1px] outline-zinc-200 overflow-hidden w-full bg-slate-100"
                    variants={imgItemVariants}
                  >
                    <Image src="/Illustration/services/2.png" alt="Insurance Buddy" fill className="object-cover" sizes="250px" />
                  </motion.div>
                </motion.div>

                {/* Col 2 → rises from BOTTOM */}
                <motion.div
                  className="flex-1 h-80 relative rounded-[32px] outline-1 outline-offset-[-1px] outline-zinc-200 overflow-hidden w-full bg-slate-100"
                  variants={colVariants[1]}
                  initial="hidden"
                  animate="visible"
                >
                  <Image src="/Illustration/services/3.png" alt="Doctor Matching" fill className="object-cover" sizes="250px" />
                </motion.div>

                {/* Col 3 → drops from TOP */}
                <motion.div
                  className="flex-1 h-60 relative rounded-[32px] outline-1 outline-offset-[-1px] outline-zinc-200 overflow-hidden w-full bg-slate-100"
                  variants={colVariants[2]}
                  initial="hidden"
                  animate="visible"
                >
                  <Image src="/Illustration/services/4.png" alt="Travel Support" fill className="object-cover" sizes="250px" />
                </motion.div>

                {/* Col 4 → rises from BOTTOM */}
                <motion.div
                  className="flex-1 h-80 relative rounded-[32px] outline-1 outline-offset-[-1px] outline-zinc-200 overflow-hidden w-full bg-slate-100"
                  variants={colVariants[3]}
                  initial="hidden"
                  animate="visible"
                >
                  <Image src="/Illustration/services/5.png" alt="Monitor Ready" fill className="object-cover" sizes="250px" />
                </motion.div>

                {/* Col 5 → slides from RIGHT */}
                <motion.div
                  className="flex-1 inline-flex flex-col justify-end items-start gap-6 w-full"
                  variants={colVariants[4]}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div
                    className="self-stretch h-60 relative rounded-[32px] outline-1 outline-offset-[-1px] outline-zinc-200 overflow-hidden w-full bg-slate-100"
                    variants={imgItemVariants}
                  >
                    <Image src="/Illustration/services/6.png" alt="Guided Care" fill className="object-cover" sizes="250px" />
                  </motion.div>
                  <motion.div
                    className="self-stretch h-44 relative rounded-[32px] outline-1 outline-offset-[-1px] outline-zinc-200 overflow-hidden w-full bg-slate-100"
                    variants={imgItemVariants}
                  >
                    <Image src="/Illustration/services/7.png" alt="Medical Treatment" fill className="object-cover" sizes="250px" />
                  </motion.div>
                </motion.div>

              </div>
            </div>
          </div>

          {/* ── Sliding Ticker Marquee: visible only on tablet and mobile (under xl) ── */}
          <div className="xl:hidden w-full overflow-hidden py-4 relative mt-4 z-10">
            {/* Gradient fades on left and right edges for a premium seamless look */}
            <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-primary/10 to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-primary/10 to-transparent z-10 pointer-events-none" />

            <motion.div
              className="flex items-end gap-6 w-max"
              animate={{
                x: [0, -1216], // Loops seamlessly over the 5 columns (5 * 200px + 4 * 24px gap + 1 * 120px gap = 1216px)
              }}
              transition={{
                ease: "linear",
                duration: 25,
                repeat: Infinity,
              }}
            >
              <TickerColumns />
              <TickerColumns />
            </motion.div>
          </div>

          {/* Details Accordion (inside another padded container) */}
          <div className="w-full max-w-[1440px] px-6 md:px-16 lg:px-24 xl:px-36 flex flex-col justify-start items-start gap-8 relative z-10 mt-8">

            {/* Divider */}
            <hr className="w-full border-t border-primary/20 my-4" />

            {/* ── Services Details Accordion ── */}
            <div className="self-stretch flex flex-col justify-start items-start gap-4 w-full">

              {/* Label: slides from left */}
              <motion.span
                className="text-primary/50 text-sm font-poppins tracking-wider uppercase"
                variants={labelSlideLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
              >
                SERVICES DETAILS
              </motion.span>

              {/* Accordion cards: stagger up */}
              <motion.div
                className="self-stretch flex flex-col justify-start items-start gap-8 w-full"
                variants={accordionContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
              >
                {SERVICES.map((service, index) => (
                  <motion.div
                    key={service.id}
                    id={`service-detail-${service.id}`}
                    className="w-full"
                    variants={accordionItemVariants}
                  >
                    <ServiceDetailCard
                      icon={service.iconName}
                      title={service.title}
                      description={service.description}
                      bullets={service.bullets}
                      isOpen={openCardIdx === index}
                      onToggle={() => setOpenCardIdx(openCardIdx === index ? null : index)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Decorative Brand Watermark */}
          <span
            style={{
              maskImage: 'url("/icons/assets/lyflineHeart.svg")',
              WebkitMaskImage: 'url("/icons/assets/lyflineHeart.svg")',
            }}
            className="absolute bottom-0 right-0 size-20 md:size-[120px] pointer-events-none select-none opacity-10 bg-primary/50 mask-contain mask-no-repeat mask-center shrink-0"
            aria-hidden="true"
          />
        </section>

        <CtaSection />
      </main>

      <Footer />
    </div>
  );
}

export default function ServicesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white text-primary">Loading...</div>}>
      <ServicesPageContent />
    </Suspense>
  );
}
