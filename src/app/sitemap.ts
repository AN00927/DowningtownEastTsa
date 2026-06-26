import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { news } from "@/data/news";

// Fixed lastModified so output is deterministic (no Date.now()).
const lastModified = new Date("2025-09-01");

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = site.nav.map((item) => ({
    url: `${site.url}${item.href === "/" ? "" : item.href}`,
    lastModified,
  }));

  const newsRoutes = news.map((post) => ({
    url: `${site.url}/news/${post.slug}`,
    lastModified,
  }));

  return [...routes, ...newsRoutes];
}
