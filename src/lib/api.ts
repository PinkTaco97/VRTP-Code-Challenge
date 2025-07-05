export const fetchBreweries = async (page = 1, name = "", city = "") => {
  const res = await fetch(
    `https://api.openbrewerydb.org/v1/breweries?page=${page}&per_page=15&by_name=${name}&by_city=${city}`
  );
  return res.json();
};
