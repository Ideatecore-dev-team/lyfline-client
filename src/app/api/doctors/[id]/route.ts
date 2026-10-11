import { NextResponse } from "next/server";
import { queryDoctorById } from "@/lib/doctorsQuery";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, context: RouteContext) {
  try {
    const rawId = (await context.params).id;
    const formattedDoctor = await queryDoctorById(rawId);
    return NextResponse.json(formattedDoctor);
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    if (errorMsg.includes("not found")) {
      return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
    }
    console.error(`API error fetching doctor:`, error);
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
