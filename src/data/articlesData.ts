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
  titleIndonesia?: string;
  date: string;
  category: string;
  categories?: string[];
  categoryVariant: BadgeVariant;
  categoryColors?: string[];
  customColor?: string;
  imageUrl?: string;
  readTime?: string;
  intro: string[];
  sections: ArticleSection[];
  references?: string[];
  htmlContent?: string;
  // Indonesian content (pre-fetched from article_content_indonesia column)
  htmlContentId?: string;
  introId?: string[];
  sectionsId?: ArticleSection[];
  slug?: string;
}
