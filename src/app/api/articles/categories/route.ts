import { NextResponse } from "next/server";
import { queryArticleCategories } from "@/lib/articlesQuery";

export async function GET() {
  try {
    const categories = await queryArticleCategories();
    return NextResponse.json(categories);
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error("API error fetching categories:", error);
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
