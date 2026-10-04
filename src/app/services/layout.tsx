import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services",
  description: "Discover our comprehensive healthcare services, from medical appointments to travel arrangements.",
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
