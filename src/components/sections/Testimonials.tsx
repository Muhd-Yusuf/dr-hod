"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Star, ChevronRight, ChevronLeft, Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { testimonials } from "@/lib/testimonials";

const AUTOPLAY_MS = 6000;

export function Testimonials() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const count = testimonials.length;

  const go = useCallback(
    (next: number, d: number) => {
      setDir(d);
      setIndex(((next % count) + count) % count);
    },
    [count],
  );

  const prev = () => go(index - 1, -1);
  const next = () => go(index + 1, 1);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => go(index + 1, 1), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [index, go, reduce]);

  const t = testimonials[index];

  return (
    <section className="relative overflow-hidden py-24">
      {/* soft brand wash */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand-50/60 to-transparent" />

      <div className="relative mx-auto max-w-4xl px-6">
        <Reveal className="mb-12 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-600">
            המלצות מטופלים
          </span>
          <h2 className="text-display mt-2 text-3xl text-ink sm:text-4xl">
            מה מספרים עלינו המטופלים
          </h2>
        </Reveal>

        <div className="relative rounded-glass glass-strong px-6 py-12 shadow-xl sm:px-14">
          <Quote className="absolute right-7 top-7 size-12 text-brand-500/15" />

          <div className="relative min-h-[18rem] sm:min-h-[15rem]">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={index}
                custom={dir}
                initial={
                  reduce ? false : { opacity: 0, x: dir > 0 ? 40 : -40 }
                }
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? undefined : { opacity: 0, x: dir > 0 ? -40 : 40 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center text-center"
              >
                <span className="relative mb-5 block size-20 overflow-hidden rounded-full ring-4 ring-white/70 shadow-lg">
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </span>

                <div className="mb-4 flex items-center gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="size-5 fill-accent-500 text-accent-500"
                    />
                  ))}
                </div>

                <p className="max-w-2xl text-lg leading-relaxed text-ink sm:text-xl">
                  ״{t.text}״
                </p>

                <div className="text-display mt-6 text-lg text-brand-700">
                  {t.name}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* controls */}
          <div className="mt-8 flex items-center justify-center gap-6">
            <button
              onClick={prev}
              aria-label="הקודם"
              className="grid size-11 place-items-center rounded-full glass text-brand-700 transition-colors hover:bg-brand-500 hover:text-white"
            >
              <ChevronRight className="size-5" />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i, i > index ? 1 : -1)}
                  aria-label={`המלצה ${i + 1}`}
                  className={cn(
                    "h-2 rounded-full transition-all",
                    i === index
                      ? "w-7 bg-brand-500"
                      : "w-2 bg-brand-500/30 hover:bg-brand-500/50",
                  )}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="הבא"
              className="grid size-11 place-items-center rounded-full glass text-brand-700 transition-colors hover:bg-brand-500 hover:text-white"
            >
              <ChevronLeft className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
