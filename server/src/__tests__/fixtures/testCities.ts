/**
 * Test city data with coordinates for use in tests
 */
export const TEST_CITIES = {
  NEW_YORK: {
    name: "New York",
    lat: 40.7128,
    lon: -74.006,
  },
  PARIS: {
    name: "Paris",
    lat: 48.8566,
    lon: 2.3522,
  },
  TOKYO: {
    name: "Tokyo",
    lat: 35.6762,
    lon: 139.6503,
  },
  LONDON: {
    name: "London",
    lat: 51.5074,
    lon: -0.1278,
  },
  BERLIN: {
    name: "Berlin",
    lat: 52.52,
    lon: 13.405,
  },
  MADRID: {
    name: "Madrid",
    lat: 40.4168,
    lon: -3.7038,
  },
  NONEXISTENT: {
    name: "NonexistentCity12345",
    lat: 0,
    lon: 0,
  },
} as const;
