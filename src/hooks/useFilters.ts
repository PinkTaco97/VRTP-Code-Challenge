// React
import { useState, useEffect } from "react";

// Custom hook to manage filters
export default function useFilters() {
  const [filters, setFilters] = useState({ name: "", city: "" });

  useEffect(() => {
    const handler = (e: any) => {
      setFilters(e.detail);
    };
    window.addEventListener("filtersUpdated", handler);
    return () => window.removeEventListener("filtersUpdated", handler);
  }, []);

  return filters;
}
