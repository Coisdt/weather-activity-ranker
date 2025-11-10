import { describe, it, expect } from "vitest";
import {
  sortActivitiesByScore,
  sortRankingsByScore,
} from "../../services/activityService";
import type { DayRanking } from "../../types";

describe("activityService", () => {
  describe("sortActivitiesByScore", () => {
    it("should sort activities by score descending", () => {
      const ranking: DayRanking = {
        date: "2025-11-10",
        activities: [
          { activity: "OUTDOOR_SIGHTSEEING", score: 45, reason: "Moderate" },
          { activity: "SKIING", score: 85, reason: "Cold" },
          { activity: "SURFING", score: 20, reason: "Too cold" },
        ],
      };

      const sorted = sortActivitiesByScore(ranking);

      expect(sorted.activities[0].score).toBe(85);
      expect(sorted.activities[1].score).toBe(45);
      expect(sorted.activities[2].score).toBe(20);
    });

    it("should not mutate the original ranking", () => {
      const ranking: DayRanking = {
        date: "2025-11-10",
        activities: [
          { activity: "OUTDOOR_SIGHTSEEING", score: 45, reason: "Moderate" },
          { activity: "SKIING", score: 85, reason: "Cold" },
        ],
      };

      const originalOrder = [...ranking.activities];
      sortActivitiesByScore(ranking);

      expect(ranking.activities).toEqual(originalOrder);
    });
  });

  describe("sortRankingsByScore", () => {
    it("should sort activities in all rankings", () => {
      const rankings: DayRanking[] = [
        {
          date: "2025-11-10",
          activities: [
            { activity: "OUTDOOR_SIGHTSEEING", score: 45, reason: "Moderate" },
            { activity: "SKIING", score: 85, reason: "Cold" },
          ],
        },
        {
          date: "2025-11-11",
          activities: [
            { activity: "SURFING", score: 20, reason: "Too cold" },
            { activity: "SKIING", score: 90, reason: "Perfect" },
          ],
        },
      ];

      const sorted = sortRankingsByScore(rankings);

      expect(sorted[0].activities[0].score).toBe(85);
      expect(sorted[0].activities[1].score).toBe(45);
      expect(sorted[1].activities[0].score).toBe(90);
      expect(sorted[1].activities[1].score).toBe(20);
    });
  });
});
