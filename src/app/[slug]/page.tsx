import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ArticlesHub } from "@/components/sections/ArticlesHub";
import PrivacyContent from "@/app/privacy/page";
import TermsContent from "@/app/terms/page";
import { posts, type Post } from "@/lib/posts";

// Root-level Hebrew permalinks (1:1 SEO), all served through this ASCII [slug]
// route — Turbopack can't build non-ASCII *folder* names, so hub/privacy/terms
// are dispatched here by slug rather than as their own directories.
const HUB = "מאמרים-נוספים";
const PRIVACY = "מדיניות-פרטיות-דר-יורם-הוד-רופא-שיני";
const TERMS = "תנאי-שימוש-דר-יורם-הוד";

function fmt(iso: string) {
  return new Intl.DateTimeFormat("he-IL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

function lead(p: Post): string {
  const first = p.body.find((b) => "p" in b) as { p: string } | undefined;
  return first ? first.p : "";
}

export const dynamicParams = false;

export function generateStaticParams() {
  return [...posts.map((p) => p.slug), HUB, PRIVACY, TERMS].map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dec = decodeURIComponent(slug);

  if (dec === HUB) {
    return {
      title: "מאמרים נוספים",
      description:
        "מאמרים בנושאי רפואת שיניים מאת ד״ר יורם הוד, מרפאת שיניים מובילה ביהוד — טיפול בנחירות בלייזר FOTONA, השתלות שיניים, עזרה ראשונה וטיפולי חירום ועוד.",
      alternates: { canonical: `/${HUB}/` },
    };
  }
  if (dec === PRIVACY) {
    return {
      title: "מדיניות פרטיות",
      description:
        "מדיניות הפרטיות של מרפאת השיניים ד״ר יורם הוד ביהוד — כיצד אנו אוספים, משתמשים ושומרים על המידע האישי שלכם.",
      alternates: { canonical: `/${PRIVACY}/` },
    };
  }
  if (dec === TERMS) {
    return {
      title: "תנאי שימוש",
      description: "תנאי השימוש באתר מרפאת השיניים של ד״ר יורם הוד ביהוד.",
      alternates: { canonical: `/${TERMS}/` },
    };
  }

  const post = posts.find((p) => p.slug === dec);
  if (!post) return { title: "מאמר לא נמצא" };
  const description = lead(post).slice(0, 160);
  return {
    title: post.title,
    description,
    alternates: { canonical: `/${post.slug}/` },
    openGraph: {
      title: post.title,
      description,
      type: "article",
      images: post.image ? [{ url: post.image }] : [],
    },
  };
}

function PostView({ post }: { post: Post }) {
  const related = [
    ...posts.filter((p) => p.slug !== post.slug && p.category === post.category),
    ...posts.filter((p) => p.slug !== post.slug && p.category !== post.category),
  ].slice(0, 3);

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative h-[24rem] overflow-hidden md:h-[30rem]">
          {post.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.image}
              alt={post.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-brand-500 to-brand-800" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/40 to-transparent" />
          <div className="absolute inset-0 flex items-end">
            <div className="mx-auto w-full max-w-4xl px-6 pb-14">
              <Reveal direction="up">
                <span className="glass mb-4 inline-block rounded-full px-4 py-1.5 text-xs font-bold text-white">
                  {post.category}
                </span>
                <h1 className="text-display text-3xl leading-tight text-white drop-shadow-sm md:text-5xl">
                  {post.title}
                </h1>
                <time className="mt-4 block text-sm font-medium text-white/80">
                  {fmt(post.date)}
                </time>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Body */}
        <article className="py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-6">
            <div className="space-y-6">
              {post.body.map((block, i) =>
                "heading" in block ? (
                  <Reveal key={i} direction="up">
                    <h2 className="text-display pt-4 text-2xl text-ink md:text-3xl">
                      {block.heading}
                    </h2>
                  </Reveal>
                ) : (
                  <Reveal key={i} direction="up" delay={Math.min(i, 6) * 0.04}>
                    <p className="text-lg leading-relaxed text-ink-soft">
                      {block.p}
                    </p>
                  </Reveal>
                ),
              )}
            </div>

            {/* CTA */}
            <Reveal direction="up">
              <div className="mt-14 flex flex-wrap items-center gap-4 rounded-glass glass-strong p-8">
                <div className="flex-1">
                  <h2 className="text-display text-xl text-ink">
                    יש לכם שאלה? אנחנו כאן בשבילכם
                  </h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                    קבעו תור או צרו קשר לקבלת ייעוץ אישי ומקצועי במרפאה ביהוד.
                  </p>
                </div>
                <MagneticButton
                  href="/contact"
                  className="rounded-full bg-brand-500 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-brand-500/30"
                >
                  לקביעת תור
                </MagneticButton>
              </div>
            </Reveal>
          </div>
        </article>

        {/* Related */}
        <section className="border-t border-line bg-bg-elev/50 py-20">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal direction="up">
              <h2 className="text-display mb-10 text-3xl text-ink md:text-4xl">
                מאמרים נוספים
              </h2>
            </Reveal>
            <div className="grid gap-8 md:grid-cols-3">
              {related.map((p, i) => (
                <Reveal key={p.slug} direction="up" delay={i * 0.08}>
                  <Link
                    href={`/${p.slug}/`}
                    className="group block h-full overflow-hidden rounded-glass glass-strong transition-shadow duration-500 hover:shadow-2xl hover:shadow-brand-950/10"
                  >
                    <div className="relative h-44 overflow-hidden bg-gradient-to-br from-brand-400 to-brand-700">
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
                    <div className="p-5">
                      <time className="text-xs font-medium text-ink-faint">
                        {fmt(p.date)}
                      </time>
                      <h3 className="text-display mt-2 text-lg leading-snug text-ink transition-colors group-hover:text-brand-700">
                        {p.title}
                      </h3>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default async function SlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dec = decodeURIComponent(slug);

  if (dec === HUB) return <ArticlesHub />;
  if (dec === PRIVACY) return <PrivacyContent />;
  if (dec === TERMS) return <TermsContent />;

  const post = posts.find((p) => p.slug === dec);
  if (!post) notFound();
  return <PostView post={post} />;
}
