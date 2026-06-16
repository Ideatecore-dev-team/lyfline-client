import { type Partner } from "@/data/partnersData";

export interface FetchPartnersOptions {
  limit?: number;
}

export async function fetchPartners(options: FetchPartnersOptions = {}): Promise<Partner[]> {
  const params = new URLSearchParams();
  if (options.limit !== undefined) {
    params.set("limit", options.limit.toString());
  }

  const queryString = params.toString();
  const url = `/api/partners${queryString ? `?${queryString}` : ""}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch partners: ${res.statusText}`);
  }
  return res.json();
}

export async function fetchPartnerById(id: string): Promise<Partner> {
  const res = await fetch(`/api/partners/${id}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch partner ${id}: ${res.statusText}`);
  }
  return res.json();
}
