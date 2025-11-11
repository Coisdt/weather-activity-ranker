import type { WeatherData } from "../types/weather.js";
import { z } from "zod";
import { openMeteoApiResponseSchema } from "../schemas/weather.js";

export const getWeatherData = async (
  latitude: number,
  longitude: number
): Promise<WeatherData> => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,precipitation_probability_max,snowfall_sum,wind_speed_10m_max,sunshine_duration`;

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "WeatherActivityRanker/1.0",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const raw = await response.json();
    const data = openMeteoApiResponseSchema.parse(raw);

    if (data.error) {
      throw new Error(data.reason || "Open-Meteo API returned an error");
    }

    if (!data.daily) {
      throw new Error("Open-Meteo API response missing daily weather data");
    }

    return {
      time: data.daily.time,
      weather_code: data.daily.weather_code,
      temperature_2m_max: data.daily.temperature_2m_max,
      precipitation_probability_max: data.daily.precipitation_probability_max,
      snowfall_sum: data.daily.snowfall_sum,
      wind_speed_10m_max: data.daily.wind_speed_10m_max,
      // Convert to strings for GraphQL schema compatibility (schema expects String[])
      sunshine_duration: data.daily.sunshine_duration.map((d) => d.toString()),
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const details = error.errors
        .map((e) => `${e.path.join(".")}: ${e.message}`)
        .join(", ");
      throw new Error(`Invalid Open-Meteo API response: ${details}`);
    }
    // Preserve original error for network/parsing issues
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(`Unexpected error: ${String(error)}`);
  }
};
