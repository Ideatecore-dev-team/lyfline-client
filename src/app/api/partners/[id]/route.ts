import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { mapDbPartnerToPartner, resolvePartnerByIdOrSlug, getPartnerSlugMap, type DbPartner } from "../route";
import { slugify } from "@/lib/utils";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, context: RouteContext) {
  try {
    const rawId = (await context.params).id;
    const partner = await resolvePartnerByIdOrSlug(rawId);

    if (!partner) {
      return NextResponse.json({ error: "Partner not found" }, { status: 404 });
    }

    const formattedPartner = mapDbPartnerToPartner(partner);
    const slugMap = await getPartnerSlugMap();
    formattedPartner.slug = slugMap.get(partner.id) || slugify(partner.hospital_name);

    return NextResponse.json(formattedPartner);
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error(`API error fetching partner:`, error);
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
