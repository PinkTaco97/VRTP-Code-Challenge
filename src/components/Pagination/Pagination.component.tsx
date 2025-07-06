"use client";

import { PaginationProps } from "./Pagination.types";

export default function Pagination({
  page,
  onPageChange,
  totalPages,
}: PaginationProps) {
  const visiblePages = getVisiblePages(page, totalPages);

  return (
    <div className="mt-4 flex flex-wrap gap-2 justify-center items-center">
      <button
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="bg-white text-black px-4 py-2 rounded-xl hover:bg-blue-600 hover:text-white transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Prev
      </button>

      {visiblePages.map((p, i) =>
        p === "..." ? (
          <div
            key={`ellipsis-${i}`}
            className={`px-4 py-2 rounded-xl bg-white text-black hover:bg-gray-100 transition-colors cursor-pointer`}
          >
            ...
          </div>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={` px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors cursor-pointer ${
              p === page
                ? "bg-blue-600 text-white"
                : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="bg-white text-black px-4 py-2 rounded-xl hover:bg-blue-600 hover:text-white transition-colors cursor-pointer  disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
}

// Helper to control visible page numbers
function getVisiblePages(current: number, total: number): (number | "...")[] {
  const delta = 2;
  const range: (number | "...")[] = [];

  const left = Math.max(2, current - delta);
  const right = Math.min(total - 1, current + delta);

  if (left > 2) range.push(1, "...");
  else range.push(1);

  for (let i = left; i <= right; i++) {
    range.push(i);
  }

  if (right < total - 1) range.push("...", total);
  else if (right < total) range.push(total);

  return range;
}
