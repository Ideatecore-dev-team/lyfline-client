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
    images: dbPartner.hospital_images || [],
  };
}

let partnerSlugCache: Promise<Map<string, string>> | null = null;
let lastPartnerCacheTime = 0;
const CACHE_TTL = 60 * 1000;

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

  const slugMap = await getPartnerSlugMap();
  for (const [partId, partSlug] of slugMap.entries()) {
    if (partSlug === idOrSlug) {
      const { data: partner } = await supabase
        .from("partners")
        .select("*")
        .eq("id", partId)
        .maybeSingle();
      if (partner) return (partner as DbPartner) || null;
    }
  }

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
    if (lower.length <= 1) continue;
    words.push(word);
    if (words.length >= 2) break;
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
  if (partners && partners.length > 0) {
    const candidates = partners.filter((p) => slugify(p.hospital_name) === baseSlug);
    if (candidates.length > suffixIndex) {
      return (candidates[suffixIndex] as DbPartner) || null;
    }
  }

  const { data: allPartners } = await supabase
    .from("partners")
    .select("*")
    .order("created_at", { ascending: true });

  if (allPartners && allPartners.length > 0) {
    const matched = allPartners.find((p) => {
      const currentSlug = slugify(p.hospital_name);
      return currentSlug === idOrSlug || currentSlug === baseSlug;
    });
    if (matched) return (matched as DbPartner) || null;
  }

  return null;
}

export interface FetchPartnersOptions {
  page?: number;
  limit?: number;
}

export interface PaginatedPartnersResponse {
  data: Partner[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export async function queryPartners(
  options: FetchPartnersOptions = {}
): Promise<Partner[] | PaginatedPartnersResponse> {
  const { page, limit } = options;

  let query = supabase
    .from("partners")
    .select("*", { count: page !== undefined ? "exact" : undefined })
    .order("hospital_name", { ascending: true });

  if (page !== undefined && limit !== undefined) {
    const from = (page - 1) * limit;
    const to = page * limit - 1;
    query = query.range(from, to);
  } else if (limit !== undefined) {
    query = query.limit(limit);
  }

  const { data: partners, count, error } = await query;
  if (error) {
    throw new Error(`Supabase error fetching partners: ${error.message}`);
  }

  const slugMap = await getPartnerSlugMap();
  const formattedPartners = (partners || []).map((p: unknown) => {
    const dbPartner = p as DbPartner;
    const mapped = mapDbPartnerToPartner(dbPartner);
    mapped.slug = slugMap.get(dbPartner.id) || slugify(dbPartner.hospital_name);
    return mapped;
  });

  if (page !== undefined) {
    const effectiveLimit = limit || 10;
    const total = count || 0;
    const totalPages = Math.ceil(total / effectiveLimit) || 1;

    return {
      data: formattedPartners,
      meta: {
        total,
        page,
        limit: effectiveLimit,
        totalPages,
      },
    };
  }

  return formattedPartners;
}

export async function queryPartnerById(id: string): Promise<Partner> {
  const partner = await resolvePartnerByIdOrSlug(id);
  if (!partner) {
    throw new Error(`Partner not found: ${id}`);
  }

  const formattedPartner = mapDbPartnerToPartner(partner);
  const slugMap = await getPartnerSlugMap();
  formattedPartner.slug = slugMap.get(partner.id) || slugify(partner.hospital_name);
  return formattedPartner;
}
