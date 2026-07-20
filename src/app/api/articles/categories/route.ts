import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("articles")
      .select("category");

    if (error) {
      console.error("Supabase error fetching categories:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const categories = Array.from(
      new Set(
        (data || [])
          .map((item: { category?: string }) => item.category)
          .filter(Boolean) as string[]
      )
    );

    return NextResponse.json(categories);
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error("API error fetching categories:", error);
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
