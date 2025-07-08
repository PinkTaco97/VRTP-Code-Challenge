export default function FilterButton({
  onClick,
  onKeyDown,
}: {
  onClick: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      onKeyDown={onKeyDown}
      className="w-full mt-5 bg-slate-900 text-white p-3 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer sm:w-auto sm:mr-4"
      aria-label="Open Filters"
    >
      <span className="sr-only">Open Filters</span>
      <img
        src="filter-solid.svg"
        className="h-5 w-5 justify-self-center"
        alt="Filter"
      />
    </button>
  );
}
