"use client";

import { motion, Variants } from "framer-motion";
import { Quote } from "lucide-react";
import { TESTIMONIALS } from "@/entities";
import { Card } from "@/shared/ui/Card";

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

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-accent text-white relative overflow-hidden">
      {/* Visual background patterns */}
      <div className="absolute top-[-10%] left-[-10%] w-[35%] h-[35%] bg-white/5 blur-3xl rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] bg-white/5 blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-20 text-left">
          <span className="text-xs font-bold tracking-widest text-red-200 uppercase block mb-3 opacity-90">
            WHAT THEY SAY ABOUT US
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            Impactful Stories
          </h2>
        </div>

        {/* Testimonials Grid (1, 2, or 4 cols) */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {TESTIMONIALS.map((testimonial) => (
            <motion.div key={testimonial.id} variants={cardVariants} className="h-full">
              <Card
                variant="default"
                hoverable={true}
                className="bg-white text-neutral-dark border-transparent p-8 h-full flex flex-col justify-between rounded-3xl"
              >
                <div>
                  {/* Quote icon */}
                  <Quote className="w-8 h-8 text-primary/20 transform rotate-180 mb-6" />

                  {/* Quote text */}
                  <p className="text-xs md:text-sm leading-relaxed text-neutral-muted mb-8 italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                </div>

                {/* User footer */}
                <div className="border-t border-slate-100 pt-6 mt-auto">
                  <h4 className="font-bold text-sm text-primary tracking-tight">
                    {testimonial.name}
                  </h4>
                  <p className="text-[10px] text-slate-400 font-semibold mt-0.5">
                    {testimonial.role}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
