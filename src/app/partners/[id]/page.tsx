"use client";

import React, { use, useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";
import { motion, AnimatePresence } from "framer-motion";
import { fetchDoctors } from "@/api/doctors";
import { type Doctor } from "@/data/doctorsData";
import { DoctorCard } from "@/components/card/DoctorCard";
import GooglaMapsPreviewModal from "@/components/googleMapsPreview";
import { NoiseTexture } from "@/components/magicui/NoiseTexture";
import { fetchPartnerById } from "@/api/partners";
import { type Partner } from "@/data/partnersData";

interface PageProps {
  params: Promise<{ id: string }>;
}

const getFlagUrl = (country: string) => {
  switch (country.toLowerCase()) {
    case "indonesia":
      return "/Flags/ID - Indonesia.svg";
    case "india":
      return "/Flags/IN - India.svg";
    case "korea":
    case "south korea":
      return "/Flags/KR - Korea (South).svg";
    case "malaysia":
      return "/Flags/MY - Malaysia.svg";
    case "thailand":
      return "/Flags/TH - Thailand.svg";
    default:
      return null;
  }
};

const FALLBACK_PARTNER_IMAGES = [
  "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80"
];

export default function PartnerDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const [partner, setPartner] = useState<Partner | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [doctorsLoading, setDoctorsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    fetchPartnerById(id)
      .then((data) => {
        if (active) {
          setPartner(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error fetching partner details:", err);
        if (active) {
          setError(err.message || "Partner not found");
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, [id]);

  // Fetch doctors for this hospital by hospital_id
  useEffect(() => {
    let active = true;
    setDoctorsLoading(true);
    fetchDoctors({ hospital_id: id })
      .then((data) => {
        if (active) {
          setDoctors(data);
          setDoctorsLoading(false);
        }
      })
      .catch(() => {
        if (active) setDoctorsLoading(false);
      });
    return () => { active = false; };
  }, [id]);

  const partnerImages = useMemo(() => {
    if (partner && partner.images && partner.images.length > 0) {
      return partner.images;
    }
    return FALLBACK_PARTNER_IMAGES;
  }, [partner]);

  useEffect(() => {
    if (partnerImages.length <= 1) return;

    const interval = setInterval(() => {
      setActiveImageIdx((prev) => (prev + 1) % partnerImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [partnerImages]);

  const flagUrl = partner ? getFlagUrl(partner.country) : null;


  return (
    <div className="flex flex-col min-h-screen bg-white">
      <NavBar />

      <main className="flex-grow pt-[80px] w-full flex flex-col justify-start items-center">
        {loading ? (
          /* Premium Shimmer Loading Screen */
          <div className="w-full max-w-[1440px] px-6 md:px-16 lg:px-24 xl:px-36 py-16 bg-white flex flex-col justify-start items-start gap-8 animate-pulse">
            <div className="h-10 bg-slate-200 rounded-lg w-1/4 mb-4" />
            <div className="w-full flex flex-col lg:flex-row gap-12 lg:gap-16">
              <div className="w-full lg:w-[490px] h-72 bg-slate-200 rounded-3xl" />
              <div className="flex-1 flex flex-col gap-6">
                <div className="h-6 bg-slate-200 rounded w-1/3" />
                <div className="h-10 bg-slate-200 rounded w-3/4" />
                <div className="h-20 bg-slate-200 rounded w-full" />
              </div>
            </div>
          </div>
        ) : error || !partner ? (
          /* Error View */
          <div className="w-full max-w-[1440px] px-6 md:px-16 lg:px-24 xl:px-36 py-20 flex flex-col justify-center items-center gap-4 text-center">
            <span className="text-red-500 text-lg font-semibold font-poppins">
              {error || "Partner not found"}
            </span>
            <p className="text-slate-500 font-poppins text-sm max-w-md">
              The hospital details you are looking for might have been removed or are temporarily unavailable.
            </p>
            <Link href="/partners" className="mt-4">
              <Button variant="primary" text="Go to Partners Listing" />
            </Link>
          </div>
        ) : (
          /* Dynamic Content View */
          <>
            {/* Full-width section with background styling and rounded corners */}
            <div className="w-full py-16 bg-white flex flex-col justify-start items-center overflow-hidden relative border-b border-gray-100 rounded-bl-[32px] rounded-br-[32px] outline outline-offset-[-1px] outline-gray-200">

              {/* Decorative background shapes positioned relative to full-width wrapper */}
              <div className="size-48 left-[-98px] top-[-98px] absolute bg-rose-50 rounded-full pointer-events-none z-0" />

              {/* Centered content container keeping the same max-width and paddings */}
              <div className="w-full max-w-[1440px] px-6 md:px-16 lg:px-24 xl:px-36 flex flex-col justify-start items-start gap-3 relative z-10">

                {/* Back Button */}
                <Link href="/partners">
                  <Button
                    variant="ghost-black"
                    text="Back to Partners"
                    leftIcon="Left 1"
                    className="font-poppins text-base font-medium mb-8"
                  />
                </Link>

                {/* Section Indicator */}
                <div className="self-stretch flex flex-col justify-start items-start gap-3">
                  <div className="self-stretch inline-flex justify-between items-end">
                    <div className="flex-1 inline-flex flex-col justify-start items-start gap-1">
                      <span className="justify-start text-primary/50 text-sm font-normal font-poppins tracking-wider">
                        HOSPITAL DETAILS
                      </span>
                    </div>
                  </div>
                </div>

                {/* Main Content Layout */}
                <div className="w-full flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-16">

                  {/* Left Side: Image Slider / Carousel & Maps Button */}
                  <div className="w-full lg:w-[490px] flex flex-col justify-start items-center gap-6 shrink-0">
                    <div className="self-stretch flex flex-col justify-start items-center gap-6">

                      {/* Active Image View */}
                      <div className="w-full h-72 relative bg-gradient-to-b from-blue-800/0 to-blue-800/20 rounded-3xl border-2 border-primary overflow-hidden shadow-sm">
                        {partnerImages.length > 0 ? (
                          <>
                            <AnimatePresence mode="wait">
                              <motion.div
                                key={activeImageIdx}
                                initial={{ opacity: 0, scale: 1.02 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                transition={{ duration: 0.3 }}
                                className="absolute inset-0"
                              >
                                <Image
                                  src={partnerImages[activeImageIdx]}
                                  alt={`${partner.name} view`}
                                  fill
                                  className="object-cover"
                                  sizes="(max-width: 768px) 100vw, 490px"
                                  priority
                                />
                              </motion.div>
                            </AnimatePresence>
                            {/* Brand alignment gradient overlay in front of the image */}
                            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-primary/25 pointer-events-none z-10" />
                          </>
                        ) : (
                          <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400 font-poppins">
                            No image available
                          </div>
                        )}
                      </div>

                      {/* Slider Dot Indicators */}
                      {partnerImages.length > 1 && (
                        <div className="inline-flex justify-center items-center gap-1.5 h-3">
                          {partnerImages.map((_, idx) => {
                            const isActive = activeImageIdx === idx;
                            return (
                              <motion.button
                                key={idx}
                                onClick={() => setActiveImageIdx(idx)}
                                aria-label={`Go to slide ${idx + 1}`}
                                className="h-2 rounded-full cursor-pointer focus:outline-hidden"
                                animate={{
                                  width: isActive ? 24 : 8,
                                  backgroundColor: isActive ? "#3F71B7" : "#E2E8F0"
                                }}
                                whileHover={{
                                  scale: isActive ? 1 : 1.2,
                                  backgroundColor: isActive ? "#3F71B7" : "#CBD5E1"
                                }}
                                whileTap={{ scale: 0.95 }}
                                transition={{
                                  type: "spring",
                                  stiffness: 300,
                                  damping: 20
                                }}
                              />
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Maps Button CTA */}
                    {partner.mapsUrl && (
                      <Button
                        variant="outline-primary"
                        text="Google Maps View"
                        leftIcon="maps"
                        className="w-full md:w-auto font-poppins text-base font-medium"
                        onClick={() => setIsMapOpen(true)}
                      />
                    )}
                  </div>

                  {/* Right Side: Hospital Info & Location Details */}
                  <div className="flex-1 w-full flex flex-col justify-start items-start gap-6">

                    {/* Name & Country */}
                    <div className="self-stretch flex flex-col justify-start items-start gap-2">

                      {/* Dynamic Country Badge */}
                      <div className="h-8 px-2.5 py-1.5 bg-white rounded-2xl outline outline-offset-[-1px] outline-gray-200 inline-flex justify-center items-center gap-2">
                        {flagUrl ? (
                          <div className="w-4 h-3 relative overflow-hidden rounded-[2px] outline outline-black">
                            <Image
                              src={flagUrl}
                              alt={`${partner.country} flag`}
                              fill
                              className="object-contain"
                              unoptimized
                            />
                          </div>
                        ) : (
                          <div className="w-4 h-3 relative bg-white rounded-[2px] outline outline-black overflow-hidden">
                            <div className="w-4 h-1.5 left-0 top-0 absolute bg-slate-50" />
                            <div className="w-4 h-1.5 left-0 top-0 absolute bg-red-600" />
                          </div>
                        )}
                        <span className="justify-start text-primary text-sm font-normal font-poppins">
                          {partner.location}
                        </span>
                      </div>

                      {/* Partner Name */}
                      <h1 className="self-stretch justify-start text-primary text-3xl font-semibold font-sans leading-tight">
                        {partner.name}
                      </h1>

                      {/* Partner Description */}
                      <p className="self-stretch justify-start text-black text-base font-normal font-poppins leading-relaxed text-justify">
                        {partner.description}
                      </p>
                    </div>

                    {/* Separator line */}
                    <hr className="w-full border-t border-gray-200" />

                    {/* Contact Info Stack */}
                    <div className="self-stretch flex flex-col justify-start items-start gap-3">
                      <span className="justify-start text-primary/50 text-sm font-normal font-poppins">
                        Hospital Information
                      </span>

                      <div className="self-stretch flex flex-col justify-start items-start gap-3">

                        {/* Phone Item */}
                        {partner.phone && (
                          <div className="px-3 py-1.5 bg-primary/10 rounded-[64px] inline-flex justify-center items-center gap-2">
                            <span
                              style={{
                                maskImage: 'url("/icons/Message 18.svg")',
                                WebkitMaskImage: 'url("/icons/Message 18.svg")',
                              }}
                              className="size-4 bg-primary mask-contain mask-no-repeat mask-center shrink-0"
                              aria-hidden="true"
                            />
                            <span className="justify-start text-primary text-sm font-normal font-poppins">
                              {partner.phone}
                            </span>
                          </div>
                        )}

                        {/* Email Item */}
                        {partner.email && (
                          <div className="px-3 py-1.5 bg-primary/10 rounded-[64px] inline-flex justify-center items-center gap-2">
                            <span
                              style={{
                                maskImage: 'url("/icons/Message 36.svg")',
                                WebkitMaskImage: 'url("/icons/Message 36.svg")',
                              }}
                              className="size-4 bg-primary mask-contain mask-no-repeat mask-center shrink-0"
                              aria-hidden="true"
                            />
                            <span className="justify-start text-primary text-sm font-normal font-poppins">
                              {partner.email}
                            </span>
                          </div>
                        )}

                        {/* Address Item */}
                        {partner.address && (
                          <div className="w-full px-3 py-2.5 bg-primary/10 rounded-[20px] md:rounded-[64px] inline-flex justify-start items-center gap-2">
                            <span
                              style={{
                                maskImage: 'url("/icons/Location.svg")',
                                WebkitMaskImage: 'url("/icons/Location.svg")',
                              }}
                              className="size-4 bg-primary mask-contain mask-no-repeat mask-center shrink-0"
                              aria-hidden="true"
                            />
                            <span className="flex-1 justify-start text-primary text-sm font-normal font-poppins leading-normal">
                              {partner.address}
                            </span>
                          </div>
                        )}

                      </div>
                    </div>
                  </div>

                </div>

              </div>

              {/* Decorative Brand Watermark */}
              <span
                style={{
                  maskImage: 'url("/icons/assets/lyflineHeart.svg")',
                  WebkitMaskImage: 'url("/icons/assets/lyflineHeart.svg")',
                }}
                className="absolute bottom-0 right-0 size-20 md:size-[120px] pointer-events-none select-none opacity-10 bg-red-600/50 mask-contain mask-no-repeat mask-center shrink-0"
                aria-hidden="true"
              />
            </div>

            {/* Hospital Available Doctors Section */}
            <section className="w-full py-16 bg-white flex flex-col justify-start items-center relative overflow-hidden">
              <NoiseTexture />
              {/* Centered content container */}
              <div className="w-full max-w-[1440px] px-6 md:px-16 lg:px-24 xl:px-36 flex flex-col justify-start items-center gap-8 relative z-10">
                <div className="self-stretch flex flex-col justify-start items-start gap-8">

                  {/* Header */}
                  <div className="self-stretch inline-flex justify-between items-end">
                    <div className="flex-1 inline-flex flex-col justify-start items-start gap-1">
                      <span className="justify-start text-primary/50 text-sm font-normal font-poppins tracking-wider">
                        THE SPECIALIST
                      </span>
                      <h2 className="justify-start text-primary text-3xl font-medium font-poppins">
                        Hospital Available Doctors
                      </h2>
                    </div>
                  </div>

                  {/* Grid of Doctor Cards */}
                  <div className="w-full flex flex-wrap justify-center xl:grid xl:grid-cols-4 gap-6 justify-items-center">
                    {doctorsLoading ? (
                      Array.from({ length: 4 }).map((_, i) => (
                        <DoctorCard key={`skeleton-${i}`} isLoading={true} />
                      ))
                    ) : doctors.length > 0 ? (
                      doctors.map((doc) => (
                        <DoctorCard
                          key={doc.id}
                          name={doc.name}
                          title={doc.title}
                          hospital={doc.hospital}
                          imageUrl={doc.imageUrl}
                        />
                      ))
                    ) : (
                      <p className="col-span-4 text-center text-slate-400 font-poppins text-sm py-8">
                        No doctors listed for this hospital yet.
                      </p>
                    )}
                  </div>

                </div>

                {/* View All Doctor CTA Button */}
                <Button
                  variant="outline-primary"
                  text="View All Doctor"
                  rightIcon="Stethoscope"
                  disabled
                  className="font-poppins text-base font-medium cursor-not-allowed"
                />

              </div>

              {/* Decorative Brand Watermark */}
              <span
                style={{
                  maskImage: 'url("/icons/assets/lyflineHeart.svg")',
                  WebkitMaskImage: 'url("/icons/assets/lyflineHeart.svg")',
                }}
                className="absolute bottom-0 right-0 size-20 md:size-[120px] pointer-events-none select-none opacity-10 bg-[#3F71B7]/50 mask-contain mask-no-repeat mask-center shrink-0"
                aria-hidden="true"
              />
            </section>
          </>
        )}
      </main>

      <Footer />

      {partner && (
        <GooglaMapsPreviewModal
          isOpen={isMapOpen}
          onClose={() => setIsMapOpen(false)}
          embedUrl={partner.mapsUrl}
        />
      )}
    </div>
  );
}
