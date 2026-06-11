"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge, type BadgeVariant } from "@/components/Badge";

interface ArticleCardProps {
  title: string;
  date: string;
  category: string;
  categoryVariant?: BadgeVariant;
  imageUrl?: string;
  href?: string;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  date,
  category,
  categoryVariant = "green",
  imageUrl,
  href = "#",
}) => {
  return (
    <div className="w-full max-w-[384px] bg-white rounded-[32px] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.10)] outline outline-2 outline-offset-[-2px] outline-stone-50 inline-flex flex-col justify-start items-start overflow-hidden">
      
      {/* Article Image Container */}
      <div className="self-stretch h-52 relative overflow-hidden border-b-2 border-gray-200 rounded-b-3xl">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-b from-blue-800/0 to-blue-800/30" />
        )}
      </div>

      {/* Content Area */}
      <div className="self-stretch p-6 rounded-bl-[32px] rounded-br-[32px] flex flex-col justify-start items-start gap-6 overflow-hidden">
        
        {/* Metadata row */}
        <div className="self-stretch inline-flex justify-between items-center">
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
            showDot={true}
          />
        </div>

        {/* Title */}
        <h3 className="self-stretch justify-start text-black text-base font-medium font-poppins line-clamp-3">
          {title}
        </h3>

        {/* Read More Link */}
        <Link href={href} className="inline-flex justify-start items-center gap-2.5 hover:opacity-85 transition-all group">
          <span className="justify-start text-primary text-sm font-medium font-poppins group-hover:text-primary transition-colors">
            Read More
          </span>
          <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 group-hover:text-primary transition-all" />
        </Link>
      </div>

    </div>
  );
};

export default ArticleCard;
