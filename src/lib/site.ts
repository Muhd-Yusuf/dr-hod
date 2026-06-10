/**
 * Single source of truth for clinic details + navigation.
 * Pulled from the live site (dr-hod.info). Hebrew-first.
 */

export const clinic = {
  name: "ד״ר יורם הוד",
  tagline: "מרפאת שיניים מובילה ביהוד והסביבה",
  address: "רחוב החורדים 34, יהוד",
  addressEn: "34 Hordim Street, Yehud",
  phoneMobile: "052-917-2942",
  phoneClinic: "054-559-4444",
  // tel: links (E.164-ish, IL)
  telMobile: "+972529172942",
  telClinic: "+972545594444",
  hours: "ראשון–חמישי: 08:30–13:00, 16:00–21:00",
  hoursShort: "א׳–ה׳ 08:30–13:00 · 16:00–21:00",
  mapsQuery: "רחוב החורדים 34, יהוד",
} as const;

/** Primary navigation — RTL order (first item appears right-most). */
export const nav = [
  { label: "דף הבית", href: "/" },
  { label: "השירותים שלנו", href: "/services" },
  { label: "המלצות מטופלים", href: "/recommendations" },
  { label: "מאמרים", href: "/articles" },
  { label: "אודות", href: "/about" },
  { label: "צור קשר", href: "/contact" },
] as const;

/** Clinic services (icons wired in the Services section). */
export const services = [
  { slug: "whitening", title: "הלבנת שיניים", icon: "sparkles" },
  { slug: "implants", title: "השתלות שיניים", icon: "implant" },
  { slug: "rehabilitation", title: "שיקום הפה", icon: "smile" },
  { slug: "emergency", title: "טיפולי חירום", icon: "first-aid" },
  { slug: "snoring", title: "טיפול בנחירות (לייזר FOTONA)", icon: "moon" },
  { slug: "general", title: "רפואת שיניים כללית", icon: "tooth" },
] as const;
