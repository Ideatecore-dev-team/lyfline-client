"use client";

import React from "react";
import { Header } from "@/sections/Header";
import { Footer } from "@/sections/Footer";
import { ServicesSection } from "@/sections/ServicesSection";

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16">
        <ServicesSection />
      </main>
      <Footer />
    </div>
  );
}
