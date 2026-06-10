"use client";

import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { cn } from "@/lib/utils";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [consent, setConsent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="flex min-h-[22rem] flex-col items-center justify-center rounded-glass glass-strong p-10 text-center">
        <span className="grid size-16 place-items-center rounded-full bg-brand-500/15 text-brand-600">
          <CheckCircle2 className="size-9" />
        </span>
        <h3 className="text-display mt-5 text-2xl text-ink">תודה! ניצור קשר בהקדם.</h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-soft">
          פנייתכם התקבלה בהצלחה. צוות המרפאה יחזור אליכם בהקדם האפשרי.
        </p>
      </div>
    );
  }

  const field =
    "w-full rounded-2xl border border-line bg-bg-elev/60 px-4 py-3 text-ink placeholder:text-ink-faint outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-400/30";

  return (
    <form onSubmit={handleSubmit} className="rounded-glass glass-strong p-7 sm:p-8">
      <h3 className="text-display text-2xl text-ink">השאירו פרטים</h3>
      <p className="mt-1 text-sm text-ink-soft">נשמח לחזור אליכם ולקבוע תור.</p>

      <div className="mt-6 space-y-5">
        <div>
          <label htmlFor="cf-name" className="mb-1.5 block text-sm font-medium text-ink-soft">
            שם
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="השם המלא שלכם"
            className={field}
          />
        </div>

        <div>
          <label htmlFor="cf-phone" className="mb-1.5 block text-sm font-medium text-ink-soft">
            טלפון
          </label>
          <input
            id="cf-phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            placeholder="050-000-0000"
            className={field}
          />
        </div>

        <div>
          <label htmlFor="cf-message" className="mb-1.5 block text-sm font-medium text-ink-soft">
            הודעה
          </label>
          <textarea
            id="cf-message"
            name="message"
            required
            rows={4}
            placeholder="במה נוכל לעזור?"
            className={cn(field, "resize-none")}
          />
        </div>

        <label className="flex items-start gap-3 text-sm leading-relaxed text-ink-soft">
          <input
            type="checkbox"
            required
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 size-5 shrink-0 rounded-md border-line accent-brand-500"
          />
          <span>
            קראתי ואני מאשר/ת את{" "}
            <a href="/privacy" className="font-medium text-brand-600 underline underline-offset-2 hover:text-brand-700">
              מדיניות הפרטיות
            </a>
          </span>
        </label>

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-500 px-7 py-3.5 font-semibold text-white shadow-xl shadow-brand-500/30 transition hover:bg-brand-600"
        >
          <Send className="size-5" />
          שליחה
        </button>
      </div>
    </form>
  );
}
