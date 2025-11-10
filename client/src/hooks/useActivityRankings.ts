import { useQuery } from "@apollo/client/react";
import { useMemo } from "react";
import { GET_ACTIVITY_RANKINGS } from "../graphql/queries";
import type { ActivityRankingsResponse } from "../types";
import { sortRankingsByScore } from "../services/activityService";

export const useActivityRankings = (searchCity: string) => {
  const { loading, error, data } = useQuery(GET_ACTIVITY_RANKINGS, {
    variables: {
      location: searchCity,
    },
    skip: !searchCity,
  });

  const activityData = data as ActivityRankingsResponse | undefined;
  const cityName = activityData?.activityRankings?.location?.city ?? null;

  // Sort rankings using service layer (business logic)
  const sortedData = useMemo(() => {
    if (!activityData?.activityRankings?.rankings) {
      return activityData;
    }

    return {
      ...activityData,
      activityRankings: {
        ...activityData.activityRankings,
        rankings: sortRankingsByScore(activityData.activityRankings.rankings),
      },
    };
  }, [activityData]);

  return {
    loading,
    error,
    data: sortedData,
    cityName,
  };
};
