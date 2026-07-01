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
import { KenBurns } from "@/components/ui/KenBurns";
import { ZoomImage } from "@/components/ui/ZoomImage";
import { clinic } from "@/lib/site";
import { img } from "@/lib/images";

/**
 * Cinematic, image-rich hero.
 * Large Ken-Burns photograph of a real patient + floating glass cards
 * with the clinic interior and Dr. Hod, all drifting toward the cursor
 * at different rates for true parallax depth.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 20, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 120, damping: 20, mass: 0.6 });

  // Layer depths (px of travel)
  const farX = useTransform(sx, [-0.5, 0.5], [-10, 10]);
  const farY = useTransform(sy, [-0.5, 0.5], [-10, 10]);
  const midX = useTransform(sx, [-0.5, 0.5], [-22, 22]);
  const midY = useTransform(sy, [-0.5, 0.5], [-22, 22]);
  const nearX = useTransform(sx, [-0.5, 0.5], [-40, 40]);
  const nearY = useTransform(sy, [-0.5, 0.5], [-40, 40]);

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
            למעלה מ-40 שנות ניסיון · יהוד והסביבה
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
              href={`tel:${clinic.tel}`}
              className="bg-brand-500 text-white shadow-xl shadow-brand-500/30"
            >
              קביעת תור · {clinic.phone}
            </MagneticButton>
            <MagneticButton href="/services" className="glass text-brand-700">
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

        {/* Cinematic photographic visual */}
        <div className="relative h-[28rem] sm:h-[32rem]">
          {/* Glow behind */}
          <motion.div
            style={reduce ? undefined : { x: farX, y: farY }}
            className="absolute inset-x-6 top-4 bottom-8 rounded-[2.5rem] bg-gradient-to-br from-brand-400/30 to-brand-700/30 blur-3xl"
          />

          {/* Main hero photo (mid layer) */}
          <motion.div
            style={reduce ? undefined : { x: midX, y: midY }}
            className="absolute inset-4"
          >
            <KenBurns
              src={img.heroPatient.src}
              alt={img.heroPatient.alt}
              priority
              overlay
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="h-full w-full rounded-[2.25rem] shadow-2xl shadow-brand-950/20 ring-1 ring-white/40"
            />
          </motion.div>

          {/* Floating clinic-interior card (near layer) */}
          <motion.div
            style={reduce ? undefined : { x: nearX, y: nearY }}
            className="group absolute -left-3 bottom-6 h-32 w-44 overflow-hidden rounded-2xl shadow-xl shadow-brand-950/25 ring-1 ring-white/50 sm:-left-6 sm:h-36 sm:w-52"
          >
            <ZoomImage
              src={img.clinicInterior.src}
              alt={img.clinicInterior.alt}
              sizes="220px"
              overlay
            />
            <span className="absolute bottom-2 right-3 text-xs font-semibold text-white drop-shadow">
              המרפאה שלנו
            </span>
          </motion.div>

          {/* Floating Dr. Hod card (near layer) */}
          <motion.div
            style={reduce ? undefined : { x: nearX, y: nearY }}
            className="group absolute -right-3 top-8 flex items-center gap-3 rounded-2xl glass-strong px-3 py-3 shadow-xl sm:-right-5"
          >
            <span className="relative block size-12 overflow-hidden rounded-full ring-2 ring-white/60">
              <ZoomImage
                src={img.drHod.src}
                alt={img.drHod.alt}
                sizes="48px"
              />
            </span>
            <div className="leading-tight">
              <div className="text-display text-sm text-ink">ד״ר יורם הוד</div>
              <div className="flex items-center gap-1 text-xs text-ink-faint">
                <Star className="size-3.5 fill-accent-500 text-accent-500" />
                5.0 · מומלץ ביהוד
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
