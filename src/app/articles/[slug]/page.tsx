import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { KenBurns } from "@/components/ui/KenBurns";
import { ZoomImage } from "@/components/ui/ZoomImage";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { articles, getArticle } from "@/lib/articles";

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("he-IL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) {
    return { title: "מאמר לא נמצא | ד״ר יורם הוד" };
  }
  return {
    title: `${article.title} | ד״ר יורם הוד`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.image }],
      type: "article",
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = articles.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative">
          <KenBurns
            src={article.image}
            alt={article.title}
            className="h-[26rem] md:h-[32rem]"
            priority
            overlay
            sizes="100vw"
          />
          <div className="absolute inset-0 flex items-end">
            <div className="mx-auto w-full max-w-4xl px-6 pb-14">
              <Reveal direction="up">
                <span className="glass mb-4 inline-block rounded-full px-4 py-1.5 text-xs font-bold text-white">
                  {article.category}
                </span>
                <h1 className="text-display text-3xl leading-tight text-white drop-shadow-sm md:text-5xl">
                  {article.title}
                </h1>
                <time className="mt-4 block text-sm font-medium text-white/80">
                  {formatDate(article.date)}
                </time>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Body */}
        <article className="py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-6">
            <Reveal direction="up">
              <p className="mb-10 border-r-4 border-brand-500 pr-5 text-xl font-medium leading-relaxed text-ink">
                {article.excerpt}
              </p>
            </Reveal>
            <div className="space-y-6">
              {article.body.map((para, i) => (
                <Reveal key={i} direction="up" delay={i * 0.05}>
                  <p className="text-lg leading-relaxed text-ink-soft">
                    {para}
                  </p>
                </Reveal>
              ))}
            </div>

            {/* CTA */}
            <Reveal direction="up">
              <div className="mt-14 flex flex-wrap items-center gap-4 rounded-glass glass-strong p-8">
                <div className="flex-1">
                  <h2 className="text-display text-xl text-ink">
                    יש לכם שאלה? אנחנו כאן בשבילכם
                  </h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                    קבעו תור או צרו קשר לקבלת ייעוץ אישי ומקצועי.
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
              {related.map((a, i) => (
                <Reveal key={a.slug} direction="up" delay={i * 0.08}>
                  <Link
                    href={`/articles/${a.slug}`}
                    className="group block h-full overflow-hidden rounded-glass glass-strong transition-shadow duration-500 hover:shadow-2xl hover:shadow-brand-950/10"
                  >
                    <div className="group relative h-44 overflow-hidden">
                      <ZoomImage
                        src={a.image}
                        alt={a.title}
                        sizes="(max-width: 768px) 100vw, 33vw"
                        overlay
                      />
                      <span className="glass absolute right-4 top-4 rounded-full px-3 py-1 text-[11px] font-bold text-white">
                        {a.category}
                      </span>
                    </div>
                    <div className="p-5">
                      <time className="text-xs font-medium text-ink-faint">
                        {formatDate(a.date)}
                      </time>
                      <h3 className="text-display mt-2 text-lg leading-snug text-ink transition-colors group-hover:text-brand-700">
                        {a.title}
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
