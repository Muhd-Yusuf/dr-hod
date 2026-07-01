import type { Metadata } from "next";
import Image from "next/image";
import { Star, Phone } from "lucide-react";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { KenBurns } from "@/components/ui/KenBurns";
import { testimonials } from "@/lib/testimonials";
import { clinic } from "@/lib/site";
import { img } from "@/lib/images";

export const metadata: Metadata = {
  title: "המלצות מטופלים | ד״ר יורם הוד — מרפאת שיניים ביהוד",
  description:
    "מה מטופלים מספרים על ד״ר יורם הוד? חוויות אמיתיות, יחס אישי וטיפול נטול כאב. קראו את ההמלצות והצטרפו למשפחת המטופלים המרוצים שלנו ביהוד.",
};

export default function RecommendationsPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="relative overflow-hidden">
          <KenBurns
            src={img.heroPatient.src}
            alt={img.heroPatient.alt}
            className="absolute inset-0 h-full w-full"
            sizes="100vw"
            priority
            overlay
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-950/60 via-brand-950/40 to-bg" />
          <div className="relative mx-auto max-w-7xl px-6 py-32 text-center md:py-40">
            <Reveal direction="up">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full glass-strong px-4 py-1.5 text-sm font-medium text-white/90">
                <Star className="size-4 fill-accent-500 text-accent-500" />
                דירוג 5.0 ממאות מטופלים
              </span>
            </Reveal>
            <Reveal direction="up" delay={0.1}>
              <h1 className="text-display text-4xl font-bold text-white md:text-6xl">
                המלצות מטופלים
              </h1>
            </Reveal>
            <Reveal direction="up" delay={0.2}>
              <p className="mx-auto mt-5 max-w-2xl text-lg text-white/85 md:text-xl">
                הסיפורים האמיתיים מאחורי החיוכים. מטופלים משתפים על היחס האישי,
                האווירה הרגועה והטיפול העדין במרפאתו של ד״ר יורם הוד.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── Testimonials wall ────────────────────────────── */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal direction="up" className="mb-14 text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-brand-600">
                קולות מהשטח
              </p>
              <h2 className="text-display mt-2 text-3xl font-bold text-ink md:text-4xl">
                מטופלים מספרים
              </h2>
            </Reveal>

            <div className="columns-1 gap-7 md:columns-2 lg:columns-3 [&>*]:mb-7 [&>*]:break-inside-avoid">
              {testimonials.map((t, i) => (
                <Reveal key={t.name} direction="up" delay={(i % 3) * 0.1}>
                  <figure className="glass rounded-glass p-7 shadow-xl shadow-brand-950/5 transition-transform duration-300 hover:-translate-y-1">
                    <div className="mb-5 flex items-center gap-1">
                      {Array.from({ length: t.rating }).map((_, s) => (
                        <Star
                          key={s}
                          className="size-5 fill-accent-500 text-accent-500"
                        />
                      ))}
                    </div>
                    <blockquote className="text-lg leading-relaxed text-ink-soft">
                      “{t.text}”
                    </blockquote>
                    <figcaption className="mt-6 flex items-center gap-4 border-t border-line pt-5">
                      <span className="relative size-14 shrink-0 overflow-hidden rounded-full ring-2 ring-brand-500/20">
                        <Image
                          src={t.image}
                          alt={t.name}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </span>
                      <div>
                        <p className="font-semibold text-ink">{t.name}</p>
                        <p className="text-sm text-ink-faint">מטופל/ת מרוצה</p>
                      </div>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Closing CTA ──────────────────────────────────── */}
        <section className="relative overflow-hidden">
          <KenBurns
            src={img.ctaBg.src}
            alt={img.ctaBg.alt}
            className="absolute inset-0 h-full w-full"
            sizes="100vw"
            overlay
          />
          <div className="absolute inset-0 bg-brand-950/70" />
          <div className="relative mx-auto max-w-3xl px-6 py-24 text-center">
            <Reveal direction="up">
              <h2 className="text-display text-3xl font-bold text-white md:text-5xl">
                רוצים להצטרף למשפחת המטופלים שלנו?
              </h2>
            </Reveal>
            <Reveal direction="up" delay={0.1}>
              <p className="mx-auto mt-5 max-w-xl text-lg text-white/85">
                קבעו תור עוד היום ותגלו בעצמכם למה כל כך הרבה מטופלים ממליצים על
                ד״ר יורם הוד.
              </p>
            </Reveal>
            <Reveal direction="up" delay={0.2}>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <MagneticButton
                  href={`tel:${clinic.tel}`}
                  className="bg-accent-500 text-white shadow-xl shadow-accent-500/30"
                >
                  <Phone className="size-5" />
                  {clinic.phone}
                </MagneticButton>
                <MagneticButton
                  href="/contact"
                  className="glass-strong text-white"
                >
                  צרו קשר
                </MagneticButton>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
