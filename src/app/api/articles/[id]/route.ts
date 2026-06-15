import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { mapDbArticleToArticle, type DbArticle } from "../route";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;

    const { data: article, error } = await supabase
      .from("articles")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.error(`Supabase error fetching article ${id}:`, error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    const { data: fileList } = await supabase.storage
      .from("Lyfline Files")
      .list("Articles/Banner");

    const formattedArticle = mapDbArticleToArticle(article as DbArticle, fileList || []);
    return NextResponse.json(formattedArticle);
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error(`API error fetching article:`, error);
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
