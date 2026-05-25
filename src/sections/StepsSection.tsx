"use client";

import { motion, Variants } from "framer-motion";
import { STEPS } from "@/data/mockData";
import { cn } from "@/lib/utils";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const stepVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export const StepsSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-primary text-white relative overflow-hidden">
      {/* Visual background patterns */}
      <div className="absolute top-0 right-0 w-[30%] h-[30%] bg-white/5 blur-3xl rounded-full" />
      <div className="absolute bottom-0 left-0 w-[45%] h-[40%] bg-white/5 blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-24 text-left">
          <span className="text-xs font-bold tracking-widest text-primary-light uppercase block mb-3 opacity-90">
            HOW WE WORK
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            Simple Steps to Your Recovery
          </h2>
        </div>

        {/* Timeline Grid (4 steps connected by line) */}
        <motion.div
          className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Connecting line (Desktop Only) */}
          <div className="hidden lg:block absolute top-7 left-8 right-8 h-0.5 bg-white/20 -z-10" />

          {STEPS.map((step) => {
            const isRedAccent = step.number === "01";

            return (
              <motion.div
                key={step.id}
                variants={stepVariants}
                className="flex flex-col items-start relative group"
              >
                {/* Connector for mobile/tablet (vertical timeline feel) */}
                <div className="md:hidden absolute left-7 top-14 bottom-[-48px] w-0.5 bg-white/10 -z-10 group-last:hidden" />

                {/* Badge Number Circle */}
                <div
                  className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center font-extrabold text-lg mb-6 shadow-md transition-all duration-300 group-hover:scale-110",
                    isRedAccent
                      ? "bg-accent text-white shadow-accent/20"
                      : "bg-white text-primary shadow-white/10"
                  )}
                >
                  {step.number}
                </div>

                {/* Content block */}
                <div>
                  <h3 className="text-xl font-bold mb-4 tracking-tight group-hover:text-primary-light transition-colors">
                    {step.title}
                  </h3>
                  
                  {/* Divider line under title */}
                  <div className="w-12 h-1 bg-white/20 mb-4 rounded-full group-hover:w-20 transition-all duration-300" />

                  <p className="text-sm leading-relaxed text-slate-100/80">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};
