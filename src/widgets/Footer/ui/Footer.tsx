"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube, ArrowUpRight } from "lucide-react";
import { Button } from "@/shared/ui/Button";

export const Footer: React.FC = () => {
  return (
    <footer id="footer" className="relative bg-primary text-white pt-20 pb-28 md:pb-12 overflow-hidden border-t border-white/5">
      {/* Decorative patterns */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[35%] h-[35%] bg-white/5 blur-3xl rounded-full" />
      <div className="absolute top-[-10%] left-[-10%] w-[25%] h-[25%] bg-white/5 blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Top footer row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-white/10">
          
          {/* Brand & Contacts (6 columns on lg) */}
          <div className="lg:col-span-6 flex flex-col items-start">
            
            {/* Logo */}
            <Link href="#" className="flex items-center gap-2 mb-6 group">
              <Image
                src="/logoWhite.png"
                alt="LYFLINE Logo"
                width={120}
                height={40}
                className="h-8 w-auto object-contain"
                priority
              />
            </Link>

            {/* Paragraph */}
            <p className="text-sm leading-relaxed text-slate-200/80 mb-8 max-w-md">
              From finding the right doctor to arranging your treatment journey, Lyfline helps make medical care easier and more reliable.
            </p>

            {/* Contacts details list */}
            <div className="space-y-4 text-xs md:text-sm text-slate-100/90 w-full max-w-md">
              <span className="text-[10px] font-bold tracking-widest text-slate-300 uppercase block mb-2">
                GET IN TRACK
              </span>
              
              <a href="mailto:info@lyfline.id" className="flex items-center gap-3 hover:text-white/80 transition-colors w-fit">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 text-white">
                  <Mail className="w-4 h-4" />
                </div>
                <span>info@lyfline.id</span>
              </a>

              <a href="tel:+6281291578559" className="flex items-center gap-3 hover:text-white/80 transition-colors w-fit">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 text-white">
                  <Phone className="w-4 h-4" />
                </div>
                <span>+62 812-9157-8559</span>
              </a>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 text-white mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="leading-relaxed">
                  GoWork Coworking, Menara Rajawali, Ground Floor. Jl. DR. Ide Anak Agung Gde Agung, Kawasan Mega Kuningan, Jakarta Selatan, 12950
                </span>
              </div>
            </div>

          </div>

          {/* Menus Links (4 columns on lg) */}
          <div className="lg:col-span-3">
            <span className="text-[10px] font-bold tracking-widest text-slate-300 uppercase block mb-6">
              MENUS
            </span>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3 text-sm text-slate-200/80">
                <Link href="#" className="hover:text-white transition-colors">Home</Link>
                <Link href="#why-us" className="hover:text-white transition-colors">About Us</Link>
                <Link href="#services" className="hover:text-white transition-colors">Services</Link>
                <Link href="#" className="hover:text-white transition-colors">Doctors</Link>
              </div>
              <div className="flex flex-col gap-3 text-sm text-slate-200/80">
                <Link href="#partners" className="hover:text-white transition-colors">Partners</Link>
                <Link href="#blog" className="hover:text-white transition-colors">Blog</Link>
                <Link href="#footer" className="hover:text-white transition-colors">Contact Us</Link>
              </div>
            </div>
          </div>

          {/* Socials Media (3 columns on lg) */}
          <div className="lg:col-span-3 flex flex-col items-start lg:items-end">
            <span className="text-[10px] font-bold tracking-widest text-slate-300 uppercase block mb-6">
              SOCIALS
            </span>
            <div className="flex items-center gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all hover:scale-105" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all hover:scale-105" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all hover:scale-105" aria-label="Youtube">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-300/80">
          <span>© 2026 Lyfline. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>

      {/* FLOATING ACTION TOOLBAR STICKY BAR PILLED (STICK TO BOTTOM CENTER) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-slate-950/90 backdrop-blur-md px-2 py-2 rounded-full border border-white/10 flex items-center gap-1.5 shadow-2xl shadow-slate-950/50 scale-90 md:scale-100 hover:border-primary/50 transition-all duration-300">
        <Link href="#" className="text-xs font-semibold px-4 py-2 hover:bg-white/10 rounded-full text-slate-200 hover:text-white transition-colors">
          Find a Doctor
        </Link>
        <Link href="#footer" className="text-xs font-semibold px-4 py-2 hover:bg-white/10 rounded-full text-slate-200 hover:text-white transition-colors">
          Contact Us
        </Link>
        <Button variant="primary" size="sm" className="gap-1 px-4 py-2 text-xs">
          Book Appointment <ArrowUpRight className="w-3.5 h-3.5" />
        </Button>
      </div>

    </footer>
  );
};
