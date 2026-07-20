"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
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

const getHospitalSlug = (hospitalName: string) => {
  const clean = hospitalName.toLowerCase().trim();
  if (clean.includes("siloam")) return "siloam-hospitals";
  if (clean.includes("mayapada")) return "mayapada-hospital";
  if (clean.includes("prince court") || clean.includes("princecourt")) return "prince-court";
  if (clean.includes("apollo")) return "apollo-hospitals";
  if (clean.includes("ready plastic") || clean.includes("readyplastic")) return "ready-plastic-surgery";
  if (clean.includes("sam hospital") || clean.includes("singapore institute") || clean.includes("sam")) return "sam-hospital";
  if (clean.includes("nulook")) return "nulook-clinic";
  if (clean.includes("royal progress") || clean.includes("royalprogress")) return "royal-progress";
  return hospitalName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
};

export default function DoctorClient({ doctor }: DoctorClientProps) {
  const { lang } = useLanguage();
  const [translatedDesc, setTranslatedDesc] = useState(doctor.description || "");
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    if (lang === "id" && doctor.description) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsTranslating(true);
      fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
          doctor.description
        )}&langpair=en|id`
      )
        .then((res) => {
          if (!res.ok) throw new Error("Translation failed");
          return res.json();
        })
        .then((data) => {
          setTranslatedDesc(
            data.responseData?.translatedText || doctor.description
          );
          setIsTranslating(false);
        })
        .catch((err) => {
          console.error("Error translating doctor description:", err);
          setTranslatedDesc(doctor.description || "");
          setIsTranslating(false);
        });
    } else {
      setTranslatedDesc(doctor.description || "");
    }
  }, [lang, doctor.description]);

  const flagUrl = getFlagUrl(doctor.region || "");
  const qualifications = doctor.qualification || [];
  const languages = doctor.language || [];

  return (
    <main className="grow pt-[80px] w-full flex flex-col justify-start items-center">
      {/* Full-width section with background styling and rounded corners */}
      <div className="w-full py-16 bg-white flex flex-col justify-start items-center overflow-hidden relative outline -outline-offset-1 outline-gray-200">

        {/* Decorative background shapes */}
        <div className="size-48 left-[-98px] top-[-98px] absolute bg-rose-50 rounded-full pointer-events-none z-0" />

        {/* Centered content container */}
        <div className="w-full max-w-[1440px] px-6 md:px-16 lg:px-24 xl:px-36 flex flex-col justify-start items-start gap-3 relative z-10">

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
            <div className="w-full max-w-[270px] lg:w-[270px] flex flex-col justify-start items-center gap-6 shrink-0">
              <div className="w-full h-[216px] relative bg-[#EBEFFA] rounded-3xl border-2 border-primary overflow-hidden shadow-sm">

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

                {/* Doctor Description */}
                <p className="self-stretch justify-start text-black text-base font-normal font-poppins leading-relaxed text-justify mt-2">
                  {isTranslating ? (
                    <span className="text-slate-400 italic">Menerjemahkan deskripsi...</span>
                  ) : (
                    translatedDesc || (lang === "en" ? "No description available yet." : "Deskripsi belum tersedia.")
                  )}
                </p>
              </div>

              {/* Separator line */}
              <hr className="w-full border-t border-gray-200" />

              {/* Professional details */}
              <div className="self-stretch flex flex-col justify-start items-start gap-6">

                {/* Specialties */}
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                  <span className="justify-start text-primary/50 text-sm font-semibold font-poppins tracking-wider">
                    {lang === "en" ? "Speciality" : "Spesialisasi"}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {(doctor.specialty || []).map((s, idx) => (
                      <Badge key={idx} text={s} variant="green" showDot={true} />
                    ))}
                  </div>
                </div>

                {/* Qualifications & Languages */}
                <div className="self-stretch flex flex-col lg:flex-row justify-between items-start gap-6">

                  {/* Qualifications */}
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

                  {/* Languages */}
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

                </div>

                {/* Hospital Details */}
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                  <span className="justify-start text-primary/50 text-sm font-semibold font-poppins tracking-wider">
                    {lang === "en" ? "Hospital" : "Rumah Sakit"}
                  </span>
                  <div className="h-10 px-3 py-1.5 bg-white rounded-2xl outline-1 -outline-offset-1 outline-gray-200 inline-flex justify-center items-center gap-2">
                    {flagUrl ? (
                      <div className="w-4 h-3 relative overflow-hidden rounded-[2px] outline outline-black">
                        <Image
                          src={flagUrl}
                          alt={lang === "en" ? `${doctor.region} flag` : `Bendera ${doctor.region}`}
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
                    {doctor.hospital ? (
                      <Link
                        href={`/partners/${getHospitalSlug(doctor.hospital)}`}
                        className="justify-start text-primary text-sm font-normal font-poppins hover:underline hover:text-primary-hover transition-colors"
                      >
                        {doctor.hospital}
                      </Link>
                    ) : (
                      <span className="justify-start text-primary text-sm font-normal font-poppins">
                        {lang === "en" ? "Unknown Hospital" : "Rumah Sakit Tidak Diketahui"}
                      </span>
                    )}
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
          className="absolute bottom-0 right-0 size-20 md:size-[120px] pointer-events-none select-none opacity-10 bg-red-600/50 mask-contain mask-no-repeat mask-center shrink-0"
          aria-hidden="true"
        />
      </div>
    </main>
  );
}
