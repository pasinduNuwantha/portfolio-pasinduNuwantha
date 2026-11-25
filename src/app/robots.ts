import type { MetadataRoute } from "next";
import { content } from "@/data/content";

/** /robots.txt — allow everything and point crawlers at the sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${content.site.url}/sitemap.xml`,
    host: content.site.url,
  };
}
