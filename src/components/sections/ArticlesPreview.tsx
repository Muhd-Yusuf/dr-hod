import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { posts, type Post } from "@/lib/posts";

const dateFmt = new Intl.DateTimeFormat("he-IL", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

function lead(p: Post): string {
  const first = p.body.find((b) => "p" in b) as { p: string } | undefined;
  return first ? first.p : "";
}

export function ArticlesPreview() {
  const latest = [...posts]
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
          href="/מאמרים-נוספים/"
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
              href={`/${a.slug}/`}
              className="group flex h-full flex-col overflow-hidden rounded-glass glass shadow-lg shadow-brand-950/10 ring-1 ring-white/30 transition-shadow hover:shadow-2xl hover:shadow-brand-950/15"
            >
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-brand-400 to-brand-700">
                {a.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={a.image}
                    alt={a.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
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
                  {lead(a)}
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
