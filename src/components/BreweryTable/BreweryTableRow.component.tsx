// Next.js
import Link from "next/link";

// Types
import { Brewery } from "@/types";

export default function BreweryTableRow({
  brewery,
  index,
}: {
  brewery: Brewery;
  index: number;
}) {
  const stripe = index % 2 === 0 ? "bg-white" : "bg-gray-100";

  return (
    <tr
      key={brewery.id}
      className={`transition-all duration-300 animate-fade-in border-b border-gray-200 ${stripe}`}
    >
      <td className="p-2 text-center text-blue-600 underline">
        <Link href={`/brewery/${brewery.id}`}>{brewery.name}</Link>
      </td>
      <td className="p-2 text-center">{brewery.brewery_type}</td>
      <td className="p-2 text-center">{brewery.city}</td>
      <td className="p-2 text-center">{brewery.country}</td>
      <td className="p-2 text-center">{brewery.phone || "N/A"}</td>
      <td className="p-2 text-center text-blue-600 underline">
        {brewery.website_url && (
          <a
            href={brewery.website_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit
          </a>
        )}
      </td>
    </tr>
  );
}
