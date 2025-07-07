"use client";

// React
import React, { KeyboardEvent } from "react";

// Types
import { PaginationProps } from "./Pagination.types";

/**
 * Pagination component that displays all page numbers and supports keyboard navigation.
 */
export default function Pagination({
  page,
  totalPages,
  onPageChange,
  maxPageButtons = 5, // Optional prop to limit the number of page buttons shown
}: PaginationProps) {
  // Handle keyboard navigation: Left/Right arrows to navigate pages
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case "ArrowLeft":
        if (page > 1) onPageChange(page - 1);
        break;
      case "ArrowRight":
        if (page < totalPages) onPageChange(page + 1);
        break;
      case "Home":
        onPageChange(1);
        break;
      case "End":
        onPageChange(totalPages);
        break;
      default:
        break;
    }
  };

  // Compute visible page range based on maxPageButtons
  const pageButtons = React.useMemo(() => {
    const buttons: number[] = [];
    const maxButtons =
      maxPageButtons && maxPageButtons > 0 ? maxPageButtons : totalPages;
    if (maxButtons >= totalPages) {
      for (let i = 1; i <= totalPages; i++) buttons.push(i);
    } else {
      const half = Math.floor(maxButtons / 2);
      let start = page - half;
      let end = page + half;

      if (start < 1) {
        start = 1;
        end = maxButtons;
      }
      if (end > totalPages) {
        end = totalPages;
        start = totalPages - maxButtons + 1;
      }
      for (let i = start; i <= end; i++) buttons.push(i);
    }
    return buttons;
  }, [page, totalPages, maxPageButtons]);

  return (
    <div
      className="mt-4 flex flex-wrap gap-2 justify-center items-center"
      role="navigation"
      aria-label="Pagination"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <button
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="bg-blue-600 text-white px-3 py-1 rounded cursor-pointer hover:bg-blue-700 disabled:opacity-50"
      >
        Prev
      </button>

      {/* Render sliding window of page buttons */}
      {pageButtons.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          aria-current={p === page ? "page" : undefined}
          className={`px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-150 cursor-pointer ${
            p === page
              ? "bg-blue-600 text-white"
              : "bg-white text-black hover:bg-gray-100"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
      >
        Next
      </button>
    </div>
  );
}
