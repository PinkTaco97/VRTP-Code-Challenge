"use client";

// React
import React, { useState, useCallback } from "react";

// Utilities
import { dispatchBreweryFilters } from "@/utils/filters";

export default function BreweryFilters() {
  // Local state for filters
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const hasFilters = Boolean(name || city);

  // Apply filters
  const applyFilters = useCallback(() => {
    dispatchBreweryFilters(name, city);
  }, [name, city]);

  // Clear filters
  const clearFilters = useCallback(() => {
    setName("");
    setCity("");
    dispatchBreweryFilters("", "");
  }, []);

  // Handle form submission
  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      applyFilters();
    },
    [applyFilters]
  );

  // Handle form reset
  const onReset = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      clearFilters();
    },
    [clearFilters]
  );

  // Handle keydown events for accessibility
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      // map each key to [whenHasFilters, whenNoFilters]
      const actionMap: Record<string, [() => void, () => void]> = {
        Enter: [applyFilters, () => setIsOpen(true)],
        Escape: [clearFilters, () => setIsOpen(false)],
      };

      // Get the action pair for the pressed key
      const pair = actionMap[e.key];
      if (!pair) return;

      // Execute the appropriate action based on whether filters are applied
      e.preventDefault();
      const [withFilters, withoutFilters] = pair;
      (hasFilters ? withFilters : withoutFilters)();
    },
    [hasFilters, applyFilters, clearFilters]
  );

  return (
    <div
      className={`sm:h-full relative w-full flex sm:justify-end justify-center
        ${isOpen ? "sm:mb-7 mb-50" : "mb-3"}`}
    >
      {/* Filter Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        className="w-full
           mt-5 bg-slate-900 text-white p-3 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer
          sm:w-auto sm:mr-4"
      >
        <img
          src="filter-solid.svg"
          className="h-5 w-5 justify-self-center"
          alt="Filter"
        />
      </button>

      <div
        className={`
          sm:w-auto w-full
          absolute top-0 right-0 transform transition-all duration-300 ease-in-out
          ${isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}
          `}
      >
        <div className="flex flex-wrap gap-4 bg-slate-900 py-4 px-4 rounded-xl shadow-lg md:w-full">
          <form
            onSubmit={onSubmit}
            onReset={onReset}
            className="flex flex-wrap gap-4"
          >
            {/* Small screen close */}
            <button
              onClick={() => setIsOpen(false)}
              className="sm:hidden flex sm:w-auto w-full bg-slate-800 text-white p-3 rounded-xl hover:bg-slate-700 transition-colors cursor-pointer justify-center"
            >
              <img src="xmark-solid.svg" className="h-5 w-5" alt="Close" />
            </button>
            <input
              className="p-2 border rounded-xl w-full sm:w-auto"
              placeholder="Filter by name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <input
              className="p-2 border rounded-xl w-full sm:w-auto"
              placeholder="Filter by city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div className="sm:w-auto w-full flex flex-row gap-4">
              <button
                onClick={applyFilters}
                className={`sm:w-auto ${
                  hasFilters ? "w-1/2" : "w-full"
                } bg-blue-600 text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-blue-700 transition-colors`}
              >
                Go
              </button>
              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="sm:w-auto w-1/2 bg-red-600 text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-red-700 transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </form>

          {/* Large screen close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="sm:flex hidden sm:w-auto w-full bg-slate-800 text-white p-3 rounded-xl hover:bg-slate-700 transition-colors cursor-pointer justify-center"
          >
            <img src="xmark-solid.svg" className="h-5 w-5" alt="Close" />
          </button>
        </div>
      </div>
    </div>
  );
}
