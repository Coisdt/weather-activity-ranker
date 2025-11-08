
// Nominatim API returns an array of result objects, each with lat/lon as strings, among other possible fields.
export interface NominatimApiResponseResult {
  lat: string;
  lon: string;
  [key: string]: any; // To allow for unused properties returned by the API
}

// The full API response is an array of results
export type NominatimApiResponse = NominatimApiResponseResult[];
