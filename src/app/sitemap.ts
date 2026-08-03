import { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";
import { slugify } from "@/lib/utils";
import { getArticleSlugMap } from "@/app/api/articles/route";
import { getPartnerSlugMap } from "@/app/api/partners/route";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lyfline.id";
  const staticRoutes = ["", "/about", "/services", "/doctors", "/partners", "/articles"];
  
  const routes: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  try {
    const { data: articles } = await supabase
      .from("articles")
      .select("id, article_title, updated_at")
      .eq("is_published", true);
    
    const articleSlugMap = await getArticleSlugMap();
    if (articles) {
      articles.forEach((article) => {
        const slug = articleSlugMap.get(article.id) || slugify(article.article_title);
        routes.push({
          url: `${baseUrl}/articles/${slug}`,
          lastModified: article.updated_at ? new Date(article.updated_at) : new Date(),
          changeFrequency: "weekly",
          priority: 0.7,
        });
      });
    }

    const { data: partners } = await supabase.from("partners").select("id, hospital_name, updated_at");
    const partnerSlugMap = await getPartnerSlugMap();
    if (partners) {
      partners.forEach((partner) => {
        const slug = partnerSlugMap.get(partner.id) || slugify(partner.hospital_name);
        routes.push({
          url: `${baseUrl}/partners/${slug}`,
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
