"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArticleCard } from "@/components/card/ArticleCard";
import { Button } from "@/components/Button";
import { useLanguage } from "@/context/LanguageContext";
import { fetchArticles } from "@/api/articles";
import { type Article } from "@/data/articlesData";
import { slugify } from "@/lib/utils";

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
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetchArticles({ limit: 3 })
      .then((data) => {
        if (active) {
          setArticles(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error loading home articles:", err);
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

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
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={`skeleton-${i}`} className="w-full max-w-[384px] bg-white rounded-[32px] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col justify-start items-start overflow-hidden animate-pulse">
                <div className="w-full h-52 bg-slate-200" />
                <div className="self-stretch p-6 flex flex-col gap-6 w-full">
                  <div className="flex justify-between items-center gap-3">
                    <div className="h-8 w-24 bg-slate-200 rounded-full" />
                    <div className="h-8 w-20 bg-slate-200 rounded-full" />
                  </div>
                  <div className="h-5 bg-slate-200 rounded w-full" />
                  <div className="h-5 bg-slate-200 rounded w-4/5" />
                  <div className="h-4 bg-slate-200 rounded w-16 mt-2" />
                </div>
              </div>
            ))
          ) : articles.length > 0 ? (
            articles.map((article) => (
              <motion.div key={article.id} variants={cardVariants} className="w-full max-w-[384px] flex justify-center">
                <ArticleCard
                  title={article.title}
                  date={article.date}
                  category={article.category}
                  categoryVariant={article.categoryVariant}
                  customColor={article.customColor}
                  imageUrl={article.imageUrl}
                  href={`/articles/${slugify(article.title)}-${article.id}`}
                />
              </motion.div>
            ))
          ) : (
            <div className="py-12 text-center text-slate-400 font-poppins text-base w-full">
              {lang === "en" ? "No articles available." : "Tidak ada artikel tersedia."}
            </div>
          )}
        </motion.div>

      </div>
    </section>
  );
};
