"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { NoiseOverlay } from "@/components/NoiseOverlay";

export const AboutServices: React.FC = () => {
  // Staggered columns for the services icon layout:
  // - Column 1: Nurse (top), Ambulance (bottom)
  // - Column 2: Medical Shield (top-middle), Stethoscope (bottom-middle) - offset downwards
  // - Column 3: Checkup (top-right), Location (bottom-right)
  const columns = [
    {
      id: "col-1",
      className: "flex flex-col gap-3 md:gap-4",
      items: [
        { id: "nurse", path: "/icons/Nurse.svg", label: "Nurse Support" },
        { id: "ambulance", path: "/icons/Ambulance - Fast.svg", label: "Ambulance Evacuation" },
      ],
    },
    {
      id: "col-2",
      className: "flex flex-col gap-3 md:gap-4 translate-y-4 md:translate-y-6",
      items: [
        { id: "shield", path: "/icons/Medical Shield.svg", label: "Medical Shield Protection" },
        { id: "stethoscope", path: "/icons/Stethoscope.svg", label: "Doctor Stethoscope" },
      ],
    },
    {
      id: "col-3",
      className: "flex flex-col gap-3 md:gap-4",
      items: [
        { id: "checkup", path: "/icons/Checkup.svg", label: "Medical Checkup" },
        { id: "location", path: "/icons/Location.svg", label: "Network Location" },
      ],
    },
  ];

  return (
    <section className="py-20 md:py-24 bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-36">

        {/* Section Heading Subtitle - Styled exactly like Expertise Across The World */}
        <span className="text-xs font-bold text-[#95B0D7] tracking-widest uppercase mb-4 block text-left font-poppins">
          OUR SERVICES
        </span>

        {/* Banner container per mockup */}
        <div className="relative w-full bg-linear-to-r from-primary to-primary-hover rounded-[36px] overflow-hidden p-8 md:p-12 lg:py-14 lg:pl-14 lg:pr-8 text-white shadow-xl shadow-primary/10">

          {/* Heart Accent Ornament in the bottom-right corner as shown in Figma */}
          <div className="absolute bottom-0 right-0 w-[84px] h-[84px] pointer-events-none opacity-90 select-none z-0">
            <Image
              src="/icons/Hearts icon.svg"
              alt="Heart Ornament"
              width={84}
              height={84}
              className="w-full h-full object-contain filter drop-shadow-[0_4px_8px_rgba(224,40,40,0.25)]"
            />
          </div>

          {/* Decorative background glows */}
          <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[60%] bg-white/5 blur-2xl rounded-full pointer-events-none" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[50%] bg-white/5 blur-2xl rounded-full pointer-events-none" />

          {/* Noise Texture Overlay */}
          <NoiseOverlay opacity={0.6} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">

            {/* LEFT COLUMN: TEXT CONTENT (9 columns on lg) */}
            <div className="lg:col-span-9 flex flex-col items-start">
              <h2 className="text-[28px] md:text-[32px] font-medium tracking-tight leading-tight text-white mb-8 max-w-2xl font-poppins">
                We Serve You Seamless End-to-End Healthcare Support
              </h2>
              <Link
                href="/services"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-white/30 hover:border-white text-white font-bold text-xs bg-white/5 hover:bg-white/10 transition-all shadow-sm"
              >
                View Our Service <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* RIGHT COLUMN: STAGGERED FLOATING ICONS (3 columns on lg) */}
            <div className="lg:col-span-3 flex justify-center lg:justify-end w-full pb-8 lg:pb-0">
              {/* Flex row container for columns */}
              <div className="flex gap-3 md:gap-4 items-start max-w-[320px] w-full">

                {columns.map((column) => (
                  <div key={column.id} className={column.className}>
                    {column.items.map((item, idx) => (
                      <motion.div
                        key={item.id}
                        initial={{ scale: 0.8, opacity: 0, y: 15 }}
                        whileInView={{ scale: 1, opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                        className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl md:rounded-[20px] bg-white/15 border border-white/15 flex items-center justify-center p-3 md:p-4 shadow-md shadow-black/5 hover:shadow-black/10 transition-all cursor-pointer"
                        title={item.label}
                      >
                        <Image
                          src={item.path}
                          alt={item.label}
                          width={32}
                          height={32}
                          className="w-6 h-6 md:w-8 md:h-8 object-contain brightness-0 invert"
                        />
                      </motion.div>
                    ))}
                  </div>
                ))}

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
