import type { ActivityRankingsResponse, DayRanking } from "../../types";

export const mockDayRanking: DayRanking = {
  date: "2025-11-10",
  activities: [
    {
      activity: "SKIING",
      score: 85,
      reason: "Cold temperatures ideal for skiing.",
    },
    {
      activity: "OUTDOOR_SIGHTSEEING",
      score: 45,
      reason: "Moderate temperatures.",
    },
    {
      activity: "SURFING",
      score: 20,
      reason: "Too cold for surfing.",
    },
  ],
};

export const mockActivityRankings: ActivityRankingsResponse = {
  activityRankings: {
    location: {
      city: "New York",
      latitude: 40.7128,
      longitude: -74.006,
    },
    rankings: [
      {
        date: "2025-11-10",
        activities: [
          {
            activity: "SKIING",
            score: 85,
            reason: "Cold temperatures ideal for skiing. Significant snowfall.",
          },
          {
            activity: "OUTDOOR_SIGHTSEEING",
            score: 45,
            reason: "Moderate temperatures. Some precipitation expected.",
          },
          {
            activity: "INDOOR_SIGHTSEEING",
            score: 70,
            reason: "Comfortable indoor conditions.",
          },
          {
            activity: "SURFING",
            score: 20,
            reason: "Too cold for surfing. No significant waves.",
          },
        ],
      },
      {
        date: "2025-11-11",
        activities: [
          {
            activity: "OUTDOOR_SIGHTSEEING",
            score: 90,
            reason: "Perfect weather conditions.",
          },
          {
            activity: "INDOOR_SIGHTSEEING",
            score: 65,
            reason: "Good indoor conditions.",
          },
          {
            activity: "SKIING",
            score: 30,
            reason: "Warm temperatures. No snowfall.",
          },
          {
            activity: "SURFING",
            score: 15,
            reason: "Poor conditions for surfing.",
          },
        ],
      },
    ],
  },
};
