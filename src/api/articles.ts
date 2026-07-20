import { type Article } from "@/data/articlesData";

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

export async function fetchArticles(
  options: FetchArticlesOptions = {}
): Promise<Article[] | PaginatedArticlesResponse> {
  const params = new URLSearchParams();
  if (options.page !== undefined) {
    params.set("page", options.page.toString());
  }
  if (options.limit !== undefined) {
    params.set("limit", options.limit.toString());
  }
  if (options.exclude !== undefined) {
    params.set("exclude", options.exclude);
  }
  if (options.search !== undefined && options.search.trim() !== "") {
    params.set("search", options.search.trim());
  }
  if (options.category !== undefined && options.category !== "All Categories") {
    params.set("category", options.category);
  }

  const queryString = params.toString();
  const url = `/api/articles${queryString ? `?${queryString}` : ""}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch articles: ${res.statusText}`);
  }
  return res.json();
}

export async function fetchArticleCategories(): Promise<string[]> {
  const res = await fetch("/api/articles/categories");
  if (!res.ok) {
    throw new Error(`Failed to fetch article categories: ${res.statusText}`);
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

