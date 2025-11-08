import type { DayWeatherData } from "../types/weather.js";

export const scoreIndoorSightseeing = (
    day: DayWeatherData
  ): { score: number; reason: string } => {
    let score = 50; // Base score - always available
    const reasons: string[] = [];
  
    // Better when weather is bad
    if (day.precipitation_probability_max > 60 || day.weather_code > 45) {
      score += 30;
      reasons.push("Poor outdoor conditions make indoor activities ideal");
    } else if (day.precipitation_probability_max > 30) {
      score += 15;
      reasons.push("Some chance of rain makes indoor activities appealing");
    }
  
    // Still good when weather is nice (people can choose)
    if (
      day.weather_code <= 3 &&
      day.temperature_2m_max >= 15 &&
      day.temperature_2m_max <= 25
    ) {
      score += 10;
      reasons.push("Good weather, but indoor activities still enjoyable");
    }
  
    // Temperature doesn't matter much for indoor
    reasons.push("Indoor activities available regardless of weather");
  
    return {
      score: Math.min(100, Math.max(0, score)),
      reason: reasons.join(". "),
    };
  };