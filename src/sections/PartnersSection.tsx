"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/Button";

export const PartnersSection: React.FC = () => {
  const { lang } = useLanguage();

  const countries = [
    {
      name: lang === "en" ? "Indonesia" : "Indonesia",
      flagElement: (
        <div className="size-20 relative bg-white rounded-full shadow-[0px_2px_2px_0px_rgba(0,0,0,0.10)] outline-2 outline-offset-[-2px] outline-gray-200 overflow-hidden filter grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
          <div className="w-40 h-28 left-[-42px] top-[-22px] absolute bg-slate-50"></div>
          <div className="w-40 h-28 left-[-42px] top-[-22px] absolute bg-slate-50"></div>
          <div className="w-40 h-14 left-[-42px] top-[-22px] absolute bg-red-600"></div>
        </div>
      )
    },
    {
      name: lang === "en" ? "Singapore" : "Singapura",
      flagElement: (
        <div className="size-20 relative bg-white rounded-full shadow-[0px_2px_2px_0px_rgba(0,0,0,0.10)] outline-2 outline-offset-[-2px] outline-gray-200 overflow-hidden filter grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
          <div className="w-24 h-20 left-[-12px] top-[0.50px] absolute bg-slate-50"></div>
          <div className="w-24 h-20 left-[-12px] top-[0.50px] absolute bg-slate-50"></div>
          <div className="w-24 h-9 left-[-12px] top-[0.50px] absolute bg-red-600"></div>
        </div>
      )
    },
    {
      name: lang === "en" ? "Malaysia" : "Malaysia",
      flagElement: (
        <div className="size-20 relative bg-white rounded-full shadow-[0px_2px_2px_0px_rgba(0,0,0,0.10)] outline-2 outline-offset-[-2px] outline-gray-200 overflow-hidden filter grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
          <div className="w-24 h-20 left-[-12px] top-[0.50px] absolute bg-slate-50"></div>
          <div className="w-24 h-2.5 left-[-11.92px] top-[16.13px] absolute bg-red-600"></div>
          <div className="w-24 h-2.5 left-[-11.92px] top-[32.38px] absolute bg-red-600"></div>
          <div className="w-24 h-2 left-[-11.65px] top-[48px] absolute bg-red-600"></div>
          <div className="w-24 h-2 left-[-11.65px] top-[63.63px] absolute bg-red-600"></div>
          <div className="w-24 h-2 left-[-12px] top-[0.50px] absolute bg-red-600"></div>
          <div className="w-12 h-9 left-[-12px] top-[0.50px] absolute bg-indigo-600"></div>
          <div className="w-6 h-7 left-[-7.34px] top-[6.56px] absolute bg-yellow-400"></div>
          <div className="size-5 left-[13px] top-[9.25px] absolute bg-yellow-400"></div>
        </div>
      )
    },
    {
      name: lang === "en" ? "Thailand" : "Thailand",
      flagElement: (
        <div className="size-20 relative bg-white rounded-full shadow-[0px_2px_2px_0px_rgba(0,0,0,0.10)] outline-2 outline-offset-[-2px] outline-gray-200 overflow-hidden filter grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
          <div className="w-24 h-6 left-[-12px] top-[50.50px] absolute bg-red-600"></div>
          <div className="w-24 h-5 left-[-12px] top-[0.50px] absolute bg-red-600"></div>
          <div className="w-24 h-6 left-[-12px] top-[25.50px] absolute bg-indigo-600 outline-8 outline-white"></div>
        </div>
      )
    },
    {
      name: lang === "en" ? "China" : "China",
      flagElement: (
        <div className="size-20 relative bg-white rounded-full shadow-[0px_2px_2px_0px_rgba(0,0,0,0.10)] outline-2 outline-offset-[-2px] outline-gray-200 overflow-hidden filter grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
          <div className="w-24 h-20 left-[-12px] top-[0.50px] absolute bg-red-600"></div>
          <div className="size-8 left-[-5.40px] top-[6.59px] absolute bg-yellow-400"></div>
          <div className="size-4 left-[26.73px] top-[6.49px] absolute bg-yellow-400"></div>
          <div className="size-4 left-[32.98px] top-[18.99px] absolute bg-yellow-400"></div>
          <div className="size-4 left-[26.73px] top-[31.49px] absolute bg-yellow-400"></div>
          <div className="size-4 left-[14.23px] top-[37.74px] absolute bg-yellow-400"></div>
        </div>
      )
    },
    {
      name: lang === "en" ? "Japan" : "Jepang",
      flagElement: (
        <div className="size-20 relative bg-white rounded-full shadow-[0px_2px_2px_0px_rgba(0,0,0,0.10)] outline-2 outline-offset-[-2px] outline-gray-200 overflow-hidden filter grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
          <div className="w-24 h-20 left-[-12px] top-[0.50px] absolute bg-slate-50"></div>
          <div className="w-24 h-20 left-[-12px] top-[0.50px] absolute bg-slate-50"></div>
          <div className="size-12 left-[14.56px] top-[14.56px] absolute bg-red-600"></div>
        </div>
      )
    },
    {
      name: lang === "en" ? "Korea" : "Korea",
      flagElement: (
        <div className="size-20 relative bg-white rounded-full shadow-[0px_2px_2px_0px_rgba(0,0,0,0.10)] outline-2 outline-offset-[-2px] outline-gray-200 overflow-hidden filter grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
          <div className="w-24 h-20 left-[-12px] top-[0.50px] absolute bg-slate-50"></div>
          <div className="w-24 h-20 left-[-12px] top-[0.50px] absolute bg-slate-50"></div>
          <div className="size-10 left-[18px] top-[18.95px] absolute bg-indigo-600"></div>
          <div className="size-10 left-[18px] top-[18.95px] absolute bg-indigo-600"></div>
          <div className="w-10 h-7 left-[18.23px] top-[17.56px] absolute bg-red-600"></div>
        </div>
      )
    },
    {
      name: lang === "en" ? "India" : "India",
      flagElement: (
        <div className="size-20 relative bg-white rounded-full shadow-[0px_2px_2px_0px_rgba(0,0,0,0.10)] outline-2 outline-offset-[-2px] outline-gray-200 overflow-hidden filter grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
          <div className="w-32 h-24 left-[-24.50px] top-[-12px] absolute bg-slate-50"></div>
          <div className="w-32 h-24 left-[-24.50px] top-[-12px] absolute bg-slate-50"></div>
          <div className="w-32 h-8 left-[-24.50px] top-[-12px] absolute bg-amber-500"></div>
          <div className="w-32 h-8 left-[-24.50px] top-[50.50px] absolute bg-lime-600"></div>
          <div className="size-8 left-[22.40px] top-[19.25px] absolute bg-indigo-600"></div>
        </div>
      )
    },
    {
      name: lang === "en" ? "Taiwan" : "Taiwan",
      flagElement: (
        <div className="size-20 relative bg-white rounded-full shadow-[0px_2px_2px_0px_rgba(0,0,0,0.10)] outline-2 outline-offset-[-2px] outline-gray-200 overflow-hidden filter grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
          <div className="w-24 h-20 left-[-12px] top-[0.50px] absolute bg-red-600"></div>
          <div className="w-24 h-20 left-[-12px] top-[0.50px] absolute bg-red-600"></div>
          <div className="w-14 h-11 left-[-12px] top-[0.50px] absolute bg-blue-800"></div>
        </div>
      )
    }
  ];

  const logos = [
    { src: "https://placehold.co/119x78", className: "w-28 h-20" },
    { src: "https://placehold.co/160x60", className: "w-40 h-14" },
    { src: "https://placehold.co/176x59", className: "w-44 h-14" },
    { src: "https://placehold.co/182x41", className: "w-44 h-10" },
    { src: "https://placehold.co/167x67", className: "w-40 h-16" },
    { src: "https://placehold.co/197x55", className: "w-full h-14" },
    { src: "https://placehold.co/154x50", className: "w-40 h-12" },
    { src: "https://placehold.co/58x55", className: "w-14 h-14" },
    { src: "https://placehold.co/170x43", className: "w-44 h-11" },
    { src: "https://placehold.co/171x52", className: "w-44 h-12" }
  ];

  return (
    <section id="partners" className="w-full py-16 bg-white flex flex-col justify-start items-center gap-2.5 relative overflow-hidden">

      {/* Content Container */}
      <div className="w-full max-w-[1152px] px-6 md:px-12 lg:px-0 flex flex-col justify-start items-center gap-12 z-10">

        {/* Header Block */}
        <div className="self-stretch flex flex-col justify-start items-start gap-1">
          <div className="text-primary/50 text-sm font-normal font-poppins tracking-wider uppercase">
            {lang === "en" ? "EXPERTISE ACROSS THE WORLD" : "KEAHLIAN DI SELURUH DUNIA"}
          </div>
          <h2 className="text-primary text-3xl font-semibold font-sans mt-1">
            {lang === "en" ? "40+ Partners Across These Countries" : "40+ Mitra di Negara-Negara Ini"}
          </h2>
        </div>

        {/* Outer Grid of Countries and Partner Logos */}
        <div className="self-stretch flex flex-col justify-start items-center gap-8 w-full">

          {/* Countries wrap list */}
          <div className="w-full flex flex-row flex-wrap justify-center lg:justify-between items-center gap-6 lg:gap-0">
            {countries.map((country, idx) => (
              <div key={idx} className="w-24 flex flex-col justify-start items-center gap-2 group">
                {country.flagElement}
                <div className="self-stretch text-center text-black text-base font-medium font-poppins group-hover:text-primary transition-colors">
                  {country.name}
                </div>
              </div>
            ))}
          </div>

          {/* Divider Line */}
          <div className="w-full h-[1px] bg-gray-200 pointer-events-none" />

          {/* Logo Cards Grid */}
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 justify-items-center">
            {logos.map((logo, idx) => (
              <div
                key={idx}
                className="w-full h-24 p-3 bg-white rounded-xl outline-2 outline-offset-[-2px] outline-stone-50 flex flex-col justify-center items-center gap-2 shadow-xs transition-all duration-300 hover:shadow-md hover:border-gray-300 group"
              >
                <img
                  src={logo.src}
                  alt="Partner Logo"
                  className={`${logo.className} object-contain filter grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300`}
                />
              </div>
            ))}
          </div>

          {/* View All Partners CTA Button using button.tsx */}
          <div className="flex justify-center mt-4">
            <Button
              variant="outline-primary"
              text={lang === "en" ? "View All Partners" : "Lihat Semua Mitra"}
              rightIcon="Right 1"
              className="h-12 px-6 outline-2  transition-all duration-300"
            />
          </div>

        </div>

      </div>

      {/* Decorative Outer Circles */}
      <div className="size-48 left-[-100px] top-[570px] absolute bg-blue-50 rounded-full -z-10 pointer-events-none opacity-60"></div>
      <div className="size-48 left-[90%] lg:left-[1340px] top-[-104px] absolute bg-rose-50 rounded-full -z-10 pointer-events-none opacity-60"></div>

    </section>
  );
};
