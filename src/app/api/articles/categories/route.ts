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

    const categoriesSet = new Set<string>();
    (data || []).forEach((item: { category?: string | string[] }) => {
      if (!item.category) return;
      if (Array.isArray(item.category)) {
        item.category.forEach((cat) => {
          if (cat && typeof cat === "string") {
            categoriesSet.add(cat.trim());
          }
        });
      } else if (typeof item.category === "string") {
        const val = item.category.trim();
        if (val.startsWith("[") && val.endsWith("]")) {
          try {
            const parsed = JSON.parse(val);
            if (Array.isArray(parsed)) {
              parsed.forEach((cat) => {
                if (cat && typeof cat === "string") {
                  categoriesSet.add(cat.trim());
                }
              });
              return;
            }
          } catch {}
        }
        categoriesSet.add(val);
      }
    });

    const categories = Array.from(categoriesSet).sort();

    return NextResponse.json(categories);
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error("API error fetching categories:", error);
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
