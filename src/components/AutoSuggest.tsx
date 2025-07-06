"use client";

// React
import { useState, useEffect } from "react";

// Next
import { useRouter } from "next/navigation";

// Constants
import { API_BASE_URL } from "@/constants";

// Hooks
import { useDebounce } from "@/hooks/useDebounce";

export default function AutoSuggest() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 500);
  const router = useRouter();

  useEffect(() => {
    if (debouncedQuery.length > 2) {
      setIsLoading(true);
      fetch(`${API_BASE_URL}/search?query=${debouncedQuery}&per_page=3`)
        .then((res) => res.json())
        .then((data) => {
          setSuggestions(data);
          setTimeout(() => setIsLoading(false), 500);
        });
    } else {
      setSuggestions([]);
    }
  }, [debouncedQuery]);

  return (
    <div className="mb-4 relative">
      <div>
        <input
          className={`w-full bg-white border border-white text-black text-sm  p-3 focus:border-blue-500 ${
            suggestions.length > 0 && !!showSuggestions
              ? "rounded-t-xl"
              : "rounded-xl"
          }`}
          type="text"
          placeholder="Find your next Brewery..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // Delay to allow click on suggestion
        />
        {isLoading && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <img
              src="loading.svg"
              className="animate-spin duration-10 h-7 w-7 text-blue-500"
            />
          </div>
        )}
      </div>
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
