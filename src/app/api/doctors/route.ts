import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { type Doctor } from "@/data/doctorsData";

interface DbDoctor {
  id: string;
  hospital_id: string;
  doctor_name: string;
  doctor_title: string;
  doctor_specialty: string[];
  doctor_qualification: string[];
  doctor_language: string[];
  created_at: string;
  updated_at: string;
  partners: {
    hospital_name: string;
    country: string;
  } | null;
}

function mapDbDoctorToDoctor(dbDoctor: DbDoctor, fileList?: { name: string }[]): Doctor {
  let imageUrl: string | undefined = undefined;

  // Find doctor photo in Supabase storage: "Doctors/<id>_photo_<timestamp>.ext"
  if (fileList && fileList.length > 0) {
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
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit");
    const hospitalId = searchParams.get("hospital_id");

    let query = supabase
      .from("doctors")
      .select("*, partners!hospital_id(hospital_name, country)")
      .order("created_at", { ascending: false });

    if (hospitalId) {
      query = query.eq("hospital_id", hospitalId);
    }

    if (limit) {
      const limitVal = parseInt(limit, 10);
      if (!isNaN(limitVal)) {
        query = query.limit(limitVal);
      }
    }

    const { data: doctors, error } = await query;

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

    return NextResponse.json(formattedDoctors);
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error("API error fetching doctors:", error);
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
