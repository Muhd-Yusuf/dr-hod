import Link from "next/link";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { posts } from "@/lib/posts";

// The live "מאמרים נוספים" (More Articles) blog hub, rendered for the
// /מאמרים-נוספים/ slug via the root [slug] dispatcher.
function fmt(iso: string) {
  return new Intl.DateTimeFormat("he-IL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

export function ArticlesHub() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-6 pb-24 pt-16 md:pt-24">
          <Reveal direction="up">
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-600">
              הבלוג שלנו
            </span>
            <h1 className="text-display mt-2 text-4xl text-ink md:text-5xl">
              מאמרים נוספים
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
              מידע מקצועי ועדכני בנושאי רפואת שיניים, טיפול בנחירות בלייזר FOTONA,
              השתלות שיניים, עזרה ראשונה וטיפולי חירום, רפואת שיניים בלייזר וטיפול
              בילדים.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p, i) => (
              <Reveal key={p.slug} direction="up" delay={Math.min(i, 8) * 0.05}>
                <Link
                  href={`/${p.slug}/`}
                  className="group block h-full overflow-hidden rounded-glass glass-strong transition-shadow duration-500 hover:shadow-2xl hover:shadow-brand-950/10"
                >
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-brand-400 to-brand-700">
                    {p.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.image}
                        alt={p.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                    <span className="glass absolute right-4 top-4 rounded-full px-3 py-1 text-[11px] font-bold text-white">
                      {p.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <time className="text-xs font-medium text-ink-faint">
                      {fmt(p.date)}
                    </time>
                    <h2 className="text-display mt-2 text-lg leading-snug text-ink transition-colors group-hover:text-brand-700">
                      {p.title}
                    </h2>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
