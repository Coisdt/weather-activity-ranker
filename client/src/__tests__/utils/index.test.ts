import { describe, it, expect } from "vitest";
import {
  formatDate,
  formatActivityName,
  getScoreColorClasses,
} from "../../utils";

describe("formatDate", () => {
  it("should format date string to readable format", () => {
    const result = formatDate("2024-01-15");
    expect(result).toContain("January");
    expect(result).toContain("15");
    expect(result).toContain("2024");
  });

  it("should include weekday in formatted date", () => {
    const result = formatDate("2024-01-15");
    expect(result).toMatch(
      /Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday/
    );
  });
});

describe("formatActivityName", () => {
  it("should convert snake_case to Title Case", () => {
    expect(formatActivityName("OUTDOOR_SIGHTSEEING")).toBe(
      "Outdoor sightseeing"
    );
    expect(formatActivityName("INDOOR_SIGHTSEEING")).toBe("Indoor sightseeing");
  });

  it("should handle single word activities", () => {
    expect(formatActivityName("SKIING")).toBe("Skiing");
    expect(formatActivityName("SURFING")).toBe("Surfing");
  });
});

describe("getScoreColorClasses", () => {
  describe("high scores (>= 80)", () => {
    it("should return green colors for score >= 80", () => {
      const result = getScoreColorClasses(85);
      expect(result.bg).toContain("green");
      expect(result.text).toContain("green");
      expect(result.dot).toContain("green");
    });

    it("should return green colors for score 100", () => {
      const result = getScoreColorClasses(100);
      expect(result.bg).toContain("green");
    });
  });

  describe("medium-high scores (60-79)", () => {
    it("should return blue colors for score >= 60", () => {
      const result = getScoreColorClasses(70);
      expect(result.bg).toContain("blue");
      expect(result.text).toContain("blue");
    });
  });

  describe("medium scores (40-59)", () => {
    it("should return yellow colors for score >= 40", () => {
      const result = getScoreColorClasses(50);
      expect(result.bg).toContain("yellow");
      expect(result.text).toContain("yellow");
    });
  });

  describe("low-medium scores (20-39)", () => {
    it("should return orange colors for score >= 20", () => {
      const result = getScoreColorClasses(30);
      expect(result.bg).toContain("orange");
      expect(result.text).toContain("orange");
    });
  });

  describe("low scores (< 20)", () => {
    it("should return red colors for score < 20", () => {
      const result = getScoreColorClasses(15);
      expect(result.bg).toContain("red");
      expect(result.text).toContain("red");
    });

    it("should return red colors for score 0", () => {
      const result = getScoreColorClasses(0);
      expect(result.bg).toContain("red");
    });
  });
});
