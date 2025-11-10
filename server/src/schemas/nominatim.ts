import { z } from "zod";

export const nominatimApiResponseSchema = z
  .array(
    z.object({
      lat: z.string(),
      lon: z.string(),
    })
  )
  .min(1, "No location results found")
  .refine(
    (data) => {
      const first = data[0];
      if (!first) return false;

      const lat = parseFloat(first.lat);
      const lon = parseFloat(first.lon);

      return (
        !isNaN(lat) &&
        !isNaN(lon) &&
        lat >= -90 &&
        lat <= 90 &&
        lon >= -180 &&
        lon <= 180
      );
    },
    { message: "Invalid coordinates" }
  );

export type NominatimApiResponse = z.infer<typeof nominatimApiResponseSchema>;
