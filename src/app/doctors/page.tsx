"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";
import Image from "next/image";
import InputBox from "@/components/inputbox";
import Dropdown from "@/components/Dropdown";
import { DoctorCard } from "@/components/card/DoctorCard";
import { DoctorModals } from "@/components/card/DoctorModals";
import { Doctor, DOCTORS } from "@/data/mockData";

// ─── Animation Variants ───────────────────────────────────────────────────────

// Hero banner: rises from below on page load
const bannerVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

// Doctor illustration: same rise-from-below as the banner (unified entrance)
const illustrationVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

// Filter label: slides from left
const filterLabelVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

// Filter dropdowns: stagger up from below
const filterContainerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const filterItemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// Results status label: simple fade
const resultsLabelVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

// Doctor cards: stagger scale-up from below
const cardGridVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const cardItemVariants = {
  hidden: { opacity: 0, y: 35, scale: 0.96 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] },
  },
};

// Pagination: fades + slides up
const paginationVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// ─────────────────────────────────────────────────────────────────────────────

export default function DoctorsPage() {
  const [searchVal, setSearchVal] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    region: "",
    hospital: "",
    specialty: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Exactly 9 dummy data items to demonstrate pagination (8 per page)
  const DUMMY_DOCTORS = useMemo(() => {
    return DOCTORS.slice(0, 9);
  }, []);

  // Filter options dynamically extracted from the dummy doctor list
  const regionOptions = useMemo(() => {
    const uniqueRegions = Array.from(new Set(DUMMY_DOCTORS.map((d) => d.region))).sort();
    return [
      { value: "", label: "Pick a Region" },
      ...uniqueRegions.map((r) => ({ value: r, label: r })),
    ];
  }, [DUMMY_DOCTORS]);

  const hospitalOptions = useMemo(() => {
    const uniqueHospitals = Array.from(new Set(DUMMY_DOCTORS.map((d) => d.hospital))).sort();
    return [
      { value: "", label: "Pick a Hospital" },
      ...uniqueHospitals.map((h) => ({ value: h, label: h })),
    ];
  }, [DUMMY_DOCTORS]);

  const specialtyOptions = useMemo(() => {
    const uniqueSpecialties = Array.from(new Set(DUMMY_DOCTORS.map((d) => d.specialty))).sort();
    return [
      { value: "", label: "Pick a Specialty" },
      ...uniqueSpecialties.map((s) => ({ value: s, label: s })),
    ];
  }, [DUMMY_DOCTORS]);

  const handleSearch = () => {
    setSearchQuery(searchVal);
    setCurrentPage(1);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleFilterChange = (key: "region" | "hospital" | "specialty", val: string) => {
    setFilters((prev) => ({ ...prev, [key]: val }));
    setCurrentPage(1);
  };

  // Filtered doctors list based on search and selected options
  const filteredDoctors = useMemo(() => {
    return DUMMY_DOCTORS.filter((doc) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.specialty.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRegion = filters.region === "" || doc.region === filters.region;
      const matchesHospital = filters.hospital === "" || doc.hospital === filters.hospital;
      const matchesSpecialty = filters.specialty === "" || doc.specialty === filters.specialty;

      return matchesSearch && matchesRegion && matchesHospital && matchesSpecialty;
    });
  }, [DUMMY_DOCTORS, searchQuery, filters]);

  // Pagination bounds (8 doctors per page)
  const doctorsPerPage = 8;
  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage) || 1;

  const paginatedDoctors = useMemo(() => {
    const startIndex = (currentPage - 1) * doctorsPerPage;
    return filteredDoctors.slice(startIndex, startIndex + doctorsPerPage);
  }, [filteredDoctors, currentPage]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <NavBar />

      <main className="grow pt-[80px] w-full flex flex-col justify-start items-center relative overflow-x-hidden">
        {/* Main centered container */}
        <section className="w-full max-w-[1440px] px-6 md:px-16 lg:px-24 xl:px-36 py-16 relative bg-white flex flex-col justify-start items-start gap-8 overflow-hidden">

          {/* ── Banner segment with search layout: rises from below ── */}
          <div className="self-stretch flex flex-col justify-start items-start gap-4 relative z-20 w-full">
            <motion.div
              className="w-full p-6 md:p-6 bg-gradient-to-r from-[#3F71B7] to-[#254F8A] rounded-[32px] flex flex-col justify-start items-start gap-8 shadow-sm relative"
              variants={bannerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Banner header text */}
              <div className="self-stretch inline-flex justify-between items-end relative z-10">
                <div className="flex-1 inline-flex flex-col justify-start items-start gap-1">
                  <div className="justify-start text-indigo-200 text-sm font-poppins tracking-wider">OUR DOCTORS</div>
                  <h1 className="justify-start text-white text-3xl font-semibold font-sans">Wide Range of Medical Specialists</h1>
                </div>
              </div>

              {/* Search bar */}
              <div className="w-full flex flex-col md:flex-row justify-start items-stretch md:items-end gap-3 relative z-10">
                <InputBox
                  label={<span className="text-white text-sm font-normal font-poppins">Search Doctor Name</span>}
                  placeholder="Dr. Abraham.."
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  onKeyDown={handleKeyPress}
                  containerClassName="w-full xl:w-[466px]"
                />
                <Button
                  variant="outline-white"
                  text="Search"
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
                  src="/Illustration/DoctorIllustration.png"
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
                FILTER DOCTOR
              </motion.span>

              <motion.div
                className="self-stretch grid grid-cols-1 lg:grid-cols-3 gap-6 w-full mt-2"
                variants={filterContainerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={filterItemVariants}>
                  <Dropdown
                    label="Region"
                    placeholder="Pick a Region"
                    options={regionOptions}
                    value={filters.region}
                    onChange={(val) => handleFilterChange("region", val)}
                    containerClassName="w-full"
                  />
                </motion.div>
                <motion.div variants={filterItemVariants}>
                  <Dropdown
                    label="Hospital Name"
                    placeholder="Pick a Hospital"
                    options={hospitalOptions}
                    value={filters.hospital}
                    onChange={(val) => handleFilterChange("hospital", val)}
                    containerClassName="w-full"
                  />
                </motion.div>
                <motion.div variants={filterItemVariants}>
                  <Dropdown
                    label="Specialty"
                    placeholder="Pick a Specialty"
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
                  Showing results for{" "}
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
                "Showing All Doctors"
              )}
            </motion.div>

            {/* Doctor cards grid: stagger scale-up */}
            <AnimatePresence mode="wait">
              {paginatedDoctors.length > 0 ? (
                <motion.div
                  key={`page-${currentPage}-${searchQuery}-${filters.region}-${filters.hospital}-${filters.specialty}`}
                  className="w-full flex flex-wrap justify-center xl:grid xl:grid-cols-4 gap-6 justify-items-center"
                  variants={cardGridVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                >
                  {paginatedDoctors.map((doc) => (
                    <motion.div key={doc.id} variants={cardItemVariants} className="w-full max-w-[270px] flex justify-center">
                      <DoctorCard
                        name={doc.name}
                        specialty={doc.specialty}
                        hospital={doc.hospital}
                        imageUrl={doc.imageUrl}
                        onViewDetails={() => {
                          setSelectedDoctor(doc);
                          setIsModalOpen(true);
                        }}
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
                  No doctors match your search or filters.
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Pagination Controls: fades + slides up ── */}
            {totalPages > 1 && (
              <motion.div
                className="self-stretch grid grid-cols-2 sm:flex sm:justify-between items-center gap-6 sm:gap-0 mt-6 w-full"
                variants={paginationVariants}
                initial="hidden"
                animate="visible"
              >
                {/* Previous Button */}
                <Button
                  variant="outline-primary"
                  text="Previous"
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
                  text="Next"
                  rightIcon="Right 1"
                  className="w-full sm:w-32 h-12 px-4 py-3 font-poppins text-base font-semibold order-3 sm:order-3 justify-self-end"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                />
              </motion.div>
            )}
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
