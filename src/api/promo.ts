export async function fetchPromoImage(): Promise<string | null> {
  const res = await fetch("/api/promo");
  if (!res.ok) {
    throw new Error(`Failed to fetch promo image: ${res.statusText}`);
  }
  const data = await res.json();
  return data.imageUrl ?? null;
}
