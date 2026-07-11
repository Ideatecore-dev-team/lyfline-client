import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Poppins } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

import { supabase } from "@/lib/supabase";

export async function generateMetadata(): Promise<Metadata> {
  let promoImageUrl = "/logoBlack.png"; // Default fallback

  try {
    const { data, error } = await supabase
      .from("settings")
      .select("value")
      .eq("key", "promo_image_url")
      .single();
      
    if (!error && data?.value) {
      promoImageUrl = data.value;
    }
  } catch (err) {
    console.error("Error fetching promo image for metadata:", err);
  }

  return {
    metadataBase: new URL("https://lyfline.id"),
    title: "LYFLINE | Build on Trust, Driven with Care - International Healthcare Facilitator",
    description: "LYFLINE is your trusted medical care facilitator, taking care of every step of your healthcare journey. From consultations, doctor matching, travel arrangements to recovery support across 7 countries with zero hidden fees.",
    icons: {
      icon: "/logoIcon.png",
      shortcut: "/logoIcon.png",
      apple: "/logoIcon.png",
    },
    keywords: [
      "LYFLINE",
      "international healthcare",
      "medical facilitator",
      "hospital matching",
      "medical tourism",
      "healthcare journey",
      "medical appointment",
      "international doctors",
    ],
    authors: [{ name: "LYFLINE" }],
    openGraph: {
      title: "LYFLINE | Build on Trust, Driven with Care",
      description: "LYFLINE is your trusted medical care facilitator, taking care of every step of your healthcare journey.",
      url: "https://lyfline.id",
      siteName: "LYFLINE",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: promoImageUrl,
          width: 1200,
          height: 630,
          alt: "LYFLINE Promo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "LYFLINE | Build on Trust, Driven with Care",
      description: "LYFLINE is your trusted medical care facilitator, taking care of every step of your healthcare journey.",
      images: [promoImageUrl],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#FAFCFF] text-slate-800">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
