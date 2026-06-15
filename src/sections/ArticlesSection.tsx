"use client";

import React from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ALL_ARTICLES } from "@/data/articlesData";
import { ArticleCard } from "@/components/card/ArticleCard";
import { Button } from "@/components/Button";
import { useLanguage } from "@/context/LanguageContext";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.13,
    },
  },
};

// Cards slide from right — opposite to header which slides from left
const cardVariants: Variants = {
  hidden: { x: 50, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.55, ease: "easeOut" } },
};

const headerSlideLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const ArticlesSection: React.FC = () => {
  const { lang } = useLanguage();

  // Show only the first 3 articles
  const displayedArticles = ALL_ARTICLES.slice(0, 3);

  return (
    <section id="blog" className="w-full pt-16 bg-white z-20 relative">
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-16 lg:px-24 xl:px-36 flex flex-col justify-start items-start gap-6">

        {/* Section Header */}
        <motion.div
          className="self-stretch flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4"
          variants={headerSlideLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >

          {/* Header text matching the articles page header style */}
          <div className="flex flex-col justify-start items-start gap-1">
            <div>
              <span className="text-primary/50 text-sm font-medium font-poppins">
                {lang === "en" ? "DISCOVER" : "TEMUKAN"}
              </span>
            </div>
            <h2 className="justify-start text-primary text-3xl font-semibold font-poppins">
              {lang === "en" ? "Newest Article" : "Artikel Terbaru"}
            </h2>
          </div>

          {/* View All Articles Button */}
          <Link href="/articles">
            <Button
              variant="primary"
              text={lang === "en" ? "View All Articles" : "Lihat Semua Artikel"}
              className=" hover:opacity-95 text-base font-medium"
            />
          </Link>
        </motion.div>

        {/* Articles Cards Grid */}
        <motion.div
          className="self-stretch flex flex-wrap justify-center xl:grid xl:grid-cols-3 gap-8 justify-items-center xl:justify-between items-stretch mt-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {displayedArticles.map((article) => (
            <motion.div key={article.id} variants={cardVariants} className="w-full max-w-[384px] flex justify-center">
              <ArticleCard
                title={article.title}
                date={article.date}
                category={article.category}
                categoryVariant={article.categoryVariant}
                imageUrl={article.imageUrl}
                href={`/articles/${article.id}`}
              />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
