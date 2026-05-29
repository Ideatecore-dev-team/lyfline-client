"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Award, Handshake, HeartHandshake } from "lucide-react";
import { Card } from "@/components/Card";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import { cn } from "@/lib/utils";

export const VisionMission: React.FC = () => {
  const cards = [
    {
      id: "1",
      title: "Professional Excellence",
      description: "Continuously enhancing our knowledge and skills to keep pace with advancements in healthcare.",
      icon: Award,
      isHighlighted: true,
    },
    {
      id: "2",
      title: "Trusted Partnerships",
      description: "Ensuring a reliable and trustworthy network of doctors and healthcare providers.",
      icon: Handshake,
      isHighlighted: false,
    },
    {
      id: "3",
      title: "Patient-Centered Service",
      description: "Delivering a valuable and supportive experience for clients throughout their healthcare journey.",
      icon: HeartHandshake,
      isHighlighted: false,
    },
  ];

  return (
    <section className="relative py-20 md:py-24 bg-primary-light/30 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-[-10%] w-[35%] h-[35%] rounded-full bg-primary/5 blur-3xl -z-10" />

      {/* Noise Texture Overlay */}
      <NoiseOverlay opacity={0.06} />
      
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col items-center mb-12">
          <div className="flex flex-col items-start">
            <span className="text-xs font-bold text-[#95B0D7] tracking-widest uppercase mb-3 block font-poppins text-left">
              OUR VISION & MISSION
            </span>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 relative flex items-center justify-center select-none pointer-events-none">
                <Image
                  src="/icons/HeartsBlue icon.svg"
                  alt="Hearts Blue"
                  width={36}
                  height={36}
                  className="w-full h-full object-contain"
                />
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-primary font-sans">
                Dedicated to Your Health
              </h2>
            </div>
          </div>
        </div>

        {/* Vision Banner statement per Mockup */}
        <motion.div
          className="mb-12 w-full"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white border border-slate-100/80 rounded-3xl p-6 md:p-8 shadow-sm flex items-center justify-center text-center">
            <p className="text-sm md:text-base font-semibold leading-relaxed text-neutral-dark max-w-4xl">
              Our Vision is to become a prominent company in the medical society, known for delivering reliable medical consultancy services, with good value for money and trustworthy networks.
            </p>
          </div>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="h-full"
              >
                <Card
                  variant={card.isHighlighted ? "default" : "glass"}
                  hoverable={true}
                  className={cn(
                    "h-full p-8 flex flex-col justify-between rounded-[28px] border transition-all duration-300 min-h-[220px]",
                    card.isHighlighted
                      ? "bg-linear-to-br from-primary to-primary-hover text-white border-transparent shadow-xl shadow-primary/20"
                      : "bg-white text-neutral-dark border-slate-100"
                  )}
                >
                  <div>
                    {/* Icon Container */}
                    <div
                      className={cn(
                        "w-11 h-11 rounded-xl flex items-center justify-center mb-6 shadow-xs border",
                        card.isHighlighted
                          ? "bg-white/20 border-white/10 text-white"
                          : "bg-primary-light border-transparent text-primary"
                      )}
                    >
                      <Icon className="w-5.5 h-5.5" />
                    </div>

                    {/* Title */}
                    <h3 className={cn("text-lg font-bold mb-3.5 tracking-tight", card.isHighlighted ? "text-white" : "text-neutral-dark")}>
                      {card.title}
                    </h3>

                    {/* Description */}
                    <p className={cn("text-xs md:text-sm leading-relaxed", card.isHighlighted ? "text-slate-100/90" : "text-neutral-muted")}>
                      {card.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
