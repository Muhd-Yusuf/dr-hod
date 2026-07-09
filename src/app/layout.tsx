import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";

// Self-hosted (no Google Fonts dependency at build/runtime)
const heebo = localFont({
  variable: "--font-heebo",
  display: "swap",
  adjustFontFallback: false,
  fallback: ["system-ui", "Arial", "sans-serif"],
  src: [
    { path: "./fonts/Heebo-400.ttf", weight: "400", style: "normal" },
    { path: "./fonts/Heebo-500.ttf", weight: "500", style: "normal" },
    { path: "./fonts/Heebo-700.ttf", weight: "700", style: "normal" },
    { path: "./fonts/Heebo-800.ttf", weight: "800", style: "normal" },
  ],
});

const rubik = localFont({
  variable: "--font-rubik",
  display: "swap",
  adjustFontFallback: false,
  fallback: ["system-ui", "Arial", "sans-serif"],
  src: [
    { path: "./fonts/Rubik-500.ttf", weight: "500", style: "normal" },
    { path: "./fonts/Rubik-600.ttf", weight: "600", style: "normal" },
    { path: "./fonts/Rubik-700.ttf", weight: "700", style: "normal" },
    { path: "./fonts/Rubik-800.ttf", weight: "800", style: "normal" },
    { path: "./fonts/Rubik-900.ttf", weight: "900", style: "normal" },
  ],
});

const SITE_URL = "https://www.dr-hod.info";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ד״ר יורם הוד, מרפאת שיניים ביהוד",
    template: "%s | ד״ר יורם הוד",
  },
  description:
    "מרפאת השיניים של ד״ר יורם הוד ביהוד, למעלה מ-40 שנות ניסיון. השתלות, הלבנת שיניים, שיקום הפה, טיפולי חירום וטיפול בנחירות בלייזר FOTONA. באווירה רגועה וביתית.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "he_IL",
    url: SITE_URL,
    siteName: "ד״ר יורם הוד",
    title: "ד״ר יורם הוד, מרפאת שיניים ביהוד",
    description:
      "מרפאת שיניים מובילה ביהוד והסביבה. למעלה מ-40 שנות ניסיון, באווירה רגועה ומקצועית.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${heebo.variable} ${rubik.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-ink">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
