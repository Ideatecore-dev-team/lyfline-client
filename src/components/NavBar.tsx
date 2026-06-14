"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/Button";
import { useLanguage } from "@/context/LanguageContext";

export const NavBar: React.FC = () => {
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200">
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-4 flex justify-between items-center bg-white">
        
        {/* LOGO (matching Figma dimensions and classes) */}
        <Link href="/" className="w-40 h-12 relative overflow-hidden block">
          <Image
            src="/logoBlack.png"
            alt="LYFLINE Logo"
            width={160}
            height={32}
            className="w-40 h-8 left-[3px] top-[8px] absolute object-contain"
            priority
          />
        </Link>

        <nav className="hidden lg:flex justify-start items-center gap-[12px]">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href === "/" && pathname === "/");
            return (
              <Link key={link.label} href={link.href}>
                <Button
                  variant={isActive ? "ghost-primary" : "ghost-black"}
                  text={link.label}
                  className="h-12 px-4 py-3 font-poppins text-base font-semibold transition-colors"
                />
              </Link>
            );
          })}
          
          {/* Working Stateful Flag Switcher (matching Figma size-8 wrapper) */}
          <div className="size-8 inline-flex flex-col justify-center items-center">
            <button 
              onClick={toggleLang}
              className="flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer border-0 bg-transparent p-0"
              title={lang === "en" ? "Switch to Bahasa Indonesia" : "Switch to English"}
            >
              <div className="w-4 h-3 relative overflow-hidden rounded-[2px] outline outline-black">
                <Image
                  src={lang === "en" ? "/Flags/GB-UKM - United Kingdom.svg" : "/Flags/ID - Indonesia.svg"}
                  alt={lang === "en" ? "English" : "Bahasa Indonesia"}
                  fill
                  unoptimized
                  className="object-contain"
                />
              </div>
            </button>
          </div>
        </nav>

        {/* DESKTOP CTA (matching Figma styles via Button component) */}
        <div className="hidden lg:flex items-center">
          <Button
            variant="primary"
            text={t("nav.appointment")}
            className="h-12 px-4 py-3 font-poppins text-base font-semibold"
          />
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
        <div className="lg:hidden fixed inset-x-0 top-[72px] bg-white border-b border-slate-200 shadow-xl p-6 flex flex-col gap-4 animate-fade-in-up">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href === "/" && pathname === "/");
            return (
              <Link key={link.label} href={link.href}>
                <Button
                  variant={isActive ? "ghost-primary" : "ghost-black"}
                  text={link.label}
                  className="w-full justify-start text-base py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                />
              </Link>
            );
          })}
          {/* Language Switcher Mobile */}
          <div className="flex items-center justify-between py-2 border-t border-slate-100 mt-2">
            <span className="text-sm font-medium text-neutral-muted">{t("nav.select_language")}</span>
            <button 
              onClick={toggleLang}
              className="flex items-center gap-1.5 hover:opacity-80 transition-opacity bg-slate-100/80 hover:bg-slate-100 px-3.5 py-2 rounded-full border border-slate-200/50 cursor-pointer"
            >
              <div className="w-4 h-3 relative overflow-hidden rounded-[2px] outline outline-black">
                <Image
                  src={lang === "en" ? "/Flags/GB-UKM - United Kingdom.svg" : "/Flags/ID - Indonesia.svg"}
                  alt="Language Switcher"
                  fill
                  unoptimized
                  className="object-contain"
                />
              </div>
              <span className="text-[10px] font-bold text-slate-600 tracking-wider">
                {lang === "en" ? "EN" : "ID"}
              </span>
            </button>
          </div>

          <Button
            variant="primary"
            text={t("nav.appointment")}
            className="w-full mt-2 font-semibold text-xs"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        </div>
      )}
    </header>
  );
};

export default NavBar;
