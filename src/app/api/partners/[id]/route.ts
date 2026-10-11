import { NextResponse } from "next/server";
import { queryPartnerById } from "@/lib/partnersQuery";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, context: RouteContext) {
  try {
    const rawId = (await context.params).id;
    const formattedPartner = await queryPartnerById(rawId);
    return NextResponse.json(formattedPartner);
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    if (errorMsg.includes("not found")) {
      return NextResponse.json({ error: "Partner not found" }, { status: 404 });
    }
    console.error(`API error fetching partner:`, error);
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
