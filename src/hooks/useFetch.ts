// React
import { useEffect, useState } from "react";

// Custom hook to fetch data from an API
export default function useFetch<T>(
  url: string,
  condition: boolean,
  dependencies: any[] = []
): { data: T | null; isLoading: boolean } {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!url || !condition) return;
    setIsLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then(setData)
      .finally(() => setIsLoading(false))
      .catch((error) => {
        console.error("Error fetching data:", error);
        setData(null);
        setIsLoading(false);
      });
  }, [url, condition, ...dependencies]);

  return { data, isLoading };
}
