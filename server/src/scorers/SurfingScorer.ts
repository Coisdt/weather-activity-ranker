import type { DayWeatherData } from "../types/weather.js";

export const scoreSurfing = (
  day: DayWeatherData
): { score: number; reason: string } => {
  let score = 0;
  const reasons: string[] = [];

  // Good wind speed for surfing (15-30 km/h ideal)
  if (day.wind_speed_10m_max >= 15 && day.wind_speed_10m_max <= 30) {
    score += 35;
    reasons.push("Ideal wind speed for surfing");
  } else if (day.wind_speed_10m_max >= 10 && day.wind_speed_10m_max <= 40) {
    score += 20;
    reasons.push("Acceptable wind conditions");
  } else if (day.wind_speed_10m_max < 10) {
    reasons.push("Too calm for good waves");
  } else {
    reasons.push("Too windy for safe surfing");
  }

  // Moderate temperatures (15-25°C ideal)
  if (day.temperature_2m_max >= 15 && day.temperature_2m_max <= 25) {
    score += 25;
    reasons.push("Comfortable water temperature");
  } else if (day.temperature_2m_max >= 10 && day.temperature_2m_max <= 30) {
    score += 15;
    reasons.push("Acceptable temperature");
  } else {
    reasons.push("Temperature not ideal");
  }

  // Low precipitation is good
  if (day.precipitation_probability_max < 30) {
    score += 25;
    reasons.push("Clear weather conditions");
  } else if (day.precipitation_probability_max < 60) {
    score += 10;
    reasons.push("Some chance of rain");
  } else {
    reasons.push("High chance of rain");
  }

  // Good visibility (low weather code means clear)
  if (day.weather_code <= 3) {
    score += 15;
    reasons.push("Clear skies");
  } else if (day.weather_code <= 45) {
    score += 5;
    reasons.push("Some cloud cover");
  }

  return {
    score: Math.min(100, Math.max(0, score)),
    reason: reasons.join(". "),
  };
};
