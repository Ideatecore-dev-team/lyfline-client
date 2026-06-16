import { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";
import { slugify } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://lyfline.id";
  const staticRoutes = ["", "/about", "/services", "/doctors", "/partners", "/articles"];
  
  const routes: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  try {
    const { data: articles } = await supabase.from("articles").select("id, article_title, updated_at");
    if (articles) {
      articles.forEach((article) => {
        const slug = slugify(article.article_title);
        routes.push({
          url: `${baseUrl}/articles/${slug}-${article.id}`,
          lastModified: article.updated_at ? new Date(article.updated_at) : new Date(),
          changeFrequency: "weekly",
          priority: 0.7,
        });
      });
    }

    const { data: partners } = await supabase.from("partners").select("id, updated_at");
    if (partners) {
      partners.forEach((partner) => {
        routes.push({
          url: `${baseUrl}/partners/${partner.id}`,
          lastModified: partner.updated_at ? new Date(partner.updated_at) : new Date(),
          changeFrequency: "monthly",
          priority: 0.6,
        });
      });
    }
  } catch (error) {
    console.error("Error generating sitemap:", error);
  }

  return routes;
}
