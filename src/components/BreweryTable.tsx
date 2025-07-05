"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function BreweryTable() {
  const [breweries, setBreweries] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({ name: "", city: "" });

  useEffect(() => {
    const fetchData = () => {
      const url = new URL("https://api.openbrewerydb.org/v1/breweries");
      url.searchParams.set("per_page", "15");
      url.searchParams.set("page", page.toString());
      if (filters.name) url.searchParams.set("by_name", filters.name);
      if (filters.city) url.searchParams.set("by_city", filters.city);

      fetch(url.toString())
        .then((res) => res.json())
        .then((data) => setBreweries(data));
    };

    fetchData();
  }, [page, filters]);

  useEffect(() => {
    const handler = (e: any) => {
      setFilters(e.detail);
      setPage(1); // Reset to first page on filter
    };
    window.addEventListener("filtersUpdated", handler);
    return () => window.removeEventListener("filtersUpdated", handler);
  }, []);

  return (
    <div>
      <table className="w-full table-auto border-collapse bg-white rounded shadow-sm text-black">
        <thead>
          <tr className="bg-slate-900 p-2 text-left text-white p-2">
            <th className="p-3">Name</th>
            <th className="p-3">Type</th>
            <th className="p-3">City</th>
            <th className="p-3">Country</th>
            <th className="p-3">Phone</th>
            <th className="p-3">Website</th>
          </tr>
        </thead>
        <tbody>
          {breweries.map((b) => (
            <tr key={b.id} className="p-2 hover:bg-gray-100">
              <td className="p-2 text-blue-600 underline">
                <Link href={`/brewery/${b.id}`}>{b.name}</Link>
              </td>
              <td className="p-2">{b.brewery_type}</td>
              <td className="p-2">{b.city}</td>
              <td className="p-2">{b.country}</td>
              <td className="p-2">{b.phone || "N/A"}</td>
              <td className="p-2 text-center">
                {b.website_url && (
                  <a
                    href={b.website_url}
                    target="_blank"
                    className="text-blue-600 underline"
                  >
                    Visit
                  </a>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex gap-2 w-full justify-center align-items-center align-middle">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors cursor-pointer"
        >
          Prev
        </button>
        <span className="text-white px-4 py-2 ">Page {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
}
