import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import PartnerClient from "./PartnerClient";
import { supabase } from "@/lib/supabase";
import { mapDbPartnerToPartner, type DbPartner } from "@/app/api/partners/route";
import { extractIdFromSlug } from "@/lib/utils";

interface PageProps {
  params: Promise<{ id: string }>;
}

const getPartnerData = cache(async (slug: string) => {
  const id = extractIdFromSlug(slug);

  const { data: partner, error } = await supabase
    .from("partners")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !partner) {
    return null;
  }

  return mapDbPartnerToPartner(partner as DbPartner);
});

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { id } = await params;
  const partner = await getPartnerData(id);

  if (!partner) {
    return {
      title: "Partner Not Found | Lyfline",
    };
  }

  const images = partner.images && partner.images.length > 0
    ? [{ url: partner.images[0] }]
    : [];

  return {
    title: `${partner.name} | Lyfline`,
    description: partner.description || `Learn more about ${partner.name} healthcare services.`,
    openGraph: {
      title: partner.name,
      description: partner.description || `Learn more about ${partner.name} healthcare services.`,
      images,
    },
  };
}

export default async function PartnerDetailPage({ params }: PageProps) {
  const { id } = await params;
  const partner = await getPartnerData(id);

  if (!partner) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <NavBar />
      <PartnerClient partner={partner} />
      <Footer />
    </div>
  );
}
