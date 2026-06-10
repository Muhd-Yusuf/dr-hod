"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ZoomImage } from "@/components/ui/ZoomImage";
import type { Article } from "@/lib/articles";
import { cn } from "@/lib/utils";

const ALL = "הכול";

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("he-IL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

export function ArticleFilter({ articles }: { articles: Article[] }) {
  const categories = useMemo(() => {
    const set = new Set(articles.map((a) => a.category));
    return [ALL, ...Array.from(set)];
  }, [articles]);

  const [active, setActive] = useState<string>(ALL);

  const filtered = useMemo(
    () =>
      active === ALL
        ? articles
        : articles.filter((a) => a.category === active),
    [active, articles]
  );

  return (
    <div>
      {/* Category filter pills */}
      <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            className={cn(
              "relative rounded-full px-6 py-2.5 text-sm font-semibold transition-colors",
              active === cat
                ? "text-white"
                : "glass text-ink-soft hover:text-ink"
            )}
          >
            {active === cat && (
              <motion.span
                layoutId="filter-pill"
                className="absolute inset-0 rounded-full bg-brand-500 shadow-lg shadow-brand-500/30"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative z-10">{cat}</span>
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((article) => (
            <motion.article
              key={article.slug}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={`/articles/${article.slug}`}
                className="group block h-full overflow-hidden rounded-glass glass-strong transition-shadow duration-500 hover:shadow-2xl hover:shadow-brand-950/10"
              >
                <div className="group relative h-56 overflow-hidden">
                  <ZoomImage
                    src={article.image}
                    alt={article.title}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    overlay
                  />
                  <span className="glass absolute right-4 top-4 rounded-full px-3.5 py-1.5 text-xs font-bold text-white">
                    {article.category}
                  </span>
                </div>
                <div className="p-6">
                  <time className="text-xs font-medium text-ink-faint">
                    {formatDate(article.date)}
                  </time>
                  <h3 className="text-display mt-2 text-xl leading-snug text-ink transition-colors group-hover:text-brand-700">
                    {article.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-soft">
                    {article.excerpt}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                    קראו עוד
                    <span className="transition-transform duration-300 group-hover:-translate-x-1">
                      ←
                    </span>
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
