import type { MetadataRoute } from "next";
import { posts } from "@/lib/posts";

const BASE = "https://www.dr-hod.info";

// Mirrors the live URL set 1:1 (home + blog hub + legal + 20 posts).
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { slug: string; priority: number }[] = [
    { slug: "", priority: 1 },
    { slug: "מאמרים-נוספים", priority: 0.6 },
    { slug: "מדיניות-פרטיות-דר-יורם-הוד-רופא-שיני", priority: 0.3 },
    { slug: "תנאי-שימוש-דר-יורם-הוד", priority: 0.3 },
  ];

  const staticUrls = pages.map((p) => ({
    url: `${BASE}/${p.slug ? encodeURI(p.slug) + "/" : ""}`,
    changeFrequency: "weekly" as const,
    priority: p.priority,
  }));

  const postUrls = posts.map((p) => ({
    url: `${BASE}/${encodeURI(p.slug)}/`,
    lastModified: p.date,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticUrls, ...postUrls];
}
