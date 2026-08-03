"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { type Article, type ArticleSection } from "@/data/articlesData";
import DOMPurify from "dompurify";
import { slugify } from "@/lib/utils";
import { isVideoUrl } from "@/lib/media";
import { useLanguage } from "@/context/LanguageContext";

interface ArticleClientProps {
  article: Article;
  otherArticles: Article[];
}

export default function ArticleClient({ article, otherArticles }: ArticleClientProps) {
  const { lang } = useLanguage();

  // Select content based on language — no translation API needed
  const isIndonesian = lang === "id";

  const displayTitle = isIndonesian && article.titleIndonesia
    ? article.titleIndonesia
    : article.title;

  // For HTML-based articles: use article_content_indonesia if available and language is Indonesian
  const displayHtml = isIndonesian && article.htmlContentId
    ? article.htmlContentId
    : article.htmlContent;

  // For structured articles: use Indonesian sections/intro if available
  const displayIntro = isIndonesian && article.introId && article.introId.length > 0
    ? article.introId
    : article.intro;

  const displaySections = isIndonesian && article.sectionsId && article.sectionsId.length > 0
    ? article.sectionsId
    : article.sections;

  const sanitizedHtml = useMemo(() => {
    const htmlToSanitize = displayHtml || "";
    if (typeof window !== "undefined") {
      return DOMPurify.sanitize(htmlToSanitize);
    }
    return htmlToSanitize;
  }, [displayHtml]);

  return (
    <main className="grow pt-[80px] w-full flex flex-col justify-start items-center relative">
      <div className="w-full max-w-[1440px] px-6 md:px-16 lg:px-24 xl:px-36 py-16 bg-white flex flex-col justify-start items-start gap-8 relative">

        {/* Back button */}
        <Link href="/articles">
          <Button
            variant="ghost-black"
            text={lang === "en" ? "Back to Articles" : "Kembali ke Artikel"}
            leftIcon="Left 1"
            className="font-poppins text-base font-medium"
          />
        </Link>

        {/* Dynamic Content View */}
        <>
          {/* Title and Metadata */}
          <div className="w-full flex flex-col justify-start items-start gap-3">
            <h1 className="self-stretch justify-start text-primary text-2xl md:text-3xl font-semibold font-poppins leading-tight">
              {displayTitle}
            </h1>
            <div className="flex justify-start items-center gap-3">
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
                <span className="justify-start text-primary text-sm font-normal font-poppins">{article.date}</span>
              </div>

              {/* Category Badge(s) */}
              {article.categories && article.categories.length > 0 ? (
                <div className="flex items-center flex-wrap gap-1.5">
                  {article.categories.map((cat, i) => (
                    <Badge
                      key={`cat-${i}`}
                      text={cat}
                      variant={article.categoryVariant}
                      customColor={
                        article.categoryColors && article.categoryColors[i]
                          ? article.categoryColors[i]
                          : article.customColor
                      }
                      showDot={true}
                    />
                  ))}
                </div>
              ) : (
                <Badge
                  text={article.category}
                  variant={article.categoryVariant}
                  customColor={article.customColor}
                  showDot={true}
                />
              )}
            </div>
          </div>

          {/* Main Layout Grid */}
          <div className="w-full flex flex-col lg:flex-row justify-start items-start gap-8">

            {/* Main Article Content */}
            <div className="flex-1 min-w-0 w-full flex flex-col justify-start items-start gap-6">

              {/* Cover Image Container */}
              <div className="self-stretch h-64 md:h-96 relative rounded-3xl overflow-hidden border-2 border-gray-200 bg-linear-to-b from-blue-800/20 to-blue-800/40 flex items-center justify-center">
                {article.imageUrl ? (
                  <>
                    {isVideoUrl(article.imageUrl) ? (
                      <video
                        src={article.imageUrl}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover animate-fade-in"
                      />
                    ) : (
                      <Image
                        src={article.imageUrl}
                        alt={displayTitle}
                        fill
                        className="object-cover animate-fade-in"
                        sizes="(max-width: 1024px) 100vw, 800px"
                        priority
                      />
                    )}
                    {/* Brand suit gradient overlay */}
                    <div className="absolute inset-0 bg-linear-to-b from-blue-800/0 to-blue-800/30 pointer-events-none mix-blend-multiply" />
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-red-500/10 to-blue-500/10">
                    <span className="text-slate-400 font-poppins text-sm md:text-base">Lyfline Healthcare</span>
                  </div>
                )}
              </div>

              {/* Formatted Article Body */}
              <div className="self-stretch flex flex-col gap-6 text-neutral-900 text-base font-normal font-poppins text-justify leading-relaxed">
                {displayHtml ? (
                  <div
                    className="article-rich-content"
                    dangerouslySetInnerHTML={{ __html: sanitizedHtml || "" }}
                  />
                ) : (
                  <>
                    {displayIntro && displayIntro.map((p, i) => (
                      <p key={`intro-${i}`}>{p}</p>
                    ))}

                    {displaySections && displaySections.map((section, idx) => (
                      <div key={`section-${idx}`} className="flex flex-col gap-3 w-full">
                        {section.heading && (
                          <h2 className="text-[slate-800] text-lg md:text-xl font-semibold font-poppins mt-4 mb-1">
                            {section.heading}
                          </h2>
                        )}
                        {section.paragraphs && section.paragraphs.map((p, pi) => (
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

                    {article.references && article.references.length > 0 && (
                      <div className="flex flex-col gap-3 w-full mt-8 border-t border-gray-100 pt-6">
                        <h3 className="text-slate-800 text-base font-semibold font-poppins mb-1">
                          {lang === "en" ? "References" : "Referensi"}
                        </h3>
                        <ul className="list-decimal pl-6 text-xs text-neutral-500 flex flex-col gap-1.5 break-all">
                          {article.references.map((ref, idx) => (
                            <li key={`ref-${idx}`}>
                              {ref.startsWith("http") ? (
                                <a href={ref} target="_blank" rel="noopener noreferrer" className="hover:text-primary underline break-all">
                                  {ref}
                                </a>
                              ) : (
                                ref
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Sidebar - Other Newest Articles */}
            <div className="w-full lg:w-[384px] p-6 bg-primary rounded-[32px] flex flex-col justify-start items-start gap-6 overflow-hidden shadow-lg shrink-0 relative lg:sticky lg:top-[104px]">
              <div className="justify-start text-white text-sm font-poppins tracking-wider">
                {lang === "en" ? "OTHER NEWEST ARTICLE" : "ARTIKEL TERBARU LAINNYA"}
              </div>

              <span
                style={{
                  maskImage: 'url("/icons/assets/lyflineHeart.svg")',
                  WebkitMaskImage: 'url("/icons/assets/lyflineHeart.svg")',
                }}
                className="absolute bottom-0 right-0 size-20 md:size-[100px] pointer-events-none select-none bg-primary-accent mask-contain mask-no-repeat mask-center shrink-0"
                aria-hidden="true"
              />

              <div className="self-stretch flex flex-col justify-start items-start gap-4 z-10">
                {otherArticles.length > 0 ? (
                  otherArticles.map((other) => (
                    <Link
                      href={`/articles/${other.slug || slugify(other.title)}`}
                      key={other.id}
                      className="self-stretch p-3 bg-white rounded-3xl inline-flex justify-start items-center gap-3 transition-all group w-full"
                    >
                      <div className="size-20 relative rounded-3xl overflow-hidden border border-gray-200 shrink-0 bg-linear-to-b from-blue-800/20 to-blue-800/40">
                        {other.imageUrl ? (
                          isVideoUrl(other.imageUrl) ? (
                            <video
                              src={other.imageUrl}
                              autoPlay
                              loop
                              muted
                              playsInline
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                          ) : (
                            <Image
                              src={other.imageUrl}
                              alt={other.title}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-110"
                              sizes="80px"
                            />
                          )
                        ) : null}
                      </div>
                      <div className="grow flex flex-col justify-center items-start gap-2 overflow-hidden group-hover:ml-1">
                       {/* Category badge(s) for sidebar article */}
                        {other.categories && other.categories.length > 0 ? (
                          <div className="flex items-center flex-wrap gap-1">
                            {other.categories.map((cat, i) => (
                              <Badge
                                key={`sidebar-cat-${i}`}
                                text={cat}
                                variant={other.categoryVariant}
                                customColor={
                                  other.categoryColors && other.categoryColors[i]
                                    ? other.categoryColors[i]
                                    : other.customColor
                                }
                                showDot={true}
                                className="scale-90 origin-left"
                              />
                            ))}
                          </div>
                        ) : (
                          <Badge
                            text={other.category}
                            variant={other.categoryVariant}
                            customColor={other.customColor}
                            showDot={true}
                            className="scale-90 origin-left"
                          />
                        )}
                        <h4 className="self-stretch text-neutral-900 text-sm font-normal font-poppins line-clamp-2 leading-snug group-hover:ml-1 transition-all">
                          {isIndonesian && other.titleIndonesia ? other.titleIndonesia : other.title}
                        </h4>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="text-white/70 text-sm font-poppins py-4">
                    {lang === "en" ? "No other articles found." : "Artikel lain tidak ditemukan."}
                  </div>
                )}
              </div>

              {/* View All Articles CTA */}
              <Link href="/articles" className="w-full mt-2 z-10">
                <Button
                  variant="outline-white"
                  text={lang === "en" ? "View All Articles" : "Lihat Semua Artikel"}
                  rightIcon="Right 1"
                  className="text-base font-semibold font-poppins border-white hover:bg-white/10 active:scale-95 transition-all text-white w-full"
                />
              </Link>
            </div>

          </div>
        </>
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
        className="mt-20 absolute top-0 left-0 size-[100px] pointer-events-none select-none opacity-10 bg-red-600/50 mask-contain mask-no-repeat mask-center shrink-0"
        aria-hidden="true"
      />

    </main>
  );
}
