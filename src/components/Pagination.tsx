"use client";

import React, { useMemo } from "react";
import Button from "./Button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  lang?: "en" | "id";
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  lang = "id",
  className = "",
}) => {
  const pageNumbers = useMemo(() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    }

    if (currentPage >= totalPages - 3) {
      return [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
  }, [currentPage, totalPages]);

  if (totalPages <= 1) return null;

  const prevText = lang === "en" ? "Previous" : "Sebelumnya";
  const nextText = lang === "en" ? "Next" : "Berikutnya";

  return (
    <div className={`self-stretch grid grid-cols-2 sm:flex sm:justify-between items-center gap-6 sm:gap-0 mt-6 w-full ${className}`}>
      {/* Previous Button */}
      <Button
        variant="outline-primary"
        text={prevText}
        leftIcon="Left 1"
        className="w-full sm:w-36 h-12 px-4 py-3 font-poppins text-base font-semibold order-2 sm:order-1 justify-self-start"
        disabled={currentPage === 1}
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
      />

      {/* Page numbers */}
      <div className="col-span-2 order-1 sm:order-2 justify-self-center flex justify-center items-center gap-2 sm:gap-3">
        {pageNumbers.map((page, idx) => {
          if (page === "...") {
            return (
              <span
                key={`ellipsis-${idx}`}
                className="size-8 flex items-center justify-center text-slate-400 font-semibold font-poppins text-base select-none"
              >
                ...
              </span>
            );
          }

          const isCurrent = currentPage === page;
          return (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              className={`size-8 rounded-lg flex items-center justify-center text-base font-semibold font-poppins transition-all cursor-pointer ${
                isCurrent
                  ? "bg-linear-to-r from-primary to-primary-hover text-white outline -outline-offset-1 outline-slate-500 shadow-xs"
                  : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <Button
        variant="primary"
        text={nextText}
        rightIcon="Right 1"
        className="w-full sm:w-36 h-12 px-4 py-3 font-poppins text-base font-semibold order-3 sm:order-3 justify-self-end"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
      />
    </div>
  );
};

export default Pagination;
