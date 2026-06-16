import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string) {
  if (!text) return '';
  return text
    .toString()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

export function extractIdFromSlug(slug: string) {
  if (!slug) return '';
  // UUID length is 36. If it's a UUID at the end of the slug, extract it.
  const uuidMatch = slug.match(/([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/);
  if (uuidMatch) return uuidMatch[1];
  
  // Fallback for numeric IDs (from mock data)
  const parts = slug.split('-');
  return parts[parts.length - 1];
}
