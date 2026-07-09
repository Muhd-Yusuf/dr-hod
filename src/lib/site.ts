/**
 * Single source of truth for clinic details + navigation.
 * Pulled from the live site (dr-hod.info). Hebrew-first.
 */

export const clinic = {
  name: "ד״ר יורם הוד",
  tagline: "מרפאת שיניים מובילה ביהוד והסביבה",
  address: "רחוב הורדים 34, יהוד",
  addressEn: "34 Hordim Street, Yehud",
  // Single clinic number, the only phone that may appear anywhere (client rule, 2026-07-01).
  phone: "054-559-4444",
  tel: "+972545594444",
  hours: "ראשון–חמישי: 09:00–13:00, 17:00–20:00",
  hoursShort: "א׳–ה׳ 09:00–13:00 · 17:00–20:00",
  mapsQuery: "רחוב הורדים 34, יהוד",
} as const;

/** Primary navigation, RTL order (first item appears right-most). */
export const nav = [
  { label: "דף הבית", href: "/" },
  { label: "השירותים שלנו", href: "/services" },
  { label: "המלצות מטופלים", href: "/recommendations" },
  { label: "מאמרים", href: "/מאמרים-נוספים/" },
  { label: "אודות", href: "/about" },
  { label: "צור קשר", href: "/contact" },
] as const;

/**
 * SEO keyword block, verbatim from the live site footer (dr-hod.info).
 * Preserved 1:1 for ranking continuity (Yehud / Or Yehuda / Petah Tikva / Merkaz).
 * Rendered small & muted at the very bottom of the footer.
 */
export const seoKeywords =
  "ד״ר יורם הוד רופא שיניים ביהוד | מרפאת שיניים ביהוד | רופא שיניים ביהוד | בדיקת שיניים ביהוד | רפואת שיניים משמרת ביהוד | שיקום הפה ביהוד | שתלים לשיניים ביהוד | הלבנת שיניים ביהוד | יישור שיניים שקוף ביהוד | ניקוי אבנית ביהוד | שיננית ביהוד | טיפול בנחירות ביהוד | מרפאת שיניים מומלצת ביהוד | רופא שיניים מומלץ ביהוד | רופא שיניים מומלץ לילדים ביהוד | מרפאת שיניים מומלצת ליישור שיניים ביהוד | מרפאת שיניים מומלצת להשתלה ביהוד | מרפאת שיניים באור יהודה | רופא שיניים באור יהודה | בדיקת שיניים באור יהודה | רפואת שיניים משמרת באור יהודה | שיקום הפה באור יהודה | שתלים לשיניים באור יהודה | הלבנת שיניים באור יהודה | יישור שיניים שקוף באור יהודה | ניקוי אבנית באור יהודה | שיננית באור יהודה | טיפול בנחירות באור יהודה | מרפאת שיניים מומלצת באור יהודה | רופא שיניים מומלץ באור יהודה | רופא שיניים מומלץ לילדים באור יהודה | מרפאת שיניים מומלצת ליישור שיניים באור יהודה | מרפאת שיניים מומלצת להשתלה באור יהודה | מרפאת שיניים בפתח תקווה | רופא שיניים בפתח תקווה | בדיקת שיניים בפתח תקווה | רפואת שיניים משמרת בפתח תקווה | שיקום הפה בפתח תקווה | שתלים לשיניים בפתח תקווה | הלבנת שיניים בפתח תקווה | יישור שיניים שקוף בפתח תקווה | ניקוי אבנית בפתח תקווה | שיננית בפתח תקווה | טיפול בנחירות בפתח תקווה | מרפאת שיניים מומלצת בפתח תקווה | רופא שיניים מומלץ בפתח תקווה | רופא שיניים מומלץ לילדים בפתח תקווה | מרפאת שיניים מומלצת ליישור שיניים בפתח תקווה | מרפאת שיניים מומלצת להשתלה בפתח תקווה | מרפאת שיניים במרכז | רופא שיניים במרכז | בדיקת שיניים במרכז | רפואת שיניים משמרת במרכז | שיקום הפה במרכז | שתלים לשיניים במרכז | הלבנת שיניים במרכז | יישור שיניים שקוף במרכז | ניקוי אבנית במרכז | שיננית במרכז | טיפול בנחירות במרכז | מרפאת שיניים מומלצת במרכז | רופא שיניים מומלץ במרכז | רופא שיניים מומלץ לילדים במרכז | מרפאת שיניים מומלצת ליישור שיניים במרכז | מרפאת שיניים מומלצת להשתלה במרכז";

/** Clinic video clips (YouTube). Rendered via a click-to-play facade. */
export const videos = [
  { id: "36TICAdAnTk", title: "מרפאת ד״ר יורם הוד" },
  { id: "cjHb8JfDzo4", title: "טיפולי שיניים בלייזר פוטונה" },
  { id: "rQ00XaeIO3w", title: "טיפול בנחירות בלייזר" },
  { id: "3UNyDct6bEI", title: "המרפאה והצוות" },
] as const;

/** Clinic services (icons wired in the Services section). */
export const services = [
  { slug: "whitening", title: "הלבנת שיניים", icon: "sparkles" },
  { slug: "implants", title: "השתלות שיניים", icon: "implant" },
  { slug: "rehabilitation", title: "שיקום הפה", icon: "smile" },
  { slug: "emergency", title: "טיפולי חירום", icon: "first-aid" },
  { slug: "snoring", title: "טיפול בנחירות בלייזר", icon: "moon" },
  { slug: "seniors", title: "טיפול שיניים לגיל השלישי", icon: "heart" },
  { slug: "general", title: "רפואת שיניים כללית", icon: "tooth" },
] as const;
