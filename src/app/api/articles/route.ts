import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { type BadgeVariant } from "@/components/Badge";
import { type Article, type ArticleSection } from "@/data/articlesData";

export interface DbArticle {
  id: string;
  article_title: string;
  category: string;
  category_color: string;
  article_content: string;
  created_at: string;
  updated_at: string;
}

function getNearestVariant(hex: string): BadgeVariant {
  const normalized = (hex || "").toLowerCase().trim();
  const validVariants: BadgeVariant[] = ["green", "red", "blue", "yellow", "purple", "gray", "indigo", "orange"];
  if (validVariants.includes(normalized as BadgeVariant)) {
    return normalized as BadgeVariant;
  }
  const cleanHex = normalized.replace("#", "");
  if (cleanHex === "000000" || cleanHex === "ffffff") return "gray";
  return "green";
}

function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    const months = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  } catch {
    return dateString;
  }
}

export function mapDbArticleToArticle(dbArticle: DbArticle, fileList?: any[]): Article {
  let htmlContent: string | undefined = undefined;
  let intro: string[] = [];
  let sections: ArticleSection[] = [];
  let references: string[] = [];
  let imageUrl = "";
  let readTime = "";

  const content = dbArticle.article_content || "";

  try {
    const parsed = JSON.parse(content);
    intro = parsed.intro || [];
    sections = parsed.sections || [];
    references = parsed.references || [];
    imageUrl = parsed.imageUrl || "";
    readTime = parsed.readTime || "";
    if (parsed.html) {
      htmlContent = parsed.html;
    }
  } catch {
    // Treat the entire content as raw HTML (e.g. from Quill rich text editor)
    htmlContent = content;

    // Split text without tags for a fallback preview inside grid list cards
    const cleanText = content.replace(/<[^>]*>/g, " ").trim();
    const paragraphs = cleanText.split(/\n\s*\n/).map((p: string) => p.trim()).filter(Boolean);
    
    if (paragraphs.length > 0) {
      intro = [paragraphs[0]];
    }

    const wordCount = cleanText.split(/\s+/).length;
    readTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;
  }

  // Find banner image in Supabase storage if fileList is provided
  if (fileList && fileList.length > 0) {
    const matchingFile = fileList.find(f => f.name.startsWith(`${dbArticle.id}_banner_`));
    if (matchingFile) {
      const { data } = supabase.storage
        .from("Lyfline Files")
        .getPublicUrl(`Articles/Banner/${matchingFile.name}`);
      imageUrl = data.publicUrl;
    }
  }

  return {
    id: dbArticle.id,
    title: dbArticle.article_title,
    date: formatDate(dbArticle.created_at),
    category: dbArticle.category,
    categoryVariant: getNearestVariant(dbArticle.category_color || "#000000"),
    customColor: dbArticle.category_color,
    imageUrl: imageUrl,
    readTime: readTime,
    intro: intro,
    sections: sections,
    references: references,
    htmlContent: htmlContent
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit");
    const exclude = searchParams.get("exclude");

    let query = supabase
      .from("articles")
      .select("*")
      .order("created_at", { ascending: false });

    if (exclude) {
      query = query.neq("id", exclude);
    }

    if (limit) {
      const limitVal = parseInt(limit, 10);
      if (!isNaN(limitVal)) {
        query = query.limit(limitVal);
      }
    }

    const { data: articles, error } = await query;

    if (error) {
      console.error("Supabase error fetching articles:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { data: fileList } = await supabase.storage
      .from("Lyfline Files")
      .list("Articles/Banner");

    const formattedArticles = (articles || []).map((art: unknown) => 
      mapDbArticleToArticle(art as DbArticle, fileList || [])
    );

    return NextResponse.json(formattedArticles);
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error("API error fetching articles:", error);
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
