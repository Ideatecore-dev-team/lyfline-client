"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";
import { Pagination } from "@/components/Pagination";
import InputBox from "@/components/inputbox";
import { ArticleCard } from "@/components/card/ArticleCard";
import { fetchArticles, fetchArticleCategories, type PaginatedArticlesResponse } from "@/api/articles";
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
  const [categoriesList, setCategoriesList] = useState<string[]>(["All Categories"]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [articlesPerPage, setArticlesPerPage] = useState(9);
  const [isMobileSearch, setIsMobileSearch] = useState(false);

  // Fetch unique categories once
  useEffect(() => {
    fetchArticleCategories()
      .then((cats) => {
        setCategoriesList(["All Categories", ...cats]);
      })
      .catch((err) => console.error("Failed to load categories:", err));
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

  // Fetch paginated articles whenever filter or page parameters change
  useEffect(() => {
    let active = true;
    fetchArticles({
      page: currentPage,
      limit: articlesPerPage,
      search: appliedSearchQuery,
      category: selectedCategory,
    })
      .then((res) => {
        if (active) {
          if (Array.isArray(res)) {
            setArticles(res);
            setTotalPages(1);
          } else {
            const paginatedRes = res as PaginatedArticlesResponse;
            setArticles(paginatedRes.data || []);
            setTotalPages(paginatedRes.meta?.totalPages || 1);
          }
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
  }, [currentPage, articlesPerPage, appliedSearchQuery, selectedCategory]);

  const handleSearch = () => {
    setLoading(true);
    setAppliedSearchQuery(searchQuery);
    setCurrentPage(1);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleCategoryChange = (category: string) => {
    setLoading(true);
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <NavBar />

      <main className="grow pt-20 w-full flex flex-col justify-start items-center relative overflow-x-hidden">

        {/* Main Section */}
        <section className="w-full max-w-360 px-6 md:px-16 lg:px-24 xl:px-36 py-16 relative bg-white flex flex-col justify-start items-start gap-8">

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
                    <div key={`skeleton-${i}`} className="w-full max-w-[384px] bg-white rounded-4xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col justify-start items-start overflow-hidden animate-pulse">
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
              ) : articles.length > 0 ? (
                <motion.div
                  key={`${selectedCategory}-${appliedSearchQuery}-${currentPage}`}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="w-full flex flex-wrap justify-center xl:grid xl:grid-cols-3 gap-8 justify-items-center"
                >
                  {articles.map((article) => (
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
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              lang={lang}
            />

          </div>

        </section>

        {/* Decorative Brand Watermark */}
        <span
          style={{
            maskImage: 'url("/icons/assets/lyflineHeart.svg")',
            WebkitMaskImage: 'url("/icons/assets/lyflineHeart.svg")',
          }}
          className="absolute bottom-0 right-0 size-20 md:size-30 pointer-events-none select-none opacity-10 bg-red-600/50 mask-contain mask-no-repeat mask-center shrink-0"
          aria-hidden="true"
        />

        <span
          style={{
            maskImage: 'url("/icons/assets/lyflineQuarterCircle.svg")',
            WebkitMaskImage: 'url("/icons/assets/lyflineQuarterCircle.svg")',
          }}
          className="mt-20 absolute top-0 left-0 size-25 pointer-events-none select-none opacity-10 bg-red-600/50 mask-contain mask-no-repeat mask-center shrink-0"
          aria-hidden="true"
        />

      </main>

      <Footer />
    </div>
  );
}
