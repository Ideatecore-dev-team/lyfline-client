import { type Article } from "@/data/articlesData";
import {
  queryArticles,
  queryArticleCategories,
  queryArticleById,
  type FetchArticlesOptions,
  type PaginatedArticlesResponse,
} from "@/lib/articlesQuery";

export type { FetchArticlesOptions, PaginatedArticlesResponse };

export async function fetchArticles(
  options: FetchArticlesOptions = {}
): Promise<Article[] | PaginatedArticlesResponse> {
  return queryArticles(options);
}

export async function fetchArticleCategories(): Promise<string[]> {
  return queryArticleCategories();
}

export async function fetchArticleById(id: string): Promise<Article> {
  return queryArticleById(id);
}
