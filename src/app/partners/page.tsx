"use client";

import React from "react";
import { Header } from "@/sections/Header";
import { Footer } from "@/sections/Footer";
import { PartnersSection } from "@/sections/PartnersSection";

export default function PartnersPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16">
        <PartnersSection />
      </main>
      <Footer />
    </div>
  );
}
