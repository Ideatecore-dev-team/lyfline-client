/**
 * seed.ts — DEPRECATED
 *
 * This script was previously used to seed static dummy article data into Supabase.
 * Articles are now managed directly in the Supabase `articles` table via the
 * Supabase dashboard or SQL migrations. This file is kept for reference only.
 *
 * Table schema:
 *   id             uuid (auto-generated)
 *   article_title  varchar(255)
 *   category       varchar(100)
 *   category_color varchar(7)   — hex color e.g. "#3b82f6"
 *   article_content text        — JSON string with { imageUrl, readTime, intro, sections, references }
 *   created_at     timestamptz
 *   updated_at     timestamptz
 */

console.warn(
  "[seed.ts] This seed script is deprecated.\n" +
  "Articles are now managed directly in the Supabase dashboard.\n" +
  "No action was taken."
);
