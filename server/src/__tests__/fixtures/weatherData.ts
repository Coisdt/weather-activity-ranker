import type { OpenMeteoApiResponse } from "../../schemas/weather.js";

/**
 * Mock Open-Meteo API response with valid weather data for 7 days
 */
export const mockWeatherSuccess: OpenMeteoApiResponse = {
  daily: {
    time: [
      "2025-11-09",
      "2025-11-10",
      "2025-11-11",
      "2025-11-12",
      "2025-11-13",
      "2025-11-14",
      "2025-11-15",
    ],
    weather_code: [51, 45, 3, 2, 3, 2, 1],
    temperature_2m_max: [18.1, 21.5, 21.2, 22.2, 20.4, 17.5, 19.5],
    precipitation_probability_max: [8, 0, 0, 0, 0, 0, 0],
    snowfall_sum: [0, 0, 0, 0, 0, 0, 0],
    wind_speed_10m_max: [10.9, 26.9, 13, 21.1, 37.7, 38.3, 46.1],
    sunshine_duration: [
      26560.22, 46548.98, 46644.02, 46739.88, 46861.25, 46910.23, 47009.32,
    ],
  },
};

/**
 * Mock Open-Meteo API response with ideal skiing conditions
 */
export const mockWeatherIdealSkiing: OpenMeteoApiResponse = {
  daily: {
    time: ["2025-11-09"],
    weather_code: [0],
    temperature_2m_max: [2.0],
    precipitation_probability_max: [15],
    snowfall_sum: [12.5],
    wind_speed_10m_max: [10.0],
    sunshine_duration: [21600],
  },
};

/**
 * Mock Open-Meteo API response with poor skiing conditions
 */
export const mockWeatherPoorSkiing: OpenMeteoApiResponse = {
  daily: {
    time: ["2025-11-09"],
    weather_code: [61],
    temperature_2m_max: [25.0],
    precipitation_probability_max: [80],
    snowfall_sum: [0],
    wind_speed_10m_max: [45.0],
    sunshine_duration: [3600],
  },
};

/**
 * Mock Open-Meteo API error response (without reason to test fallback)
 */
export const mockWeatherError: OpenMeteoApiResponse = {
  error: true,
};

/**
 * Mock Open-Meteo API response with missing daily data
 */
export const mockWeatherMissingDaily: OpenMeteoApiResponse = {
  error: false,
};
