import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { mapDbPartnerToPartner, type DbPartner } from "../route";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;

    const { data: partner, error } = await supabase
      .from("partners")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.error(`Supabase error fetching partner ${id}:`, error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!partner) {
      return NextResponse.json({ error: "Partner not found" }, { status: 404 });
    }

    const formattedPartner = mapDbPartnerToPartner(partner as DbPartner);
    return NextResponse.json(formattedPartner);
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error(`API error fetching partner:`, error);
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
