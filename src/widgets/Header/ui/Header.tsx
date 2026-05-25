"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/shared/ui/Button";
import { cn } from "@/shared/lib/utils";

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<"en" | "id">("en");

  const toggleLanguage = () => {
    setCurrentLang((prev) => (prev === "en" ? "id" : "en"));
  };

  const navLinks = [
    { label: "Home", href: "#" },
    { label: "About Us", href: "#about-us" },
    { label: "Services", href: "#services" },
    { label: "Partners", href: "#partners" },
    { label: "Articles", href: "#blog" },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-100 shadow-sm transition-all duration-300 py-4"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
        {/* LOGO */}
        <Link href="#" className="flex items-center gap-2 group">
          <Image
            src="/logoBlack.png"
            alt="LYFLINE Logo"
            width={120}
            height={40}
            className="h-8 w-auto object-contain"
            priority
          />
        </Link>

        {/* DESKTOP NAV WITH INLINE FLAG */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "text-[14px] font-semibold transition-colors",
                link.label === "Home"
                  ? "text-primary"
                  : "text-[#000000] hover:text-primary"
              )}
            >
              {link.label}
            </Link>
          ))}
          {/* Stateful Flag Switcher directly inside the nav menu next to Articles */}
          <button
            onClick={toggleLanguage}
            className="flex items-center hover:opacity-80 transition-opacity cursor-pointer"
            title={currentLang === "en" ? "Switch to Bahasa Indonesia" : "Switch to English"}
          >
            <Image
              src={currentLang === "en" ? "/icons/GB-UKM.png" : "/icons/ID-Indonesia icon.png"}
              alt={currentLang === "en" ? "English" : "Bahasa Indonesia"}
              width={22}
              height={15}
              className="w-5.5 h-auto object-contain rounded-sm shadow-sm border border-slate-100"
              style={{ height: "auto" }}
            />
          </button>
        </nav>

        {/* DESKTOP CTA ONLY (NO LANGUAGE PIL) */}
        <div className="hidden lg:flex items-center gap-5">
          <Button variant="primary" size="sm" className="gap-2 px-6 py-3 rounded-full text-xs font-bold shadow-md shadow-primary/10">
            Appointment
          </Button>
        </div>

        {/* MOBILE MENU TRIGGER */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-neutral-dark hover:bg-slate-100 rounded-xl transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* MOBILE NAV DROPDOWN */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[72px] bg-white border-b border-slate-100 shadow-xl p-6 flex flex-col gap-4 animate-fade-in-up">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-semibold text-neutral-muted hover:text-primary py-2 border-b border-slate-50 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          {/* Language Switcher Mobile */}
          <div className="flex items-center justify-between py-2 border-t border-slate-50 mt-2">
            <span className="text-sm font-medium text-neutral-muted">Select Language</span>
            <button className="flex items-center gap-1.5 hover:opacity-80 transition-opacity bg-slate-100/80 hover:bg-slate-100 px-3.5 py-2 rounded-full border border-slate-200/50 cursor-pointer">
              <Image
                src="/icons/GB-UKM icon.png"
                alt="Language Switcher"
                width={20}
                height={14}
                className="w-5 h-auto object-contain rounded-sm"
                style={{ height: "auto" }}
              />
              <span className="text-[10px] font-bold text-slate-600 tracking-wider">EN/ID</span>
            </button>
          </div>

          <Button
            variant="primary"
            className="w-full mt-2 gap-2 justify-center rounded-full font-bold text-xs"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Appointment
          </Button>
        </div>
      )}
    </header>
  );
};
