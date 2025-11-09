import { gql } from "@apollo/client";

export const GET_ACTIVITY_RANKINGS = gql`
    query getActivityRankings($location: String!) {
      activityRankings(location: $location) {
        location {
          city
          latitude
          longitude
        }
        rankings {
          activities {
            activity
            reason
            score
          }
          date
        }
      }
    }
  `;