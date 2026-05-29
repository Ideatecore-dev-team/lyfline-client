"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { StatCard } from "@/components/StatCard";

export const AboutUsHero: React.FC = () => {
  // We'll structure the stats precisely to match the visual styling in the mockup:
  // - Stat 1 (30+): Red Background
  // - Stat 2 (7): Light-blue/white Background
  // - Stat 3 (100%): Light-blue/white Background
  // - Stat 4 (95%): Deep-blue Background
  const customStats = [
    {
      id: "1",
      value: "30+",
      label: "Hospitals Partners Worldwide",
      bgClass: "bg-accent text-white shadow-lg shadow-accent/25",
      valueClass: "text-white",
      labelClass: "text-white/95",
    },
    {
      id: "2",
      value: "7",
      label: "Countries in Our Network",
      bgClass: "bg-white border border-slate-100 text-neutral-dark",
      valueClass: "text-[#3F71B7]",
      labelClass: "text-neutral-muted",
    },
    {
      id: "3",
      value: "100%",
      label: "End-to-End Service Coverage",
      bgClass: "bg-white border border-slate-100 text-neutral-dark",
      valueClass: "text-[#3F71B7]",
      labelClass: "text-neutral-muted",
    },
    {
      id: "4",
      value: "95%",
      label: "Sastisfaction Rate",
      bgClass: "bg-[#2E42A5] text-white shadow-lg shadow-[#2E42A5]/20",
      valueClass: "text-white",
      labelClass: "text-white/95",
    },
  ];

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-white mt-16">
      {/* Decorative premium glows */}
      <div className="absolute top-20 left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-3xl -z-10" />
      <div className="absolute bottom-10 right-[-10%] w-[35%] h-[35%] rounded-full bg-accent/5 blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT SIDE: WHO WE ARE CARD (7 columns on lg) */}
          <motion.div
            className="lg:col-span-7 bg-primary-light/50 p-8 md:p-10 lg:p-12 rounded-[36px] border border-primary-light/60 shadow-sm flex flex-col justify-center"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Subtitle */}
            <span className="text-xs font-bold text-[#95B0D7] tracking-widest uppercase mb-4 block font-poppins">
              WHO WE ARE
            </span>

            {/* Main Headline */}
            <h1 className="text-2xl md:text-3xl lg:text-[32px] font-semibold tracking-tight text-primary font-poppins leading-tight mb-8">
              Build on Trust, Driven with Care
            </h1>

            {/* Paragraph Blocks */}
            <div className="space-y-6 text-sm md:text-base text-neutral-muted leading-relaxed font-sans">
              <p>
                As your trusted medical care facilitator, we take care of every step of your healthcare journey — from initial consultation to treatment support and travel arrangements. Simply reach out to LYFLINE and share your medical history with us.
              </p>
              <p>
                Our team will help you explore the best treatment options, recommended doctors, hospitals or clinics, preferred destinations, travel arrangements, and more — all tailored to your needs.
              </p>
              <p>
                With LYFLINE, there are no hidden fees and no complicated payment schemes. You only pay for the services you receive.
              </p>
            </div>
          </motion.div>

          {/* RIGHT SIDE: MORE ABOUT US STATS CARD (5 columns on lg) */}
          <motion.div
            className="lg:col-span-5 bg-primary-light/50 p-8 md:p-10 lg:p-12 rounded-[36px] border border-primary-light/60 shadow-sm flex flex-col justify-center"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            <div className="flex flex-col gap-6">
              <div>
                <span className="text-xs font-bold text-[#95B0D7] tracking-widest uppercase block font-poppins">
                  MORE ABOUT US
                </span>
              </div>

              {/* 2x2 Grid of Stat Cards */}
              <div className="grid grid-cols-2 gap-4">
                {customStats.map((stat, idx) => (
                  <StatCard
                    key={stat.id}
                    value={stat.value}
                    label={stat.label}
                    delay={0.2 + idx * 0.08}
                    className={stat.bgClass}
                    valueClassName={stat.valueClass}
                    labelClassName={stat.labelClass}
                  />
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
