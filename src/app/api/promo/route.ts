import { NextResponse } from "next/server";
import { fetchPromoData } from "@/api/promo";

export async function GET() {
  try {
    const data = await fetchPromoData();
    return NextResponse.json(data);
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error("API error fetching promo settings:", error);
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
