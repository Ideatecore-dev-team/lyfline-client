"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SERVICES, MedicalService } from "@/data/mockData";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import { cn } from "@/lib/utils";

const iconImageMap: Record<string, string> = {
  Calendar: "/icons/Nurse.svg",
  Home: "/icons/Medical Shield.svg",
  Truck: "/icons/Ambulance - Fast.svg",
  UserCheck: "/icons/Stethoscope.svg",
  Plane: "/icons/Location Add.svg",
  ShieldCheck: "/icons/Checkup.svg",
};

interface AccordionItemProps {
  service: MedicalService;
  isOpen: boolean;
  onToggle: () => void;
}

const ServiceAccordionItem: React.FC<AccordionItemProps> = ({ service, isOpen, onToggle }) => {
  const iconPath = iconImageMap[service.iconName];

  return (
    <Card
      variant="glass"
      hoverable={false}
      className={cn(
        "border p-6 md:p-8 transition-all duration-300 rounded-[24px] cursor-pointer select-none",
        isOpen 
          ? "bg-white border-primary/20 shadow-md shadow-slate-100/50" 
          : "bg-white border-slate-100 hover:border-slate-200"
      )}
      onClick={onToggle}
    >
      <div className="flex items-start gap-6">
        {/* Left Icon Container - ALWAYS Solid Blue with White Icon */}
        <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center overflow-hidden shrink-0 shadow-sm shadow-primary/15">
          {iconPath && (
            <Image
              src={iconPath}
              alt={service.title}
              width={36}
              height={36}
              className="w-9 h-9 object-contain brightness-0 invert"
            />
          )}
        </div>

        {/* Center content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg md:text-xl font-bold tracking-tight font-poppins text-accent mb-1">
                {service.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed font-sans">
                {service.description}
              </p>
            </div>
            
            {/* Toggle Arrow - ALWAYS Solid Blue with White Chevron */}
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 shadow-sm shadow-primary/15 mt-1"
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </div>

          {/* Bullet Points with animation */}
          <AnimatePresence initial={false}>
            {isOpen && service.bullets && (
              <motion.div
                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="flex flex-col gap-2.5">
                  {service.bullets.map((bullet, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-primary-light w-fit shadow-xs"
                    >
                      <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-[13px] font-semibold text-primary font-poppins leading-none">
                        {bullet}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Card>
  );
};

export const ServiceAccordionSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>("1");

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <Section
      id="services-detail"
      title={null}
      className="bg-white"
    >
      <div className="w-full flex flex-col gap-6">
        {/* SERVICES DETAILS Header */}
        <span className="text-xs font-bold tracking-widest text-[#95B0D7] uppercase block font-poppins">
          SERVICES DETAILS
        </span>

        <div className="flex flex-col gap-4">
          {SERVICES.map((service) => (
            <ServiceAccordionItem
              key={service.id}
              service={service}
              isOpen={openId === service.id}
              onToggle={() => handleToggle(service.id)}
            />
          ))}
        </div>
      </div>
    </Section>
  );
};
