export default function CloseButton({
  onClick,
  largeOnly = false,
}: {
  onClick: () => void;
  largeOnly?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`bg-slate-800 text-white p-3 rounded-xl hover:bg-slate-700 transition hover:cursor-pointer justify-center
        ${largeOnly ? "sm:flex hidden" : "sm:hidden flex w-full"}`}
      aria-label="Close"
    >
      <span className="sr-only">Close</span>
      <img src="xmark-solid.svg" className="h-5 w-5" alt="Close" />
    </button>
  );
}
