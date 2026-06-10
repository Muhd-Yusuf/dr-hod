import type { Metadata } from "next";
import { Heebo, Rubik } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  display: "swap",
});

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["hebrew", "latin"],
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});

const SITE_URL = "https://www.dr-hod.info";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ד״ר יורם הוד — מרפאת שיניים ביהוד",
    template: "%s | ד״ר יורם הוד",
  },
  description:
    "מרפאת השיניים של ד״ר יורם הוד ביהוד — למעלה מ-30 שנות ניסיון. השתלות, הלבנת שיניים, שיקום הפה, טיפולי חירום וטיפול בנחירות בלייזר FOTONA. באווירה רגועה וביתית.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "he_IL",
    url: SITE_URL,
    siteName: "ד״ר יורם הוד",
    title: "ד״ר יורם הוד — מרפאת שיניים ביהוד",
    description:
      "מרפאת שיניים מובילה ביהוד והסביבה. למעלה מ-30 שנות ניסיון, באווירה רגועה ומקצועית.",
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
