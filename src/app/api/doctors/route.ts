import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { type Doctor } from "@/data/doctorsData";
import { slugify } from "@/lib/utils";

export interface DbDoctor {
  id: string;
  hospital_id: string;
  doctor_name: string;
  doctor_title: string;
  doctor_specialty: string[];
  doctor_qualification: string[];
  doctor_language: string[];
  description?: string;
  description_indonesia?: string;
  type?: string;
  created_at: string;
  updated_at: string;
  avatarUrl?: string | null;
  partners: {
    hospital_name: string;
    city?: string;
    country: string;
    address?: string;
  } | {
    hospital_name: string;
    city?: string;
    country: string;
    address?: string;
  }[] | null;
}

export function mapDbDoctorToDoctor(dbDoctor: DbDoctor, fileList?: { name: string }[]): Doctor {
  let imageUrl: string | undefined = dbDoctor.avatarUrl || undefined;

  // Find doctor photo in Supabase storage: "Doctors/<id>_photo_<timestamp>.ext" (fallback for legacy doctors)
  if (!imageUrl && fileList && fileList.length > 0) {
    const matchingFile = fileList.find((f) => f.name.startsWith(dbDoctor.id));
    if (matchingFile) {
      const { data } = supabase.storage
        .from("Lyfline Files")
        .getPublicUrl(`Doctors/${matchingFile.name}`);
      imageUrl = data.publicUrl;
    }
  }

  const partnerObj = Array.isArray(dbDoctor.partners)
    ? dbDoctor.partners[0]
    : dbDoctor.partners;

  return {
    id: dbDoctor.id,
    hospital_id: dbDoctor.hospital_id,
    name: dbDoctor.doctor_name,
    title: dbDoctor.doctor_title,
    specialty: dbDoctor.doctor_specialty || [],
    qualification: dbDoctor.doctor_qualification || [],
    language: dbDoctor.doctor_language || [],
    hospital: partnerObj?.hospital_name ?? undefined,
    region: partnerObj?.country ?? undefined,
    city: partnerObj?.city ?? undefined,
    address: partnerObj?.address ?? undefined,
    imageUrl,
    description: dbDoctor.description || "",
    descriptionIndonesia: dbDoctor.description_indonesia || "",
    type: dbDoctor.type || "new",
  };
}

function getSearchTerms(query: string): string[] {
  const terms = new Set<string>();
  
  // 1. Normalize spaces
  let normalized = query.replace(/\s+/g, " ").trim();
  
  // 2. Insert space after a dot following common titles if missing (e.g. "dr.abraham" -> "dr. abraham")
  normalized = normalized.replace(/\b(dr|drg|prof)\.([a-zA-Z])/gi, "$1. $2");
  
  terms.add(normalized);

  // 3. Generate variations for "dr", "drg", "prof" with and without dots
  const titlePatterns = [
    { withDot: /\bdr\./i, withoutDot: /\bdr\b(?!\.)/i },
    { withDot: /\bdrg\./i, withoutDot: /\bdrg\b(?!\.)/i },
    { withDot: /\bprof\./i, withoutDot: /\bprof\b(?!\.)/i },
  ];

  for (const pattern of titlePatterns) {
    if (pattern.withDot.test(normalized)) {
      const withoutDotTerm = normalized.replace(pattern.withDot, (match) => {
        return match.endsWith(".") ? match.slice(0, -1) : match;
      });
      terms.add(withoutDotTerm);
    } else if (pattern.withoutDot.test(normalized)) {
      const withDotTerm = normalized.replace(pattern.withoutDot, (match) => {
        return match + ".";
      });
      terms.add(withDotTerm);
    }
  }

  return Array.from(terms);
}

// Memory cache for doctor ID -> unique slug mapping
let doctorSlugCache: Promise<Map<string, string>> | null = null;
let lastCacheTime = 0;
const CACHE_TTL = 60 * 1000; // 60 seconds

export function getDoctorSlugMap(): Promise<Map<string, string>> {
  const now = Date.now();
  if (!doctorSlugCache || now - lastCacheTime > CACHE_TTL) {
    lastCacheTime = now;
    doctorSlugCache = (async () => {
      const { data, error } = await supabase
        .from("doctors")
        .select("id, doctor_name")
        .order("created_at", { ascending: true });

      const slugMap = new Map<string, string>();
      if (error || !data) return slugMap;

      const slugCounts = new Map<string, number>();
      for (const row of data) {
        const baseSlug = slugify(row.doctor_name);
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
  return doctorSlugCache;
}

const TITLE_EXCLUDES = new Set(["dr", "drg", "prof", "sp", "sd", "h", "hj", "al", "ap"]);

export async function resolveDoctorByIdOrSlug(idOrSlug: string): Promise<DbDoctor | null> {
  const isUuid = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(idOrSlug);

  if (isUuid) {
    const { data: doctor } = await supabase
      .from("doctors")
      .select("*, partners!hospital_id(hospital_name, city, country, address)")
      .eq("id", idOrSlug)
      .maybeSingle();
    return (doctor as DbDoctor) || null;
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
    if (lower === "sp" || (lower.startsWith("sp") && lower.length >= 3)) {
      break;
    }
    if (lower.length <= 1 || TITLE_EXCLUDES.has(lower) || lower === "phd" || lower === "md") {
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
    .from("doctors")
    .select("*, partners!hospital_id(hospital_name, city, country, address)")
    .order("created_at", { ascending: true });

  for (const word of words) {
    dbQuery = dbQuery.ilike("doctor_name", `%${word}%`);
  }

  const { data: doctors } = await dbQuery;
  if (!doctors || doctors.length === 0) return null;

  const candidates = doctors.filter((doc) => slugify(doc.doctor_name) === baseSlug);
  if (candidates.length > suffixIndex) {
    return (candidates[suffixIndex] as DbDoctor) || null;
  }

  return null;
}

import { getPartnerSlugMap } from "../partners/route";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit");
    const page = searchParams.get("page");
    const hospitalId = searchParams.get("hospital_id");
    const search = searchParams.get("search");
    const region = searchParams.get("region");
    const hospital = searchParams.get("hospital");
    const specialty = searchParams.get("specialty");

    const pageVal = page ? parseInt(page, 10) : undefined;
    const limitVal = limit ? parseInt(limit, 10) : undefined;

    const hasPartnerFilter = !!(hospital || region);
    const selectClause = hasPartnerFilter
      ? "*, partners!hospital_id!inner(hospital_name, city, country, address)"
      : "*, partners!hospital_id(hospital_name, city, country, address)";

    let query = supabase
      .from("doctors")
      .select(selectClause, { count: pageVal !== undefined ? "exact" : undefined })
      .order("created_at", { ascending: false });

    if (hospitalId) {
      query = query.eq("hospital_id", hospitalId);
    }
    if (search && search.trim()) {
      const cleanSearch = search.trim().replace(/[,()"']/g, "");
      if (cleanSearch) {
        const searchTerms = getSearchTerms(cleanSearch);
        const conditions = searchTerms.map(
          (term) => `doctor_name.ilike.%${term}%,doctor_title.ilike.%${term}%`
        );
        query = query.or(conditions.join(","));
      }
    }
    if (specialty && specialty.trim()) {
      query = query.contains("doctor_specialty", [specialty.trim()]);
    }
    if (hospital && hospital.trim()) {
      query = query.eq("partners.hospital_name", hospital.trim());
    }
    if (region && region.trim()) {
      query = query.eq("partners.country", region.trim());
    }

    if (pageVal !== undefined && limitVal !== undefined) {
      const from = (pageVal - 1) * limitVal;
      const to = pageVal * limitVal - 1;
      query = query.range(from, to);
    } else if (limitVal !== undefined) {
      query = query.limit(limitVal);
    }

    const { data: doctors, count, error } = await query;

    if (error) {
      console.error("Supabase error fetching doctors:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Fetch doctor photo file list from storage
    const { data: fileList } = await supabase.storage
      .from("Lyfline Files")
      .list("Doctors");

    const slugMap = await getDoctorSlugMap();
    const partnerSlugMap = await getPartnerSlugMap();
    const formattedDoctors = (doctors || []).map((doc: unknown) => {
      const dbDoc = doc as DbDoctor;
      const mapped = mapDbDoctorToDoctor(dbDoc, fileList || []);
      mapped.slug = slugMap.get(dbDoc.id) || slugify(dbDoc.doctor_name);
      mapped.hospitalSlug = dbDoc.hospital_id ? partnerSlugMap.get(dbDoc.hospital_id) : undefined;
      return mapped;
    });

    if (pageVal !== undefined) {
      const effectiveLimit = limitVal || 10;
      const total = count || 0;
      const totalPages = Math.ceil(total / effectiveLimit) || 1;

      return NextResponse.json({
        data: formattedDoctors,
        meta: {
          total,
          page: pageVal,
          limit: effectiveLimit,
          totalPages,
        },
      });
    }

    return NextResponse.json(formattedDoctors);
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error("API error fetching doctors:", error);
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}

