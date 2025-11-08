import type { WeatherData, DayWeatherData } from "../types/weather.js";
import { scoreSkiing } from "../scorers/SkiingScorer.js";
import { scoreSurfing } from "../scorers/SurfingScorer.js";
import { scoreOutdoorSightseeing } from "../scorers/OutdoorScorer.js";
import { scoreIndoorSightseeing } from "../scorers/IndoorScorer.js";
import { ActivityType } from "../constants/ActivityType.js";

/**
 * Transforms weather data into activity rankings for each day
 * @param weatherData - Raw weather data from the API
 * @returns Array of day rankings with scored activities
 */
export const generateActivityRankings = (weatherData: WeatherData) => {
  return weatherData.time.map((date: string, index: number) => {
    // Create single-day weather conditions
    const conditions = {
      time: weatherData.time[index]!,
      weather_code: weatherData.weather_code[index]!,
      temperature_2m_max: weatherData.temperature_2m_max[index]!,
      precipitation_probability_max:
        weatherData.precipitation_probability_max[index]!,
      snowfall_sum: weatherData.snowfall_sum[index]!,
      wind_speed_10m_max: weatherData.wind_speed_10m_max[index]!,
      sunshine_duration: weatherData.sunshine_duration[index]!,
    };

    // Prepare day data for scoring
    const dayData: DayWeatherData = {
      date,
      weather_code: weatherData.weather_code[index]!,
      temperature_2m_max: weatherData.temperature_2m_max[index]!,
      precipitation_probability_max:
        weatherData.precipitation_probability_max[index]!,
      snowfall_sum: weatherData.snowfall_sum[index]!,
      wind_speed_10m_max: weatherData.wind_speed_10m_max[index]!,
      sunshine_duration: parseFloat(weatherData.sunshine_duration[index]!),
    };

    // Score each activity
    const skiingScore = scoreSkiing(dayData);
    const surfingScore = scoreSurfing(dayData);
    const outdoorScore = scoreOutdoorSightseeing(dayData);
    const indoorScore = scoreIndoorSightseeing(dayData);

    return {
      date,
      activities: [
        {
          activity: ActivityType.SKIING,
          score: skiingScore.score,
          reason: skiingScore.reason,
          conditions,
        },
        {
          activity: ActivityType.SURFING,
          score: surfingScore.score,
          reason: surfingScore.reason,
          conditions,
        },
        {
          activity: ActivityType.OUTDOOR_SIGHTSEEING,
          score: outdoorScore.score,
          reason: outdoorScore.reason,
          conditions,
        },
        {
          activity: ActivityType.INDOOR_SIGHTSEEING,
          score: indoorScore.score,
          reason: indoorScore.reason,
          conditions,
        },
      ],
    };
  });
};
