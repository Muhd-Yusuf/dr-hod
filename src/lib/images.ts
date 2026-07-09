/**
 * Self-hosted image manifest (in /public/images).
 * NOTE: these are professional stock placeholders — swap for the clinic's
 * real photos (Dr. Hod, clinic interior, real patients) once we have access.
 */
export const img = {
  heroPatient: { src: "/images/hero-patient.jpg", alt: "מטופלת מחייכת במרפאת השיניים" },
  // Real clinic photo supplied by the client (2026-07-01).
  clinicInterior: { src: "/images/clinic-real.png", alt: "מרפאת השיניים של ד״ר יורם הוד ביהוד" },
  // Dr. Hod's real photo (client-supplied, 2025-03-30) — his actual clinic.
  drHod: { src: "/images/dr-hod-real.jpg", alt: "ד״ר יורם הוד במרפאתו ביהוד" },

  services: {
    whitening: { src: "/images/svc-whitening.jpg", alt: "הלבנת שיניים" },
    implants: { src: "/images/svc-implants.jpg", alt: "השתלות שיניים" },
    rehabilitation: { src: "/images/svc-rehabilitation.jpg", alt: "שיקום הפה" },
    emergency: { src: "/images/svc-emergency.jpg", alt: "טיפולי חירום" },
    snoring: { src: "/images/svc-snoring.jpg", alt: "טיפול בנחירות" },
    // TODO: swap for a real senior-care photo when available.
    seniors: { src: "/images/clinic-interior.jpg", alt: "טיפול שיניים לגיל השלישי" },
    general: { src: "/images/svc-general.jpg", alt: "רפואת שיניים כללית" },
  },

  // Distinct photography for the homepage "peek inside" mosaic — kept unique
  // so no image repeats elsewhere on the site.
  gallery: [
    { src: "/images/article-clinic.jpg", alt: "מרפאת השיניים ד״ר יורם הוד" },
    { src: "/images/article-fotona.jpg", alt: "טיפול בלייזר FOTONA" },
    { src: "/images/article-emergency.jpg", alt: "טיפולי חירום דנטליים" },
    { src: "/images/article-firstaid.jpg", alt: "עזרה ראשונה בשיניים" },
    { src: "/images/article-snoring1.jpg", alt: "טיפול בנחירות" },
    { src: "/images/article-snoring2.jpg", alt: "שינה רגועה ללא נחירות" },
  ],

  testimonials: [
    { src: "/images/testimonial-1.jpg", alt: "מטופלת ממליצה" },
    { src: "/images/testimonial-2.jpg", alt: "מטופל ממליץ" },
    { src: "/images/testimonial-3.jpg", alt: "מטופלת ממליצה" },
    { src: "/images/testimonial-4.jpg", alt: "מטופל ממליץ" },
  ],

  contactBg: { src: "/images/contact-bg.jpg", alt: "מרפאת שיניים" },
  ctaBg: { src: "/images/cta-bg.jpg", alt: "חיוך בריא" },
} as const;
