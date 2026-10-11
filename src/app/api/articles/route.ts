import { NextResponse } from "next/server";
import {
  queryArticles,
  mapDbArticleToArticle,
  resolveArticleByIdOrSlug,
  getArticleSlugMap,
  type DbArticle,
  type FetchArticlesOptions,
} from "@/lib/articlesQuery";

export { mapDbArticleToArticle, resolveArticleByIdOrSlug, getArticleSlugMap, type DbArticle };

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit");
    const page = searchParams.get("page");
    const exclude = searchParams.get("exclude") || undefined;
    const search = searchParams.get("search") || undefined;
    const category = searchParams.get("category") || undefined;

    const pageVal = page ? parseInt(page, 10) : undefined;
    const limitVal = limit ? parseInt(limit, 10) : undefined;

    const options: FetchArticlesOptions = {
      page: pageVal,
      limit: limitVal,
      exclude,
      search,
      category,
    };

    const result = await queryArticles(options);
    return NextResponse.json(result);
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error("API error fetching articles:", error);
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
