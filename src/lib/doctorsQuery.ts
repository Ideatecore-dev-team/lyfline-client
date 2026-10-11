import { supabase } from "@/lib/supabase";
import { type Doctor } from "@/data/doctorsData";
import { slugify } from "@/lib/utils";
import { getPartnerSlugMap } from "@/lib/partnersQuery";

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

export function getSearchTerms(query: string): string[] {
  const terms = new Set<string>();

  let normalized = query.replace(/\s+/g, " ").trim();
  normalized = normalized.replace(/\b(dr|drg|prof)\.([a-zA-Z])/gi, "$1. $2");
  terms.add(normalized);

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

let doctorSlugCache: Promise<Map<string, string>> | null = null;
let lastDoctorCacheTime = 0;
const CACHE_TTL = 60 * 1000;

export function getDoctorSlugMap(): Promise<Map<string, string>> {
  const now = Date.now();
  if (!doctorSlugCache || now - lastDoctorCacheTime > CACHE_TTL) {
    lastDoctorCacheTime = now;
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

  const slugMap = await getDoctorSlugMap();
  for (const [docId, docSlug] of slugMap.entries()) {
    if (docSlug === idOrSlug) {
      const { data: doctor } = await supabase
        .from("doctors")
        .select("*, partners!hospital_id(hospital_name, city, country, address)")
        .eq("id", docId)
        .maybeSingle();
      if (doctor) return (doctor as DbDoctor) || null;
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
  if (doctors && doctors.length > 0) {
    const candidates = doctors.filter((doc) => slugify(doc.doctor_name) === baseSlug);
    if (candidates.length > suffixIndex) {
      return (candidates[suffixIndex] as DbDoctor) || null;
    }
  }

  const { data: allDoctors } = await supabase
    .from("doctors")
    .select("*, partners!hospital_id(hospital_name, city, country, address)")
    .order("created_at", { ascending: true });

  if (allDoctors && allDoctors.length > 0) {
    const matched = allDoctors.find((doc) => {
      const currentSlug = slugify(doc.doctor_name);
      const legacySlug = doc.doctor_name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/--+/g, "-");
      return (
        currentSlug === idOrSlug ||
        currentSlug === baseSlug ||
        legacySlug === idOrSlug ||
        legacySlug === baseSlug
      );
    });
    if (matched) return (matched as DbDoctor) || null;
  }

  return null;
}

export interface PriorityRule {
  nameKeywords: string[];
  hospitalKeywords?: string[];
}

export const DEFAULT_PRIORITY_DOCTORS: PriorityRule[] = [
  // 1. Dr. Damian Wong - Island
  { nameKeywords: ["damian", "wong"], hospitalKeywords: ["island"] },
  // 2. Dr. Lee Woo Guan - KPJ Kuching
  { nameKeywords: ["lee", "woo", "guan"], hospitalKeywords: ["kpj", "kuching"] },
  // 3. Dr. Hoe Chee Hoong - Gleneagles Penang
  { nameKeywords: ["hoe", "chee", "hoong"], hospitalKeywords: ["gleneagles", "penang"] },
  // 4. Dr. Lim Seh Guan - Loh Guan Lye
  { nameKeywords: ["lim", "seh", "guan"], hospitalKeywords: ["loh", "guan", "lye"] },
  // 5. Dato Dr. M. Amir Shah - Island
  { nameKeywords: ["amir", "shah"], hospitalKeywords: ["island"] },
  // 6. Dr. Tan Eng Soon - Sunway
  { nameKeywords: ["tan", "eng", "soon"], hospitalKeywords: ["sunway"] },
  // 7. Dr. Shanthi Palaniappan
  { nameKeywords: ["shanthi", "palaniappan"] },
  // 8. Dr. Ibtisam Mokhtar - GKL
  { nameKeywords: ["ibtisam", "mokhtar"], hospitalKeywords: ["gleneagles", "gkl", "kuala lumpur"] },
  // 9. Dr. Paul Yap - GKL
  { nameKeywords: ["paul", "yap"], hospitalKeywords: ["gleneagles", "gkl", "kuala lumpur"] },
  // 10. Dr. Tham Yik Seng - GKL
  { nameKeywords: ["tham", "yik", "seng"], hospitalKeywords: ["gleneagles", "gkl", "kuala lumpur"] },
  // 11. dr. Hendro Adi Kuncoro - Royal
  { nameKeywords: ["hendro", "adi", "kuncoro"], hospitalKeywords: ["royal"] },
  // 12. dr. Charles Hoo - mypda lebak
  { nameKeywords: ["charles", "hoo"], hospitalKeywords: ["mayapada", "mypda", "lebak"] },
  // 13. dr. Novita Tjiang, M.Biomed, Sp.A
  { nameKeywords: ["novita", "tjiang"] },
  // 14. Prof. Dr. dr. Nicolaas C. Budhiparama, PhD, Sp.OT(K), FICS
  { nameKeywords: ["nicolaas", "budhiparama"] },
  // 15. dr. Yoga Yuniadi - Siloam
  { nameKeywords: ["yoga", "yuniadi"], hospitalKeywords: ["siloam"] },
  // 16. dr. Nana Agustina, Sp.OG
  { nameKeywords: ["nana", "agustina"] },
  // 17. dr. Hardianto Setiawan Ong, Sp.PD-KGEH, FINASIM
  { nameKeywords: ["hardianto", "setiawan"] },
  // 18. Prof. Dr. dr. Eka Julianta Wahjoepramono, Sp.BS
  { nameKeywords: ["eka", "julianta", "wahjoepramono"] },
  // 19. Dr. Hsieh Wen-Son
  { nameKeywords: ["hsieh", "wen"] },
  // 20. Dr. Tony Setiobudi
  { nameKeywords: ["tony", "setiobudi"] },
  // 21. Dr. Chou Ning
  { nameKeywords: ["chou", "ning"] },
  // 22. Dr. Lye Wai Choong
  { nameKeywords: ["lye", "wai", "choong"] },
  // 23. dr. Lee Keat Hong - Alvernia
  { nameKeywords: ["lee", "keat", "hong"], hospitalKeywords: ["alvernia"] },
  // 24. Dr. Jerry Chen
  { nameKeywords: ["jerry", "chen"] },
];

export interface FetchDoctorsOptions {
  page?: number;
  limit?: number;
  hospital_id?: string;
  search?: string;
  region?: string;
  hospital?: string;
  specialty?: string;
}

export interface PaginatedDoctorsResponse {
  data: Doctor[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export async function queryDoctors(
  options: FetchDoctorsOptions = {}
): Promise<Doctor[] | PaginatedDoctorsResponse> {
  const { page, limit, hospital_id, search, region, hospital, specialty } = options;

  const hasSearch = !!(search && search.trim());
  const hasSpecialty = !!(specialty && specialty.trim());
  const hasHospital = !!(hospital && hospital.trim());
  const hasRegion = !!(region && region.trim());
  const hasHospitalId = !!hospital_id;

  const isDefaultUnfiltered = !hasSearch && !hasSpecialty && !hasHospital && !hasRegion && !hasHospitalId;

  // 1. Fast path: Default unfiltered list with priority doctors on top
  if (isDefaultUnfiltered) {
    const { data: allDoctors, error } = await supabase
      .from("doctors")
      .select("*, partners!hospital_id(hospital_name, city, country, address)")
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(`Supabase error fetching doctors: ${error.message}`);
    }

    const { data: fileList } = await supabase.storage
      .from("Lyfline Files")
      .list("Doctors");

    const slugMap = await getDoctorSlugMap();
    const partnerSlugMap = await getPartnerSlugMap();
    const formattedDoctors = (allDoctors || []).map((doc: unknown) => {
      const dbDoc = doc as DbDoctor;
      const mapped = mapDbDoctorToDoctor(dbDoc, fileList || []);
      mapped.slug = slugMap.get(dbDoc.id) || slugify(dbDoc.doctor_name);
      mapped.hospitalSlug = dbDoc.hospital_id ? partnerSlugMap.get(dbDoc.hospital_id) : undefined;
      return mapped;
    });

    const assignedDocIds = new Set<string>();
    const docRanks = new Map<string, number>();

    for (let ruleIndex = 0; ruleIndex < DEFAULT_PRIORITY_DOCTORS.length; ruleIndex++) {
      const rule = DEFAULT_PRIORITY_DOCTORS[ruleIndex];
      const match = formattedDoctors.find((doc) => {
        if (assignedDocIds.has(doc.id)) return false;

        const normName = (doc.name || "").toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, " ");
        const normHospital = (doc.hospital || "").toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, " ");

        const nameMatches = rule.nameKeywords.every((kw) => normName.includes(kw.toLowerCase()));
        if (!nameMatches) return false;

        if (rule.hospitalKeywords && rule.hospitalKeywords.length > 0) {
          return rule.hospitalKeywords.some((hkw) => normHospital.includes(hkw.toLowerCase()));
        }

        return true;
      });

      if (match) {
        assignedDocIds.add(match.id);
        docRanks.set(match.id, ruleIndex);
      }
    }

    formattedDoctors.sort((a, b) => {
      const rankA = docRanks.has(a.id) ? docRanks.get(a.id)! : 9999;
      const rankB = docRanks.has(b.id) ? docRanks.get(b.id)! : 9999;
      if (rankA !== rankB) {
        return rankA - rankB;
      }
      return 0;
    });

    if (page !== undefined) {
      const effectiveLimit = limit || 12;
      const total = formattedDoctors.length;
      const totalPages = Math.ceil(total / effectiveLimit) || 1;
      const startIndex = (page - 1) * effectiveLimit;
      const paginatedData = formattedDoctors.slice(startIndex, startIndex + effectiveLimit);

      return {
        data: paginatedData,
        meta: {
          total,
          page,
          limit: effectiveLimit,
          totalPages,
        },
      };
    }

    return formattedDoctors;
  }

  // 2. Filtered / Searched query path
  const hasPartnerFilter = !!(hospital || region);
  const selectClause = hasPartnerFilter
    ? "*, partners!hospital_id!inner(hospital_name, city, country, address)"
    : "*, partners!hospital_id(hospital_name, city, country, address)";

  let query = supabase
    .from("doctors")
    .select(selectClause, { count: page !== undefined ? "exact" : undefined })
    .order("created_at", { ascending: false });

  if (hospital_id) {
    query = query.eq("hospital_id", hospital_id);
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

  if (page !== undefined && limit !== undefined) {
    const from = (page - 1) * limit;
    const to = page * limit - 1;
    query = query.range(from, to);
  } else if (limit !== undefined) {
    query = query.limit(limit);
  }

  const { data: doctors, count, error } = await query;
  if (error) {
    throw new Error(`Supabase error fetching doctors: ${error.message}`);
  }

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

  if (page !== undefined) {
    const effectiveLimit = limit || 12;
    const total = count || 0;
    const totalPages = Math.ceil(total / effectiveLimit) || 1;

    return {
      data: formattedDoctors,
      meta: {
        total,
        page,
        limit: effectiveLimit,
        totalPages,
      },
    };
  }

  return formattedDoctors;
}

export async function queryDoctorById(id: string): Promise<Doctor> {
  const doctor = await resolveDoctorByIdOrSlug(id);
  if (!doctor) {
    throw new Error(`Doctor not found: ${id}`);
  }

  const { data: fileList } = await supabase.storage
    .from("Lyfline Files")
    .list("Doctors");

  const formattedDoctor = mapDbDoctorToDoctor(doctor, fileList || []);
  const slugMap = await getDoctorSlugMap();
  const partnerSlugMap = await getPartnerSlugMap();
  formattedDoctor.slug = slugMap.get(doctor.id) || slugify(doctor.doctor_name);
  formattedDoctor.hospitalSlug = doctor.hospital_id ? partnerSlugMap.get(doctor.hospital_id) : undefined;
  return formattedDoctor;
}
