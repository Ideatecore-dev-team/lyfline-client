import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { type Partner } from "@/data/partnersData";

export interface DbPartner {
  id: string;
  hospital_name: string;
  city: string;
  country: string;
  description: string | null;
  contact: string | null;
  email: string | null;
  address: string;
  hospital_logo: string | null;
  hospital_images: string[] | null;
  google_maps_link: string | null;
  created_at: string;
  updated_at: string;
}

export function mapDbPartnerToPartner(dbPartner: DbPartner): Partner {
  return {
    id: dbPartner.id,
    name: dbPartner.hospital_name,
    location: `${dbPartner.city}, ${dbPartner.country}`,
    country: dbPartner.country,
    phone: dbPartner.contact || "",
    email: dbPartner.email || "",
    address: dbPartner.address,
    description: dbPartner.description || "",
    mapsUrl: dbPartner.google_maps_link || "",
    logoUrl: dbPartner.hospital_logo || undefined,
    images: dbPartner.hospital_images || []
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit");

    let query = supabase
      .from("partners")
      .select("*")
      .order("hospital_name", { ascending: true });

    if (limit) {
      const limitVal = parseInt(limit, 10);
      if (!isNaN(limitVal)) {
        query = query.limit(limitVal);
      }
    }

    const { data: partners, error } = await query;

    if (error) {
      console.error("Supabase error fetching partners:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const formattedPartners = (partners || []).map((p: unknown) => mapDbPartnerToPartner(p as DbPartner));

    return NextResponse.json(formattedPartners);
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error("API error fetching partners:", error);
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
