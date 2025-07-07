"use client";

import { useState } from "react";

export default function Filters() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [show, setShow] = useState(false);

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
    <div
      className={`sm:h-full relative w-full  flex sm:justify-end justify-center
        ${show ? "sm:mb-7 mb-50" : "mb-3"}`}
    >
      <button
        type="button"
        onClick={() => setShow(true)}
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
          />
          <input
            className="p-2 border rounded-xl w-full sm:w-auto"
            placeholder="Filter by city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            onClick={applyFilters}
            className="sm:w-auto w-full bg-blue-600 text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-blue-700 transition-colors"
          >
            Go
          </button>
          {(name || city) && (
            <button
              onClick={resetFilters}
              className="bg-red-600 text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-red-700 transition-colors"
            >
              Reset
            </button>
          )}
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
