import { describe, it, expect } from "vitest";
import { scoreSkiing } from "../../scorers/SkiingScorer.js";
import type { DayWeatherData } from "../../types/weather.js";

describe("scoreSkiing", () => {
  describe("ideal conditions", () => {
    it("should score high with cold temperature, significant snow, and low precipitation", () => {
      const day: DayWeatherData = {
        date: "2024-01-15",
        weather_code: 0,
        temperature_2m_max: 2.0, // < 5°C
        precipitation_probability_max: 15, // < 30%
        snowfall_sum: 8.0, // > 5cm
        wind_speed_10m_max: 12.0, // < 20 km/h
        sunshine_duration: 21600,
      };

      const result = scoreSkiing(day);

      expect(result.score).toBeGreaterThan(80);
      expect(result.score).toBeLessThanOrEqual(100);
      expect(result.reason).toContain("Cold temperatures ideal for skiing");
      expect(result.reason).toContain("Significant snowfall");
      expect(result.reason).toContain("Low chance of precipitation");
      expect(result.reason).toContain("Calm wind conditions");
    });
  });

  describe("moderate conditions", () => {
    it("should score moderately with temperature between 5-10°C", () => {
      const day: DayWeatherData = {
        date: "2024-01-15",
        weather_code: 1,
        temperature_2m_max: 7.5, // Between 5-10°C
        precipitation_probability_max: 40, // Between 30-60%
        snowfall_sum: 3.0, // Some snow but < 5cm
        wind_speed_10m_max: 15.0,
        sunshine_duration: 18000,
      };

      const result = scoreSkiing(day);

      expect(result.score).toBeGreaterThan(20);
      expect(result.score).toBeLessThan(80);
      expect(result.reason).toContain("Moderate temperatures acceptable");
      expect(result.reason).toContain("Some snowfall");
      expect(result.reason).toContain("Moderate precipitation chance");
    });
  });

  describe("poor conditions", () => {
    it("should score low with warm temperature, no snow, and high precipitation", () => {
      const day: DayWeatherData = {
        date: "2024-01-15",
        weather_code: 61,
        temperature_2m_max: 25.0, // > 10°C
        precipitation_probability_max: 85, // > 60%
        snowfall_sum: 0, // No snow
        wind_speed_10m_max: 45.0, // > 40 km/h
        sunshine_duration: 3600,
      };

      const result = scoreSkiing(day);

      expect(result.score).toBeLessThan(30);
      expect(result.reason).toContain("Too warm for skiing");
      expect(result.reason).toContain("No snowfall");
      expect(result.reason).toContain("High precipitation chance");
      expect(result.reason).toContain("Too windy for skiing");
    });
  });

  describe("score bounds", () => {
    it("should clamp score to maximum of 100", () => {
      const day: DayWeatherData = {
        date: "2024-01-15",
        weather_code: 0,
        temperature_2m_max: -5.0, // Very cold
        precipitation_probability_max: 5, // Very low
        snowfall_sum: 20.0, // Lots of snow
        wind_speed_10m_max: 5.0, // Very calm
        sunshine_duration: 25000,
      };

      const result = scoreSkiing(day);

      expect(result.score).toBeLessThanOrEqual(100);
    });

    it("should clamp score to minimum of 0", () => {
      const day: DayWeatherData = {
        date: "2024-01-15",
        weather_code: 99,
        temperature_2m_max: 35.0, // Very warm
        precipitation_probability_max: 100, // Maximum precipitation
        snowfall_sum: 0, // No snow
        wind_speed_10m_max: 50.0, // Very windy
        sunshine_duration: 0,
      };

      const result = scoreSkiing(day);

      expect(result.score).toBeGreaterThanOrEqual(0);
    });
  });

  describe("reason string generation", () => {
    it("should generate a non-empty reason string", () => {
      const day: DayWeatherData = {
        date: "2024-01-15",
        weather_code: 0,
        temperature_2m_max: 3.0,
        precipitation_probability_max: 20,
        snowfall_sum: 7.0,
        wind_speed_10m_max: 12.0,
        sunshine_duration: 20000,
      };

      const result = scoreSkiing(day);

      expect(result.reason).toBeTruthy();
      expect(result.reason.length).toBeGreaterThan(0);
      expect(typeof result.reason).toBe("string");
    });

    it("should include multiple reasons separated by periods", () => {
      const day: DayWeatherData = {
        date: "2024-01-15",
        weather_code: 0,
        temperature_2m_max: 3.0,
        precipitation_probability_max: 20,
        snowfall_sum: 7.0,
        wind_speed_10m_max: 12.0,
        sunshine_duration: 20000,
      };

      const result = scoreSkiing(day);

      // Should contain multiple reasons separated by ". "
      const reasons = result.reason.split(". ");
      expect(reasons.length).toBeGreaterThan(1);
    });
  });

  describe("edge cases", () => {
    it("should handle boundary values correctly (score remains within bounds)", () => {
      // Test representative boundaries to ensure no off-by-one errors
      const boundaries = [
        {
          temperature_2m_max: 5.0,
          snowfall_sum: 5.0,
          precipitation_probability_max: 30.0,
        },
        {
          temperature_2m_max: 10.0,
          snowfall_sum: 0,
          precipitation_probability_max: 60.0,
        },
      ];

      boundaries.forEach((boundary) => {
        const day: DayWeatherData = {
          date: "2024-01-15",
          weather_code: 0,
          ...boundary,
          wind_speed_10m_max: 20.0,
          sunshine_duration: 20000,
        };

        const result = scoreSkiing(day);
        expect(result.score).toBeGreaterThanOrEqual(0);
        expect(result.score).toBeLessThanOrEqual(100);
      });
    });
  });
});
