"use client";

import React from "react";
import { TestimonialCard } from "@/components/card/TestimonialCard";
import { useLanguage } from "@/context/LanguageContext";
import { NoiseTexture } from "@/components/magicui/NoiseTexture";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
}

const LOCAL_TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "User A",
    role: "Manager at PT ABCD",
    quote: "I have used LYFLINE many times, and I am truly satisfied with their service — fast responses, great pricing, and so much more.\n\nWe are very grateful to have LYFLINE as our support system.\n\nThank you so much!"
  },
  {
    id: "2",
    name: "User B",
    role: "Graphic Designer",
    quote: "The most efficient, reliable, fastest, and most responsive healthcare service in Jakarta!\n\nI will always trust LYFLINE to provide our medical needs and healthcare services."
  },
  {
    id: "3",
    name: "User C",
    role: "Traveler",
    quote: "Thank you will never be enough to express how grateful we are for the support, care, and assistance provided by LYFLINE in our home. Their attention to detail is something we truly value.\n\nThey were truly our lifesavers."
  },
  {
    id: "4",
    name: "User D",
    role: "Traveler",
    quote: "We truly appreciated the outstanding service we received during our family’s COVID situation. Thank you for being punctual, making everything easy and hassle-free for us, and always doing your best despite how busy things were every day.\n\nThank you once again, and we wish all the best for your entire team!"
  },
  {
    id: "5",
    name: "User E",
    role: "Entrepreneur",
    quote: "LYFLINE has been our partner in navigating international healthcare. Their team is extremely professional and made every step of the journey smooth and worry-free.\n\nHighly recommended!"
  }
];

export const TestimonialsSection: React.FC = () => {
  const { lang } = useLanguage();

  // Triple duplicate for seamless infinite marquee loop on wider viewports
  const tripleTestimonials = [...LOCAL_TESTIMONIALS, ...LOCAL_TESTIMONIALS, ...LOCAL_TESTIMONIALS];

  return (
    <section className="w-full py-16 bg-gradient-to-b from-[#E23737] to-[#E02828] text-white relative overflow-hidden flex flex-col justify-start items-center gap-0">

      {/* Noise Texture Background */}
      <NoiseTexture noiseOpacity={0.2} />

      {/* Decorative Brand Watermarks */}
      <span
        style={{
          maskImage: 'url("/icons/assets/lyflineQuarterCircle.svg")',
          WebkitMaskImage: 'url("/icons/assets/lyflineQuarterCircle.svg")',
        }}
        className="absolute top-0 left-0 size-[120px] pointer-events-none select-none bg-[#F33C3C] mask-contain mask-no-repeat mask-center shrink-0 z-0"
        aria-hidden="true"
      />

      <span
        style={{
          maskImage: 'url("/icons/assets/lyflineHeart.svg")',
          WebkitMaskImage: 'url("/icons/assets/lyflineHeart.svg")',
        }}
        className="absolute bottom-0 right-0 size-[150px] pointer-events-none select-none bg-[#F33C3C] mask-contain mask-no-repeat mask-center shrink-0 z-0"
        aria-hidden="true"
      />

      {/* Header Container */}
      <div className="w-full max-w-[1152px] px-6 xl:px-0 flex flex-col justify-start items-start gap-1 z-10">
        <div className="flex flex-col justify-start items-start gap-1">
          <div className="self-stretch justify-start text-white/70 text-sm font-normal font-poppins uppercase tracking-wider">
            {lang === "en" ? "WHAT THEY SAY ABOUT US" : "APA YANG MEREKA KATAKAN TENTANG KAMI"}
          </div>
        </div>
        <div className="inline-flex justify-start items-center gap-3">
          <span
            style={{
              maskImage: 'url("/icons/assets/lyflineHeart.svg")',
              WebkitMaskImage: 'url("/icons/assets/lyflineHeart.svg")',
            }}
            className="size-6 bg-white mask-contain mask-no-repeat mask-center shrink-0"
            aria-hidden="true"
          />
          <h2 className="justify-start text-white text-3xl font-medium font-poppins">
            {lang === "en" ? "Impactful Stories" : "Cerita Berdampak"}
          </h2>
        </div>
      </div>

      {/* Infinite scrolling ticker wrapper */}
      <div className="w-full overflow-hidden pt-6 pb-10 relative z-10 flex justify-center items-center">
        {/* Inject infinite marquee keyframes inline */}
        <style>{`
          @keyframes marqueeLeftToRight {
            0% {
              transform: translateX(-33.3333%);
            }
            100% {
              transform: translateX(0%);
            }
          }
          .animate-marquee-ltr {
            animation: marqueeLeftToRight 50s linear infinite;
          }
          .animate-marquee-ltr:hover {
            animation-play-state: paused;
          }
        `}</style>

        {/* Ticker Track */}
        <div className="flex gap-6 w-max animate-marquee-ltr px-6">
          {tripleTestimonials.map((testimonial, idx) => (
            <TestimonialCard
              key={`${testimonial.id}-${idx}`}
              quote={testimonial.quote}
              name={testimonial.name}
              role={testimonial.role}
            />
          ))}
        </div>
      </div>

    </section>
  );
};

