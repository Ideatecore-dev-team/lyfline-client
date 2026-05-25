"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/data/mockData";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import { cn } from "@/lib/utils";

const iconImageMap: Record<string, string> = {
  Calendar: "/icons/MAA icon.png",
  Home: "/icons/YPHC icon.png",
  Truck: "/icons/ME icon.png",
  UserCheck: "/icons/PDM icon.png",
  Plane: "/icons/TAS icon.png",
  ShieldCheck: "/icons/GC icon.png",
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export const ServicesSection: React.FC = () => {
  return (
    <Section
      id="services"
      subtitle="WHAT WE DO"
      title="Your Gateway to International Healthcare"
      className="bg-slate-50/50"
    >
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {SERVICES.map((service, index) => {
          // Highlight the first card per mockup (makes it feel premium)
          const isHighlighted = index === 0;

          return (
            <motion.div key={service.id} variants={cardVariants}>
              <Card
                variant={isHighlighted ? "default" : "glass"}
                hoverable={true}
                className={cn(
                  "h-full flex flex-col justify-between p-8 border min-h-[300px]",
                  isHighlighted
                    ? "bg-gradient-to-br from-primary to-primary-hover text-white border-transparent shadow-xl shadow-primary/25"
                    : "bg-white text-neutral-dark border-slate-100"
                )}
              >
                <div>
                  {/* Icon Frame */}
                  <div
                    className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center mb-6 overflow-hidden border transition-all duration-300",
                      isHighlighted
                        ? "bg-white border-transparent shadow-md shadow-black/5"
                        : "bg-white/50 border-slate-100"
                    )}
                  >
                    <Image
                      src={iconImageMap[service.iconName]}
                      alt={service.title}
                      width={48}
                      height={48}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Title */}
                  <h3
                    className={cn(
                      "text-xl font-bold mb-4 tracking-tight",
                      isHighlighted ? "text-white" : "text-neutral-dark"
                    )}
                  >
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p
                    className={cn(
                      "text-sm leading-relaxed mb-6",
                      isHighlighted ? "text-slate-100/90" : "text-neutral-muted"
                    )}
                  >
                    {service.description}
                  </p>
                </div>

                {/* View More Link */}
                <a
                  href="#"
                  className={cn(
                    "inline-flex items-center gap-2 text-sm font-semibold group mt-auto w-fit",
                    isHighlighted
                      ? "text-white hover:text-white/80"
                      : "text-primary hover:text-primary-hover"
                  )}
                >
                  View more
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
};
