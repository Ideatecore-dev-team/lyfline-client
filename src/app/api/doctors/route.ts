import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { type Doctor } from "@/data/doctorsData";

export interface DbDoctor {
  id: string;
  hospital_id: string;
  doctor_name: string;
  doctor_title: string;
  doctor_specialty: string[];
  doctor_qualification: string[];
  doctor_language: string[];
  description?: string;
  type?: string;
  created_at: string;
  updated_at: string;
  avatarUrl?: string | null;
  partners: {
    hospital_name: string;
    country: string;
  } | null;
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

  return {
    id: dbDoctor.id,
    hospital_id: dbDoctor.hospital_id,
    name: dbDoctor.doctor_name,
    title: dbDoctor.doctor_title,
    specialty: dbDoctor.doctor_specialty || [],
    qualification: dbDoctor.doctor_qualification || [],
    language: dbDoctor.doctor_language || [],
    hospital: dbDoctor.partners?.hospital_name ?? undefined,
    region: dbDoctor.partners?.country ?? undefined,
    imageUrl,
    description: dbDoctor.description || "",
    type: dbDoctor.type || "new",
  };
}

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

    let query = supabase
      .from("doctors")
      .select("*, partners!hospital_id(hospital_name, country)", { count: pageVal !== undefined ? "exact" : undefined })
      .order("created_at", { ascending: false });

    if (hospitalId) {
      query = query.eq("hospital_id", hospitalId);
    }
    if (search) {
      query = query.or(`doctor_name.ilike.%${search}%,doctor_title.ilike.%${search}%`);
    }
    if (specialty) {
      query = query.contains("doctor_specialty", [specialty]);
    }
    if (hospital) {
      query = query.eq("partners.hospital_name", hospital);
    }
    if (region) {
      query = query.eq("partners.country", region);
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

    const formattedDoctors = (doctors || []).map((doc: unknown) =>
      mapDbDoctorToDoctor(doc as DbDoctor, fileList || [])
    );

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

