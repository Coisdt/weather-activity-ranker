// Raw response from Open-Meteo API (nested structure with 'daily' wrapper)
export interface OpenMeteoApiResponse {
  daily?: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    precipitation_probability_max: number[];
    snowfall_sum: number[];
    wind_speed_10m_max: number[];
    sunshine_duration: number[];
  };
  error?: boolean;
  reason?: string;
}

// Our domain model (flattened, clean structure)
export interface WeatherData {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  precipitation_probability_max: number[];
  snowfall_sum: number[];
  wind_speed_10m_max: number[];
  sunshine_duration: string[]; // Note: converted to strings
}

// Single day's weather data (extracted from WeatherData arrays for scoring)
export interface DayWeatherData {
  date: string;
  weather_code: number;
  temperature_2m_max: number;
  precipitation_probability_max: number;
  snowfall_sum: number;
  wind_speed_10m_max: number;
  sunshine_duration: number; // Parsed from string to number
}

