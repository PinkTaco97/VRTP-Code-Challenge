"use client";

// React
import { useState } from "react";

// Next
import { useRouter } from "next/navigation";

// Constants
import { API_BASE_URL } from "@/constants";

// Components
import AutoSuggest, { AutoSuggestProps } from "@/components/AutoSuggest";

// Hooks
import { useDebounce, useFetch } from "@/hooks";

// Types
import { Brewery } from "@/types";

export default function AutoSuggestBrewery() {
  // State variables
  const [query, setQuery] = useState(""); // Search query
  const debouncedQuery = useDebounce(query, 500); // Debounced search query
  const [showSuggestions, setShowSuggestions] = useState(false); // Flag to control suggestion visibility
  const router = useRouter(); // Next.js router for navigation

  // Fetch suggestions based on the debounced query
  const { data: breweries = [], isLoading } = useFetch<Brewery[]>(
    `${API_BASE_URL}/search?query=${debouncedQuery}&per_page=3`,
    debouncedQuery.length > 2,
    [debouncedQuery]
  );

  // Map breweries to suggestions format
  const suggestions =
    breweries?.map((brewery) => ({
      id: brewery.id,
      label: brewery.name,
    })) || [];

  return (
    <AutoSuggest
      value={query}
      onChange={setQuery}
      suggestions={suggestions}
      isLoading={isLoading}
      showSuggestions={showSuggestions}
      onFocus={() => setShowSuggestions(true)}
      onBlur={() => setShowSuggestions(false)}
      onSelect={(item) => router.push(`/brewery/${item.id}`)}
      placeholder="Find your next Brewery..."
    />
  );
}
