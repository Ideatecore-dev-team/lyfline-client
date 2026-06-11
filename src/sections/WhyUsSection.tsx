"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Sparkles, DollarSign, Activity, FileText } from "lucide-react";
import { STATS, BENEFITS } from "@/data/mockData";
import { cn } from "@/lib/utils";

const benefitIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Home: DollarSign, // Map to Dollar for fee transparency
  UserCheck: Activity, // Map to Activity for guided care
  Calendar: Sparkles, // Map to sparkles for packages
  ShieldCheck: FileText, // Map to FileText for transparency
};

export const WhyUsSection: React.FC = () => {
  return (
    <section id="why-us" className="py-20 md:py-28 bg-[#FAFCFF] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-[-10%] w-[40%] h-[40%] bg-primary/5 blur-3xl rounded-full" />
      <div className="absolute bottom-20 left-[-10%] w-[30%] h-[30%] bg-accent/5 blur-3xl rounded-full" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-36">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* STATS GRID (LEFT COLUMN - 5 cols) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4 md:gap-6">
            {STATS.map((stat, index) => {
              // Map cards according to Image 4 mockups:
              // Index 0: Red primary accent card (Hospitals Partners)
              // Index 3: Dark blue/primary accent card (Satisfaction Rate)
              // Index 1 & 2: Neutral white cards
              
              const isRedHighlighted = index === 0;
              const isBlueHighlighted = index === 3;

              return (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={cn(
                    "p-6 rounded-3xl flex flex-col justify-between aspect-square shadow-xl shadow-slate-100/50 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 border",
                    isRedHighlighted && "bg-accent border-transparent text-white shadow-accent/25",
                    isBlueHighlighted && "bg-primary border-transparent text-white shadow-primary/25",
                    !isRedHighlighted && !isBlueHighlighted && "bg-white border-slate-100 text-neutral-dark"
                  )}
                >
                  <span className={cn(
                    "text-3xl md:text-4xl font-extrabold tracking-tight block mb-2",
                    isRedHighlighted || isBlueHighlighted ? "text-white" : "text-primary"
                  )}>
                    {stat.value}
                  </span>
                  
                  <span className={cn(
                    "text-xs md:text-sm font-semibold leading-snug",
                    isRedHighlighted || isBlueHighlighted ? "text-slate-100/90" : "text-neutral-muted"
                  )}>
                    {stat.label}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* BENEFITS LIST (RIGHT COLUMN - 7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <span className="text-xs font-bold tracking-widest text-primary uppercase block mb-3">
              WHY LYFLINE?
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-dark mb-10 leading-tight">
              We are a Partner in Care
            </h2>

            {/* Benefits Stack */}
            <div className="space-y-6 w-full">
              {BENEFITS.map((benefit, index) => {
                const IconComponent = benefitIcons[benefit.iconName] || ShieldCheck;
                // Highlight the first benefit row in blue backplate according to Image 4
                const isFirst = index === 0;

                return (
                  <motion.div
                    key={benefit.id}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-100px" }}
                    className={cn(
                      "flex gap-4 p-5 rounded-2xl transition-all duration-300 border border-transparent",
                      isFirst 
                        ? "bg-primary text-white shadow-lg shadow-primary/15" 
                        : "bg-white border-slate-100 hover:border-primary/20 text-neutral-dark shadow-md"
                    )}
                  >
                    {/* Icon container */}
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                      isFirst ? "bg-white/20 text-white" : "bg-primary-light text-primary"
                    )}>
                      <IconComponent className="w-5 h-5" />
                    </div>

                    {/* Content */}
                    <div>
                      <h4 className={cn(
                        "text-base font-bold mb-1 tracking-tight",
                        isFirst ? "text-white" : "text-neutral-dark"
                      )}>
                        {benefit.title}
                      </h4>
                      <p className={cn(
                        "text-xs md:text-sm leading-relaxed",
                        isFirst ? "text-slate-100/90" : "text-neutral-muted"
                      )}>
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
