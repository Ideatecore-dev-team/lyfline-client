import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find a Doctor",
  description: "Search and match with top international medical specialists across our global hospital network.",
  alternates: {
    canonical: "/doctors",
  },
};

export default function DoctorsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
