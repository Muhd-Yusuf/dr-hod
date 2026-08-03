import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { clinic } from "@/lib/site";
import { engineArticles } from "@/lib/engine-posts";

// Articles written by the Bles SEO Engine, rendered at /blog/<latin-slug>/.
// A separate namespace from the root-level Hebrew SEO slugs (never touched).
// Drafts (approved=false) are built and viewable for review but noindex and
// out of the sitemap until the practitioner approves (YMYL).

export const dynamicParams = false;

export function generateStaticParams() {
  return engineArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = engineArticles.find((x) => x.slug === slug);
  if (!a) return { title: "מאמר לא נמצא" };
  return {
    // meta_title from the engine already carries the brand — use it verbatim
    // so the layout's title template does not append the clinic name twice.
    title: { absolute: a.metaTitle },
    description: a.metaDescription,
    alternates: { canonical: `/blog/${a.slug}/` },
    // Draft = keep it out of the index until approved.
    robots: a.approved ? undefined : { index: false, follow: false },
    openGraph: {
      title: a.metaTitle,
      description: a.metaDescription,
      type: "article",
    },
  };
}

export default async function BlogArticle({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = engineArticles.find((x) => x.slug === slug);
  if (!a) notFound();

  return (
    <>
      {/* Structured data straight from the engine */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: a.schemaJson.replace(/</g, "\\u003c") }}
      />
      <Header />
      <main className="flex-1">
        {!a.approved && (
          <div className="border-b border-amber-300 bg-amber-50 px-6 py-3 text-center text-sm font-medium text-amber-900">
            טיוטה לבדיקת הרופא · טרם פורסמה ואינה מסומנת לאינדוקס במנועי החיפוש
          </div>
        )}

        {/* Branded header (no stock photo — real clinic images added on approval) */}
        <section className="relative overflow-hidden bg-gradient-to-br from-brand-600 to-brand-900 py-20 md:py-28">
          <div className="absolute inset-0 opacity-20 [background:radial-gradient(60rem_30rem_at_80%_-10%,white,transparent)]" />
          <div className="relative mx-auto max-w-4xl px-6">
            <Reveal direction="up">
              <span className="glass mb-4 inline-block rounded-full px-4 py-1.5 text-xs font-bold text-white">
                מאמר · {clinic.name}
              </span>
              <h1 className="text-display text-3xl leading-tight text-white drop-shadow-sm md:text-5xl">
                {a.title}
              </h1>
              {a.excerpt && (
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/85">
                  {a.excerpt}
                </p>
              )}
            </Reveal>
          </div>
        </section>

        {/* Article body (semantic HTML from the engine) */}
        <article className="py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-6">
            <div
              dir="rtl"
              className="engine-article"
              dangerouslySetInnerHTML={{ __html: a.bodyHtml }}
            />

            {/* FAQ */}
            {a.faq && a.faq.length > 0 && (
              <section className="mt-14">
                <h2 className="text-display mb-6 text-2xl text-ink md:text-3xl">
                  שאלות נפוצות
                </h2>
                <div className="space-y-4">
                  {a.faq.map((f, i) => (
                    <details
                      key={i}
                      className="group rounded-glass glass-strong p-5 open:shadow-lg"
                    >
                      <summary className="cursor-pointer list-none text-lg font-semibold text-ink">
                        {f.q}
                      </summary>
                      <p className="mt-3 leading-relaxed text-ink-soft">{f.a}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {/* CTA */}
            <Reveal direction="up">
              <div className="mt-14 flex flex-wrap items-center gap-4 rounded-glass glass-strong p-8">
                <div className="flex-1">
                  <h2 className="text-display text-xl text-ink">
                    רוצים לקבוע תור או להתייעץ?
                  </h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                    מרפאת {clinic.name}, {clinic.address}. שעות: {clinic.hoursShort}.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <MagneticButton
                    href={`tel:${clinic.tel}`}
                    className="rounded-full bg-brand-500 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-brand-500/30"
                  >
                    {clinic.phone}
                  </MagneticButton>
                  <MagneticButton
                    href="/contact"
                    className="rounded-full glass px-7 py-3.5 text-sm font-semibold text-brand-700"
                  >
                    צרו קשר
                  </MagneticButton>
                </div>
              </div>
            </Reveal>

            <div className="mt-10">
              <Link
                href="/blog/"
                className="text-sm font-semibold text-brand-700 hover:text-brand-500"
              >
                ← לכל המאמרים
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
