"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import { ARTICLES } from "@/data/mockData";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";

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

// Map real visual high-quality images to match mock subjects
const realArticleImages = [
  "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=600", // Driving a car (Tips Mudik)
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600", // Knee/Therapy (Lutut Osteoarthritis)
  "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600", // Exhausted/rest (Lemas Puasa)
];

export const ArticlesSection: React.FC = () => {
  return (
    <section id="blog" className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-36">
        
        {/* Section Header with row alignment (Desktop) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div className="text-left">
            <span className="text-xs font-bold tracking-widest text-primary uppercase block mb-3">
              DISCOVER
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-dark">
              Newest Article
            </h2>
          </div>
          <Button variant="primary" size="sm" className="w-fit gap-2">
            View Articles <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Articles Grid (3 cards) */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {ARTICLES.map((article, index) => (
            <motion.div key={article.id} variants={cardVariants} className="h-full">
              <Card
                variant="glass"
                hoverable={true}
                className="h-full p-0 overflow-hidden flex flex-col justify-between rounded-3xl border border-slate-100 bg-slate-50/20"
              >
                <div>
                  {/* Article Image Container */}
                  <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={realArticleImages[index] || article.imageUrl}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      loading="lazy"
                    />
                  </div>

                  {/* Metadata Row */}
                  <div className="px-6 pt-6 flex items-center justify-between gap-4 mb-4">
                    <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {article.date}
                    </span>
                    <Badge variant={article.category === "Cardiology" ? "accent" : "primary"}>
                      {article.category}
                    </Badge>
                  </div>

                  {/* Title */}
                  <h3 className="px-6 text-base md:text-lg font-bold text-neutral-dark leading-snug tracking-tight mb-6 hover:text-primary transition-colors line-clamp-3">
                    {article.title}
                  </h3>
                </div>

                {/* Read More Footer */}
                <div className="px-6 pb-6 mt-auto">
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-primary-hover group"
                  >
                    Read More
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
