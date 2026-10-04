import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about LYFLINE, your trusted medical facilitator providing comprehensive healthcare journeys.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
