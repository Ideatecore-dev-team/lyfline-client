"use client";

import React from "react";
import dynamic from "next/dynamic";
import { NavBar } from "@/components/NavBar";

// Dynamic imports to preserve optimal bundle chunking and render performance
const ServiceHeroSection = dynamic(
  () => import("@/sections/ServiceHeroSection").then((m) => m.ServiceHeroSection),
  { ssr: true }
);

const ServiceAccordionSection = dynamic(
  () => import("@/sections/ServiceAccordionSection").then((m) => m.ServiceAccordionSection),
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

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <NavBar />
      <main className="grow pt-[80px] w-full flex flex-col justify-start items-center relative overflow-x-hidden">
        <ServiceHeroSection />
        <ServiceAccordionSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
