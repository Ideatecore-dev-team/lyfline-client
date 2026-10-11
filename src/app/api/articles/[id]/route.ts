import { NextResponse } from "next/server";
import { queryArticleById } from "@/lib/articlesQuery";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, context: RouteContext) {
  try {
    const rawId = (await context.params).id;
    const formattedArticle = await queryArticleById(rawId);
    return NextResponse.json(formattedArticle);
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    if (errorMsg.includes("not found")) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }
    console.error(`API error fetching article:`, error);
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
