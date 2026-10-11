import { type Doctor } from "@/data/doctorsData";
import {
  queryDoctors,
  queryDoctorById,
  type FetchDoctorsOptions,
  type PaginatedDoctorsResponse,
} from "@/lib/doctorsQuery";

export type { FetchDoctorsOptions, PaginatedDoctorsResponse };

export async function fetchDoctors(
  options: FetchDoctorsOptions = {}
): Promise<Doctor[] | PaginatedDoctorsResponse> {
  return queryDoctors(options);
}

export async function fetchDoctorById(id: string): Promise<Doctor> {
  return queryDoctorById(id);
}
