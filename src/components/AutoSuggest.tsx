"use client";

import { useState, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useRouter } from "next/navigation";

export default function AutoSuggest() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debouncedQuery = useDebounce(query, 500);
  const router = useRouter();

  useEffect(() => {
    if (debouncedQuery.length > 2) {
      fetch(
        `https://api.openbrewerydb.org/v1/breweries/search?query=${debouncedQuery}&per_page=3`
      )
        .then((res) => res.json())
        .then((data) => setSuggestions(data));
    } else {
      setSuggestions([]);
    }
  }, [debouncedQuery]);

  return (
    <div className="mb-4 relative">
      <input
        className={`w-full bg-white border border-white text-black text-sm  p-3 focus:border-blue-500 ${
          suggestions.length > 0 && !!showSuggestions
            ? "rounded-t-xl"
            : "rounded-xl"
        }`}
        type="text"
        placeholder="Search breweries..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 1000)} // Delay to allow click on suggestion
      />
      {suggestions.length > 0 && !!showSuggestions && (
        <ul className="absolute w-full z-10 max-h-60 overflow-auto">
          {suggestions.map((brewery, i) => (
            <li
              key={brewery.id}
              className={`p-2 bg-white text-left text-black hover:bg-gray-100 cursor-pointer ${
                i === suggestions.length - 1 ? "rounded-b-xl" : ""
              }`}
              onClick={() => router.push(`/brewery/${brewery.id}`)}
            >
              {brewery.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
