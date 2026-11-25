import type { MetadataRoute } from "next";
import { content } from "@/data/content";

/** /sitemap.xml — a single-page site, so one entry. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: content.site.url,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
