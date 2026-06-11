"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { IconButton } from "@/components/IconButton";
import { FloatingToolbar } from "./FloatingToolbar";

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer
      id="footer"
      className="w-full bg-gradient-to-r from-[#3F71B7] to-[#3365AC] py-12 flex flex-col justify-start items-center relative gap-2.5 overflow-hidden"
    >
      <div className="w-full max-w-[1153px] px-6 md:px-0 flex flex-col justify-start items-start gap-6">
        <div className="self-stretch flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-6">

          {/* GET IN TRACK (Contact Details) */}
          <div className="w-full lg:w-[564px] flex flex-col justify-start items-start gap-8">
            <div className="w-full lg:w-[500px] flex flex-col justify-start items-start gap-6">
              <div className="text-white/70 text-sm font-normal font-poppins">GET IN TRACK</div>

              <div className="self-stretch flex flex-col justify-start items-start gap-6">
                {/* Email Address */}
                <div
                  className="inline-flex justify-center items-center gap-2.5 text-white text-base font-medium font-poppins"
                >
                  <span
                    style={{
                      maskImage: 'url("/icons/Message 36.svg")',
                      WebkitMaskImage: 'url("/icons/Message 36.svg")',
                    }}
                    className="size-5 bg-white/70 mask-contain mask-no-repeat mask-center shrink-0"
                    aria-hidden="true"
                  />
                  <span>info@lyfline.id</span>
                </div>

                {/* Phone Number */}
                <div
                  className="inline-flex justify-center items-center gap-2.5 text-white text-base font-medium font-poppins"
                >
                  <span
                    style={{
                      maskImage: 'url("/icons/Message 18.svg")',
                      WebkitMaskImage: 'url("/icons/Message 18.svg")',
                    }}
                    className="size-5 bg-white/70 mask-contain mask-no-repeat mask-center shrink-0"
                    aria-hidden="true"
                  />
                  <span>+62 812-9157-8559</span>
                </div>

                {/* Physical Address */}
                <div
                  className="inline-flex justify-start items-start gap-2.5 text-white text-base font-medium font-poppins text-left"
                >
                  <span
                    style={{
                      maskImage: 'url("/icons/Location.svg")',
                      WebkitMaskImage: 'url("/icons/Location.svg")',
                    }}
                    className="size-5 bg-white/70 mask-contain mask-no-repeat mask-center shrink-0 mt-1"
                    aria-hidden="true"
                  />
                  <span className="flex-1 leading-relaxed">
                    GoWork Coworking, Menara Rajawali, Ground Floor. Jl. DR. Ide Anak Agung Gde Agung, Kawasan Mega Kuningan, Jakarta Selatan, 12950
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* MENUS (Navigation Links) */}
          <div className="flex justify-start items-start gap-6">
            <div className="inline-flex flex-col justify-start items-start gap-3">
              <div className="text-white/70 text-sm font-normal font-poppins">MENUS</div>
              <div className="self-stretch flex flex-col justify-start items-start gap-3">
                <Link
                  href="/"
                  className="w-28 h-12 py-3 inline-flex justify-start items-center text-white text-base font-medium font-poppins hover:opacity-80 hover:pl-2 transition-all duration-300"
                >
                  {t("nav.home")}
                </Link>
                <Link
                  href="/about"
                  className="w-28 h-12 py-3 inline-flex justify-start items-center text-white text-base font-medium font-poppins hover:opacity-80 hover:pl-2 transition-all duration-300"
                >
                  {t("nav.about")}
                </Link>
                <Link
                  href="/services"
                  className="w-28 h-12 py-3 inline-flex justify-start items-center text-white text-base font-medium font-poppins hover:opacity-80 hover:pl-2 transition-all duration-300"
                >
                  {t("nav.services")}
                </Link>
                <Link
                  href="/#doctors"
                  className="w-28 h-12 py-3 inline-flex justify-start items-center text-white text-base font-medium font-poppins hover:opacity-80 hover:pl-2 transition-all duration-300"
                >
                  {t("nav.doctors")}
                </Link>
              </div>
            </div>

            <div className="inline-flex flex-col justify-start items-start gap-3">
              <div className="opacity-0 text-white/70 text-sm font-normal font-poppins select-none">MENUS</div>
              <div className="self-stretch flex flex-col justify-start items-start gap-3">
                <Link
                  href="/partners"
                  className="w-28 h-12 py-3 inline-flex justify-start items-center text-white text-base font-medium font-poppins hover:opacity-80 hover:pl-2 transition-all duration-300"
                >
                  {t("nav.partners")}
                </Link>
                <Link
                  href="/articles"
                  className="w-28 h-12 py-3 inline-flex justify-start items-center text-white text-base font-medium font-poppins hover:opacity-80 hover:pl-2 transition-all duration-300"
                >
                  {t("nav.articles")}
                </Link>
                <Link
                  href="#footer"
                  className="w-28 h-12 py-3 inline-flex justify-start items-center text-white text-base font-medium font-poppins hover:opacity-80 hover:pl-2 transition-all duration-300"
                >
                  {t("footer.btn.contact")}
                </Link>
              </div>
            </div>
          </div>

          {/* SOCIALS */}
          <div className="inline-flex flex-col justify-start items-start gap-8">
            <div className="self-stretch flex flex-col justify-start items-start gap-6">
              <div className="text-white/70 text-sm font-normal font-poppins">SOCIALS</div>
              <div className="inline-flex justify-start items-start gap-3">

                {/* Instagram (using public/icons) */}
                <a href="#" aria-label="Instagram">
                  <IconButton variant="primary-outline" icon="Instagram" />
                </a>

                {/* Facebook (using public/icons) */}
                <a href="#" aria-label="Facebook">
                  <IconButton variant="primary-outline" icon="facebook" />
                </a>

                {/* Youtube (using public/icons) */}
                <a href="#" aria-label="Youtube">
                  <IconButton variant="primary-outline" icon="youtube" />
                </a>

              </div>
            </div>
          </div>

        </div>
      </div>

      {/* FLOATING ACTION TOOLBAR STICKY BAR PILLED */}
      <FloatingToolbar />

      {/* Decorative Brand Watermark */}
      <Image
        src="/icons/assets/lyflineHeart.svg"
        alt="Lyfline Heart Logo"
        width={120}
        height={120}
        className="absolute bottom-0 right-0 size-20 md:size-[120px] pointer-events-none select-none opacity-100"
      />
    </footer>
  );
};

export default Footer;
