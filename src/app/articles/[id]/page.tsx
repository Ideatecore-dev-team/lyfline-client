import { Metadata } from "next";
import { notFound } from "next/navigation";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import ArticleClient from "./ArticleClient";
import { supabase } from "@/lib/supabase";
import { mapDbArticleToArticle, type DbArticle } from "@/app/api/articles/route";
import { extractIdFromSlug } from "@/lib/utils";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getArticleData(slug: string) {
  const id = extractIdFromSlug(slug);

  const { data: article, error } = await supabase
    .from("articles")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !article) {
    return null;
  }

  const { data: fileList } = await supabase.storage
    .from("Lyfline Files")
    .list("Articles/Banner");

  return mapDbArticleToArticle(article as DbArticle, fileList || []);
}

async function getOtherArticles(excludeId: string) {
  const { data: articles } = await supabase
    .from("articles")
    .select("*")
    .neq("id", excludeId)
    .order("created_at", { ascending: false })
    .limit(3);

  const { data: fileList } = await supabase.storage
    .from("Lyfline Files")
    .list("Articles/Banner");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (articles || []).map((art: any) =>
    mapDbArticleToArticle(art as DbArticle, fileList || [])
  );
}

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

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <NavBar />
      <ArticleClient article={article} otherArticles={otherArticles} />
      <Footer />
    </div>
  );
}
