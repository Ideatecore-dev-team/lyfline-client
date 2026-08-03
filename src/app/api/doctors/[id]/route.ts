import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { mapDbDoctorToDoctor, resolveDoctorByIdOrSlug, getDoctorSlugMap, type DbDoctor } from "../route";
import { getPartnerSlugMap } from "../../partners/route";
import { slugify } from "@/lib/utils";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, context: RouteContext) {
  try {
    const rawId = (await context.params).id;
    const doctor = await resolveDoctorByIdOrSlug(rawId);

    if (!doctor) {
      return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
    }

    // Fetch doctor photo file list from storage
    const { data: fileList } = await supabase.storage
      .from("Lyfline Files")
      .list("Doctors");

    const formattedDoctor = mapDbDoctorToDoctor(doctor, fileList || []);
    const slugMap = await getDoctorSlugMap();
    const partnerSlugMap = await getPartnerSlugMap();
    formattedDoctor.slug = slugMap.get(doctor.id) || slugify(doctor.doctor_name);
    formattedDoctor.hospitalSlug = doctor.hospital_id ? partnerSlugMap.get(doctor.hospital_id) : undefined;

    return NextResponse.json(formattedDoctor);
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error(`API error fetching doctor:`, error);
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
