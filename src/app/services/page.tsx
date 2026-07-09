import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { KenBurns } from "@/components/ui/KenBurns";
import { ZoomImage } from "@/components/ui/ZoomImage";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { clinic, services } from "@/lib/site";
import { img } from "@/lib/images";

export const metadata: Metadata = {
  title: "השירותים שלנו | ד״ר יורם הוד, מרפאת שיניים ביהוד",
  description:
    "מגוון טיפולי שיניים מתקדמים במרפאת ד״ר יורם הוד ביהוד: הלבנת שיניים, השתלות, שיקום הפה, טיפולי חירום, טיפול בנחירות בלייזר FOTONA ורפואת שיניים כללית.",
};

const SERVICE_TEASERS: Record<(typeof services)[number]["slug"], string> = {
  whitening:
    "חיוך מבריק ובהיר יותר בטיפול הלבנה עדין, בטוח ויעיל המותאם אישית.",
  implants:
    "השתלות שיניים בטכנולוגיה מתקדמת, פתרון קבוע, אסתטי וטבעי לשיניים חסרות.",
  rehabilitation:
    "שיקום פה מלא המחזיר תפקוד, אסתטיקה ובריאות לחיוך שלכם, צעד אחר צעד.",
  emergency:
    "כאב פתאומי או שבר? אנו כאן עבורכם עם מענה מהיר וטיפולי חירום זמינים.",
  snoring:
    "טיפול לייזר FOTONA לא פולשני המפחית נחירות ומשפר את איכות השינה.",
  seniors:
    "טיפול שיניים מותאם לבני הגיל השלישי, שיקום לעיסה ושיקום הפה בקצב נוח ורגיש.",
  general:
    "בדיקות, סתימות, ניקוי אבנית וטיפול שורש, שגרת טיפול מקיפה לכל המשפחה.",
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative">
          <KenBurns
            src={img.clinicInterior.src}
            alt={img.clinicInterior.alt}
            className="h-[24rem] md:h-[30rem]"
            priority
            overlay
            sizes="100vw"
          />
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto w-full max-w-7xl px-6">
              <Reveal direction="up">
                <p className="mb-3 font-semibold tracking-wide text-accent-400">
                  {clinic.name}
                </p>
                <h1 className="text-display text-4xl font-bold text-white md:text-6xl">
                  השירותים שלנו
                </h1>
                <p className="mt-4 max-w-2xl text-lg text-white/85 md:text-xl">
                  מגוון רחב של טיפולי שיניים מתקדמים, בסביבה רגועה ובטכנולוגיה
                  חדשנית, הכל תחת קורת גג אחת ביהוד.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Services grid */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service, i) => (
                <Reveal key={service.slug} direction="up" delay={i * 0.08}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group glass relative block overflow-hidden rounded-glass border border-line transition-shadow duration-500 hover:shadow-2xl hover:shadow-brand-500/20"
                  >
                    <div className="relative h-60 overflow-hidden">
                      <ZoomImage
                        src={img.services[service.slug].src}
                        alt={img.services[service.slug].alt}
                        overlay
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <h2 className="text-display absolute bottom-4 right-5 left-5 text-2xl font-bold text-white">
                        {service.title}
                      </h2>
                    </div>
                    <div className="p-6">
                      <p className="text-ink-soft leading-relaxed">
                        {SERVICE_TEASERS[service.slug]}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-2 font-semibold text-brand-700 transition-colors group-hover:text-brand-500">
                        קראו עוד
                        <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>

            {/* CTA */}
            <Reveal direction="up" className="mt-16 text-center">
              <h3 className="text-display text-2xl font-bold text-ink md:text-3xl">
                לא בטוחים איזה טיפול מתאים לכם?
              </h3>
              <p className="mt-3 text-ink-soft">
                נשמח לייעץ ולהתאים לכם תוכנית טיפול אישית. התקשרו עוד היום.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-4">
                <MagneticButton
                  href={`tel:${clinic.tel}`}
                  className="bg-brand-500 text-white shadow-xl shadow-brand-500/30"
                >
                  חייגו {clinic.phone}
                </MagneticButton>
                <MagneticButton
                  href="/contact"
                  className="glass-strong border border-line text-ink"
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
