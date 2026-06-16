import { type BadgeVariant } from "@/components/Badge";

export interface ArticleSection {
  heading?: string;
  paragraphs: string[];
  bulletPoints?: string[];
}

/**
 * Article shape as returned by the API route (/api/articles).
 * Fields are mapped from the Supabase `articles` table:
 *   id             → id
 *   article_title  → title
 *   created_at     → date (formatted)
 *   category       → category
 *   category_color → customColor + categoryVariant
 *   article_content (JSON) → imageUrl, readTime, intro, sections, references
 */
export interface Article {
  id: string;
  title: string;
  date: string;
  category: string;
  categoryVariant: BadgeVariant;
  customColor?: string;
  imageUrl?: string;
  readTime?: string;
  intro: string[];
  sections: ArticleSection[];
  references?: string[];
  htmlContent?: string;
}
