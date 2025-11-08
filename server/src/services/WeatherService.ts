import type { OpenMeteoApiResponse, WeatherData } from "../types/weather.js";

export const getWeatherData = async (
  latitude: number,
  longitude: number
): Promise<WeatherData> => {
  const dataURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,precipitation_probability_max,snowfall_sum,wind_speed_10m_max,sunshine_duration`;

  try {
    const response = await fetch(dataURL);

    const data: OpenMeteoApiResponse =
      (await response.json()) as OpenMeteoApiResponse;

    if (data.error) {
      console.error("API Error:", data.error);
      throw new Error(
        `API Error: ${data.reason || JSON.stringify(data.error)}`
      );
    }

    if (!data.daily) {
      throw new Error(
        `Invalid weather data response. Response keys: ${Object.keys(data).join(
          ", "
        )}`
      );
    }

    // Return the transformed/flattened structure
    return {
      time: data.daily.time,
      weather_code: data.daily.weather_code,
      temperature_2m_max: data.daily.temperature_2m_max,
      precipitation_probability_max: data.daily.precipitation_probability_max,
      snowfall_sum: data.daily.snowfall_sum,
      wind_speed_10m_max: data.daily.wind_speed_10m_max,
      sunshine_duration: data.daily.sunshine_duration.map((d: number) =>
        d.toString()
      ),
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw new Error(
      `Failed to fetch weather data for latitude: ${latitude} and longitude: ${longitude}: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};
