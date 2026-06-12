import type { NextConfig } from "next";

// When DEPLOY_TARGET=gh-pages we emit a fully static export under /dr-hod
// (GitHub Pages project-site subpath). Vercel/normal builds are unaffected.
const isPages = process.env.DEPLOY_TARGET === "gh-pages";
const repo = "dr-hod";

const nextConfig: NextConfig = {
  ...(isPages
    ? {
        output: "export",
        basePath: `/${repo}`,
        assetPrefix: `/${repo}/`,
        images: { loader: "custom", loaderFile: "./image-loader.ts" },
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;
