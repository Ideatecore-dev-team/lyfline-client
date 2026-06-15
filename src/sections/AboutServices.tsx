"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/Button";
import { NoiseTexture } from "@/components/magicui/NoiseTexture";

export const AboutServices: React.FC = () => {
  return (
    <section className="w-full flex justify-center items-center pt-16 bg-white z-10 relative overflow-hidden">
      {/* Decorative Section Watermark */}
      <span
        style={{
          maskImage: 'url("/icons/assets/lyflineQuarterCircle.svg")',
          WebkitMaskImage: 'url("/icons/assets/lyflineQuarterCircle.svg")',
        }}
        className="absolute top-0 left-0 size-[100px] pointer-events-none select-none opacity-10 bg-red-600/50 mask-contain mask-no-repeat mask-center shrink-0 z-0"
        aria-hidden="true"
      />
      <div className="w-full max-w-[1440px] px-6 md:px-16 lg:px-24 xl:px-36 inline-flex flex-col justify-start items-center">

        {/* Section Heading Subtitle */}
        <span className="text-sm text-[#95B0D7] tracking-widest uppercase block text-left font-poppins w-full max-w-[1152px] mx-auto mb-3">
          OUR SERVICES
        </span>

        {/* Banner container styled exactly like CtaSection */}
        <motion.div
          className="w-full max-w-[1152px] p-6 md:p-6 bg-gradient-to-r from-[#3F71B7] to-[#3365AC] rounded-[32px] flex flex-col justify-start items-start gap-6 overflow-hidden relative shadow-lg"
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
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

          {/* Services Illustration */}
          <div className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2 w-[192px] h-[144px] pointer-events-none z-0">
            <Image
              src="/Illustration/ServicesIllustration.png"
              alt="Services Illustration"
              fill
              className="object-contain"
            />
          </div>

          {/* Header Text */}
          <h2 className="w-full max-w-[662px] justify-start text-white text-3xl font-medium font-poppins leading-tight z-10">
            We Serve You Seamless End-to-End Healthcare Support
          </h2>

          {/* CTA Button */}
          <Link href="/services" className="z-10">
            <Button
              variant="outline-white"
              text="View Our Service"
              rightIcon="Right 1"
              className="cursor-pointer"
            />
          </Link>

        </motion.div>
      </div>
    </section>
  );
};

