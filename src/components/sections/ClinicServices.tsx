import {
  Sparkles,
  Bone,
  Smile,
  ShieldCheck,
  BriefcaseMedical,
  Stethoscope,
  Baby,
  Wind,
  Brain,
  Droplets,
  AlignHorizontalDistributeCenter,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

/** Full clinic service list — 1:1 with the live site's "שירותי המרפאה" grid. */
const clinicServices: { title: string; icon: LucideIcon }[] = [
  { title: "בדיקת שיניים", icon: Stethoscope },
  { title: "מרפאת חירום ועזרה ראשונה", icon: BriefcaseMedical },
  { title: "רפואת שיניים משמרת", icon: ShieldCheck },
  { title: "שיקום הפה", icon: Smile },
  { title: "שתלים", icon: Bone },
  { title: "הלבנת שיניים", icon: Sparkles },
  { title: "יישור שיניים שקוף", icon: AlignHorizontalDistributeCenter },
  { title: "ניקוי אבנית (שיננית)", icon: Droplets },
  { title: "טיפול בחרדה דנטלית", icon: Brain },
  { title: "ריח רע מהפה", icon: Wind },
  { title: "טיפול בילדים", icon: Baby },
];

export function ClinicServices() {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-brand-50/40 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal className="mb-12 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-600">
            השירותים שלנו
          </span>
          <h2 className="text-display mt-2 text-3xl text-ink sm:text-4xl">
            שירותי המרפאה
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 lg:grid-cols-6">
          {clinicServices.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.title} delay={(i % 6) * 0.05}>
                <div className="group flex flex-col items-center text-center">
                  <span className="grid size-16 place-items-center rounded-2xl glass text-brand-600 shadow-lg shadow-brand-950/5 transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-brand-500 group-hover:text-white">
                    <Icon className="size-7" strokeWidth={1.75} />
                  </span>
                  <span className="mt-3 text-sm font-medium leading-snug text-ink-soft">
                    {s.title}
                  </span>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-14 max-w-3xl space-y-4 text-center text-lg leading-relaxed text-ink-soft">
            <p>
              כל פציינט הוא אדם מיוחד שזקוק לחיוך נחמד ויחס חם. המרפאה שלנו היא
              קודם כל מקום לאנשים, מקום חם ונעים, והצוות שלנו עושה ככל יכולתו כדי
              שהחוויה תהיה נעימה ככל הניתן.
            </p>
            <p>
              כמו כן אנו מציעים עזרה ראשונה ומרפאת חירום גם בסופי שבוע וחגים,
              בתיאום טלפוני.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
