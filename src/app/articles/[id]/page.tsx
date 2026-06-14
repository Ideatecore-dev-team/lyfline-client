"use client";

import React, { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { ALL_ARTICLES } from "@/data/articlesData";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ArticleDetailPage({ params }: PageProps) {
  const { id } = use(params);

  // Find the current article
  const article = ALL_ARTICLES.find((a) => a.id === id);

  if (!article) {
    notFound();
  }

  // Get other newest articles (up to 3, excluding current)
  const otherArticles = ALL_ARTICLES.filter((a) => a.id !== id).slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <NavBar />

      <main className="flex-grow pt-[80px] w-full flex flex-col justify-start items-center relative">
        <div className="w-full max-w-[1440px] px-6 md:px-36 py-16 bg-white flex flex-col justify-start items-start gap-8 relative">

          {/* Back button */}
          <Link href="/articles">
            <Button
              variant="ghost-black"
              text="Back to Articles"
              leftIcon="Left 1"
              className="font-poppins text-base font-medium"
            />
          </Link>

          {/* Title and Metadata */}
          <div className="w-full flex flex-col justify-start items-start gap-3">
            <h1 className="self-stretch justify-start text-primary text-2xl md:text-3xl font-semibold font-poppins leading-tight">
              {article.title}
            </h1>
            <div className="flex justify-start items-center gap-3">
              {/* Date Badge */}
              <div className="px-2.5 py-1.5 bg-[#3F71B7]/10 rounded-[64px] flex justify-center items-center gap-2">
                <span
                  style={{
                    maskImage: 'url("/icons/Time Circle 1.svg")',
                    WebkitMaskImage: 'url("/icons/Time Circle 1.svg")',
                  }}
                  className="size-4 bg-[#3F71B7] mask-contain mask-no-repeat mask-center shrink-0"
                  aria-hidden="true"
                />
                <span className="justify-start text-[#3F71B7] text-sm font-normal font-poppins">{article.date}</span>
              </div>

              {/* Category Badge */}
              <Badge text={article.category} variant={article.categoryVariant} showDot={true} />
            </div>
          </div>

          {/* Main Layout Grid */}
          <div className="w-full flex flex-col lg:flex-row justify-start items-start gap-8">

            {/* Main Article Content */}
            <div className="flex-1 w-full flex flex-col justify-start items-start gap-6">

              {/* Cover Image Container */}
              <div className="self-stretch h-64 md:h-96 relative rounded-3xl overflow-hidden border-2 border-gray-200 bg-gradient-to-b from-blue-800/0 to-blue-800/30">
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  fill
                  className="object-cover animate-fade-in"
                  sizes="(max-width: 1024px) 100vw, 800px"
                  priority
                />
              </div>

              {/* Formatted Article Body */}
              <div className="self-stretch flex flex-col gap-6 text-neutral-900 text-base font-normal font-poppins text-justify leading-relaxed">
                {article.intro.map((p, i) => (
                  <p key={`intro-${i}`}>{p}</p>
                ))}

                {article.sections.map((section, idx) => (
                  <div key={`section-${idx}`} className="flex flex-col gap-3 w-full">
                    {section.heading && (
                      <h2 className="text-[slate-800] text-lg md:text-xl font-semibold font-poppins mt-4 mb-1">
                        {section.heading}
                      </h2>
                    )}
                    {section.paragraphs.map((p, pi) => (
                      <p key={`p-${pi}`}>{p}</p>
                    ))}
                    {section.bulletPoints && section.bulletPoints.length > 0 && (
                      <ul className="list-disc pl-6 text-zinc-600 flex flex-col gap-2">
                        {section.bulletPoints.map((bp, bi) => (
                          <li key={`bp-${bi}`}>{bp}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar - Other Newest Articles */}
            <div className="w-full lg:w-[384px] p-6 bg-primary rounded-[32px] flex flex-col justify-start items-start gap-6 overflow-hidden shadow-lg shrink-0 relative lg:sticky lg:top-[104px]">
              <div className="justify-start text-white text-sm font-poppins tracking-wider">
                OTHER NEWEST ARTICLE
              </div>

              <span
                style={{
                  maskImage: 'url("/icons/assets/lyflineHeart.svg")',
                  WebkitMaskImage: 'url("/icons/assets/lyflineHeart.svg")',
                }}
                className="absolute bottom-0 right-0 size-20 md:size-[100px] pointer-events-none select-none bg-[#4D7CBC] mask-contain mask-no-repeat mask-center shrink-0"
                aria-hidden="true"
              />

              <div className="self-stretch flex flex-col justify-start items-start gap-4">
                {otherArticles.map((other) => (
                  <Link
                    href={`/articles/${other.id}`}
                    key={other.id}
                    className="self-stretch p-3 bg-white rounded-3xl inline-flex justify-start items-center gap-3 transition-all group"
                  >
                    <div className="size-20 relative rounded-3xl overflow-hidden border border-gray-200 shrink-0">
                      <Image
                        src={other.imageUrl}
                        alt={other.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        sizes="80px"
                      />
                    </div>
                    <div className="flex-grow flex flex-col justify-center items-start gap-2 overflow-hidden group-hover:ml-1">
                      <Badge
                        text={other.category}
                        variant={other.categoryVariant}
                        showDot={true}
                        className="scale-90 origin-left"
                      />
                      <h4 className="self-stretch text-neutral-900 text-sm font-normal font-poppins line-clamp-2 leading-snug group-hover:ml-1 transition-all">
                        {other.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>

              {/* View All Articles CTA */}
              <Link href="/articles" className="w-full mt-2">
                <Button
                  variant="outline-white"
                  text="View All Articles"
                  rightIcon="Right 1"
                  className="text-base font-semibold font-poppins border-white hover:bg-white/10 active:scale-95 transition-all text-white"
                />
              </Link>
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

        <span
          style={{
            maskImage: 'url("/icons/assets/lyflineQuarterCircle.svg")',
            WebkitMaskImage: 'url("/icons/assets/lyflineQuarterCircle.svg")',
          }}
          className="mt-20 absolute top-0 left-0 size-180 md:size-[100px] pointer-events-none select-none opacity-10 bg-red-600/50 mask-contain mask-no-repeat mask-center shrink-0"
          aria-hidden="true"
        />

      </main>

      <Footer />
    </div>
  );
}
