"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Smile, FileText, Search, MapPin, Monitor, Stethoscope, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

export const ServiceHeroSection: React.FC = () => {
  // 5-column photo grid:
  // - Column 1: Partner in Care (top), Insurance Buddy (bottom)
  // - Column 2: Doctor Matching (tall, lg:translate-y-10)
  // - Column 3: Travel Support (tall, lg:translate-y-20)
  // - Column 4: Monitor Ready (tall, lg:translate-y-10)
  // - Column 5: Guided Care (top), Medical Treatment (bottom)
  const columns = [
    {
      id: "col-1",
      className: "flex flex-col gap-6 w-full",
      items: [
        {
          id: "partner-care",
          title: "Partner in Care",
          url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=400",
          icon: Smile,
          aspect: "aspect-[4/5]",
          heightClass: "lg:h-[240px] lg:aspect-auto",
        },
        {
          id: "insurance-buddy",
          title: "Insurance Buddy",
          url: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400",
          icon: FileText,
          aspect: "aspect-[4/5]",
          heightClass: "lg:h-[176px] lg:aspect-auto",
        },
      ],
    },
    {
      id: "col-2",
      className: "flex flex-col gap-6 w-full",
      items: [
        {
          id: "doctor-matching",
          title: "Doctor Matching",
          url: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400",
          icon: Search,
          aspect: "aspect-[1/2]",
          heightClass: "lg:h-[344px] lg:aspect-auto",
        },
      ],
    },
    {
      id: "col-3",
      className: "flex flex-col gap-6 w-full",
      items: [
        {
          id: "travel-support",
          title: "Travel Support",
          url: "https://images.unsplash.com/photo-1542296397-2b8986c53927?auto=format&fit=crop&q=80&w=400",
          icon: MapPin,
          aspect: "aspect-square",
          heightClass: "lg:h-[244px] lg:aspect-auto",
        },
      ],
    },
    {
      id: "col-4",
      className: "flex flex-col gap-6 w-full",
      items: [
        {
          id: "monitor-ready",
          title: "Monitor Ready",
          url: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=400",
          icon: Monitor,
          aspect: "aspect-[1/2]",
          heightClass: "lg:h-[344px] lg:aspect-auto",
        },
      ],
    },
    {
      id: "col-5",
      className: "flex flex-col gap-6 w-full",
      items: [
        {
          id: "guided-care",
          title: "Guided Care",
          url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=400",
          icon: Stethoscope,
          aspect: "aspect-[4/5]",
          heightClass: "lg:h-[240px] lg:aspect-auto",
        },
        {
          id: "medical-treatment",
          title: "Medical Treatment",
          url: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=400",
          icon: Shield,
          aspect: "aspect-[4/5]",
          heightClass: "lg:h-[176px] lg:aspect-auto",
        },
      ],
    },
  ];

  return (
    <section className="relative py-20 md:py-24 bg-[#ECF1F8]/30 overflow-hidden mt-16">
      {/* Decorative background glows */}
      <div className="absolute top-20 left-[-10%] w-[45%] h-[45%] rounded-full bg-[#3F71B7]/5 blur-3xl -z-10" />
      <div className="absolute bottom-10 right-[-10%] w-[40%] h-[40%] rounded-full bg-[#3F71B7]/5 blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col items-center">
        {/* Title row with red Lyfline logo mark */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-2 mb-2 flex-wrap"
        >
          <Image
            src="/icons/Hearts icon.svg"
            alt="Lyfline Icon"
            width={32}
            height={32}
            className="w-8 h-8 md:w-[34px] md:h-[34px] object-contain shrink-0 filter drop-shadow-[0_2px_4px_rgba(224,40,40,0.2)]"
          />
          <h1 className="text-3xl md:text-4xl lg:text-[40px] font-semibold tracking-tight text-[#3F71B7] font-poppins leading-tight text-center">
            Gateway to International Healthcare
          </h1>
        </motion.div>

        {/* Subtitle Badge below heading */}
        <motion.span 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xs font-bold text-[#95B0D7] tracking-widest uppercase mb-8 block text-center font-poppins"
        >
          OUR SERVICES
        </motion.span>

        {/* Photo Grid - 5 columns on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6 w-full lg:h-[440px] lg:items-end mt-4">
          {columns.map((column, colIdx) => (
            <div key={column.id} className={column.className}>
              {column.items.map((item, itemIdx) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ 
                      duration: 0.6, 
                      delay: (colIdx * 2 + itemIdx) * 0.08,
                      ease: "easeOut"
                    }}
                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                    className={cn(
                      "relative w-full rounded-[24px] overflow-hidden bg-slate-100 shadow-md group hover:shadow-lg transition-shadow duration-300",
                      item.aspect,
                      item.heightClass
                    )}
                  >
                    <Image
                      src={item.url}
                      alt={item.title}
                      fill
                      sizes="(max-w-768px) 100vw, (max-w-1024px) 50vw, 20vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      priority={colIdx === 2}
                    />
                    
                    {/* Dark gradient overlay for readability */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-transparent opacity-85" />

                    {/* Centered Pill Badge floating at bottom */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 shadow-sm whitespace-nowrap z-10">
                      <IconComponent className="w-3.5 h-3.5 text-white shrink-0" />
                      <span className="text-[11px] font-bold text-white font-poppins">
                        {item.title}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
