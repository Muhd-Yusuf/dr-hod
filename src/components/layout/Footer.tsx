import Link from "next/link";
import { Clock, MapPin, Phone } from "lucide-react";
import { clinic, nav, seoKeywords } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-bg-elev/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <div className="mb-3 flex items-center gap-2.5">
            <span className="grid size-11 place-items-center rounded-2xl bg-brand-500 font-black text-white">
              הוד
            </span>
            <span className="text-display text-lg">ד״ר יורם הוד</span>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-ink-soft">
            {clinic.tagline}. למעלה מ-40 שנות ניסיון, באווירה רגועה ומקצועית
            לכל המשפחה.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-display text-sm uppercase tracking-wide text-ink-faint">
            ניווט מהיר
          </h3>
          <ul className="grid grid-cols-2 gap-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-ink-soft transition-colors hover:text-brand-600"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-display text-sm uppercase tracking-wide text-ink-faint">
            יצירת קשר
          </h3>
          <ul className="space-y-3 text-sm text-ink-soft">
            <li className="flex items-center gap-2">
              <MapPin className="size-4 text-brand-500" />
              {clinic.address}
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4 text-brand-500" />
              <a href={`tel:${clinic.telMobile}`} className="hover:text-brand-600">
                {clinic.phoneMobile}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Clock className="size-4 text-brand-500" />
              {clinic.hours}
            </li>
          </ul>
        </div>
      </div>

      {/* SEO keyword block — preserved 1:1 from the live site for ranking continuity */}
      <div className="border-t border-line">
        <p className="mx-auto max-w-7xl px-6 py-6 text-center text-[11px] leading-relaxed text-ink-faint/70">
          {seoKeywords}
        </p>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-5 text-xs text-ink-faint sm:flex-row">
          <span>
            © {new Date().getFullYear()} ד״ר יורם הוד · כל הזכויות שמורות
          </span>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-brand-600">
              מדיניות פרטיות
            </Link>
            <Link href="/terms" className="hover:text-brand-600">
              תנאי שימוש
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
