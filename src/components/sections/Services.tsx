"use client";

import {
  Sparkles,
  Stethoscope,
  Smile,
  HeartPulse,
  Moon,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/lib/site";

const icons: Record<string, LucideIcon> = {
  sparkles: Sparkles,
  implant: Stethoscope,
  smile: Smile,
  "first-aid": HeartPulse,
  moon: Moon,
  tooth: ShieldCheck,
};

const blurb: Record<string, string> = {
  whitening: "הלבנה מקצועית לחיוך בהיר ומבריק, בשיטות עדינות ובטוחות.",
  implants: "השתלות מתקדמות לשיקום מלא של מראה ותפקוד השיניים.",
  rehabilitation: "שיקום הפה המלא — מבנים, כתרים וגשרים בהתאמה אישית.",
  emergency: "מענה מהיר לכאב, שבר או דימום — גם בסופי שבוע וחגים.",
  snoring: "טיפול חדשני בנחירות בלייזר FOTONA — לא פולשני וללא כאב.",
  general: "בדיקות, סתימות וטיפולים שמרניים לכל המשפחה.",
};

export function Services() {
  const reduce = useReducedMotion();

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
        {services.map((s, i) => {
          const Icon = icons[s.icon] ?? ShieldCheck;
          return (
            <Reveal key={s.slug} delay={i * 0.05}>
              <motion.article
                whileHover={reduce ? undefined : { y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group relative h-full overflow-hidden rounded-glass glass p-6"
              >
                <div className="absolute -right-10 -top-10 size-28 rounded-full bg-brand-400/20 blur-2xl transition-opacity group-hover:opacity-100 opacity-0" />
                <span className="grid size-14 place-items-center rounded-2xl bg-brand-500/10 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                  <Icon className="size-7" />
                </span>
                <h3 className="text-display mt-5 text-xl text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {blurb[s.slug]}
                </p>
              </motion.article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
