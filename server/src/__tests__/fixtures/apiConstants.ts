/**
 * API endpoint URLs used in tests
 */
export const API_URLS = {
  NOMINATIM: "https://nominatim.openstreetmap.org",
  OPEN_METEO: "https://api.open-meteo.com",
} as const;

/**
 * Open-Meteo API daily parameters query string
 */
export const OPEN_METEO_DAILY_PARAMS =
  "weather_code,temperature_2m_max,precipitation_probability_max,snowfall_sum,wind_speed_10m_max,sunshine_duration";
