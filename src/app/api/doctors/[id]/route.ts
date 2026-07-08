import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { mapDbDoctorToDoctor, type DbDoctor } from "../route";
import { extractIdFromSlug } from "@/lib/utils";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, context: RouteContext) {
  try {
    const rawId = (await context.params).id;
    const id = extractIdFromSlug(rawId);

    const { data: doctor, error } = await supabase
      .from("doctors")
      .select("*, partners!hospital_id(hospital_name, country)")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.error(`Supabase error fetching doctor ${id}:`, error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!doctor) {
      return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
    }

    // Fetch doctor photo file list from storage
    const { data: fileList } = await supabase.storage
      .from("Lyfline Files")
      .list("Doctors");

    const formattedDoctor = mapDbDoctorToDoctor(doctor as DbDoctor, fileList || []);
    return NextResponse.json(formattedDoctor);
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error(`API error fetching doctor:`, error);
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
