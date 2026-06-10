import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Image that zooms gently when its closest `.group` ancestor is hovered.
 * Wrap in a parent that has `group` + `overflow-hidden`.
 * Server Component (CSS-only hover) → SEO-safe.
 */
export function ZoomImage({
  src,
  alt,
  className,
  sizes = "(max-width: 768px) 100vw, 33vw",
  overlay = false,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  overlay?: boolean;
}) {
  return (
    <>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={cn("object-cover img-zoom", className)}
      />
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950/65 to-transparent" />
      )}
    </>
  );
}
