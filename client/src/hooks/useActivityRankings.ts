import { useQuery } from "@apollo/client/react";
import { GET_ACTIVITY_RANKINGS } from "../graphql/queries";
import type { ActivityRankingsResponse } from "../types";

export const useActivityRankings = (searchCity: string) => {
  const { loading, error, data } = useQuery(GET_ACTIVITY_RANKINGS, {
    variables: {
      location: searchCity,
    },
    skip: !searchCity,
  });

  const activityData = data as ActivityRankingsResponse | undefined;
  const cityName = activityData?.activityRankings?.location?.city ?? null;

  return {
    loading,
    error,
    data: activityData,
    cityName,
  };
};
