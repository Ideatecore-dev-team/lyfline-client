"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/Button";
import { useLanguage } from "@/context/LanguageContext";

export const FloatingToolbar: React.FC = () => {
  const { lang } = useLanguage();

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#071318]/95 backdrop-blur-md px-2 py-2 rounded-full border border-white/10 flex items-center gap-3 shadow-2xl scale-90 md:scale-100 transition-all duration-300">
      
      {/* Book an Appointment Button */}
      <Link href="#appointment">
        <Button
          variant="primary"
          text={lang === "en" ? "Book an Appointment" : "Buat Janji Temu"}
          rightIcon="Up Right"
          className="h-12 px-4 py-3 font-poppins text-base font-semibold !bg-[#E02828] !bg-none !text-white hover:!bg-[#E02828]/90"
        />
      </Link>

      {/* Find a Doctor Button */}
      <Link href="#services">
        <Button
          variant="ghost-white"
          text={lang === "en" ? "Find a Doctor" : "Cari Dokter"}
          className="h-12 px-4 py-3 font-poppins text-base font-semibold !text-slate-300 hover:!text-white"
        />
      </Link>

      {/* Contact Us Button */}
      <Link href="#footer">
        <Button
          variant="ghost-white"
          text={lang === "en" ? "Contact Us" : "Hubungi Kami"}
          className="h-12 px-4 py-3 font-poppins text-base font-semibold !text-slate-300 hover:!text-white"
        />
      </Link>
    </div>
  );
};

export default FloatingToolbar;
