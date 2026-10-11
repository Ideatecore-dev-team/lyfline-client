import { NextResponse } from "next/server";
import {
  queryPartners,
  mapDbPartnerToPartner,
  resolvePartnerByIdOrSlug,
  getPartnerSlugMap,
  type DbPartner,
  type FetchPartnersOptions,
} from "@/lib/partnersQuery";

export { mapDbPartnerToPartner, resolvePartnerByIdOrSlug, getPartnerSlugMap, type DbPartner };

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit");
    const page = searchParams.get("page");

    const pageVal = page ? parseInt(page, 10) : undefined;
    const limitVal = limit ? parseInt(limit, 10) : undefined;

    const options: FetchPartnersOptions = {
      page: pageVal,
      limit: limitVal,
    };

    const result = await queryPartners(options);
    return NextResponse.json(result);
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error("API error fetching partners:", error);
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
