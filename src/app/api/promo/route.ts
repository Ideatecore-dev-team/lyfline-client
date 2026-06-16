import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data: fileList, error } = await supabase.storage
      .from("Lyfline Files")
      .list("Promo Image", {
        sortBy: { column: "name", order: "desc" },
      });

    if (error) {
      console.error("Supabase error fetching promo files:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Filter to only files that start with "promo_"
    const promoFiles = (fileList || []).filter((f) =>
      f.name.startsWith("promo_")
    );

    if (promoFiles.length === 0) {
      return NextResponse.json({ imageUrl: null });
    }

    // Files are sorted by name desc — "promo_<uploadedtime>" so the first is the latest
    const latest = promoFiles[0];

    const { data } = supabase.storage
      .from("Lyfline Files")
      .getPublicUrl(`Promo Image/${latest.name}`);

    return NextResponse.json({ imageUrl: data.publicUrl });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error("API error fetching promo:", error);
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
