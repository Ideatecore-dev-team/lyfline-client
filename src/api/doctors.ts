import { type Doctor } from "@/data/doctorsData";

export interface FetchDoctorsOptions {
  limit?: number;
  hospital_id?: string;
}

export async function fetchDoctors(options: FetchDoctorsOptions = {}): Promise<Doctor[]> {
  const params = new URLSearchParams();
  if (options.limit !== undefined) {
    params.set("limit", options.limit.toString());
  }
  if (options.hospital_id !== undefined) {
    params.set("hospital_id", options.hospital_id);
  }

  const queryString = params.toString();
  const url = `/api/doctors${queryString ? `?${queryString}` : ""}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch doctors: ${res.statusText}`);
  }
  return res.json();
}

export async function fetchDoctorById(id: string): Promise<Doctor> {
  const res = await fetch(`/api/doctors/${id}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch doctor ${id}: ${res.statusText}`);
  }
  return res.json();
}
