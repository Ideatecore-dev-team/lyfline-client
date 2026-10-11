import { type Partner } from "@/data/partnersData";
import {
  queryPartners,
  queryPartnerById,
  type FetchPartnersOptions,
  type PaginatedPartnersResponse,
} from "@/lib/partnersQuery";

export type { FetchPartnersOptions, PaginatedPartnersResponse };

export async function fetchPartners(
  options: FetchPartnersOptions = {}
): Promise<Partner[]> {
  const result = await queryPartners(options);
  if (Array.isArray(result)) {
    return result;
  }
  return result.data;
}

export async function fetchPartnerById(id: string): Promise<Partner> {
  return queryPartnerById(id);
}
