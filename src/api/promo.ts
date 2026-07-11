export interface PromoResponse {
  imageUrl: string | null;
  destinationLink: string | null;
}

export async function fetchPromoData(): Promise<PromoResponse> {
  const res = await fetch("/api/promo");
  if (!res.ok) {
    throw new Error(`Failed to fetch promo data: ${res.statusText}`);
  }
  return res.json();
}
