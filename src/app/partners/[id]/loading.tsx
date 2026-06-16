import React from "react";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <NavBar />
      <main className="grow pt-[80px] w-full flex flex-col justify-start items-center">
        {/* Premium Shimmer Loading Screen */}
        <div className="w-full max-w-[1440px] px-6 md:px-16 lg:px-24 xl:px-36 py-16 bg-white flex flex-col justify-start items-start gap-8 animate-pulse">
          <div className="h-10 bg-slate-200 rounded-lg w-1/4 mb-4" />
          <div className="w-full flex flex-col lg:flex-row gap-12 lg:gap-16">
            <div className="w-full lg:w-[490px] h-72 bg-slate-200 rounded-3xl" />
            <div className="flex-1 flex flex-col gap-6">
              <div className="h-6 bg-slate-200 rounded w-1/3" />
              <div className="h-10 bg-slate-200 rounded w-3/4" />
              <div className="h-20 bg-slate-200 rounded w-full" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
