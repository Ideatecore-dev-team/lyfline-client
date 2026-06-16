"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge, type BadgeVariant } from "@/components/Badge";
import { type Doctor } from "@/data/doctorsData";

interface DoctorCardProps {
  doctor?: Doctor;
  name?: string;
  title?: string;
  titleVariant?: BadgeVariant;
  hospital?: string;
  imageUrl?: string;
  href?: string;
  isLoading?: boolean;
  onViewDetails?: () => void;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({
  doctor,
  name,
  title,
  titleVariant = "red",
  hospital,
  imageUrl,
  href = "#",
  isLoading = false,
  onViewDetails,
}) => {
  const displayName = name || doctor?.name || "";
  const displayTitle = title || doctor?.title || "";
  const displayHospital = hospital || doctor?.hospital || "";
  const displayImageUrl = imageUrl || doctor?.imageUrl;

  if (isLoading) {
    return (
      <div className="w-full max-w-[270px] bg-white rounded-[32px] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.10)] outline-2 outline-offset-[-2px] outline-stone-50 inline-flex flex-col justify-start items-start overflow-hidden">
        {/* Skeleton Image Area */}
        <div className="w-full h-48 bg-slate-100 animate-pulse rounded-3xl" />

        {/* Skeleton Content */}
        <div className="self-stretch p-6 flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            {/* Badge Shimmer */}
            <div className="h-7 w-24 bg-slate-100 rounded-full animate-pulse" />
            {/* Name Shimmer */}
            <div className="h-6 w-4/5 bg-slate-100 rounded-md animate-pulse" />
            {/* Hospital Shimmer */}
            <div className="h-4 w-11/12 bg-slate-100 rounded-md animate-pulse" />
          </div>
          {/* Action Link Shimmer */}
          <div className="h-5 w-24 bg-slate-100 rounded-md mx-auto animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[270px] h-full bg-white rounded-[32px] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.10)] outline-2 outline-offset-[-2px] outline-stone-50 flex flex-col justify-start items-start overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-md group">

      {/* Doctor Image Container */}
      <div className="self-stretch h-48 relative bg-[#EBEFFA] rounded-3xl outline-2 outline-gray-200 overflow-hidden shrink-0">
        {/* Background Decorative Shapes */}
        <span
          style={{
            maskImage: 'url("/icons/assets/lyflineQuarterCircle.svg")',
            WebkitMaskImage: 'url("/icons/assets/lyflineQuarterCircle.svg")',
          }}
          className="absolute top-0 left-0 size-12 pointer-events-none select-none bg-primary/5 mask-contain mask-no-repeat mask-center shrink-0 z-0"
          aria-hidden="true"
        />
        <span
          style={{
            maskImage: 'url("/icons/assets/lyflineHeart.svg")',
            WebkitMaskImage: 'url("/icons/assets/lyflineHeart.svg")',
          }}
          className="absolute bottom-0 right-0 size-14 pointer-events-none select-none bg-primary/5 mask-contain mask-no-repeat mask-center shrink-0 z-0"
          aria-hidden="true"
        />

        {displayImageUrl ? (
          <Image
            src={displayImageUrl}
            alt={displayName}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105 z-10"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-b from-indigo-100 to-indigo-50" />
        )}
      </div>

      {/* Content Area */}
      <div className="self-stretch p-6 rounded-bl-[32px] rounded-br-[32px] flex flex-col flex-grow justify-between gap-6 overflow-hidden">
        <div className="self-stretch flex flex-col justify-start items-start gap-3">
          {/* Title Badge */}
          <Badge
            text={displayTitle}
            variant={titleVariant}
            showDot={true}
          />

          {/* Doctor Info */}
          <div className="self-stretch flex flex-col justify-start items-start gap-1">
            <h3 className="self-stretch justify-start text-primary text-base font-medium font-poppins line-clamp-1 group-hover:text-primary transition-colors">
              {displayName}
            </h3>
            <p className="self-stretch justify-start text-black text-sm font-normal font-poppins line-clamp-2">
              {displayHospital}
            </p>
          </div>
        </div>

        {/* Action Link */}
        {onViewDetails ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              onViewDetails();
            }}
            className="self-stretch inline-flex justify-center items-center gap-2 text-primary text-sm underline font-medium font-poppins hover:text-primary/50 transition-colors group/link cursor-pointer border-none bg-transparent"
          >
            View Details
            <span
              style={{
                maskImage: 'url("/icons/Right 1.svg")',
                WebkitMaskImage: 'url("/icons/Right 1.svg")',
              }}
              className="size-4 bg-primary mask-contain mask-no-repeat mask-center shrink-0 group-hover/link:translate-x-1 transition-all"
              aria-hidden="true"
            />
          </button>
        ) : (
          <Link
            href={href}
            className="self-stretch inline-flex justify-center items-center gap-2 text-primary text-sm underline font-medium font-poppins hover:text-primary/50 transition-colors group/link"
          >
            View Details
            <span
              style={{
                maskImage: 'url("/icons/Right 1.svg")',
                WebkitMaskImage: 'url("/icons/Right 1.svg")',
              }}
              className="size-4 bg-primary mask-contain mask-no-repeat mask-center shrink-0 group-hover/link:translate-x-1 transition-all"
              aria-hidden="true"
            />
          </Link>
        )}
      </div>

    </div>
  );
};

export default DoctorCard;
