"use client";

import React, { useState } from "react";

export default function Filters() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [show, setShow] = useState(false);
  const hasFilters = name || city;

  const applyFilters = (e: React.FormEvent) => {
    e.preventDefault();
    const event = new CustomEvent("filtersUpdated", {
      detail: { name, city },
    });
    window.dispatchEvent(event);
  };

  // Reset filters
  const clearFilters = (e: React.FormEvent) => {
    e.preventDefault();
    setName("");
    setCity("");
    const event = new CustomEvent("filtersUpdated", {
      detail: { name: "", city: "" },
    });
    window.dispatchEvent(event);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      hasFilters ? applyFilters(e) : setShow(true);
    } else if (e.key === "Escape") {
      e.preventDefault();
      hasFilters ? clearFilters(e) : setShow(false);
    }
  };

  return (
    <div
      className={`sm:h-full relative w-full flex sm:justify-end justify-center
        ${show ? "sm:mb-7 mb-50" : "mb-3"}`}
    >
      <button
        type="button"
        onClick={() => setShow(true)}
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
          ${show ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}
          `}
      >
        <div className="flex flex-wrap gap-4 bg-slate-900 py-4 px-4 rounded-xl shadow-lg md:w-full">
          <form onSubmit={onSubmit} className="flex flex-wrap gap-4">
            <button
              onClick={() => setShow(false)}
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
          <button
            onClick={() => setShow(false)}
            className="sm:flex hidden sm:w-auto w-full bg-slate-800 text-white p-3 rounded-xl hover:bg-slate-700 transition-colors cursor-pointer justify-center"
          >
            <img src="xmark-solid.svg" className="h-5 w-5" alt="Close" />
          </button>
        </div>
      </div>
    </div>
  );
}
