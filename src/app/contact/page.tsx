import type { Metadata } from "next";
import { MapPin, Phone, Clock } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { KenBurns } from "@/components/ui/KenBurns";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { clinic } from "@/lib/site";
import { img } from "@/lib/images";

export const metadata: Metadata = {
  title: "צור קשר",
  description:
    "צרו קשר עם מרפאת השיניים של ד״ר יורם הוד ביהוד, רחוב הורדים 34. השאירו פרטים, התקשרו או מצאו אותנו על המפה. נשמח לקבוע לכם תור.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    clinic.mapsQuery
  )}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative">
          <KenBurns
            src={img.contactBg.src}
            alt={img.contactBg.alt}
            className="relative h-[26rem]"
            priority
            overlay
            sizes="100vw"
          />
          <div className="absolute inset-0 flex items-end">
            <div className="mx-auto w-full max-w-7xl px-6 pb-12">
              <Reveal direction="up">
                <span className="text-sm font-semibold uppercase tracking-wider text-white/80">
                  צור קשר
                </span>
                <h1 className="text-display mt-2 text-4xl text-white sm:text-5xl">
                  נשמח לשמוע מכם
                </h1>
                <p className="mt-3 max-w-xl text-lg text-white/85">
                  קבעו תור או השאירו פרטים, צוות המרפאה כאן בשבילכם.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Form + details */}
        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-8 lg:grid-cols-2">
            <Reveal direction="right">
              <ContactForm />
            </Reveal>

            <Reveal direction="left" delay={0.1}>
              <div className="rounded-glass glass p-7 sm:p-8">
                <h2 className="text-display text-2xl text-ink">פרטי המרפאה</h2>
                <p className="mt-1 text-sm text-ink-soft">{clinic.tagline}</p>

                <ul className="mt-7 space-y-6">
                  <li className="flex items-start gap-4">
                    <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-500/10 text-brand-600">
                      <MapPin className="size-6" />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-ink-faint">כתובת</p>
                      <p className="mt-0.5 text-lg text-ink">{clinic.address}</p>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-500/10 text-brand-600">
                      <Phone className="size-6" />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-ink-faint">טלפון</p>
                      <a
                        href={`tel:${clinic.tel}`}
                        className="mt-0.5 inline-block text-lg text-ink transition hover:text-brand-600"
                        dir="ltr"
                      >
                        {clinic.phone}
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-500/10 text-brand-600">
                      <Clock className="size-6" />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-ink-faint">שעות פעילות</p>
                      <p className="mt-0.5 text-lg text-ink">{clinic.hours}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Map */}
        <section className="mx-auto max-w-7xl px-6 pb-24">
          <Reveal>
            <div className="overflow-hidden rounded-glass glass p-2">
              <iframe
                src={mapSrc}
                title="מפה"
                width="100%"
                height={420}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-glass border-0"
              />
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
