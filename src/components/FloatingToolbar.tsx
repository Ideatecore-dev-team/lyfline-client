"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/Button";
import { useLanguage } from "@/context/LanguageContext";

export const FloatingToolbar: React.FC = () => {
  const { lang } = useLanguage();

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#071318]/95 backdrop-blur-md px-1.5 py-1.5 min-[630px]:px-2 min-[630px]:py-2 rounded-full border border-white/10 flex items-center gap-1.5 min-[630px]:gap-3 shadow-2xl scale-90 md:scale-100 transition-all duration-300">

      {/* Book an Appointment Button */}
      <Link href="https://wa.me/6281291578559" target="_blank" rel="noopener noreferrer">
        <Button
          variant="primary"
          text={
            lang === "en" ? (
              <>
                <span className="hidden min-[630px]:inline">Book an Appointment</span>
                <span className="inline min-[630px]:hidden">Appointment</span>
              </>
            ) : (
              <>
                <span className="hidden min-[630px]:inline">Buat Janji Temu</span>
                <span className="inline min-[630px]:hidden">Janji Temu</span>
              </>
            )
          }
          rightIcon="Up Right"
          className="h-12 px-2.5 min-[630px]:px-4 py-3 font-poppins text-base font-semibold !bg-[#E02828] !bg-none !text-white hover:!bg-[#E02828]/90"
        />
      </Link>

      {/* Find a Doctor Button */}
      <Link href="/doctors">
        <Button
          variant="ghost-white"
          text={
            lang === "en" ? (
              <>
                <span className="hidden min-[630px]:inline">Find a Doctor</span>
                <span className="inline min-[630px]:hidden">All Doctors</span>
              </>
            ) : (
              <>
                <span className="hidden min-[630px]:inline">Cari Dokter</span>
                <span className="inline min-[630px]:hidden">Semua Dokter</span>
              </>
            )
          }
          className="h-12 px-2.5 min-[630px]:px-4 py-3 font-poppins text-base font-semibold !text-slate-300 hover:!text-white"
        />
      </Link>

      {/* Contact Us Button */}
      <Link href="https://wa.me/6281291578559" target="_blank" rel="noopener noreferrer">
        <Button
          variant="ghost-white"
          text={
            lang === "en" ? (
              <>
                <span className="hidden min-[630px]:inline">Contact Us</span>
                <span className="inline min-[630px]:hidden">Contact</span>
              </>
            ) : (
              <>
                <span className="hidden min-[630px]:inline">Hubungi Kami</span>
                <span className="inline min-[630px]:hidden">Hubungi</span>
              </>
            )
          }
          className="h-12 px-2.5 min-[630px]:px-4 py-3 font-poppins text-base font-semibold !text-slate-300 hover:!text-white"
        />
      </Link>
    </div>
  );
};

export default FloatingToolbar;
