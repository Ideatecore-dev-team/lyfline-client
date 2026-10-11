import { supabase } from "@/lib/supabase";

export interface PromoResponse {
  imageUrl: string | null;
  destinationLink: string | null;
}

export async function fetchPromoData(): Promise<PromoResponse> {
  try {
    const { data, error } = await supabase
      .from("settings")
      .select("key, value")
      .in("key", ["promo_image_url", "promo_destination_link"]);

    if (error) {
      console.error("Supabase error fetching settings:", error);
      return { imageUrl: null, destinationLink: null };
    }

    const settingsMap = (data || []).reduce((acc, item: { key: string; value: string }) => {
      acc[item.key] = item.value;
      return acc;
    }, {} as Record<string, string>);

    return {
      imageUrl: settingsMap["promo_image_url"] || null,
      destinationLink: settingsMap["promo_destination_link"] || null,
    };
  } catch (err) {
    console.error("Error fetching promo settings:", err);
    return { imageUrl: null, destinationLink: null };
  }
}
