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
    "nav.doctors": "Doctors",
    "nav.partners": "Partners",
    "nav.articles": "Articles",
    "nav.appointment": "Appointment",
    "nav.select_language": "Select Language",
    "nav.doctors": "Doctors",

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

    // Doctors Section
    "doctors.hero.subtitle": "OUR DOCTORS",
    "doctors.hero.title": "Wide Range of Medical Specialists",
    "doctors.hero.search_placeholder": "Dr. Abraham...",
    "doctors.hero.search_btn": "Search",
    "doctors.hero.consult_btn": "Consult Now!",
    "doctors.filter.label": "FILTER DOCTOR",
    "doctors.filter.region": "Pick a Region",
    "doctors.filter.hospital": "Pick a Hospital",
    "doctors.filter.specialty": "Pick a Specialty",
    "doctors.grid.showing_all": "Showing All Doctors",
    "doctors.grid.showing_results": "Showing {n} results",
    "doctors.card.view_details": "View Details",

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
    "nav.doctors": "Dokter",
    "nav.partners": "Mitra",
    "nav.articles": "Artikel",
    "nav.appointment": "Janji Temu",
    "nav.select_language": "Pilih Bahasa",
    "nav.doctors": "Dokter",

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

    // Doctors Section
    "doctors.hero.subtitle": "DOKTER KAMI",
    "doctors.hero.title": "Berbagai Spesialis Medis",
    "doctors.hero.search_placeholder": "Nama dokter...",
    "doctors.hero.search_btn": "Cari",
    "doctors.hero.consult_btn": "Konsultasi Sekarang!",
    "doctors.filter.label": "FILTER DOKTER",
    "doctors.filter.region": "Pilih Wilayah",
    "doctors.filter.hospital": "Pilih Rumah Sakit",
    "doctors.filter.specialty": "Pilih Spesialisasi",
    "doctors.grid.showing_all": "Menampilkan Semua Dokter",
    "doctors.grid.showing_results": "Menampilkan {n} hasil",
    "doctors.card.view_details": "Lihat Detail",

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
