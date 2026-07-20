import { type Doctor } from "@/data/doctorsData";

export interface FetchDoctorsOptions {
  page?: number;
  limit?: number;
  hospital_id?: string;
  search?: string;
  region?: string;
  hospital?: string;
  specialty?: string;
}

export interface PaginatedDoctorsResponse {
  data: Doctor[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export async function fetchDoctors(
  options: FetchDoctorsOptions = {}
): Promise<Doctor[] | PaginatedDoctorsResponse> {
  const params = new URLSearchParams();
  if (options.page !== undefined) {
    params.set("page", options.page.toString());
  }
  if (options.limit !== undefined) {
    params.set("limit", options.limit.toString());
  }
  if (options.hospital_id !== undefined) {
    params.set("hospital_id", options.hospital_id);
  }
  if (options.search !== undefined && options.search.trim() !== "") {
    params.set("search", options.search.trim());
  }
  if (options.region !== undefined && options.region !== "") {
    params.set("region", options.region);
  }
  if (options.hospital !== undefined && options.hospital !== "") {
    params.set("hospital", options.hospital);
  }
  if (options.specialty !== undefined && options.specialty !== "") {
    params.set("specialty", options.specialty);
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

