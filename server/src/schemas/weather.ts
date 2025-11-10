import { z } from "zod";

export const openMeteoApiResponseSchema = z.object({
  daily: z
    .object({
      time: z.array(z.string()).min(1),
      weather_code: z.array(z.number()).min(1),
      temperature_2m_max: z.array(z.number()).min(1),
      precipitation_probability_max: z.array(z.number()).min(1),
      snowfall_sum: z.array(z.number()).min(1),
      wind_speed_10m_max: z.array(z.number()).min(1),
      sunshine_duration: z.array(z.number()).min(1),
    })
    .refine(
      (data) => {
        const lengths = [
          data.time.length,
          data.weather_code.length,
          data.temperature_2m_max.length,
          data.precipitation_probability_max.length,
          data.snowfall_sum.length,
          data.wind_speed_10m_max.length,
          data.sunshine_duration.length,
        ];
        return lengths.every((len) => len === lengths[0]);
      },
      { message: "All daily arrays must have the same length" }
    )
    .optional(),
  error: z.boolean().optional(),
  reason: z.string().optional(),
});

export type OpenMeteoApiResponse = z.infer<typeof openMeteoApiResponseSchema>;
