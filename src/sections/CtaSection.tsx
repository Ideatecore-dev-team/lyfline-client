"use client";

import React from "react";
import { Button } from "@/components/Button";

export const CtaSection: React.FC = () => {
  return (
    <section className="w-full flex justify-center items-center py-16 bg-white z-10 relative">
      <div className="w-full max-w-[1440px] px-6 md:px-36 inline-flex flex-col justify-start items-center gap-2.5">
        <div className="w-full max-w-[1152px] p-6 md:p-12 bg-primary rounded-[32px] flex flex-col justify-start items-start gap-6 overflow-hidden relative shadow-lg">
          
          {/* Decorative background glow */}
          <div className="absolute top-[-20%] right-[-10%] w-[300px] h-[300px] bg-white/5 blur-3xl rounded-full pointer-events-none" />

          <h2 className="w-full max-w-[662px] justify-start text-white text-3xl font-medium font-poppins leading-tight z-10">
            Ready to start your international<br className="hidden sm:inline" /> health journey?
          </h2>

          <Button
            variant="outline-white"
            text="Book an Appointment"
            rightIcon="Right 1"
            className="z-10 cursor-pointer"
          />

        </div>
      </div>
    </section>
  );
};
