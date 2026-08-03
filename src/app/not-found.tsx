"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";
import { useLanguage } from "@/context/LanguageContext";

export default function NotFound() {
  const router = useRouter();
  const { lang } = useLanguage();

  const handleGoBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      window.history.back();
    } else {
      router.push("/");
    }
  };

  const texts = {
    title: lang === "en" ? "Oops! Page Not Found" : "Oops! Halaman Tidak Ditemukan",
    description:
      lang === "en"
        ? "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."
        : "Halaman yang Anda cari mungkin telah dihapus, berganti nama, atau untuk sementara tidak tersedia.",
    btnBack: lang === "en" ? "Go Back" : "Kembali",
    btnHome: lang === "en" ? "Back to Home" : "Kembali ke Beranda",
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFCFF]">
      <NavBar />

      <main className="grow pt-[120px] pb-24 px-6 w-full flex flex-col justify-center items-center relative overflow-hidden">
        {/* Soft decorative background circles */}
        <div className="absolute top-1/4 left-1/10 size-96 bg-primary-light/60 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-1/4 right-1/10 size-96 bg-[#3F71B7]/10 rounded-full blur-3xl -z-10" />

        <div className="w-full max-w-lg  p-8 md:p-12 flex flex-col items-center text-center">
          {/* 404 Stylized Graphic */}
          <div className="relative mb-6">
            <h1 className="text-8xl md:text-9xl font-extrabold font-sans tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-accent to-primary-dark">
              404
            </h1>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-accent rounded-full" />
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 font-poppins mb-4 mt-2">
            {texts.title}
          </h2>

          <p className="text-slate-500 font-sans text-sm md:text-base leading-relaxed mb-8 max-w-sm">
            {texts.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <Button
              onClick={handleGoBack}
              variant="primary"
              text={texts.btnBack}
              leftIcon="Left 1"
              className="w-full sm:w-auto px-8"
            />
            <Link href="/" className="w-full sm:w-auto">
              <Button
                variant="outline-primary"
                text={texts.btnHome}
                className="w-full sm:w-auto px-8"
              />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
