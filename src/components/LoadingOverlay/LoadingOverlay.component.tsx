export default function LoadingOverlay({ isLoading }: { isLoading: boolean }) {
  return (
    <div
      className={`
        absolute left-1/2 top-25 -translate-x-1/2
        transform transition-all duration-500 ease-in-out
        ${isLoading ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
    >
      <img
        src="loading.svg"
        className="animate-spin h-25 w-25 rounded-full"
        alt="Loading"
      />
    </div>
  );
}
