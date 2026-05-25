import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LYFLINE | Build on Trust, Driven with Care - International Healthcare Facilitator",
  description: "LYFLINE is your trusted medical care facilitator, taking care of every step of your healthcare journey. From consultations, doctor matching, travel arrangements to recovery support across 7 countries with zero hidden fees.",
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
  },
  twitter: {
    card: "summary_large_image",
    title: "LYFLINE | Build on Trust, Driven with Care",
    description: "LYFLINE is your trusted medical care facilitator, taking care of every step of your healthcare journey.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#FAFCFF] text-slate-800">
        {children}
      </body>
    </html>
  );
}
