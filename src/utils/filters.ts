// Dispatch function to update brewery filters
export function dispatchBreweryFilters(name: string, city: string) {
  window.dispatchEvent(
    new CustomEvent("filtersUpdated", { detail: { name, city } })
  );
}
