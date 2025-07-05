"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

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
    fetch(`https://api.openbrewerydb.org/v1/breweries/${id}`)
      .then((res) => res.json())
      .then((data) => setBrewery(data));
  }, [id]);

  if (!brewery) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">{brewery.name}</h2>
      <p>
        {brewery.street}, {brewery.city}, {brewery.state}, {brewery.postal_code}
        , {brewery.country}
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
        className="w-full h-64 mt-4"
        src={`https://www.google.com/maps?q=${brewery.latitude},${brewery.longitude}&z=15&output=embed`}
        allowFullScreen
      />
    </div>
  );
}
