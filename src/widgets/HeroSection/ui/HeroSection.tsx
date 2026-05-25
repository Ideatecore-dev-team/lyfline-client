"use client";

import React from "react";
import { motion } from "framer-motion";
import { Phone, Video, Volume2, Mic, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/shared/ui/Button";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-gradient-to-b from-[#ECF1F8]/30 via-white to-transparent">
      {/* Background blobs for premium depth */}
      <div className="absolute top-20 left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-3xl -z-10" />
      <div className="absolute top-40 right-[-10%] w-[30%] h-[30%] rounded-full bg-accent/5 blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* TEXT CONTENT (LEFT SIDE - 7 cols on lg) */}
          <motion.div
            className="lg:col-span-7 flex flex-col items-start"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Tag Badge */}
            <span className="text-xs font-bold tracking-widest text-primary uppercase bg-primary-light px-4 py-2 rounded-full mb-6">
              WHO WE ARE
            </span>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-dark leading-[1.1] mb-6">
              Build on Trust, <br />
              <span className="text-primary relative inline-block">
                Driven with Care
                <svg className="absolute left-0 bottom-[-8px] w-full h-[8px] text-primary-light/50" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0,5 C30,8 70,2 100,5" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            {/* Paragraph Blocks per mockup */}
            <div className="space-y-4 text-base md:text-lg text-neutral-muted leading-relaxed max-w-2xl mb-8">
              <p>
                As your trusted medical care facilitator, we take care of every step of your healthcare journey — from initial consultation to treatment support and travel arrangements. Simply reach out to <strong>LYFLINE</strong> and share your medical history with us.
              </p>
              <p>
                Our team will help you explore the best treatment options, recommended doctors, hospitals or clinics, preferred destinations, travel arrangements, and more — all tailored to your needs.
              </p>
              <p className="flex items-center gap-2 font-medium text-primary">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-success" />
                <span>With LYFLINE, there are no hidden fees and no complicated payment schemes. You only pay for the services you receive.</span>
              </p>
            </div>

            {/* Primary Action */}
            <Button variant="primary" size="lg" className="group gap-2 shadow-lg shadow-primary/20">
              Get to know more! <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          {/* TELECONSULTATION GRAPHIC MOCKUP (RIGHT SIDE - 5 cols on lg) */}
          <motion.div
            className="lg:col-span-5 flex justify-center w-full"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            {/* The Telehealth mockup frame */}
            <div className="relative w-full max-w-[480px] aspect-[4/3] rounded-[32px] overflow-hidden bg-slate-900 border-4 border-white shadow-2xl shadow-slate-300/50 group">
              
              {/* Doctor Background (Simulated via high-quality styling) */}
              <div 
                className="absolute inset-0 bg-cover bg-center flex flex-col justify-end p-6"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800')` // High-quality medical doctor image
                }}
              >
                {/* Visual fallback gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-900/10 pointer-events-none" />

                {/* Patient Picture-in-Picture Frame (Upper left) */}
                <div className="absolute top-4 left-4 w-28 h-36 rounded-2xl overflow-hidden border-2 border-white shadow-md bg-slate-800">
                  <div 
                    className="w-full h-full bg-cover bg-center"
                    style={{
                      backgroundImage: `url('https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300')` // Smiling patient
                    }}
                  />
                </div>

                {/* Connection Status Indicator */}
                <div className="absolute top-4 right-4 bg-success text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  Live Call
                </div>

                {/* Call Metadata (Lower-left) */}
                <div className="relative z-10 text-white mb-2">
                  <h4 className="font-bold text-sm tracking-wide shadow-text">Doctor Specialist</h4>
                  <p className="text-[10px] text-slate-300 font-medium">Active Session • 00:15:24</p>
                </div>

                {/* Telehealth Controls Panel overlay (Bottom center) */}
                <div className="relative z-10 flex items-center justify-center gap-3 w-full bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/15">
                  <button className="p-2.5 rounded-xl bg-accent text-white hover:bg-accent-hover transition-colors shadow-sm" aria-label="End consultation">
                    <Phone className="w-4 h-4 rotate-135" />
                  </button>
                  <button className="p-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors" aria-label="Toggle camera">
                    <Video className="w-4 h-4" />
                  </button>
                  <button className="p-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors" aria-label="Adjust volume">
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <button className="p-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors" aria-label="Mute microphone">
                    <Mic className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Decorative graphic border elements */}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full" />
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};
