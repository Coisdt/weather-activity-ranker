import { describe, it, expect, beforeEach, afterEach } from "vitest";
import nock from "nock";
import { getWeatherData } from "../../services/WeatherService.js";
import { API_URLS, OPEN_METEO_DAILY_PARAMS } from "../fixtures/apiConstants.js";
import {
  mockWeatherSuccess,
  mockWeatherError,
  mockWeatherMissingDaily,
} from "../fixtures/weatherData.js";

describe("getWeatherData", () => {
  beforeEach(() => {
    nock.cleanAll();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe("successful responses", () => {
    it("should return weather data and transform sunshine_duration to strings", async () => {
      const latitude = 40.7128;
      const longitude = -74.006;

      nock(API_URLS.OPEN_METEO)
        .get("/v1/forecast")
        .query({
          latitude: latitude.toString(),
          longitude: longitude.toString(),
          daily: OPEN_METEO_DAILY_PARAMS,
        })
        .reply(200, mockWeatherSuccess);

      const result = await getWeatherData(latitude, longitude);

      expect(result).toHaveProperty("time");
      expect(result).toHaveProperty("weather_code");
      expect(result).toHaveProperty("sunshine_duration");
      expect(Array.isArray(result.sunshine_duration)).toBe(true);

      // Verify transformation: numbers → strings
      result.sunshine_duration.forEach((duration) => {
        expect(typeof duration).toBe("string");
      });
    });
  });

  describe("HTTP errors", () => {
    it("should throw error when API returns non-2xx status", async () => {
      const latitude = 40.7128;
      const longitude = -74.006;

      nock(API_URLS.OPEN_METEO)
        .get("/v1/forecast")
        .query(true)
        .reply(500, { error: "Internal Server Error" });

      await expect(getWeatherData(latitude, longitude)).rejects.toThrow(
        "HTTP 500"
      );
    });
  });

  describe("API error responses", () => {
    it("should throw error when API returns error flag", async () => {
      const latitude = 40.7128;
      const longitude = -74.006;

      nock(API_URLS.OPEN_METEO)
        .get("/v1/forecast")
        .query(true)
        .reply(200, mockWeatherError);

      await expect(getWeatherData(latitude, longitude)).rejects.toThrow(
        "Open-Meteo API returned an error"
      );
    });

    it("should throw error when daily data is missing", async () => {
      const latitude = 40.7128;
      const longitude = -74.006;

      nock(API_URLS.OPEN_METEO)
        .get("/v1/forecast")
        .query(true)
        .reply(200, mockWeatherMissingDaily);

      await expect(getWeatherData(latitude, longitude)).rejects.toThrow(
        "Open-Meteo API response missing daily weather data"
      );
    });
  });

  describe("Zod validation errors", () => {
    it("should throw error with details when response structure is invalid", async () => {
      const latitude = 40.7128;
      const longitude = -74.006;

      nock(API_URLS.OPEN_METEO)
        .get("/v1/forecast")
        .query(true)
        .reply(200, {
          daily: {
            time: ["2024-01-15"],
            // Missing required fields
            weather_code: [0],
          },
        });

      await expect(getWeatherData(latitude, longitude)).rejects.toThrow(
        "Invalid Open-Meteo API response"
      );
    });

    it("should throw error when daily arrays have mismatched lengths", async () => {
      const latitude = 40.7128;
      const longitude = -74.006;

      nock(API_URLS.OPEN_METEO)
        .get("/v1/forecast")
        .query(true)
        .reply(200, {
          daily: {
            time: ["2024-01-15", "2024-01-16"],
            weather_code: [0, 1],
            temperature_2m_max: [25.5], // Different length
            precipitation_probability_max: [10, 20],
            snowfall_sum: [0, 0],
            wind_speed_10m_max: [12.5, 15.3],
            sunshine_duration: [28800, 25200],
          },
        });

      await expect(getWeatherData(latitude, longitude)).rejects.toThrow(
        "Invalid Open-Meteo API response"
      );
    });
  });
});
