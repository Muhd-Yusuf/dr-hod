import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { KenBurns } from "@/components/ui/KenBurns";
import { Reveal } from "@/components/ui/Reveal";
import { articles } from "@/lib/articles";
import { img } from "@/lib/images";
import { ArticleFilter } from "./_Filter";

export const metadata: Metadata = {
  title: "מאמרים | ד״ר יורם הוד — מרפאת שיניים ביהוד",
  description:
    "מאמרים, טיפים ומידע מקצועי בתחום רפואת השיניים — טיפולי חירום, נחירות, השתלות ושמירה על בריאות הפה, מאת ד״ר יורם הוד.",
};

export default function ArticlesPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative">
          <KenBurns
            src={img.clinicInterior.src}
            alt={img.clinicInterior.alt}
            className="h-[24rem] md:h-[28rem]"
            priority
            overlay
            sizes="100vw"
          />
          <div className="absolute inset-0 flex items-end">
            <div className="mx-auto w-full max-w-7xl px-6 pb-12">
              <Reveal direction="up">
                <span className="glass mb-4 inline-block rounded-full px-4 py-1.5 text-xs font-bold text-white">
                  הבלוג של המרפאה
                </span>
                <h1 className="text-display text-4xl text-white drop-shadow-sm md:text-6xl">
                  מאמרים
                </h1>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
                  מידע מקצועי, טיפים ועדכונים מעולם רפואת השיניים — כדי שתדעו
                  בדיוק איך לשמור על חיוך בריא.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Grid + filter */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal direction="up">
              <ArticleFilter articles={articles} />
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
