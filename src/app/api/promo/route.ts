import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("settings")
      .select("key, value")
      .in("key", ["promo_image_url", "promo_destination_link"]);

    if (error) {
      console.error("Supabase error fetching settings:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const settingsMap = (data || []).reduce((acc, item) => {
      acc[item.key] = item.value;
      return acc;
    }, {} as Record<string, string>);

    return NextResponse.json({
      imageUrl: settingsMap["promo_image_url"] || null,
      destinationLink: settingsMap["promo_destination_link"] || null,
    });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error("API error fetching promo settings:", error);
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
