import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Cinematic image with a slow, continuous Ken-Burns zoom/pan.
 * Pure CSS animation → stays a Server Component, fully SEO-indexable.
 * Animation auto-stops under prefers-reduced-motion (handled globally).
 */
export function KenBurns({
  src,
  alt,
  className,
  imgClassName,
  priority = false,
  sizes = "100vw",
  overlay = false,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  sizes?: string;
  overlay?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn("object-cover ken-burns", imgClassName)}
      />
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950/70 via-brand-950/10 to-transparent" />
      )}
    </div>
  );
}
