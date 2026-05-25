"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "id";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header
    "nav.home": "Home",
    "nav.about": "About Us",
    "nav.services": "Services",
    "nav.partners": "Partners",
    "nav.articles": "Articles",
    "nav.appointment": "Appointment",
    "nav.select_language": "Select Language",

    // Hero Section
    "hero.badge": "Hearts icon",
    "hero.title": "Your Reliable Medical Care",
    "hero.subtitle": "We connect you to top international medical specialists, ensuring a smooth transition and premium care during your recovery.",
    "hero.btn.find": "Find a Doctor →",
    "hero.btn.learn": "Learn More",
    "hero.promo.label": "Special Promo",
    "hero.promo.discount": "10% Off",
    "hero.promo.desc": "For your first consultation",
    "hero.promo.btn": "Consult Now! →",

    // Partners Section
    "partners.headline": "Partnered with {30+} hospitals accross {7} countries",
    "partners.btn.view": "View All Partners →",

    // Footer bottom bar
    "footer.btn.book": "Book an Appointment ↗",
    "footer.btn.find": "Find a Doctor",
    "footer.btn.contact": "Contact Us",
  },
  id: {
    // Header
    "nav.home": "Beranda",
    "nav.about": "Tentang Kami",
    "nav.services": "Layanan",
    "nav.partners": "Mitra",
    "nav.articles": "Artikel",
    "nav.appointment": "Janji Temu",
    "nav.select_language": "Pilih Bahasa",

    // Hero Section
    "hero.badge": "Ikon Hati",
    "hero.title": "Perawatan Medis Terpercaya Anda",
    "hero.subtitle": "Kami menghubungkan Anda dengan spesialis medis internasional terbaik, memastikan transisi yang lancar dan perawatan premium selama masa pemulihan Anda.",
    "hero.btn.find": "Cari Dokter →",
    "hero.btn.learn": "Pelajari Lebih Lanjut",
    "hero.promo.label": "Promo Spesial",
    "hero.promo.discount": "Diskon 10%",
    "hero.promo.desc": "Untuk konsultasi pertama Anda",
    "hero.promo.btn": "Konsultasi Sekarang! →",

    // Partners Section
    "partners.headline": "Bekerjasama dengan {30+} rumah sakit di {7} negara",
    "partners.btn.view": "Lihat Semua Mitra →",

    // Footer bottom bar
    "footer.btn.book": "Buat Janji Temu ↗",
    "footer.btn.find": "Cari Dokter",
    "footer.btn.contact": "Hubungi Kami",
  },
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>("en");

  const setLang = (newLang: Language) => {
    setLangState(newLang);
  };

  const toggleLang = () => {
    setLangState((prev) => (prev === "en" ? "id" : "en"));
  };

  const t = (key: string): string => {
    return translations[lang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
