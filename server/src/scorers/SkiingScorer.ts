// Activity scoring functions
import type { DayWeatherData } from "../types/weather.js";

export const scoreSkiing = (
  day: DayWeatherData
): { score: number; reason: string } => {
  let score = 0;
  const reasons: string[] = [];

  // Cold temperature is good for skiing (below 5°C ideal)
  if (day.temperature_2m_max < 5) {
    score += 30;
    reasons.push("Cold temperatures ideal for skiing");
  } else if (day.temperature_2m_max < 10) {
    score += 15;
    reasons.push("Moderate temperatures acceptable");
  } else {
    reasons.push("Too warm for skiing");
  }

  // Snow is essential
  if (day.snowfall_sum > 5) {
    score += 40;
    reasons.push("Significant snowfall");
  } else if (day.snowfall_sum > 0) {
    score += 20;
    reasons.push("Some snowfall");
  } else {
    reasons.push("No snowfall");
  }

  // Low precipitation probability is good
  if (day.precipitation_probability_max < 30) {
    score += 20;
    reasons.push("Low chance of precipitation");
  } else if (day.precipitation_probability_max < 60) {
    score += 10;
    reasons.push("Moderate precipitation chance");
  } else {
    reasons.push("High precipitation chance");
  }

  // Moderate wind is okay, too much is bad
  if (day.wind_speed_10m_max < 20) {
    score += 10;
    reasons.push("Calm wind conditions");
  } else if (day.wind_speed_10m_max > 40) {
    reasons.push("Too windy for skiing");
  }

  return {
    score: Math.min(100, Math.max(0, score)),
    reason: reasons.join(". "),
  };
};
