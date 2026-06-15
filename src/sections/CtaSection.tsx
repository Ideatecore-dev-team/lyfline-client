"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/Button";
import { NoiseTexture } from "@/components/magicui/NoiseTexture";

export const CtaSection: React.FC = () => {
  return (
    <section className="w-full flex justify-center items-center py-16 bg-white z-10 relative">
      <div className="w-full max-w-[1440px] px-6 md:px-16 lg:px-24 xl:px-36 inline-flex flex-col justify-start items-center gap-2.5">
        <motion.div
          className="w-full max-w-[1152px] p-6 md:p-6 bg-gradient-to-r from-[#3F71B7] to-[#3365AC] rounded-[32px] flex flex-col justify-start items-start gap-6 overflow-hidden relative shadow-lg"
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.34, 1.56, 0.64, 1] }}
          viewport={{ once: true, margin: "-80px" }}
        >

          {/* Noise Texture Overlay */}
          <NoiseTexture noiseOpacity={0.3} />

          {/* Decorative Quarter Circle Watermark */}
          <span
            style={{
              maskImage: 'url("/icons/assets/lyflineQuarterCircle.svg")',
              WebkitMaskImage: 'url("/icons/assets/lyflineQuarterCircle.svg")',
            }}
            className="absolute top-0 left-0 size-[60px] pointer-events-none select-none opacity-10 bg-white mask-contain mask-no-repeat mask-center shrink-0 z-0"
            aria-hidden="true"
          />

          {/* Decorative Heart Watermark */}
          <span
            style={{
              maskImage: 'url("/icons/assets/lyflineHeart.svg")',
              WebkitMaskImage: 'url("/icons/assets/lyflineHeart.svg")',
            }}
            className="absolute bottom-0 right-0 size-[80px] pointer-events-none select-none bg-red-600 mask-contain mask-no-repeat mask-center shrink-0 z-0"
            aria-hidden="true"
          />

          {/* Logo Illustration */}
          <div className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2 w-[150px] h-[150px] pointer-events-none z-0">
            <Image
              src="/Illustration/LogoIllustration.png"
              alt="Lyfline Logo Illustration"
              fill
              className="object-contain"
            />
          </div>

          <h2 className="w-full max-w-[662px] justify-start text-white text-3xl font-medium font-poppins leading-tight z-10">
            Ready to start your international<br className="hidden sm:inline" /> health journey?
          </h2>

          <Button
            variant="outline-white"
            text="Book an Appointment"
            rightIcon="Right 1"
            className="z-10 cursor-pointer"
          />

        </motion.div>
      </div>
    </section>
  );
};
