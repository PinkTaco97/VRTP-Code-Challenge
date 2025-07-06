"use client";

// React
import { useEffect, useState } from "react";

// Next
import Link from "next/link";
import { useParams } from "next/navigation";

// Constants
import { API_BASE_URL, GOOGLE_MAPS_BASE_URL } from "@/constants";

type Brewery = {
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
  const [brewery, setBrewery] = useState<Brewery | null>(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/${id}`)
      .then((res) => res.json())
      .then((data) => setBrewery(data));
  }, [id]);

  if (!brewery) return <div>Loading...</div>;

  return (
    <main
      className="snap-start w-screen h-screen flex items-center justify-center bg-cover bg-center rounded-lg shadow-lg content-center"
      style={{ backgroundImage: "url('/bg-70.jpg')" }}
    >
      <Link
        className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors cursor-pointer"
        href="/"
      >
        Back
      </Link>
      <div className="container mx-auto p-6 text-center">
        <div className="max-w-md mx-auto flex flex-row">
          <h2 className="text-2xl font-bold">{brewery.name}</h2>
          <p>
            {brewery.street}, {brewery.city}, {brewery.state},{" "}
            {brewery.postal_code}, {brewery.country}
          </p>
          <p>
            <a
              className="text-blue-600 underline"
              href={brewery.website_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Website
            </a>
          </p>
          <iframe
            className="w-64 h-64"
            src={`${GOOGLE_MAPS_BASE_URL}?q=${brewery.latitude},${brewery.longitude}&z=15&output=embed`}
            allowFullScreen
          />
        </div>
      </div>
    </main>
  );
}
