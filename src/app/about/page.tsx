"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Header } from "@/sections/Header";

// Dynamic imports to preserve optimal bundle chunking and render performance
const AboutUsHero = dynamic(
  () => import("@/sections/AboutUsHero").then((m) => m.AboutUsHero),
  { ssr: true }
);

const VisionMission = dynamic(
  () => import("@/sections/VisionMission").then((m) => m.VisionMission),
  { ssr: true }
);

const StepsSection = dynamic(
  () => import("@/sections/StepsSection").then((m) => m.StepsSection),
  { ssr: true }
);

const AboutServices = dynamic(
  () => import("@/sections/AboutServices").then((m) => m.AboutServices),
  { ssr: true }
);

const AboutPartners = dynamic(
  () => import("@/sections/AboutPartners").then((m) => m.AboutPartners),
  { ssr: true }
);

const Footer = dynamic(
  () => import("@/sections/Footer").then((m) => m.Footer),
  { ssr: true }
);

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Dynamic Path Header */}
      <Header />
      
      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* Who We Are & Statistics */}
        <AboutUsHero />
        
        {/* Vision & Mission */}
        <VisionMission />
        
        {/* How We Work (Steps) */}
        <StepsSection />
        
        {/* Our Services Banner */}
        <AboutServices />
        
        {/* Global Partners */}
        <AboutPartners />
      </main>
      
      {/* Sticky footer and Book an Appointment toolbar */}
      <Footer />
    </div>
  );
}
