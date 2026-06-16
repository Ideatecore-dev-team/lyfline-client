"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/Button";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { WHATSAPP_HREF } from "@/lib/constants";

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
            width={200}
            height={32}
            className="w-40 h-10 left-[3px] top-[4px] absolute object-contain"
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
          <Link href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer">
            <Button
              variant="primary"
              text={t("nav.appointment")}
              className="h-12 px-4 py-3 font-poppins text-base font-semibold"
            />
          </Link>
        </div>

        {/* MOBILE MENU TRIGGER */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-primary hover:bg-primary/10 rounded-xl transition-colors cursor-pointer"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <span
              style={{
                maskImage: 'url("/icons/Close.svg")',
                WebkitMaskImage: 'url("/icons/Close.svg")',
              }}
              className="size-6 bg-current mask-contain mask-no-repeat mask-center shrink-0 block"
              aria-hidden="true"
            />
          ) : (
            <span
              style={{
                maskImage: 'url("/icons/Menu.svg")',
                WebkitMaskImage: 'url("/icons/Menu.svg")',
              }}
              className="size-6 bg-current mask-contain mask-no-repeat mask-center shrink-0 block"
              aria-hidden="true"
            />
          )}
        </button>
      </div>

      {/* MOBILE NAV SIDEBAR DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-black z-40"
            />
            {/* Drawer Container */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed top-0 left-0 bottom-0 w-[80%] max-w-[320px] h-screen bg-white shadow-2xl flex flex-col p-6 z-50 overflow-y-auto"
            >
              {/* Header with Logo and Close Button */}
              <div className="flex justify-between items-center pb-6 border-b border-primary/10 mb-6">
                <Link href="/" className="w-32 h-10 relative overflow-hidden block" onClick={() => setIsMobileMenuOpen(false)}>
                  <Image
                    src="/logoBlack.png"
                    alt="LYFLINE Logo"
                    width={150}
                    height={24}
                    className="w-32 h-8 object-contain"
                  />
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-primary hover:bg-primary/10 rounded-xl transition-colors cursor-pointer border-none bg-transparent"
                  aria-label="Close menu"
                >
                  <span
                    style={{
                      maskImage: 'url("/icons/Close.svg")',
                      WebkitMaskImage: 'url("/icons/Close.svg")',
                    }}
                    className="size-6 bg-current mask-contain mask-no-repeat mask-center shrink-0 block"
                  />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col gap-3 grow">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href || (link.href === "/" && pathname === "/");
                  return (
                    <Link key={link.label} href={link.href} onClick={() => setIsMobileMenuOpen(false)}>
                      <Button
                        variant={isActive ? "ghost-primary" : "ghost-black"}
                        text={link.label}
                        className="w-full justify-start text-base py-3"
                      />
                    </Link>
                  );
                })}
              </div>

              {/* Language Switcher & CTA */}
              <div className="flex flex-col gap-4 border-t border-primary/50 pt-6 mt-auto">
                <div className="flex items-center justify-between py-2 px-2">
                  <span className="text-sm text-primary">{t("nav.select_language")}</span>
                  <button
                    onClick={toggleLang}
                    className="flex items-center gap-2.5 hover:opacity-95 transition-opacity bg-primary-light hover:bg-[#D9E6F5] px-4 py-2.5 rounded-3xl border border-primary/25 shadow-sm cursor-pointer select-none active:scale-98"
                    title={lang === "en" ? "Switch to Bahasa Indonesia" : "Switch to English"}
                  >
                    <div className="w-5 h-3.5 relative overflow-hidden rounded-[2px] outline-1 outline-black">
                      <Image
                        src={lang === "en" ? "/Flags/GB-UKM - United Kingdom.svg" : "/Flags/ID - Indonesia.svg"}
                        alt="Language"
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                    <span className="text-xs font-bold text-primary tracking-wider">
                      {lang === "en" ? "EN" : "ID"}
                    </span>
                  </button>
                </div>

                <Link
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button
                    variant="primary"
                    text={t("nav.appointment")}
                    className="w-full font-poppins text-base font-semibold py-3"
                  />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default NavBar;
