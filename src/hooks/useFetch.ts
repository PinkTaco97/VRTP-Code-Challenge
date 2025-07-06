import { useEffect, useState } from "react";

export function useFetch<T>(
  url: string,
  condition: boolean,
  dependencies: any[] = []
): { data: T | null; loading: boolean } {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!url || !condition) return;
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, [url, condition, ...dependencies]);

  return { data, loading };
}
