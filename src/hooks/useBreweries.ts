// React
import { useMemo } from "react";

// Constants
import { API_BASE_URL, DEFAULT_PER_PAGE } from "@/constants";

// Hooks
import { useFetch } from "@/hooks";

// Types
import { Brewery } from "@/types";

export default function useBreweries(
  page: number,
  filters: { name: string; city: string }
) {
  const url = useMemo(() => {
    const params = new URLSearchParams({
      per_page: DEFAULT_PER_PAGE.toString(),
      page: page.toString(),
      ...(filters.name && { by_name: filters.name }),
      ...(filters.city && { by_city: filters.city }),
    });
    return `${API_BASE_URL}?${params}`;
  }, [page, filters]);

  const { data: breweries = [], isLoading } = useFetch<Brewery[]>(
    url,
    Boolean(url),
    [page, filters.name, filters.city]
  );

  const hasNextPage = breweries?.length === DEFAULT_PER_PAGE;
  const totalPages = hasNextPage ? page + 1 : page;

  return { breweries, isLoading, totalPages };
}
