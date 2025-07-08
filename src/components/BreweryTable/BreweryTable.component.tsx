"use client";

// React
import { useState } from "react";

// Constants
import { DEFAULT_PER_PAGE } from "@/constants";

// Components
import { Pagination, LoadingOverlay } from "@/components";

// Hooks
import { useFilters, useBreweries } from "@/hooks";

// Local Components
import BreweryTableRow from "./BreweryTableRow.component";
import BreweryTableFilters from "./BreweryTableFilters.component";

export default function BreweryTable() {
  const [page, setPage] = useState(1);
  const filters = useFilters();
  const { breweries, isLoading, totalPages } = useBreweries(page, filters);

  return (
    <main className="w-full max-w-5xl mx-auto px-5 relative">
      <BreweryTableFilters />
      <LoadingOverlay isLoading={isLoading} />

      <div
        className={`
          transition-all duration-500 ease-in-out transform z-20
          ${isLoading ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
      >
        <div className="overflow-y-hidden md-lg-xl:overflow-x-scroll rounded-xl bg-white shadow-sm">
          <table className="w-full table-auto border-separate border-spacing-0 bg-white shadow-sm text-black overflow-y-hidden overflow-x-scroll rounded-xl">
            <thead className="transition-all duration-300">
              <tr className="bg-slate-900 text-white sticky top-0 z-20">
                <th className="p-3 text-center">Name</th>
                <th className="p-3 text-center">Type</th>
                <th className="p-3 text-center">City</th>
                <th className="p-3 text-center">Country</th>
                <th className="p-3 text-center">Phone</th>
                <th className="p-3 text-center">Website</th>
              </tr>
            </thead>
            <tbody className="transition-all duration-300">
              {isLoading ? (
                Array.from({ length: DEFAULT_PER_PAGE }).map((_, i) => (
                  <tr key={`loading-${i}`} className="animate-pulse">
                    <td colSpan={6} className="p-5"></td>
                  </tr>
                ))
              ) : breweries?.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-4 text-center">
                    No breweries found.
                  </td>
                </tr>
              ) : (
                breweries?.map((brewery, i) => (
                  <BreweryTableRow
                    key={brewery.id}
                    brewery={brewery}
                    index={i}
                  />
                ))
              )}
            </tbody>
            <tfoot className="bg-slate-900 text-white">
              <tr>
                <td colSpan={6} className="p-3 text-center">
                  Showing page {page} of {totalPages}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <Pagination
          page={page}
          onPageChange={(newPage) => setPage(newPage)}
          totalPages={totalPages}
        />
      </div>
    </main>
  );
}
