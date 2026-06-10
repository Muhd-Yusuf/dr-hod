import { Phone } from "lucide-react";
import { KenBurns } from "@/components/ui/KenBurns";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { clinic } from "@/lib/site";
import { img } from "@/lib/images";

export function CtaBanner() {
  return (
    <section className="relative">
      <div className="relative isolate overflow-hidden">
        <KenBurns
          src={img.ctaBg.src}
          alt={img.ctaBg.alt}
          sizes="100vw"
          className="absolute inset-0 h-full w-full"
        />
        {/* readability overlay */}
        <div className="absolute inset-0 bg-gradient-to-l from-brand-950/85 via-brand-900/70 to-brand-950/85" />

        <div className="relative mx-auto max-w-4xl px-6 py-28 text-center">
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-wider text-accent-400">
              קביעת תור
            </span>
            <h2 className="text-display mt-3 text-3xl text-white sm:text-5xl">
              מוכנים לחיוך בריא יותר?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-white/85">
              צוות המרפאה כאן בשבילכם — לקביעת תור, ייעוץ או טיפול דחוף. נשמח
              לקבל אתכם באווירה רגועה ומקצועית ביהוד.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <MagneticButton
                href={`tel:${clinic.telMobile}`}
                className="bg-white text-brand-700 shadow-xl shadow-brand-950/30"
              >
                <Phone className="size-5" />
                {clinic.phoneMobile}
              </MagneticButton>
              <MagneticButton
                href={`tel:${clinic.telClinic}`}
                className="glass-strong text-white ring-1 ring-white/40"
              >
                <Phone className="size-5" />
                מרפאה · {clinic.phoneClinic}
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
