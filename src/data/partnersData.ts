export interface Partner {
  id: string;
  name: string;
  location: string;
  country: string;
  phone: string;
  email: string;
  address: string;
  description: string;
  descriptionIndonesia?: string;
  mapsUrl: string;
  logoUrl?: string;
  images: string[];
  slug?: string;
}
