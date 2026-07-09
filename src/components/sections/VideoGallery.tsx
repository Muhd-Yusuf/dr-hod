"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { videos } from "@/lib/site";

/**
 * Click-to-play YouTube facade, shows the thumbnail until clicked,
 * then swaps in the iframe. Avoids loading 4 heavy embeds up front.
 */
function VideoCard({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="group relative aspect-video overflow-hidden rounded-glass glass shadow-lg shadow-brand-950/10 ring-1 ring-white/30">
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`נגן: ${title}`}
          className="absolute inset-0 h-full w-full"
        >
          <Image
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-brand-950/70 via-brand-950/10 to-transparent" />
          <span className="absolute inset-0 grid place-items-center">
            <span className="grid size-16 place-items-center rounded-full bg-white/90 text-brand-600 shadow-xl transition-transform duration-300 group-hover:scale-110">
              <Play className="size-7 translate-x-0.5 fill-brand-600" />
            </span>
          </span>
          <span className="absolute inset-x-0 bottom-0 p-4 text-right text-sm font-medium text-white drop-shadow">
            {title}
          </span>
        </button>
      )}
    </div>
  );
}

export function VideoGallery() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <Reveal className="mb-12 text-center">
        <span className="text-sm font-semibold uppercase tracking-wider text-brand-600">
          וידאו
        </span>
        <h2 className="text-display mt-2 text-3xl text-ink sm:text-4xl">
          הצצה למרפאה ולטיפולים
        </h2>
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
        {videos.map((v, i) => (
          <Reveal key={v.id} delay={(i % 2) * 0.05}>
            <VideoCard id={v.id} title={v.title} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
