import { Reveal } from "@/components/ui/Reveal";
import { ZoomImage } from "@/components/ui/ZoomImage";
import { img } from "@/lib/images";

/** Distinct gallery photography, unique images, not reused elsewhere. */
const spans = [
  "sm:col-span-2 sm:row-span-2",
  "",
  "",
  "",
  "",
  "sm:col-span-2",
];
const tiles = img.gallery.map((g, i) => ({ ...g, className: spans[i] ?? "" }));

export function Gallery() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <Reveal className="mb-12 text-center">
        <span className="text-sm font-semibold uppercase tracking-wider text-brand-600">
          הצצה למרפאה
        </span>
        <h2 className="text-display mt-2 text-3xl text-ink sm:text-4xl">
          סביבה נעימה, רגועה ומזמינה
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-ink-soft">
          מרחב מעוצב ומצויד בטכנולוגיה מתקדמת, תוכננו כדי להפוך כל ביקור לחוויה
          שקטה ונטולת חרדה.
        </p>
      </Reveal>

      <div className="grid auto-rows-[12rem] grid-cols-2 gap-4 sm:grid-cols-4">
        {tiles.map((t, i) => (
          <Reveal
            key={`${t.src}-${i}`}
            delay={i * 0.05}
            className={t.className}
          >
            <div className="group relative h-full w-full overflow-hidden rounded-glass shadow-md shadow-brand-950/10 ring-1 ring-white/30">
              <ZoomImage
                src={t.src}
                alt={t.alt}
                sizes="(max-width: 640px) 50vw, 25vw"
                overlay
              />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
