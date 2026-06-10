"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { ShieldCheck, Star, Clock } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { clinic } from "@/lib/site";

/**
 * Cinematic hero with cursor-reactive parallax depth.
 * The current site swaps flat images on hover; here the whole scene has
 * real depth — layers drift toward the cursor at different rates.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 20, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 120, damping: 20, mass: 0.6 });

  // Layer depths (px of travel)
  const farX = useTransform(sx, [-0.5, 0.5], [-12, 12]);
  const farY = useTransform(sy, [-0.5, 0.5], [-12, 12]);
  const midX = useTransform(sx, [-0.5, 0.5], [-26, 26]);
  const midY = useTransform(sy, [-0.5, 0.5], [-26, 26]);
  const nearX = useTransform(sx, [-0.5, 0.5], [-44, 44]);
  const nearY = useTransform(sy, [-0.5, 0.5], [-44, 44]);

  function onMove(e: React.MouseEvent) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      className="relative overflow-hidden pt-10 pb-24 sm:pt-16"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1.05fr_1fr]">
        {/* Copy */}
        <div className="relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-sm font-medium text-brand-700"
          >
            <Star className="size-4 fill-accent-500 text-accent-500" />
            למעלה מ-30 שנות ניסיון · יהוד והסביבה
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="text-display mt-5 text-4xl text-ink sm:text-5xl lg:text-6xl"
          >
            חיוך בריא,
            <br />
            <span className="bg-gradient-to-l from-brand-500 to-brand-700 bg-clip-text text-transparent">
              באווירה רגועה
            </span>{" "}
            ומקצועית
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft"
          >
            מרפאת השיניים של ד״ר יורם הוד מציעה טיפול מסור ומדויק — השתלות,
            הלבנה, שיקום הפה, טיפולי חירום וטיפול בנחירות בלייזר FOTONA — תוך
            הקפדה על נוחות ושקט נפשי לכל מטופל.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <MagneticButton
              href={`tel:${clinic.telMobile}`}
              className="bg-brand-500 text-white shadow-xl shadow-brand-500/30"
            >
              קביעת תור · {clinic.phoneMobile}
            </MagneticButton>
            <MagneticButton
              href="/services"
              className="glass text-brand-700"
            >
              השירותים שלנו
            </MagneticButton>
          </motion.div>

          <div className="mt-9 flex flex-wrap gap-6 text-sm text-ink-soft">
            <span className="flex items-center gap-2">
              <ShieldCheck className="size-5 text-brand-500" />
              טיפול ללא כאב וחרדה
            </span>
            <span className="flex items-center gap-2">
              <Clock className="size-5 text-brand-500" />
              חירום גם בסופי שבוע וחגים
            </span>
          </div>
        </div>

        {/* Parallax visual */}
        <div className="relative h-[26rem] sm:h-[30rem]">
          <motion.div
            style={reduce ? undefined : { x: farX, y: farY }}
            className="absolute inset-x-8 top-6 bottom-10 rounded-[2.5rem] bg-gradient-to-br from-brand-400/30 to-brand-700/30 blur-2xl"
          />
          <motion.div
            style={reduce ? undefined : { x: midX, y: midY }}
            className="absolute inset-6 grid place-items-center rounded-[2.5rem] glass-strong"
          >
            <span className="text-[9rem] leading-none drop-shadow-xl">🦷</span>
          </motion.div>

          {/* Floating trust cards (near layer) */}
          <motion.div
            style={reduce ? undefined : { x: nearX, y: nearY }}
            className="absolute -right-2 top-10 rounded-2xl glass-strong px-4 py-3 shadow-lg"
          >
            <div className="text-display text-2xl text-brand-600">30+</div>
            <div className="text-xs text-ink-faint">שנות ניסיון</div>
          </motion.div>
          <motion.div
            style={reduce ? undefined : { x: nearX, y: nearY }}
            className="absolute -left-2 bottom-8 flex items-center gap-2 rounded-2xl glass-strong px-4 py-3 shadow-lg"
          >
            <Star className="size-5 fill-accent-500 text-accent-500" />
            <div>
              <div className="text-display text-lg leading-none text-ink">5.0</div>
              <div className="text-xs text-ink-faint">מטופלים ממליצים</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
