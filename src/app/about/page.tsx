"use client";

import React from "react";
import dynamic from "next/dynamic";
import { NavBar } from "@/components/NavBar";

// Dynamic imports to preserve optimal bundle chunking and render performance
const AboutUsSection = dynamic(
  () => import("@/sections/AboutUsSection").then((m) => m.AboutUsSection),
  { ssr: true }
);

const VisionMissionSection = dynamic(
  () => import("@/sections/VisionMissionSection").then((m) => m.VisionMissionSection),
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

const PartnersSection = dynamic(
  () => import("@/sections/PartnersSection").then((m) => m.PartnersSection),
  { ssr: true }
);

const Footer = dynamic(
  () => import("@/components/Footer").then((m) => m.Footer),
  { ssr: true }
);

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Dynamic Path Header */}
      <NavBar />
      
      {/* Main Content Sections */}
      <main className="grow pt-[80px] w-full flex flex-col justify-start items-center relative overflow-x-hidden">
        {/* Who We Are & Statistics */}
        <AboutUsSection showButton={false} />
        
        {/* Vision & Mission */}
        <VisionMissionSection />
        
        {/* How We Work (Steps) */}
        <StepsSection />
        
        {/* Our Services Banner */}
        <AboutServices />
        
        {/* Global Partners */}
        <PartnersSection />
      </main>
      
      {/* Sticky footer and Book an Appointment toolbar */}
      <Footer />
    </div>
  );
}
