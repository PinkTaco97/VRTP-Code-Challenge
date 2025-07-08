"use client";

// React
import { useState, useEffect, useMemo } from "react";

// Next
import Link from "next/link";

// Constants
import { API_BASE_URL, DEFAULT_PER_PAGE } from "@/constants";

// Components
import { Pagination, BreweryFilters } from "@/components";

// Hooks
import { useFetch } from "@/hooks";

// Types
import { Brewery } from "@/types";

export default function BreweryTable() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({ name: "", city: "" });

  // Listen for custom filter updates
  useEffect(() => {
    const handler = (e: any) => {
      setFilters(e.detail);
      setPage(1);
    };
    window.addEventListener("filtersUpdated", handler);
    return () => window.removeEventListener("filtersUpdated", handler);
  }, []);

  // Build URL for useFetch
  const url = useMemo(() => {
    const u = new URL(API_BASE_URL);
    u.searchParams.set("per_page", DEFAULT_PER_PAGE.toString());
    u.searchParams.set("page", page.toString());
    if (filters.name) u.searchParams.set("by_name", filters.name);
    if (filters.city) u.searchParams.set("by_city", filters.city);
    return u.toString();
  }, [page, filters]);

  const { data: breweries, isLoading } = useFetch<Brewery[]>(url, !!url, [
    page,
    filters.name,
    filters.city,
  ]);

  const hasNextPage = (breweries?.length ?? 0) === DEFAULT_PER_PAGE;
  const totalPages = hasNextPage ? page + 1 : page;

  return (
    <main className="w-full max-w-7xl mx-auto px-5 relative">
      <BreweryFilters />
      <div
        className={`
          absolute left-1/2 top-25 -translate-x-1/2
          transition-all duration-500 ease-in-out transform
          ${isLoading ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
      >
        <img
          src="loading.svg"
          className="animate-spin duration-1 h-25 w-25 rounded-full text-blue-500"
          alt="Loading"
        />
      </div>
      <div
        className={`
          transition-all duration-500 ease-in-out transform
          ${isLoading ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
      >
        <div className="overflow-hidden rounded-xl bg-white shadow-sm">
          <table className="w-full table-auto border-separate border-spacing-0 bg-white shadow-sm text-black overflow-hidden rounded-xl">
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
                  <tr
                    key={brewery.id}
                    className={`
                  transition-all duration-300 opacity-0 animate-fade-in
                  ${i % 2 === 0 ? "bg-white" : "bg-gray-100"} ${
                      i === breweries.length - 1
                        ? "border-b-0 rounded-b-xl bg-blue-600"
                        : "border-b border-gray-200"
                    }`}
                  >
                    <td className="p-2 text-blue-600 underline text-center">
                      <Link href={`/brewery/${brewery.id}`}>
                        {brewery.name}
                      </Link>
                    </td>
                    <td className="p-2 text-center">{brewery.brewery_type}</td>
                    <td className="p-2 text-center">{brewery.city}</td>
                    <td className="p-2 text-center">{brewery.country}</td>
                    <td className="p-2 text-center">
                      {brewery.phone || "N/A"}
                    </td>
                    <td className="p-2 text-center">
                      {brewery.website_url && (
                        <a
                          href={brewery.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          Visit
                        </a>
                      )}
                    </td>
                  </tr>
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
