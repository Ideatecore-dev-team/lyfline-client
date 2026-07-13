"use client";

import React from "react";
import { motion } from "framer-motion";
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
    name: "Patient A",
    role: "",
    quote: "Hi drishti. My mother already finished surgery and going back to jakarta tomorrow. Thanks so much for your help ya 👍👍👍\n\nGreat service. I will recommend you to many friends"
  },
  {
    id: "2",
    name: "Patient B",
    role: "",
    quote: "Drish, I just got done. The nurse was very good - everything was so seamless. No pain at all when inserting the needle ☺️ I feel better than before too. Thank you so so much once again"
  },
  {
    id: "3",
    name: "Patient C",
    role: "",
    quote: "Hi Drishti, we got home a while back.\n\nOnce again, thanks a lot for all the help that you extended to us🙏🙏. It means a lot and I deeply appreciate it. Take care.😊"
  }
];

export const TestimonialsSection: React.FC = () => {
  const { lang } = useLanguage();

  // Sextuple duplicate for seamless infinite marquee loop on wider viewports without gaps on the right
  const repeatedTestimonials = [
    ...LOCAL_TESTIMONIALS,
    ...LOCAL_TESTIMONIALS,
    ...LOCAL_TESTIMONIALS,
    ...LOCAL_TESTIMONIALS,
    ...LOCAL_TESTIMONIALS,
    ...LOCAL_TESTIMONIALS,
  ];

  return (
    <section className="w-full py-16 bg-linear-to-b from-[#E23737] to-accent text-white relative overflow-hidden flex flex-col justify-start items-center gap-0">

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
      <motion.div
        className="w-full max-w-[1152px] px-6 xl:px-0 flex flex-col justify-start items-start gap-1 z-10"
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        viewport={{ once: true, margin: "-60px" }}
      >
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
      </motion.div>

      {/* Infinite scrolling ticker wrapper */}
      <div className="w-full overflow-hidden pt-6 pb-10 relative z-10 flex justify-center items-center">
        {/* Inject infinite marquee keyframes inline */}
        <style>{`
          @keyframes marqueeLeftToRight {
            0% {
              transform: translateX(-16.6667%);
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
          {repeatedTestimonials.map((testimonial, idx) => (
            <TestimonialCard
              key={`${testimonial.id}-${idx}`}
              quote={testimonial.quote}
              name={testimonial.name}
            />
          ))}
        </div>
      </div>

    </section>
  );
};

