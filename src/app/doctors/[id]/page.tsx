import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import DoctorClient from "./DoctorClient";
import { supabase } from "@/lib/supabase";
import { mapDbDoctorToDoctor, resolveDoctorByIdOrSlug, getDoctorSlugMap } from "@/app/api/doctors/route";
import { getPartnerSlugMap } from "@/app/api/partners/route";
import { slugify } from "@/lib/utils";

interface PageProps {
  params: Promise<{ id: string }>;
}

const getDoctorData = cache(async (slug: string) => {
  const doctor = await resolveDoctorByIdOrSlug(slug);

  if (!doctor) {
    return null;
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

  return formattedDoctor;
});

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { id } = await params;
  const doctor = await getDoctorData(id);

  if (!doctor) {
    return {
      title: "Doctor Not Found | Lyfline",
    };
  }

  const images = doctor.imageUrl ? [{ url: doctor.imageUrl }] : [];

  return {
    title: `${doctor.name} - ${doctor.title} | Lyfline`,
    description: doctor.description || `Meet ${doctor.name}, specialist at ${doctor.hospital || "Lyfline Network"}.`,
    openGraph: {
      title: `${doctor.name} - ${doctor.title}`,
      description: doctor.description || `Meet ${doctor.name}, specialist at ${doctor.hospital || "Lyfline Network"}.`,
      images,
    },
  };
}

export default async function DoctorDetailPage({ params }: PageProps) {
  const { id } = await params;
  const doctor = await getDoctorData(id);

  if (!doctor) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <NavBar />
      <DoctorClient doctor={doctor} />
      <Footer />
    </div>
  );
}
