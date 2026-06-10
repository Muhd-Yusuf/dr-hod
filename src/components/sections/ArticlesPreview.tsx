import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { ZoomImage } from "@/components/ui/ZoomImage";
import { articles } from "@/lib/articles";

const dateFmt = new Intl.DateTimeFormat("he-IL", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function ArticlesPreview() {
  const latest = [...articles]
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, 3);

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-600">
            מהבלוג
          </span>
          <h2 className="text-display mt-2 text-3xl text-ink sm:text-4xl">
            מאמרים אחרונים
          </h2>
        </div>
        <Link
          href="/articles"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 transition-transform hover:-translate-x-1"
        >
          לכל המאמרים
          <ArrowLeft className="size-4" />
        </Link>
      </Reveal>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {latest.map((a, i) => (
          <Reveal key={a.slug} delay={i * 0.05}>
            <Link
              href={`/articles/${a.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-glass glass shadow-lg shadow-brand-950/10 ring-1 ring-white/30 transition-shadow hover:shadow-2xl hover:shadow-brand-950/15"
            >
              <div className="relative h-48 overflow-hidden">
                <ZoomImage
                  src={a.image}
                  alt={a.title}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <span className="absolute right-3 top-3 rounded-full bg-brand-500/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                  {a.category}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <time className="text-xs text-ink-faint">
                  {dateFmt.format(new Date(a.date))}
                </time>
                <h3 className="text-display mt-2 text-lg leading-snug text-ink transition-colors group-hover:text-brand-700">
                  {a.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-soft">
                  {a.excerpt}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition-transform group-hover:-translate-x-1">
                  קראו עוד
                  <ArrowLeft className="size-4" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
