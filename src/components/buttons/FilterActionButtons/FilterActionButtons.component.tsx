export default function FilterActionButtons({
  hasFilters,
}: {
  hasFilters: boolean;
}) {
  return (
    <div className="sm:w-auto w-full flex flex-row gap-4">
      <button
        type="submit"
        className={`sm:w-auto ${
          hasFilters ? "w-1/2" : "w-full"
        } bg-blue-600 text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-blue-700 transition-colors`}
        aria-label="Apply Filters"
      >
        <span className="sr-only">Apply Filters</span>
        Go
      </button>
      {hasFilters && (
        <button
          type="reset"
          className="sm:w-auto w-1/2 bg-red-600 text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-red-700 transition-colors"
          aria-label="Reset Filters"
        >
          <span className="sr-only">Reset Filters</span>
          Clear
        </button>
      )}
    </div>
  );
}
