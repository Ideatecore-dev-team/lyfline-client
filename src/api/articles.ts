import { type Article } from "@/data/articlesData";

export interface FetchArticlesOptions {
  limit?: number;
  exclude?: string;
}

export async function fetchArticles(options: FetchArticlesOptions = {}): Promise<Article[]> {
  const params = new URLSearchParams();
  if (options.limit !== undefined) {
    params.set("limit", options.limit.toString());
  }
  if (options.exclude !== undefined) {
    params.set("exclude", options.exclude);
  }

  const queryString = params.toString();
  const url = `/api/articles${queryString ? `?${queryString}` : ""}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch articles: ${res.statusText}`);
  }
  return res.json();
}

export async function fetchArticleById(id: string): Promise<Article> {
  const res = await fetch(`/api/articles/${id}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch article ${id}: ${res.statusText}`);
  }
  return res.json();
}
