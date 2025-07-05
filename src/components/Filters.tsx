"use client";

import { useState } from "react";

export default function Filters() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");

  const applyFilters = () => {
    const event = new CustomEvent("filtersUpdated", {
      detail: { name, city },
    });
    window.dispatchEvent(event);
  };

  // Reset filters
  const resetFilters = () => {
    setName("");
    setCity("");
    applyFilters();
  };

  return (
    <div className="flex flex-wrap gap-4 mb-4">
      <input
        className="p-2 border rounded-xl w-full sm:w-auto"
        placeholder="Filter by name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="p-2 border rounded-xl w-full sm:w-auto"
        placeholder="Filter by city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button
        onClick={applyFilters}
        className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors cursor-pointer"
      >
        Go
      </button>
      {(name.length > 0 || city.length > 0) && (
        <button
          onClick={resetFilters}
          className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 transition-colors cursor-pointer"
        >
          Reset
        </button>
      )}
    </div>
  );
}
