"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";
import InputBox from "@/components/inputbox";
import { ArticleCard } from "@/components/card/ArticleCard";
import { fetchArticles } from "@/api/articles";
import { type Article } from "@/data/articlesData";
import { slugify } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function ArticlesPage() {
  const { lang } = useLanguage();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [appliedSearchQuery, setAppliedSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage, setArticlesPerPage] = useState(9);
  const [isMobileSearch, setIsMobileSearch] = useState(false);

  useEffect(() => {
    let active = true;
    fetchArticles()
      .then((data) => {
        if (active) {
          setArticles(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error fetching articles:", err);
        if (active) {
          setError(err.message);
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 1024) {
        setArticlesPerPage(8);
      } else {
        setArticlesPerPage(9);
      }
      setIsMobileSearch(width < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Filter articles based on category and search query
  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory =
        selectedCategory === "All Categories" || article.category === selectedCategory;
      const matchesSearch = article.title
        .toLowerCase()
        .includes(appliedSearchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [articles, selectedCategory, appliedSearchQuery]);

  // Dynamically compute category buttons from actual loaded articles
  const categoriesList = useMemo(() => {
    if (articles.length === 0) {
      return ["All Categories"];
    }
    const list = ["All Categories"];
    articles.forEach((a) => {
      if (a.category && !list.includes(a.category)) {
        list.push(a.category);
      }
    });
    return list;
  }, [articles]);

  // Paginated articles
  const paginatedArticles = useMemo(() => {
    const startIndex = (currentPage - 1) * articlesPerPage;
    return filteredArticles.slice(startIndex, startIndex + articlesPerPage);
  }, [filteredArticles, currentPage, articlesPerPage]);

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage) || 1;

  const handleSearch = () => {
    setAppliedSearchQuery(searchQuery);
    setCurrentPage(1);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <NavBar />

      <main className="grow pt-[80px] w-full flex flex-col justify-start items-center relative overflow-x-hidden">

        {/* Main Section */}
        <section className="w-full max-w-[1440px] px-6 md:px-16 lg:px-24 xl:px-36 py-16 relative bg-white flex flex-col justify-start items-start gap-8">

          <div className="self-stretch flex flex-col justify-start items-start gap-8 z-10">

            {/* Header */}
            <div className="self-stretch flex flex-col justify-start items-start gap-1">
              <div>
                <span className="text-primary/50 text-sm font-medium font-poppins">
                  {lang === "en" ? "ARTICLES & BLOGS" : "ARTIKEL & BLOG"}
                </span>
              </div>
              <h1 className="justify-start text-primary text-3xl font-semibold font-poppins">
                {lang === "en" ? "Healthcare Daily" : "Info Kesehatan Harian"}
              </h1>
            </div>

            {/* Search segment */}
            <div className="w-full flex flex-col md:flex-row justify-start items-stretch md:items-end gap-3">
              <InputBox
                label={
                  <span className="text-red-600 text-sm font-normal font-poppins">
                    {lang === "en" ? "Search Article" : "Cari Artikel"}
                  </span>
                }
                placeholder={lang === "en" ? "Search here..." : "Tips untuk..."}
                value={searchQuery}
                onChange={(e) => {
                  const val = e.target.value;
                  setSearchQuery(val);
                  if (isMobileSearch) {
                    setAppliedSearchQuery(val);
                    setCurrentPage(1);
                  }
                }}
                onKeyDown={handleKeyPress}
                containerClassName="w-full md:w-[466px]"
              />
              <Button
                variant="outline-primary"
                text={lang === "en" ? "Search" : "Cari"}
                leftIcon="Search 1"
                className="hidden md:inline-flex w-full md:w-auto h-12 px-4 py-3 font-poppins text-base font-semibold"
                onClick={handleSearch}
              />
            </div>

            {/* Separator */}
            <hr className="w-full border-t border-gray-200 my-2" />

            {/* Categories segment */}
            <div className="self-stretch flex flex-wrap justify-center items-center gap-3">
              {categoriesList.map((category) => {
                const isSelected = selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-3 py-2 text-sm font-medium font-poppins transition-all cursor-pointer ${isSelected
                      ? "bg-red-600 rounded-[100px] text-white"
                      : "rounded-[48px] text-black hover:text-red-600"
                      }`}
                  >
                    {category === "All Categories" ? (lang === "en" ? "All Categories" : "Semua Kategori") : category}
                  </button>
                );
              })}
            </div>

          </div>

          {/* Cards & Pagination */}
          <div className="self-stretch flex flex-col justify-center items-center gap-6 mt-4 z-10">

            <div className="self-stretch text-center justify-start text-primary/50 text-sm font-normal font-poppins">
              {appliedSearchQuery || selectedCategory !== "All Categories" ? (
                <span>
                  {lang === "en" ? "Showing results for " : "Menampilkan hasil untuk "}
                  <span className="">
                    {selectedCategory !== "All Categories" ? selectedCategory : ""}
                    {appliedSearchQuery ? `${selectedCategory !== "All Categories" ? (lang === "en" ? " and " : " dan ") : ""}"${appliedSearchQuery}"` : ""}
                  </span>
                </span>
              ) : (
                lang === "en" ? "Showing Newest" : "Menampilkan Terbaru"
              )}
            </div>

            {/* Grid Container with animations */}
            <AnimatePresence mode="wait">
              {loading ? (
                <div className="w-full flex flex-wrap justify-center xl:grid xl:grid-cols-3 gap-8 justify-items-center">
                  {Array.from({ length: articlesPerPage }).map((_, i) => (
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
                  ))}
                </div>
              ) : error ? (
                <div className="py-12 text-center text-red-500 font-poppins text-base w-full">
                  {lang === "en" ? "Failed to load articles: " : "Gagal memuat artikel: "}{error}
                </div>
              ) : paginatedArticles.length > 0 ? (
                <motion.div
                  key={`${selectedCategory}-${appliedSearchQuery}-${currentPage}`}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="w-full flex flex-wrap justify-center xl:grid xl:grid-cols-3 gap-8 justify-items-center"
                >
                  {paginatedArticles.map((article) => (
                    <motion.div
                      key={article.id}
                      variants={cardVariants}
                      className="w-full max-w-[384px]"
                    >
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
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="no-results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-12 text-center text-slate-400 font-poppins text-base w-full"
                >
                  {lang === "en" ? "No articles match your search." : "Tidak ada artikel yang cocok dengan pencarian Anda."}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="self-stretch grid grid-cols-2 sm:flex sm:justify-between items-center gap-6 sm:gap-0 mt-6">

                {/* Previous Button */}
                <Button
                  variant="outline-primary"
                  text={lang === "en" ? "Previous" : "Sebelumnya"}
                  leftIcon="Left 1"
                  className="w-full sm:w-32 h-12 px-4 py-3 font-poppins text-base font-semibold order-2 sm:order-1 justify-self-start"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                />

                {/* Page numbers */}
                <div className="col-span-2 order-1 sm:order-2 justify-self-center flex justify-center items-center gap-4">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    const isCurrent = currentPage === page;
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`size-8 rounded-lg flex items-center justify-center text-base font-semibold font-poppins transition-all cursor-pointer ${isCurrent
                          ? "bg-linear-to-r from-primary to-primary-hover text-white outline -outline-offset-1 outline-slate-500"
                          : "text-slate-500 hover:bg-slate-100"
                          }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>

                {/* Next Button */}
                <Button
                  variant="primary"
                  text={lang === "en" ? "Next" : "Berikutnya"}
                  rightIcon="Right 1"
                  className="w-full sm:w-32 h-12 px-4 py-3 font-poppins text-base font-semibold order-3 sm:order-3 justify-self-end"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                />

              </div>
            )}

          </div>

        </section>

        {/* Decorative Brand Watermark */}
        <span
          style={{
            maskImage: 'url("/icons/assets/lyflineHeart.svg")',
            WebkitMaskImage: 'url("/icons/assets/lyflineHeart.svg")',
          }}
          className="absolute bottom-0 right-0 size-20 md:size-[120px] pointer-events-none select-none opacity-10 bg-red-600/50 mask-contain mask-no-repeat mask-center shrink-0"
          aria-hidden="true"
        />

        <span
          style={{
            maskImage: 'url("/icons/assets/lyflineQuarterCircle.svg")',
            WebkitMaskImage: 'url("/icons/assets/lyflineQuarterCircle.svg")',
          }}
          className="mt-20 absolute top-0 left-0 size-[100px] pointer-events-none select-none opacity-10 bg-red-600/50 mask-contain mask-no-repeat mask-center shrink-0"
          aria-hidden="true"
        />

      </main>

      <Footer />
    </div>
  );
}
