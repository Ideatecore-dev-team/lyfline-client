import React from "react";
import dynamic from "next/dynamic";
import { Header } from "@/widgets/Header/ui/Header";
import { HeroSection } from "@/widgets/HeroSection/ui/HeroSection";

// Lazy load below-the-fold components using Next.js dynamic imports
// We keep ssr: true to preserve SEO indexing for search engine crawlers, 
// but enable chunk splitting for optimal initial paint performance.
const PartnersSection = dynamic(
  () => import("@/widgets/PartnersSection/ui/PartnersSection").then((m) => m.PartnersSection),
  { ssr: true }
);

const ServicesSection = dynamic(
  () => import("@/widgets/ServicesSection/ui/ServicesSection").then((m) => m.ServicesSection),
  { ssr: true }
);

const StepsSection = dynamic(
  () => import("@/widgets/StepsSection/ui/StepsSection").then((m) => m.StepsSection),
  { ssr: true }
);

const WhyUsSection = dynamic(
  () => import("@/widgets/WhyUsSection/ui/WhyUsSection").then((m) => m.WhyUsSection),
  { ssr: true }
);

const TestimonialsSection = dynamic(
  () => import("@/widgets/TestimonialsSection/ui/TestimonialsSection").then((m) => m.TestimonialsSection),
  { ssr: true }
);

const ArticlesSection = dynamic(
  () => import("@/widgets/ArticlesSection/ui/ArticlesSection").then((m) => m.ArticlesSection),
  { ssr: true }
);

const CtaSection = dynamic(
  () => import("@/widgets/CtaSection/ui/CtaSection").then((m) => m.CtaSection),
  { ssr: true }
);

const Footer = dynamic(
  () => import("@/widgets/Footer/ui/Footer").then((m) => m.Footer),
  { ssr: true }
);

export const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Critical path widgets (Rendered immediately) */}
      <Header />
      <main className="flex-grow">
        <HeroSection />

        {/* Lazy loaded segments for better Core Web Vitals (LCP, FID) */}
        <PartnersSection />
        <ServicesSection />
        <StepsSection />
        <WhyUsSection />
        <TestimonialsSection />
        <ArticlesSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};
export default LandingPage;
