"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import DOMPurify from "dompurify";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { type Doctor } from "@/data/doctorsData";
import { isVideoUrl } from "@/lib/media";
import { useLanguage } from "@/context/LanguageContext";

interface DoctorClientProps {
  doctor: Doctor;
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
    case "singapore":
      return "/Flags/SG - Singapore.svg";
    case "china":
      return "/Flags/CN - China.svg";
    case "united kingdom":
    case "uk":
      return "/Flags/GB-UKM - United Kingdom.svg";
    case "japan":
      return "/Flags/JP - Japan.svg";
    case "taiwan":
      return "/Flags/TW - Taiwan.svg";
    default:
      return null;
  }
};

import { slugify } from "@/lib/utils";

const getHospitalSlug = (hospitalName: string, hospitalId?: string) => {
  if (hospitalId) {
    return `${slugify(hospitalName || "partner")}-${hospitalId}`;
  }
  const clean = hospitalName.toLowerCase().trim();
  if (clean.includes("siloam")) return "siloam-hospitals";
  if (clean.includes("mayapada")) return "mayapada-hospital";
  if (clean.includes("prince court") || clean.includes("princecourt")) return "prince-court";
  if (clean.includes("apollo")) return "apollo-hospitals";
  if (clean.includes("ready plastic") || clean.includes("readyplastic")) return "ready-plastic-surgery";
  if (clean.includes("sam hospital") || clean.includes("singapore institute") || clean.includes("sam")) return "sam-hospital";
  if (clean.includes("nulook")) return "nulook-clinic";
  if (clean.includes("royal progress") || clean.includes("royalprogress")) return "royal-progress";
  return slugify(hospitalName);
};

export default function DoctorClient({ doctor }: DoctorClientProps) {
  const { lang } = useLanguage();

  const isIndonesian = lang === "id";
  const displayDesc = isIndonesian && doctor.descriptionIndonesia
    ? doctor.descriptionIndonesia
    : doctor.description || "";

  const isOldType = doctor.type?.toLowerCase() === "old";

  const sanitizedDesc = useMemo(() => {
    if (typeof window !== "undefined") {
      return DOMPurify.sanitize(displayDesc);
    }
    return displayDesc;
  }, [displayDesc]);

  const flagUrl = getFlagUrl(doctor.region || "");
  const specialties = (doctor.specialty || []).filter((s) => s && s.trim().length > 0);
  const qualifications = (doctor.qualification || []).filter((q) => q && q.trim().length > 0);
  const languages = (doctor.language || []).filter((l) => l && l.trim().length > 0);

  return (
    <main className="grow pt-20 w-full flex flex-col justify-start items-center">
      {/* Full-width section with background styling and rounded corners */}
      <div className="w-full py-16 bg-white flex flex-col justify-start items-center overflow-hidden relative outline -outline-offset-1 outline-gray-200">

        {/* Decorative background shapes */}
        <div className="size-48 -left-24.5 -top-24.5 absolute bg-rose-50 rounded-full pointer-events-none z-0" />

        {/* Centered content container */}
        <div className="w-full max-w-360 px-6 md:px-16 lg:px-24 xl:px-36 flex flex-col justify-start items-start gap-3 relative z-10">

          {/* Back Button */}
          <Link href="/doctors">
            <Button
              variant="ghost-black"
              text={lang === "en" ? "Back to Doctors" : "Kembali ke Dokter"}
              leftIcon="Left 1"
              className="font-poppins text-base font-medium mb-8"
            />
          </Link>

          {/* Section Indicator */}
          <div className="self-stretch flex flex-col justify-start items-start gap-3">
            <div className="self-stretch inline-flex justify-between items-end">
              <div className="flex-1 inline-flex flex-col justify-start items-start gap-1">
                <span className="justify-start text-primary/50 text-sm font-normal font-poppins tracking-wider">
                  {lang === "en" ? "DOCTOR INFORMATION" : "INFORMASI DOKTER"}
                </span>
              </div>
            </div>
          </div>

          {/* Main Content Layout */}
          <div className="w-full flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-16">

            {/* Left Column: Profile Picture Container */}
            <div className="w-full max-w-67.5 lg:w-67.5 flex flex-col justify-start items-center gap-6 shrink-0">
              <div className="w-full h-54 relative bg-[#EBEFFA] rounded-3xl border-2 border-primary overflow-hidden shadow-sm">

                {/* Background Decorative Shapes */}
                <span
                  style={{
                    maskImage: 'url("/icons/assets/lyflineQuarterCircle.svg")',
                    WebkitMaskImage: 'url("/icons/assets/lyflineQuarterCircle.svg")',
                  }}
                  className="absolute top-0 left-0 size-16 pointer-events-none select-none bg-primary/5 mask-contain mask-no-repeat mask-center shrink-0 z-0"
                  aria-hidden="true"
                />
                <span
                  style={{
                    maskImage: 'url("/icons/assets/lyflineHeart.svg")',
                    WebkitMaskImage: 'url("/icons/assets/lyflineHeart.svg")',
                  }}
                  className="absolute bottom-0 right-0 size-20 pointer-events-none select-none bg-primary/5 mask-contain mask-no-repeat mask-center shrink-0 z-0"
                  aria-hidden="true"
                />

                {doctor.imageUrl ? (
                  isVideoUrl(doctor.imageUrl) ? (
                    <video
                      src={doctor.imageUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover z-10"
                    />
                  ) : (
                    <Image
                      src={doctor.imageUrl}
                      alt={doctor.name}
                      fill
                      className="object-cover z-10"
                      sizes="(max-width: 768px) 100vw, 270px"
                      priority
                    />
                  )
                ) : (
                  <div className="w-full h-full bg-linear-to-b from-indigo-100 to-indigo-50" />
                )}
              </div>
            </div>

            {/* Right Column: Hospital Info & Location Details */}
            <div className="flex-1 w-full flex flex-col justify-start items-start gap-6">

              {/* Name & Title */}
              <div className="self-stretch flex flex-col justify-start items-start gap-2">
                {/* Title Badge */}
                <div className="px-3 py-1 bg-red-50 border border-red-100 rounded-2xl inline-flex justify-center items-center gap-2">
                  <span className="justify-start text-red-600 text-sm font-normal font-poppins">
                    {doctor.title}
                  </span>
                </div>

                {/* Doctor Name */}
                <h1 className="self-stretch justify-start text-primary text-3xl font-semibold font-sans leading-tight">
                  {doctor.name}
                </h1>
              </div>

              {/* Professional details (Specialties, Qualifications, and Languages on top of description) */}
              <div className="self-stretch flex flex-col justify-start items-start gap-6">
                {/* Specialties */}
                {specialties.length > 0 && (
                  <div className="self-stretch flex flex-col justify-start items-start gap-2">
                    <span className="justify-start text-primary/50 text-sm font-semibold font-poppins tracking-wider">
                      {lang === "en" ? "Speciality" : "Spesialisasi"}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {specialties.map((s, idx) => (
                        <Badge key={idx} text={s} variant="green" showDot={true} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Qualifications & Languages */}
                {(qualifications.length > 0 || languages.length > 0) && (
                  <div className="self-stretch flex flex-col lg:flex-row justify-between items-start gap-6">
                    {/* Qualifications */}
                    {qualifications.length > 0 && (
                      <div className="w-full lg:flex-1 flex flex-col justify-start items-start gap-2">
                        <span className="justify-start text-primary/50 text-sm font-semibold font-poppins tracking-wider">
                          {lang === "en" ? "Qualifications" : "Kualifikasi"}
                        </span>
                        <div className="flex flex-col gap-1.5 items-start w-full">
                          {qualifications.map((q: string, idx: number) => (
                            <div
                              key={idx}
                              className="px-3 py-1.5 bg-primary/10 rounded-[64px] inline-flex justify-center items-center gap-2"
                            >
                              <span className="justify-start text-primary text-sm font-normal font-poppins">
                                {q}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Languages */}
                    {languages.length > 0 && (
                      <div className="w-full lg:flex-1 flex flex-col justify-start items-start gap-2">
                        <span className="justify-start text-primary/50 text-sm font-semibold font-poppins tracking-wider">
                          {lang === "en" ? "Languages" : "Bahasa"}
                        </span>
                        <div className="flex flex-col gap-1.5 items-start w-full">
                          {languages.map((l: string, idx: number) => (
                            <div
                              key={idx}
                              className="px-3 py-1.5 bg-primary/10 rounded-[64px] inline-flex justify-center items-center gap-2"
                            >
                              <span className="justify-start text-primary text-sm font-normal font-poppins">
                                {l}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Separator line */}
              <hr className="w-full border-t border-gray-200" />

              {/* Doctor Description / Biography */}
              <div className="self-stretch flex flex-col justify-start items-start gap-2">
                <span className="justify-start text-primary/50 text-sm font-semibold font-poppins tracking-wider">
                  {lang === "en" ? "Biography" : "Biografi"}
                </span>
                {isOldType ? (
                  <div
                    className="self-stretch justify-start text-black text-base font-normal font-poppins leading-relaxed text-justify mt-1 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_a]:text-primary [&_a]:underline"
                    dangerouslySetInnerHTML={{
                      __html: sanitizedDesc || (lang === "en" ? "No description available yet." : "Deskripsi belum tersedia.")
                    }}
                  />
                ) : (
                  <p className="self-stretch justify-start text-black text-base font-normal font-poppins leading-relaxed text-justify mt-1">
                    {displayDesc || (lang === "en" ? "No description available yet." : "Deskripsi belum tersedia.")}
                  </p>
                )}
              </div>

              {/* Separator line */}
              <hr className="w-full border-t border-gray-200" />

              {/* Hospital Details & Booking Details */}
              <div className="self-stretch flex flex-col justify-start items-start gap-6">
                {/* Hospital Details */}
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                  <span className="justify-start text-primary/50 text-sm font-semibold font-poppins tracking-wider">
                    {lang === "en" ? "Hospital" : "Rumah Sakit"}
                  </span>

                  {/* Hospital Link */}
                  {doctor.hospital ? (
                    <Link
                      href={`/partners/${doctor.hospitalSlug || getHospitalSlug(doctor.hospital, doctor.hospital_id)}`}
                      className="justify-start text-primary text-base font-semibold font-poppins hover:underline hover:text-primary-hover transition-colors"
                    >
                      {doctor.hospital}
                    </Link>
                  ) : (
                    <span className="justify-start text-primary text-sm font-normal font-poppins">
                      {lang === "en" ? "Unknown Hospital" : "Rumah Sakit Tidak Diketahui"}
                    </span>
                  )}

                  {/* Address (if available) */}
                  {doctor.address && (
                    <div className="w-full px-3 py-2.5 bg-primary/10 rounded-[20px] md:rounded-[64px] inline-flex justify-start items-center gap-2 mt-1">
                      <span
                        style={{
                          maskImage: 'url("/icons/Location.svg")',
                          WebkitMaskImage: 'url("/icons/Location.svg")',
                        }}
                        className="size-4 bg-primary mask-contain mask-no-repeat mask-center shrink-0"
                        aria-hidden="true"
                      />
                      <span className="flex-1 justify-start text-primary text-sm font-normal font-poppins leading-normal">
                        {doctor.address}
                      </span>
                    </div>
                  )}

                  {/* Flag, City, Country Badge Container (under address) */}
                  <div className="h-8 px-2.5 py-1.5 bg-white rounded-2xl outline-1 -outline-offset-1 outline-gray-200 inline-flex justify-center items-center gap-2 mt-1">
                    {flagUrl ? (
                      <div className="w-4 h-3 relative overflow-hidden rounded-xs outline outline-black">
                        <Image
                          src={flagUrl}
                          alt={lang === "en" ? `${doctor.region} flag` : `Bendera ${doctor.region}`}
                          fill
                          className="object-contain"
                          unoptimized
                        />
                      </div>
                    ) : (
                      <div className="w-4 h-3 relative bg-white rounded-xs outline outline-black overflow-hidden">
                        <div className="w-4 h-1.5 left-0 top-0 absolute bg-slate-50" />
                        <div className="w-4 h-1.5 left-0 top-0 absolute bg-red-600" />
                      </div>
                    )}
                    <span className="justify-start text-primary text-sm font-normal font-poppins">
                      {doctor.city && doctor.region ? `${doctor.city}, ${doctor.region}` : doctor.region}
                    </span>
                  </div>
                </div>

                {/* CTA Booking Button */}
                <div className="self-stretch mt-4">
                  <a
                    href={`https://wa.me/6281291578559?text=${encodeURIComponent(
                      lang === "en"
                        ? `Hello Lyfline,\n\nI would like to make an appointment with ${doctor.name}`
                        : `Halo Lyfline,\n\nSaya ingin membuat janji temu dengan ${doctor.name}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button
                      variant="primary"
                      text={lang === "en" ? "Make an Appointment" : "Buat Janji Temu"}
                      className="w-full md:w-auto font-poppins text-base font-semibold px-8"
                    />
                  </a>
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
          className="absolute bottom-0 right-0 size-20 md:size-30 pointer-events-none select-none opacity-10 bg-red-600/50 mask-contain mask-no-repeat mask-center shrink-0"
          aria-hidden="true"
        />
      </div>
    </main>
  );
}
