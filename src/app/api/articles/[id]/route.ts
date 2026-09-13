import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { mapDbArticleToArticle, resolveArticleByIdOrSlug, getArticleSlugMap } from "../route";
import { slugify } from "@/lib/utils";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, context: RouteContext) {
  try {
    const rawId = (await context.params).id;
    const article = await resolveArticleByIdOrSlug(rawId);

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    const { data: fileList } = await supabase.storage
      .from("Lyfline Files")
      .list("Articles/Banner");

    const formattedArticle = mapDbArticleToArticle(article, fileList || []);
    const slugMap = await getArticleSlugMap();
    formattedArticle.slug = slugMap.get(article.id) || slugify(article.article_title);

    return NextResponse.json(formattedArticle);
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error(`API error fetching article:`, error);
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
