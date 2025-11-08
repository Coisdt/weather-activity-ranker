import type { NominatimApiResponse } from "../types/nominatim.ts";

export const getLongitudeAndLatitude = async (
  city: string
): Promise<{ latitude: number; longitude: number }> => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${city}&format=json`
  );
  const data: NominatimApiResponse =
    (await response.json()) as NominatimApiResponse;

  if (!data || !data[0] || !data[0].lat || !data[0].lon) {
    throw new Error(`Could not find coordinates for city: ${city}`);
  }

  return {
    latitude: parseFloat(data[0].lat),
    longitude: parseFloat(data[0].lon),
  };
};
