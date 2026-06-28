import type { NextConfig } from "next";

// When DEPLOY_TARGET=gh-pages we emit a fully static export under /dr-hod
// (GitHub Pages project-site subpath). Vercel/normal builds are unaffected.
const isPages = process.env.DEPLOY_TARGET === "gh-pages";
const repo = "dr-hod";

// Live dr-hod.info (WordPress) serves every URL with a trailing slash. We mirror
// that exactly so the existing SEO/permalinks carry over 1:1.
const nextConfig: NextConfig = {
  trailingSlash: true,
  ...(isPages
    ? {
        output: "export",
        basePath: `/${repo}`,
        assetPrefix: `/${repo}/`,
        images: { loader: "custom", loaderFile: "./image-loader.ts" },
      }
    : {
        // Post images are hot-linked from the live WordPress media library.
        images: {
          remotePatterns: [
            { protocol: "https", hostname: "www.dr-hod.info" },
          ],
        },
        // 301 the rebuild's old English routes onto the real live Hebrew URLs.
        // (Redirects don't run under `output: export`, hence Vercel-only.)
        async redirects() {
          return [
            { source: "/privacy", destination: "/מדיניות-פרטיות-דר-יורם-הוד-רופא-שיני/", permanent: true },
            { source: "/terms", destination: "/תנאי-שימוש-דר-יורם-הוד/", permanent: true },
            { source: "/articles", destination: "/מאמרים-נוספים/", permanent: true },
          ];
        },
      }),
};

export default nextConfig;
