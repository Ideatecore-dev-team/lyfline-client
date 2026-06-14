"use client";

import React from "react";
import dynamic from "next/dynamic";
import { NavBar } from "@/components/NavBar";
import { HeroSection } from "@/sections/HeroSection";

// Lazy load below-the-fold components using Next.js dynamic imports
// We keep ssr: true to preserve SEO indexing for search engine crawlers, 
// but enable chunk splitting for optimal initial paint performance.
const AboutUsSection = dynamic(
  () => import("@/sections/AboutUsSection").then((m) => m.AboutUsSection),
  { ssr: true }
);

const PartnersSection = dynamic(
  () => import("@/sections/PartnersSection").then((m) => m.PartnersSection),
  { ssr: true }
);

const ServicesSection = dynamic(
  () => import("@/sections/ServicesSection").then((m) => m.ServicesSection),
  { ssr: true }
);

const StepsSection = dynamic(
  () => import("@/sections/StepsSection").then((m) => m.StepsSection),
  { ssr: true }
);

const WhyUsSection = dynamic(
  () => import("@/sections/WhyUsSection").then((m) => m.WhyUsSection),
  { ssr: true }
);

const TestimonialsSection = dynamic(
  () => import("@/sections/TestimonialsSection").then((m) => m.TestimonialsSection),
  { ssr: true }
);

const ArticlesSection = dynamic(
  () => import("@/sections/ArticlesSection").then((m) => m.ArticlesSection),
  { ssr: true }
);

const CtaSection = dynamic(
  () => import("@/sections/CtaSection").then((m) => m.CtaSection),
  { ssr: true }
);

const Footer = dynamic(
  () => import("@/components/Footer").then((m) => m.Footer),
  { ssr: true }
);

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Critical path widgets (Rendered immediately) */}
      <NavBar />
      <main className="grow pt-[80px] w-full flex flex-col justify-start items-center relative overflow-x-hidden bg-[#ECF1F8]">
        <HeroSection />
        <AboutUsSection />

        {/* Lazy loaded segments for better Core Web Vitals (LCP, FID) */}
        <ServicesSection />
        <PartnersSection isHomePage />
        <WhyUsSection />
        <StepsSection />
        <TestimonialsSection />
        <ArticlesSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
