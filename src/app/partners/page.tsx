"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";
import { PartnerCard } from "@/components/card/PartnerCard";
import { fetchPartners } from "@/api/partners";
import { type Partner } from "@/data/partnersData";

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

export default function PartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedCountry, setSelectedCountry] = useState("All Country");
  const [currentPage, setCurrentPage] = useState(1);
  const [partnersPerPage, setPartnersPerPage] = useState(8);

  useEffect(() => {
    let active = true;
    fetchPartners()
      .then((data) => {
        if (active) {
          setPartners(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error fetching partners:", err);
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
      if (width < 760) {
        setPartnersPerPage(10);
      } else if (width < 1024) {
        setPartnersPerPage(9);
      } else {
        setPartnersPerPage(8);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Compute dynamic countries list from fetched partners
  const countriesList = useMemo(() => {
    const list = ["All Country"];
    partners.forEach((p) => {
      if (p.country && !list.includes(p.country)) {
        list.push(p.country);
      }
    });
    return list;
  }, [partners]);

  // Filter partners based on country
  const filteredPartners = useMemo(() => {
    return partners.filter((partner) => {
      return selectedCountry === "All Country" || partner.country === selectedCountry;
    });
  }, [partners, selectedCountry]);

  const totalPages = Math.ceil(filteredPartners.length / partnersPerPage) || 1;
  const activePage = Math.min(currentPage, totalPages);

  // Paginated partners
  const paginatedPartners = useMemo(() => {
    const startIndex = (activePage - 1) * partnersPerPage;
    return filteredPartners.slice(startIndex, startIndex + partnersPerPage);
  }, [filteredPartners, activePage, partnersPerPage]);

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <NavBar />

      <main className="grow pt-[80px] w-full flex flex-col justify-start items-center relative overflow-x-hidden">

        <section className="w-full max-w-[1440px] px-6 md:px-16 lg:px-24 xl:px-36 py-16 relative bg-white flex flex-col justify-start items-start gap-8 overflow-hidden">

          <div className="self-stretch flex flex-col justify-start items-start gap-8">

            {/* Header */}
            <div className="self-stretch flex flex-col justify-start items-start gap-1">
              <div>
                <span className="text-primary/50 text-sm font-poppins">OUR PARTNERS</span>
              </div>
              <div className="self-stretch inline-flex justify-start items-center gap-3">
                <span
                  style={{
                    maskImage: 'url("/icons/assets/lyflineHeart.svg")',
                    WebkitMaskImage: 'url("/icons/assets/lyflineHeart.svg")',
                  }}
                  className="size-6 bg-primary mask-contain mask-no-repeat mask-center shrink-0"
                  aria-hidden="true"
                />
                <h1 className="justify-start text-primary text-3xl font-semibold font-poppins">
                  Well Reputable and Accredited Partners
                </h1>
              </div>
            </div>

            {/* Country Tabs */}
            <div className="self-stretch flex flex-wrap justify-center items-center gap-3">
              {countriesList.map((country) => {
                const isSelected = selectedCountry === country;
                return (
                  <button
                    key={country}
                    onClick={() => handleCountryChange(country)}
                    className={`px-3 py-2 text-sm font-medium font-poppins transition-all cursor-pointer ${isSelected
                      ? "bg-red-600 rounded-[100px] text-white"
                      : "rounded-[48px] text-black hover:text-red-600"
                      }`}
                  >
                    {country}
                  </button>
                );
              })}
            </div>

          </div>

          {/* Separator line */}
          <hr className="w-full border-t border-gray-200" />

          {/* Partner Cards Grid */}
          <div className="self-stretch flex flex-col justify-center items-center gap-8">
            <div className="self-stretch text-center justify-start text-primary/50 text-sm font-normal font-poppins">
              Showing {selectedCountry === "All Country" ? "All" : selectedCountry} Partner
            </div>

            <AnimatePresence mode="wait">
              {loading ? (
                <div className="w-full flex flex-wrap justify-center xl:grid xl:grid-cols-4 gap-6 justify-items-center">
                  {Array.from({ length: partnersPerPage }).map((_, i) => (
                    <div
                      key={`skeleton-${i}`}
                      className="w-full min-w-[254px] max-w-[288px] h-64 bg-slate-50 border border-slate-100 rounded-[32px] animate-pulse"
                    />
                  ))}
                </div>
              ) : error ? (
                <div className="py-12 text-center text-red-500 font-poppins text-base w-full">
                  Failed to load partners: {error}
                </div>
              ) : paginatedPartners.length > 0 ? (
                <motion.div
                  key={`${selectedCountry}-${activePage}`}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="w-full flex flex-wrap justify-center xl:grid xl:grid-cols-4 gap-6 justify-items-center"
                >
                  {paginatedPartners.map((partner) => (
                    <motion.div
                      key={partner.id}
                      variants={cardVariants}
                      className="w-full min-w-[254px] max-w-[288px]"
                    >
                      <PartnerCard
                        name={partner.name}
                        location={partner.location}
                        phone={partner.phone}
                        email={partner.email}
                        logoUrl={partner.logoUrl}
                        href={`/partners/${partner.id}`}
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
                  No partners found in this country.
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="self-stretch grid grid-cols-2 sm:flex sm:justify-between items-center gap-6 sm:gap-0 mt-6">

                {/* Previous Button */}
                <Button
                  variant="outline-primary"
                  text="Previous"
                  leftIcon="Left 1"
                  className="w-full sm:w-32 h-12 px-4 py-3 font-poppins text-base font-semibold order-2 sm:order-1 justify-self-start"
                  disabled={activePage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                />

                {/* Page numbers */}
                <div className="col-span-2 order-1 sm:order-2 justify-self-center flex justify-center items-center gap-4">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    const isCurrent = activePage === page;
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
                  text="Next"
                  rightIcon="Right 1"
                  className="w-full sm:w-32 h-12 px-4 py-3 font-poppins text-base font-semibold order-3 sm:order-3 justify-self-end"
                  disabled={activePage === totalPages}
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
