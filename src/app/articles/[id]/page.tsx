import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import ArticleClient from "./ArticleClient";
import { supabase } from "@/lib/supabase";
import { mapDbArticleToArticle, resolveArticleByIdOrSlug, getArticleSlugMap, type DbArticle } from "@/app/api/articles/route";
import { slugify } from "@/lib/utils";

export const revalidate = 14400;

interface PageProps {
  params: Promise<{ id: string }>;
}

const getBannerFileList = cache(async () => {
  const { data: fileList } = await supabase.storage
    .from("Lyfline Files")
    .list("Articles/Banner");
  return fileList || [];
});

const getArticleData = cache(async (slug: string) => {
  const article = await resolveArticleByIdOrSlug(slug);

  if (!article) {
    return null;
  }

  const fileList = await getBannerFileList();
  const formatted = mapDbArticleToArticle(article, fileList);
  const slugMap = await getArticleSlugMap();
  formatted.slug = slugMap.get(formatted.id) || slugify(formatted.title);
  return formatted;
});

const getOtherArticles = cache(async (excludeId: string) => {
  const { data: articles } = await supabase
    .from("articles")
    .select("*")
    .neq("id", excludeId)
    .order("created_at", { ascending: false })
    .limit(3);

  const fileList = await getBannerFileList();
  const slugMap = await getArticleSlugMap();

  return (articles || []).map((art: DbArticle) => {
    const mapped = mapDbArticleToArticle(art as DbArticle, fileList);
    mapped.slug = slugMap.get(mapped.id) || slugify(mapped.title);
    return mapped;
  });
});

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { id } = await params;
  const article = await getArticleData(id);

  if (!article) {
    return {
      title: "Article Not Found | Lyfline",
    };
  }

  return {
    title: `${article.title} | Lyfline`,
    description: article.intro?.[0] || article.title,
    openGraph: {
      title: article.title,
      description: article.intro?.[0] || article.title,
      images: article.imageUrl ? [{ url: article.imageUrl }] : [],
    },
  };
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { id } = await params;

  const article = await getArticleData(id);
  if (!article) {
    notFound();
  }

  const otherArticles = await getOtherArticles(article.id);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    image: article.imageUrl ? [article.imageUrl] : [],
    datePublished: article.date,
    author: {
      "@type": "Organization",
      name: "LYFLINE",
      url: process.env.NEXT_PUBLIC_SITE_URL || "https://lyfline.id",
    },
    publisher: {
      "@type": "Organization",
      name: "LYFLINE",
      logo: {
        "@type": "ImageObject",
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://lyfline.id"}/logoIcon.webp`,
      },
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NavBar />
      <ArticleClient article={article} otherArticles={otherArticles} />
      <Footer />
    </div>
  );
}
