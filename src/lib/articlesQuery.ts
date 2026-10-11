import { supabase } from "@/lib/supabase";
import { type BadgeVariant } from "@/components/Badge";
import { type Article, type ArticleSection } from "@/data/articlesData";
import { slugify } from "@/lib/utils";

export interface DbArticle {
  id: string;
  article_title: string;
  article_title_indonesia?: string;
  category: string | string[];
  category_color: string | string[];
  article_content: string;
  article_content_indonesia?: string;
  created_at: string;
  updated_at: string;
  imageUrl?: string | null;
}

export interface FetchArticlesOptions {
  page?: number;
  limit?: number;
  exclude?: string;
  search?: string;
  category?: string;
}

export interface PaginatedArticlesResponse {
  data: Article[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export function getNearestVariant(hexInput: string | string[]): BadgeVariant {
  const hex = Array.isArray(hexInput) ? hexInput[0] : hexInput;
  const normalized = (hex || "").toLowerCase().trim();
  const validVariants: BadgeVariant[] = ["green", "red", "blue", "yellow", "purple", "gray", "indigo", "orange"];
  if (validVariants.includes(normalized as BadgeVariant)) {
    return normalized as BadgeVariant;
  }
  const cleanHex = normalized.replace("#", "");
  if (cleanHex === "000000" || cleanHex === "ffffff") return "gray";
  return "green";
}

export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    const months = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  } catch {
    return dateString;
  }
}

export function mapDbArticleToArticle(dbArticle: DbArticle, fileList?: { name: string }[]): Article {
  let htmlContent: string | undefined = undefined;
  let intro: string[] = [];
  let sections: ArticleSection[] = [];
  let references: string[] = [];
  let imageUrl = dbArticle.imageUrl || "";
  let readTime = "";

  const content = dbArticle.article_content || "";

  try {
    const parsed = JSON.parse(content);
    intro = parsed.intro || [];
    sections = parsed.sections || [];
    references = parsed.references || [];
    imageUrl = parsed.imageUrl || imageUrl || "";
    readTime = parsed.readTime || "";
    if (parsed.html) {
      htmlContent = parsed.html;
    }
  } catch {
    htmlContent = content;
    const cleanText = content.replace(/<[^>]*>/g, " ").trim();
    const paragraphs = cleanText.split(/\n\s*\n/).map((p: string) => p.trim()).filter(Boolean);
    if (paragraphs.length > 0) {
      intro = [paragraphs[0]];
    }
    const wordCount = cleanText.split(/\s+/).length;
    readTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;
  }

  // Indonesian content
  let htmlContentId: string | undefined = undefined;
  let introId: string[] = [];
  let sectionsId: ArticleSection[] = [];

  const contentId = dbArticle.article_content_indonesia || "";

  if (contentId) {
    try {
      const parsedId = JSON.parse(contentId);
      introId = parsedId.intro || [];
      sectionsId = parsedId.sections || [];
      if (parsedId.html) {
        htmlContentId = parsedId.html;
      }
    } catch {
      htmlContentId = contentId;
      const cleanText = contentId.replace(/<[^>]*>/g, " ").trim();
      const paragraphs = cleanText.split(/\n\s*\n/).map((p: string) => p.trim()).filter(Boolean);
      if (paragraphs.length > 0) {
        introId = [paragraphs[0]];
      }
    }
  }

  // Find banner image in Supabase storage if not provided
  if (!imageUrl && fileList && fileList.length > 0) {
    const matchingFile = fileList.find((f) => f.name.startsWith(`${dbArticle.id}_banner_`));
    if (matchingFile) {
      const { data } = supabase.storage
        .from("Lyfline Files")
        .getPublicUrl(`Articles/Banner/${matchingFile.name}`);
      imageUrl = data.publicUrl;
    }
  }

  const categoriesList = Array.isArray(dbArticle.category)
    ? dbArticle.category
    : dbArticle.category
      ? [dbArticle.category]
      : [];

  const colorsList = Array.isArray(dbArticle.category_color)
    ? dbArticle.category_color
    : dbArticle.category_color
      ? [dbArticle.category_color]
      : [];

  const mainColor = colorsList[0] || undefined;

  return {
    id: dbArticle.id,
    title: dbArticle.article_title,
    titleIndonesia: dbArticle.article_title_indonesia || undefined,
    date: formatDate(dbArticle.created_at),
    category: categoriesList.join(", "),
    categories: categoriesList,
    categoryColors: colorsList,
    categoryVariant: getNearestVariant(mainColor || "#000000"),
    customColor: mainColor,
    imageUrl: imageUrl,
    readTime: readTime,
    intro: intro,
    sections: sections,
    references: references,
    htmlContent: htmlContent,
    introId: introId.length > 0 ? introId : undefined,
    sectionsId: sectionsId.length > 0 ? sectionsId : undefined,
    htmlContentId: htmlContentId,
  };
}

let articleSlugCache: Promise<Map<string, string>> | null = null;
let lastArticleCacheTime = 0;
const CACHE_TTL = 60 * 1000;

export function getArticleSlugMap(): Promise<Map<string, string>> {
  const now = Date.now();
  if (!articleSlugCache || now - lastArticleCacheTime > CACHE_TTL) {
    lastArticleCacheTime = now;
    articleSlugCache = (async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("id, article_title")
        .order("created_at", { ascending: true });

      const slugMap = new Map<string, string>();
      if (error || !data) return slugMap;

      const slugCounts = new Map<string, number>();
      for (const row of data) {
        const baseSlug = slugify(row.article_title);
        const count = slugCounts.get(baseSlug) || 0;
        if (count === 0) {
          slugMap.set(row.id, baseSlug);
        } else {
          slugMap.set(row.id, `${baseSlug}-${count + 1}`);
        }
        slugCounts.set(baseSlug, count + 1);
      }
      return slugMap;
    })();
  }
  return articleSlugCache;
}

export async function resolveArticleByIdOrSlug(idOrSlug: string): Promise<DbArticle | null> {
  const isUuid = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(idOrSlug);

  if (isUuid) {
    const { data: article } = await supabase
      .from("articles")
      .select("*")
      .eq("id", idOrSlug)
      .maybeSingle();
    return (article as DbArticle) || null;
  }

  let baseSlug = idOrSlug;
  let suffixIndex = 0;

  const suffixMatch = idOrSlug.match(/-(\d+)$/);
  if (suffixMatch) {
    const num = parseInt(suffixMatch[1], 10);
    if (num > 1) {
      suffixIndex = num - 1;
      baseSlug = idOrSlug.slice(0, -suffixMatch[0].length);
    }
  }

  const words: string[] = [];
  const rawWords = baseSlug.split("-");
  for (const word of rawWords) {
    const lower = word.toLowerCase();
    if (lower.length <= 1) continue;
    words.push(word);
    if (words.length >= 2) break;
  }

  if (words.length === 0) {
    words.push(baseSlug);
  }

  let dbQuery = supabase
    .from("articles")
    .select("*")
    .order("created_at", { ascending: true });

  for (const word of words) {
    dbQuery = dbQuery.ilike("article_title", `%${word}%`);
  }

  const { data: articles } = await dbQuery;
  if (!articles || articles.length === 0) return null;

  const candidates = articles.filter((art) => slugify(art.article_title) === baseSlug);
  if (candidates.length > suffixIndex) {
    return (candidates[suffixIndex] as DbArticle) || null;
  }

  return null;
}

export async function queryArticles(
  options: FetchArticlesOptions = {}
): Promise<Article[] | PaginatedArticlesResponse> {
  const { page, limit, exclude, search, category } = options;

  let query = supabase
    .from("articles")
    .select("*", { count: page !== undefined ? "exact" : undefined })
    .order("created_at", { ascending: false });

  if (exclude) {
    query = query.neq("id", exclude);
  }

  if (search && search.trim() !== "") {
    query = query.ilike("article_title", `%${search.trim()}%`);
  }

  if (category && category !== "All Categories") {
    query = query.contains("category", [category]);
  }

  if (page !== undefined && limit !== undefined) {
    const from = (page - 1) * limit;
    const to = page * limit - 1;
    query = query.range(from, to);
  } else if (limit !== undefined) {
    query = query.limit(limit);
  }

  const { data: articles, count, error } = await query;
  if (error) {
    throw new Error(`Supabase error fetching articles: ${error.message}`);
  }

  const { data: fileList } = await supabase.storage
    .from("Lyfline Files")
    .list("Articles/Banner");

  const slugMap = await getArticleSlugMap();
  const formattedArticles = (articles || []).map((art: unknown) => {
    const dbArt = art as DbArticle;
    const mapped = mapDbArticleToArticle(dbArt, fileList || []);
    mapped.slug = slugMap.get(dbArt.id) || slugify(dbArt.article_title);
    return mapped;
  });

  if (page !== undefined) {
    const effectiveLimit = limit || 10;
    const total = count || 0;
    const totalPages = Math.ceil(total / effectiveLimit) || 1;

    return {
      data: formattedArticles,
      meta: {
        total,
        page,
        limit: effectiveLimit,
        totalPages,
      },
    };
  }

  return formattedArticles;
}

export async function queryArticleCategories(): Promise<string[]> {
  const { data, error } = await supabase
    .from("articles")
    .select("category");

  if (error) {
    throw new Error(`Supabase error fetching categories: ${error.message}`);
  }

  const categoriesSet = new Set<string>();
  (data || []).forEach((item: { category?: string | string[] }) => {
    if (!item.category) return;
    if (Array.isArray(item.category)) {
      item.category.forEach((cat) => {
        if (cat && typeof cat === "string") {
          categoriesSet.add(cat.trim());
        }
      });
    } else if (typeof item.category === "string") {
      const val = item.category.trim();
      if (val.startsWith("[") && val.endsWith("]")) {
        try {
          const parsed = JSON.parse(val);
          if (Array.isArray(parsed)) {
            parsed.forEach((cat) => {
              if (cat && typeof cat === "string") {
                categoriesSet.add(cat.trim());
              }
            });
            return;
          }
        } catch {}
      }
      categoriesSet.add(val);
    }
  });

  return Array.from(categoriesSet).sort();
}

export async function queryArticleById(id: string): Promise<Article> {
  const article = await resolveArticleByIdOrSlug(id);
  if (!article) {
    throw new Error(`Article not found: ${id}`);
  }

  const { data: fileList } = await supabase.storage
    .from("Lyfline Files")
    .list("Articles/Banner");

  const formatted = mapDbArticleToArticle(article, fileList || []);
  const slugMap = await getArticleSlugMap();
  formatted.slug = slugMap.get(article.id) || slugify(article.article_title);
  return formatted;
}
