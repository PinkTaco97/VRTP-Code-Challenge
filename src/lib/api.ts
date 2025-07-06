// Constants
import { API_BASE_URL, DEFAULT_PER_PAGE } from "@/constants";

export const fetchBreweries = async (page = 1, name = "", city = "") => {
  const res = await fetch(
    `${API_BASE_URL}?page=${page}&per_page=${DEFAULT_PER_PAGE}&by_name=${name}&by_city=${city}`
  );
  return res.json();
};
