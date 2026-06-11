"use client";

import React, { useState, useMemo } from "react";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";
import InputBox from "@/components/inputbox";
import { ArticleCard } from "@/components/card/ArticleCard";
import { type BadgeVariant } from "@/components/Badge";
import { useLanguage } from "@/context/LanguageContext";
import { ALL_ARTICLES } from "@/data/articlesData";

const CATEGORIES = ["All Category", "Cardiology", "Preventive Care", "Lifestyle", "Nutrition"];

export default function ArticlesPage() {
  const { lang } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedSearchQuery, setAppliedSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Category");
  const [currentPage, setCurrentPage] = useState(1);

  const articlesPerPage = 9;

  // Filter articles based on category and search query
  const filteredArticles = useMemo(() => {
    return ALL_ARTICLES.filter((article) => {
      const matchesCategory =
        selectedCategory === "All Category" || article.category === selectedCategory;
      const matchesSearch = article.title
        .toLowerCase()
        .includes(appliedSearchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, appliedSearchQuery]);

  // Paginated articles
  const paginatedArticles = useMemo(() => {
    const startIndex = (currentPage - 1) * articlesPerPage;
    return filteredArticles.slice(startIndex, startIndex + articlesPerPage);
  }, [filteredArticles, currentPage]);

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

      <main className="flex-grow pt-[80px] w-full flex flex-col justify-start items-center">

        {/* Main Section */}
        <section className="w-full max-w-[1440px] px-6 md:px-36 py-16 relative bg-white flex flex-col justify-start items-start gap-8 overflow-hidden">

          <div className="self-stretch flex flex-col justify-start items-start gap-8">

            {/* Header */}
            <div className="self-stretch flex flex-col justify-start items-start gap-1">
              <div>
                <span className="text-primary/50 text-sm font-medium font-poppins">ARTICLES</span>
                <span className="text-primary/50 text-sm font-normal font-poppins">
                  {" "}
                  - Stay updated with the latest in medical care here!
                </span>
              </div>
              <h1 className="justify-start text-primary text-3xl font-semibold font-poppins">
                Healthcare Daily
              </h1>
            </div>

            {/* Search segment */}
            <div className="w-full flex flex-col md:flex-row justify-start items-end gap-3">
              <InputBox
                label={
                  <span className="text-red-600 text-base font-normal font-poppins">
                    Look for an Article
                  </span>
                }
                placeholder="Tips untuk.."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyPress}
                containerClassName="w-full md:w-[466px]"
              />
              <Button
                variant="outline-primary"
                text="Search"
                leftIcon="Search 1"
                className="h-12 px-4 py-3 font-poppins text-base font-semibold"
                onClick={handleSearch}
              />
            </div>

            {/* Separator */}
            <hr className="w-full border-t border-gray-200 my-2" />

            {/* Categories segment */}
            <div className="self-stretch flex flex-wrap justify-center items-center gap-3">
              {CATEGORIES.map((category) => {
                const isSelected = selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-3 py-2 text-sm font-semibold font-poppins transition-all cursor-pointer ${isSelected
                      ? "bg-red-600 rounded-[100px] text-white"
                      : "rounded-[48px] text-black hover:bg-slate-100"
                      }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

          </div>

          {/* Cards & Pagination */}
          <div className="self-stretch flex flex-col justify-center items-center gap-6 mt-4">

            <div className="self-stretch text-center justify-start text-primary/50 text-sm font-normal font-poppins">
              Showing Newest
            </div>

            {/* Grid Container */}
            {paginatedArticles.length > 0 ? (
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                {paginatedArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    title={article.title}
                    date={article.date}
                    category={article.category}
                    categoryVariant={article.categoryVariant}
                    imageUrl={article.imageUrl}
                    href={`/articles/${article.id}`}
                  />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-slate-400 font-poppins text-base">
                No articles match your search.
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="self-stretch flex justify-between items-center mt-6">

                {/* Previous Button */}
                <Button
                  variant="outline-primary"
                  text="Previous"
                  leftIcon="Left 1"
                  className="w-32 h-12 px-4 py-3 font-poppins text-base font-semibold"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                />

                {/* Page numbers */}
                <div className="flex justify-start items-center gap-4">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    const isCurrent = currentPage === page;
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`size-8 rounded-lg flex items-center justify-center text-base font-semibold font-poppins transition-all cursor-pointer ${isCurrent
                          ? "bg-gradient-to-r from-[#3F71B7] to-[#3365AC] text-white outline outline-1 outline-offset-[-1px] outline-slate-500"
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
                  text="Next"
                  rightIcon="Right 1"
                  className="w-32 h-12 px-4 py-3 font-poppins text-base font-semibold"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                />

              </div>
            )}

          </div>

        </section>

      </main>

      <Footer />
    </div>
  );
}
