import type { Metadata } from "next";
import Link from "next/link";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { engineArticles } from "@/lib/engine-posts";

export const metadata: Metadata = {
  title: "מאמרים",
  description:
    "מאמרים מקצועיים בנושאי רפואת שיניים, אסתטיקה, השתלות והלבנת שיניים מאת מרפאת ד״ר יורם הוד ביהוד.",
  alternates: { canonical: "/blog/" },
};

export default function BlogIndex() {
  // Only approved (live) articles are listed publicly. Drafts stay reachable at
  // their own URL for review but are not surfaced here.
  const live = engineArticles.filter((a) => a.approved);

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-gradient-to-br from-brand-600 to-brand-900 py-20 md:py-24">
          <div className="relative mx-auto max-w-5xl px-6">
            <Reveal direction="up">
              <h1 className="text-display text-4xl text-white md:text-5xl">מאמרים</h1>
              <p className="mt-4 max-w-2xl text-lg text-white/85">
                מדריכים מקצועיים בנושאי רפואת שיניים, אסתטיקה והלבנה.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-5xl px-6">
            {live.length === 0 ? (
              <p className="text-lg text-ink-soft">מאמרים חדשים יעלו בקרוב.</p>
            ) : (
              <div className="grid gap-8 md:grid-cols-2">
                {live.map((a, i) => (
                  <Reveal key={a.slug} direction="up" delay={i * 0.06}>
                    <Link
                      href={`/blog/${a.slug}/`}
                      className="group block h-full rounded-glass glass-strong p-7 transition-shadow duration-500 hover:shadow-2xl hover:shadow-brand-950/10"
                    >
                      <h2 className="text-display text-xl leading-snug text-ink transition-colors group-hover:text-brand-700">
                        {a.title}
                      </h2>
                      <p className="mt-3 line-clamp-3 leading-relaxed text-ink-soft">
                        {a.excerpt}
                      </p>
                      <span className="mt-4 inline-block text-sm font-semibold text-brand-700">
                        קראו עוד ←
                      </span>
                    </Link>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
