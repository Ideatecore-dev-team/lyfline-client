import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Partner Hospitals",
  description: "Explore our network of world-class partner hospitals across multiple countries.",
  alternates: {
    canonical: "/partners",
  },
};

export default function PartnersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
