/**
 * Service layer for activity-related operations
 */

import type { DayRanking } from "../types";

export function sortActivitiesByScore(ranking: DayRanking): DayRanking {
  return {
    ...ranking,
    activities: [...ranking.activities].sort((a, b) => b.score - a.score),
  };
}

export function sortRankingsByScore(rankings: DayRanking[]): DayRanking[] {
  return rankings.map(sortActivitiesByScore);
}
