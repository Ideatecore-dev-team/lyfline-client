import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Healthcare Articles & Insights",
  description: "Read the latest medical insights, health tips, and news from our healthcare experts.",
  alternates: {
    canonical: "/articles",
  },
};

export default function ArticlesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
