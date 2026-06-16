"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge, type BadgeVariant } from "@/components/Badge";

interface ArticleCardProps {
  title: string;
  date: string;
  category: string;
  categoryVariant?: BadgeVariant;
  customColor?: string;
  imageUrl?: string;
  href?: string;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  date,
  category,
  categoryVariant = "green",
  customColor,
  imageUrl,
  href = "#",
}) => {
  return (
    <div className="w-full max-w-[384px] bg-white rounded-[32px] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.10)] outline-2 outline-offset-[-2px] outline-stone-50 inline-flex flex-col justify-start items-start group transition-all duration-300 hover:scale-[1.02] hover:shadow-md">

      {/* Article Image Container */}
      <div className="self-stretch h-52 relative overflow-hidden border-b-2 border-gray-200 rounded-t-[32px] rounded-b-3xl">
        {imageUrl ? (
          <>
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Brand suit gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-800/0 to-blue-800/30 pointer-events-none mix-blend-multiply" />
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-b from-blue-800/20 to-blue-800/40" />
        )}
      </div>

      {/* Content Area */}
      <div className="self-stretch p-6 rounded-bl-[32px] rounded-br-[32px] flex flex-col justify-start items-start gap-6 overflow-hidden">

        {/* Metadata row */}
        <div className="self-stretch flex flex-wrap justify-between items-center gap-3">
          {/* Date Badge */}
          <div className="px-2.5 py-1.5 bg-primary/10 rounded-[64px] flex justify-center items-center gap-2">
            <span
              style={{
                maskImage: 'url("/icons/Time Circle 1.svg")',
                WebkitMaskImage: 'url("/icons/Time Circle 1.svg")',
              }}
              className="size-4 bg-primary mask-contain mask-no-repeat mask-center shrink-0"
              aria-hidden="true"
            />
            <span className="justify-start text-primary text-sm font-normal font-poppins">{date}</span>
          </div>

          {/* Category Badge */}
          <Badge
            text={category}
            variant={categoryVariant}
            customColor={customColor}
            showDot={true}
          />
        </div>

        {/* Title */}
        <h3 className="self-stretch justify-start text-black text-base font-medium font-poppins line-clamp-3">
          {title}
        </h3>

        {/* Read More Link */}
        <Link href={href} className="inline-flex justify-start items-center gap-2.5 hover:opacity-85 transition-all group/link">
          <span className="justify-start text-primary text-sm font-medium font-poppins group-hover/link:text-primary transition-colors">
            Read More
          </span>
          <span
            style={{
              maskImage: 'url("/icons/Right 1.svg")',
              WebkitMaskImage: 'url("/icons/Right 1.svg")',
            }}
            className="size-4 bg-primary mask-contain mask-no-repeat mask-center shrink-0 group-hover/link:translate-x-1 transition-all"
            aria-hidden="true"
          />
        </Link>
      </div>

    </div>
  );
};

export default ArticleCard;
