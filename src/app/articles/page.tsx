"use client";

import React from "react";
import { Header } from "@/sections/Header";
import { Footer } from "@/sections/Footer";
import { ArticlesSection } from "@/sections/ArticlesSection";

export default function ArticlesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16">
        <ArticlesSection />
      </main>
      <Footer />
    </div>
  );
}
