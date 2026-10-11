import { NextResponse } from "next/server";
import {
  queryDoctors,
  mapDbDoctorToDoctor,
  resolveDoctorByIdOrSlug,
  getDoctorSlugMap,
  type DbDoctor,
  type FetchDoctorsOptions,
} from "@/lib/doctorsQuery";

export { mapDbDoctorToDoctor, resolveDoctorByIdOrSlug, getDoctorSlugMap, type DbDoctor };

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit");
    const page = searchParams.get("page");
    const hospitalId = searchParams.get("hospital_id") || undefined;
    const search = searchParams.get("search") || undefined;
    const region = searchParams.get("region") || undefined;
    const hospital = searchParams.get("hospital") || undefined;
    const specialty = searchParams.get("specialty") || undefined;

    const pageVal = page ? parseInt(page, 10) : undefined;
    const limitVal = limit ? parseInt(limit, 10) : undefined;

    const options: FetchDoctorsOptions = {
      page: pageVal,
      limit: limitVal,
      hospital_id: hospitalId,
      search,
      region,
      hospital,
      specialty,
    };

    const result = await queryDoctors(options);
    return NextResponse.json(result);
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error("API error fetching doctors:", error);
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
