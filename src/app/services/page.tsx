"use client";

import React, { useState } from "react";
import { NavBar } from "@/components/NavBar";
import { CtaSection } from "@/sections/CtaSection";
import { Footer } from "@/components/Footer";
import { ServiceDetailCard } from "@/components/card/ServiceDetailCard";
import { SERVICES } from "@/data/mockData";

export default function ServicesPage() {
  // First services card is open by default (index 0)
  const [openCardIdx, setOpenCardIdx] = useState<number | null>(0);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <NavBar />

      <main className="grow pt-[80px] w-full flex flex-col justify-start items-center relative overflow-x-hidden">
        {/* Main centered container */}
        <section className="w-full max-w-[1440px] px-6 md:px-36 py-16 relative bg-white flex flex-col justify-start items-start gap-8 overflow-hidden">

          {/* Background Decorative Shapes */}
          <div className="size-48 left-[-98px] top-[-98px] absolute bg-rose-50 rounded-full pointer-events-none z-0" />
          {/* Section Header */}
          <div className="self-stretch flex flex-col justify-start items-start gap-6 z-10 w-full">
            <div className="self-stretch inline-flex justify-between items-end w-full">
              <div className="flex-1 inline-flex flex-col justify-start items-center gap-1 w-full text-center">
                <div className="size- inline-flex justify-center items-center gap-3">
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

            {/* Waver Wave Masonry Grid (Empty Gray Boxes) */}
            <div className="self-stretch inline-flex flex-col md:flex-row justify-center items-end gap-6 overflow-hidden w-full mt-4">

              {/* Column 1 */}
              <div className="flex-1 inline-flex flex-col justify-end items-start gap-6 w-full">
                {/* Partner in Care */}
                <div className="self-stretch h-60 relative rounded-[32px] outline-1 outline-offset-[-1px] outline-zinc-200 overflow-hidden w-full bg-slate-100" />

                {/* Insurance Buddy */}
                <div className="self-stretch h-44 relative rounded-[32px] outline-1 outline-offset-[-1px] outline-zinc-200 overflow-hidden w-full bg-slate-100" />
              </div>

              {/* Column 2: Doctor Matching */}
              <div className="flex-1 h-80 relative rounded-[32px] outline-1 outline-offset-[-1px] outline-zinc-200 overflow-hidden w-full bg-slate-100" />

              {/* Column 3: Travel Support */}
              <div className="flex-1 h-60 relative rounded-[32px] outline-1 outline-offset-[-1px] outline-zinc-200 overflow-hidden w-full bg-slate-100" />

              {/* Column 4: Monitor Ready */}
              <div className="flex-1 h-80 relative rounded-[32px] outline-1 outline-offset-[-1px] outline-zinc-200 overflow-hidden w-full bg-slate-100" />

              {/* Column 5 */}
              <div className="flex-1 inline-flex flex-col justify-end items-start gap-6 w-full">
                {/* Guided Care */}
                <div className="self-stretch h-60 relative rounded-[32px] outline-1 outline-offset-[-1px] outline-zinc-200 overflow-hidden w-full bg-slate-100" />

                {/* Medical Treatment */}
                <div className="self-stretch h-44 relative rounded-[32px] outline-1 outline-offset-[-1px] outline-zinc-200 overflow-hidden w-full bg-slate-100" />
              </div>

            </div>
          </div>

          {/* Divider line */}
          <hr className="w-full border-t border-primary/20 my-4 z-10" />

          {/* Services Details Accordion Section */}
          <div className="self-stretch flex flex-col justify-start items-start gap-4 z-10 w-full">
            <span className="text-primary/50 text-sm font-poppins tracking-wider uppercase">
              SERVICES DETAILS
            </span>
            <div className="self-stretch flex flex-col justify-start items-start gap-8 w-full">
              {SERVICES.map((service, index) => (
                <ServiceDetailCard
                  key={service.id}
                  icon={service.iconName}
                  title={service.title}
                  description={service.description}
                  bullets={service.bullets}
                  isOpen={openCardIdx === index}
                  onToggle={() => setOpenCardIdx(openCardIdx === index ? null : index)}
                />
              ))}
            </div>
          </div>

        </section>

        <CtaSection />
      </main>

      <Footer />
    </div>
  );
}
