export interface Activity {
  activity: string;
  reason: string;
  score: number;
}

export interface DayRanking {
  date: string;
  activities: Activity[];
}

export interface ActivityRankingsResponse {
  activityRankings: {
    location: {
      city: string;
      latitude: number;
      longitude: number;
    };
    rankings: DayRanking[];
  };
}
