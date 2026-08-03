import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { type Partner } from "@/data/partnersData";
import { slugify } from "@/lib/utils";

export interface DbPartner {
  id: string;
  hospital_name: string;
  city: string;
  country: string;
  description: string | null;
  description_indonesia: string | null;
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
    descriptionIndonesia: dbPartner.description_indonesia || "",
    mapsUrl: dbPartner.google_maps_link || "",
    logoUrl: dbPartner.hospital_logo || undefined,
    images: dbPartner.hospital_images || []
  };
}

// Memory cache for partner ID -> unique slug mapping
let partnerSlugCache: Promise<Map<string, string>> | null = null;
let lastPartnerCacheTime = 0;
const CACHE_TTL = 60 * 1000; // 60 seconds

export function getPartnerSlugMap(): Promise<Map<string, string>> {
  const now = Date.now();
  if (!partnerSlugCache || now - lastPartnerCacheTime > CACHE_TTL) {
    lastPartnerCacheTime = now;
    partnerSlugCache = (async () => {
      const { data, error } = await supabase
        .from("partners")
        .select("id, hospital_name")
        .order("created_at", { ascending: true });

      const slugMap = new Map<string, string>();
      if (error || !data) return slugMap;

      const slugCounts = new Map<string, number>();
      for (const row of data) {
        const baseSlug = slugify(row.hospital_name);
        const count = slugCounts.get(baseSlug) || 0;
        if (count === 0) {
          slugMap.set(row.id, baseSlug);
        } else {
          slugMap.set(row.id, `${baseSlug}-${count + 1}`);
        }
        slugCounts.set(baseSlug, count + 1);
      }
      return slugMap;
    })();
  }
  return partnerSlugCache;
}

export async function resolvePartnerByIdOrSlug(idOrSlug: string): Promise<DbPartner | null> {
  const isUuid = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(idOrSlug);

  if (isUuid) {
    const { data: partner } = await supabase
      .from("partners")
      .select("*")
      .eq("id", idOrSlug)
      .maybeSingle();
    return (partner as DbPartner) || null;
  }

  // Otherwise, resolve as slug
  let baseSlug = idOrSlug;
  let suffixIndex = 0;

  const suffixMatch = idOrSlug.match(/-(\d+)$/);
  if (suffixMatch) {
    const num = parseInt(suffixMatch[1], 10);
    if (num > 1) {
      suffixIndex = num - 1;
      baseSlug = idOrSlug.slice(0, -suffixMatch[0].length);
    }
  }

  const words: string[] = [];
  const rawWords = baseSlug.split("-");
  for (const word of rawWords) {
    const lower = word.toLowerCase();
    if (lower.length <= 1) {
      continue;
    }
    words.push(word);
    if (words.length >= 2) {
      break;
    }
  }

  if (words.length === 0) {
    words.push(baseSlug);
  }

  let dbQuery = supabase
    .from("partners")
    .select("*")
    .order("created_at", { ascending: true });

  for (const word of words) {
    dbQuery = dbQuery.ilike("hospital_name", `%${word}%`);
  }

  const { data: partners } = await dbQuery;
  if (!partners || partners.length === 0) return null;

  const candidates = partners.filter((p) => slugify(p.hospital_name) === baseSlug);
  if (candidates.length > suffixIndex) {
    return (candidates[suffixIndex] as DbPartner) || null;
  }

  return null;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit");
    const page = searchParams.get("page");

    const pageVal = page ? parseInt(page, 10) : undefined;
    const limitVal = limit ? parseInt(limit, 10) : undefined;

    let query = supabase
      .from("partners")
      .select("*", { count: pageVal !== undefined ? "exact" : undefined })
      .order("hospital_name", { ascending: true });

    if (pageVal !== undefined && limitVal !== undefined) {
      const from = (pageVal - 1) * limitVal;
      const to = pageVal * limitVal - 1;
      query = query.range(from, to);
    } else if (limitVal !== undefined) {
      query = query.limit(limitVal);
    }

    const { data: partners, count, error } = await query;

    if (error) {
      console.error("Supabase error fetching partners:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const slugMap = await getPartnerSlugMap();
    const formattedPartners = (partners || []).map((p: unknown) => {
      const dbPartner = p as DbPartner;
      const mapped = mapDbPartnerToPartner(dbPartner);
      mapped.slug = slugMap.get(dbPartner.id) || slugify(dbPartner.hospital_name);
      return mapped;
    });

    if (pageVal !== undefined) {
      const effectiveLimit = limitVal || 10;
      const total = count || 0;
      const totalPages = Math.ceil(total / effectiveLimit) || 1;

      return NextResponse.json({
        data: formattedPartners,
        meta: {
          total,
          page: pageVal,
          limit: effectiveLimit,
          totalPages,
        },
      });
    }

    return NextResponse.json(formattedPartners);
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error("API error fetching partners:", error);
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}

