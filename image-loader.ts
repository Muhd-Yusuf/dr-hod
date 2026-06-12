// Custom next/image loader for static export under a basePath (GitHub Pages).
// Next does NOT auto-prefix /public image src with basePath, so we do it here.
// Covers every <Image>, KenBurns and ZoomImage on the site in one place.
export default function basePathLoader({ src }: { src: string; width: number; quality?: number }) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (/^https?:\/\//.test(src)) return src;
  return src.startsWith("/") ? `${base}${src}` : `${base}/${src}`;
}
