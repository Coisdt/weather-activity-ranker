import { z } from "zod";
import { nominatimApiResponseSchema } from "../schemas/nominatim.js";

export const getLongitudeAndLatitude = async (
  city: string
): Promise<{ latitude: number; longitude: number }> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${city}&format=json`
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const raw = await response.json();

    // Handle empty results before validation
    if (Array.isArray(raw) && raw.length === 0) {
      throw new Error(`City "${city}" not found`);
    }

    const data = nominatimApiResponseSchema.parse(raw);

    // Schema guarantees at least one result via .min(1)
    const first = data[0]!;
    return {
      latitude: parseFloat(first.lat),
      longitude: parseFloat(first.lon),
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Check if it's a "no results" error (empty array)
      const isEmptyArrayError = error.errors.some(
        (e) => e.message === "No location results found"
      );

      if (isEmptyArrayError) {
        throw new Error(`City "${city}" not found`);
      }

      // For other validation errors, provide details
      const details = error.errors
        .map((e) => {
          const path = e.path.length > 0 ? `${e.path.join(".")}: ` : "";
          return `${path}${e.message}`;
        })
        .join(", ");
      throw new Error(
        `Invalid Nominatim API response for "${city}": ${details}`
      );
    }
    // Preserve original error for network/parsing issues
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(`Unexpected error: ${String(error)}`);
  }
};
