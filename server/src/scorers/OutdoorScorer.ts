import type { DayWeatherData } from "../types/weather.js";

export const scoreOutdoorSightseeing = (
  day: DayWeatherData
): { score: number; reason: string } => {
  let score = 0;
  const reasons: string[] = [];

  // Clear weather is best
  if (day.weather_code <= 3) {
    score += 30;
    reasons.push("Clear skies");
  } else if (day.weather_code <= 45) {
    score += 15;
    reasons.push("Partly cloudy");
  } else {
    reasons.push("Poor visibility");
  }

  // Comfortable temperatures (15-25°C ideal)
  if (day.temperature_2m_max >= 15 && day.temperature_2m_max <= 25) {
    score += 30;
    reasons.push("Comfortable temperature");
  } else if (day.temperature_2m_max >= 10 && day.temperature_2m_max <= 30) {
    score += 20;
    reasons.push("Acceptable temperature");
  } else {
    score += 10;
    reasons.push("Temperature not ideal");
  }

  // Low precipitation
  if (day.precipitation_probability_max < 20) {
    score += 25;
    reasons.push("Dry conditions");
  } else if (day.precipitation_probability_max < 50) {
    score += 10;
    reasons.push("Some chance of rain");
  } else {
    reasons.push("High chance of rain");
  }

  // Good sunshine duration
  const sunshineHours = day.sunshine_duration / 3600; // Convert seconds to hours
  if (sunshineHours >= 6) {
    score += 15;
    reasons.push("Plenty of sunshine");
  } else if (sunshineHours >= 4) {
    score += 8;
    reasons.push("Moderate sunshine");
  }

  return {
    score: Math.min(100, Math.max(0, score)),
    reason: reasons.join(". "),
  };
};
