"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { NavBar } from "@/components/NavBar";
import { CtaSection } from "@/sections/CtaSection";
import { Footer } from "@/components/Footer";
import { ServiceDetailCard } from "@/components/card/ServiceDetailCard";
import { SERVICES } from "@/data/mockData";
import { NoiseTexture } from "@/components/magicui/NoiseTexture";

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
      // Allow DOM layout and hydration to complete before calculating position
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
        {/* Combined Services Section: Full-width wrapper with bg-primary/10 and rounded bottom corners */}
        <section className="w-full py-16 bg-primary/10 flex flex-col justify-start items-center overflow-hidden relative border-b border-gray-100 rounded-bl-[32px] rounded-br-[32px] outline outline-offset-[-1px] outline-gray-200">
          <NoiseTexture />

          {/* Centered content container keeping the same max-width and paddings */}
          <div className="w-full max-w-[1440px] px-6 md:px-36 flex flex-col justify-start items-start gap-8 relative z-10">

            <div className="self-stretch flex flex-col justify-start items-start gap-6 z-10 w-full">
              <div className="self-stretch inline-flex justify-between items-end w-full">
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
              </div>

              {/* Waver Wave Masonry Grid */}
              <div className="self-stretch inline-flex flex-col md:flex-row justify-center items-end gap-6 overflow-hidden w-full mt-4">

                {/* Column 1 */}
                <div className="flex-1 inline-flex flex-col justify-end items-start gap-6 w-full">
                  {/* Partner in Care */}
                  <div className="self-stretch h-60 relative rounded-[32px] outline-1 outline-offset-[-1px] outline-zinc-200 overflow-hidden w-full bg-slate-100">
                    <Image
                      src="/Illustration/services/1.png"
                      alt="Partner in Care"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 250px"
                    />
                  </div>

                  {/* Insurance Buddy */}
                  <div className="self-stretch h-44 relative rounded-[32px] outline-1 outline-offset-[-1px] outline-zinc-200 overflow-hidden w-full bg-slate-100">
                    <Image
                      src="/Illustration/services/2.png"
                      alt="Insurance Buddy"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 250px"
                    />
                  </div>
                </div>

                {/* Column 2: Doctor Matching */}
                <div className="flex-1 h-80 relative rounded-[32px] outline-1 outline-offset-[-1px] outline-zinc-200 overflow-hidden w-full bg-slate-100">
                  <Image
                    src="/Illustration/services/3.png"
                    alt="Doctor Matching"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 250px"
                  />
                </div>

                {/* Column 3: Travel Support */}
                <div className="flex-1 h-60 relative rounded-[32px] outline-1 outline-offset-[-1px] outline-zinc-200 overflow-hidden w-full bg-slate-100">
                  <Image
                    src="/Illustration/services/4.png"
                    alt="Travel Support"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 250px"
                  />
                </div>

                {/* Column 4: Monitor Ready */}
                <div className="flex-1 h-80 relative rounded-[32px] outline-1 outline-offset-[-1px] outline-zinc-200 overflow-hidden w-full bg-slate-100">
                  <Image
                    src="/Illustration/services/5.png"
                    alt="Monitor Ready"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 250px"
                  />
                </div>

                {/* Column 5 */}
                <div className="flex-1 inline-flex flex-col justify-end items-start gap-6 w-full">
                  {/* Guided Care */}
                  <div className="self-stretch h-60 relative rounded-[32px] outline-1 outline-offset-[-1px] outline-zinc-200 overflow-hidden w-full bg-slate-100">
                    <Image
                      src="/Illustration/services/6.png"
                      alt="Guided Care"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 250px"
                    />
                  </div>

                  {/* Medical Treatment */}
                  <div className="self-stretch h-44 relative rounded-[32px] outline-1 outline-offset-[-1px] outline-zinc-200 overflow-hidden w-full bg-slate-100">
                    <Image
                      src="/Illustration/services/7.png"
                      alt="Medical Treatment"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 250px"
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* Divider line */}
            <hr className="w-full border-t border-primary/20 my-4" />

            {/* Services Details Accordion Section */}
            <div className="self-stretch flex flex-col justify-start items-start gap-4 w-full">
              <span className="text-primary/50 text-sm font-poppins tracking-wider uppercase">
                SERVICES DETAILS
              </span>
              <div className="self-stretch flex flex-col justify-start items-start gap-8 w-full">
                {SERVICES.map((service, index) => (
                  <div key={service.id} id={`service-detail-${service.id}`} className="w-full">
                    <ServiceDetailCard
                      icon={service.iconName}
                      title={service.title}
                      description={service.description}
                      bullets={service.bullets}
                      isOpen={openCardIdx === index}
                      onToggle={() => setOpenCardIdx(openCardIdx === index ? null : index)}
                    />
                  </div>
                ))}
              </div>
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
