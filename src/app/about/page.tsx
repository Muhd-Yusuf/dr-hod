import type { Metadata } from "next";
import Image from "next/image";
import {
  HeartHandshake,
  ShieldCheck,
  Smile,
  Sparkles,
  Baby,
  Stethoscope,
  Check,
} from "lucide-react";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { KenBurns } from "@/components/ui/KenBurns";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { clinic } from "@/lib/site";
import { img } from "@/lib/images";

export const metadata: Metadata = {
  title: "אודות ד״ר יורם הוד | רופא שיניים מנוסה ביהוד",
  description:
    "ד״ר יורם הוד — למעלה מ-40 שנות ניסיון ברפואת שיניים. טיפול בילדים, מבוגרים וקשישים באווירה ביתית ורגועה, עם מענה מיוחד למטופלים חרדתיים ולציבור הדתי.",
};

/** Treatment list — verbatim from the live site's "אודות" block. */
const treatments = [
  "טיפולי חירום ועזרה ראשונה",
  "רפואת שיניים משמרת: עקירות, סתימות, טיפולי שורש, ניקוי אבנית, טיפולי חניכיים",
  "רפואת שיניים משקמת: כתרים, שתלים, גשרים, תותבות",
  "הלבנת שיניים מדהימה בטיפול אחד",
  "יישור שיניים שקוף",
];

const stats = [
  { value: "+40", label: "שנות ניסיון" },
  { value: "אלפי", label: "מטופלים מרוצים" },
  { value: "5.0", label: "דירוג מטופלים" },
];

const values = [
  {
    icon: HeartHandshake,
    title: "יחס אישי וחם",
    text: "כל מטופל מקבל הקשבה, סבלנות ותשומת לב מלאה — כמו בבית.",
  },
  {
    icon: ShieldCheck,
    title: "טיפול נטול כאב",
    text: "טיפולי שיניים בלייזר פוטונה — לרוב ללא קידוח, ללא הרדמה וללא כאב.",
  },
  {
    icon: Smile,
    title: "מענה למטופלים חרדתיים",
    text: "דיקור סיני, צפייה בטלוויזיה ואפילו מספר בדיחות — להרגעה מלאה וללא לחץ.",
  },
  {
    icon: Baby,
    title: "לכל המשפחה",
    text: "טיפול בילדים, מבוגרים וקשישים תחת קורת גג אחת.",
  },
  {
    icon: Sparkles,
    title: "טכנולוגיה מתקדמת",
    text: "ציוד חדיש וטכנולוגיות לייזר לתוצאות מדויקות ומהירות.",
  },
  {
    icon: Stethoscope,
    title: "מקצועיות ללא פשרות",
    text: "סטנדרט טיפול גבוה המבוסס על שנים של ידע וניסיון.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* ── Two-column intro ─────────────────────────────── */}
        <section className="relative overflow-hidden py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <Reveal direction="right">
                <div className="group relative">
                  <div className="absolute -inset-3 -z-10 rounded-glass bg-gradient-to-tr from-brand-500/20 to-accent-500/20 blur-2xl" />
                  <div className="relative aspect-[4/5] overflow-hidden rounded-glass glass p-2 shadow-2xl shadow-brand-950/10">
                    <div className="relative h-full w-full overflow-hidden rounded-[1.4rem]">
                      <Image
                        src={img.drHod.src}
                        alt={img.drHod.alt}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </Reveal>

              <div>
                <Reveal direction="left">
                  <p className="text-sm font-semibold uppercase tracking-widest text-brand-600">
                    אודות
                  </p>
                  <h1 className="text-display mt-2 text-4xl font-bold text-ink md:text-5xl">
                    ד״ר יורם הוד
                  </h1>
                </Reveal>
                <Reveal direction="left" delay={0.1}>
                  <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink-soft">
                    <p>
                      עם למעלה מ-40 שנות ניסיון ברפואת שיניים, ד״ר יורם הוד מביא
                      איתו ידע מקצועי עמוק לצד גישה אנושית וחמה. במרפאתו שביהוד הוא
                      מטפל במבוגרים, בילדים ובקשישים — תוך מתן יחס אישי לכל מטופל.
                    </p>
                    <p>
                      המרפאה תוכננה כדי ליצור אווירה ביתית ורגועה, רחוקה מהמתח
                      שמזוהה לעיתים עם ביקור אצל רופא שיניים. כאן כל מטופל מרגיש
                      בנוח, נשמע ומלווה לאורך כל הדרך.
                    </p>
                    <p>
                      ד״ר הוד נותן מענה מיוחד לציבור החרדי (לחרדים מטיפול
                      שיניים!), בטיפול רגוע וללא לחץ. נעזר בדיקור סיני ו-NLP
                      להורדת מתח, צפייה בטלוויזיה ואפילו מספר בדיחות. הטיפול ניתן
                      באווירה רגועה, ללא לחץ ובלי כאבים.
                    </p>
                  </div>
                </Reveal>

                <Reveal direction="left" delay={0.15}>
                  <div className="mt-8">
                    <p className="text-ink-soft">
                      במרפאתו מבוצעים מגוון רחב של טיפולי שיניים. בין הטיפולים
                      אותם מעניק ד״ר יורם הוד ניתן למנות:
                    </p>
                    <ul className="mt-4 space-y-3">
                      {treatments.map((t) => (
                        <li key={t} className="flex items-start gap-3">
                          <Check className="mt-1 size-5 shrink-0 text-brand-500" />
                          <span className="leading-relaxed text-ink-soft">
                            {t}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats strip ──────────────────────────────────── */}
        <section className="border-y border-line bg-bg-elev py-14">
          <div className="mx-auto max-w-5xl px-6">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              {stats.map((s, i) => (
                <Reveal key={s.label} direction="up" delay={i * 0.1}>
                  <div className="text-center">
                    <p className="text-display text-5xl font-bold text-brand-600 md:text-6xl">
                      {s.value}
                    </p>
                    <p className="mt-2 text-lg font-medium text-ink-soft">
                      {s.label}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Values grid ──────────────────────────────────── */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal direction="up" className="mb-14 text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-brand-600">
                הערכים שלנו
              </p>
              <h2 className="text-display mt-2 text-3xl font-bold text-ink md:text-4xl">
                מה הופך את הטיפול שלנו לאחר
              </h2>
            </Reveal>

            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {values.map((v, i) => {
                const Icon = v.icon;
                return (
                  <Reveal key={v.title} direction="up" delay={(i % 3) * 0.1}>
                    <div className="group h-full rounded-glass glass p-7 shadow-xl shadow-brand-950/5 transition-transform duration-300 hover:-translate-y-1">
                      <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                        <Icon className="size-7" />
                      </span>
                      <h3 className="text-display mt-5 text-xl font-bold text-ink">
                        {v.title}
                      </h3>
                      <p className="mt-2 leading-relaxed text-ink-soft">
                        {v.text}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Clinic image (Ken Burns) ─────────────────────── */}
        <section className="relative overflow-hidden">
          <KenBurns
            src={img.clinicInterior.src}
            alt={img.clinicInterior.alt}
            className="relative h-[28rem] md:h-[34rem]"
            sizes="100vw"
            overlay
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-brand-950/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-6 pb-12 md:pb-16">
            <Reveal direction="up">
              <h2 className="text-display max-w-2xl text-3xl font-bold text-white md:text-4xl">
                מרפאה שנעים להגיע אליה
              </h2>
              <p className="mt-3 max-w-xl text-lg text-white/85">
                חלל מודרני, נקי ומזמין שתוכנן כדי שתרגישו בבית מהרגע שתיכנסו.
              </p>
              <div className="mt-7">
                <MagneticButton
                  href="/contact"
                  className="bg-accent-500 text-white shadow-xl shadow-accent-500/30"
                >
                  קבעו תור
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
