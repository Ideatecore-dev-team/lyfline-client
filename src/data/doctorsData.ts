export interface Doctor {
  id: string;
  hospital_id: string;
  name: string;
  title: string;
  specialty: string[];
  qualification: string[];
  language: string[];
  hospital?: string;    // Joined from partners table
  region?: string;      // Joined from partners table (country)
  city?: string;        // Joined from partners table
  address?: string;     // Joined from partners table
  imageUrl?: string;    // Resolved from Supabase storage
  description?: string; // Optional description from database
  descriptionIndonesia?: string; // Optional Indonesian description from database
  type?: string;        // "old" (HTML description) or "new" (plain text)
  slug?: string;        // Unique slug for URLs (with optional duplicate suffix)
  hospitalSlug?: string; // Slug of the partner hospital
}

