import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { ZoomImage } from "@/components/ui/ZoomImage";
import { services } from "@/lib/site";
import { img } from "@/lib/images";

const blurb: Record<string, string> = {
  whitening: "הלבנה מקצועית לחיוך בהיר ומבריק, בשיטות עדינות ובטוחות.",
  implants: "השתלות מתקדמות לשיקום מלא של מראה ותפקוד השיניים.",
  rehabilitation: "שיקום הפה המלא — מבנים, כתרים וגשרים בהתאמה אישית.",
  emergency: "מענה מהיר לכאב, שבר או דימום — גם בסופי שבוע וחגים.",
  snoring: "טיפול חדשני בנחירות בלייזר FOTONA — לא פולשני וללא כאב.",
  general: "בדיקות, סתימות וטיפולים שמרניים לכל המשפחה.",
};

export function Services() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-6 py-20">
      <Reveal className="mb-12 text-center">
        <span className="text-sm font-semibold uppercase tracking-wider text-brand-600">
          השירותים שלנו
        </span>
        <h2 className="text-display mt-2 text-3xl text-ink sm:text-4xl">
          טיפול שלם, תחת קורת גג אחת
        </h2>
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <Reveal key={s.slug} delay={i * 0.05}>
            <Link
              href={`/services/${s.slug}`}
              className="group relative block h-72 overflow-hidden rounded-glass shadow-lg shadow-brand-950/10 ring-1 ring-white/30 transition-shadow hover:shadow-2xl hover:shadow-brand-950/20"
            >
              <ZoomImage
                src={img.services[s.slug].src}
                alt={img.services[s.slug].alt}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                overlay
              />
              {/* extra bottom darkening for legible text */}
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-brand-950/90 via-brand-950/40 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="text-display text-xl text-white drop-shadow">
                  {s.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/80">
                  {blurb[s.slug]}
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-400 transition-transform group-hover:-translate-x-1">
                  קראו עוד
                  <ArrowLeft className="size-4" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
