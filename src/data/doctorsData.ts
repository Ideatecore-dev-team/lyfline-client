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
  imageUrl?: string;    // Resolved from Supabase storage
}
