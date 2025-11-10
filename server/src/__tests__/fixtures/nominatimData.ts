import type { NominatimApiResponse } from "../../types/nominatim.js";

/**
 * Mock Nominatim API response for a successful city lookup
 */
export const mockNominatimSuccess: NominatimApiResponse = [
  {
    lat: "40.7128",
    lon: "-74.0060",
    display_name: "New York, NY, USA",
    place_id: 12345,
  },
];

/**
 * Mock Nominatim API response for city not found (empty array)
 */
export const mockNominatimEmpty: NominatimApiResponse = [];

/**
 * Helper to create a Nominatim response with custom coordinates
 */
export const createNominatimResponse = (
  lat: number,
  lon: number
): NominatimApiResponse => [
  {
    lat: lat.toString(),
    lon: lon.toString(),
    display_name: "Test City",
    place_id: 99999,
  },
];
