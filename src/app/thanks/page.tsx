import type { Metadata } from "next";
import Link from "next/link";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { clinic } from "@/lib/site";

// Form thank-you page, preserves the live /thanks/ URL.
export const metadata: Metadata = {
  title: "תודה שפניתם אלינו | ד״ר יורם הוד",
  description: "פנייתכם התקבלה. צוות מרפאת ד״ר יורם הוד ביהוד יחזור אליכם בהקדם.",
  alternates: { canonical: "/thanks/" },
  robots: { index: false, follow: true },
};

export default function ThanksPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="mx-auto flex max-w-2xl flex-col items-center px-6 py-28 text-center">
          <Reveal direction="up">
            <span className="grid size-20 place-items-center rounded-full bg-brand-500/10 text-4xl">
              ✓
            </span>
            <h1 className="text-display mt-8 text-4xl text-ink sm:text-5xl">
              תודה שפניתם אלינו
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              פנייתכם התקבלה בהצלחה. צוות המרפאה יחזור אליכם בהקדם האפשרי לתיאום
              תור. למקרים דחופים ניתן להתקשר ישירות.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <MagneticButton
                href={`tel:${clinic.tel}`}
                className="rounded-full bg-brand-500 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-brand-500/30"
              >
                התקשרו עכשיו · {clinic.phone}
              </MagneticButton>
              <Link
                href="/"
                className="rounded-full glass px-7 py-3.5 text-sm font-semibold text-brand-700"
              >
                חזרה לדף הבית
              </Link>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
