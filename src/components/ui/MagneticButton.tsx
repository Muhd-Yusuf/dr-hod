"use client";

import { type ReactNode, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Button/link that gently pulls toward the cursor on hover ("magnetic").
 * One of the signature premium micro-interactions. Falls back to a plain
 * element when reduced motion is requested.
 */
export function MagneticButton({
  children,
  className,
  href,
  onClick,
  strength = 0.35,
}: {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  strength?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  function handleMove(e: React.MouseEvent) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  }
  function reset() {
    x.set(0);
    y.set(0);
  }

  const base =
    "liquid-sheen overflow-hidden inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-semibold transition-colors will-change-transform";
  const style = reduce ? undefined : { x: sx, y: sy };

  if (href) {
    return (
      <motion.a
        ref={ref}
        href={href}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        style={style}
        className={cn(base, className)}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={style}
      className={cn(base, className)}
    >
      {children}
    </motion.button>
  );
}
