"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { useLanguage } from "@/context/LanguageContext";
import { Doctor } from "@/data/mockData";

interface DoctorCardProps {
  doctor?: Doctor;
  index?: number;
  isLoading?: boolean;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({
  doctor,
  index = 0,
  isLoading = false,
}) => {
  const { t } = useLanguage();

  if (isLoading || !doctor) {
    return (
      <Card
        variant="default"
        hoverable={false}
        className="overflow-hidden p-0 flex flex-col h-full rounded-[32px] border border-slate-100 bg-white"
      >
        {/* Skeleton Image Area */}
        <div className="relative aspect-[4/3] w-full bg-slate-200 animate-pulse" />
        
        {/* Skeleton Content */}
        <div className="p-6 flex flex-col gap-4 flex-grow justify-between">
          <div className="flex flex-col gap-2">
            {/* Badge Shimmer */}
            <div className="h-5 w-24 bg-slate-200 rounded-full animate-pulse" />
            {/* Title Shimmer */}
            <div className="h-6 w-4/5 bg-slate-200 rounded-md animate-pulse mt-1" />
            {/* Subtitle Shimmer */}
            <div className="h-4 w-3/5 bg-slate-200 rounded-md animate-pulse" />
          </div>
          
          {/* Action Link Shimmer */}
          <div className="h-4 w-28 bg-slate-200 rounded-md animate-pulse mt-4" />
        </div>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 15 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: "easeOut",
      }}
      className="h-full"
    >
      <Card
        variant="default"
        hoverable={true}
        className="overflow-hidden p-0 flex flex-col h-full rounded-[32px] border border-slate-100 bg-white group"
      >
        {/* Doctor Image Container */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
          <Image
            src={doctor.imageUrl}
            alt={doctor.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>

        {/* Doctor Details */}
        <div className="p-6 flex flex-col justify-between flex-grow">
          <div>
            {/* Specialty Badge */}
            <Badge variant="accent" className="mb-3 px-3 py-1 font-bold text-[10px] uppercase flex items-center gap-1.5 w-fit rounded-full bg-[#FDF2F2] text-accent">
              <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
              {doctor.specialty}
            </Badge>

            {/* Doctor Name */}
            <h3 className="text-base font-bold text-primary mb-1 line-clamp-1 group-hover:text-primary-hover transition-colors">
              {doctor.name}
            </h3>

            {/* Hospital Name */}
            <p className="text-xs text-slate-500 font-medium line-clamp-1">
              {doctor.hospital} ({doctor.region})
            </p>
          </div>

          {/* View Details Link */}
          <div className="mt-5 pt-1">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-hover cursor-pointer">
              {t("doctors.card.view_details")}
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
