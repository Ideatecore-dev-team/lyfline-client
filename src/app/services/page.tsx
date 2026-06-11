"use client";

import React from "react";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { ServicesSection } from "@/sections/ServicesSection";

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow pt-16">
        <ServicesSection />
      </main>
      <Footer />
    </div>
  );
}
