import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { ClinicServices } from "@/components/sections/ClinicServices";
import { Gallery } from "@/components/sections/Gallery";
import { Testimonials } from "@/components/sections/Testimonials";
import { VideoGallery } from "@/components/sections/VideoGallery";
import { ArticlesPreview } from "@/components/sections/ArticlesPreview";
import { CtaBanner } from "@/components/sections/CtaBanner";

export const metadata: Metadata = {
  title: "ד״ר יורם הוד · מרפאת שיניים מובילה ביהוד",
  description:
    "מרפאת השיניים של ד״ר יורם הוד ביהוד — השתלות, הלבנה, שיקום הפה, טיפולי חירום וטיפול בנחירות בלייזר FOTONA. למעלה מ-40 שנות ניסיון, טיפול ללא כאב באווירה רגועה ומקצועית.",
};

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
        <ClinicServices />
        <Gallery />
        <Testimonials />
        <VideoGallery />
        <ArticlesPreview />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
