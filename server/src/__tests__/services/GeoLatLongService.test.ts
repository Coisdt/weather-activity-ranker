import { describe, it, expect, beforeEach, afterEach } from "vitest";
import nock from "nock";
import { getLongitudeAndLatitude } from "../../services/GeoLatLongService.js";
import { API_URLS } from "../fixtures/apiConstants.js";
import { TEST_CITIES } from "../fixtures/testCities.js";

describe("getLongitudeAndLatitude", () => {
  beforeEach(() => {
    nock.cleanAll();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe("Zod validation errors", () => {
    it("should throw error when response structure is invalid", async () => {
      const city = TEST_CITIES.NEW_YORK;

      nock(API_URLS.NOMINATIM)
        .get("/search")
        .query({ q: city.name, format: "json" })
        .reply(200, [
          {
            lon: "-74.0060",
            // Missing lat field
          },
        ]);

      await expect(getLongitudeAndLatitude(city.name)).rejects.toThrow(
        `Invalid Nominatim API response for "${city.name}"`
      );
    });

    it("should throw error when coordinates are invalid (out of range)", async () => {
      const city = TEST_CITIES.LONDON;

      nock(API_URLS.NOMINATIM)
        .get("/search")
        .query({ q: city.name, format: "json" })
        .reply(200, [
          {
            lat: "91.0", // Invalid: > 90
            lon: "-0.1278",
          },
        ]);

      await expect(getLongitudeAndLatitude(city.name)).rejects.toThrow(
        /Invalid Nominatim API response.*Invalid coordinates/
      );
    });

    it("should throw error when response is not an array", async () => {
      const city = TEST_CITIES.TOKYO;

      nock(API_URLS.NOMINATIM)
        .get("/search")
        .query({ q: city.name, format: "json" })
        .reply(200, {
          lat: "35.6762",
          lon: "139.6503",
        });

      await expect(getLongitudeAndLatitude(city.name)).rejects.toThrow(
        `Invalid Nominatim API response for "${city.name}"`
      );
    });
  });
});
