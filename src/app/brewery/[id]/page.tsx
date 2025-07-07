"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import useFetch from "@/hooks/useFetch";
import { API_BASE_URL, GOOGLE_MAPS_BASE_URL } from "@/constants";

export type Brewery = {
  id: string;
  name: string;
  website_url: string;
  street: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  latitude: string;
  longitude: string;
};

export default function BreweryDetails() {
  const { id } = useParams();
  const { data: brewery, isLoading } = useFetch<Brewery>(
    `${API_BASE_URL}/${id}`,
    Boolean(id),
    [id]
  );

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">Loading brewery details...</p>
      </div>
    );

  if (!brewery)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center">
          <p className="text-red-500">Brewery not found.</p>
          <Link
            href="/"
            className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-blue-700 transition-colors mb-6"
          >
            Back
          </Link>
        </div>
      </div>
    );

  return (
    <main
      className="min-h-screen bg-gray-50 py-8 px-4 md:px-8 lg:px-16 bg-cover bg-center "
      style={{ backgroundImage: "url('/bg-70.jpg')" }}
    >
      <div className="max-w-4xl mx-auto  rounded-2xl shadow-lg overflow-hidden">
        <Link
          href="/"
          className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-blue-700 transition-colors mb-6"
        >
          Back
        </Link>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 p-6 space-y-4">
            <h1 className="text-3xl font-bold text-gray-800">{brewery.name}</h1>
            <div className="text-gray-600">
              <p>{brewery.street}</p>
              <p>
                {brewery.city}, {brewery.state} {brewery.postal_code}
              </p>
              <p>{brewery.country}</p>
            </div>
            {brewery.website_url && (
              <a
                href={brewery.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-blue-600 hover:text-blue-800 font-medium"
              >
                Visit Official Website →
              </a>
            )}
          </div>
          <div className="md:w-1/2 h-64 md:h-auto">
            <iframe
              className="w-full h-full"
              src={`${GOOGLE_MAPS_BASE_URL}?q=${brewery.latitude},${brewery.longitude}&z=15&output=embed`}
              allowFullScreen
              loading="lazy"
              title="Brewery location"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
