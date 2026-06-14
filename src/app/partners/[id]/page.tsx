"use client";

import React, { use, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";
import { notFound } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { DOCTORS } from "@/data/mockData";
import { DoctorCard } from "@/components/card/DoctorCard";
import GooglaMapsPreviewModal from "@/components/googleMapsPreview";
import { NoiseTexture } from "@/components/magicui/NoiseTexture";

interface PageProps {
  params: Promise<{ id: string }>;
}

interface PartnerDetail {
  id: string;
  name: string;
  location: string;
  country: string;
  phone: string;
  email: string;
  address: string;
  description: string;
  mapsUrl: string;
  images: string[];
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

const PARTNERS_DETAILS: Record<string, PartnerDetail> = {
  "siloam-hospitals": {
    id: "siloam-hospitals",
    name: "Siloam Hospitals",
    location: "Jakarta, Indonesia",
    country: "Indonesia",
    phone: "(021) 6400 261",
    email: "cs@siloam.com",
    address: "Jl. Garnisun 1 No.2-3, RT.5/RW.4, Karet Semanggi, Kecamatan Setiabudi, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12930",
    description: "PT. Siloam International Hospitals Tbk (Siloam Hospitals) is the largest private hospital network that provides health service facilities in hospitals and clinics in various cities in Indonesia. Siloam Hospitals has more than 41 hospitals branch and 25 clinics equipped with complete facilities and professional medical staff ready to provide quality and international standard medical services to patients.",
    mapsUrl: "https://maps.app.goo.gl/tB3aL7xN4a1xZJq19",
    images: [
      "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80"
    ]
  },
  "mayapada-hospital": {
    id: "mayapada-hospital",
    name: "Mayapada Hospital",
    location: "Jakarta, Indonesia",
    country: "Indonesia",
    phone: "+62 1507-70",
    email: "cs@mayapada.com",
    address: "Jl. Lebak Bulus I Kav. 29, Cilandak, Jakarta Selatan, DKI Jakarta 12440",
    description: "Mayapada Hospital is a premium hospital network in Indonesia providing modern, high-quality, and patient-centered healthcare services. Equipped with state-of-the-art medical equipment and staffed by highly trained specialists, Mayapada Hospital offers a comprehensive range of medical fields including oncology, cardiology, neurology, and orthopedics.",
    mapsUrl: "https://maps.app.goo.gl/tB3aL7xN4a1xZJq19",
    images: [
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1538108149393-fdfd816974d8?auto=format&fit=crop&w=800&q=80"
    ]
  },
  "prince-court": {
    id: "prince-court",
    name: "Prince Court Medical Centre",
    location: "Kuala Lumpur, Malaysia",
    country: "Malaysia",
    phone: "+60 12-999-7262",
    email: "cs@princecourt.com",
    address: "39, Jalan Kia Peng, Kuala Lumpur, 50450 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur, Malaysia",
    description: "Prince Court Medical Centre is a multi-specialty hospital located in Kuala Lumpur, Malaysia. Renowned for its world-class medical facilities, high-end hospitality, and top-tier clinical outcomes, Prince Court caters to both local and international patients looking for outstanding treatments in heart, bone, brain, and aesthetic medicine.",
    mapsUrl: "https://maps.app.goo.gl/tB3aL7xN4a1xZJq19",
    images: [
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80"
    ]
  },
  "apollo-hospitals": {
    id: "apollo-hospitals",
    name: "Apollo Hospitals",
    location: "Chennai, India",
    country: "India",
    phone: "+9111-7179-1090",
    email: "cs@apollohospital.com",
    address: "Greams Lane, Off Greams Road, Chennai, Tamil Nadu 600006, India",
    description: "Apollo Hospitals is one of Asia's largest and most comprehensive healthcare groups. Renowned globally for its clinical excellence, Apollo has pioneered technological revolutions in cardiology, organ transplants, and oncology. Patients from all over the world travel to Apollo Hospitals to receive cutting-edge treatment at affordable costs.",
    mapsUrl: "https://maps.app.goo.gl/tB3aL7xN4a1xZJq19",
    images: [
      "https://images.unsplash.com/photo-1538108149393-fdfd816974d8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80"
    ]
  },
  "ready-plastic-surgery": {
    id: "ready-plastic-surgery",
    name: "Ready Plastic Surgery",
    location: "Seoul, South Korea",
    country: "Korea",
    phone: "+8225-1405-57",
    email: "cs@readyplastic.com",
    address: "Gangnam-daero, Gangnam-gu, Seoul, South Korea",
    description: "Ready Plastic Surgery in Seoul, South Korea is a premier aesthetic clinic specializing in advanced cosmetic procedures, skin rejuvenation, and reconstructive surgery. With state-of-the-art facilities, modern safety protocols, and internationally trained surgeons, the clinic provides tailored aesthetic transformations that prioritize natural beauty and patient safety.",
    mapsUrl: "https://maps.app.goo.gl/tB3aL7xN4a1xZJq19",
    images: [
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80"
    ]
  },
  "sam-hospital": {
    id: "sam-hospital",
    name: "Singapore Institute of Advanced (SAM)",
    location: "Singapore",
    country: "Singapore",
    phone: "+65-6708-7890",
    email: "cs@samhospital.com",
    address: "1 Farrer Park Station Road, Singapore 217562",
    description: "Singapore Institute of Advanced Medicine (SAM) is a leading specialized healthcare provider in Singapore. Offering cutting-edge diagnostic imaging, oncology treatments, and personalized health screening, SAM uses next-generation medical technology like proton beam therapy to deliver precise and effective outcomes in a modern facility.",
    mapsUrl: "https://maps.app.goo.gl/tB3aL7xN4a1xZJq19",
    images: [
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=80"
    ]
  },
  "nulook-clinic": {
    id: "nulook-clinic",
    name: "NuLook Clinic",
    location: "Badung Bali, Indonesia",
    country: "Indonesia",
    phone: "081139600303",
    email: "cs@nulook.clinic",
    address: "Jl. Sunset Road No. 66, Kuta, Badung, Bali 80361, Indonesia",
    description: "NuLook Clinic is a premier anti-aging and aesthetic clinic in Badung, Bali. Blending modern Korean beauty standards and clinical dermatology, NuLook offers highly effective skincare treatments, laser therapies, and non-invasive cosmetic procedures in a relaxing, spa-like tropical setting.",
    mapsUrl: "https://maps.app.goo.gl/tB3aL7xN4a1xZJq19",
    images: [
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80"
    ]
  },
  "royal-progress": {
    id: "royal-progress",
    name: "Royal Progress Hospital",
    location: "Jakarta, Indonesia",
    country: "Indonesia",
    phone: "(021) 6400 261",
    email: "cs@royalprogress.com",
    address: "Jl. Danau Sunter Utara, Sunter Agung, Tanjung Priok, Jakarta Utara, DKI Jakarta 14350",
    description: "Royal Progress Hospital in North Jakarta provides comprehensive clinical services with a strong focus on sports orthopedics, cardiology, and family wellness. Committed to international patient safety standards, the hospital combines professional expertise with compassionate care to support patient recovery and active lifestyles.",
    mapsUrl: "https://maps.app.goo.gl/tB3aL7xN4a1xZJq19",
    images: [
      "https://images.unsplash.com/photo-1538108149393-fdfd816974d8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80"
    ]
  }
};

export default function PartnerDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isMapOpen, setIsMapOpen] = useState(false);

  // Find partner details, or build a dynamic fallback if not defined in local dictionary
  const partner = PARTNERS_DETAILS[id] || {
    id: id,
    name: id.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
    location: "Global",
    country: "Global",
    phone: "Contact Support",
    email: "info@lyfline.com",
    address: "Address details not available.",
    description: "Partner medical service provider description not available.",
    mapsUrl: "https://maps.google.com",
    images: [
      "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80"
    ]
  };

  useEffect(() => {
    if (!partner.images || partner.images.length <= 1) return;

    const interval = setInterval(() => {
      setActiveImageIdx((prev) => (prev + 1) % partner.images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [activeImageIdx, partner.images.length]);

  const flagUrl = getFlagUrl(partner.country);

  // Filter available doctors for this specific hospital
  const hospitalDoctors = DOCTORS.filter(
    (d) => d.hospital.toLowerCase().includes(partner.name.toLowerCase()) ||
      partner.name.toLowerCase().includes(d.hospital.toLowerCase())
  );

  // Fallback to first 4 doctors in mockData if no matches are found, overriding their hospital name to match
  const displayDoctors = hospitalDoctors.length > 0
    ? hospitalDoctors
    : DOCTORS.slice(0, 4).map((d) => ({
      ...d,
      hospital: partner.name,
    }));

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <NavBar />

      <main className="flex-grow pt-[80px] w-full flex flex-col justify-start items-center">
        {/* Full-width section with background styling and rounded corners */}
        <div className="w-full py-16 bg-white flex flex-col justify-start items-center overflow-hidden relative border-b border-gray-100 rounded-bl-[32px] rounded-br-[32px] outline outline-offset-[-1px] outline-gray-200">

          {/* Decorative background shapes positioned relative to full-width wrapper */}
          <div className="size-48 left-[-98px] top-[-98px] absolute bg-rose-50 rounded-full pointer-events-none z-0" />

          {/* Centered content container keeping the same max-width and paddings */}
          <div className="w-full max-w-[1440px] px-6 md:px-36 flex flex-col justify-start items-start gap-3 relative z-10">

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
                    {partner.images && partner.images.length > 0 ? (
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
                              src={partner.images[activeImageIdx]}
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
                  {partner.images && partner.images.length > 1 && (
                    <div className="inline-flex justify-center items-center gap-1.5 h-3">
                      {partner.images.map((_, idx) => {
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
                <Button
                  variant="outline-primary"
                  text="Google Maps View"
                  leftIcon="maps"
                  className="w-full md:w-auto font-poppins text-base font-medium"
                  onClick={() => setIsMapOpen(true)}
                />
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

                    {/* Email Item */}
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

                    {/* Address Item */}
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
          {/* Decorative background shape */}
          {/* Centered content container */}
          <div className="w-full max-w-[1440px] px-6 md:px-36 flex flex-col justify-start items-center gap-8 relative z-10">
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
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
                {displayDoctors.map((doc) => (
                  <DoctorCard
                    key={doc.id}
                    name={doc.name}
                    specialty={doc.specialty}
                    hospital={doc.hospital}
                    imageUrl={doc.imageUrl}
                  />
                ))}
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
      </main>

      <Footer />

      <GooglaMapsPreviewModal
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        embedUrl={partner.mapsUrl}
      />
    </div>
  );
}
