"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { Header } from "@/sections/Header";
import { DOCTORS } from "@/data/mockData";

// Dynamic imports for best bundle sizes and performance
const DoctorsHeroSection = dynamic(
  () => import("@/sections/DoctorsHeroSection").then((m) => m.DoctorsHeroSection),
  { ssr: true }
);

const DoctorsFilterSection = dynamic(
  () => import("@/sections/DoctorsFilterSection").then((m) => m.DoctorsFilterSection),
  { ssr: true }
);

const DoctorsGridSection = dynamic(
  () => import("@/sections/DoctorsGridSection").then((m) => m.DoctorsGridSection),
  { ssr: true }
);

const Pagination = dynamic(
  () => import("@/components/Pagination").then((m) => m.Pagination),
  { ssr: true }
);

const CtaSection = dynamic(
  () => import("@/sections/CtaSection").then((m) => m.CtaSection),
  { ssr: true }
);

const Footer = dynamic(
  () => import("@/sections/Footer").then((m) => m.Footer),
  { ssr: true }
);

export default function DoctorsPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filters, setFilters] = React.useState({
    region: "",
    hospital: "",
    specialty: "",
  });
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);

  // Filter logic
  const filteredDoctors = React.useMemo(() => {
    return DOCTORS.filter((doc) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.specialty.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRegion =
        filters.region === "" || doc.region === filters.region;

      const matchesHospital =
        filters.hospital === "" || doc.hospital === filters.hospital;

      const matchesSpecialty =
        filters.specialty === "" || doc.specialty === filters.specialty;

      return matchesSearch && matchesRegion && matchesHospital && matchesSpecialty;
    });
  }, [searchQuery, filters]);

  // Show loading skeleton whenever search query or filter criteria change
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 350);
    return () => clearTimeout(timer);
  }, [searchQuery, filters]);

  // Pagination bounds
  const totalPages = Math.ceil(filteredDoctors.length / 8);
  const pagedDoctors = React.useMemo(() => {
    const start = (currentPage - 1) * 8;
    return filteredDoctors.slice(start, start + 8);
  }, [filteredDoctors, currentPage]);

  const handleFilterChange = (
    key: "region" | "hospital" | "specialty",
    value: string
  ) => {
    setIsLoading(true);
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleSearchSubmit = (val: string) => {
    setIsLoading(true);
    setSearchQuery(val);
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Sticky Header */}
      <Header />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* Banner Section */}
        <DoctorsHeroSection
          initialSearch={searchQuery}
          onSearchSubmit={handleSearchSubmit}
        />

        {/* Filter Section */}
        <DoctorsFilterSection
          filters={filters}
          onFilterChange={handleFilterChange}
        />

        {/* Results Grid Section */}
        <DoctorsGridSection
          doctors={pagedDoctors}
          totalCount={filteredDoctors.length}
          isLoading={isLoading}
          currentPage={currentPage}
        />

        {/* Dynamic Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

        {/* Contact/Appointment CTA */}
        <CtaSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
