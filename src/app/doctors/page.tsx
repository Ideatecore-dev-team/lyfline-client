"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";
import { Pagination } from "@/components/Pagination";
import Image from "next/image";
import InputBox from "@/components/inputbox";
import Dropdown from "@/components/Dropdown";
import { DoctorCard } from "@/components/card/DoctorCard";
import { DoctorModals } from "@/components/card/DoctorModals";
import { type Doctor } from "@/data/doctorsData";
import { fetchDoctors, type PaginatedDoctorsResponse } from "@/api/doctors";
import { fetchPartners } from "@/api/partners";
import { type Partner } from "@/data/partnersData";
import { useLanguage } from "@/context/LanguageContext";
import { slugify } from "@/lib/utils";

// ─── Animation Variants ───────────────────────────────────────────────────────

// Hero banner: rises from below on page load
const bannerVariants: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

// Doctor illustration: same rise-from-below as the banner (unified entrance)
const illustrationVariants: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

// Filter label: slides from left
const filterLabelVariants: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

// Filter dropdowns: stagger up from below
const filterContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const filterItemVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// Results status label: simple fade
const resultsLabelVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

// Doctor cards: stagger scale-up from below
const cardGridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const cardItemVariants: Variants = {
  hidden: { opacity: 0, y: 35, scale: 0.96 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] },
  },
};

// Pagination: fades + slides up
const paginationVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// ─────────────────────────────────────────────────────────────────────────────

export default function DoctorsPage() {
  const { lang } = useLanguage();
  const [searchVal, setSearchVal] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    region: "",
    hospital: "",
    specialty: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const doctorsPerPage = 8;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allDoctorsForOptions, setAllDoctorsForOptions] = useState<Doctor[]>([]);
  const [allPartnersForOptions, setAllPartnersForOptions] = useState<Partner[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch full doctors and partners list once just for populating filter options
  useEffect(() => {
    Promise.all([fetchDoctors(), fetchPartners()])
      .then(([docsData, partnersData]) => {
        if (Array.isArray(docsData)) {
          setAllDoctorsForOptions(docsData);
        }
        if (Array.isArray(partnersData)) {
          setAllPartnersForOptions(partnersData);
        }
      })
      .catch((err) => console.error("Error fetching doctor filter options:", err));
  }, []);

  // Fetch paginated doctors on page/filter change
  useEffect(() => {
    let active = true;
    fetchDoctors({
      page: currentPage,
      limit: doctorsPerPage,
      search: searchQuery,
      region: filters.region,
      hospital: filters.hospital,
      specialty: filters.specialty,
    })
      .then((res) => {
        if (active) {
          if (Array.isArray(res)) {
            setDoctors(res);
            setTotalPages(1);
          } else {
            const paginated = res as PaginatedDoctorsResponse;
            setDoctors(paginated.data || []);
            setTotalPages(paginated.meta?.totalPages || 1);
          }
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error fetching doctors:", err);
        if (active) {
          setError(err.message);
          setLoading(false);
        }
      });
    return () => { active = false; };
  }, [currentPage, searchQuery, filters]);

  // Filter options dynamically extracted from live doctor & partner list
  const countryOptions = useMemo(() => {
    const fromPartners = allPartnersForOptions.map((p) => p.country).filter((c): c is string => Boolean(c));
    const fromDoctors = allDoctorsForOptions.map((d) => d.region).filter((r): r is string => Boolean(r));
    const unique = Array.from(new Set([...fromPartners, ...fromDoctors])).sort();
    return [
      { value: "", label: lang === "en" ? "All Country" : "Semua Negara" },
      ...unique.map((r) => ({ value: r, label: r })),
    ];
  }, [allPartnersForOptions, allDoctorsForOptions, lang]);

  const hospitalOptions = useMemo(() => {
    const fromPartners = allPartnersForOptions.map((p) => p.name).filter((h): h is string => Boolean(h));
    const fromDoctors = allDoctorsForOptions.map((d) => d.hospital).filter((h): h is string => Boolean(h));
    const unique = Array.from(new Set([...fromPartners, ...fromDoctors])).sort();
    return [
      { value: "", label: lang === "en" ? "All Hospital" : "Semua Rumah Sakit" },
      ...unique.map((h) => ({ value: h, label: h })),
    ];
  }, [allPartnersForOptions, allDoctorsForOptions, lang]);

  const specialtyOptions = useMemo(() => {
    const all = allDoctorsForOptions.flatMap((d) => d.specialty || []).filter((s): s is string => Boolean(s));
    const unique = Array.from(new Set(all)).sort();
    return [
      { value: "", label: lang === "en" ? "All Specialty" : "Semua Spesialisasi" },
      ...unique.map((s) => ({ value: s, label: s })),
    ];
  }, [allDoctorsForOptions, lang]);

  const handleSearch = () => {
    setLoading(true);
    setSearchQuery(searchVal);
    setCurrentPage(1);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleFilterChange = (key: "region" | "hospital" | "specialty", val: string) => {
    setLoading(true);
    setFilters((prev) => ({ ...prev, [key]: val }));
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <NavBar />

      <main className="grow pt-[80px] w-full flex flex-col justify-start items-center relative overflow-x-hidden">
        {/* Main centered container */}
        <section className="w-full max-w-[1440px] px-6 md:px-16 lg:px-24 xl:px-36 py-16 relative bg-white flex flex-col justify-start items-start gap-8 overflow-hidden">

          {/* ── Banner segment with search layout: rises from below ── */}
          <div className="self-stretch flex flex-col justify-start items-start gap-4 relative z-20 w-full">
            <motion.div
              className="w-full p-6 md:p-6 bg-linear-to-r from-primary to-[#254F8A] rounded-[32px] flex flex-col justify-start items-start gap-8 shadow-sm relative"
              variants={bannerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Banner header text */}
              <div className="self-stretch inline-flex justify-between items-end relative z-10">
                <div className="flex-1 inline-flex flex-col justify-start items-start gap-1">
                  <div className="justify-start text-indigo-200 text-sm font-poppins tracking-wider">
                    {lang === "en" ? "OUR DOCTORS" : "DOKTER KAMI"}
                  </div>
                  <h1 className="justify-start text-white text-3xl font-semibold font-sans">
                    {lang === "en" ? "Match with The Right Specialists" : "Cocokkan dengan Spesialis yang Tepat"}
                  </h1>
                </div>
              </div>

              {/* Search bar */}
              <div className="w-full flex flex-col md:flex-row justify-start items-stretch md:items-end gap-3 relative z-10">
                <InputBox
                  label={<span className="text-white text-sm font-normal font-poppins">{lang === "en" ? "Search Doctor Name" : "Cari Nama Dokter"}</span>}
                  placeholder={lang === "en" ? "Dr. Abraham.." : "Dr. Abraham.."}
                  value={searchVal}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSearchVal(val);
                    if (val === "" && searchQuery !== "") {
                      setSearchQuery("");
                      setCurrentPage(1);
                    }
                  }}
                  onKeyDown={handleKeyPress}
                  containerClassName="w-full xl:w-[466px]"
                />
                <Button
                  variant="outline-white"
                  text={lang === "en" ? "Search" : "Cari"}
                  leftIcon="Search 1"
                  className="w-full md:w-auto h-12 px-6 font-poppins text-base font-semibold"
                  onClick={handleSearch}
                />
              </div>

              {/* Doctor Illustration: slides from right */}
              <motion.div
                className="hidden xl:block absolute bottom-[-1] right-8 ml-6 w-[406px] h-[258px] pointer-events-none z-0"
                variants={illustrationVariants}
                initial="hidden"
                animate="visible"
              >
                <Image
                  src="/Illustration/DoctorIllustration.webp"
                  alt="Doctor Illustration"
                  width={406}
                  height={258}
                  className="object-contain object-bottom"
                />
              </motion.div>
            </motion.div>

            {/* ── Filter segments: label slides from left, dropdowns stagger up ── */}
            <div className="self-stretch flex flex-col justify-start items-start gap-2 mt-4 w-full">
              <motion.span
                className="text-primary/50 text-sm font-poppins tracking-wider"
                variants={filterLabelVariants}
                initial="hidden"
                animate="visible"
              >
                {lang === "en" ? "FILTER DOCTOR" : "FILTER DOKTER"}
              </motion.span>

              <motion.div
                className="self-stretch grid grid-cols-1 lg:grid-cols-3 gap-6 w-full mt-2"
                variants={filterContainerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={filterItemVariants}>
                  <Dropdown
                    label={lang === "en" ? "Country" : "Negara"}
                    placeholder={lang === "en" ? "All Country" : "Semua Negara"}
                    options={countryOptions}
                    value={filters.region}
                    onChange={(val) => handleFilterChange("region", val)}
                    containerClassName="w-full"
                  />
                </motion.div>
                <motion.div variants={filterItemVariants}>
                  <Dropdown
                    label={lang === "en" ? "Hospital Name" : "Nama Rumah Sakit"}
                    placeholder={lang === "en" ? "All Hospital" : "Semua Rumah Sakit"}
                    options={hospitalOptions}
                    value={filters.hospital}
                    onChange={(val) => handleFilterChange("hospital", val)}
                    containerClassName="w-full"
                  />
                </motion.div>
                <motion.div variants={filterItemVariants}>
                  <Dropdown
                    label={lang === "en" ? "Specialty" : "Spesialisasi"}
                    placeholder={lang === "en" ? "All Specialty" : "Semua Spesialisasi"}
                    options={specialtyOptions}
                    value={filters.specialty}
                    onChange={(val) => handleFilterChange("specialty", val)}
                    containerClassName="w-full"
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Divider line */}
          <hr className="w-full border-t border-gray-200 my-4 z-10" />

          {/* ── Results grid and pagination ── */}
          <div className="w-full flex flex-col justify-start items-start gap-6 relative z-10">

            {/* Results status label: fades in */}
            <motion.div
              className="self-stretch text-center justify-start text-primary/50 text-sm font-normal font-poppins"
              variants={resultsLabelVariants}
              initial="hidden"
              animate="visible"
              key={`${searchQuery}-${filters.region}-${filters.hospital}-${filters.specialty}`}
            >
              {searchQuery || filters.region || filters.hospital || filters.specialty ? (
                <span>
                  {lang === "en" ? "Showing results for " : "Menampilkan hasil untuk "}
                  <span className="">
                    {[
                      searchQuery ? `"${searchQuery}"` : "",
                      filters.specialty,
                      filters.hospital,
                      filters.region,
                    ]
                      .filter(Boolean)
                      .join(" - ")}
                  </span>
                </span>
              ) : (
                lang === "en" ? "Showing All Doctors" : "Menampilkan Semua Dokter"
              )}
            </motion.div>

            {/* Doctor cards grid: stagger scale-up */}
            <AnimatePresence mode="wait">
              {loading ? (
                <div className="w-full flex flex-wrap justify-center xl:grid xl:grid-cols-4 gap-6 justify-items-center">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <DoctorCard key={`skeleton-${i}`} isLoading={true} />
                  ))}
                </div>
              ) : error ? (
                <div className="py-12 text-center text-red-500 font-poppins text-base w-full">
                  {lang === "en" ? "Failed to load doctors: " : "Gagal memuat data dokter: "}{error}
                </div>
              ) : doctors.length > 0 ? (
                <motion.div
                  key={`page-${currentPage}-${searchQuery}-${filters.region}-${filters.hospital}-${filters.specialty}`}
                  className="w-full flex flex-wrap justify-center xl:grid xl:grid-cols-4 gap-6 justify-items-center"
                  variants={cardGridVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                >
                  {doctors.map((doc) => (
                    <motion.div key={doc.id} variants={cardItemVariants} className="w-full max-w-[270px] flex justify-center">
                      <DoctorCard
                        name={doc.name}
                        title={doc.title}
                        hospital={doc.hospital}
                        imageUrl={doc.imageUrl}
                        href={`/doctors/${slugify(doc.name)}-${doc.id}`}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  className="py-12 text-center text-slate-400 font-poppins text-base w-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {lang === "en" ? "No doctors match your search or filters." : "Tidak ada dokter yang cocok dengan pencarian atau filter Anda."}
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Pagination Controls: fades + slides up ── */}
            <motion.div
              className="w-full"
              variants={paginationVariants}
              initial="hidden"
              animate="visible"
            >
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                lang={lang}
              />
            </motion.div>
          </div>

          <DoctorModals
            isOpen={isModalOpen}
            doctor={selectedDoctor}
            onClose={() => setIsModalOpen(false)}
          />

        </section>

        {/* Decorative Brand Watermarks */}
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
