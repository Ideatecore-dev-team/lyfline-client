"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  // Generate page numbers
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-16 lg:px-24 xl:px-36 py-8">
      <div className="flex items-center justify-between w-full h-12">
        {/* Previous Button */}
        <button
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center gap-2 border-2 border-primary text-primary hover:bg-primary/5 disabled:opacity-40 disabled:pointer-events-none px-6 h-12 rounded-full font-bold text-xs tracking-wider transition-all active:scale-95 cursor-pointer"
          title="Previous Page"
        >
          <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
          <span>Previous</span>
        </button>

        {/* Page numbers container */}
        <div className="flex items-center gap-4">
          {pages.map((page) => {
            const isActive = currentPage === page;
            return (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={cn(
                  "w-10 h-10 flex items-center justify-center text-xs font-bold rounded-xl transition-all cursor-pointer focus:outline-none",
                  isActive 
                    ? "bg-primary text-white shadow-sm" 
                    : "text-primary hover:bg-primary/5"
                )}
              >
                {page}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white disabled:opacity-40 disabled:pointer-events-none px-7 h-12 rounded-full font-bold text-xs tracking-wider transition-all active:scale-95 cursor-pointer"
          title="Next Page"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};
