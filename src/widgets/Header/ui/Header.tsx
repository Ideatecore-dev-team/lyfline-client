"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/shared/ui/Button";
import { cn } from "@/shared/lib/utils";

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#" },
    { label: "About us", href: "#why-us" },
    { label: "Services", href: "#services" },
    { label: "Partners", href: "#partners" },
    { label: "Articles", href: "#blog" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-5",
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-lg shadow-slate-100/50 py-3 border-b border-slate-100"
          : "bg-transparent"
      )}
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

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-neutral-muted hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* DESKTOP CTA & LANG SWITCHER */}
        <div className="hidden lg:flex items-center gap-5">
          {/* Language Switcher */}
          <button className="flex items-center gap-1.5 hover:opacity-80 transition-opacity bg-slate-100/80 hover:bg-slate-100 px-3.5 py-2 rounded-full border border-slate-200/50 cursor-pointer">
            <Image
              src="/icons/GB-UKM Icons.png"
              alt="Language Switcher"
              width={20}
              height={14}
              className="w-5 h-auto object-contain rounded-sm"
              style={{ height: "auto" }}
            />
            <span className="text-[10px] font-bold text-slate-600 tracking-wider">EN/ID</span>
          </button>
          
          <Button variant="primary" size="sm" className="gap-2">
            Book an Appointment <ArrowUpRight className="w-4 h-4" />
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
                src="/icons/GB-UKM Icons.png"
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
            className="w-full mt-2 gap-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Book an Appointment <ArrowUpRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </header>
  );
};
