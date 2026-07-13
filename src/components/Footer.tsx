"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { IconButton } from "@/components/IconButton";
import { FloatingToolbar } from "./FloatingToolbar";
import { WHATSAPP_HREF } from "@/lib/constants";

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer
      id="footer"
      className="w-full bg-gradient-to-r from-[#3F71B7] to-[#3365AC] pt-12 pb-36 min-[630px]:pb-28 flex flex-col justify-start items-center relative gap-2.5 overflow-hidden"
    >
      <div className="w-full max-w-[1153px] px-6 md:px-12 xl:px-0 flex flex-col justify-start items-start gap-6">
        <div className="self-stretch flex flex-col md:flex-row flex-wrap xl:flex-nowrap justify-between items-start gap-12 md:gap-6 xl:gap-6">

          {/* GET IN TRACK (Contact Details) */}
          <div className="w-full md:w-[340px] lg:w-[480px] xl:w-[564px] flex flex-col justify-start items-start gap-8">
            <div className="w-full lg:w-[440px] xl:w-[500px] flex flex-col justify-start items-start gap-6">
              <div className="text-white/70 text-sm font-normal font-poppins">GET IN TOUCH</div>

              <div className="self-stretch flex flex-col justify-start items-start gap-6">
                {/* Email Address */}
                <a
                  href="mailto:info@lyfline.id"
                  className="inline-flex justify-center items-center gap-2.5 text-white text-base font-medium font-poppins hover:opacity-80 transition-all duration-300 cursor-pointer"
                >
                  <span
                    style={{
                      maskImage: 'url("/icons/Message 36.svg")',
                      WebkitMaskImage: 'url("/icons/Message 36.svg")',
                    }}
                    className="size-5 bg-white/70 mask-contain mask-no-repeat mask-center shrink-0"
                    aria-hidden="true"
                  />
                  <span className="hover:underline">info@lyfline.id</span>
                </a>

                {/* Phone Number */}
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex justify-center items-center gap-2.5 text-white text-base font-medium font-poppins hover:opacity-80 transition-all duration-300 cursor-pointer"
                >
                  <span
                    style={{
                      maskImage: 'url("/icons/Message 18.svg")',
                      WebkitMaskImage: 'url("/icons/Message 18.svg")',
                    }}
                    className="size-5 bg-white/70 mask-contain mask-no-repeat mask-center shrink-0"
                    aria-hidden="true"
                  />
                  <span className="hover:underline">+62 812-9157-8559</span>
                </a>

                {/* Physical Address */}
                <a
                  href="https://www.google.com/maps/search/?api=1&query=GoWork+Menara+Rajawali+Kuningan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex justify-start items-start gap-2.5 text-white text-base font-medium font-poppins text-left hover:opacity-80 transition-all duration-300 cursor-pointer"
                >
                  <span
                    style={{
                      maskImage: 'url("/icons/Location.svg")',
                      WebkitMaskImage: 'url("/icons/Location.svg")',
                    }}
                    className="size-5 bg-white/70 mask-contain mask-no-repeat mask-center shrink-0 mt-1"
                    aria-hidden="true"
                  />
                  <span className="flex-1 leading-relaxed hover:underline">
                    GoWork Coworking, Menara Rajawali, Ground Floor. Jl. DR. Ide Anak Agung Gde Agung, Kawasan Mega Kuningan, Jakarta Selatan, 12950
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* MENUS (Navigation Links) */}
          <div className="flex justify-start items-start gap-6">
            <div className="inline-flex flex-col justify-start items-start gap-3">
              <div className="text-white/70 text-sm font-normal font-poppins">MENU</div>
              <div className="self-stretch flex flex-col justify-start items-start gap-3">
                <Link
                  href="/"
                  className="w-28 h-8 py-1 inline-flex justify-start items-center text-white text-base font-medium font-poppins hover:opacity-80 hover:pl-2 transition-all duration-300"
                >
                  {t("nav.home")}
                </Link>
                <Link
                  href="/about"
                  className="w-28 h-8 py-1 inline-flex justify-start items-center text-white text-base font-medium font-poppins hover:opacity-80 hover:pl-2 transition-all duration-300"
                >
                  {t("nav.about")}
                </Link>
                <Link
                  href="/services"
                  className="w-28 h-8 py-1 inline-flex justify-start items-center text-white text-base font-medium font-poppins hover:opacity-80 hover:pl-2 transition-all duration-300"
                >
                  {t("nav.services")}
                </Link>
                <Link
                  href="/#doctors"
                  className="w-28 h-8 py-1 inline-flex justify-start items-center text-white text-base font-medium font-poppins hover:opacity-80 hover:pl-2 transition-all duration-300"
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
                  className="w-28 h-8 py-1 inline-flex justify-start items-center text-white text-base font-medium font-poppins hover:opacity-80 hover:pl-2 transition-all duration-300"
                >
                  {t("nav.partners")}
                </Link>
                <Link
                  href="/articles"
                  className="w-28 h-8 py-1 inline-flex justify-start items-center text-white text-base font-medium font-poppins hover:opacity-80 hover:pl-2 transition-all duration-300"
                >
                  {t("nav.articles")}
                </Link>
                <Link
                  href="#footer"
                  className="w-28 h-8 py-1 inline-flex justify-start items-center text-white text-base font-medium font-poppins hover:opacity-80 hover:pl-2 transition-all duration-300"
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
                <a
                  href="https://www.instagram.com/lyfline.id?igsh=MnNraDVycnYwamU4"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <IconButton variant="primary-outline" icon="Instagram" />
                </a>

                {/* Facebook (using public/icons) */}
                <a
                  href="https://www.facebook.com/lyfline.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <IconButton variant="primary-outline" icon="facebook" />
                </a>

                {/* Tiktok (using public/icons) */}
                <a
                  href="https://www.tiktok.com/@lyfline.id?is_from_webapp=1&sender_device=pc"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Tiktok"
                >
                  <IconButton variant="primary-outline" icon="tiktok" />
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
