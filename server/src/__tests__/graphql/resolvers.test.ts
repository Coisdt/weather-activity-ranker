import { describe, it, expect, beforeEach, afterEach } from "vitest";
import nock from "nock";
import { resolvers } from "../../graphql/resolvers.js";
import {
  mockNominatimSuccess,
  mockNominatimEmpty,
  createNominatimResponse,
} from "../fixtures/nominatimData.js";
import { mockWeatherSuccess } from "../fixtures/weatherData.js";
import { API_URLS, OPEN_METEO_DAILY_PARAMS } from "../fixtures/apiConstants.js";
import { TEST_CITIES } from "../fixtures/testCities.js";

describe("activityRankings resolver", () => {
  beforeEach(() => {
    // Enable nock to intercept HTTP requests
    nock.cleanAll();
  });

  afterEach(() => {
    // Clean up any remaining interceptors
    nock.cleanAll();
  });

  describe("happy path", () => {
    it("should return activity rankings for a valid city", async () => {
      const city = TEST_CITIES.NEW_YORK;

      // Mock Nominatim API
      nock(API_URLS.NOMINATIM)
        .get("/search")
        .query({ q: city.name, format: "json" })
        .reply(200, mockNominatimSuccess);

      // Mock Open-Meteo API
      nock(API_URLS.OPEN_METEO)
        .get("/v1/forecast")
        .query({
          latitude: city.lat.toString(),
          longitude: city.lon.toString(),
          daily: OPEN_METEO_DAILY_PARAMS,
        })
        .reply(200, mockWeatherSuccess);

      const result = await resolvers.Query.activityRankings(null, {
        location: city.name,
      });

      // Verify response structure
      expect(result).toHaveProperty("location");
      expect(result.location).toHaveProperty("city", city.name);
      expect(result.location).toHaveProperty("latitude", city.lat);
      expect(result.location).toHaveProperty("longitude", city.lon);

      expect(result).toHaveProperty("rankings");
      expect(Array.isArray(result.rankings)).toBe(true);
      expect(result.rankings.length).toBeGreaterThan(0);

      // Verify each ranking has the correct structure
      result.rankings.forEach((ranking: any) => {
        expect(ranking).toHaveProperty("date");
        expect(ranking).toHaveProperty("activities");
        expect(Array.isArray(ranking.activities)).toBe(true);
        expect(ranking.activities.length).toBe(4); // All 4 activity types

        // Verify each activity has required fields
        ranking.activities.forEach((activity: any) => {
          expect(activity).toHaveProperty("activity");
          expect(activity).toHaveProperty("score");
          expect(activity).toHaveProperty("reason");
          expect(activity).toHaveProperty("conditions");
          expect(typeof activity.score).toBe("number");
          expect(activity.score).toBeGreaterThanOrEqual(0);
          expect(activity.score).toBeLessThanOrEqual(100);
          expect(typeof activity.reason).toBe("string");

          // Verify conditions object
          expect(activity.conditions).toHaveProperty("time");
          expect(activity.conditions).toHaveProperty("weather_code");
          expect(activity.conditions).toHaveProperty("temperature_2m_max");
          expect(activity.conditions).toHaveProperty(
            "precipitation_probability_max"
          );
          expect(activity.conditions).toHaveProperty("snowfall_sum");
          expect(activity.conditions).toHaveProperty("wind_speed_10m_max");
          expect(activity.conditions).toHaveProperty("sunshine_duration");
        });
      });
    });

    it("should include all activity types in rankings", async () => {
      const city = TEST_CITIES.PARIS;

      nock(API_URLS.NOMINATIM)
        .get("/search")
        .query({ q: city.name, format: "json" })
        .reply(200, createNominatimResponse(city.lat, city.lon));

      nock(API_URLS.OPEN_METEO)
        .get("/v1/forecast")
        .query(true)
        .reply(200, mockWeatherSuccess);

      const result = await resolvers.Query.activityRankings(null, {
        location: city.name,
      });

      const firstRanking = result.rankings[0];
      const activityTypes = firstRanking?.activities.map(
        (a: any) => a.activity
      );

      expect(activityTypes).toContain("SKIING");
      expect(activityTypes).toContain("SURFING");
      expect(activityTypes).toContain("OUTDOOR_SIGHTSEEING") ?? undefined;
      expect(activityTypes).toContain("INDOOR_SIGHTSEEING") ?? undefined;
      expect(activityTypes).toBeDefined();
    });
  });

  describe("error scenarios", () => {
    it("should throw error when city is not found", async () => {
      const city = TEST_CITIES.NONEXISTENT;

      // Mock Nominatim API returning empty array
      nock(API_URLS.NOMINATIM)
        .get("/search")
        .query({ q: city.name, format: "json" })
        .reply(200, mockNominatimEmpty);

      await expect(
        resolvers.Query.activityRankings(null, { location: city.name })
      ).rejects.toThrow(`City "${city.name}" not found`);
    });

    it("should propagate WeatherService errors correctly", async () => {
      const city = TEST_CITIES.LONDON;

      nock(API_URLS.NOMINATIM)
        .get("/search")
        .query({ q: city.name, format: "json" })
        .reply(200, createNominatimResponse(city.lat, city.lon));

      // Mock Open-Meteo API returning HTTP error
      // (WeatherService-specific errors are tested in WeatherService.test.ts)
      nock(API_URLS.OPEN_METEO)
        .get("/v1/forecast")
        .query(true)
        .reply(500, { error: "Internal Server Error" });

      await expect(
        resolvers.Query.activityRankings(null, { location: city.name })
      ).rejects.toThrow("HTTP 500");
    });
  });
});
