"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Clock, MapPin, Phone, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { clinic, nav } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {/* Top info bar */}
      <div className="hidden bg-brand-700 text-white/95 md:block">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-1 px-6 py-2 text-sm">
          <div className="flex items-center gap-1.5">
            <MapPin className="size-4 shrink-0 text-accent-400" />
            <span>{clinic.address}</span>
          </div>
          <div className="flex items-center gap-5">
            <a
              href={`tel:${clinic.telMobile}`}
              className="flex items-center gap-1.5 transition-colors hover:text-accent-400"
            >
              <Phone className="size-4 text-accent-400" />
              נייד: {clinic.phoneMobile}
            </a>
            <a
              href={`tel:${clinic.telClinic}`}
              className="flex items-center gap-1.5 transition-colors hover:text-accent-400"
            >
              <Phone className="size-4 text-accent-400" />
              מרפאה: {clinic.phoneClinic}
            </a>
            <span className="hidden items-center gap-1.5 lg:flex">
              <Clock className="size-4 text-accent-400" />
              {clinic.hoursShort}
            </span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div
        className={cn(
          "transition-all duration-300",
          scrolled ? "glass-strong" : "bg-transparent",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid size-11 place-items-center rounded-2xl bg-brand-500 text-lg font-black text-white shadow-lg shadow-brand-500/30">
              הוד
            </span>
            <span className="text-display text-lg leading-tight text-ink">
              ד״ר יורם הוד
              <span className="block text-[0.7rem] font-medium text-ink-faint">
                מרפאת שיניים · יהוד
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-brand-50 hover:text-brand-700"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${clinic.telMobile}`}
              className="hidden rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/30 transition-transform hover:scale-[1.03] sm:inline-flex"
            >
              קביעת תור
            </a>
            <button
              onClick={() => setOpen(true)}
              aria-label="פתיחת תפריט"
              className="grid size-11 place-items-center rounded-2xl glass lg:hidden"
            >
              <Menu className="size-5 text-ink" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="absolute inset-y-0 right-0 w-[82%] max-w-sm glass-strong p-6"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="text-display text-lg">תפריט</span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="סגירת תפריט"
                  className="grid size-10 place-items-center rounded-xl glass"
                >
                  <X className="size-5" />
                </button>
              </div>
              <nav className="flex flex-col gap-1">
                {nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-2xl px-4 py-3 text-lg font-medium text-ink-soft transition-colors hover:bg-brand-50 hover:text-brand-700"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <a
                href={`tel:${clinic.telMobile}`}
                className="mt-6 flex w-full items-center justify-center rounded-full bg-brand-500 px-5 py-3.5 font-semibold text-white"
              >
                קביעת תור · {clinic.phoneMobile}
              </a>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
