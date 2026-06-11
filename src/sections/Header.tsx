"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { lang, toggleLang, t } = useLanguage();
  const pathname = usePathname();

  const navLinks = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.about"), href: "/about" },
    { label: t("nav.services"), href: "/services" },
    { label: t("nav.doctors"), href: "/doctors" },
    { label: t("nav.partners"), href: "/partners" },
    { label: t("nav.articles"), href: "/articles" },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-100 shadow-sm transition-all duration-300 py-4"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 group">
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
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href === "/" && pathname === "/");
            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "text-[14px] font-semibold transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-neutral-dark hover:text-primary"
                )}
              >
                {link.label}
              </Link>
            );
          })}
          {/* Stateful Flag Switcher directly inside the nav menu next to Articles */}
          <button 
            onClick={toggleLang}
            className="flex items-center hover:opacity-80 transition-opacity cursor-pointer border-0 bg-transparent p-0"
            title={lang === "en" ? "Switch to Bahasa Indonesia" : "Switch to English"}
          >
            <Image
              src={lang === "en" ? "/Flags/GB-UKM icon.png" : "/Flags/ID-Indonesia icon.png"}
              alt={lang === "en" ? "English" : "Bahasa Indonesia"}
              width={22}
              height={15}
              unoptimized
              className="w-[22px] h-[15px] object-contain rounded-sm shadow-sm border border-slate-100"
            />
          </button>
        </nav>

        {/* DESKTOP CTA ONLY (NO LANGUAGE PIL) */}
        <div className="hidden lg:flex items-center gap-5">
          <Button variant="primary" size="sm" className="gap-2 px-6 py-3 rounded-full text-xs font-bold shadow-md shadow-primary/10">
            {t("nav.appointment")}
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
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href === "/" && pathname === "/");
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "text-base font-semibold py-2 border-b border-slate-50 transition-colors",
                  isActive
                    ? "text-primary font-bold"
                    : "text-neutral-muted hover:text-primary"
                )}
              >
                {link.label}
              </Link>
            );
          })}
          {/* Language Switcher Mobile */}
          <div className="flex items-center justify-between py-2 border-t border-slate-50 mt-2">
            <span className="text-sm font-medium text-neutral-muted">{t("nav.select_language")}</span>
            <button 
              onClick={toggleLang}
              className="flex items-center gap-1.5 hover:opacity-80 transition-opacity bg-slate-100/80 hover:bg-slate-100 px-3.5 py-2 rounded-full border border-slate-200/50 cursor-pointer"
            >
              <Image
                src={lang === "en" ? "/Flags/GB-UKM icon.png" : "/Flags/ID-Indonesia icon.png"}
                alt="Language Switcher"
                width={20}
                height={14}
                unoptimized
                className="w-5 h-[14px] object-contain rounded-sm"
              />
              <span className="text-[10px] font-bold text-slate-600 tracking-wider">
                {lang === "en" ? "EN" : "ID"}
              </span>
            </button>
          </div>

          <Button
            variant="primary"
            className="w-full mt-2 gap-2 justify-center rounded-full font-bold text-xs"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t("nav.appointment")}
          </Button>
        </div>
      )}
    </header>
  );
};
