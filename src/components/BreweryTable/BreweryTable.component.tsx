"use client";

// React
import { useState, useEffect, useMemo } from "react";

// Next
import Link from "next/link";

// Constants
import { API_BASE_URL, DEFAULT_PER_PAGE } from "@/constants";

// Components
import { Pagination } from "@/components";

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
    <div
      className={`px-5 transition-all duration-500 ease-in-out transform ${
        isLoading ? "opacity-0 scale-95" : "opacity-100 scale-100"
      }`}
    >
      <table className="w-full table-auto border-collapse bg-white shadow-sm text-black rounded-xl">
        <thead className="transition-all duration-300 z-10">
          <tr className="bg-slate-900 text-white sticky top-0">
            <th className="p-3 text-left rounded-tl-xl">Name</th>
            <th className="p-3 text-left">Type</th>
            <th className="p-3 text-left">City</th>
            <th className="p-3 text-left">Country</th>
            <th className="p-3 text-left">Phone</th>
            <th className="p-3 text-left rounded-tr-xl">Website</th>
          </tr>
        </thead>
        <tbody className="transition-all duration-300">
          {isLoading ? (
            // <tr className="animate-pulse">
            //   <td colSpan={6} className="p-4 text-center text-gray-400">
            //     Loading row...
            //   </td>
            // </tr>
            Array.from({ length: DEFAULT_PER_PAGE }).map((_, i) => (
              <tr key={`loading-${i}`} className="animate-pulse">
                <td colSpan={6} className="p-2 text-center text-gray-400">
                  Loading row...
                </td>
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
                <td
                  className={`p-2 text-blue-600 underline ${
                    i === breweries.length - 1 ? "rounded-b-xl" : ""
                  }`}
                >
                  <Link href={`/brewery/${brewery.id}`}>{brewery.name}</Link>
                </td>
                <td className="p-2">{brewery.brewery_type}</td>
                <td className="p-2">{brewery.city}</td>
                <td className="p-2">{brewery.country}</td>
                <td className="p-2">{brewery.phone || "N/A"}</td>
                <td
                  className={`p-2 text-center ${
                    i === breweries.length - 1 ? "rounded-b-xl" : ""
                  }`}
                >
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
      </table>

      <Pagination
        page={page}
        onPageChange={(newPage) => setPage(newPage)}
        totalPages={totalPages}
      />

      {/* <div className="mt-4 flex gap-2 justify-center items-center">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Prev
        </button>
        <span className="text-white px-4 py-2">Page {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Next
        </button>
      </div> */}
    </div>
  );
}
